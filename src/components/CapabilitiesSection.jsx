export default function CapabilitiesSection() {
  const capabilities = [
    {
      title: "Engineering Design",
      desc: "End-to-end 2D/3D CAD modeling, product detailing, and validation for industrial systems.",
      color: "#4FD1C5",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M4 20l4-4h12V4H8L4 8v12zm4-10h1m4 0h7m-12 4h12" />
        </svg>
      )
    },
    {
      title: "Automation",
      desc: "Smart systems that enhance speed, precision, and safety across manufacturing and infrastructure projects.",
      color: "#FF8B3D",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M12 8V4m0 16v-4m4-4h4m-16 0h4m2 2a2 2 0 104 0a2 2 0 00-4 0z" />
        </svg>
      )
    },
    {
      title: "BIM & Modelling",
      desc: "Integrated digital design and project coordination for civil, electrical, and mechanical domains.",
      color: "#38A7F0",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M3 7l9-4l9 4l-9 4l-9-4zm0 5l9 4l9-4m-9-4v13" />
        </svg>
      )
    },
    {
      title: "Digital Solutions",
      desc: "Cloud, IoT, and data-driven applications for connected enterprises.",
      color: "#A855F7",
      icon: (
        <svg className="w-12 h-12" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
          <path d="M12 3v18m9-9H3m3-6l12 12m0-12L6 18" />
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
