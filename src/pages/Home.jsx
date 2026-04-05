import { useEffect, useState } from "react";
import ToolsSection from "../components/ToolsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import WhyChooseSection from "../components/WhyChooseSection";
import CTASection from "../components/CTASection";
import { Link } from "react-router-dom";
import { Target, Award, Users, Globe } from "lucide-react";

export default function Home() {

  const useCounter = (end, duration = 1500) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      let start = 0;
      const increment = end / (duration / 16);

      const counter = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(counter);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(counter);
    }, [end, duration]);

    return count;
  };

  const projects = useCounter(10);
  const years = useCounter(5);
  const retention = useCounter(96);

  return (
    <div className="w-full min-h-screen bg-[var(--vs-bg)]">

      {/* HERO */}
      <div className="relative w-full min-h-screen overflow-hidden bg-[var(--vs-bg)]">
        
        <div className="absolute inset-0 bg-grid opacity-40"></div>

        <div className="relative z-10 flex flex-col items-center justify-start text-center px-6 min-h-screen pt-20 md:pt-32 pb-12 md:pb-16">

          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[var(--vs-light)]">
            Engineering Digital Growth with
            <br />
            <span className="bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
              bg-clip-text text-transparent">
              AI, Cloud & Scalable Tech
            </span>
          </h1>

          <p className="mt-6 text-lg text-[var(--vs-light)]/80 max-w-3xl mx-auto">
            We build high-performance digital products — from web & mobile apps to 
            AI automation, cloud infrastructure, and enterprise integrations — 
            designed to scale your business faster.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="px-8 py-3 rounded-md text-lg font-semibold text-white shadow
              bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
              hover:opacity-90 transition"
            >
              Talk to Experts
            </Link>

            <Link
              to="/services"
              className="px-8 py-3 rounded-md text-lg font-semibold text-[var(--vs-light)]
              border border-white/20 hover:bg-white/10 transition backdrop-blur"
            >
              Explore Services
            </Link>
          </div>

          {/* STATS */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-4xl">

            <div className="text-center">
              <Target className="mx-auto mb-2 text-[#38A7F0]" size={22} />
              <p className="text-2xl md:text-3xl font-bold text-[var(--vs-light)]">
                {projects}+
              </p>
              <p className="text-sm text-[var(--vs-light)]/70 mt-1">
                Projects Delivered
              </p>
            </div>

            <div className="text-center">
              <Award className="mx-auto mb-2 text-[#38A7F0]" size={22} />
              <p className="text-2xl md:text-3xl font-bold text-[var(--vs-light)]">
                {years}+
              </p>
              <p className="text-sm text-[var(--vs-light)]/70 mt-1">
                Years Experience
              </p>
            </div>

            <div className="text-center">
              <Users className="mx-auto mb-2 text-[#38A7F0]" size={22} />
              <p className="text-2xl md:text-3xl font-bold text-[var(--vs-light)]">
                {retention}%
              </p>
              <p className="text-sm text-[var(--vs-light)]/70 mt-1">
                Client Retention
              </p>
            </div>

            <div className="text-center">
              <Globe className="mx-auto mb-2 text-[#38A7F0]" size={22} />
              <p className="text-2xl md:text-3xl font-bold text-[var(--vs-light)]">
                Global
              </p>
              <p className="text-sm text-[var(--vs-light)]/70 mt-1">
                Reach
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* 🔥 DIRECT FLOW AFTER HERO (NO GAP) */}
      <div className="relative w-full -mt-6 md:-mt-10">
        <ToolsSection />
      </div>

      {/* WHY */}
      <WhyChooseSection />

      {/* TESTIMONIALS */}
      <TestimonialsSection />

      {/* CTA */}
      <CTASection />
    </div>
  );
}