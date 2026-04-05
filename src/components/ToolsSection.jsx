import { motion } from "framer-motion";
import { Code, Cloud, Database, Brain } from "lucide-react";

export default function ToolsSection() {
  const categories = [
    {
      title: "Development",
      icon: <Code size={20} />,
      color: "from-blue-500/20 to-blue-500/5 border-blue-500/20",
      tools: [
        { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
        { name: "Next.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
        { name: "Node.js", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
        { name: "Express", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: <Cloud size={20} />,
      color: "from-orange-500/20 to-orange-500/5 border-orange-500/20",
      tools: [
        { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
        { name: "Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
        { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
        { name: "Kubernetes", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
      ],
    },
    {
      title: "Databases & Integrations",
      icon: <Database size={20} />,
      color: "from-green-500/20 to-green-500/5 border-green-500/20",
      tools: [
        { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
        { name: "Firebase", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
        { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
        { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      ],
    },
    {
      title: "AI & Machine Learning",
      icon: <Brain size={20} />,
      color: "from-purple-500/20 to-purple-500/5 border-purple-500/20",
      tools: [
        { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
        { name: "TensorFlow", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
        { name: "PyTorch", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/pytorch/pytorch-original.svg" },
        { name: "OpenCV", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/opencv/opencv-original.svg" },
      ],
    },
  ];

  return (
    <section className="w-full py-24 px-6 text-center bg-[var(--vs-bg)]">

      {/* UPDATED TITLE */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-white">
        Technologies & <span className="text-[var(--vs-secondary)]">Tools We Work With</span>
      </h2>

      <div className="h-1 w-32 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] mx-auto mt-4 rounded-full shadow-[0_0_18px_var(--vs-primary)]"></div>

      {/* GRID */}
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">

        {categories.map((category, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className={`bg-gradient-to-br ${category.color} backdrop-blur-md border rounded-xl p-6
            hover:scale-[1.03] hover:shadow-xl transition-all duration-300`}
          >
            {/* HEADER */}
            <div className="flex items-center justify-center gap-2 mb-5 text-white font-semibold">
              {category.icon}
              {category.title}
            </div>

            {/* TOOLS */}
            <div className="grid grid-cols-2 gap-4">

              {category.tools.map((tool, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center gap-2 p-3 rounded-lg
                  bg-white/5 hover:bg-white/10 transition"
                >
                  <img
                    src={tool.logo}
                    alt={tool.name}
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-xs text-white/80">
                    {tool.name}
                  </span>
                </div>
              ))}

            </div>
          </motion.div>
        ))}

      </div>
    </section>
  );
}