export default function Services() {
  const services = [
    {
      title: "AI & Automation",
      icon: "ri-robot-line",
      desc: "AI chatbots, workflow automation, ML-driven optimization and intelligent systems that improve business performance.",
    },
    {
      title: "Web & App Development",
      icon: "ri-window-line",
      desc: "Scalable web applications, mobile apps, dashboards and custom digital platforms built with modern frameworks.",
    },
    {
      title: "Cloud & DevOps",
      icon: "ri-cloud-line",
      desc: "Cloud deployments, CI/CD pipelines, infrastructure management and secure cloud-native architectures.",
    },
    {
      title: "API Integrations",
      icon: "ri-link-m",
      desc: "Third-party integrations, payment gateways, CRM/ERP connections, automation tools and custom API development.",
    },
    {
      title: "SaaS Tools & Platforms",
      icon: "ri-stack-line",
      desc: "End-to-end product development for SaaS platforms, admin panels, multi-tenant systems and enterprise tooling.",
    },
    {
      title: "Business Automation Systems",
      icon: "ri-cpu-line",
      desc: "Internal tools, workflow engines, automation dashboards and smart operational systems for enterprises.",
    },
  ];

  const processSteps = [
    {
      icon: "ri-search-eye-line",
      title: "Discovery & Planning",
      desc: "Understanding your vision, use-case, bottlenecks, KPIs and building a detailed requirement map.",
    },
    {
      icon: "ri-draft-line",
      title: "System Architecture",
      desc: "Designing system blueprint, cloud structure, automation flows or full-stack architecture.",
    },
    {
      icon: "ri-pencil-ruler-line",
      title: "UI/UX & Prototyping",
      desc: "Creating seamless user experiences, interactive mockups and intuitive workflow designs.",
    },
    {
      icon: "ri-tools-line",
      title: "Development & Integration",
      desc: "API development, frontend engineering, backend logic, automation pipelines and cloud setup.",
    },
    {
      icon: "ri-shield-check-line",
      title: "Testing & Quality Validation",
      desc: "Automation testing, performance checks, load testing and validation under production conditions.",
    },
    {
      icon: "ri-rocket-line",
      title: "Deployment & Support",
      desc: "Launch, monitoring, training, documentation and long-term support for high uptime.",
    },
  ];

  const roi = [
    { value: "40%", label: "Operational Efficiency Boost" },
    { value: "50%", label: "Faster Project Delivery" },
    { value: "99.9%", label: "Cloud Reliability" },
    { value: "97%", label: "Client Satisfaction" },
  ];

  return (
    <div className="w-full bg-[var(--vs-bg)] text-[var(--vs-light)]">

      {/* ============================ HERO ============================ */}
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
          Veloshift Technology delivers AI systems, cloud engineering, web development,
          automation tools and integration services designed for modern digital enterprises.
        </p>
      </section>

      {/* ============================ SERVICES ============================ */}
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

      {/* ============================ DIFFERENCE ============================ */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          What Makes Us Different
        </h2>
        <div className="h-1 w-24 mx-auto bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                        mt-3 mb-14 rounded-full"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-[#121b36] border border-white/10 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Traditional Agencies</h3>
            <ul className="space-y-2 text-[var(--vs-light)]/75">
              <li>❌ Outdated technology stack</li>
              <li>❌ Limited AI/Automation expertise</li>
              <li>❌ Slow development cycles</li>
              <li>❌ Weak cloud support</li>
            </ul>
          </div>

          <div className="bg-[#0F1A30] border border-[var(--vs-secondary)]/40 p-8 rounded-xl shadow-lg shadow-[var(--vs-secondary)]/10 scale-[1.02]">
            <h3 className="text-xl font-bold text-white mb-4">Veloshift Technology</h3>
            <ul className="space-y-2 text-[var(--vs-light)]">
              <li>✔ AI + Cloud + Full Stack + Automation</li>
              <li>✔ End-to-end product delivery</li>
              <li>✔ Skilled in-house engineering team</li>
              <li>✔ Fast delivery cycles</li>
            </ul>
          </div>

          <div className="bg-[#121b36] border border-white/10 p-8 rounded-xl">
            <h3 className="text-xl font-bold text-white mb-4">Freelancers</h3>
            <ul className="space-y-2 text-[var(--vs-light)]/75">
              <li>⚠️ No long-term support</li>
              <li>⚠️ Inconsistent delivery</li>
              <li>⚠️ Limited system architecture skills</li>
              <li>⚠️ No enterprise scaling</li>
            </ul>
          </div>

        </div>
      </section>

      {/* ============================ PROCESS ============================ */}
      <section className="py-24 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Our Proven Workflow
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

      {/* ============================ ROI ============================ */}
      <section className="py-20 px-6 bg-[#0F1A30] border-t border-white/10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Measurable ROI & Impact
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

      {/* ============================ CTA ============================ */}
      <section className="py-24 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Ready to Build with Veloshift?
        </h2>

        <p className="mt-4 max-w-2xl mx-auto text-[var(--vs-light)]/80">
          AI, automation, cloud engineering or full-stack development — let’s build
          systems that scale your business.
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
