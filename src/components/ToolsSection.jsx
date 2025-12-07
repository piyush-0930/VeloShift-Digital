export default function ToolsSection() {
  const tools = [
    { name: "AutoCAD", color: "from-[#3F8CFF]/25 to-[#3F8CFF]/10 text-[#A9CCFF]" },
    { name: "SolidWorks", color: "from-[#FF6B6B]/25 to-[#FF6B6B]/10 text-[#FFB3B3]" },
    { name: "Revit", color: "from-[#9C7BFF]/25 to-[#9C7BFF]/10 text-[#D3C5FF]" },
    { name: "Navisworks", color: "from-[#2FD4FF]/25 to-[#2FD4FF]/10 text-[#B5F3FF]" },
    { name: "MATLAB", color: "from-[#FFB155]/25 to-[#FFB155]/10 text-[#FFD7A8]" },
    { name: "Python", color: "from-[#FFD447]/25 to-[#FFD447]/10 text-[#FFEB9D]" },
    { name: "Docker", color: "from-[#5BA8FF]/25 to-[#5BA8FF]/10 text-[#B4D2FF]" },
    { name: "Kubernetes", color: "from-[#639BFF]/25 to-[#639BFF]/10 text-[#C0D3FF]" },
    { name: "AWS", color: "from-[#FF8A33]/25 to-[#FF8A33]/10 text-[#FFBF8A]" },
    { name: "Azure", color: "from-[#559CFF]/25 to-[#559CFF]/10 text-[#A8CEFF]" },
    { name: "Grafana", color: "from-[#FFA445]/25 to-[#FFA445]/10 text-[#FFD0A5]" },
    { name: "Terraform", color: "from-[#B16BFF]/25 to-[#B16BFF]/10 text-[#D9BDFF]" },
  ];

  return (
    <section className="w-full py-24 px-6 text-center bg-[var(--vs-bg)]">

      {/* Section Title */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-white">
        Tools & <span className="text-[var(--vs-secondary)]">Technologies</span>
      </h2>

      <div className="h-1 w-32 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] mx-auto mt-4 rounded-full shadow-[0_0_18px_var(--vs-primary)]"></div>

      {/* Badges */}
      <div className="mt-14 flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">

        {tools.map((tool, index) => (
          <div
            key={index}
            className={`
              px-7 py-3 rounded-full font-semibold tracking-wide
              bg-gradient-to-br ${tool.color}
              border border-white/10
              backdrop-blur-md

              shadow-[0_0_10px_rgba(0,0,0,0.25)]
              hover:shadow-[0_0_25px_rgba(255,255,255,0.18)]

              hover:-translate-y-[3px]
              hover:scale-[1.03]
              transition-all duration-300 ease-[cubic-bezier(.17,.67,.54,1.29)]

              cursor-default select-none
            `}
          >
            {tool.name}
          </div>
        ))}

      </div>
    </section>
  );
}
