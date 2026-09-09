import { useState } from "react";
import { NavLink, Outlet, useNavigate, Link } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  Briefcase,
  Layers,
  Mail,
  Building,
  Receipt,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  ShieldCheck,
} from "lucide-react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function logout() {
    if (window.confirm("Are you sure you want to log out of the admin console?")) {
      localStorage.removeItem("admin_token");
      navigate("/admin");
    }
  }

  const navGroups = [
    {
      group: "OVERVIEW",
      items: [
        { to: "/admin/dashboard", label: "Executive Dashboard", icon: <LayoutDashboard size={16} /> },
      ],
    },
    {
      group: "INBOUND & RECRUITMENT",
      items: [
        { to: "/admin/contacts", label: "Contact Inquiries", icon: <MessageSquare size={16} /> },
        { to: "/admin/careers", label: "Career Applications", icon: <FileText size={16} /> },
        { to: "/admin/jobs", label: "Job Openings", icon: <Briefcase size={16} /> },
        { to: "/admin/services", label: "Service Requests", icon: <Layers size={16} /> },
        { to: "/admin/subscribers", label: "Email Subscribers", icon: <Mail size={16} /> },
      ],
    },
    {
      group: "CLIENTS & FINANCE",
      items: [
        { to: "/admin/leads", label: "Client Accounts", icon: <Building size={16} /> },
        { to: "/admin/invoices", label: "Invoices & Billing", icon: <Receipt size={16} /> },
      ],
    },
    {
      group: "ADMINISTRATION",
      items: [
        { to: "/admin/settings", label: "Settings & Backup", icon: <Settings size={16} /> },
      ],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[var(--admin-bg)] text-white">
      {/* MOBILE TOP BAR */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[var(--admin-sidebar)] border-b border-white/10 z-40 sticky top-0">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#38A7F0]/15 border border-[#38A7F0]/30 flex items-center justify-center text-[#38A7F0]">
            <ShieldCheck size={18} />
          </div>
          <span className="font-bold text-sm tracking-wide">VeloShift Digital</span>
        </div>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white transition"
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE DRAWER BACKDROP */}
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-xs z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`fixed md:static top-0 bottom-0 left-0 w-64 bg-[var(--admin-sidebar)] p-5 flex flex-col justify-between border-r border-white/10 z-50 transition-transform duration-200 ease-in-out md:translate-x-0 overflow-y-auto ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* TOP BRANDING & NAVIGATION */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#38A7F0]/15 border border-[#38A7F0]/30 flex items-center justify-center text-[#38A7F0] shadow-sm">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-wide text-white leading-tight">
                  VeloShift Digital
                </h2>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-[#38A7F0]">
                  Admin Console
                </span>
              </div>
            </div>

            <button
              onClick={() => setMobileOpen(false)}
              className="md:hidden p-1.5 rounded-lg bg-white/5 text-white/60 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="flex flex-col gap-4">
            {navGroups.map((g) => (
              <div key={g.group} className="space-y-1">
                <div className="px-3 text-[10px] font-bold uppercase tracking-wider text-white/40 mb-1">
                  {g.group}
                </div>
                {g.items.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium transition ${
                        isActive
                          ? "bg-[#38A7F0] text-white shadow-sm font-semibold"
                          : "text-white/70 hover:text-white hover:bg-white/5"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </nav>
        </div>

        {/* BOTTOM: LIVE SITE & LOGOUT */}
        <div className="pt-4 border-t border-white/10 space-y-2">
          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-white/60 hover:text-white hover:bg-white/5 transition"
          >
            <div className="flex items-center gap-2">
              <ExternalLink size={14} />
              <span>View Live Website</span>
            </div>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/50">
              New Tab
            </span>
          </Link>

          <button
            onClick={logout}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 transition text-xs font-semibold"
          >
            <LogOut size={14} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto overflow-x-hidden">
        <Outlet />
      </main>
    </div>
  );
}