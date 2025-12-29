import AboutSection from "../components/AboutSection";
import msme from "../assets/msme.png";
import startupindia from "../assets/startupindia.png";
import cutbi from "../assets/cutbi.png";
import google from "../assets/google.jpg";

export default function About() {
  const impact = [
    { title: "Businesses Transformed", value: "120+" },
    { title: "AI Systems Deployed", value: "85+" },
    { title: "Automation Success Rate", value: "94%" },
    { title: "Client Satisfaction", value: "97%" },
  ];

  const journey = [
    {
      year: "2024",
      icon: "💡",
      title: "Ideation & Concept Development",
      desc: "Initiated strategic planning and brainstorming for future global operations and tech-driven solutions.",
    },
    {
      year: "2025",
      icon: "📄",
      title: "MSME & Startup India Registered",
      desc: "Officially registered under MSME and Startup India in October 2025.",
    },
    {
      year: "2026",
      icon: "🚀",
      title: "Operational Expansion",
      desc: "Scaled company operations with new services, experienced team and improved global capabilities.",
    },
  ];

  return (
    <div className="w-full bg-[var(--vs-bg)] text-[var(--vs-light)]">

      {/* ABOUT TOP */}
      <AboutSection />

      <Divider />

      {/* MISSION & VISION */}
      <section className="py-8 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Our <span className="text-[var(--vs-secondary)]">Mission & Vision</span>
        </h2>
        <Underline center />

        <p className="mt-5 text-[var(--vs-light)]/80 text-lg leading-relaxed max-w-3xl mx-auto">
          Our mission is to build intelligent, scalable and automation-powered systems
          that transform businesses. Our vision is to become a global leader in AI,
          automation, cloud solutions and next-gen engineering.
        </p>
      </section>

      <Divider />

      {/* IMPACT */}
      <section className="py-8 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Our <span className="text-[var(--vs-secondary)]">Impact</span>
        </h2>
        <Underline center />

        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {impact.map((item, index) => (
            <div key={index} className="text-center">
              <h3 className="text-4xl md:text-5xl font-extrabold text-[var(--vs-secondary)]">
                {item.value}
              </h3>
              <p className="mt-2 text-[var(--vs-light)]/75">{item.title}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* JOURNEY */}
      <section className="py-8 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Our <span className="text-[var(--vs-secondary)]">Journey</span>
        </h2>
        <Underline center />

        <div className="mt-10 overflow-x-auto pb-4">
          <div className="flex gap-12 min-w-max px-4">
            {journey.map((item, i) => (
              <div
                key={i}
                className="bg-[#0F1A30]/60 border border-white/10 rounded-2xl 
                           p-7 w-80 shrink-0 shadow-xl hover:scale-[1.04] transition"
              >
                <div className="text-5xl">{item.icon}</div>

                <h3 className="text-2xl font-bold text-white mt-3">{item.year}</h3>

                <p className="mt-2 text-[var(--vs-secondary)] font-semibold text-lg">
                  {item.title}
                </p>

                <p className="mt-2 text-[var(--vs-light)]/70 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Divider />

      {/* CERTIFICATIONS */}
      <section className="py-8 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Certifications & <span className="text-[var(--vs-secondary)]">Recognitions</span>
        </h2>

        <Underline center />

        <p className="mt-3 text-[var(--vs-light)]/75 max-w-2xl mx-auto">
          Officially recognized and certified by national and institutional bodies.
        </p>

        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-6 place-items-center">
          <CertItem img={msme} title="MSME Registered" />
          <CertItem img={startupindia} title="Startup India" />
          <CertItem img={cutbi} title="CU-TBI Incubated" />
          <CertItem img={google} title="Search Engine Visibility" />
        </div>
      </section>

      {/* ❌ Removed the LAST <Divider /> to fix the white gap */}
    </div>
  );
}

/* COMPONENTS */

function CertItem({ img, title }) {
  return (
    <div className="bg-[#0F1A30]/60 border border-white/10 p-5 
                    rounded-2xl shadow-md text-center 
                    hover:scale-[1.03] transition w-full">
      <img src={img} className="w-32 h-32 mx-auto object-contain" />
      <p className="mt-3 text-[var(--vs-light)]/80 font-medium">{title}</p>
    </div>
  );
}

function Divider() {
  return (
    <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-6"></div>
  );
}

function Underline({ center }) {
  return (
    <div
      className={`h-1 w-20 ${center ? "mx-auto" : ""} mt-3 
      bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] rounded-full`}
    />
  );
}
