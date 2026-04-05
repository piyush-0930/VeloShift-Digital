import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="w-full bg-[#060D1E] border-t border-white/10 pt-16 pb-10 text-[var(--vs-light)]">

      {/* GRID */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12">

        {/* LOGO + ABOUT */}
        <div>
          <h2 className="font-bold text-2xl text-white">
            <span className="px-4 py-1 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]">
              VeloShift Co
            </span>
          </h2>

          <p className="mt-5 text-[var(--vs-light)]/70 leading-relaxed">
            Building scalable, high-performance digital products with AI, cloud infrastructure,
            and modern web technologies for startups and enterprises worldwide.
          </p>
        </div>

        {/* COMPANY */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Company</h3>
          <ul className="space-y-3 text-[var(--vs-light)]/80">
            <li><Link to="/" className="hover:text-[var(--vs-secondary)]">Home</Link></li>
            <li><Link to="/about" className="hover:text-[var(--vs-secondary)]">About</Link></li>
            <li><Link to="/services" className="hover:text-[var(--vs-secondary)]">Services</Link></li>
            <li><Link to="/portfolio" className="hover:text-[var(--vs-secondary)]">Portfolio</Link></li>
            <li><Link to="/careers" className="hover:text-[var(--vs-secondary)]">Careers</Link></li>
          </ul>
        </div>

        {/* SOLUTIONS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Solutions</h3>
          <ul className="space-y-3 text-[var(--vs-light)]/80">
            <li className="hover:text-[var(--vs-secondary)] cursor-pointer">Development</li>
            <li className="hover:text-[var(--vs-secondary)] cursor-pointer">AI & Automation</li>
            <li className="hover:text-[var(--vs-secondary)] cursor-pointer">Cloud Services</li>
            <li className="hover:text-[var(--vs-secondary)] cursor-pointer">Tech Integrations</li>
            <li className="hover:text-[var(--vs-secondary)] cursor-pointer">Design & Consulting</li>
          </ul>
        </div>

        {/* 🔥 PROJECTS / LABS */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Labs & Projects</h3>

          <ul className="space-y-3 text-[var(--vs-light)]/80">
            <li className="hover:text-[var(--vs-secondary)] cursor-pointer">VX Labs (AI Research)</li>
            <li className="hover:text-[var(--vs-secondary)] cursor-pointer">ONTC (Cloud Infra Tools)</li>
            <li className="hover:text-[var(--vs-secondary)] cursor-pointer">NeuroFlow (ML Platform)</li>
            <li className="hover:text-[var(--vs-secondary)] cursor-pointer">StackForge (Dev Tools)</li>
            <li className="hover:text-[var(--vs-secondary)] cursor-pointer">AutoSync (Automation Suite)</li>
          </ul>
        </div>

      </div>

      {/* BOTTOM */}
      <div className="border-t border-white/10 mt-12 pt-5 text-center text-[var(--vs-light)]/60 text-sm">
        © {new Date().getFullYear()}{" "}
        <span className="text-white font-medium">VeloShift Co.</span> All rights reserved.
      </div>
    </footer>
  );
}