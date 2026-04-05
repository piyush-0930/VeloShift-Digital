import AboutSection from "../components/AboutSection";
import missionImg from "../assets/mission.jpg";

export default function About() {
  return (
    <div className="w-full bg-[var(--vs-bg)] text-[var(--vs-light)]">

      {/* ABOUT TOP */}
      <AboutSection />

      <Divider />

      {/* 🔥 MISSION + VISION + VALUES */}
      <section className="py-20 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-stretch">

        {/* LEFT IMAGE */}
        <div className="flex">
          <img
            src={missionImg}
            alt="Mission"
            className="w-full max-w-md md:max-w-lg object-cover rounded-2xl shadow-xl"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col justify-center">
          <h2 className="text-4xl md:text-5xl font-extrabold text-white leading-tight">
            Building the Future of{" "}
            <span className="text-[var(--vs-secondary)]">
              Digital Bharat
            </span>
          </h2>

          <p className="mt-6 text-[var(--vs-light)]/80 text-lg leading-relaxed">
            At VeloShift, our mission is to empower businesses through intelligent,
            scalable, and automation-driven solutions that accelerate growth and
            efficiency in the digital era.
          </p>

          <p className="mt-4 text-[var(--vs-light)]/70 leading-relaxed">
            Our vision is to become a global technology leader rooted in India,
            driving innovation across AI, cloud, and next-generation systems while
            contributing to the digital transformation of Bharat.
          </p>

          <p className="mt-4 text-[var(--vs-light)]/70 leading-relaxed">
            We believe in building with purpose — focusing on innovation, reliability,
            and long-term value creation. Our goal is not just to deliver solutions,
            but to shape the future of businesses in a rapidly evolving digital ecosystem.
          </p>
        </div>

      </section>

    </div>
  );
}

/* COMPONENTS */

function Divider() {
  return (
    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>
  );
}