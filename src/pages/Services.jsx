export default function Services() {
  const services = [
    {
      title: "Design & Drafting",
      icon: "ri-pencil-ruler-2-line",
      desc: "High-precision 2D/3D CAD drafting, industrial component modeling, sheet-metal design, product detailing and manufacturing-ready documentation.",
    },
    {
      title: "Product Engineering",
      icon: "ri-cpu-line",
      desc: "Mechanical, electrical & embedded product engineering — concept to prototype, structural validation, simulation and final production design.",
    },
    {
      title: "BIM & Infrastructure",
      icon: "ri-building-4-line",
      desc: "End-to-end BIM modeling for civil, mechanical & electrical domains, clash detection, digital twin development and coordinated construction modeling.",
    },
    {
      title: "Industrial IoT & Data Systems",
      icon: "ri-radar-line",
      desc: "Smart monitoring systems, sensor integration, predictive maintenance, IIoT dashboards and real-time industrial data analytics.",
    },
    {
      title: "Automation & Robotics",
      icon: "ri-robot-line",
      desc: "PLC/SCADA automation, robotics integration, workflow automation, control systems and smart industrial automation solutions.",
    },
    {
      title: "Software & Cloud Solutions",
      icon: "ri-cloud-line",
      desc: "Full-stack software, AI-driven applications, cloud-native platforms, internal business tools and enterprise automation solutions.",
    }
  ];

  const processSteps = [
    {
      icon: "ri-search-eye-line",
      title: "Discovery & Requirement Mapping",
      desc: "We study your business challenges, workflows, KPIs and expected deliverables to create a clear technical roadmap.",
    },
    {
      icon: "ri-draft-line",
      title: "Concept & System Architecture",
      desc: "We design engineering blueprints, cloud architecture, automation flows, BIM layouts or product specifications.",
    },
    {
      icon: "ri-pen-nib-line",
      title: "Design/Engineering Drafting",
      desc: "CAD drafting, 3D modeling, BIM detailing, component design, system layouts and software UI/UX planning.",
    },
    {
      icon: "ri-tools-line",
      title: "Development & Integration",
      desc: "Mechanical builds, electrical systems, software development, PLC/IoT integration or cloud deployment.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Testing & Validation",
      desc: "Performance testing, simulations, stress analysis, QA/QC, automation testing or model validation.",
    },
    {
      icon: "ri-rocket-line",
      title: "Deployment & Ongoing Support",
      desc: "Final implementation, onboarding, documentation, maintenance and continuous optimization.",
    },
  ];

  const roi = [
    { value: "20%", label: "Average Cost Reduction" },
    { value: "30%", label: "Faster Project Delivery" },
    { value: "99.9%", label: "System Uptime" },
    { value: "97%", label: "Client Satisfaction" },
  ];

  return (
    <div className="w-full bg-[var(--vs-bg)] text-[var(--vs-light)]">

      {/* ============================
          HERO SECTION WITH GRID
      ============================= */}
      <section className="relative py-24 text-center px-6 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20"></div>

        <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold text-white">
          Our{" "}
          <span className="bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                           bg-clip-text text-transparent">
            Services
          </span>
        </h1>

        <p className="relative z-10 max-w-2xl mx-auto mt-6 text-lg text-[var(--vs-light)]/85 leading-relaxed">
          Veloshift Co delivers engineering, automation, BIM, IoT and software solutions 
          built to optimize industrial performance, reduce operational costs and accelerate business growth.
        </p>
      </section>

      {/* ============================
          OUR SERVICES
      ============================= */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white">
          What We Offer
        </h2>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                        mt-3 mb-14 rounded-full"></div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((srv, i) => (
            <div
              key={i}
              className="relative bg-[#121b36] border border-white/10 p-8 rounded-2xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-5xl mb-4 text-[var(--vs-secondary)]">
                <i className={srv.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-white">{srv.title}</h3>
              <p className="mt-3 text-[var(--vs-light)]/80 leading-relaxed">{srv.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================
          COMPARISON MATRIX
      ============================= */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          What Sets Us Apart
        </h2>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                        mt-3 mb-14 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          {/* Column 1 */}
          <div className="bg-[#121b36] border border-white/10 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Typical Agencies</h3>
            <ul className="space-y-2 text-[var(--vs-light)]/75">
              <li>❌ Limited engineering depth</li>
              <li>❌ Outsourced technical work</li>
              <li>❌ No long-term support</li>
              <li>❌ Slow delivery cycles</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="bg-[#0F1A30] border border-[var(--vs-secondary)]/40 p-8 rounded-xl shadow-lg shadow-[var(--vs-secondary)]/10 scale-[1.02]">
            <h3 className="text-xl font-bold text-white mb-4">Veloshift Technology</h3>
            <ul className="space-y-2 text-[var(--vs-light)]">
              <li>✔ Engineering + Software + Automation</li>
              <li>✔ In-house skilled technical team</li>
              <li>✔ 24/7 Support & Reporting</li>
              <li>✔ Modern delivery cycles</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="bg-[#121b36] border border-white/10 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Traditional Firms</h3>
            <ul className="space-y-2 text-[var(--vs-light)]/75">
              <li>⚠️ Manual workflows</li>
              <li>⚠️ Limited digital transformation</li>
              <li>⚠️ Delayed reporting</li>
              <li>⚠️ Rigid execution</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ============================
          PROVEN IMPLEMENTATION PROCESS
      ============================= */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Our Proven Implementation Process
        </h2>
        <div className="h-1 w-28 mx-auto bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                        mt-3 mb-14 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
          {processSteps.map((step, i) => (
            <div key={i} className="bg-[#121b36] border border-white/10 p-8 rounded-2xl text-center">
              <div className="text-4xl text-[var(--vs-secondary)] mb-4">
                <i className={step.icon}></i>
              </div>
              <h3 className="text-xl font-bold text-white">{step.title}</h3>
              <p className="mt-3 text-[var(--vs-light)]/80">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================
          ROI & METRICS
      ============================= */}
      <section className="py-20 px-6 bg-[#0F1A30] border-t border-white/10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Measurable ROI & Performance Metrics
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-5xl mx-auto mt-16">
          {roi.map((item, i) => (
            <div key={i} className="text-center">
              <div className="text-4xl md:text-5xl font-extrabold text-[var(--vs-secondary)]">
                {item.value}
              </div>
              <p className="mt-2 text-[var(--vs-light)]/80">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============================
          CTA SECTION
      ============================= */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Let’s Build Your Next Engineering Breakthrough
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-[var(--vs-light)]/80">
          Whether it’s automation, IoT, CAD, BIM, cloud, or full product engineering —
          we help you move faster, smarter, and more efficiently.
        </p>

        <a
          href="/contact"
          className="mt-10 inline-block px-8 py-3 rounded-md text-lg font-semibold text-white
                     bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                     hover:opacity-90 transition shadow"
        >
          Contact Us
        </a>
      </section>
    </div>
  );
}
