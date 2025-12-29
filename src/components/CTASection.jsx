export default function CTASection() {
  return (
    <section className="w-full py-24 bg-[var(--vs-bg)] text-center px-6">

      {/* GRID BACKGROUND (light, subtle) */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-3xl mx-auto">

        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          Ready to Build Smarter, Faster &{" "}
          <span className="text-[var(--vs-secondary)]">AI-Driven Solutions?</span>
        </h2>

        <p className="mt-6 text-lg text-[var(--vs-light)]/80 leading-relaxed">
          Team up with Veloshift Technology to develop powerful web & app solutions,
          automate business workflows, deploy secure cloud infrastructure, 
          and integrate intelligent AI systems tailored for modern enterprises.
        </p>

        <a
          href="/contact"
          className="mt-10 inline-block px-10 py-4 rounded-lg text-lg font-semibold text-white shadow-lg
                     bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                     hover:opacity-90 transition-all duration-300"
        >
          Get Started
        </a>
      </div>
    </section>
  );
}
