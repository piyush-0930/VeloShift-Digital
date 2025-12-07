import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { get, put, del, logout } from "../utils/api";

function Tabs({ active, setActive }) {
  const tabs = ["contacts", "careers"];
  return (
    <div className="flex gap-4">
      {tabs.map(t => (
        <button key={t} onClick={()=>setActive(t)} className={`${active===t?"bg-[var(--vs-secondary)] text-black":"bg-transparent text-white"} px-4 py-2 rounded`}>{t}</button>
      ))}
    </div>
  )
}

export default function AdminDashboard(){
  const [active, setActive] = useState("contacts");
  const [contacts, setContacts] = useState([]);
  const [careers, setCareers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{ if(!localStorage.getItem('admin_token')) navigate('/admin'); },[]);

  useEffect(()=>{ fetchActive(); },[active]);

  async function fetchActive(){
    setLoading(true);
    try{
      if(active==='contacts'){
        const res = await get('/api/contact', true);
        const items = res && res.data ? (Array.isArray(res.data) ? res.data : [res.data]) : [];
        setContacts(items);
      } else if(active==='careers'){
        const res = await get('/api/careers', true);
        const items = res && res.data ? (Array.isArray(res.data) ? res.data : [res.data]) : [];
        setCareers(items);
      }
    }catch(err){
      console.error('fetchActive error', err);
    }
    setLoading(false);
  }

  async function handleDeleteContact(id){
    if(!confirm('Delete contact?')) return;
    await del(`/api/contact/${id}`, true);
    setContacts(c=>c.filter(x=>x._id!==id));
  }

  async function handleUpdateCareerStatus(id, status){
    const res = await put(`/api/careers/${id}/status`, { status }, true);
    setCareers(cs=>cs.map(c=>c._id===id?res.data:c));
  }

  async function handleDeleteCareer(id){
    if(!confirm('Delete application and resume?')) return;
    try{
      await del(`/api/careers/${id}`, true);
      setCareers(c=>c.filter(x=>x._id!==id));
    }catch(err){
      console.error('delete career error', err);
      const { showError } = await import('../utils/message');
      showError('Failed to delete application');
    }
  }

  function doLogout(){ logout(); navigate('/admin'); }

  const fmt = (d) => d ? new Date(d).toLocaleString() : "-";

  return (
    <div className="min-h-[70vh] p-6 text-white admin-panel admin-theme">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl">Admin Dashboard</h2>
        <div className="flex items-center gap-4">
          <Tabs active={active} setActive={setActive} />
          <button onClick={doLogout} className="px-3 py-2 bg-red-500 rounded">Logout</button>
        </div>
      </div>

      {loading ? <div>Loading...</div> : (
        <div>
          {active==='contacts' && (
            <div>
              <h3 className="mb-3">Contacts</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Company</th>
                    <th>Subject</th>
                    <th>Message</th>
                    <th>Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {contacts.map(c=> (
                    <tr key={c._id} className="admin-row">
                      <td className="small">{c.name}</td>
                      <td className="small muted">{c.email}</td>
                      <td className="small muted">{c.phone || '-'}</td>
                      <td className="small muted">{c.company || '-'}</td>
                      <td className="small">{c.subject || '-'}</td>
                      <td className="small truncate-2" style={{maxWidth:300}}>{c.message}</td>
                      <td className="small muted">{fmt(c.createdAt)}</td>
                      <td><button className="btn-danger" onClick={()=>handleDeleteContact(c._id)}>Delete</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {active==='careers' && (
            <div>
              <h3 className="mb-3">Applications</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Applied</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {careers.map(a=> (
                    <tr key={a._id} className="admin-row">
                      <td className="small">{a.name}</td>
                      <td className="small muted">{a.email}</td>
                      <td className="small muted">{a.phone || '-'}</td>
                      <td className="small">{a.position}</td>
                      <td className="small">
                        <select defaultValue={a.status} onChange={(e)=>handleUpdateCareerStatus(a._id, e.target.value)} className="bg-transparent">
                          <option value="received">received</option>
                          <option value="reviewing">reviewing</option>
                          <option value="rejected">rejected</option>
                          <option value="accepted">accepted</option>
                        </select>
                      </td>
                      <td className="small muted">{fmt(a.createdAt)}</td>
                      <td className="small">
                        <a href={a.resumeUrl} className="text-[var(--vs-secondary)] resume-link" target="_blank" rel="noreferrer">Resume</a>
                        <div className="truncate-2 small muted">{a.coverLetter}</div>
                        <div className="mt-2">
                          <button className="btn-danger" onClick={()=>handleDeleteCareer(a._id)}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
