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
    clientEmail: "",
    items: [{ service: "", subService: "", qty: 1, rate: 0 }],
    paymentStatus: "pending",
    paymentMethod: "upi",
    gst: 0,
    discount: 0,
    discountType: "flat",
    promoCode: "",
    dueDate: "",
    notes: "",
  });

  const invoiceRef = useRef();
  const API = "https://veloshift-backend.onrender.com/api/invoices";

  // FETCH
  const fetchInvoices = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setInvoices(data);
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // FORM CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ITEMS
  const handleItemChange = (i, field, value) => {
    const updated = [...form.items];
    updated[i][field] = value;
    setForm({ ...form, items: updated });
  };

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, { service: "", subService: "", qty: 1, rate: 0 }],
    });
  };

  // CREATE
  const handleCreateInvoice = async (e) => {
    e.preventDefault();

    if (!form.client || !form.items.length) {
      return alert("Client & Items required");
    }

    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (!res.ok) return alert(data.message);

    alert("Invoice created ✅");
    fetchInvoices();
  };

  // STATUS UPDATE
  const updateStatus = async (id, status) => {
    setLoadingId(id);

    await fetch(`${API}/${id}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentStatus: status }),
    });

    setLoadingId(null);
    fetchInvoices();
  };

  // DELETE
  const deleteInvoice = async (id) => {
    if (!window.confirm("Delete invoice?")) return;
    await fetch(`${API}/${id}`, { method: "DELETE" });
    fetchInvoices();
  };

  // PDF
  const downloadPDF = async (invoice) => {
    setSelectedInvoice(invoice);
    await new Promise((r) => setTimeout(r, 100));

    const canvas = await html2canvas(invoiceRef.current, { scale: 2 });
    const pdf = new jsPDF("p", "mm", "a4");

    const imgData = canvas.toDataURL("image/png");
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save(`${invoice.invoiceNumber}.pdf`);
  };

  // STATS
  const stats = {
    total: invoices.length,
    revenue: invoices.reduce((a, i) => a + (i.totalAmount || 0), 0),
    paid: invoices.filter((i) => i.paymentStatus === "paid").length,
  };

  return (
    <div className="text-white">

      <h1 className="text-2xl font-bold mb-6">Invoices</h1>

      {/* DASHBOARD */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Card title="Total" value={stats.total} />
        <Card title="Revenue" value={`₹${stats.revenue}`} />
        <Card title="Paid" value={stats.paid} />
      </div>

      {/* FORM */}
      <form onSubmit={handleCreateInvoice} className="space-y-4 mb-8">

        <div className="grid md:grid-cols-3 gap-3">
          <Input name="client" value={form.client} onChange={handleChange} placeholder="Client" />
          <Input name="clientEmail" value={form.clientEmail} onChange={handleChange} placeholder="Email" />
          <Input type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
        </div>

        <div className="grid md:grid-cols-4 gap-3">
          <Select name="paymentStatus" value={form.paymentStatus} onChange={handleChange}>
            <option value="pending">Pending</option>
            <option value="partial">Partial</option>
            <option value="paid">Paid</option>
          </Select>

          <Select name="paymentMethod" value={form.paymentMethod} onChange={handleChange}>
            <option value="upi">UPI</option>
            <option value="bank">Bank</option>
            <option value="cheque">Cheque</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
          </Select>

          <Input type="number" name="gst" value={form.gst} onChange={handleChange} placeholder="GST %" />
          <Input name="promoCode" value={form.promoCode} onChange={handleChange} placeholder="Promo Code" />
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Input type="number" name="discount" value={form.discount} onChange={handleChange} placeholder="Discount" />

          <Select name="discountType" value={form.discountType} onChange={handleChange}>
            <option value="flat">Flat</option>
            <option value="percent">Percent</option>
          </Select>

          <Input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" />
        </div>

        {/* ITEMS */}
        <div>
          {form.items.map((item, i) => (
            <div key={i} className="grid md:grid-cols-4 gap-2 mb-2">
              <Input placeholder="Service" onChange={(e)=>handleItemChange(i,"service",e.target.value)} />
              <Input placeholder="Sub Service" onChange={(e)=>handleItemChange(i,"subService",e.target.value)} />
              <Input type="number" placeholder="Qty" onChange={(e)=>handleItemChange(i,"qty",Number(e.target.value))} />
              <Input type="number" placeholder="Rate" onChange={(e)=>handleItemChange(i,"rate",Number(e.target.value))} />
            </div>
          ))}
          <button type="button" onClick={addItem} className="bg-blue-500 px-3 py-1 rounded">
            + Add Item
          </button>
        </div>

        <button className="bg-indigo-500 px-4 py-2 rounded">
          Create Invoice
        </button>
      </form>

      {/* TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="p-2">Invoice</th>
              <th className="p-2">Client</th>
              <th className="p-2">Total</th>
              <th className="p-2">Status</th>
              <th className="p-2">Method</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map((inv) => (
              <tr key={inv._id} className="border-b border-white/5">
                <td className="p-2">{inv.invoiceNumber}</td>
                <td className="p-2">{inv.client}</td>
                <td className="p-2">₹{inv.totalAmount}</td>
                <td className="p-2">{inv.paymentStatus}</td>
                <td className="p-2">{inv.paymentMethod}</td>

                <td className="p-2 flex gap-2">
                  <button onClick={() => updateStatus(inv._id, "paid")} className="bg-green-500 px-2 py-1 rounded text-xs">
                    Paid
                  </button>

                  <button onClick={() => downloadPDF(inv)} className="bg-blue-500 px-2 py-1 rounded text-xs">
                    PDF
                  </button>

                  <button onClick={() => deleteInvoice(inv._id)} className="bg-red-500 px-2 py-1 rounded text-xs">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* HIDDEN PDF */}
      <div className="absolute -left-[9999px]">
        {selectedInvoice && (
          <InvoiceTemplate ref={invoiceRef} data={selectedInvoice} />
        )}
      </div>
    </div>
  );
}


// UI COMPONENTS
function Input(props) {
  return <input {...props} className="px-3 py-2 rounded border border-white/20 bg-[#0b1324] text-white text-sm" />;
}

function Select(props) {
  return <select {...props} className="px-3 py-2 rounded border border-white/20 bg-[#0b1324] text-white text-sm" />;
}

function Card({ title, value }) {
  return (
    <div className="p-4 rounded-xl border border-white/10 bg-white/5">
      <p className="text-sm text-white/60">{title}</p>
      <h3 className="text-xl font-bold">{value}</h3>
    </div>
  );
}