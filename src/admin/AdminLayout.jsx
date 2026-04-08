import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function AdminLayout() {
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  }

  return (
    <div className="min-h-screen flex bg-[var(--admin-bg)] text-white">

      {/* SIDEBAR */}
      <div className="w-64 bg-[var(--admin-sidebar)] p-6 flex flex-col justify-between border-r border-white/10">
        
        {/* TOP */}
        <div>
          <h2 className="text-xl font-bold mb-8 tracking-wide">
            VeloShift Co.
          </h2>

          <nav className="flex flex-col gap-2">
            <NavLink to="/admin/dashboard" className="nav-link">
              Admin Dashboard
            </NavLink>

            <NavLink to="/admin/contacts" className="nav-link">
              Contact Inquiries
            </NavLink>

            <NavLink to="/admin/careers" className="nav-link">
              Career Applications
            </NavLink>

            <NavLink to="/admin/services" className="nav-link">
              Service Requests
            </NavLink>

            <NavLink to="/admin/subscribers" className="nav-link">
              Email Subscribers
            </NavLink>

            <NavLink to="/admin/leads" className="nav-link">
              Client Management
            </NavLink>

            <NavLink to="/admin/invoices" className="nav-link">
              Invoice Management
            </NavLink>

          </nav>
        </div>

        {/* BOTTOM */}
        <div>
          <button
            onClick={logout}
            className="w-full px-4 py-2 rounded bg-red-500 hover:bg-red-600 transition text-sm font-medium"
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 p-6">
        <Outlet />
      </div>

    </div>
  );
}