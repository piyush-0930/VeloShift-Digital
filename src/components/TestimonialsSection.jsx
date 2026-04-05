import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Rahul Mehta",
      role: "CTO, NovaStack Technologies",
      image: "https://i.pravatar.cc/150?img=1",
      message:
        "Veloshift transformed our product with a modern full-stack architecture and seamless cloud deployment. Their engineering quality is unmatched.",
    },
    {
      name: "Ananya Verma",
      role: "Product Manager, AeroSys Solutions",
      image: "https://i.pravatar.cc/150?img=5",
      message:
        "Their AI automation workflows reduced manual operations drastically and improved our delivery speed. A trusted long-term tech partner.",
    },
    {
      name: "Michael Lee",
      role: "Head of Digital Innovation, Zenith Industries",
      image: "https://i.pravatar.cc/150?img=3",
      message:
        "Veloshift’s API integrations and scalable cloud setup helped us unify multiple systems flawlessly. Highly reliable and extremely professional.",
    },
  ];

  return (
    <section className="w-full py-24 bg-[var(--vs-bg)] text-center px-6">

      {/* TITLE */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-white">
        What Our Clients <span className="text-[var(--vs-secondary)]">Say</span>
      </h2>

      <div className="h-1 w-32 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
      mx-auto mt-4 rounded-full shadow-[0_0_15px_var(--vs-primary)]"></div>

      {/* GRID */}
      <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">

        {testimonials.map((t, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md
            hover:scale-[1.03] hover:shadow-xl transition-all duration-300 text-left"
          >

            {/* STARS ⭐ */}
            <div className="flex gap-1 mb-3 text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill="currentColor" />
              ))}
            </div>

            {/* QUOTE ICON */}
            <Quote className="text-[var(--vs-secondary)] mb-3" size={26} />

            {/* MESSAGE */}
            <p className="text-[var(--vs-light)]/80 leading-relaxed text-sm mb-6">
              “{t.message}”
            </p>

            {/* USER */}
            <div className="flex items-center gap-4">

              <img
                src={t.image}
                alt={t.name}
                className="w-12 h-12 rounded-full object-cover border border-white/10"
              />

              <div>
                <h4 className="text-white font-semibold text-sm">
                  {t.name}
                </h4>
                <p className="text-[var(--vs-light)]/60 text-xs">
                  {t.role}
                </p>
              </div>

            </div>

          </motion.div>
        ))}

      </div>
    </section>
  );
}