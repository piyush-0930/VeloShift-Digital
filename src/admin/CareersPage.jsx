import { useEffect, useState } from "react";
import { get, put } from "../utils/api";

export default function CareersPage() {
  const [applications, setApplications] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        const res = await get("/api/careers");
        setApplications(Array.isArray(res) ? res : []);
      } catch (err) {
        console.error("Error fetching careers:", err);
        setApplications([]);
      }
    }

    loadData();
  }, []);

  const fmt = (d) => (d ? new Date(d).toLocaleString() : "-");

  const handleStatusChange = async (id, status) => {
    try {
      await put(`/api/careers/${id}/status`, { status });

      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, status } : app
        )
      );
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "received":
        return "bg-blue-100 text-blue-700";
      case "in_progress":
        return "bg-yellow-100 text-yellow-700";
      case "shortlisted":
        return "bg-green-100 text-green-700";
      case "rejected":
        return "bg-red-100 text-red-700";
      default:
        return "";
    }
  };

  // ✅ STATS
  const stats = {
    total: applications.length,
    received: applications.filter((a) => a.status === "received").length,
    in_progress: applications.filter((a) => a.status === "in_progress").length,
    shortlisted: applications.filter((a) => a.status === "shortlisted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  // ✅ FILTER + SEARCH COMBINED
  const filteredApplications = applications.filter((a) => {
    const matchesFilter = filter === "all" || a.status === filter;

    const searchLower = search.toLowerCase();
    const matchesSearch =
      a.name?.toLowerCase().includes(searchLower) ||
      a.email?.toLowerCase().includes(searchLower);

    return matchesFilter && matchesSearch;
  });

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Career Applications</h1>

      {/* 🔥 DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card title="Total" value={stats.total} color="bg-white/10" />
        <Card title="Received" value={stats.received} color="bg-blue-500/20" />
        <Card title="In Progress" value={stats.in_progress} color="bg-yellow-500/20" />
        <Card title="Shortlisted" value={stats.shortlisted} color="bg-green-500/20" />
        <Card title="Rejected" value={stats.rejected} color="bg-red-500/20" />
      </div>

      {/* 🔍 SEARCH + FILTER */}
      <div className="mb-4 flex flex-col md:flex-row gap-3 md:justify-between md:items-center">
        <h2 className="text-lg font-semibold">Applications</h2>

        <div className="flex gap-2">
          {/* 🔍 SEARCH */}
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded border border-white/20 bg-[#0b1324] text-white text-sm placeholder:text-white/40 focus:outline-none"
          />

          {/* 🎨 FIXED FILTER DROPDOWN */}
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded border border-white/20 bg-[#0b1324] text-white text-sm focus:outline-none"
          >
            <option value="all">All</option>
            <option value="received">Received</option>
            <option value="in_progress">In Progress</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto border border-white/10 rounded-xl">
        <table className="w-full text-sm">

          <thead className="bg-[var(--admin-card)]">
            <tr className="text-left">
              <th className="p-3">Name</th><th className="p-3">Email</th><th className="p-3">Phone</th><th className="p-3">Role</th><th className="p-3">Resume</th><th className="p-3">Status</th><th className="p-3">Applied</th>
            </tr>
          </thead>

          <tbody>
            {filteredApplications.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-6 text-center text-white/60">
                  No applications found
                </td>
              </tr>
            ) : (
              filteredApplications.map((c) => {
                const viewUrl = c.resumeUrl || "#";

                const downloadUrl = c.resumeUrl
                  ? c.resumeUrl.replace("/upload/", "/upload/fl_attachment/")
                  : "#";

                return (
                  <tr
                    key={c._id}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className="p-3">{c.name}</td>
                    <td className="p-3">{c.email}</td>
                    <td className="p-3">{c.phone || "-"}</td>
                    <td className="p-3">{c.role}</td>

                    <td className="p-3 flex gap-2">
                      {c.resumeUrl ? (
                        <>
                          <a href={viewUrl} target="_blank" rel="noreferrer" className="px-2 py-1 text-xs border border-white/20 rounded hover:bg-white/10">View</a>
                          <a href={downloadUrl} className="px-2 py-1 text-xs bg-[var(--admin-accent)] text-white rounded hover:opacity-90">Download</a>
                        </>
                      ) : "-"}
                    </td>

                    <td className="p-3">
                      <select
                        value={c.status || "received"}
                        onChange={(e) =>
                          handleStatusChange(c._id, e.target.value)
                        }
                        className={`px-2 py-1 rounded border ${getStatusColor(
                          c.status
                        )}`}
                      >
                        <option value="received">Received</option>
                        <option value="in_progress">In Progress</option>
                        <option value="shortlisted">Shortlisted</option>
                        <option value="rejected">Rejected</option>
                      </select>
                    </td>

                    <td className="p-3">{fmt(c.createdAt)}</td>
                  </tr>
                );
              })
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}

/* CARD */
function Card({ title, value, color }) {
  return (
    <div className={`p-4 rounded-xl border border-white/10 ${color}`}>
      <p className="text-sm text-white/60">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}