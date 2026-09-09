import { useEffect, useState } from "react";
import { get, put, del } from "../utils/api";
import {
  Eye,
  Trash2,
  X,
  Briefcase,
  Mail,
  Phone,
  Building,
  Clock,
  Calendar,
  User,
  CheckCircle2,
  Inbox,
  Download,
  Layers,
} from "lucide-react";

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    dot: "bg-yellow-400",
  },
  contacted: {
    label: "Contacted",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    dot: "bg-blue-400",
  },
  closed: {
    label: "Closed",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
};

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [toastMessage, setToastMessage] = useState("");

  const fmt = (d) => (d ? new Date(d).toLocaleString() : "-");

  // Fetch Quotes with auth header via api.js
  const fetchServices = async () => {
    try {
      const res = await get("/api/quotes");
      if (res && res.success) {
        setServices(res.data || []);
      }
    } catch (err) {
      console.error("Error fetching quotes:", err);
      setServices([]);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // Update Status
  const handleStatusChange = async (id, status) => {
    setUpdating(true);
    try {
      const res = await put(`/api/quotes/${id}`, { status });
      if (res && res.success) {
        setServices((prev) =>
          prev.map((s) => (s._id === id ? { ...s, status } : s))
        );
        if (selectedService && selectedService._id === id) {
          setSelectedService((prev) => ({ ...prev, status }));
        }
        setToastMessage(`Request marked as ${STATUS_CONFIG[status]?.label || status}`);
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      console.error("Error updating quote status:", err);
    } finally {
      setUpdating(false);
    }
  };

  // Delete Quote
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this service request?")) {
      return;
    }

    try {
      const res = await del(`/api/quotes/${id}`);
      if (res && (res.success || !res.error)) {
        setServices((prev) => prev.filter((s) => s._id !== id));
        if (selectedService?._id === id) {
          setSelectedService(null);
        }
        setToastMessage("Service request deleted");
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      console.error("Delete service request failed:", err);
    }
  };

  // Stats
  const stats = {
    total: services.length,
    pending: services.filter((s) => (s.status || "pending") === "pending").length,
    contacted: services.filter((s) => s.status === "contacted").length,
    closed: services.filter((s) => s.status === "closed").length,
  };

  // Filter + Search
  const filteredServices = services.filter((s) => {
    const matchesFilter = filter === "all" || (s.status || "pending") === filter;
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      s.name?.toLowerCase().includes(term) ||
      s.email?.toLowerCase().includes(term) ||
      s.service?.toLowerCase().includes(term) ||
      s.subService?.toLowerCase().includes(term) ||
      s.company?.toLowerCase().includes(term);

    return matchesFilter && matchesSearch;
  });

  // Export CSV
  const exportCSV = () => {
    const headers = [
      "Name",
      "Email",
      "Phone",
      "Service",
      "Sub Service",
      "Company",
      "Preferred Time",
      "Status",
      "Received",
    ];

    const escapeCsv = (val) => {
      const str = val == null ? "" : String(val);
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = filteredServices.map((s) => [
      escapeCsv(s.name),
      escapeCsv(s.email),
      escapeCsv(s.phone),
      escapeCsv(s.service),
      escapeCsv(s.subService),
      escapeCsv(s.company || ""),
      escapeCsv(s.preferredTime || ""),
      escapeCsv(s.status || "pending"),
      escapeCsv(fmt(s.createdAt)),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `service-requests-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* HEADER & TOAST */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Service Requests</h1>
          <p className="text-white/60 text-sm mt-1">
            Review client project scopes, quote submissions, and manage project quote requests.
          </p>
        </div>

        {toastMessage && (
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium animate-in fade-in">
            <CheckCircle2 size={14} />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* STATS TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-white/60 text-xs font-medium uppercase tracking-wider">
            <span>Total Requests</span>
            <Inbox size={15} />
          </div>
          <div className="text-2xl font-bold mt-2">{stats.total}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-yellow-400 text-xs font-medium uppercase tracking-wider">
            <span>Pending</span>
            <Clock size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-yellow-400">{stats.pending}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-blue-400 text-xs font-medium uppercase tracking-wider">
            <span>Contacted</span>
            <Phone size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-blue-400">{stats.contacted}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-medium uppercase tracking-wider">
            <span>Closed</span>
            <CheckCircle2 size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-emerald-400">{stats.closed}</div>
        </div>
      </div>

      {/* CONTROLS BAR: SEARCH, FILTER & EXPORT */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--admin-card)] border border-white/10 rounded-xl p-3">
        <input
          type="text"
          placeholder="Search client, email, service, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
        />

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          <div className="flex items-center gap-1.5">
            {["all", "pending", "contacted", "closed"].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3 py-1.5 rounded-lg font-medium transition capitalize whitespace-nowrap ${
                  filter === st
                    ? "bg-[#38A7F0] text-white shadow-sm"
                    : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                {st === "all" ? "All" : STATUS_CONFIG[st]?.label || st}
              </button>
            ))}
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition text-xs font-medium ml-auto sm:ml-2 whitespace-nowrap"
            title="Export filtered records to CSV"
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* REQUESTS TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl bg-[var(--admin-card)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/60">
              <th className="p-3.5">Client</th>
              <th className="p-3.5">Email</th>
              <th className="p-3.5">Phone</th>
              <th className="p-3.5">Service & Scope</th>
              <th className="p-3.5">Company</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Received</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredServices.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-10 text-center text-white/50">
                  No service requests found matching the criteria.
                </td>
              </tr>
            ) : (
              filteredServices.map((s) => {
                const statusKey = s.status || "pending";
                const cfg = STATUS_CONFIG[statusKey] || STATUS_CONFIG.pending;

                return (
                  <tr
                    key={s._id}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition"
                  >
                    <td className="p-3.5 font-medium text-white">{s.name}</td>
                    <td className="p-3.5 text-white/80">
                      <a
                        href={`mailto:${s.email}`}
                        className="hover:text-[#38A7F0] transition"
                      >
                        {s.email}
                      </a>
                    </td>
                    <td className="p-3.5 text-white/70">{s.phone || "-"}</td>
                    <td className="p-3.5">
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-white text-xs">{s.service}</span>
                        {s.subService && (
                          <span className="text-[11px] text-white/50">{s.subService}</span>
                        )}
                      </div>
                    </td>
                    <td className="p-3.5 text-white/70">{s.company || "-"}</td>

                    <td className="p-3.5">
                      <select
                        value={statusKey}
                        onChange={(e) => handleStatusChange(s._id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border bg-[#0b1328] focus:outline-none focus:border-[#38A7F0] transition ${cfg.badge}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="contacted">Contacted</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-white/60 text-xs">{fmt(s.createdAt)}</td>

                    <td className="p-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedService(s)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#38A7F0]/20 text-[#38A7F0] hover:text-[#5bc1ff] transition border border-white/10 hover:border-[#38A7F0]/40 text-xs font-medium"
                          title="View request details"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => handleDelete(s._id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition border border-red-500/20 text-xs font-medium"
                          title="Delete request"
                        >
                          <Trash2 size={13} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* DETAIL & STATUS MODAL */}
      {selectedService && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className="bg-[#0b1328] border border-white/10 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-white space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#38A7F0]/15 border border-[#38A7F0]/30 flex items-center justify-center text-[#38A7F0]">
                  <Briefcase size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Service Request Details</h2>
                  <p className="text-xs text-white/60 mt-0.5">
                    Received on {fmt(selectedService.createdAt)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedService(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* STATUS UPDATE CONTROLLER */}
            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Request Status
                </label>
                {updating && (
                  <span className="text-xs text-[#38A7F0] animate-pulse">
                    Updating...
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1">
                {["pending", "contacted", "closed"].map((st) => {
                  const isCurrent = (selectedService.status || "pending") === st;
                  const cfg = STATUS_CONFIG[st];

                  return (
                    <button
                      key={st}
                      disabled={updating}
                      onClick={() => handleStatusChange(selectedService._id, st)}
                      className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition border flex items-center justify-center gap-1 ${
                        isCurrent
                          ? `${cfg.badge} font-bold ring-2 ring-[#38A7F0]/40`
                          : "bg-white/5 hover:bg-white/10 text-white/70 border-white/10"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                      <span>{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* CLIENT INFORMATION GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/[0.02] border border-white/10 p-4 rounded-xl text-sm">
              <div className="flex items-center gap-2.5 text-white/80">
                <User size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Client Name</div>
                  <div className="font-medium text-white">{selectedService.name}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Building size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Company</div>
                  <div className="font-medium text-white">
                    {selectedService.company || "Not provided"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Mail size={16} className="text-[#38A7F0] shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-xs text-white/40">Email Address</div>
                  <a
                    href={`mailto:${selectedService.email}`}
                    className="font-medium text-white hover:text-[#38A7F0] transition truncate block"
                  >
                    {selectedService.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Phone size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Phone Number</div>
                  {selectedService.phone ? (
                    <a
                      href={`tel:${selectedService.phone}`}
                      className="font-medium text-white hover:text-[#38A7F0] transition"
                    >
                      {selectedService.phone}
                    </a>
                  ) : (
                    <div className="font-medium text-white/50">Not provided</div>
                  )}
                </div>
              </div>
            </div>

            {/* SERVICE SPECIFICATIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/[0.02] border border-white/10 p-4 rounded-xl text-sm">
              <div className="flex items-center gap-2.5 text-white/80">
                <Layers size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Service Category</div>
                  <div className="font-medium text-white">{selectedService.service}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Briefcase size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Sub Service / Scope</div>
                  <div className="font-medium text-white">
                    {selectedService.subService || "Not specified"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Clock size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Preferred Meeting Time</div>
                  <div className="font-medium text-white">
                    {selectedService.preferredTime || "Flexible / Not specified"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Calendar size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Submission Date</div>
                  <div className="font-medium text-white">{fmt(selectedService.createdAt)}</div>
                </div>
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                onClick={() => handleDelete(selectedService._id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 text-xs font-semibold transition"
                title="Delete Request"
              >
                <Trash2 size={14} />
                <span>Delete Request</span>
              </button>

              <button
                onClick={() => setSelectedService(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}