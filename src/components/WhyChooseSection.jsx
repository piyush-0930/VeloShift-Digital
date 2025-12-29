export default function WhyChooseSection() {
  const features = [
    {
      title: "Expert Development",
      desc: "Skilled engineers & developers building high-performance web apps, mobile apps, and scalable digital systems.",
      color: "#2ED47A",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" 
          className="w-10 h-10"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M10.325 4.317a1 1 0 011.35-.447l7.838 3.92a1 1 0 01.447 1.35l-3.92 7.838a1 1 0 01-1.35.447l-7.838-3.92a1 1 0 01-.447-1.35l3.92-7.838z"/>
        </svg>
      )
    },
    {
      title: "Skilled AI Team",
      desc: "AI engineers delivering chatbots, automation pipelines, ML models, and intelligent business systems.",
      color: "#FF8B3D",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M17 20h5v-2a4 4 0 00-4-4h-3m-4 6H2v-2a4 4 0 014-4h3m6 0a4 4 0 110-8a4 4 0 010 8z"/>
        </svg>
      )
    },
    {
      title: "Trusted & Certified",
      desc: "A reliable, quality-driven tech company trusted by startups and enterprises for secure delivery.",
      color: "#38A7F0",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 4.354L20 9v5c0 4.418-3.582 8-8 8s-8-3.582-8-8V9l8-4.354z"/>
        </svg>
      )
    },
    {
      title: "Complete Tech Delivery",
      desc: "Web, apps, AI, cloud, DevOps, APIs — everything you need delivered under one roof with seamless execution.",
      color: "#A855F7",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M3 7h18M3 12h18M3 17h18"/>
        </svg>
      )
    },
    {
      title: "Innovation Focused",
      desc: "We use modern technologies like automation, cloud, AI, and smart integrations to build future-ready solutions.",
      color: "#14B8A6",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M13 10V3L4 14h7v7l9-11h-7z"/>
        </svg>
      )
    },
    {
      title: "Reliable Support",
      desc: "Smooth communication, transparent process, and long-term tech support for scaling your business.",
      color: "#FBBF24",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg"
          className="w-10 h-10"
          fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M12 8v4m0 4h.01M4.93 4.93l14.14 14.14"/>
        </svg>
      )
    }
  ];

  return (
    <section className="relative w-full py-24 text-center px-6 overflow-hidden">

      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none"></div>

      <div className="relative z-10">

        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          Why Choose{" "}
          <span className="text-[var(--vs-secondary)]">Veloshift Technology</span>
        </h2>

        <div className="h-1 w-28 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                        mx-auto mt-4 rounded-full shadow-[0_0_15px_var(--vs-primary)]"></div>

        {/* FEATURES */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-14 max-w-7xl mx-auto">

          {features.map((item, i) => (
            <div 
              key={i}
              className="group flex flex-col items-center text-center transition-all duration-300"
            >
              {/* ICON CIRCLE */}
              <div 
                className="w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                style={{ backgroundColor: item.color + "20"}}
              >
                <div 
                  className="transition-all duration-300 group-hover:rotate-6"
                  style={{ color: item.color }}
                >
                  {item.icon}
                </div>
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-white">
                {item.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-[var(--vs-light)]/80 mt-3 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
}
