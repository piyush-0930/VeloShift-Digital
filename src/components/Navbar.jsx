import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Industries", path: "/industries" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
    // Admin removed from navbar for security — login directly when needed
  ];

  return (
    <nav className="sticky top-0 w-full z-50 bg-[#0B142B] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="font-bold text-xl text-white select-none">
          <span className="px-5 py-2 bg-gradient-to-r from-[#1E7BCE] to-[#38A7F0] shadow-sm">
            VeloShift Co
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-10 font-medium text-white">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `transition ${
                  isActive ? "text-[#38A7F0]" : "hover:text-[#38A7F0]"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setOpen(!open)}>
          {open ? (
            // SIMPLE CROSS ICON — NO ROTATION
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // HAMBURGER ICON
            <svg
              className="w-7 h-7"
              fill="none"
              stroke="white"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Right Slide Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-[#0B142B] shadow-xl md:hidden
          transform transition-transform duration-300 z-[100]
          ${open ? "translate-x-0" : "translate-x-full"}`}
      >

        {/* Close button inside drawer */}
        <button
          onClick={() => setOpen(false)}
          className="absolute top-6 right-6 text-white"
        >
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <div className="flex flex-col space-y-8 px-6 pt-24 text-white text-lg font-medium">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `${isActive ? "text-[#38A7F0]" : "text-white"} transition`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      </div>

      {/* Transparent Backdrop */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-transparent md:hidden z-[50]"
        />
      )}
    </nav>
  );
}
