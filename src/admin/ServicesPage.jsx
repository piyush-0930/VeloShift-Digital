import { useEffect, useState } from "react";

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fmt = (d) => (d ? new Date(d).toLocaleString() : "-");

  // ✅ FETCH
  const fetchServices = async () => {
    try {
      const res = await fetch("https://veloshift-backend.onrender.com/api/quotes");
      const data = await res.json();

      if (data.success) setServices(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  // ✅ STATUS UPDATE
  const handleStatusChange = async (id, status) => {
    try {
      await fetch(`https://veloshift-backend.onrender.com/api/quotes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      setServices((prev) =>
        prev.map((s) => (s._id === id ? { ...s, status } : s))
      );
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ STATUS COLOR
  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-400";
      case "contacted":
        return "bg-blue-500/20 text-blue-400";
      case "closed":
        return "bg-green-500/20 text-green-400";
      default:
        return "";
    }
  };

  // ✅ STATS
  const stats = {
    total: services.length,
    pending: services.filter((s) => s.status === "pending").length,
    contacted: services.filter((s) => s.status === "contacted").length,
    closed: services.filter((s) => s.status === "closed").length,
  };

  // ✅ FILTER + SEARCH
  const filtered = services.filter((s) => {
    const matchesFilter = filter === "all" || s.status === filter;

    const searchLower = search.toLowerCase();
    const matchesSearch =
      s.name?.toLowerCase().includes(searchLower) ||
      s.email?.toLowerCase().includes(searchLower) ||
      s.service?.toLowerCase().includes(searchLower);

    return matchesFilter && matchesSearch;
  });

  // ✅ EXPORT CSV
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

    const rows = services.map((s) => [
      s.name,
      s.email,
      s.phone,
      s.service,
      s.subService,
      s.company || "",
      s.preferredTime || "",
      s.status,
      fmt(s.createdAt),
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "quotes.csv";
    link.click();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Service Requests</h1>

      {/* DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card title="Total" value={stats.total} color="bg-white/10" />
        <Card title="Pending" value={stats.pending} color="bg-yellow-500/20" />
        <Card title="Contacted" value={stats.contacted} color="bg-blue-500/20" />
        <Card title="Closed" value={stats.closed} color="bg-green-500/20" />
      </div>

      {/* SEARCH + FILTER + EXPORT */}
      <div className="mb-4 flex flex-col md:flex-row gap-3 md:justify-between md:items-center">
        <h2 className="text-lg font-semibold">Requests</h2>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 rounded border border-white/20 bg-[#0b1324] text-white text-sm"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 rounded border border-white/20 bg-[#0b1324] text-white text-sm"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="contacted">Contacted</option>
            <option value="closed">Closed</option>
          </select>

          <button
            onClick={exportCSV}
            className="px-3 py-2 bg-indigo-500 rounded text-sm"
          >
            Export CSV
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl">
        <table className="w-full text-sm">

          <thead className="bg-[var(--admin-card)]">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Service</th>
              <th className="p-3">Sub Service</th>
              <th className="p-3">Company</th>
              <th className="p-3">Preferred Time</th>
              <th className="p-3">Status</th>
              <th className="p-3">Received</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="9" className="p-6 text-center text-white/60">
                  No requests found
                </td>
              </tr>
            ) : (
              filtered.map((s) => (
                <tr
                  key={s._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.phone}</td>
                  <td className="p-3">{s.service}</td>
                  <td className="p-3">{s.subService}</td>
                  <td className="p-3">{s.company || "-"}</td>
                  <td className="p-3">{s.preferredTime || "-"}</td>

                  <td className="p-3">
                    <select
                      value={s.status || "pending"}
                      onChange={(e) =>
                        handleStatusChange(s._id, e.target.value)
                      }
                      className={`px-2 py-1 rounded border ${getStatusColor(
                        s.status
                      )}`}
                    >
                      <option value="pending">Pending</option>
                      <option value="contacted">Contacted</option>
                      <option value="closed">Closed</option>
                    </select>
                  </td>

                  <td className="p-3">{fmt(s.createdAt)}</td>
                </tr>
              ))
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