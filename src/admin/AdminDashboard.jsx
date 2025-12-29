import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, put, del, logout } from "../utils/api";

function Tabs({ active, setActive }) {
  const tabs = ["contacts", "careers"];
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
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Hide navbar & footer on dashboard
  useEffect(() => {
    document.body.classList.add("admin-hide-ui");
    return () => document.body.classList.remove("admin-hide-ui");
  }, []);

  // Redirect if not logged in
  useEffect(() => {
    if (!localStorage.getItem("admin_token")) navigate("/admin");
  }, []);

  useEffect(() => {
    fetchActive();
  }, [active]);

  async function fetchActive() {
    setLoading(true);
    try {
      if (active === "contacts") {
        const res = await get("/api/contact", true);
        setContacts(res?.data || []);
      } else {
        const res = await get("/api/careers", true);
        setCareers(res?.data || []);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function handleDeleteContact(id) {
    if (!confirm("Delete contact?")) return;
    await del(`/api/contact/${id}`, true);
    setContacts((c) => c.filter((x) => x._id !== id));
  }

  async function handleUpdateCareerStatus(id, status) {
    const res = await put(`/api/careers/${id}/status`, { status }, true);
    setCareers((cs) => cs.map((c) => (c._id === id ? res.data : c)));
  }

  async function handleDeleteCareer(id) {
    if (!confirm("Delete application?")) return;
    await del(`/api/careers/${id}`, true);
    setCareers((c) => c.filter((x) => x._id !== id));
  }

  function doLogout() {
    logout();
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
                        <th>Subject</th>
                        <th>Message</th>
                        <th>Created</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {contacts.map((c) => (
                        <tr key={c._id} className="admin-row hover:bg-white/5 transition">
                          <td className="py-4 small">{c.name}</td>
                          <td className="py-4 small muted">{c.email}</td>
                          <td className="py-4 small muted">{c.phone || "-"}</td>
                          <td className="py-4 small muted">{c.company || "-"}</td>
                          <td className="py-4 small">{c.subject || "-"}</td>
                          <td className="py-4 small truncate-2 max-w-[300px]">{c.message}</td>
                          <td className="py-4 small muted">{fmt(c.createdAt)}</td>
                          <td className="py-4">
                            <button className="btn-danger" onClick={() => handleDeleteContact(c._id)}>
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {/* CAREERS */}
            {active === "careers" && (
              <>
                <h3 className="text-xl mb-4 text-[var(--admin-light)] font-semibold">
                  Applications
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full admin-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Applied</th>
                        <th>Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {careers.map((a) => (
                        <tr key={a._id} className="admin-row hover:bg-white/5 transition">
                          <td className="py-4 small">{a.name}</td>
                          <td className="py-4 small muted">{a.email}</td>
                          <td className="py-4 small muted">{a.phone || "-"}</td>
                          <td className="py-4 small">{a.position}</td>

                          <td className="py-4 small">
                            <select
                              defaultValue={a.status}
                              onChange={(e) => handleUpdateCareerStatus(a._id, e.target.value)}
                              className="bg-transparent text-[var(--admin-light)] outline-none"
                            >
                              <option value="received">received</option>
                              <option value="reviewing">reviewing</option>
                              <option value="rejected">rejected</option>
                              <option value="accepted">accepted</option>
                            </select>
                          </td>

                          <td className="py-4 small muted">{fmt(a.createdAt)}</td>

                          <td className="py-4 small">
                            <a href={a.resumeUrl} target="_blank" className="resume-link block">
                              Resume
                            </a>

                            <div className="truncate-2 small muted mt-1">{a.coverLetter}</div>

                            <button
                              className="btn-danger mt-3"
                              onClick={() => handleDeleteCareer(a._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
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
