import { useEffect, useState } from "react";
import { get, put, del } from "../utils/api";
import {
  Eye,
  Trash2,
  X,
  FileText,
  Mail,
  Phone,
  Briefcase,
  Calendar,
  User,
  Download,
  ExternalLink,
  CheckCircle2,
  Inbox,
  Clock,
  Award,
  XCircle,
} from "lucide-react";

const STATUS_CONFIG = {
  received: {
    label: "Received",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    dot: "bg-blue-400",
  },
  in_progress: {
    label: "In Progress",
    badge: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
    dot: "bg-yellow-400",
  },
  shortlisted: {
    label: "Shortlisted",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  rejected: {
    label: "Rejected",
    badge: "bg-red-500/15 text-red-400 border-red-500/30",
    dot: "bg-red-400",
  },
};

export default function CareersPage() {
  const [applications, setApplications] = useState([]);
  const [selectedApp, setSelectedApp] = useState(null);
  const [updating, setUpdating] = useState(false);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [toastMessage, setToastMessage] = useState("");

  const loadData = async () => {
    try {
      const res = await get("/api/careers");
      setApplications(Array.isArray(res) ? res : []);
    } catch (err) {
      console.error("Error fetching careers:", err);
      setApplications([]);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const fmt = (d) => (d ? new Date(d).toLocaleString() : "-");

  const handleStatusChange = async (id, status) => {
    setUpdating(true);
    try {
      const res = await put(`/api/careers/${id}/status`, { status });
      if (res && (res.success || !res.error)) {
        setApplications((prev) =>
          prev.map((app) => (app._id === id ? { ...app, status } : app))
        );
        if (selectedApp && selectedApp._id === id) {
          setSelectedApp((prev) => ({ ...prev, status }));
        }
        setToastMessage(`Application marked as ${STATUS_CONFIG[status]?.label || status}`);
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      console.error("Status update failed:", err);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to permanently delete this career application?")) {
      return;
    }

    try {
      const res = await del(`/api/careers/${id}`);
      if (res && (res.success || !res.error)) {
        setApplications((prev) => prev.filter((app) => app._id !== id));
        if (selectedApp?._id === id) {
          setSelectedApp(null);
        }
        setToastMessage("Application deleted successfully");
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      console.error("Delete application failed:", err);
    }
  };

  // Filtering
  const filteredApplications = applications.filter((a) => {
    const matchesFilter = filter === "all" || (a.status || "received") === filter;
    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      a.name?.toLowerCase().includes(term) ||
      a.email?.toLowerCase().includes(term) ||
      a.role?.toLowerCase().includes(term);
    return matchesFilter && matchesSearch;
  });

  // Statistics
  const stats = {
    total: applications.length,
    received: applications.filter((a) => (a.status || "received") === "received").length,
    in_progress: applications.filter((a) => a.status === "in_progress").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  return (
    <div className="space-y-6">
      {/* HEADER & TOAST */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Career Applications</h1>
          <p className="text-white/60 text-sm mt-1">
            Review candidate submissions, inspect resumes, and manage applicant hiring stages.
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
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-white/60 text-xs font-medium uppercase tracking-wider">
            <span>Total</span>
            <Inbox size={15} />
          </div>
          <div className="text-2xl font-bold mt-2">{stats.total}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-blue-400 text-xs font-medium uppercase tracking-wider">
            <span>Received</span>
            <Clock size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-blue-400">{stats.received}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-yellow-400 text-xs font-medium uppercase tracking-wider">
            <span>Reviewing</span>
            <Briefcase size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-yellow-400">{stats.in_progress}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-medium uppercase tracking-wider">
            <span>Shortlisted</span>
            <Award size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-emerald-400">{stats.shortlisted}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-red-400 text-xs font-medium uppercase tracking-wider">
            <span>Rejected</span>
            <XCircle size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-red-400">{stats.rejected}</div>
        </div>
      </div>

      {/* CONTROLS BAR: SEARCH & FILTER */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--admin-card)] border border-white/10 rounded-xl p-3">
        <input
          type="text"
          placeholder="Search by candidate name, email, or role..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-72 bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
        />

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {["all", "received", "in_progress", "shortlisted", "rejected"].map((st) => (
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

      {/* APPLICATIONS TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl bg-[var(--admin-card)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/60">
              <th className="p-3.5">Candidate</th>
              <th className="p-3.5">Email</th>
              <th className="p-3.5">Phone</th>
              <th className="p-3.5">Role</th>
              <th className="p-3.5">Resume</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5">Applied</th>
              <th className="p-3.5 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplications.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-10 text-center text-white/50">
                  No applications found matching the criteria.
                </td>
              </tr>
            ) : (
              filteredApplications.map((c) => {
                const statusKey = c.status || "received";
                const cfg = STATUS_CONFIG[statusKey] || STATUS_CONFIG.received;
                const viewUrl = c.resumeUrl || "#";
                const downloadUrl = c.resumeUrl
                  ? c.resumeUrl.replace("/upload/", "/upload/fl_attachment/")
                  : "#";

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
                    <td className="p-3.5 text-white/90">
                      <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs font-medium">
                        {c.role}
                      </span>
                    </td>

                    <td className="p-3.5">
                      {c.resumeUrl ? (
                        <div className="flex items-center gap-1.5">
                          <a
                            href={viewUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition"
                            title="Preview resume in new tab"
                          >
                            <ExternalLink size={12} />
                            <span>PDF</span>
                          </a>
                          <a
                            href={downloadUrl}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-[#38A7F0]/15 hover:bg-[#38A7F0]/25 text-[#38A7F0] hover:text-[#5bc1ff] border border-[#38A7F0]/30 transition"
                            title="Download resume document"
                          >
                            <Download size={12} />
                          </a>
                        </div>
                      ) : (
                        <span className="text-white/40">-</span>
                      )}
                    </td>

                    <td className="p-3.5">
                      <select
                        value={statusKey}
                        onChange={(e) => handleStatusChange(c._id, e.target.value)}
                        className={`px-2.5 py-1 rounded-lg text-xs font-medium border bg-[#0b1328] focus:outline-none focus:border-[#38A7F0] transition ${cfg.badge}`}
                      >
                        <option value="received">Received</option>
                        <option value="in_progress">In Progress</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-white/60 text-xs">{fmt(c.createdAt)}</td>

                    <td className="p-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => setSelectedApp(c)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#38A7F0]/20 text-[#38A7F0] hover:text-[#5bc1ff] transition border border-white/10 hover:border-[#38A7F0]/40 text-xs font-medium"
                          title="View application details"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => handleDelete(c._id)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition border border-red-500/20 text-xs font-medium"
                          title="Delete application"
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

      {/* DETAIL & REVIEW MODAL */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className="bg-[#0b1328] border border-white/10 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative text-white space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#38A7F0]/15 border border-[#38A7F0]/30 flex items-center justify-center text-[#38A7F0]">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Candidate Application Details</h2>
                  <p className="text-xs text-white/60 mt-0.5">
                    Applied for <span className="text-[#38A7F0] font-medium">{selectedApp.role}</span> on {fmt(selectedApp.createdAt)}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedApp(null)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
              >
                <X size={18} />
              </button>
            </div>

            {/* STATUS UPDATE CONTROLLER */}
            <div className="bg-white/[0.03] border border-white/10 p-4 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Application Status
                </label>
                {updating && (
                  <span className="text-xs text-[#38A7F0] animate-pulse">
                    Updating...
                  </span>
                )}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                {["received", "in_progress", "shortlisted", "rejected"].map((st) => {
                  const isCurrent = (selectedApp.status || "received") === st;
                  const cfg = STATUS_CONFIG[st];

                  return (
                    <button
                      key={st}
                      disabled={updating}
                      onClick={() => handleStatusChange(selectedApp._id, st)}
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

            {/* CANDIDATE DETAILS GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-white/[0.02] border border-white/10 p-4 rounded-xl text-sm">
              <div className="flex items-center gap-2.5 text-white/80">
                <User size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Full Name</div>
                  <div className="font-medium text-white">{selectedApp.name}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Briefcase size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Applied Position</div>
                  <div className="font-medium text-white">{selectedApp.role}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Mail size={16} className="text-[#38A7F0] shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-xs text-white/40">Email Address</div>
                  <a
                    href={`mailto:${selectedApp.email}`}
                    className="font-medium text-white hover:text-[#38A7F0] transition truncate block"
                  >
                    {selectedApp.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-white/80">
                <Phone size={16} className="text-[#38A7F0] shrink-0" />
                <div>
                  <div className="text-xs text-white/40">Phone Number</div>
                  {selectedApp.phone ? (
                    <a
                      href={`tel:${selectedApp.phone}`}
                      className="font-medium text-white hover:text-[#38A7F0] transition"
                    >
                      {selectedApp.phone}
                    </a>
                  ) : (
                    <div className="font-medium text-white/50">Not provided</div>
                  )}
                </div>
              </div>
            </div>

            {/* RESUME ACCESS CARD */}
            {selectedApp.resumeUrl && (
              <div className="flex items-center justify-between bg-white/[0.03] border border-white/10 p-3.5 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <FileText size={18} className="text-[#38A7F0]" />
                  <div>
                    <div className="text-xs font-medium text-white">Curriculum Vitae / Resume</div>
                    <div className="text-[11px] text-white/50">Stored securely on cloud storage</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={selectedApp.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-medium border border-white/10 transition"
                  >
                    <ExternalLink size={13} />
                    <span>View PDF</span>
                  </a>
                  <a
                    href={selectedApp.resumeUrl.replace("/upload/", "/upload/fl_attachment/")}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#38A7F0] hover:bg-[#2b92d6] text-white text-xs font-semibold transition"
                  >
                    <Download size={13} />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            )}

            {/* COVER LETTER BOX */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-white/70">
                <FileText size={14} className="text-[#38A7F0]" />
                <span>Cover Letter / Candidate Notes</span>
              </div>
              <div className="bg-[#070d1c] border border-white/10 rounded-xl p-4 text-white/90 text-sm leading-relaxed whitespace-pre-wrap max-h-48 overflow-y-auto selection:bg-[#38A7F0]/30">
                {selectedApp.coverLetter || "No cover letter provided."}
              </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <button
                onClick={() => handleDelete(selectedApp._id)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 text-xs font-semibold transition"
                title="Delete Application"
              >
                <Trash2 size={14} />
                <span>Delete Application</span>
              </button>

              <button
                onClick={() => setSelectedApp(null)}
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