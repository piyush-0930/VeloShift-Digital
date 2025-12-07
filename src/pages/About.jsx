import { useEffect } from "react";
import msme from "../assets/msme.png";
import startupindia from "../assets/startupindia.png";
import cutbi from "../assets/cutbi.png";
import google from "../assets/google.png";

export default function About() {
  useEffect(() => {
    const timelineLine = document.getElementById("timeline-line");

    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) timelineLine.classList.add("grow");
        }),
      { threshold: 0.2 }
    );

    if (timelineLine) observer.observe(timelineLine);
  }, []);

  const milestones = [
    {
      year: "2019",
      title: "First International Project",
      desc: "Delivered a complex engineering design for a German client.",
      icon: "🌍",
    },
    {
      year: "2021",
      title: "ISO 9001:2015 Certified",
      desc: "Recognized for excellence in quality management.",
      icon: "🏅",
    },
    {
      year: "2023",
      title: "AI Automation Launch",
      desc: "Introduced intelligent automation frameworks for enterprise clients.",
      icon: "🤖",
    },
    {
      year: "2024",
      title: "Global Expansion",
      desc: "Opened new innovation centers across India.",
      icon: "🚀",
    },
  ];

  return (
    <div className="w-full bg-[var(--vs-bg)] text-[var(--vs-light)]">

      {/* HERO */}
      <section className="w-full py-20 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          About{" "}
          <span className="bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
            bg-clip-text text-transparent">
            Veloshift Co
          </span>
        </h1>

        <p className="mt-4 max-w-3xl mx-auto text-lg text-[var(--vs-light)]/75">
          Veloshift Co is a modern engineering, automation, and AI-driven solutions company
          empowering industries with intelligence, innovation, and precision.
        </p>
      </section>

      <Divider />

      {/* MISSION & VISION */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <h2 className="section-heading">
          Mission & <span className="highlight">Vision</span>
        </h2>

        <Underline center />

        <p className="mt-8 text-[var(--vs-light)]/80 text-lg leading-relaxed">
          Our mission and vision reflect a unified commitment — creating intelligent, scalable,
          and forward-thinking engineering solutions while becoming a global leader in digital
          innovation through automation, cloud systems, and AI-driven engineering excellence.
        </p>
      </section>

      <Divider />

      {/* CORE VALUES */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="section-heading">
          Our Core <span className="highlight">Values</span>
        </h2>
        <Underline center />

        <div className="mt-14 grid sm:grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { icon: "💎", title: "Integrity", desc: "We operate with transparency and honesty." },
            { icon: "⚙️", title: "Innovation", desc: "We build smarter and future-ready solutions." },
            { icon: "🏆", title: "Excellence", desc: "Quality and precision in every outcome." },
            { icon: "🤝", title: "Collaboration", desc: "Success grows through strong partnerships." },
          ].map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-xl"
            >
              <div className="text-4xl mb-3">{item.icon}</div>
              <h3 className="text-xl font-bold text-white">{item.title}</h3>
              <p className="mt-3 text-[var(--vs-light)]/75">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* TIMELINE */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="section-heading text-center">
          Milestones & <span className="highlight">Achievements</span>
        </h2>

        <Underline center />

        {/* DESKTOP WITH LINE ANIMATION */}
        <div className="relative mt-14 hidden md:block">
          {/* Animated vertical line */}
          <div
            id="timeline-line"
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] h-full 
                       bg-gradient-to-b from-[var(--vs-primary)] to-[var(--vs-secondary)]
                       origin-top scale-y-0 transition-transform duration-[1500ms] ease-out"
          ></div>

          {milestones.map((m, i) => (
            <div key={i} className="relative w-full mb-16 flex items-start">

              {/* Static dot */}
              <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1 w-5 h-5">
                <div className="timeline-dot" />
              </div>

              {/* Card */}
              <div
                className={`timeline-card rounded-xl p-6 w-full md:w-[45%] 
                            ${i % 2 === 0 ? "md:mr-auto" : "md:ml-auto"}`}
              >
                <div className="flex items-center gap-3 text-[var(--vs-secondary)] font-bold text-lg">
                  <span className="text-2xl">{m.icon}</span> {m.year}
                </div>

                <h3 className="mt-2 text-lg font-bold text-white">{m.title}</h3>
                <p className="mt-1 text-[var(--vs-light)]/75">{m.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* MOBILE — SIMPLE CARDS ONLY */}
        <div className="mt-10 space-y-8 md:hidden">
          {milestones.map((m, i) => (
            <div
              key={i}
              className="p-5 rounded-xl bg-[#121b36]/50 backdrop-blur-xl border border-white/10 shadow-lg"
            >
              <div className="flex items-center gap-3 text-[var(--vs-secondary)] font-bold text-lg">
                <span className="text-2xl">{m.icon}</span> {m.year}
              </div>

              <h3 className="mt-2 text-lg font-bold text-white">{m.title}</h3>
              <p className="mt-1 text-[var(--vs-light)]/75">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* CERTIFICATIONS */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="section-heading">
          Certifications & <span className="highlight">Recognitions</span>
        </h2>

        <Underline center />

        <p className="mt-4 text-[var(--vs-light)]/70 max-w-2xl mx-auto">
          Certified and recognized by national and institutional bodies for innovation and excellence.
        </p>

        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-14 items-center justify-center">
          {[msme, startupindia, cutbi, google].map((logo, i) => (
            <img
              key={i}
              src={logo}
              className="w-28 h-28 object-contain mx-auto opacity-90"
            />
          ))}
        </div>
      </section>

      <Divider />

      {/* SUSTAINABILITY */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="section-heading text-center">
          Sustainability & <span className="highlight">Social Impact</span>
        </h2>

        <Underline center />

        <div className="mt-12 grid md:grid-cols-2 gap-12">
          {[
            { title: "Sustainability", desc: "Green engineering practices.", value: 75 },
            { title: "Education", desc: "Training academy & internships.", value: 90 },
            { title: "Community", desc: "Volunteering & local initiatives.", value: 60 },
            { title: "Ethical Business", desc: "High transparency standards.", value: 95 },
          ].map((s, i) => (
            <div key={i}>
              <h3 className="text-xl font-bold text-white">{s.title}</h3>
              <p className="text-[var(--vs-light)]/75 mt-1 mb-3">{s.desc}</p>

              <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]"
                  style={{ width: `${s.value}%` }}
                />
              </div>

              <p className="text-[var(--vs-secondary)] font-bold mt-1">{s.value}% Complete</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section className="py-16 text-center px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-white">
          Ready to Transform Your Business?
        </h2>

        <p className="mt-3 text-[var(--vs-light)]/80 max-w-2xl mx-auto">
          Let’s collaborate and build intelligent, scalable, and future-ready systems.
        </p>

        <a
          href="/contact"
          className="mt-6 inline-block px-10 py-3 rounded-md text-lg font-semibold text-white
                     bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                     hover:opacity-90 transition"
        >
          Contact Us
        </a>
      </section>

      {/* ONLY TIMELINE LINE ANIMATION */}
      <style>{`
        .highlight { color: var(--vs-secondary); }
        .section-heading { font-size: 2rem; font-weight: 800; color: white; }
        @media (min-width: 768px) { .section-heading { font-size: 3rem; } }

        /* ONLY animation in entire page */
        #timeline-line { transform: scaleY(0); }
        #timeline-line.grow { transform: scaleY(1); }

        @media (prefers-reduced-motion: reduce) {
          #timeline-line { transform: scaleY(1) !important; }
        }
      `}</style>
    </div>
  );
}

/* SMALL COMPONENTS */
function Divider() {
  return (
    <div className="h-[1px] w-full bg-gradient-to-r 
    from-transparent via-white/10 to-transparent my-6 md:my-10"></div>
  );
}

function Underline({ center = false }) {
  return (
    <div
      className={`h-1 w-24 ${center ? "mx-auto" : ""} mt-3 
      bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] rounded-full`}
    ></div>
  );
}
