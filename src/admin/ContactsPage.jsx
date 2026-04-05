import { useEffect, useState } from "react";
import { get } from "../utils/api";

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await get("/api/contact/all");

        // ✅ safe handling (important)
        setContacts(res?.contacts || []);
      } catch (err) {
        console.error("Error fetching contacts:", err);
        setContacts([]);
      }
    }

    loadData();
  }, []);

  const fmt = (d) => (d ? new Date(d).toLocaleString() : "-");

  return (
    <div>
      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">Contacts</h1>

      {/* TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl">
        <table className="w-full text-sm">

          <thead className="bg-[var(--admin-card)]">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Company</th>
              <th className="p-3">Message</th>
              <th className="p-3">Received</th>
            </tr>
          </thead>

          <tbody>
            {contacts.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-6 text-center text-white/60">
                  No contacts found
                </td>
              </tr>
            ) : (
              contacts.map((c) => (
                <tr
                  key={c._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-3">{c.name}</td>
                  <td className="p-3">{c.email}</td>
                  <td className="p-3">{c.phone || "-"}</td>
                  <td className="p-3">{c.company || "-"}</td>
                  <td className="p-3 max-w-xs truncate">{c.message}</td>
                  <td className="p-3">{fmt(c.createdAt)}</td>
                </tr>
              ))
            )}
          </tbody>

        </table>
      </div>
    </div>
  );
}