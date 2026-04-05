import { motion } from "framer-motion";
import {
  Code,
  Brain,
  ShieldCheck,
  Layers,
  Zap,
  Headphones,
} from "lucide-react";

export default function WhyChooseSection() {
  const features = [
    {
      title: "Expert Engineering",
      desc: "Experienced developers building scalable web platforms, mobile apps, and high-performance digital systems.",
      icon: <Code size={22} />,
      color: "from-green-500/20 to-green-500/5 border-green-500/20",
    },
    {
      title: "AI-Driven Solutions",
      desc: "Advanced AI systems, automation workflows, and intelligent models that enhances decision-making.",
      icon: <Brain size={22} />,
      color: "from-orange-500/20 to-orange-500/5 border-orange-500/20",
    },
    {
      title: "Secure & Reliable",
      desc: "Built with strong security practices, robust architecture, and reliable delivery trusted by modern businesses.",
      icon: <ShieldCheck size={22} />,
      color: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
    },
    {
      title: "End-to-End Delivery",
      desc: "From idea to deployment — web, mobile, AI, cloud, DevOps, and integrations all handled seamlessly.",
      icon: <Layers size={22} />,
      color: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
    },
    {
      title: "Innovation First",
      desc: "Leveraging modern technologies like AI, cloud, and automation to build future-ready digital products.",
      icon: <Zap size={22} />,
      color: "from-teal-500/20 to-teal-500/5 border-teal-500/20",
    },
    {
      title: "Dedicated Support",
      desc: "Transparent communication, fast delivery cycles, and long-term technical support for scaling your business.",
      icon: <Headphones size={22} />,
      color: "from-yellow-500/20 to-yellow-500/5 border-yellow-500/20",
    },
  ];

  return (
    <section className="relative w-full py-24 text-center px-6 overflow-hidden">

      {/* GRID BG */}
      <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none"></div>

      <div className="relative z-10">

        {/* TITLE */}
        <h2 className="text-3xl md:text-5xl font-extrabold text-white">
          Why Choose{" "}
          <span className="text-[var(--vs-secondary)]">Veloshift Technology</span>
        </h2>

        <div className="h-1 w-28 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
        mx-auto mt-4 rounded-full shadow-[0_0_15px_var(--vs-primary)]"></div>

        {/* GRID */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">

          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className={`bg-gradient-to-br ${item.color} border rounded-xl p-6
              backdrop-blur-md hover:scale-[1.03] hover:shadow-xl transition-all duration-300`}
            >
              {/* ICON */}
              <div className="flex justify-center mb-4 text-white">
                {item.icon}
              </div>

              {/* TITLE */}
              <h3 className="text-lg font-semibold text-white">
                {item.title}
              </h3>

              {/* DESC */}
              <p className="text-[var(--vs-light)]/80 mt-3 leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}