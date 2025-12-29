export default function Industries() {
  const industries = [
    {
      title: "Information Technology (IT) & SaaS",
      desc: "Custom SaaS development, AI copilots, automation engines, cloud-ready platforms and enterprise workflow systems.",
      icon: "💻",
      color: "text-[#38A7F0]",
    },
    {
      title: "FinTech & Digital Payments",
      desc: "Secure financial dashboards, payment automation, fraud analysis tools, AML systems and API-based integrations.",
      icon: "💳",
      color: "text-[#4fd1c5]",
    },
    {
      title: "Healthcare & MedTech",
      desc: "AI-driven diagnostics, appointment automation, EHR dashboards, telemedicine platforms and workflow optimization.",
      icon: "🏥",
      color: "text-yellow-400",
    },
    {
      title: "E-commerce & Online Marketplaces",
      desc: "High-performance storefronts, logistics automation, AI recommendations, inventory systems and checkout integrations.",
      icon: "🛒",
      color: "text-orange-400",
    },
    {
      title: "Real Estate & PropTech",
      desc: "Property management systems, automated CRM, AI assistants, tenant portals and cloud-powered analytics.",
      icon: "🏙️",
      color: "text-purple-400",
    },
    {
      title: "Logistics, Supply Chain & Smart Ops",
      desc: "IoT tracking, route automation, fleet dashboards, warehouse optimization and real-time monitoring systems.",
      icon: "🚚",
      color: "text-[#2ED47A]",
    },
  ];

  return (
    <div className="w-full bg-[var(--vs-bg)] text-white">

      {/* ================================
          PAGE HERO
      ================================= */}
      <div className="relative w-full py-28 text-center overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20"></div>

        <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold">
          Industries We <span className="text-[var(--vs-secondary)]">Empower</span>
        </h1>

        <p className="relative z-10 mt-5 max-w-3xl mx-auto text-[var(--vs-light)]/80 text-lg">
          Veloshift Technology delivers AI, cloud, automation and full-stack
          engineering solutions tailored for modern, fast-moving digital industries.
        </p>
      </div>

      {/* ================================
          INDUSTRY GRID
      ================================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {industries.map((ind, i) => (
          <div
            key={i}
            className="bg-[#121b36] border border-white/10 p-8 rounded-2xl 
                       hover:-translate-y-2 transition-all duration-300 relative"
          >
            {/* glow */}
            <div className="absolute inset-0 rounded-2xl opacity-0 hover:opacity-100 shadow-[0_0_20px_var(--vs-primary)] transition"></div>

            <div className={`text-5xl mb-6 ${ind.color}`}>{ind.icon}</div>

            <h3 className="text-2xl font-bold mb-3">{ind.title}</h3>

            <p className="text-[var(--vs-light)]/80 leading-relaxed">
              {ind.desc}
            </p>
          </div>
        ))}
      </section>

      {/* ================================
          CTA BLOCK
      ================================= */}
      <div className="w-full py-20 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Want an Industry-Focused Digital Solution?
        </h2>
        <p className="text-[var(--vs-light)]/80 max-w-2xl mx-auto mb-8">
          Let’s build scalable, intelligent and automation-ready systems tailored for your industry.
        </p>

        <a
          href="/contact"
          className="inline-block px-8 py-3 rounded-md text-lg font-semibold text-white
                     bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                     hover:opacity-90 transition"
        >
          Contact Us
        </a>
      </div>
    </div>
  );
}
