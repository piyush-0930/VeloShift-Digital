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
  Globe,
  Bot,
  Cloud,
  Plug,
  Palette,
  Layers,
} from "lucide-react";

export default function Services() {
  const [counts, setCounts] = useState([0, 0, 0, 0]);
  const targets = [40, 50, 99.9, 97];

  const [selectedService, setSelectedService] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [submitMessage, setSubmitMessage] = useState("");

  const [formData, setFormData] = useState({
    service: "",
    subService: "",
    name: "",
    email: "",
    phone: "",
    company: "",
    preferredTime: "",
    customRequirement: "",
  });

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

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setSubmitStatus(null);
    setSubmitMessage("");
    setFormData((prev) => ({
      ...prev,
      service: service.title,
    }));
  };

  const handleSubmit = async () => {
    try {
      const res = await fetch("https://veloshift-backend.onrender.com/api/quotes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitStatus("success");
        setSubmitMessage("Thank you! Our team will get back to you shortly.");
        setTimeout(() => { setSubmitStatus(null); setSubmitMessage(""); setSelectedService(null); }, 4000);
        setFormData({
          service: "",
          subService: "",
          name: "",
          email: "",
          phone: "",
          company: "",
          preferredTime: "",
          customRequirement: "",
        });
      } else {
        setSubmitStatus("error");
        setSubmitMessage(data.message || "Something went wrong. Please try again.");
        setTimeout(() => { setSubmitStatus(null); setSubmitMessage(""); }, 4000);
      }
    } catch (error) {
      console.error(error);
      setSubmitStatus("error");
      setSubmitMessage("Unable to reach the server. Please try again later.");
      setTimeout(() => { setSubmitStatus(null); setSubmitMessage(""); }, 4000);
    }
  };

  const services = [
    {
      title: "Development",
      icon: <Globe size={32} />,
      items: [
        "Web Development",
        "Mobile App Development",
        "Software Development",
        "Custom Solutions",
      ],
    },
    {
      title: "AI & Automation",
      icon: <Bot size={32} />,
      items: [
        "AI Chatbots",
        "Workflow Automation",
        "Machine Learning",
        "Predictive Analytics",
      ],
    },
    {
      title: "Cloud Services",
      icon: <Cloud size={32} />,
      items: [
        "Cloud Deployment",
        "DevOps",
        "AWS / Azure / GCP",
        "Cloud Migration",
      ],
    },
    {
      title: "Tech Integrations",
      icon: <Plug size={32} />,
      items: [
        "API Integration",
        "CRM Integration",
        "Payment Gateways",
        "Automation",
      ],
    },
    {
      title: "Design & Consulting",
      icon: <Palette size={32} />,
      items: [
        "UI/UX Design",
        "IT Consulting",
        "Branding",
        "Support",
      ],
    },
    {
      title: "SaaS & Platforms",
      icon: <Layers size={32} />,
      items: [
        "Multi-tenant SaaS",
        "Subscription Systems",
        "Admin Panels",
        "Enterprise Tools",
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
    { feature: "Full-Stack Development", us: true, agency: false, freelancer: false },
    { feature: "AI & Automation Expertise", us: true, agency: false, freelancer: false },
    { feature: "Cloud & DevOps Services", us: true, agency: false, freelancer: false },
    { feature: "End-to-End Integrations", us: true, agency: true, freelancer: false },
    { feature: "Design & Consulting", us: true, agency: true, freelancer: false },
    { feature: "Long-term Support", us: true, agency: true, freelancer: false },
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
                <div className="text-indigo-400 mb-4 group-hover:rotate-6 transition">
                  {srv.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{srv.title}</h3>
                <ul className="space-y-2 text-gray-300 mb-6">
                  {srv.items.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
              <button
                onClick={() => handleOpenModal(srv)}
                className="mt-auto inline-block text-center px-5 py-2 rounded-lg 
                           bg-gradient-to-r from-indigo-500 to-purple-500 
                           text-sm font-semibold hover:opacity-90 transition"
              >
                Get Quote
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* COMPARISON */}
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
            <div key={i} className="bg-[#121b36] p-8 rounded-2xl">
              <div className="text-indigo-400 mb-4">{step.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm">{step.desc}</p>
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

      {/* MODAL */}
      {selectedService && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.65)", backdropFilter: "blur(4px)" }}
        >
          <div
            className="w-full max-w-lg rounded-2xl overflow-hidden"
            style={{ background: "#121b36", border: "0.5px solid rgba(255,255,255,0.1)" }}
          >

            {/* Modal Header */}
            <div style={{ background: "linear-gradient(135deg, #3730a3, #6d28d9)", padding: "1.5rem 1.75rem", position: "relative" }}>
              <p style={{ fontSize: "11px", fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: "0.08em", textTransform: "uppercase", margin: "0 0 4px" }}>
                Request a quote
              </p>
              <p style={{ fontSize: "20px", fontWeight: 600, color: "#fff", margin: 0 }}>
                {selectedService.title}
              </p>
              <button
                onClick={() => setSelectedService(null)}
                style={{ position: "absolute", top: "1rem", right: "1.25rem", background: "transparent", border: "none", color: "rgba(255,255,255,0.6)", cursor: "pointer", lineHeight: 1 }}
              >
                <XCircle size={22} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: "1.5rem 1.75rem", display: "flex", flexDirection: "column", gap: "14px" }}>

              {/* Sub-service */}
              <div>
                <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "5px" }}>
                  Service type
                </label>
                <select
                  className="w-full rounded-lg text-white text-sm"
                  style={{ background: "#0B1220", border: "0.5px solid rgba(255,255,255,0.12)", padding: "10px 12px" }}
                  onChange={(e) => setFormData({ ...formData, subService: e.target.value })}
                >
                  <option>Select a sub-service</option>
                  {selectedService.items.map((item, i) => (
                    <option key={i}>{item}</option>
                  ))}
                </select>
              </div>

              {/* Name + Company */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "5px" }}>Name</label>
                  <input
                    placeholder="John Doe"
                    className="w-full rounded-lg text-white text-sm"
                    style={{ background: "#0B1220", border: "0.5px solid rgba(255,255,255,0.12)", padding: "10px 12px" }}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "5px" }}>Company</label>
                  <input
                    placeholder="Acme Inc."
                    className="w-full rounded-lg text-white text-sm"
                    style={{ background: "#0B1220", border: "0.5px solid rgba(255,255,255,0.12)", padding: "10px 12px" }}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "5px" }}>Email</label>
                  <input
                    placeholder="you@email.com"
                    className="w-full rounded-lg text-white text-sm"
                    style={{ background: "#0B1220", border: "0.5px solid rgba(255,255,255,0.12)", padding: "10px 12px" }}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "5px" }}>Phone</label>
                  <input
                    placeholder="+91 98765 43210"
                    className="w-full rounded-lg text-white text-sm"
                    style={{ background: "#0B1220", border: "0.5px solid rgba(255,255,255,0.12)", padding: "10px 12px" }}
                    onKeyDown={(e) => { const a=["Backspace","Delete","ArrowLeft","ArrowRight","Tab"]; if (!/[\d+\-\s]/.test(e.key) && !a.includes(e.key)) e.preventDefault(); }} onChange={(e) => { const v=e.target.value.replace(/[^\d+\-\s]/g,""); e.target.value=v; setFormData({...formData,phone:v}); }}
                  />
                </div>
              </div>

              {/* Preferred Time */}
              <div>
                <label style={{ fontSize: "12px", color: "rgba(255,255,255,0.4)", display: "block", marginBottom: "5px" }}>
                  Preferred time to call
                </label>
                <input
                  placeholder="e.g. 4:30AM or 5:00PM"
                  className="w-full rounded-lg text-white text-sm"
                  style={{ background: "#0B1220", border: "0.5px solid rgba(255,255,255,0.12)", padding: "10px 12px" }}
                  onKeyDown={(e) => { const a=["Backspace","Delete","ArrowLeft","ArrowRight","Tab"]; if (!/[\d:aApPmM]/.test(e.key) && !a.includes(e.key)) e.preventDefault(); }} onChange={(e) => { const v=e.target.value.replace(/[^0-9:aApPmM]/g,""); e.target.value=v; setFormData({...formData,preferredTime:v}); }}
                />
              </div>

              {/* Inline status message */}
              {submitStatus && (
                <div
                  style={{
                    padding: "12px 14px",
                    borderRadius: "10px",
                    fontSize: "13px",
                    fontWeight: 500,
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: submitStatus === "success" ? "rgba(74, 222, 128, 0.1)" : "rgba(248, 113, 113, 0.1)",
                    border: `0.5px solid ${submitStatus === "success" ? "rgba(74, 222, 128, 0.3)" : "rgba(248, 113, 113, 0.3)"}`,
                    color: submitStatus === "success" ? "#4ade80" : "#f87171",
                  }}
                >
                  {submitStatus === "success"
                    ? <CheckCircle size={16} />
                    : <XCircle size={16} />}
                  {submitMessage}
                </div>
              )}

              {/* Submit */}
              {submitStatus !== "success" && (
                <button
                  onClick={handleSubmit}
                  className="w-full rounded-lg py-3 font-semibold text-white text-sm transition hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)", marginTop: "2px" }}
                >
                  Submit Request
                </button>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}