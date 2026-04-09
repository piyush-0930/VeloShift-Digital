import { useEffect, useState } from "react";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [editingLead, setEditingLead] = useState(null);

  const [form, setForm] = useState({
    client: "",
    poc: "",
    duration: "",
    amount: "",
    projectStatus: "",
    paymentStatus: "",
    notes: "",
  });

  const API = "https://veloshift-backend.onrender.com/api/leads";

  // ✅ FORMAT DURATION
  const formatDuration = (duration) => {
    if (!duration) return "-";
    if (typeof duration === "object") {
      return `${duration.value || ""} ${duration.unit || ""}`.trim();
    }
    return duration;
  };

  // ✅ EXPORT CSV
  const exportCSV = () => {
    const headers = [
      "Client",
      "POC",
      "Duration",
      "Amount",
      "Project Status",
      "Payment Status",
      "Notes",
    ];

    const rows = leads.map((l) => [
      l.client,
      l.poc || "",
      formatDuration(l.duration),
      l.amount,
      l.projectStatus,
      l.paymentStatus,
      l.notes || "",
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "leads.csv";
    link.click();
  };

  const fetchLeads = async () => {
    try {
      let url = `${API}?page=${page}&limit=50`;
      if (filter !== "all") url += `&projectStatus=${filter}`;
      if (search) url += `&search=${search}`;

      const res = await fetch(url);
      const data = await res.json();
      setLeads(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page, filter, search]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      client: "",
      poc: "",
      duration: "",
      amount: "",
      projectStatus: "",
      paymentStatus: "",
      notes: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.client || !form.amount || !form.duration) {
      alert("Client, Amount & Duration required");
      return;
    }

    const payload = {
      ...form,
      amount: Number(form.amount),
      projectStatus: form.projectStatus || "prospect",
      paymentStatus: form.paymentStatus || "pending",
    };

    if (editingLead) {
      await fetch(`${API}/${editingLead._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    setEditingLead(null);
    resetForm();
    fetchLeads();
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setForm({
      client: lead.client || "",
      poc: lead.poc || "",
      duration: formatDuration(lead.duration),
      amount: lead.amount || "",
      projectStatus: lead.projectStatus || "",
      paymentStatus: lead.paymentStatus || "",
      notes: lead.notes || "",
    });
  };

  const deleteLead = async (id) => {
    if (!window.confirm("Delete this lead?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchLeads();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "prospect":
        return "bg-yellow-500/20 text-yellow-400";
      case "inprogress":
        return "bg-blue-500/20 text-blue-400";
      case "completed":
        return "bg-green-500/20 text-green-400";
      default:
        return "";
    }
  };

  const stats = {
    total: leads.length,
    revenue: leads.reduce((a, l) => a + Number(l.amount || 0), 0),
    pending: leads.filter((l) => l.paymentStatus !== "paid").length,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leads Tracker</h1>

      {/* DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total" value={stats.total} color="bg-white/10" />
        <Card title="Revenue" value={`₹${stats.revenue}`} color="bg-green-500/20" />
        <Card title="Pending" value={stats.pending} color="bg-yellow-500/20" />
      </div>

      {/* FORM (🔥 BACK ADDED) */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-3 mb-6">
        <Input name="client" value={form.client} onChange={handleChange} placeholder="Client" />
        <Input name="poc" value={form.poc} onChange={handleChange} placeholder="POC" />
        <Input name="duration" value={form.duration} onChange={handleChange} placeholder="10 Jan - 1 Feb" />
        <Input name="amount" value={form.amount} onChange={handleChange} type="number" placeholder="Amount" />

        <Select name="projectStatus" value={form.projectStatus} onChange={handleChange}>
          <option value="">Project Status</option>
          <option value="prospect">Prospect</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </Select>

        <Select name="paymentStatus" value={form.paymentStatus} onChange={handleChange}>
          <option value="">Payment Status</option>
          <option value="pending">Pending</option>
          <option value="partial">Partial</option>
          <option value="paid">Paid</option>
        </Select>

        <Input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />

        <button className="col-span-4 px-3 py-2 bg-indigo-500 rounded text-sm">
          {editingLead ? "Update Lead" : "Add Lead"}
        </button>
      </form>

      {/* SERVICES STYLE FILTER BAR */}
      <div className="mb-4 flex flex-col md:flex-row gap-3 md:justify-between md:items-center">
        <h2 className="text-lg font-semibold">Leads</h2>

        <div className="flex gap-2 flex-wrap">
          <input
            placeholder="Search client or POC..."
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
            <option value="prospect">Prospect</option>
            <option value="inprogress">In Progress</option>
            <option value="completed">Completed</option>
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
              <th className="p-3">Client</th>
              <th className="p-3">POC</th>
              <th className="p-3">Duration</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Project</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Notes</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan="8" className="p-6 text-center text-white/60">
                  No leads found
                </td>
              </tr>
            ) : (
              leads.map((l) => (
                <tr key={l._id} className="border-t border-white/10 hover:bg-white/5">
                  <td className="p-3">{l.client}</td>
                  <td className="p-3">{l.poc || "-"}</td>
                  <td className="p-3">{formatDuration(l.duration)}</td>
                  <td className="p-3">₹{l.amount}</td>
                  <td className="p-3">
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(l.projectStatus)}`}>
                      {l.projectStatus}
                    </span>
                  </td>
                  <td className="p-3">
                    <span className="px-2 py-1 rounded text-xs bg-white/10">
                      {l.paymentStatus}
                    </span>
                  </td>
                  <td className="p-3">{l.notes || "-"}</td>

                  <td className="p-3 flex gap-2">
                    <button onClick={() => handleEdit(l)} className="bg-indigo-500 px-2 py-1 rounded text-xs">
                      Edit
                    </button>
                    <button onClick={() => deleteLead(l._id)} className="bg-red-500 px-2 py-1 rounded text-xs">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// UI
function Input(props) {
  return <input {...props} className="px-3 py-2 rounded border border-white/20 bg-[#0b1324] text-white text-sm" />;
}

function Select(props) {
  return <select {...props} className="px-3 py-2 rounded border border-white/20 bg-[#0b1324] text-white text-sm" />;
}

function Card({ title, value, color }) {
  return (
    <div className={`p-4 rounded-xl border border-white/10 ${color}`}>
      <p className="text-sm text-white/60">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}