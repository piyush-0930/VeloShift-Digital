export default function ToolsSection() {
  const tools = [
    // Development
    { name: "React", color: "from-[#61DAFB]/25 to-[#61DAFB]/10 text-[#B8EEFF]" },
    { name: "Next.js", color: "from-[#FFFFFF]/15 to-[#FFFFFF]/5 text-[#FFFFFF]/80" },
    { name: "Node.js", color: "from-[#5FA04E]/25 to-[#5FA04E]/10 text-[#C8E8C2]" },
    { name: "Express.js", color: "from-[#AAAAAA]/20 to-[#AAAAAA]/10 text-[#DDDDDD]" },

    // Cloud & DevOps
    { name: "AWS", color: "from-[#FF9900]/25 to-[#FF9900]/10 text-[#FFD8A6]" },
    { name: "Azure", color: "from-[#0078D4]/25 to-[#0078D4]/10 text-[#A9D5FF]" },
    { name: "Docker", color: "from-[#2496ED]/25 to-[#2496ED]/10 text-[#B4DAFF]" },
    { name: "Kubernetes", color: "from-[#326CE5]/25 to-[#326CE5]/10 text-[#C2D6FF]" },
    { name: "Terraform", color: "from-[#B16BFF]/25 to-[#B16BFF]/10 text-[#E3CCFF]" },
    { name: "Grafana", color: "from-[#F86800]/25 to-[#F86800]/10 text-[#FFC299]" },

    // Databases & Integrations
    { name: "MongoDB", color: "from-[#4DB33D]/25 to-[#4DB33D]/10 text-[#C7F0C3]" },
    { name: "Firebase", color: "from-[#FFCA28]/25 to-[#FFCA28]/10 text-[#FFE7A4]" },
    { name: "Stripe", color: "from-[#635BFF]/25 to-[#635BFF]/10 text-[#C8C4FF]" },

    // AI & ML
    { name: "Python", color: "from-[#FFD447]/25 to-[#FFD447]/10 text-[#FFF2B0]" },
    { name: "TensorFlow", color: "from-[#FF6F00]/25 to-[#FF6F00]/10 text-[#FFD4B0]" },
    { name: "HuggingFace", color: "from-[#FFCC4D]/25 to-[#FFCC4D]/10 text-[#FFE7A6]" },
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
              transition-all duration-300
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
