import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

import review1 from "../assets/review-1.png";
import review2 from "../assets/review-2.png";
import review3 from "../assets/review-3.png";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ankur Malhotra",
      role: "Director, TRINITi Heights",
      image: review1,
      message:
        "VeloShift transformed our operations with a scalable digital platform, seamless integrations, and consistent performance improvements across every business workflow.",
    },
    {
      name: "Himani Nirmal",
      role: "HR Head, Archfin Professionals",
      image: review2,
      message:
        "Their automation systems streamlined our processes, improved efficiency, and reduced manual workload significantly while maintaining high accuracy and reliability standards.",
    },
    {
      name: "Kushan Shrivastava",
      role: "CEO, Digiphal Marketing",
      image: review3,
      message:
        "VeloShift delivered robust solutions with smooth integrations, scalable architecture, and reliable performance that helped us optimize and grow our digital ecosystem.",
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