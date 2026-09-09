import { useEffect, useState, useCallback } from "react";
import { get, post, patch, del } from "../utils/api";
import {
  Eye,
  Trash2,
  X,
  Plus,
  Edit3,
  Building,
  User,
  Clock,
  IndianRupee,
  CheckCircle2,
  FileText,
  Download,
  Briefcase,
  AlertCircle,
} from "lucide-react";

const PROJECT_STATUS_CONFIG = {
  prospect: {
    label: "Prospect",
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    dot: "bg-yellow-400",
  },
  inprogress: {
    label: "In Progress",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    dot: "bg-blue-400",
  },
  completed: {
    label: "Completed",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
};

const PAYMENT_STATUS_CONFIG = {
  pending: {
    label: "Pending",
    badge: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    dot: "bg-rose-400",
  },
  partial: {
    label: "Partial",
    badge: "bg-amber-500/15 text-amber-400 border-amber-500/30",
    dot: "bg-amber-400",
  },
  paid: {
    label: "Paid",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
};

const INITIAL_FORM = {
  client: "",
  poc: "",
  duration: "",
  amount: "",
  projectStatus: "prospect",
  paymentStatus: "pending",
  notes: "",
};

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [projectFilter, setProjectFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState("all");

  const [selectedLead, setSelectedLead] = useState(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const formatDuration = (duration) => {
    if (!duration) return "-";
    if (typeof duration === "object") {
      return `${duration.value || ""} ${duration.unit || ""}`.trim() || "-";
    }
    return String(duration);
  };

  const fetchLeads = useCallback(async () => {
    try {
      let url = "/api/leads?limit=100";
      if (projectFilter !== "all") url += `&projectStatus=${encodeURIComponent(projectFilter)}`;
      if (paymentFilter !== "all") url += `&paymentStatus=${encodeURIComponent(paymentFilter)}`;
      if (search.trim()) url += `&search=${encodeURIComponent(search.trim())}`;

      const res = await get(url);
      if (res && res.data) {
        setLeads(res.data || []);
      }
    } catch (err) {
      console.error("Error fetching leads:", err);
      setLeads([]);
    }
  }, [projectFilter, paymentFilter, search]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(INITIAL_FORM);
    setFormModalOpen(true);
  };

  const openEditModal = (lead) => {
    setEditingId(lead._id);
    setForm({
      client: lead.client || "",
      poc: lead.poc || "",
      duration: formatDuration(lead.duration),
      amount: lead.amount || "",
      projectStatus: lead.projectStatus || "prospect",
      paymentStatus: lead.paymentStatus || "pending",
      notes: lead.notes || "",
    });
    setFormModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!form.client.trim() || !form.amount || !form.duration.trim()) {
      alert("Please provide Client Name, Contract Amount, and Project Duration.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        amount: Number(form.amount),
      };

      if (editingId) {
        const res = await patch(`/api/leads/${editingId}`, payload);
        if (res) {
          setToastMessage("Client updated successfully");
          if (selectedLead?._id === editingId) {
            setSelectedLead(res);
          }
        }
      } else {
        const res = await post("/api/leads", payload);
        if (res) {
          setToastMessage("New client account added");
        }
      }

      setFormModalOpen(false);
      setEditingId(null);
      setForm(INITIAL_FORM);
      fetchLeads();
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Failed to save lead:", err);
      alert("Failed to save client details. Please check the inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id, clientName) => {
    if (!window.confirm(`Are you sure you want to permanently delete client "${clientName}"?`)) {
      return;
    }

    try {
      await del(`/api/leads/${id}`);
      setLeads((prev) => prev.filter((l) => l._id !== id));
      if (selectedLead?._id === id) setSelectedLead(null);
      setToastMessage("Client account deleted");
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Delete client error:", err);
    }
  };

  // Export CSV (RFC 4180 safe)
  const exportCSV = () => {
    if (leads.length === 0) return;

    const headers = [
      "Client",
      "Point of Contact",
      "Duration",
      "Amount (INR)",
      "Project Status",
      "Payment Status",
      "Notes",
    ];

    const escapeCsv = (val) => {
      const str = val == null ? "" : String(val);
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = leads.map((l) => [
      escapeCsv(l.client),
      escapeCsv(l.poc || ""),
      escapeCsv(formatDuration(l.duration)),
      escapeCsv(l.amount),
      escapeCsv(l.projectStatus),
      escapeCsv(l.paymentStatus),
      escapeCsv(l.notes || ""),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `clients-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  // Metrics
  const stats = {
    total: leads.length,
    revenue: leads.reduce((acc, l) => acc + Number(l.amount || 0), 0),
    activeProjects: leads.filter((l) => l.projectStatus === "inprogress").length,
    pendingPayments: leads.filter((l) => l.paymentStatus !== "paid").length,
  };

  return (
    <div className="space-y-6">
      {/* HEADER & TOAST */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Client Accounts</h1>
          <p className="text-white/60 text-sm mt-1">
            Track client accounts, active contracts, and project & payment milestones.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {toastMessage && (
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-medium animate-in fade-in">
              <CheckCircle2 size={14} />
              <span>{toastMessage}</span>
            </div>
          )}

          <button
            onClick={openAddModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#38A7F0] hover:bg-[#2b92d6] text-white text-xs font-semibold shadow-sm transition"
          >
            <Plus size={15} />
            <span>Add Client</span>
          </button>
        </div>
      </div>

      {/* STATS TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-white/60 text-xs font-medium uppercase tracking-wider">
            <span>Total Clients</span>
            <Building size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-white">{stats.total}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-medium uppercase tracking-wider">
            <span>Portfolio Value</span>
            <IndianRupee size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-emerald-400">
            ₹{stats.revenue.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-blue-400 text-xs font-medium uppercase tracking-wider">
            <span>In Delivery</span>
            <Briefcase size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-blue-400">{stats.activeProjects}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-rose-400 text-xs font-medium uppercase tracking-wider">
            <span>Unpaid Invoices</span>
            <AlertCircle size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-rose-400">{stats.pendingPayments}</div>
        </div>
      </div>

      {/* CONTROLS BAR: SEARCH, FILTERS & EXPORT */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-3 bg-[var(--admin-card)] border border-white/10 rounded-xl p-3">
        <input
          type="text"
          placeholder="Search by client name or POC..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full lg:w-72 bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
        />

        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          {/* Project Status Filter */}
          <div className="flex items-center gap-1 text-xs">
            <span className="text-white/40 text-[11px] uppercase mr-1">Project:</span>
            {["all", "prospect", "inprogress", "completed"].map((st) => (
              <button
                key={st}
                onClick={() => setProjectFilter(st)}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition capitalize whitespace-nowrap ${
                  projectFilter === st
                    ? "bg-[#38A7F0] text-white shadow-sm"
                    : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
                }`}
              >
                {st === "all" ? "All" : PROJECT_STATUS_CONFIG[st]?.label || st}
              </button>
            ))}
          </div>

          {/* Payment Status Filter */}
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-white/10 bg-[#091122] text-white text-xs focus:outline-none focus:border-[#38A7F0]"
          >
            <option value="all">All Payments</option>
            <option value="pending">Pending</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
          </select>

          <button
            onClick={exportCSV}
            disabled={leads.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition text-xs font-medium ml-auto disabled:opacity-50"
            title="Export filtered records to CSV"
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* CLIENTS / LEADS TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl bg-[var(--admin-card)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/60">
              <th className="p-3.5">Client</th>
              <th className="p-3.5">Point of Contact</th>
              <th className="p-3.5">Duration</th>
              <th className="p-3.5">Contract Value</th>
              <th className="p-3.5">Project Status</th>
              <th className="p-3.5">Payment</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-10 text-center text-white/50">
                  No client records found matching the criteria.
                </td>
              </tr>
            ) : (
              leads.map((l) => {
                const projCfg =
                  PROJECT_STATUS_CONFIG[l.projectStatus] || PROJECT_STATUS_CONFIG.prospect;
                const payCfg =
                  PAYMENT_STATUS_CONFIG[l.paymentStatus] || PAYMENT_STATUS_CONFIG.pending;

                return (
                  <tr
                    key={l._id}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition"
                  >
                    <td className="p-3.5 font-medium text-white">
                      <div className="flex items-center gap-2">
                        <Building size={14} className="text-[#38A7F0] shrink-0" />
                        <span>{l.client}</span>
                      </div>
                    </td>

                    <td className="p-3.5 text-white/80">
                      {l.poc ? (
                        <div className="flex items-center gap-1.5">
                          <User size={13} className="text-white/40 shrink-0" />
                          <span>{l.poc}</span>
                        </div>
                      ) : (
                        <span className="text-white/40">-</span>
                      )}
                    </td>

                    <td className="p-3.5 text-white/70 text-xs">{formatDuration(l.duration)}</td>

                    <td className="p-3.5 font-semibold text-emerald-400">
                      ₹{Number(l.amount || 0).toLocaleString("en-IN")}
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${projCfg.badge}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${projCfg.dot}`} />
                        {projCfg.label}
                      </span>
                    </td>

                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium border ${payCfg.badge}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${payCfg.dot}`} />
                        {payCfg.label}
                      </span>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedLead(l)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#38A7F0]/20 text-[#38A7F0] hover:text-[#5bc1ff] transition border border-white/10 hover:border-[#38A7F0]/40 text-xs font-medium"
                          title="View client details"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => openEditModal(l)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition border border-white/10 text-xs font-medium"
                          title="Edit client"
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDelete(l._id, l.client)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition border border-red-500/20 text-xs font-medium"
                          title="Delete client"
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

      {/* DETAIL MODAL */}
      {selectedLead && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className="bg-[#0b1328] border border-white/10 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-white space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#38A7F0]/15 border border-[#38A7F0]/30 flex items-center justify-center text-[#38A7F0]">
                  <Building size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">{selectedLead.client}</h2>
                  <p className="text-xs text-white/60 mt-0.5">
                    Account Overview & Contract Records
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* QUICK STATUS PILLS */}
            <div className="grid grid-cols-2 gap-3 bg-white/[0.02] border border-white/10 p-4 rounded-xl">
              <div>
                <span className="text-xs text-white/40 uppercase block mb-1">Project Status</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    PROJECT_STATUS_CONFIG[selectedLead.projectStatus]?.badge
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      PROJECT_STATUS_CONFIG[selectedLead.projectStatus]?.dot
                    }`}
                  />
                  {PROJECT_STATUS_CONFIG[selectedLead.projectStatus]?.label}
                </span>
              </div>

              <div>
                <span className="text-xs text-white/40 uppercase block mb-1">Payment Status</span>
                <span
                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
                    PAYMENT_STATUS_CONFIG[selectedLead.paymentStatus]?.badge
                  }`}
                >
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      PAYMENT_STATUS_CONFIG[selectedLead.paymentStatus]?.dot
                    }`}
                  />
                  {PAYMENT_STATUS_CONFIG[selectedLead.paymentStatus]?.label}
                </span>
              </div>
            </div>

            {/* DETAILS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/[0.02] border border-white/10 p-4 rounded-xl text-sm">
              <div className="flex items-center gap-2.5 text-white/80">
                <User size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Point of Contact</div>
                  <div className="font-medium text-white">{selectedLead.poc || "Not specified"}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <IndianRupee size={16} className="text-emerald-400 shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Contract Value</div>
                  <div className="font-bold text-emerald-400">
                    ₹{Number(selectedLead.amount || 0).toLocaleString("en-IN")}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Clock size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Duration / Timeline</div>
                  <div className="font-medium text-white">
                    {formatDuration(selectedLead.duration)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Briefcase size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Created Timestamp</div>
                  <div className="font-medium text-white">
                    {selectedLead.createdAt ? new Date(selectedLead.createdAt).toLocaleDateString() : "-"}
                  </div>
                </div>
              </div>
            </div>

            {/* INTERNAL NOTES BOX */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                <FileText size={14} className="text-[#38A7F0]" />
                <span>Internal Project & Client Notes</span>
              </div>
              <div className="bg-[#070d1c] border border-white/10 rounded-xl p-4 text-white/90 text-sm leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto">
                {selectedLead.notes || "No internal notes recorded."}
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const lead = selectedLead;
                    setSelectedLead(null);
                    openEditModal(lead);
                  }}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition"
                >
                  <Edit3 size={14} />
                  <span>Edit Account</span>
                </button>

                <button
                  onClick={() => handleDelete(selectedLead._id, selectedLead.client)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 text-xs font-semibold transition"
                  title="Delete Client"
                >
                  <Trash2 size={14} />
                  <span>Delete</span>
                </button>
              </div>

              <button
                onClick={() => setSelectedLead(null)}
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ADD / EDIT MODAL */}
      {formModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className="bg-[#0b1328] border border-white/10 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-white space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#38A7F0]/15 border border-[#38A7F0]/30 flex items-center justify-center text-[#38A7F0]">
                  <Building size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    {editingId ? "Edit Client Account" : "Add New Client"}
                  </h2>
                  <p className="text-xs text-white/60 mt-0.5">
                    {editingId
                      ? "Update project specifications and billing status"
                      : "Enter client details to create a new delivery tracking record"}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setFormModalOpen(false)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* FORM */}
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">
                    Client / Company <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="client"
                    value={form.client}
                    onChange={handleFormChange}
                    placeholder="e.g. Acme Corp"
                    required
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">
                    Point of Contact (POC)
                  </label>
                  <input
                    name="poc"
                    value={form.poc}
                    onChange={handleFormChange}
                    placeholder="e.g. Alex Morgan"
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">
                    Contract Value (₹) <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="amount"
                    type="number"
                    min="0"
                    value={form.amount}
                    onChange={handleFormChange}
                    placeholder="50000"
                    required
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">
                    Project Timeline / Duration <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="duration"
                    value={form.duration}
                    onChange={handleFormChange}
                    placeholder="e.g. 15 Jan - 28 Feb (6 weeks)"
                    required
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">Project Status</label>
                  <select
                    name="projectStatus"
                    value={form.projectStatus}
                    onChange={handleFormChange}
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#38A7F0]"
                  >
                    <option value="prospect">Prospect</option>
                    <option value="inprogress">In Progress</option>
                    <option value="completed">Completed</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">Payment Status</label>
                  <select
                    name="paymentStatus"
                    value={form.paymentStatus}
                    onChange={handleFormChange}
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#38A7F0]"
                  >
                    <option value="pending">Pending</option>
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70">
                  Internal Notes & Deliverables
                </label>
                <textarea
                  name="notes"
                  rows={3}
                  value={form.notes}
                  onChange={handleFormChange}
                  placeholder="Scope details, milestones, invoice links, or client preferences..."
                  className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0] resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setFormModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-medium transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={submitting}
                  className="px-4 py-2 rounded-xl bg-[#38A7F0] hover:bg-[#2b92d6] text-white text-xs font-semibold shadow-sm transition disabled:opacity-50"
                >
                  {submitting
                    ? "Saving..."
                    : editingId
                    ? "Update Client Account"
                    : "Add Client Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}