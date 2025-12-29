import GridBackground from "../components/GridBackground";
import AboutSection from "../components/AboutSection";
import CapabilitiesSection from "../components/CapabilitiesSection";
import ToolsSection from "../components/ToolsSection";
import TestimonialsSection from "../components/TestimonialsSection";
import WhyChooseSection from "../components/WhyChooseSection";
import CTASection from "../components/CTASection";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-[var(--vs-bg)]">

      {/* ================================
          HERO SECTION WITH GRID
      ================================= */}
      <div className="relative w-full min-h-screen overflow-hidden bg-[var(--vs-bg)]">
        
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid opacity-40"></div>

        {/* HERO CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-start text-center px-6 min-h-screen pt-20 md:pt-32 pb-24 md:pb-32">

          {/* HERO TITLE */}
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-[var(--vs-light)]">
            Engineering the Future.
            <br />
            Empowering Businesses With
            <br />
            <span className="bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                             bg-clip-text text-transparent">
              Intelligent Tech Solutions.
            </span>
          </h1>

          {/* SUBTEXT */}
          <p className="mt-6 text-lg text-[var(--vs-light)]/80 max-w-3xl mx-auto">
            Veloshift provides end-to-end digital solutions including web & app 
            development, AI chatbots, workflow automation, machine learning, 
            cloud deployments, API integrations, and enterprise-grade consulting.
          </p>

          {/* BADGES */}
          <div className="mt-10 flex flex-wrap justify-center gap-4 md:gap-6">

            <div className="px-4 py-2 rounded-full text-[var(--vs-light)] text-sm md:text-base
                            bg-white/5 border border-white/10 backdrop-blur
                            animate-[pulse_3s_ease-in-out_infinite]">
              🚀 End-to-End Development
            </div>

            <div className="px-4 py-2 rounded-full text-[var(--vs-light)] text-sm md:text-base
                            bg-white/5 border border-white/10 backdrop-blur
                            animate-[pulse_4s_ease-in-out_infinite]">
              🤖 AI & Automation Solutions
            </div>

            <div className="px-4 py-2 rounded-full text-[var(--vs-light)] text-sm md:text-base
                            bg-white/5 border border-white/10 backdrop-blur
                            animate-[pulse_5s_ease-in-out_infinite]">
              ☁️ Cloud Engineering & DevOps
            </div>

            <div className="px-4 py-2 rounded-full text-[var(--vs-light)] text-sm md:text-base
                            bg-white/5 border border-white/10 backdrop-blur
                            animate-[pulse_6s_ease-in-out_infinite]">
              🔌 API & System Integrations
            </div>
          </div>

          {/* CTA BUTTON */}
          <Link
            to="/services"
            className="mt-12 inline-block px-8 py-3 rounded-md text-lg font-semibold text-white shadow
                       bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                       hover:opacity-90 transition"
          >
            Explore Services
          </Link>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <AboutSection />

      {/* ================================
          CAPABILITIES SECTION
      ================================= */}
      <div className="relative w-full py-2">
        <div className="absolute inset-0 bg-grid opacity-40 pointer-events-none"></div>
        <div className="relative z-10 bg-transparent">
          <CapabilitiesSection />
        </div>
      </div>

      {/* TOOLS & TECHNOLOGIES */}
      <ToolsSection />

      {/* WHY CHOOSE SECTION */}
      <WhyChooseSection />

      {/* TESTIMONIALS SECTION */}
      <TestimonialsSection />

      {/* CTA SECTION */}
      <CTASection />
    </div>
  );
}
