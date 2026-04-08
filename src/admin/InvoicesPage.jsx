import { useEffect, useState, useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import InvoiceTemplate from "../components/InvoiceTemplate";

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const invoiceRef = useRef();

  const API = "https://veloshift-backend.onrender.com/api/invoices";

  // FETCH
  const fetchInvoices = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();
      setInvoices(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // ✅ TOGGLE STATUS
  const toggleStatus = async (inv) => {
    const newStatus = inv.status === "paid" ? "unpaid" : "paid";

    try {
      await fetch(`${API}/${inv._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      fetchInvoices();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DELETE
  const deleteInvoice = async (id) => {
    try {
      await fetch(`${API}/${id}`, { method: "DELETE" });
      fetchInvoices();
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 PDF GENERATION (FIXED)
  const downloadPDF = async (invoice) => {
    setSelectedInvoice(invoice);

    // wait for render
    setTimeout(async () => {
      if (!invoiceRef.current) return;

      const canvas = await html2canvas(invoiceRef.current, {
        scale: 2, // better quality
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");

      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`invoice-${invoice.invoiceNumber}.pdf`);
    }, 300);
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
        <Card title="Total Invoices" value={stats.total} color="bg-white/10" />
        <Card title="Revenue" value={`₹${stats.revenue}`} color="bg-green-500/20" />
        <Card title="Paid" value={stats.paid} color="bg-blue-500/20" />
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl">
        <table className="w-full text-sm">
          <thead className="bg-[var(--admin-card)]">
            <tr className="text-left">
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
              <tr key={inv._id} className="border-t border-white/10 hover:bg-white/5">
                <td className="p-3">{inv.invoiceNumber}</td>
                <td className="p-3">{inv.client}</td>
                <td className="p-3 font-semibold">₹{inv.totalAmount}</td>

                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      inv.status === "paid"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {inv.status}
                  </span>
                </td>

                <td className="p-3">{fmt(inv.createdAt)}</td>

                <td className="p-3 flex gap-1">
                  {/* 🔥 SMART BUTTON */}
                  <button
                    onClick={() => toggleStatus(inv)}
                    className="bg-indigo-500 px-2 py-1 rounded text-xs"
                  >
                    {inv.status === "paid" ? "Mark Unpaid" : "Mark Paid"}
                  </button>

                  <button
                    onClick={() => downloadPDF(inv)}
                    className="bg-green-500 px-2 py-1 rounded text-xs"
                  >
                    PDF
                  </button>

                  <button
                    onClick={() => deleteInvoice(inv._id)}
                    className="bg-red-500 px-2 py-1 rounded text-xs"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 🔥 HIDDEN TEMPLATE (IMPORTANT) */}
      <div className="absolute -left-[9999px] top-0">
        {selectedInvoice && (
          <InvoiceTemplate ref={invoiceRef} invoice={selectedInvoice} />
        )}
      </div>
    </div>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`p-4 rounded-xl border border-white/10 ${color}`}>
      <p className="text-sm text-white/60">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}