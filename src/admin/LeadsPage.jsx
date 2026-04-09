import { useEffect, useState } from "react";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [editingLead, setEditingLead] = useState(null);

  // 🔥 NEW STATE (for duplicate prevention)
  const [loadingInvoiceId, setLoadingInvoiceId] = useState(null);

  const [form, setForm] = useState({
    client: "",
    poc: "",
    durationValue: "",
    durationUnit: "months",
    amount: "",
    projectStatus: "",
    paymentStatus: "",
    paymentDate: "",
    notes: "",
  });

  const API = "https://veloshift-backend.onrender.com/api/leads";

  // 🔥 FIXED CREATE INVOICE
  const generateInvoice = async (lead) => {
    try {
      setLoadingInvoiceId(lead._id);

      const res = await fetch("https://veloshift-backend.onrender.com/api/invoices", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          leadId: lead._id,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to create invoice");
      }

      alert("Invoice created 🚀");
    } catch (err) {
      console.error(err);
      alert(err.message);
    } finally {
      setLoadingInvoiceId(null);
    }
  };

  // 🔥 FIXED FETCH
  const fetchLeads = async () => {
    try {
      let url = `${API}?page=${page}&limit=50`;

      if (filter !== "all") url += `&projectStatus=${filter}`;
      if (search) url += `&search=${search}`;

      const res = await fetch(url);

      if (!res.ok) throw new Error("Failed to fetch leads");

      const data = await res.json();

      setLeads(data.data || []);
    } catch (err) {
      console.error(err);
      alert(err.message);
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
      durationValue: "",
      durationUnit: "months",
      amount: "",
      projectStatus: "",
      paymentStatus: "",
      paymentDate: "",
      notes: "",
    });
  };

  // CREATE / UPDATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.client || !form.amount) {
      alert("Client & Amount required");
      return;
    }

    const payload = {
      client: form.client,
      poc: form.poc,
      amount: Number(form.amount),
      projectStatus: form.projectStatus || "prospect",
      paymentStatus: form.paymentStatus || "pending",
      paymentDate: form.paymentDate || null,
      notes: form.notes,
      duration: form.durationValue
        ? {
            value: Number(form.durationValue),
            unit: form.durationUnit,
          }
        : undefined,
    };

    try {
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
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (lead) => {
    setEditingLead(lead);
    setForm({
      client: lead.client,
      poc: lead.poc || "",
      durationValue: lead.duration?.value || "",
      durationUnit: lead.duration?.unit || "months",
      amount: lead.amount,
      projectStatus: lead.projectStatus,
      paymentStatus: lead.paymentStatus,
      paymentDate: lead.paymentDate?.split("T")[0] || "",
      notes: lead.notes || "",
    });
  };

  const deleteLead = async (id) => {
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchLeads();
  };

  const fmt = (d) => (d ? new Date(d).toLocaleDateString() : "-");

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

  const exportCSV = () => {
    if (!leads.length) return alert("No data");

    const headers = ["Client","POC","Duration","Amount","Project Status","Payment Status","Payment Date","Notes"];

    const rows = leads.map((l) => [
      l.client,
      l.poc,
      l.duration ? `${l.duration.value} ${l.duration.unit}` : "",
      l.amount,
      l.projectStatus,
      l.paymentStatus,
      l.paymentDate,
      l.notes,
    ]);

    const csv =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((r) => r.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csv);
    link.download = "leads.csv";
    link.click();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leads Tracker</h1>

      {/* DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Leads" value={stats.total} color="bg-white/10" />
        <Card title="Revenue" value={`₹${stats.revenue}`} color="bg-blue-500/20" />
        <Card title="Pending Payments" value={stats.pending} color="bg-yellow-500/20" />
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="grid md:grid-cols-4 gap-3 mb-6">
        <Input name="client" value={form.client} onChange={handleChange} placeholder="Client" />
        <Input name="poc" value={form.poc} onChange={handleChange} placeholder="POC" />
        <Input name="durationValue" value={form.durationValue} onChange={handleChange} placeholder="Duration" />

        <Select name="durationUnit" value={form.durationUnit} onChange={handleChange}>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
          <option value="months">Months</option>
        </Select>

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
          <option value="overdue">Overdue</option>
          <option value="paid">Paid</option>
        </Select>

        <Input name="paymentDate" value={form.paymentDate} onChange={handleChange} type="date" />
        <Input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />

        <button className="col-span-4 px-3 py-2 bg-indigo-500 rounded text-sm">
          {editingLead ? "Update Lead" : "Add Lead"}
        </button>
      </form>

      {/* SEARCH + FILTER + CSV */}
      <div className="mb-4 flex flex-col md:flex-row gap-3 md:justify-between">
        <h2 className="text-lg font-semibold">Leads</h2>

        <div className="flex gap-2 flex-wrap">
          <input
            type="text"
            placeholder="Search client..."
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

          <button onClick={exportCSV} className="px-3 py-2 bg-indigo-500 rounded text-sm">
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
              <th className="p-3">Status</th>
              <th className="p-3">Payment</th>
              <th className="p-3">Payment Date</th>
              <th className="p-3">Notes</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((l) => (
              <tr key={l._id} className="border-t border-white/10 hover:bg-white/5">
                <td className="p-3">{l.client}</td>
                <td className="p-3">{l.poc || "-"}</td>

                <td className="p-3">
                  {l.duration ? `${l.duration.value} ${l.duration.unit}` : "-"}
                </td>

                <td className="p-3">₹{l.amount}</td>

                <td className="p-3">
                  <span className={`px-2 py-1 rounded text-xs ${getStatusColor(l.projectStatus)}`}>
                    {l.projectStatus}
                  </span>
                </td>

                <td className="p-3">{l.paymentStatus}</td>
                <td className="p-3">{fmt(l.paymentDate)}</td>

                <td className="p-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate">{l.notes || "-"}</span>

                    <div className="flex gap-1">
                      <button onClick={() => handleEdit(l)} className="bg-blue-500 px-2 py-1 rounded text-xs">
                        Edit
                      </button>

                      <button onClick={() => deleteLead(l._id)} className="bg-red-500 px-2 py-1 rounded text-xs">
                        Delete
                      </button>

                      <button
                        disabled={loadingInvoiceId === l._id}
                        onClick={() => generateInvoice(l)}
                        className="bg-green-500 px-2 py-1 rounded text-xs"
                      >
                        {loadingInvoiceId === l._id ? "Creating..." : "Invoice"}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

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