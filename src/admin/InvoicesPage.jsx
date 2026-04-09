import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceTemplate from "../components/InvoiceTemplate";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const [form, setForm] = useState({
    client: "",
    amount: "",
    notes: "",
    gst: 0,
    dueDate: "",
  });

  const invoiceRef = useRef();
  const API = "https://veloshift-backend.onrender.com/api/invoices";

  // 🔥 PREFILL FROM LEADS
  useEffect(() => {
    const saved = localStorage.getItem("prefillInvoice");
    if (saved) {
      const data = JSON.parse(saved);
      setForm({
        client: data.client || "",
        amount: data.amount || "",
        notes: data.notes || "",
        gst: 0,
        dueDate: "",
      });
      localStorage.removeItem("prefillInvoice");
    }
  }, []);

  // FETCH
  const fetchInvoices = async () => {
    try {
      const res = await fetch(API);
      if (!res.ok) throw new Error("Failed to fetch invoices");
      const data = await res.json();
      setInvoices(data);
    } catch (err) {
      alert(err.message);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // 🔥 CREATE INVOICE
  const handleCreateInvoice = async (e) => {
    e.preventDefault();

    if (!form.client || !form.amount) {
      return alert("Client & Amount required");
    }

    if (form.gst > 100) {
      return alert("GST cannot exceed 100%");
    }

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client: form.client,
          amount: Number(form.amount),
          gst: Number(form.gst),
          dueDate: form.dueDate || null,
          notes: form.notes,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      alert("Invoice created ✅");

      setForm({
        client: "",
        amount: "",
        notes: "",
        gst: 0,
        dueDate: "",
      });

      fetchInvoices();
    } catch (err) {
      alert(err.message);
    }
  };

  // TOGGLE STATUS
  const toggleStatus = async (inv) => {
    const newStatus = inv.status === "paid" ? "unpaid" : "paid";

    try {
      setLoadingId(inv._id);

      const res = await fetch(`${API}/${inv._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      fetchInvoices();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  // DELETE
  const deleteInvoice = async (id) => {
    try {
      setLoadingId(id);

      const res = await fetch(`${API}/${id}`, { method: "DELETE" });
      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      fetchInvoices();
    } catch (err) {
      alert(err.message);
    } finally {
      setLoadingId(null);
    }
  };

  // PDF
  const downloadPDF = async (invoice) => {
    try {
      setLoadingId(invoice._id);
      setSelectedInvoice(invoice);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
    } catch (err) {
      alert("PDF failed");
    } finally {
      setLoadingId(null);
    }
  };

  const fmt = (d) => (d ? new Date(d).toLocaleDateString() : "-");

  const stats = {
    total: invoices.length,
    revenue: invoices.reduce((a, i) => a + (i.totalAmount || 0), 0),
    paid: invoices.filter((i) => i.status === "paid").length,
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Invoices</h1>

      {/* DASHBOARD */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <Card title="Total Invoices" value={stats.total} />
        <Card title="Revenue" value={`₹${stats.revenue}`} />
        <Card title="Paid" value={stats.paid} />
      </div>

      {/* FORM */}
      <form onSubmit={handleCreateInvoice} className="mb-6 grid md:grid-cols-5 gap-3">
        <input
          placeholder="Client"
          value={form.client}
          onChange={(e) => setForm({ ...form, client: e.target.value })}
          className="px-3 py-2 rounded border"
        />

        <input
          type="number"
          placeholder="Amount"
          value={form.amount}
          onChange={(e) => setForm({ ...form, amount: e.target.value })}
          className="px-3 py-2 rounded border"
        />

        <input
          type="number"
          placeholder="GST %"
          min="0"
          max="100"
          value={form.gst}
          onChange={(e) => setForm({ ...form, gst: e.target.value })}
          className="px-3 py-2 rounded border"
        />

        <input
          type="date"
          value={form.dueDate}
          onChange={(e) => setForm({ ...form, dueDate: e.target.value })}
          className="px-3 py-2 rounded border"
        />

        <input
          placeholder="Notes"
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          className="px-3 py-2 rounded border"
        />

        <button className="col-span-5 bg-blue-600 text-white py-2 rounded">
          Create Invoice
        </button>
      </form>

      {/* TABLE */}
      <div className="overflow-x-auto border rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr>
              <th className="p-3">Invoice #</th>
              <th className="p-3">Client</th>
              <th className="p-3">Total</th>
              <th className="p-3">Status</th>
              <th className="p-3">Date</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <tr key={inv._id}>
                <td className="p-3">{inv.invoiceNumber}</td>
                <td className="p-3">{inv.client}</td>
                <td className="p-3">₹{inv.totalAmount}</td>
                <td className="p-3">{inv.status}</td>
                <td className="p-3">{fmt(inv.createdAt)}</td>

                <td className="p-3 flex gap-2">
                  <button onClick={() => toggleStatus(inv)}>
                    {inv.status === "paid" ? "Unpaid" : "Paid"}
                  </button>
                  <button onClick={() => downloadPDF(inv)}>PDF</button>
                  <button onClick={() => deleteInvoice(inv._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* HIDDEN TEMPLATE */}
      <div className="absolute -left-[9999px]">
        {selectedInvoice && (
          <InvoiceTemplate ref={invoiceRef} invoice={selectedInvoice} />
        )}
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="p-4 rounded-xl border">
      <p className="text-sm">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}