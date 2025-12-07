import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import GridBackground from "../components/GridBackground";

/* ============================================
   SERVICE DATA — You can expand anytime
============================================ */
const serviceData = {
  "software-development": {
    title: "Software Development",
    desc: "End-to-end custom software solutions designed for performance, reliability, and scale.",
    points: [
      "Custom web & mobile apps",
      "Cloud-native development",
      "Enterprise architecture design",
      "API & microservices engineering",
    ],
  },

  "ai-automation": {
    title: "AI & Automation",
    desc: "Advanced AI-driven automation that boosts efficiency, reduces costs, and accelerates growth.",
    points: [
      "AI chatbot & assistants",
      "Business process automation",
      "Predictive analytics",
      "RPA (Robotic Process Automation)",
    ],
  },

  "cloud-solutions": {
    title: "Cloud Solutions",
    desc: "Secure, scalable cloud infrastructure and modernization services.",
    points: [
      "Cloud migration",
      "DevOps setup",
      "CI/CD automation",
      "24/7 cloud monitoring",
    ],
  }
};

export default function ServiceDetail() {
  const { id } = useParams();
  const service = serviceData[id];

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white text-xl">
        Service Not Found
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-[var(--vs-bg)] text-white">

      {/* ===========================
          HERO SECTION
      ============================ */}
      <div className="relative w-full py-32 text-center bg-[var(--vs-bg)] overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold">
            {service.title}
          </h1>

          <p className="mt-6 text-lg text-[var(--vs-light)]/80 max-w-3xl mx-auto">
            {service.desc}
          </p>
        </div>
      </div>

      {/* ===========================
          SERVICE OVERVIEW
      ============================ */}
      <section className="py-20 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold">
          What We Deliver
        </h2>

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          {service.points.map((item, i) => (
            <div
              key={i}
              className="bg-[#111a32] border border-white/10 rounded-xl p-6 hover:scale-[1.02] transition"
            >
              <div className="text-2xl mb-3">🚀</div>
              <h3 className="text-xl font-semibold mb-1">{item}</h3>
              <p className="text-[var(--vs-light)]/70">
                High-quality execution with deep technical expertise.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ===========================
          COMPARISON MATRIX
      ============================ */}
      <section className="py-20 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Why Businesses Choose Veloshift
        </h2>

        <div className="overflow-x-auto mt-10">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#132043] text-left">
                <th className="px-5 py-4">Features</th>
                <th className="px-5 py-4">Traditional Providers</th>
                <th className="px-5 py-4 text-[var(--vs-secondary)]">Veloshift Co</th>
              </tr>
            </thead>

            <tbody>
              {[
                ["Speed of Delivery", "Slow", "⚡ Fast & Optimized"],
                ["Tech Expertise", "Limited Stack", "Full-stack, AI, Cloud"],
                ["Support", "Ticket-Based", "Dedicated Team"],
                ["Scalability", "Low", "High + Future-Proof"],
              ].map((row, i) => (
                <tr key={i} className="border-b border-white/10">
                  <td className="px-5 py-4">{row[0]}</td>
                  <td className="px-5 py-4 text-[var(--vs-light)]/60">{row[1]}</td>
                  <td className="px-5 py-4 text-[var(--vs-secondary)] font-semibold">{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </section>

      {/* ===========================
          IMPLEMENTATION PROCESS
      ============================ */}
      <section className="py-20 px-6 max-w-6xl mx-auto">

        <h2 className="text-3xl md:text-4xl font-bold text-center">
          Our Proven Implementation Process
        </h2>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-4 gap-8">

          {[
            ["Discovery", "Requirement analysis & strategy planning."],
            ["Design", "System architecture & UI/UX blueprints."],
            ["Development", "Agile development with weekly sprints."],
            ["Deployment", "Testing, optimization & final rollout."],
          ].map((step, i) => (
            <div
              key={i}
              className="bg-[#0F1A30] rounded-xl p-8 border border-white/10"
            >
              <div className="text-3xl text-[var(--vs-secondary)] mb-4">
                {i + 1}.
              </div>
              <h3 className="text-xl font-semibold">{step[0]}</h3>
              <p className="text-[var(--vs-light)]/70 mt-2">{step[1]}</p>
            </div>
          ))}
        </div>

      </section>

      {/* ===========================
          ROI METRICS
      ============================ */}
      <section className="py-20 px-6 max-w-6xl mx-auto text-center">

        <h2 className="text-3xl md:text-4xl font-bold">
          Measurable ROI & Performance Metrics
        </h2>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-10">

          {[
            ["20%", "Average Cost Reduction"],
            ["30%", "Faster Project Delivery"],
            ["99.9%", "System Uptime"],
            ["97%", "Client Satisfaction"],
          ].map((m, i) => (
            <div
              key={i}
              className="bg-[#101a33] p-8 rounded-xl border border-white/10 hover:scale-[1.03] transition"
            >
              <h3 className="text-4xl font-bold text-[var(--vs-secondary)]">{m[0]}</h3>
              <p className="text-[var(--vs-light)]/70 mt-2">{m[1]}</p>
            </div>
          ))}
        </div>

      </section>

      {/* ===========================
          CTA
      ============================ */}
      <section className="py-20 text-center">
        <h2 className="text-3xl md:text-5xl font-bold">
          Ready to Build Your {service.title}?
        </h2>

        <div className="mt-10 flex items-center justify-center gap-4">
          <Link
            to="/contact"
            className="inline-block px-8 py-3 rounded-xl text-lg font-semibold text-white bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] shadow hover:opacity-90 transition"
          >
            Contact Our Team
          </Link>

          <InquiryForm serviceTitle={service.title} serviceId={id} />
        </div>
      </section>
    </div>
  );
}

function InquiryForm({ serviceTitle, serviceId }){
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ name:'', email:'', message:'' });
  const [loading, setLoading] = useState(false);

  function onChange(e){ const { name, value } = e.target; setState(s=>({...s,[name]:value})); }

  async function submitInquiry(e){
    e.preventDefault();
    if(!state.name || !state.email || !state.message){ const { showError } = await import('../utils/message'); showError('Please fill name, email and message'); return; }
    setLoading(true);
    try{
      const res = await fetch('https://veloshift-backend.onrender.com/api/contact',{ method:'POST', headers:{ 'Content-Type':'application/json' }, body: JSON.stringify({ name: state.name, email: state.email, subject: `Service Inquiry: ${serviceTitle}`, message: `Service ID: ${serviceId}\n\n${state.message}` }) });
      if(!res.ok){ const data = await res.json().catch(()=>null); throw new Error(data?.error||'Failed to send'); }
      const { showSuccess } = await import('../utils/message'); showSuccess('Inquiry sent — we will contact you soon');
      setState({ name:'', email:'', message:'' });
      setOpen(false);
    }catch(err){ const { showError } = await import('../utils/message'); showError(err.message); }
    setLoading(false);
  }

  return (
    <div>
      <button onClick={()=>setOpen(true)} className="px-6 py-3 rounded-xl text-lg font-semibold text-white bg-transparent border border-white/10">Request Quote</button>
      {open && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="bg-[#0b1324] w-full max-w-lg rounded-2xl p-6 shadow-2xl relative">
            <button onClick={()=>setOpen(false)} className="absolute top-4 right-4 text-white/60">✕</button>
            <h3 className="text-xl font-bold">Request Quote — {serviceTitle}</h3>
            <form onSubmit={submitInquiry} className="mt-4 space-y-3">
              <input name="name" value={state.name} onChange={onChange} placeholder="Your name" className="input" />
              <input name="email" value={state.email} onChange={onChange} placeholder="Your email" className="input" />
              <textarea name="message" value={state.message} onChange={onChange} placeholder="Tell us about your requirements" className="input" rows={4} />
              <div className="flex gap-3 mt-3">
                <button type="submit" disabled={loading} className="btn-primary">{loading? 'Sending...' : 'Send Inquiry'}</button>
                <button type="button" onClick={()=>setOpen(false)} className="px-4 py-2 border rounded">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
