export default function Industries() {
  const industries = [
    {
      title: "Manufacturing",
      desc: "Automation, PLC/SCADA systems, digital twins, predictive maintenance and process optimization for factories.",
      icon: "🏭",
      color: "text-[#38A7F0]"
    },
    {
      title: "Construction & Infrastructure",
      desc: "BIM modeling, MEP coordination, structural drafting, quantity takeoff, and real-time collaboration workflows.",
      icon: "🏗️",
      color: "text-[#4fd1c5]"
    },
    {
      title: "Energy & Utilities",
      desc: "Smart grid systems, IoT monitoring, renewable energy modeling, and efficient load-flow automation solutions.",
      icon: "⚡",
      color: "text-yellow-400"
    },
    {
      title: "Automotive",
      desc: "3D CAD, ECAD/MCAD integration, prototyping, quality testing automation, and product lifecycle solutions.",
      icon: "🚘",
      color: "text-orange-400"
    },
    {
      title: "Aerospace & Defense",
      desc: "High-precision engineering, simulation workflows, secure automation, and compliance-driven digital systems.",
      icon: "✈️",
      color: "text-purple-400"
    },
    {
      title: "Smart Cities & IoT",
      desc: "Sensor-driven automation, real-time dashboards, surveillance integration, and AI-based city planning tools.",
      icon: "🌐",
      color: "text-[#2ED47A]"
    }
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
          Veloshift Technology delivers domain-specific engineering, automation, and
          digital solutions tailored for high-performance industries.
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
          Want Industry-Ready Engineering & Automation?
        </h2>
        <p className="text-[var(--vs-light)]/80 max-w-2xl mx-auto mb-8">
          Let's build solutions that match your operational demands and future-driven goals.
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
