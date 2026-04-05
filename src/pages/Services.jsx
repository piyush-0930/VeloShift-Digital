import { useEffect, useState } from "react";
import {
  Search,
  LayoutDashboard,
  PencilRuler,
  Code2,
  Bug,
  Rocket,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Services() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const targets = [40, 50, 99.9, 97];

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prev) =>
        prev.map((val, i) => {
          const target = targets[i];
          if (val < target) {
            return +(val + target / 50).toFixed(1);
          }
          return target;
        })
      );
    }, 30);

    return () => clearInterval(interval);
  }, []);

  const services = [
    {
      title: "AI & Automation",
      icon: "ri-robot-2-line",
      items: [
        "AI Chatbots & Assistants",
        "Workflow Automation",
        "Machine Learning Systems",
        "Predictive Analytics",
      ],
    },
    {
      title: "Web & App Engineering",
      icon: "ri-code-s-slash-line",
      items: [
        "Full Stack Web Apps",
        "Mobile Applications",
        "Admin Dashboards",
        "Custom Platforms",
      ],
    },
    {
      title: "Cloud & DevOps",
      icon: "ri-cloud-line",
      items: [
        "AWS / Azure / GCP",
        "CI/CD Pipelines",
        "Scalable Infrastructure",
        "Cloud Migration",
      ],
    },
    {
      title: "API & Integrations",
      icon: "ri-link-m",
      items: [
        "Payment Gateways",
        "CRM / ERP Integrations",
        "3rd Party APIs",
        "Automation Pipelines",
      ],
    },
    {
      title: "SaaS & Platforms",
      icon: "ri-stack-line",
      items: [
        "Multi-tenant SaaS",
        "Subscription Systems",
        "Admin Panels",
        "Enterprise Tools",
      ],
    },
    {
      title: "Business Systems",
      icon: "ri-cpu-line",
      items: [
        "Internal Tools",
        "Automation Dashboards",
        "Workflow Engines",
        "Data Systems",
      ],
    },
  ];

  const workflow = [
    {
      title: "Discovery",
      desc: "Understanding requirements, goals, and defining clear project scope.",
      icon: <Search size={28} />,
    },
    {
      title: "Architecture",
      desc: "Designing scalable system architecture and technical foundation.",
      icon: <LayoutDashboard size={28} />,
    },
    {
      title: "Design",
      desc: "Creating modern UI/UX with intuitive and seamless experiences.",
      icon: <PencilRuler size={28} />,
    },
    {
      title: "Development",
      desc: "Building robust frontend, backend, APIs and integrations.",
      icon: <Code2 size={28} />,
    },
    {
      title: "Testing",
      desc: "Ensuring performance, security and reliability with testing.",
      icon: <Bug size={28} />,
    },
    {
      title: "Deployment",
      desc: "Launching and maintaining scalable production systems.",
      icon: <Rocket size={28} />,
    },
  ];

  const comparison = [
    { feature: "Modern Tech Stack", us: true, agency: false, freelancer: false },
    { feature: "Fast Delivery", us: true, agency: false, freelancer: false },
    { feature: "Scalable Systems", us: true, agency: false, freelancer: false },
    { feature: "Long-term Support", us: true, agency: true, freelancer: false },
    { feature: "AI & Automation Expertise", us: true, agency: false, freelancer: false },
  ];

  return (
    <div className="bg-[#0B1220] text-white">

      {/* HERO */}
      <section className="py-24 text-center px-6">
        <h1 className="text-5xl font-extrabold">
          Our{" "}
          <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
            Services
          </span>
        </h1>
        <p className="max-w-2xl mx-auto mt-6 text-gray-300">
          High-performance digital solutions powered by AI, cloud, and scalable engineering.
        </p>
      </section>

      {/* SERVICES */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((srv, i) => (
            <div
              key={i}
              className="bg-[#121b36] border border-white/10 p-8 rounded-2xl 
                         hover:scale-105 transition duration-300 group 
                         shadow-lg hover:shadow-indigo-500/10 flex flex-col justify-between"
            >
              <div>
                <div className="text-4xl text-indigo-400 mb-4 group-hover:rotate-6 transition">
                  <i className={srv.icon}></i>
                </div>

                <h3 className="text-xl font-bold mb-4">{srv.title}</h3>

                <ul className="space-y-2 text-gray-300 mb-6">
                  {srv.items.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>

              {/* CTA BUTTON */}
              <Link
                to="/contact"
                className="mt-auto inline-block text-center px-5 py-2 rounded-lg 
                           bg-gradient-to-r from-indigo-500 to-purple-500 
                           text-sm font-semibold hover:opacity-90 transition"
              >
                Get Quote
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON (NO BOX FEEL) */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <h2 className="text-4xl font-extrabold text-center mb-12">
          Why We Stand Out
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-left">

            <thead className="text-gray-400 border-b border-white/10">
              <tr>
                <th className="px-6 py-4">Feature</th>
                <th className="px-6 py-4">Veloshift</th>
                <th className="px-6 py-4">Agencies</th>
                <th className="px-6 py-4">Freelancers</th>
              </tr>
            </thead>

            <tbody>
              {comparison.map((row, i) => (
                <tr key={i} className="border-b border-white/5">
                  <td className="px-6 py-5 font-medium">{row.feature}</td>

                  {[row.us, row.agency, row.freelancer].map((val, idx) => (
                    <td key={idx} className="px-6 py-5">
                      {val ? (
                        <CheckCircle className="text-green-400" />
                      ) : (
                        <XCircle className="text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </section>

      {/* WORKFLOW */}
      <section className="max-w-7xl mx-auto px-6 pb-28">
        <h2 className="text-4xl font-extrabold text-center mb-16">
          Our Proven Workflow
        </h2>

        <div className="grid md:grid-cols-3 gap-10">
          {workflow.map((step, i) => (
            <div
              key={i}
              className="relative group bg-[#121b36]/80 backdrop-blur-lg border border-white/10 
                         rounded-2xl p-8 transition duration-300 
                         hover:-translate-y-2 hover:border-indigo-400/40 
                         hover:shadow-xl hover:shadow-indigo-500/10"
            >
              <div className="absolute top-4 right-6 text-6xl font-extrabold text-white/5">
                0{i + 1}
              </div>

              <div className="text-indigo-400 mb-4">
                {step.icon}
              </div>

              <h3 className="text-lg font-semibold mb-2">
                {step.title}
              </h3>

              <p className="text-gray-400 text-sm leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="py-20">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            "Efficiency Boost",
            "Faster Delivery",
            "Cloud Reliability",
            "Client Satisfaction",
          ].map((label, i) => (
            <div key={i}>
              <div className="text-5xl font-extrabold text-indigo-400">
                {counts[i]}%
              </div>
              <p className="mt-2 text-gray-400">{label}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}