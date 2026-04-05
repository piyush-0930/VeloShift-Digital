import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    category: "Work & Location",
    icon: "ri-map-pin-line",
    question: "Do you offer remote or hybrid work options?",
    answer:
      "Absolutely. Most of our roles are fully remote or hybrid-friendly. Specific location requirements (if any) are mentioned in each job listing. We believe great work happens wherever you're most productive.",
  },
  {
    category: "Work & Location",
    icon: "ri-time-line",
    question: "What does a typical workday look like at Veloshift?",
    answer:
      "We follow async-first communication with a couple of syncs per week. You'll have deep work blocks, collaborate on live projects, and ship real features — not just internal tools. We value outcomes over hours.",
  },
  {
    category: "Hiring",
    icon: "ri-user-add-line",
    question: "Do you hire freshers or entry-level candidates?",
    answer:
      "Yes — we actively hire 0–2 year candidates across engineering, design, and AI roles. We care more about your curiosity, portfolio, and problem-solving approach than years of experience.",
  },
  {
    category: "Hiring",
    icon: "ri-timer-line",
    question: "How long does the hiring process typically take?",
    answer:
      "Our process usually wraps up in 1–2 weeks: application review → screening call → technical task → final interview. We keep it lean and always communicate timelines clearly.",
  },
  {
    category: "Tech & Growth",
    icon: "ri-stack-line",
    question: "What tech stack does Veloshift work with?",
    answer:
      "Our core stack includes React, Node.js, Python, MongoDB, and PostgreSQL on the frontend/backend. For infrastructure, we use AWS and Docker with CI/CD pipelines. AI work involves LLMs, vector databases, and various AI APIs.",
  },
  {
    category: "Tech & Growth",
    icon: "ri-graduation-cap-line",
    question: "Is there support for learning and upskilling?",
    answer:
      "Yes. We offer mentorship from senior engineers, access to paid courses and certifications (AWS, AI/ML, and more), internal knowledge-sharing sessions, and dedicated time for R&D exploration.",
  },
  {
    category: "Compensation",
    icon: "ri-money-rupee-circle-line",
    question: "What does the compensation and growth structure look like?",
    answer:
      "We offer competitive, market-aligned pay with structured review cycles every 6 months. High performers are recognised early. Internships come with stipends and a clear pathway to full-time offers.",
  },
  {
    category: "Culture",
    icon: "ri-heart-line",
    question: "How would you describe Veloshift's work culture?",
    answer:
      "We're a small, tight-knit team that moves fast without burning out. You'll have real ownership, minimal bureaucracy, and direct impact on products used by clients. We celebrate wins, learn from failures, and support each other.",
  },
];

const categories = [...new Set(faqData.map((f) => f.category))];

const categoryColors = {
  "Work & Location": "from-blue-500 to-indigo-600",
  Hiring: "from-purple-500 to-violet-600",
  "Tech & Growth": "from-cyan-500 to-teal-600",
  Compensation: "from-emerald-500 to-green-600",
  Culture: "from-pink-500 to-rose-600",
};

const categoryBadge = {
  "Work & Location": "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Hiring: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Tech & Growth": "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  Compensation: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Culture: "bg-pink-500/10 text-pink-400 border-pink-500/20",
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? faqData
      : faqData.filter((f) => f.category === activeCategory);

  return (
    <section className="py-20 px-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-[var(--vs-secondary)]/10 text-[var(--vs-secondary)] border border-[var(--vs-secondary)]/20 mb-4">
          Got Questions?
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
          Frequently Asked{" "}
          <span className="bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] bg-clip-text text-transparent">
            Questions
          </span>
        </h2>
        <p className="mt-3 text-[var(--vs-light)]/60 max-w-xl mx-auto">
          Everything you need to know before applying to Veloshift.
        </p>
      </div>

      {/* Category Filter Pills */}
      <div className="flex flex-wrap justify-center gap-3 mt-10">
        {["All", ...categories].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setOpenIndex(null);
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 ${
              activeCategory === cat
                ? "bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] text-white border-transparent shadow-lg shadow-[var(--vs-primary)]/20"
                : "bg-white/5 text-[var(--vs-light)]/60 border-white/10 hover:bg-white/10 hover:text-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* FAQ Items */}
      <div className="mt-10 max-w-3xl mx-auto space-y-3">
        {filtered.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? "bg-[#121b36] border-[var(--vs-secondary)]/30 shadow-lg shadow-[var(--vs-secondary)]/5"
                  : "bg-[#0d152b]/60 border-white/8 hover:border-white/20"
              }`}
            >
              <button
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex items-center justify-between w-full text-left px-6 py-5 gap-4"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div
                    className={`shrink-0 w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br ${categoryColors[faq.category]} bg-opacity-10`}
                  >
                    <i className={`${faq.icon} text-white text-base`}></i>
                  </div>

                  <div className="min-w-0">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold tracking-wide uppercase border mb-1 ${categoryBadge[faq.category]}`}
                    >
                      {faq.category}
                    </span>
                    <p className="font-semibold text-white text-sm md:text-base leading-snug">
                      {faq.question}
                    </p>
                  </div>
                </div>

                <div
                  className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center border transition-all duration-300 ${
                    isOpen
                      ? "bg-[var(--vs-secondary)] border-[var(--vs-secondary)] rotate-180"
                      : "bg-white/5 border-white/10"
                  }`}
                >
                  <ChevronDown className="w-4 h-4 text-white" />
                </div>
              </button>

              <div
                className={`transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                } overflow-hidden`}
              >
                <p className="px-6 pb-5 pl-[72px] text-[var(--vs-light)]/70 text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom CTA */}
      <div className="mt-14 text-center">
        <p className="text-[var(--vs-light)]/50 text-sm">
          Still have questions?{" "}
          <a
            href="mailto:hr.veloshift@gmail.com"
            className="text-[var(--vs-secondary)] hover:underline font-medium"
          >
            Email our team →
          </a>
        </p>
      </div>
    </section>
  );
}