import { useEffect, useState, useCallback } from "react";
import { get, post, put, patch, del } from "../utils/api";
import {
  Briefcase,
  Plus,
  Edit3,
  Trash2,
  X,
  CheckCircle2,
  Clock,
  MapPin,
  Tag,
  ToggleLeft,
  ToggleRight,
  Layers,
  Sparkles,
} from "lucide-react";

const INITIAL_FORM = {
  role: "",
  department: "Engineering",
  exp: "0–2 yrs",
  location: "Remote / Hybrid",
  type: "Full-Time",
  tags: "",
  description: "",
  isActive: true,
};

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(INITIAL_FORM);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const loadJobs = useCallback(async () => {
    try {
      const res = await get("/api/jobs/admin");
      if (res && res.data) {
        setJobs(res.data || []);
      }
    } catch (err) {
      console.error("Error loading jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadJobs();
  }, [loadJobs]);

  const openAddModal = () => {
    setEditingId(null);
    setForm(INITIAL_FORM);
    setModalOpen(true);
  };

  const openEditModal = (job) => {
    setEditingId(job._id);
    setForm({
      role: job.role || "",
      department: job.department || "Engineering",
      exp: job.exp || "0–2 yrs",
      location: job.location || "Remote / Hybrid",
      type: job.type || "Full-Time",
      tags: Array.isArray(job.tags) ? job.tags.join(", ") : "",
      description: job.description || "",
      isActive: Boolean(job.isActive),
    });
    setModalOpen(true);
  };

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!form.role.trim()) {
      alert("Job role title is required.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        ...form,
        tags: form.tags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };

      if (editingId) {
        const res = await put(`/api/jobs/${editingId}`, payload);
        if (res && res.success) {
          setToastMessage("Job vacancy updated successfully");
        }
      } else {
        const res = await post("/api/jobs", payload);
        if (res && res.success) {
          setToastMessage("New job opening published");
        }
      }

      setModalOpen(false);
      setEditingId(null);
      setForm(INITIAL_FORM);
      loadJobs();
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Failed to save job vacancy:", err);
      alert("Failed to save job opening. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleStatus = async (job) => {
    try {
      const res = await patch(`/api/jobs/${job._id}/toggle`, {});
      if (res && res.success) {
        const newStatus = res.data?.isActive;
        setJobs((prev) =>
          prev.map((j) => (j._id === job._id ? { ...j, isActive: newStatus } : j))
        );
        setToastMessage(
          `"${job.role}" is now ${newStatus ? "Active (Hiring)" : "Paused (Closed)"}`
        );
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      console.error("Toggle error:", err);
    }
  };

  const handleDelete = async (id, roleName) => {
    if (!window.confirm(`Are you sure you want to permanently delete the "${roleName}" opening?`)) {
      return;
    }

    try {
      const res = await del(`/api/jobs/${id}`);
      if (res && (res.success || !res.error)) {
        setJobs((prev) => prev.filter((j) => j._id !== id));
        setToastMessage(`Job opening "${roleName}" deleted`);
        setTimeout(() => setToastMessage(""), 3000);
      }
    } catch (err) {
      console.error("Delete job error:", err);
    }
  };

  const handleSeedDefaults = async () => {
    if (!window.confirm("Seed the 6 default company positions into the database?")) return;
    try {
      const res = await post("/api/jobs/seed", {});
      if (res && res.success) {
        setToastMessage("Default job openings restored");
        setTimeout(() => setToastMessage(""), 3000);
        loadJobs();
      } else {
        alert(res?.message || "Failed to seed jobs.");
      }
    } catch (err) {
      console.error("Seed error:", err);
      alert("Failed to seed default jobs.");
    }
  };

  // Filter + Search
  const filteredJobs = jobs.filter((j) => {
    let matchesFilter = true;
    if (filter === "active") matchesFilter = j.isActive === true;
    if (filter === "paused") matchesFilter = j.isActive === false;
    if (filter === "fulltime") matchesFilter = j.type === "Full-Time";
    if (filter === "internship") matchesFilter = j.type === "Internship";

    const term = search.toLowerCase();
    const matchesSearch =
      !term ||
      j.role?.toLowerCase().includes(term) ||
      j.department?.toLowerCase().includes(term) ||
      j.location?.toLowerCase().includes(term) ||
      (Array.isArray(j.tags) && j.tags.some((t) => t.toLowerCase().includes(term)));

    return matchesFilter && matchesSearch;
  });

  // Metrics
  const stats = {
    total: jobs.length,
    active: jobs.filter((j) => j.isActive).length,
    paused: jobs.filter((j) => !j.isActive).length,
    internships: jobs.filter((j) => j.type === "Internship").length,
  };

  return (
    <div className="space-y-6">
      {/* HEADER & TOAST */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Job Openings</h1>
          <p className="text-white/60 text-sm mt-1">
            Create, edit, pause, and manage live vacancies displayed on the VeloShift Careers portal.
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
            <span>Post New Opening</span>
          </button>
        </div>
      </div>

      {/* STATS TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-white/60 text-xs font-medium uppercase tracking-wider">
            <span>Total Roles</span>
            <Briefcase size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-white">{stats.total}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-medium uppercase tracking-wider">
            <span>Active (Hiring)</span>
            <CheckCircle2 size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-emerald-400">{stats.active}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-amber-400 text-xs font-medium uppercase tracking-wider">
            <span>Paused / Closed</span>
            <Clock size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-amber-400">{stats.paused}</div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-purple-400 text-xs font-medium uppercase tracking-wider">
            <span>Internships</span>
            <Sparkles size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-purple-400">{stats.internships}</div>
        </div>
      </div>

      {/* CONTROLS BAR: SEARCH & FILTERS */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--admin-card)] border border-white/10 rounded-xl p-3">
        <input
          type="text"
          placeholder="Search by role title, department, or skill tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
        />

        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
          {[
            { id: "all", label: "All Openings" },
            { id: "active", label: "Active" },
            { id: "paused", label: "Paused" },
            { id: "fulltime", label: "Full-Time" },
            { id: "internship", label: "Internships" },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setFilter(t.id)}
              className={`px-3 py-1.5 rounded-lg font-medium transition whitespace-nowrap ${
                filter === t.id
                  ? "bg-[#38A7F0] text-white shadow-sm"
                  : "bg-white/5 hover:bg-white/10 text-white/70 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* JOBS TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl bg-[var(--admin-card)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/60">
              <th className="p-3.5">Position & Department</th>
              <th className="p-3.5">Experience</th>
              <th className="p-3.5">Location</th>
              <th className="p-3.5">Type</th>
              <th className="p-3.5">Tech Tags</th>
              <th className="p-3.5">Website Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="p-10 text-center text-white/50">
                  Loading career listings...
                </td>
              </tr>
            ) : filteredJobs.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-12 text-center">
                  <div className="max-w-md mx-auto space-y-3">
                    <p className="text-white/60 text-sm">
                      {jobs.length === 0
                        ? "No job vacancies currently exist in the database."
                        : "No job openings found matching your search / filter criteria."}
                    </p>
                    {jobs.length === 0 && (
                      <div className="flex items-center justify-center gap-3 pt-2">
                        <button
                          onClick={openAddModal}
                          className="px-3.5 py-1.5 rounded-lg bg-[#38A7F0] hover:bg-[#2b92d6] text-white text-xs font-semibold transition"
                        >
                          + Post New Opening
                        </button>
                        <button
                          onClick={handleSeedDefaults}
                          className="px-3.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 hover:text-white border border-white/10 text-xs font-medium transition"
                        >
                          Restore 6 Default Roles
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              filteredJobs.map((j) => (
                <tr
                  key={j._id}
                  className="border-b border-white/5 hover:bg-white/[0.03] transition"
                >
                  <td className="p-3.5">
                    <div>
                      <div className="font-medium text-white">{j.role}</div>
                      <div className="text-[11px] text-white/50">{j.department || "General"}</div>
                    </div>
                  </td>

                  <td className="p-3.5 text-white/80 text-xs">{j.exp}</td>

                  <td className="p-3.5 text-white/70 text-xs">
                    <div className="flex items-center gap-1">
                      <MapPin size={12} className="text-white/40" />
                      <span>{j.location}</span>
                    </div>
                  </td>

                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-xs text-white/80 font-medium">
                      {j.type}
                    </span>
                  </td>

                  <td className="p-3.5">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {Array.isArray(j.tags) && j.tags.length > 0 ? (
                        j.tags.map((t, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded bg-white/[0.04] text-[10px] text-white/70 border border-white/5"
                          >
                            {t}
                          </span>
                        ))
                      ) : (
                        <span className="text-white/30 text-xs">-</span>
                      )}
                    </div>
                  </td>

                  <td className="p-3.5">
                    <button
                      onClick={() => handleToggleStatus(j)}
                      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition cursor-pointer hover:opacity-85 ${
                        j.isActive
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/15 text-amber-400 border-amber-500/30"
                      }`}
                      title="Click to toggle Open / Paused status on website"
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          j.isActive ? "bg-emerald-400" : "bg-amber-400"
                        }`}
                      />
                      <span>{j.isActive ? "Active (Hiring)" : "Paused (Closed)"}</span>
                    </button>
                  </td>

                  <td className="p-3.5 text-right">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        onClick={() => openEditModal(j)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#38A7F0]/20 text-[#38A7F0] hover:text-[#5bc1ff] transition border border-white/10 hover:border-[#38A7F0]/40 text-xs font-medium"
                        title="Edit vacancy details"
                      >
                        <Edit3 size={13} />
                        <span>Edit</span>
                      </button>

                      <button
                        onClick={() => handleDelete(j._id, j.role)}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition border border-red-500/20 text-xs font-medium"
                        title="Delete vacancy"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ADD / EDIT VACANCY MODAL */}
      {modalOpen && (
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
                  <h2 className="text-lg font-bold">
                    {editingId ? "Edit Job Vacancy" : "Post New Job Vacancy"}
                  </h2>
                  <p className="text-xs text-white/60 mt-0.5">
                    Configure opening specifications, candidate criteria, and website visibility.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setModalOpen(false)}
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
                    Job Role Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="role"
                    value={form.role}
                    onChange={handleFormChange}
                    placeholder="e.g. AI Engineer, Senior Full Stack..."
                    required
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">Department</label>
                  <input
                    name="department"
                    value={form.department}
                    onChange={handleFormChange}
                    placeholder="e.g. Engineering, AI, Cloud, Design..."
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">Experience Level</label>
                  <input
                    name="exp"
                    value={form.exp}
                    onChange={handleFormChange}
                    placeholder="e.g. 0–2 yrs, 2–4 yrs"
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">Work Location</label>
                  <input
                    name="location"
                    value={form.location}
                    onChange={handleFormChange}
                    placeholder="Remote / Hybrid, Noida..."
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">Job Type</label>
                  <select
                    name="type"
                    value={form.type}
                    onChange={handleFormChange}
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#38A7F0]"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Internship">Internship</option>
                    <option value="Contract">Contract</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70">
                  Required Skills / Tags (comma separated)
                </label>
                <input
                  name="tags"
                  value={form.tags}
                  onChange={handleFormChange}
                  placeholder="e.g. React, Node.js, AWS, TypeScript"
                  className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-white/70">
                  Role Description / Candidate Responsibilities
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={form.description}
                  onChange={handleFormChange}
                  placeholder="Key deliverables, tech challenges, and day-to-day work..."
                  className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0] resize-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="isActive"
                  name="isActive"
                  checked={form.isActive}
                  onChange={handleFormChange}
                  className="w-4 h-4 rounded border-white/20 bg-[#091122] text-[#38A7F0] focus:ring-0 cursor-pointer"
                />
                <label htmlFor="isActive" className="text-xs font-medium text-white/80 cursor-pointer">
                  Publish vacancy immediately on Careers page (Active / Hiring)
                </label>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
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
                    ? "Update Vacancy"
                    : "Publish Opening"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
