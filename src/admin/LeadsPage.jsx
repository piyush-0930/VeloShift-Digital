import { useEffect, useState } from "react";
import axios from "axios";

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [form, setForm] = useState({
    client: "",
    poc: "",
    duration: "",
    amount: "",
    projectStatus: "prospect",
    paymentStatus: "pending",
    paymentDate: "",
    notes: "",
  });

  const API = "https://veloshift-backend.onrender.com/api/leads";

  // ✅ FETCH LEADS
  const fetchLeads = async () => {
    try {
      const res = await axios.get(API);
      setLeads(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // ✅ HANDLE INPUT
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ ADD LEAD
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.client || !form.amount) {
      alert("Client & Amount required");
      return;
    }

    try {
      await axios.post(API, form);
      fetchLeads();

      setForm({
        client: "",
        poc: "",
        duration: "",
        amount: "",
        projectStatus: "prospect",
        paymentStatus: "pending",
        paymentDate: "",
        notes: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ DELETE
  const deleteLead = async (id) => {
    try {
      await axios.delete(`${API}/${id}`);
      fetchLeads();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Leads Tracker</h1>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <input name="client" value={form.client} onChange={handleChange} placeholder="Client" className="input" />
        <input name="poc" value={form.poc} onChange={handleChange} placeholder="POC" className="input" />
        <input name="duration" value={form.duration} onChange={handleChange} placeholder="Duration" className="input" />
        <input name="amount" value={form.amount} onChange={handleChange} type="number" placeholder="Amount" className="input" />

        <select name="projectStatus" value={form.projectStatus} onChange={handleChange} className="input">
          <option value="prospect">Prospect</option>
          <option value="inprogress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <select name="paymentStatus" value={form.paymentStatus} onChange={handleChange} className="input">
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
          <option value="paid">Paid</option>
        </select>

        <input name="paymentDate" value={form.paymentDate} onChange={handleChange} type="date" className="input" />
        <input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes" className="input" />

        <button className="col-span-2 md:col-span-4 bg-blue-600 hover:bg-blue-700 p-2 rounded">
          Add Lead
        </button>
      </form>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-center border">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th>Client</th>
              <th>POC</th>
              <th>Duration</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Date</th>
              <th>Notes</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b">
                <td>{lead.client}</td>
                <td>{lead.poc}</td>
                <td>{lead.duration}</td>
                <td>₹{lead.amount}</td>
                <td>{lead.projectStatus}</td>
                <td>{lead.paymentStatus}</td>
                <td>{lead.paymentDate?.slice(0, 10)}</td>
                <td>{lead.notes}</td>
                <td>
                  <button
                    onClick={() => deleteLead(lead._id)}
                    className="bg-red-500 px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}