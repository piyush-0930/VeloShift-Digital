import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#060D1E] border-t border-white/10 pt-16 pb-10 text-[var(--vs-light)]">

      {/* TOP FOOTER GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* LOGO + ABOUT */}
        <div>
          <h2 className="font-bold text-2xl text-white">
            <span className="px-4 py-1 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]">
              VeloShift Co
            </span>
          </h2>

          <p className="mt-5 text-[var(--vs-light)]/70 leading-relaxed">
            Empowering businesses with intelligent AI systems, scalable web & app 
            development, cloud architecture, and automation-driven digital solutions.
          </p>

          {/* SOCIAL ICONS */}
          <div className="flex items-center gap-4 mt-6">
            {["facebook", "twitter", "linkedin", "github"].map((icon) => (
              <a
                key={icon}
                href="#"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 transition text-[var(--vs-light)]"
              >
                <i className={`ri-${icon}-fill text-xl`}></i>
              </a>
            ))}
          </div>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-3 text-[var(--vs-light)]/80">
            <li><Link to="/" className="hover:text-[var(--vs-secondary)] transition">Home</Link></li>
            <li><Link to="/about" className="hover:text-[var(--vs-secondary)] transition">About</Link></li>
            <li><Link to="/services" className="hover:text-[var(--vs-secondary)] transition">Services</Link></li>
            <li><Link to="/industries" className="hover:text-[var(--vs-secondary)] transition">Industries</Link></li>
          </ul>
        </div>

        {/* SERVICES UPDATED */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Services</h3>
          <ul className="space-y-3 text-[var(--vs-light)]/80">
            <li>AI & Automation</li>
            <li>Web & App Development</li>
            <li>Cloud & DevOps</li>
            <li>API Integrations</li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact</h3>
          <ul className="space-y-3 text-[var(--vs-light)]/80">
            <li>Email: business.veloshift@gmail.com</li>
            <li>Phone: +91 95186-18418</li>
            <li>Office: CU-TBI, Mohali</li>
          </ul>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-white/10 mt-12 pt-5 text-center text-[var(--vs-light)]/60">
        © {new Date().getFullYear()} <span className="text-white">VeloShift Co. </span> 
        All rights reserved.
      </div>
    </footer>
  );
}
