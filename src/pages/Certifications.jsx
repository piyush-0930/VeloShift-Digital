import { useEffect, useState } from "react";
import msme from "../assets/msme.png";
import startupindia from "../assets/startupindia.png";
import cutbi from "../assets/cutbi.png";
import google from "../assets/google.jpg";

export default function Certifications() {
  const certifications = [
    { img: msme, title: "MSME Registered" },
    { img: startupindia, title: "Startup India Registered" },
    { img: cutbi, title: "CU-TBI Incubated" },
    { img: google, title: "Google Search Rankings" },
  ];

  return (
    <div className="w-full bg-[var(--vs-bg)] text-white">

      {/* TOP SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">

        {/* LEFT IMAGE */}
        <div className="flex justify-center">
          <div className="bg-white/5 border border-white/10 p-10 rounded-3xl shadow-2xl">
            <img src={cutbi} className="w-80 md:w-96 object-contain" />
          </div>
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <h1 className="text-5xl font-extrabold leading-tight">
            Certified & <span className="text-[var(--vs-secondary)]">Trusted</span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg leading-relaxed">
            VeloShift Co. is officially recognized by CU-TBI, MSME, and Startup India,
            showcasing our credibility in delivering advanced AI, automation, and
            scalable digital solutions.
          </p>

          <p className="mt-4 text-gray-500 text-sm leading-relaxed">
            These recognitions validate our commitment to fostering innovation, performance,
            and long-term impact in the tech ecosystem.
          </p>
        </div>

      </section>

      {/* LOGOS + LABELS (CARDS) */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          {certifications.map((cert, i) => (
            <div
              key={i}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 
                         hover:bg-white/10 hover:shadow-xl transition group"
            >
              <img
                src={cert.img}
                className="h-16 mx-auto object-contain grayscale group-hover:grayscale-0 transition"
              />
              <p className="mt-4 text-sm text-gray-400 group-hover:text-white transition">
                {cert.title}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* IMPACT SECTION */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">

        <h2 className="text-4xl font-bold">
          Our <span className="text-[var(--vs-secondary)]">Impact</span>
        </h2>

        <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
          Delivering measurable results through innovation and scalable solutions.
        </p>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10">

          <ImpactItem end={120} suffix="+" label="Businesses Transformed" />
          <ImpactItem end={85} suffix="+" label="AI Systems Deployed" />
          <ImpactItem end={94} suffix="%" label="Automation Success Rate" />
          <ImpactItem end={97} suffix="%" label="Client Satisfaction" />

        </div>

      </section>

    </div>
  );
}

/* COUNTER */
function Counter({ end, suffix = "" }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

/* IMPACT ITEM */
function ImpactItem({ end, suffix, label }) {
  return (
    <div>
      <h3 className="text-5xl font-extrabold text-[var(--vs-secondary)]">
        <Counter end={end} suffix={suffix} />
      </h3>
      <p className="mt-3 text-gray-400 text-sm">{label}</p>
    </div>
  );
}