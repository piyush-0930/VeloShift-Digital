import { useEffect, useState } from "react";
import { get, put, del } from "../utils/api";
import {
  Eye,
  X,
  Mail,
  Phone,
  Building,
  Calendar,
  User,
  MessageSquare,
  CheckCircle2,
  Inbox,
  Clock,
  Archive,
  Trash2,
} from "lucide-react";

const STATUS_CONFIG = {
  new: {
    label: "New",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    dot: "bg-blue-400",
  },
  contacted: {
    label: "Contacted",
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    dot: "bg-yellow-400",
  },
  in_progress: {
    label: "In Progress",
    badge: "bg-purple-500/15 text-purple-400 border-purple-500/30",
    dot: "bg-purple-400",
  },
  resolved: {
    label: "Resolved",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  archived: {
    label: "Archived",
    badge: "bg-gray-500/15 text-gray-400 border-gray-500/30",
    dot: "bg-gray-400",
  },
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const loadData = async () => {
    try {
      const res = await get("/api/contact/all");
      setContacts(res?.contacts || []);
    } catch (err) {
      console.error("Error fetching contacts:", err);
      setContacts([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
    setUpdating(true);
    try {
      const res = await put(`/api/contact/${id}/status`, { status: newStatus });
      if (res && res.success) {
        setContacts((prev) =>
          prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
        );
        if (selectedContact && selectedContact._id === id) {
          setSelectedContact((prev) => ({ ...prev, status: newStatus }));
        }
        setToastMessage(`Inquiry marked as ${STATUS_CONFIG[newStatus]?.label || newStatus}`);
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      console.error("Failed to update status:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this contact inquiry?")) {
      return;
    }

    try {
      const res = await del(`/api/contact/${id}`);
      if (res && (res.success || !res.error)) {
        setContacts((prev) => prev.filter((c) => c._id !== id));
        if (selectedContact?._id === id) {
          setSelectedContact(null);
        }
        setToastMessage("Contact inquiry deleted");
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      console.error("Delete contact inquiry failed:", err);
    }
  };

  const fmt = (d) => (d ? new Date(d).toLocaleString() : "-");

  // Filtering
  const filteredContacts = contacts.filter((c) => {
    const matchesFilter = filter === "all" || (c.status || "new") === filter;
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      c.name?.toLowerCase().includes(term) ||
      c.email?.toLowerCase().includes(term) ||
      c.company?.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  // Statistics
  const stats = {
    total: contacts.length,
    new: contacts.filter((c) => (c.status || "new") === "new").length,
    contacted: contacts.filter((c) => c.status === "contacted").length,
    in_progress: contacts.filter((c) => c.status === "in_progress").length,
    resolved: contacts.filter((c) => c.status === "resolved").length,
  };

  return (
    <div className="space-y-6">
      {/* HEADER & TOAST */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Contact Inquiries</h1>
          <p className="text-white/60 text-sm mt-1">
            Review client messages, customer requests, and manage inquiry resolution statuses.
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
            <span>Total Queries</span>
            <Inbox size={15} />
          </div>
          <div className="text-2xl font-bold mt-2">{stats.total}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-blue-400 text-xs font-medium uppercase tracking-wider">
            <span>New</span>
            <Clock size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-blue-400">{stats.new}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-yellow-400 text-xs font-medium uppercase tracking-wider">
            <span>Contacted</span>
            <Phone size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-yellow-400">{stats.contacted}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-medium uppercase tracking-wider">
            <span>Resolved</span>
            <CheckCircle2 size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-emerald-400">{stats.resolved}</div>
        </div>
      </div>

      {/* CONTROLS BAR: SEARCH & FILTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--admin-card)] border border-white/10 rounded-xl p-3">
        <input
          type="text"
          placeholder="Search by name, email, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
        />

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {["all", "new", "contacted", "in_progress", "resolved", "archived"].map((st) => (
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
      </div>

      {/* INQUIRIES TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl bg-[var(--admin-card)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/60">
              <th className="p-3.5">Name</th>
              <th className="p-3.5">Email</th>
              <th className="p-3.5">Phone</th>
              <th className="p-3.5">Company</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Received</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredContacts.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-10 text-center text-white/50">
                  No contact inquiries found matching the criteria.
                </td>
              </tr>
            ) : (
              filteredContacts.map((c) => {
                const statusKey = c.status || "new";
                const cfg = STATUS_CONFIG[statusKey] || STATUS_CONFIG.new;

                return (
                  <tr
                    key={c._id}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition"
                  >
                    <td className="p-3.5 font-medium text-white">{c.name}</td>
                    <td className="p-3.5 text-white/80">
                      <a
                        href={`mailto:${c.email}`}
                        className="hover:text-[#38A7F0] transition"
                      >
                        {c.email}
                      </a>
                    </td>
                    <td className="p-3.5 text-white/70">{c.phone || "-"}</td>
                    <td className="p-3.5 text-white/70">{c.company || "-"}</td>
                    <td className="p-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${cfg.badge}`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                        {cfg.label}
                      </span>
                    </td>
                    <td className="p-3.5 text-white/60 text-xs">{fmt(c.createdAt)}</td>
                    <td className="p-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedContact(c)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#38A7F0]/20 text-[#38A7F0] hover:text-[#5bc1ff] transition border border-white/10 hover:border-[#38A7F0]/40 text-xs font-medium"
                          title="View inquiry details"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => handleDelete(c._id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition border border-red-500/20 text-xs font-medium"
                          title="Delete inquiry"
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
      {selectedContact && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className="bg-[#0b1328] border border-white/10 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-white space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#38A7F0]/15 border border-[#38A7F0]/30 flex items-center justify-center text-[#38A7F0]">
                  <MessageSquare size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Contact Inquiry Details</h2>
                  <p className="text-xs text-white/60 mt-0.5">
                    Received on {fmt(selectedContact.createdAt)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedContact(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* STATUS UPDATE CONTROLLER */}
            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Inquiry Status
                </label>
                {updating && (
                  <span className="text-xs text-[#38A7F0] animate-pulse">
                    Updating...
                  </span>
                )}
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pt-1">
                {["new", "contacted", "in_progress", "resolved", "archived"].map((st) => {
                  const isCurrent = (selectedContact.status || "new") === st;
                  const cfg = STATUS_CONFIG[st];

                  return (
                    <button
                      key={st}
                      disabled={updating}
                      onClick={() => handleStatusChange(selectedContact._id, st)}
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

            {/* SENDER INFORMATION GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/[0.02] border border-white/10 p-4 rounded-xl text-sm">
              <div className="flex items-center gap-2.5 text-white/80">
                <User size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Full Name</div>
                  <div className="font-medium text-white">{selectedContact.name}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Building size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Company</div>
                  <div className="font-medium text-white">
                    {selectedContact.company || "Not provided"}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Mail size={16} className="text-[#38A7F0] shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-xs text-white/40">Email Address</div>
                  <a
                    href={`mailto:${selectedContact.email}`}
                    className="font-medium text-white hover:text-[#38A7F0] transition truncate block"
                  >
                    {selectedContact.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Phone size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Phone Number</div>
                  {selectedContact.phone ? (
                    <a
                      href={`tel:${selectedContact.phone}`}
                      className="font-medium text-white hover:text-[#38A7F0] transition"
                    >
                      {selectedContact.phone}
                    </a>
                  ) : (
                    <div className="font-medium text-white/50">Not provided</div>
                  )}
                </div>
              </div>
            </div>

            {/* FULL MESSAGE BOX */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                <MessageSquare size={14} className="text-[#38A7F0]" />
                <span>Message</span>
              </div>
              <div className="bg-[#070d1c] border border-white/10 rounded-xl p-4 text-white/90 text-sm leading-relaxed whitespace-pre-wrap max-h-56 overflow-y-auto selection:bg-[#38A7F0]/30">
                {selectedContact.message || "No message content."}
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                onClick={() => handleDelete(selectedContact._id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 text-xs font-semibold transition"
                title="Delete Inquiry"
              >
                <Trash2 size={14} />
                <span>Delete Inquiry</span>
              </button>

              <button
                onClick={() => setSelectedContact(null)}
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