import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, del } from "../utils/api";

function Tabs({ active, setActive }) {
  const tabs = ["contacts"];
  return (
    <div className="flex gap-3">
      {tabs.map((t) => (
        <button
          key={t}
          onClick={() => setActive(t)}
          className={`px-5 py-2 rounded text-sm font-medium transition 
            ${
              active === t
                ? "bg-[var(--admin-accent)] text-black shadow"
                : "bg-[rgba(255,255,255,0.12)] text-[var(--admin-light)] hover:bg-[rgba(255,255,255,0.22)]"
            }`}
        >
          {t.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export default function AdminDashboard() {
  const [active, setActive] = useState("contacts");
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Protect admin route
  useEffect(() => {
    const token = localStorage.getItem("admin_token");
    if (!token) navigate("/admin");
  }, []);

  // Fetch contacts from backend
  async function loadContacts() {
    setLoading(true);

    const res = await get("/api/contact/all", true);

    if (res?.success) {
      setContacts(res.contacts);
    }

    setLoading(false);
  }

  useEffect(() => {
    if (active === "contacts") loadContacts();
  }, [active]);

  function doLogout() {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  }

  const fmt = (d) => (d ? new Date(d).toLocaleString() : "-");

  return (
    <div className="admin-theme min-h-screen py-10 px-6">
      <div className="admin-panel max-w-7xl mx-auto p-8 rounded-xl shadow-xl">

        <div className="flex items-center justify-between mb-10">
          <h1 className="text-3xl font-bold text-[var(--admin-light)]">
            Admin Dashboard
          </h1>

          <div className="flex items-center gap-4">
            <Tabs active={active} setActive={setActive} />

            <button
              onClick={doLogout}
              className="px-4 py-2 rounded bg-[var(--admin-accent)] text-black font-semibold hover:opacity-90 transition"
            >
              Logout
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-[var(--admin-light)]">Loading...</div>
        ) : (
          <>
            {/* CONTACTS */}
            {active === "contacts" && (
              <>
                <h3 className="text-xl mb-4 text-[var(--admin-light)] font-semibold">
                  Contacts
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                        <th>Message</th>
                        <th>Created</th>
                      </tr>
                    </thead>

                    <tbody>
                      {contacts.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="py-6 text-center text-[var(--admin-light)]/60">
                            No contact entries found
                          </td>
                        </tr>
                      ) : (
                        contacts.map((c) => (
                          <tr key={c._id}>
                            <td>{c.name}</td>
                            <td>{c.email}</td>
                            <td>{c.phone || "-"}</td>
                            <td>{c.company || "-"}</td>
                            <td>{c.message}</td>
                            <td>{fmt(c.createdAt)}</td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
