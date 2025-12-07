export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rahul Sharma",
      role: "CTO, NexaBuild Industries",
      image: "https://i.pravatar.cc/150?img=1",
      message:
        "Veloshift Technology elevated our engineering workflow with world-class automation and precision delivery. Their professionalism stands out."
    },
    {
      name: "Ananya Verma",
      role: "Product Manager, AeroTech Systems",
      image: "https://i.pravatar.cc/150?img=5",
      message:
        "Their AI-driven optimization reduced operational delays by 42%. Veloshift is now our core innovation partner."
    },
    {
      name: "Michael Lee",
      role: "Head of Digital, Zenith InfraTech",
      image: "https://i.pravatar.cc/150?img=3",
      message:
        "A reliable technical partner we trust. Extremely clean execution and scalable architecture suited for enterprise adoption."
    }
  ];

  return (
    <section className="w-full py-24 bg-[var(--vs-bg)] text-center px-6">

      {/* TITLE */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-white">
        What Our Clients <span className="text-[var(--vs-secondary)]">Say</span>
      </h2>

      {/* UNDERLINE */}
      <div className="h-1 w-32 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                      mx-auto mt-4 rounded-full shadow-[0_0_15px_var(--vs-primary)]"></div>

      {/* TESTIMONIAL GRID — NO BOXES */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16 max-w-6xl mx-auto">

        {testimonials.map((t, index) => (
          <div
            key={index}
            className="
              group flex flex-col items-center text-center
              transition-all duration-300
            "
          >

            {/* IMAGE */}
            <div className="
                w-24 h-24 rounded-full overflow-hidden 
                shadow-[0_0_15px_rgba(0,0,0,0.35)]
                group-hover:scale-110 
                transition-all duration-300
              "
            >
              <img
                src={t.image}
                alt={t.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* NAME */}
            <h3 className="
                mt-6 text-xl font-bold text-white 
                group-hover:text-[var(--vs-secondary)]
                transition-colors duration-300
              "
            >
              {t.name}
            </h3>

            {/* ROLE */}
            <p className="text-[var(--vs-light)]/60 text-sm mt-1">
              {t.role}
            </p>

            {/* MESSAGE */}
            <p className="
                mt-5 text-base text-[var(--vs-light)]/80 
                leading-relaxed max-w-sm
                italic
                group-hover:text-white/90
                transition-colors duration-300
              "
            >
              “{t.message}”
            </p>

            {/* SOFT UNDERLINE INDICATOR */}
            <div className="
                h-1 w-14 rounded-full mt-6 
                bg-gradient-to-r from-transparent via-[var(--vs-primary)] to-transparent 
                opacity-50 group-hover:opacity-100
                transition-all duration-300
              ">
            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
