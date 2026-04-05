import { useState } from "react";

export default function ServicesPage() {
  const [services] = useState([]); // empty for now

  const fmt = (d) => (d ? new Date(d).toLocaleString() : "-");

  return (
    <div>

      {/* TITLE */}
      <h1 className="text-2xl font-bold mb-6">Service Requests</h1>

      {/* TABLE */}
      <div className="overflow-x-auto border border-white/10 rounded-xl">
        <table className="w-full text-sm">

          <thead className="bg-[var(--admin-card)]">
            <tr className="text-left">
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Service</th>
              <th className="p-3">Message</th>
              <th className="p-3">Created</th>
            </tr>
          </thead>

          <tbody>
            {services.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-10 text-center text-white/60">
                  No service requests yet
                  <div className="text-xs mt-2 text-white/40">
                    🚫 Service module is under maintainence
                  </div>
                </td>
              </tr>
            ) : (
              services.map((s) => (
                <tr
                  key={s._id}
                  className="border-t border-white/10 hover:bg-white/5 transition"
                >
                  <td className="p-3">{s.name}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.service}</td>
                  <td className="p-3 max-w-xs truncate">{s.message}</td>
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