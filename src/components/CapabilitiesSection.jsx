export default function CapabilitiesSection() {
  const capabilities = [
    {
      title: "AI & Automation",
      desc: "Build intelligent AI systems, automation workflows, chatbots, and ML-powered solutions that optimize business operations.",
      color: "#4FD1C5",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M12 2v4m0 12v4m4-12h4M4 12h4m1 2a3 3 0 106 0a3 3 0 00-6 0z" />
        </svg>
      )
    },
    {
      title: "Web & App Development",
      desc: "Full-stack development for scalable web platforms, mobile apps, dashboards, and enterprise-grade digital products.",
      color: "#FF8B3D",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M4 6h16v12H4zM4 10h16M9 14h6" />
        </svg>
      )
    },
    {
      title: "Cloud & DevOps",
      desc: "Deploy, optimize, and manage cloud infrastructure with CI/CD, containers, monitoring, and industry-standard security.",
      color: "#38A7F0",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M3 15a4 4 0 014-4h1a5 5 0 019-2a4 4 0 012 7H7a4 4 0 01-4-1z" />
        </svg>
      )
    },
    {
      title: "API Integrations",
      desc: "Connect systems seamlessly using API development, third-party integrations, payment gateways, and custom connectors.",
      color: "#A855F7",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M4 12h16m-5-5l5 5l-5 5M9 7L4 12l5 5" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative w-full py-24 text-center px-6 overflow-hidden">

      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none"></div>

      <div className="relative z-10">

        {/* Title */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          Our Core <span className="text-[var(--vs-secondary)]">Capabilities</span>
        </h2>

        {/* Underline */}
        <div className="h-1 w-32 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                        mx-auto mt-4 rounded-full shadow-[0_0_15px_var(--vs-primary)]"></div>

        {/* Floating Features */}
        <div className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 max-w-7xl mx-auto">

          {capabilities.map((cap, i) => (
            <div 
              key={i}
              className="group flex flex-col items-center text-center transition-all duration-300"
            >
              {/* Icon circle */}
              <div 
                className="
                  w-24 h-24 rounded-full flex items-center justify-center mb-6 
                  transition-all duration-300 group-hover:scale-110 
                  shadow-[0_0_25px_rgba(0,0,0,0.3)]
                "
                style={{ backgroundColor: cap.color + "20" }}
              >
                <div 
                  className="transition-all duration-300 group-hover:rotate-6"
                  style={{ color: cap.color }}
                >
                  {cap.icon}
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-white">
                {cap.title}
              </h3>

              {/* Description */}
              <p className="text-[var(--vs-light)]/80 mt-3 leading-relaxed max-w-xs">
                {cap.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
