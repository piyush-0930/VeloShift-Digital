import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronDown, Plus, Minus } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const navItems = [
    { name: "Home", path: "/" },
    {
      name: "About",
      dropdown: [
        { name: "Company Overview", path: "/about" },
        { name: "Certifications", path: "/certifications" },
        { name: "E-Brochure", path: "/brochure.pdf", download: true },
      ],
    },
    {
      name: "Services",
      mega: true,
      sections: [
        {
          title: "Development",
          items: ["Web Development", "Mobile App Development", "Software Development", "Custom Solutions"],
        },
        {
          title: "AI & Automation",
          items: ["AI Chatbots", "Workflow Automation", "Machine Learning", "Predictive Analytics"],
        },
        {
          title: "Cloud Services",
          items: ["Cloud Deployment", "DevOps", "AWS / Azure / GCP", "Cloud Migration"],
        },
        {
          title: "Tech Integrations",
          items: ["API Integration", "CRM Integration", "Payment Gateways", "Automation"],
        },
        {
          title: "Design & Consulting",
          items: ["UI/UX Design", "IT Consulting", "Branding", "Support"],
        },
        {
          title: "SaaS & Platforms",
          items: ["Multi-tenant SaaS", "Subscription Systems", "Admin Panels", "Enterprise Tools"],
        },
      ],
    },
    { name: "Portfolio", path: "/portfolio" },
    { name: "Careers", path: "/careers" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <nav className="w-full bg-[#0B142B] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-white font-bold text-xl">
          <span className="px-5 py-2 bg-gradient-to-r from-[#1E7BCE] to-[#38A7F0]">
            VeloShift Co
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10 text-white font-medium">
          {navItems.map((item, i) => (
            <div key={i} className="relative group">
              <div className="py-2 flex items-center gap-1 cursor-pointer hover:text-[#38A7F0]">
                {item.path ? (
                  <NavLink to={item.path}>{item.name}</NavLink>
                ) : (
                  <>
                    {item.name}
                    <ChevronDown size={16} />
                  </>
                )}
              </div>

              {/* Dropdown */}
              {item.dropdown && (
                <div className="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <div className="bg-[#1a2540] rounded-lg shadow-lg w-56 py-2">
                    {item.dropdown.map((sub, idx) => (
                      sub.download ? (
                        <a
                          key={idx}
                          href={sub.path}
                          download
                          className="block px-5 py-3 text-sm hover:bg-[#24345a]"
                        >
                          {sub.name}
                        </a>
                      ) : (
                        <Link
                          key={idx}
                          to={sub.path}
                          className="block px-5 py-3 text-sm hover:bg-[#24345a]"
                        >
                          {sub.name}
                        </Link>
                      )
                    ))}
                  </div>
                </div>
              )}

              {/* Mega Menu */}
              {item.mega && (
                <div className="absolute left-1/2 -translate-x-[54%] top-full pt-4 w-[1000px] max-w-[95vw] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
                  <div className="px-4">
                    <div className="bg-[#1a2540]/95 backdrop-blur-md rounded-xl shadow-2xl p-8 border border-white/5">
                      <div className="grid grid-cols-2 lg:grid-cols-3 gap-8">
                        {item.sections.map((section, idx) => (
                          <Link to="/services" key={idx} className="block bg-[#223056] p-5 rounded-xl hover:bg-[#283a66] transition-all duration-300 shadow-md hover:shadow-xl border border-white/5 hover:-translate-y-1">
                            <h4 className="text-[#38A7F0] font-semibold mb-2 text-xs uppercase tracking-wider">
                              {section.title}
                            </h4>
                            <div className="w-6 h-[2px] bg-[#38A7F0] mb-3"></div>
                            <ul className="space-y-3">
                              {section.items.map((sub, i) => (
                                <li key={i} className="flex items-center gap-3 text-gray-300 hover:text-white transition-all duration-200 cursor-pointer text-sm group hover:translate-x-1">
                                  <span className="w-2 h-2 bg-gradient-to-r from-[#38A7F0] to-[#1E7BCE] rounded-full"></span>
                                  {sub}
                                </li>
                              ))}
                            </ul>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white text-2xl" onClick={() => setOpen(!open)}>
          {open ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full bg-[#0B142B] z-[60] transform ${open ? "translate-x-0" : "translate-x-full"} transition duration-300`}>
        <div className="p-6 text-white">
          <div className="flex justify-end mb-8">
            <button onClick={() => setOpen(false)} className="text-2xl">✕</button>
          </div>

          <div className="space-y-6">
            {navItems.map((item, i) => (
              <div key={i} className="border-b border-white/10 pb-4">
                <div
                  onClick={() =>
                    item.dropdown || item.mega
                      ? setMobileDropdown(mobileDropdown === i ? null : i)
                      : setOpen(false)
                  }
                  className="flex justify-between items-center text-lg font-medium cursor-pointer"
                >
                  <span>{item.name}</span>
                  {(item.dropdown || item.mega) && (
                    mobileDropdown === i ? <Minus size={20} /> : <Plus size={20} />
                  )}
                </div>

                {mobileDropdown === i && (
                  <div className="mt-4 pl-2 space-y-4 text-gray-300 text-sm">
                    {item.dropdown &&
                      item.dropdown.map((sub, idx) => (
                        sub.download ? (
                          <a
                            key={idx}
                            href={sub.path}
                            download
                            className="block hover:text-white"
                            onClick={() => setOpen(false)}
                          >
                            {sub.name}
                          </a>
                        ) : (
                          <Link
                            key={idx}
                            to={sub.path}
                            className="block hover:text-white"
                            onClick={() => setOpen(false)}
                          >
                            {sub.name}
                          </Link>
                        )
                      ))}
                    {item.mega &&
                      item.sections.map((sec, idx) => (
                        <div key={idx}>
                          <Link to="/services" className="block" onClick={() => setOpen(false)}>
                            <p className="text-[#38A7F0] font-semibold mb-2">{sec.title}</p>
                            <div className="space-y-2 pl-2">
                              {sec.items.map((s, j) => (
                                <p key={j} className="hover:text-white cursor-pointer">{s}</p>
                              ))}
                            </div>
                          </Link>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}