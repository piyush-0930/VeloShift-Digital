import { useEffect, useState, useCallback } from "react";
import { get, post, put, patch, del } from "../utils/api";
import {
  FileText,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Printer,
  Download,
  CheckCircle2,
  Clock,
  AlertTriangle,
  IndianRupee,
  Building,
  User,
  Calendar,
  X,
  PlusCircle,
} from "lucide-react";

const STATUS_CONFIG = {
  draft: {
    label: "Draft",
    badge: "bg-gray-500/15 text-gray-400 border-gray-500/30",
    dot: "bg-gray-400",
  },
  sent: {
    label: "Sent",
    badge: "bg-blue-500/15 text-blue-400 border-blue-500/30",
    dot: "bg-blue-400",
  },
  paid: {
    label: "Paid",
    badge: "bg-emerald-500/15 text-emerald-400 border-emerald-500/30",
    dot: "bg-emerald-400",
  },
  overdue: {
    label: "Overdue",
    badge: "bg-rose-500/15 text-rose-400 border-rose-500/30",
    dot: "bg-rose-400",
  },
  cancelled: {
    label: "Cancelled",
    badge: "bg-zinc-500/15 text-zinc-500 border-zinc-500/30",
    dot: "bg-zinc-500",
  },
};

const DEFAULT_LINE_ITEM = {
  description: "Web & Digital Solution Engineering - Phase 1",
  quantity: 1,
  rate: 25000,
  amount: 25000,
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [stats, setStats] = useState({
    totalInvoiced: 0,
    totalPaid: 0,
    totalPending: 0,
    overdueCount: 0,
    count: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [existingClients, setExistingClients] = useState([]);

  // Modals state
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Form state
  const [form, setForm] = useState({
    invoiceNumber: "",
    clientName: "",
    clientEmail: "",
    company: "",
    clientAddress: "",
    leadId: "",
    issueDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10),
    items: [DEFAULT_LINE_ITEM],
    taxRate: 18,
    discount: 0,
    status: "draft",
    notes: "Payment terms: Net 15 days. Thank you for choosing VeloShift Digital.",
    bankName: "HDFC Bank Ltd.",
    accountName: "VeloShift Digital Private Limited",
    accountNumber: "50200084729103",
    ifsc: "HDFC0001234",
  });

  const loadInvoices = useCallback(async () => {
    try {
      let url = "/api/invoices";
      const params = [];
      if (filter !== "all") params.push(`status=${encodeURIComponent(filter)}`);
      if (search.trim()) params.push(`search=${encodeURIComponent(search.trim())}`);
      if (params.length > 0) url += `?${params.join("&")}`;

      const res = await get(url);
      if (res && res.data) {
        setInvoices(res.data || []);
        if (res.stats) setStats(res.stats);
      }
    } catch (err) {
      console.error("Error loading invoices:", err);
      setInvoices([]);
    } finally {
      setLoading(false);
    }
  }, [filter, search]);

  useEffect(() => {
    loadInvoices();
  }, [loadInvoices]);

  // Pre-load existing clients from CRM leads
  useEffect(() => {
    async function loadClients() {
      try {
        const res = await get("/api/leads?limit=100");
        if (res && res.data) {
          setExistingClients(res.data || []);
        }
      } catch {
        // Non-critical
      }
    }
    loadClients();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setForm({
      invoiceNumber: "",
      clientName: "",
      clientEmail: "",
      company: "",
      clientAddress: "",
      leadId: "",
      issueDate: new Date().toISOString().slice(0, 10),
      dueDate: new Date(Date.now() + 15 * 86400000).toISOString().slice(0, 10),
      items: [{ ...DEFAULT_LINE_ITEM }],
      taxRate: 18,
      discount: 0,
      status: "sent",
      notes: "Payment terms: Net 15 days. Thank you for choosing VeloShift Digital.",
      bankName: "HDFC Bank Ltd.",
      accountName: "VeloShift Digital Private Limited",
      accountNumber: "50200084729103",
      ifsc: "HDFC0001234",
    });
    setFormModalOpen(true);
  };

  const openEditModal = (inv) => {
    setEditingId(inv._id);
    setForm({
      invoiceNumber: inv.invoiceNumber || "",
      clientName: inv.clientName || "",
      clientEmail: inv.clientEmail || "",
      company: inv.company || "",
      clientAddress: inv.clientAddress || "",
      leadId: inv.leadId || "",
      issueDate: inv.issueDate ? new Date(inv.issueDate).toISOString().slice(0, 10) : "",
      dueDate: inv.dueDate ? new Date(inv.dueDate).toISOString().slice(0, 10) : "",
      items: Array.isArray(inv.items) && inv.items.length > 0 ? inv.items : [{ ...DEFAULT_LINE_ITEM }],
      taxRate: inv.taxRate ?? 18,
      discount: inv.discount || 0,
      status: inv.status || "draft",
      notes: inv.notes || "",
      bankName: inv.bankName || "HDFC Bank Ltd.",
      accountName: inv.accountName || "VeloShift Digital Private Limited",
      accountNumber: inv.accountNumber || "50200084729103",
      ifsc: inv.ifsc || "HDFC0001234",
    });
    setFormModalOpen(true);
  };

  const handleSelectExistingClient = (e) => {
    const leadId = e.target.value;
    if (!leadId) return;

    const matched = existingClients.find((c) => c._id === leadId);
    if (matched) {
      setForm((prev) => ({
        ...prev,
        leadId: matched._id,
        clientName: matched.client || prev.clientName,
        company: matched.client || prev.company,
        clientEmail: matched.poc && matched.poc.includes("@") ? matched.poc : prev.clientEmail,
      }));
    }
  };

  const handleItemChange = (index, field, value) => {
    setForm((prev) => {
      const nextItems = [...prev.items];
      const item = { ...nextItems[index], [field]: value };

      if (field === "quantity" || field === "rate") {
        const qty = Math.max(1, Number(field === "quantity" ? value : item.quantity) || 1);
        const rate = Math.max(0, Number(field === "rate" ? value : item.rate) || 0);
        item.amount = Math.round(qty * rate * 100) / 100;
      }

      nextItems[index] = item;
      return { ...prev, items: nextItems };
    });
  };

  const addItemRow = () => {
    setForm((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        { description: "", quantity: 1, rate: 0, amount: 0 },
      ],
    }));
  };

  const removeItemRow = (index) => {
    if (form.items.length <= 1) return;
    setForm((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  // Calculated totals
  const subtotal = form.items.reduce((acc, it) => acc + (Number(it.amount) || 0), 0);
  const taxAmount = Math.round(((subtotal * (Number(form.taxRate) || 0)) / 100) * 100) / 100;
  const grandTotal = Math.max(0, subtotal + taxAmount - (Number(form.discount) || 0));

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!form.clientName.trim() || !form.dueDate) {
      alert("Client name and due date are required.");
      return;
    }

    setSubmitting(true);
    try {
      if (editingId) {
        const res = await put(`/api/invoices/${editingId}`, form);
        if (res && res.success) {
          setToastMessage("Invoice updated successfully");
        }
      } else {
        const res = await post("/api/invoices", form);
        if (res && res.success) {
          setToastMessage(`Invoice ${res.data?.invoiceNumber || ""} created`);
        }
      }

      setFormModalOpen(false);
      setEditingId(null);
      loadInvoices();
      setTimeout(() => setToastMessage(""), 3000);
    } catch (err) {
      console.error("Save invoice error:", err);
      alert("Failed to save invoice. Please check the inputs.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const res = await patch(`/api/invoices/${id}/status`, { status });
      if (res && res.success) {
        setInvoices((prev) =>
          prev.map((i) => (i._id === id ? { ...i, status } : i))
        );
        if (selectedInvoice?._id === id) {
          setSelectedInvoice((prev) => ({ ...prev, status }));
        }
        setToastMessage(`Invoice marked as ${STATUS_CONFIG[status]?.label || status}`);
        setTimeout(() => setToastMessage(""), 3000);
        loadInvoices();
      }
    } catch (err) {
      console.error("Status update error:", err);
    }
  };

  const handleDelete = async (id, invoiceNumber) => {
    if (!window.confirm(`Are you sure you want to permanently delete invoice ${invoiceNumber}?`)) {
      return;
    }

    try {
      const res = await del(`/api/invoices/${id}`);
      if (res && (res.success || !res.error)) {
        setInvoices((prev) => prev.filter((i) => i._id !== id));
        if (selectedInvoice?._id === id) setSelectedInvoice(null);
        setToastMessage(`Invoice ${invoiceNumber} deleted`);
        setTimeout(() => setToastMessage(""), 3000);
        loadInvoices();
      }
    } catch (err) {
      console.error("Delete invoice error:", err);
    }
  };

  // Export CSV (RFC 4180 safe)
  const exportCSV = () => {
    if (invoices.length === 0) return;

    const headers = [
      "Invoice Number",
      "Client",
      "Company",
      "Issue Date",
      "Due Date",
      "Subtotal",
      "Tax Rate",
      "Tax Amount",
      "Discount",
      "Total (INR)",
      "Status",
    ];

    const escapeCsv = (val) => {
      const str = val == null ? "" : String(val);
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`;
      }
      return str;
    };

    const rows = invoices.map((inv) => [
      escapeCsv(inv.invoiceNumber),
      escapeCsv(inv.clientName),
      escapeCsv(inv.company || ""),
      escapeCsv(inv.issueDate ? new Date(inv.issueDate).toLocaleDateString() : "-"),
      escapeCsv(inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "-"),
      escapeCsv(inv.subtotal),
      escapeCsv(inv.taxRate + "%"),
      escapeCsv(inv.taxAmount),
      escapeCsv(inv.discount),
      escapeCsv(inv.total),
      escapeCsv(inv.status),
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = `invoices-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
  };

  return (
    <div className="space-y-6">
      {/* PRINT-SPECIFIC CSS */}
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice, #printable-invoice * {
            visibility: visible;
          }
          #printable-invoice {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            background: white !important;
            color: #0f172a !important;
            padding: 30px !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      {/* HEADER & TOAST */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Invoices & Billing</h1>
          <p className="text-white/60 text-sm mt-1">
            Generate client invoices, track billing milestones, calculate GST, and record payments.
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
            onClick={openCreateModal}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#38A7F0] hover:bg-[#2b92d6] text-white text-xs font-semibold shadow-sm transition"
          >
            <Plus size={15} />
            <span>Generate Invoice</span>
          </button>
        </div>
      </div>

      {/* FINANCIAL KPI TILES */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-emerald-400 text-xs font-medium uppercase tracking-wider">
            <span>Collected Revenue</span>
            <IndianRupee size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-emerald-400">
            ₹{stats.totalPaid.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-blue-400 text-xs font-medium uppercase tracking-wider">
            <span>Outstanding / Due</span>
            <Clock size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-blue-400">
            ₹{stats.totalPending.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-white/60 text-xs font-medium uppercase tracking-wider">
            <span>Total Invoiced</span>
            <FileText size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-white">
            ₹{stats.totalInvoiced.toLocaleString("en-IN")}
          </div>
        </div>

        <div className="bg-[var(--admin-card)] border border-white/10 rounded-xl p-4">
          <div className="flex items-center justify-between text-rose-400 text-xs font-medium uppercase tracking-wider">
            <span>Overdue Count</span>
            <AlertTriangle size={15} />
          </div>
          <div className="text-2xl font-bold mt-2 text-rose-400">{stats.overdueCount}</div>
        </div>
      </div>

      {/* CONTROLS BAR: SEARCH, FILTER & EXPORT */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-[var(--admin-card)] border border-white/10 rounded-xl p-3">
        <input
          type="text"
          placeholder="Search by invoice #, client name, or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:w-80 bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
        />

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-1 text-xs">
            {["all", "paid", "sent", "draft", "overdue"].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-2.5 py-1.5 rounded-lg font-medium transition capitalize whitespace-nowrap ${
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
            disabled={invoices.length === 0}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white border border-white/10 transition text-xs font-medium disabled:opacity-50"
            title="Export invoices to CSV"
          >
            <Download size={13} />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* INVOICES TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl bg-[var(--admin-card)]">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10 text-left text-xs uppercase tracking-wider text-white/60">
              <th className="p-3.5">Invoice #</th>
              <th className="p-3.5">Client & Company</th>
              <th className="p-3.5">Issue Date</th>
              <th className="p-3.5">Due Date</th>
              <th className="p-3.5">Amount (INR)</th>
              <th className="p-3.5">Status</th>
              <th className="p-3.5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="p-10 text-center text-white/50">
                  Loading invoices...
                </td>
              </tr>
            ) : invoices.length === 0 ? (
              <tr>
                <td colSpan="7" className="p-10 text-center text-white/50">
                  No invoices found matching your criteria.
                </td>
              </tr>
            ) : (
              invoices.map((inv) => {
                const cfg = STATUS_CONFIG[inv.status] || STATUS_CONFIG.draft;
                const isOverdue =
                  inv.status !== "paid" &&
                  inv.status !== "cancelled" &&
                  new Date(inv.dueDate) < new Date();

                return (
                  <tr
                    key={inv._id}
                    className="border-b border-white/5 hover:bg-white/[0.03] transition"
                  >
                    <td className="p-3.5 font-mono font-semibold text-[#38A7F0]">
                      {inv.invoiceNumber}
                    </td>

                    <td className="p-3.5">
                      <div>
                        <div className="font-medium text-white">{inv.clientName}</div>
                        {inv.company && (
                          <div className="text-[11px] text-white/50">{inv.company}</div>
                        )}
                      </div>
                    </td>

                    <td className="p-3.5 text-white/70 text-xs">
                      {inv.issueDate ? new Date(inv.issueDate).toLocaleDateString() : "-"}
                    </td>

                    <td className="p-3.5 text-xs">
                      <span className={isOverdue ? "text-rose-400 font-medium" : "text-white/70"}>
                        {inv.dueDate ? new Date(inv.dueDate).toLocaleDateString() : "-"}
                      </span>
                    </td>

                    <td className="p-3.5 font-semibold text-white">
                      ₹{Number(inv.total || 0).toLocaleString("en-IN")}
                    </td>

                    <td className="p-3.5">
                      <select
                        value={inv.status || "draft"}
                        onChange={(e) => handleStatusChange(inv._id, e.target.value)}
                        className={`px-2 py-0.5 rounded-lg text-xs font-medium border bg-[#0b1328] focus:outline-none focus:border-[#38A7F0] transition ${cfg.badge}`}
                      >
                        <option value="draft">Draft</option>
                        <option value="sent">Sent</option>
                        <option value="paid">Paid</option>
                        <option value="overdue">Overdue</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    </td>

                    <td className="p-3.5 text-right">
                      <div className="inline-flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setSelectedInvoice(inv);
                            setPreviewModalOpen(true);
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-[#38A7F0]/20 text-[#38A7F0] hover:text-[#5bc1ff] transition border border-white/10 hover:border-[#38A7F0]/40 text-xs font-medium"
                          title="View and print invoice"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>

                        <button
                          onClick={() => openEditModal(inv)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 hover:text-white transition border border-white/10 text-xs font-medium"
                          title="Edit invoice"
                        >
                          <Edit3 size={13} />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleDelete(inv._id, inv.invoiceNumber)}
                          className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 transition border border-red-500/20 text-xs font-medium"
                          title="Delete invoice"
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

      {/* MODAL 1: CREATE / EDIT INVOICE */}
      {formModalOpen && (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className="bg-[#0b1328] border border-white/10 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative text-white space-y-5 animate-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* MODAL HEADER */}
            <div className="flex items-start justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#38A7F0]/15 border border-[#38A7F0]/30 flex items-center justify-center text-[#38A7F0]">
                  <FileText size={20} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">
                    {editingId ? "Edit Invoice" : "Generate Client Invoice"}
                  </h2>
                  <p className="text-xs text-white/60 mt-0.5">
                    Configure line items, calculate applicable GST, and issue digital invoices.
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
            <form onSubmit={handleFormSubmit} className="space-y-5">
              {/* CLIENT DETAILS */}
              <div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    Client & Account
                  </span>
                  {existingClients.length > 0 && !editingId && (
                    <select
                      onChange={handleSelectExistingClient}
                      className="bg-[#091122] border border-white/10 rounded-lg px-2.5 py-1 text-xs text-white/80 focus:outline-none focus:border-[#38A7F0]"
                    >
                      <option value="">-- Autofill from Client CRM --</option>
                      {existingClients.map((c) => (
                        <option key={c._id} value={c._id}>
                          {c.client} {c.poc ? `(${c.poc})` : ""}
                        </option>
                      ))}
                    </select>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70">
                      Client Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      required
                      value={form.clientName}
                      onChange={(e) => setForm({ ...form, clientName: e.target.value })}
                      placeholder="e.g. Alex Morgan"
                      className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70">Company Name</label>
                    <input
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      placeholder="e.g. Acme Innovations"
                      className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70">Client Email</label>
                    <input
                      type="email"
                      value={form.clientEmail}
                      onChange={(e) => setForm({ ...form, clientEmail: e.target.value })}
                      placeholder="client@acme.com"
                      className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">Billing Address</label>
                  <input
                    value={form.clientAddress}
                    onChange={(e) => setForm({ ...form, clientAddress: e.target.value })}
                    placeholder="Floor 4, Cyber City, Gurugram, Haryana, India"
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                </div>
              </div>

              {/* DATES & STATUS */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 bg-white/[0.02] border border-white/10 rounded-xl p-4">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">Invoice Number</label>
                  <input
                    value={form.invoiceNumber}
                    onChange={(e) => setForm({ ...form, invoiceNumber: e.target.value })}
                    placeholder="Auto-generated if blank"
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white font-mono placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">
                    Issue Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={form.issueDate}
                    onChange={(e) => setForm({ ...form, issueDate: e.target.value })}
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#38A7F0]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">
                    Due Date <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="date"
                    required
                    value={form.dueDate}
                    onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#38A7F0]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-white/70">Initial Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#38A7F0]"
                  >
                    <option value="draft">Draft</option>
                    <option value="sent">Sent</option>
                    <option value="paid">Paid</option>
                    <option value="overdue">Overdue</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* DYNAMIC LINE ITEMS */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-white/70">
                    Invoice Line Items
                  </label>
                  <button
                    type="button"
                    onClick={addItemRow}
                    className="inline-flex items-center gap-1 text-xs text-[#38A7F0] hover:text-[#5bc1ff] font-medium"
                  >
                    <PlusCircle size={14} />
                    <span>Add Item</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {form.items.map((item, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 gap-2 items-center bg-white/[0.02] border border-white/10 p-2.5 rounded-xl"
                    >
                      <div className="col-span-6">
                        <input
                          required
                          placeholder="Service description or deliverable..."
                          value={item.description}
                          onChange={(e) => handleItemChange(idx, "description", e.target.value)}
                          className="w-full bg-[#091122] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0]"
                        />
                      </div>

                      <div className="col-span-2">
                        <input
                          type="number"
                          min="1"
                          required
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(idx, "quantity", e.target.value)}
                          className="w-full bg-[#091122] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white text-center focus:outline-none focus:border-[#38A7F0]"
                        />
                      </div>

                      <div className="col-span-2">
                        <input
                          type="number"
                          min="0"
                          required
                          placeholder="Rate"
                          value={item.rate}
                          onChange={(e) => handleItemChange(idx, "rate", e.target.value)}
                          className="w-full bg-[#091122] border border-white/10 rounded-lg px-2.5 py-1.5 text-xs text-white text-right focus:outline-none focus:border-[#38A7F0]"
                        />
                      </div>

                      <div className="col-span-1 text-right font-mono text-xs text-white/90">
                        ₹{(item.amount || 0).toLocaleString("en-IN")}
                      </div>

                      <div className="col-span-1 text-center">
                        <button
                          type="button"
                          onClick={() => removeItemRow(idx)}
                          disabled={form.items.length <= 1}
                          className="p-1 rounded text-white/40 hover:text-red-400 disabled:opacity-20 transition"
                          title="Remove item"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* TOTALS & TAX */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="space-y-2">
                  <div className="space-y-1">
                    <label className="text-xs font-medium text-white/70">Payment Notes / Terms</label>
                    <textarea
                      rows={2}
                      value={form.notes}
                      onChange={(e) => setForm({ ...form, notes: e.target.value })}
                      className="w-full bg-[#091122] border border-white/10 rounded-lg px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#38A7F0] resize-none"
                    />
                  </div>
                </div>

                <div className="bg-white/[0.03] border border-white/10 rounded-xl p-3.5 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-white/70">
                    <span>Subtotal:</span>
                    <span className="font-mono text-white">₹{subtotal.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/70">GST Rate (%):</span>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={form.taxRate}
                      onChange={(e) => setForm({ ...form, taxRate: Number(e.target.value) })}
                      className="w-20 bg-[#091122] border border-white/10 rounded px-2 py-1 text-right text-white text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-between text-white/70">
                    <span>GST Amount ({form.taxRate}%):</span>
                    <span className="font-mono text-white">₹{taxAmount.toLocaleString("en-IN")}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-white/70">Discount (₹):</span>
                    <input
                      type="number"
                      min="0"
                      value={form.discount}
                      onChange={(e) => setForm({ ...form, discount: Number(e.target.value) })}
                      className="w-24 bg-[#091122] border border-white/10 rounded px-2 py-1 text-right text-white text-xs"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-white/10 font-bold text-sm text-white">
                    <span>Grand Total:</span>
                    <span className="text-emerald-400 font-mono text-base">
                      ₹{grandTotal.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* MODAL FOOTER */}
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
                    ? "Update Invoice"
                    : "Generate Invoice"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: PRINT & PREVIEW INVOICE DOCUMENT */}
      {previewModalOpen && selectedInvoice && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div
            className="bg-[#0b1328] border border-white/10 rounded-2xl max-w-3xl w-full p-6 shadow-2xl relative text-white space-y-6 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ACTION BAR */}
            <div className="flex items-center justify-between pb-3 border-b border-white/10 no-print">
              <div className="flex items-center gap-2">
                <FileText size={18} className="text-[#38A7F0]" />
                <span className="font-bold text-sm">Invoice {selectedInvoice.invoiceNumber}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => window.print()}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#38A7F0] hover:bg-[#2b92d6] text-white text-xs font-semibold transition shadow"
                >
                  <Printer size={14} />
                  <span>Print / Save as PDF</span>
                </button>

                <button
                  onClick={() => setPreviewModalOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* PRINTABLE INVOICE CANVAS */}
            <div
              id="printable-invoice"
              className="bg-white text-slate-900 p-8 rounded-xl space-y-8 shadow-sm"
            >
              {/* BRAND & HEADER */}
              <div className="flex items-start justify-between border-b border-slate-200 pb-6">
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-slate-900">
                    VeloShift Digital
                  </h1>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs">
                    Next-Gen Cloud Engineering, AI Automation & Scalable Web Solutions.
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    connect@veloshift.com | www.veloshiftdigital.com
                  </p>
                </div>

                <div className="text-right">
                  <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block">
                    Tax Invoice
                  </span>
                  <div className="text-xl font-bold font-mono text-blue-600 mt-0.5">
                    {selectedInvoice.invoiceNumber}
                  </div>
                  <div className="mt-2 inline-block px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider border">
                    {selectedInvoice.status}
                  </div>
                </div>
              </div>

              {/* BILL TO & DATES */}
              <div className="grid grid-cols-2 gap-6 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold uppercase tracking-wider block mb-1">
                    Billed To:
                  </span>
                  <div className="font-bold text-sm text-slate-800">{selectedInvoice.clientName}</div>
                  {selectedInvoice.company && (
                    <div className="text-slate-600 font-medium">{selectedInvoice.company}</div>
                  )}
                  {selectedInvoice.clientEmail && (
                    <div className="text-slate-500">{selectedInvoice.clientEmail}</div>
                  )}
                  {selectedInvoice.clientAddress && (
                    <div className="text-slate-500 mt-1 max-w-xs leading-relaxed">
                      {selectedInvoice.clientAddress}
                    </div>
                  )}
                </div>

                <div className="text-right space-y-1 text-slate-600">
                  <div>
                    <span className="text-slate-400 mr-2">Invoice Date:</span>
                    <strong className="text-slate-800">
                      {selectedInvoice.issueDate
                        ? new Date(selectedInvoice.issueDate).toLocaleDateString()
                        : "-"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 mr-2">Payment Due:</span>
                    <strong className="text-slate-800">
                      {selectedInvoice.dueDate
                        ? new Date(selectedInvoice.dueDate).toLocaleDateString()
                        : "-"}
                    </strong>
                  </div>
                  <div>
                    <span className="text-slate-400 mr-2">Currency:</span>
                    <strong className="text-slate-800">INR (₹)</strong>
                  </div>
                </div>
              </div>

              {/* ITEMS TABLE */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Deliverable & Scope Description</th>
                      <th className="p-3 text-center w-16">Qty</th>
                      <th className="p-3 text-right w-28">Rate (₹)</th>
                      <th className="p-3 text-right w-28">Amount (₹)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-700">
                    {Array.isArray(selectedInvoice.items) &&
                      selectedInvoice.items.map((it, idx) => (
                        <tr key={idx}>
                          <td className="p-3 font-medium text-slate-800">{it.description}</td>
                          <td className="p-3 text-center">{it.quantity}</td>
                          <td className="p-3 text-right font-mono">
                            {Number(it.rate || 0).toLocaleString("en-IN")}
                          </td>
                          <td className="p-3 text-right font-mono font-semibold">
                            {Number(it.amount || 0).toLocaleString("en-IN")}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>

              {/* FINANCIAL SUMMARY & BANK INFO */}
              <div className="grid grid-cols-2 gap-6 pt-2">
                <div className="text-xs space-y-1 text-slate-600">
                  <span className="font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                    Bank Wire / NEFT Transfer
                  </span>
                  <div>
                    <span className="text-slate-400">Account Name:</span>{" "}
                    <strong>{selectedInvoice.accountName || "VeloShift Digital"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Bank:</span>{" "}
                    <strong>{selectedInvoice.bankName || "HDFC Bank"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">Account No:</span>{" "}
                    <strong className="font-mono">{selectedInvoice.accountNumber || "50200084729103"}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400">IFSC Code:</span>{" "}
                    <strong className="font-mono">{selectedInvoice.ifsc || "HDFC0001234"}</strong>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-slate-700">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Subtotal:</span>
                    <span className="font-mono font-medium">
                      ₹{Number(selectedInvoice.subtotal || 0).toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-slate-500">
                      Applicable GST ({selectedInvoice.taxRate || 18}%):
                    </span>
                    <span className="font-mono font-medium">
                      ₹{Number(selectedInvoice.taxAmount || 0).toLocaleString("en-IN")}
                    </span>
                  </div>

                  {selectedInvoice.discount > 0 && (
                    <div className="flex justify-between text-emerald-600">
                      <span>Discount:</span>
                      <span className="font-mono font-medium">
                        -₹{Number(selectedInvoice.discount).toLocaleString("en-IN")}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between pt-2 border-t border-slate-200 font-bold text-sm text-slate-900">
                    <span>Total Amount Due:</span>
                    <span className="font-mono text-base text-blue-700">
                      ₹{Number(selectedInvoice.total || 0).toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>
              </div>

              {/* FOOTER & SIGNATORY */}
              <div className="pt-6 border-t border-slate-200 flex items-center justify-between text-[11px] text-slate-400">
                <p className="max-w-xs">{selectedInvoice.notes}</p>
                <div className="text-right">
                  <div className="font-semibold text-slate-700">VeloShift Digital</div>
                  <div>Authorized Signatory</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
