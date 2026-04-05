import {
  Laptop,
  CreditCard,
  Hospital,
  ShoppingCart,
  Building,
  Truck,
} from "lucide-react";

export default function Portfolio() {
  const projects = [
    {
      title: "SaaS Platform & AI Dashboard",
      desc: "Scalable SaaS with AI copilots, automation and analytics.",
      img: "/projects/saas.jpg",
    },
    {
      title: "FinTech Payment System",
      desc: "Secure payments with fraud detection & real-time APIs.",
      img: "/projects/fintech.jpg",
    },
    {
      title: "Healthcare Automation",
      desc: "Telemedicine + AI diagnostics + EHR systems.",
      img: "/projects/healthcare.jpg",
    },
  ];

  const industries = [
    { title: "Technology & SaaS", icon: <Laptop size={28} /> },
    { title: "FinTech", icon: <CreditCard size={28} /> },
    { title: "Healthcare", icon: <Hospital size={28} /> },
    { title: "E-commerce", icon: <ShoppingCart size={28} /> },
    { title: "Real Estate", icon: <Building size={28} /> },
    { title: "Logistics", icon: <Truck size={28} /> },
  ];

  const clients = [
    "/clients/client1.png",
    "/clients/client2.png",
    "/clients/client3.png",
    "/clients/client4.png",
  ];

  return (
    <div className="w-full bg-[var(--vs-bg)] text-white">

      {/* ================================
          HERO
      ================================= */}
      <div className="py-24 text-center">
        <h1 className="text-5xl font-extrabold">
          Our <span className="text-[var(--vs-secondary)]">Work</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-gray-400 text-lg">
          Delivering scalable digital solutions across industries with AI, cloud and automation.
        </p>
      </div>

      {/* ================================
          PROJECTS
      ================================= */}
      <section className="px-6 max-w-7xl mx-auto pb-20">

        <h2 className="text-3xl font-bold text-center mb-14">
          Featured <span className="text-[var(--vs-secondary)]">Projects</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {projects.map((proj, i) => (
            <div
              key={i}
              className="group relative rounded-2xl overflow-hidden border border-white/10"
            >
              {/* IMAGE */}
              <img
                src={proj.img}
                className="w-full h-64 object-cover group-hover:scale-105 transition duration-500"
              />

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition p-6 flex flex-col justify-end">

                <h3 className="text-xl font-bold">{proj.title}</h3>
                <p className="text-sm text-gray-300 mt-2">{proj.desc}</p>

              </div>
            </div>
          ))}

        </div>

      </section>

      {/* ================================
          INDUSTRIES
      ================================= */}
      <section className="py-24 px-6 bg-[#0F1A30]">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-4xl font-bold">
            Industries We <span className="text-[var(--vs-secondary)]">Empower</span>
          </h2>

          <p className="mt-4 text-gray-400">
            Delivering tailored solutions across multiple sectors.
          </p>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-10">

            {industries.map((item, i) => (
              <div
                key={i}
                className="bg-white/5 border border-white/10 rounded-2xl p-8 
                           flex flex-col items-center justify-center 
                           hover:scale-[1.05] hover:shadow-xl transition"
              >
                <div className="text-[var(--vs-secondary)] mb-4">
                  {item.icon}
                </div>

                <p className="text-gray-300 font-medium text-center">
                  {item.title}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* ================================
          PARTNERS & CLIENTS
      ================================= */}
      <section className="py-24 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-4xl font-bold">
            Our <span className="text-[var(--vs-secondary)]">Partners & Clients</span>
          </h2>

          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Trusted by startups, enterprises, and organizations to deliver impactful digital solutions.
          </p>

          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-10 items-center">

            {clients.map((logo, i) => (
              <div
                key={i}
                className="flex items-center justify-center opacity-70 hover:opacity-100 transition"
              >
                <img
                  src={logo}
                  className="h-12 object-contain grayscale hover:grayscale-0 transition"
                />
              </div>
            ))}

          </div>

        </div>

      </section>

    </div>
  );
}