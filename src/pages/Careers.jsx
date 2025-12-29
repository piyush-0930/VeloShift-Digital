import { useState, useRef } from "react";

export default function Careers() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");

  const [jobs] = useState([
    {
      role: "AI Engineer",
      exp: "0–2 yrs",
      location: "Remote / Hybrid",
      type: "Full-Time",
      iconBg: "bg-purple-600",
      icon: "ri-robot-2-line",
      tags: ["Python", "LLMs", "AI APIs"],
      gradient: "from-purple-500 to-[#391b61]",
    },
    {
      role: "Full Stack Developer (MERN)",
      exp: "0–2 yrs",
      location: "Hybrid – Noida",
      type: "Full-Time",
      iconBg: "bg-blue-600",
      icon: "ri-code-box-line",
      tags: ["React", "Node.js", "MongoDB"],
      gradient: "from-blue-500 to-indigo-800",
    },
    {
      role: "Frontend React Developer",
      exp: "0–1 yr",
      location: "Remote / Hybrid",
      type: "Internship",
      iconBg: "bg-pink-600",
      icon: "ri-brackets-line",
      tags: ["React", "Tailwind", "UI/UX"],
      gradient: "from-pink-400 to-violet-700",
    },
    {
      role: "Cloud & DevOps Engineer",
      exp: "0–2 yrs",
      location: "Hybrid / Remote",
      type: "Full-Time",
      iconBg: "bg-cyan-600",
      icon: "ri-cloud-line",
      tags: ["AWS", "Docker", "CI/CD"],
      gradient: "from-cyan-400 to-teal-700",
    },
    {
      role: "Automation Engineer",
      exp: "0–2 yrs",
      location: "Remote / On-site",
      type: "Full-Time",
      iconBg: "bg-green-600",
      icon: "ri-flashlight-line",
      tags: ["Zapier", "API Scripts", "Bots"],
      gradient: "from-green-400 to-emerald-700",
    },
    {
      role: "UI/UX Designer",
      exp: "0–1 yr",
      location: "Remote / Hybrid",
      type: "Internship",
      iconBg: "bg-orange-600",
      icon: "ri-pencil-ruler-2-line",
      tags: ["Figma", "Wireframes", "Prototyping"],
      gradient: "from-orange-500 to-amber-800",
    },
  ]);

  function openApplyModal(role) {
    setSelectedRole(role);
    setModalOpen(true);
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    setModalOpen(false);
    setSelectedRole("");
    document.body.style.overflow = "";
  }

  return (
    <div className="w-full bg-[var(--vs-bg)] text-[var(--vs-light)]">
      {/* HERO */}
      <section className="w-full py-20 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Build Your{" "}
          <span className="bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] bg-clip-text text-transparent">
            Future
          </span>{" "}
          With Us
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-[var(--vs-light)]/80">
          Join Veloshift Technology — work on AI, automation, cloud and digital
          products that shape the next generation of tech.
        </p>
      </section>

      <Divider />

      {/* WHY CHOOSE */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white">
          Why Work at{" "}
          <span className="text-[var(--vs-secondary)]">Veloshift?</span>
        </h2>
        <Underline center />

        <div className="mt-10 grid md:grid-cols-3 gap-8">
          <WhyCard
            icon="ri-rocket-2-line"
            title="Fast-Growing Tech Company"
            desc="Work directly on cloud, automation, AI and SaaS products."
          />
          <WhyCard
            icon="ri-lightbulb-flash-line"
            title="Innovation First"
            desc="Experiment, iterate and build future-focused solutions."
          />
          <WhyCard
            icon="ri-team-line"
            title="Amazing Team Culture"
            desc="Collaborate with talented developers, designers and engineers."
          />
        </div>
      </section>

      <Divider />

      {/* PERKS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white">
          Perks & <span className="text-[var(--vs-secondary)]">Benefits</span>
        </h2>
        <Underline center />

        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          <Perk
            icon="ri-booklet-line"
            title="Learning & Certifications"
            desc="AI, cloud and tech upskilling programs."
          />
          <Perk
            icon="ri-health-book-line"
            title="Health Support"
            desc="Employee wellness & flexible assistance."
          />
          <Perk
            icon="ri-wallet-3-line"
            title="Competitive Pay"
            desc="Great compensation with growth cycles."
          />
          <Perk
            icon="ri-time-line"
            title="Flexible Work"
            desc="Hybrid & remote-friendly environments."
          />
          <Perk
            icon="ri-flag-line"
            title="Leave Policies"
            desc="Fair and transparent leave structure."
          />
          <Perk
            icon="ri-gift-line"
            title="Team Events"
            desc="Offsites, hackathons, and celebrations."
          />
        </div>
      </section>

      <Divider />

      {/* PROCESS */}
      <section className="py-16 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Our Hiring{" "}
          <span className="text-[var(--vs-secondary)]">Process</span>
        </h2>
        <Underline center />

        <p className="mt-4 text-[var(--vs-light)]/75">
          A simple and transparent journey to joining our tech team.
        </p>

        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <ProcessStep number="01" title="Apply Online" desc="Submit your resume & details." />
          <ProcessStep number="02" title="Screening" desc="We review your application." />
          <ProcessStep number="03" title="Technical Task" desc="Showcase your skillset." />
          <ProcessStep number="04" title="Final Interview" desc="Meet our core team." />
        </div>
      </section>

      <Divider />

      {/* OPEN POSITIONS */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white">
          Open <span className="text-[var(--vs-secondary)]">Positions</span>
        </h2>
        <Underline center />

        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jobs.map((job, i) => (
            <JobCard key={i} job={job} openApplyModal={openApplyModal} />
          ))}
        </div>
      </section>

      <Divider />

      {/* FAQ */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white">
          Frequently Asked{" "}
          <span className="text-[var(--vs-secondary)]">Questions</span>
        </h2>
        <Underline center />

        <div className="mt-8 max-w-4xl mx-auto space-y-4">
          <FAQ q="Do you offer remote roles?" a="Yes, several roles support hybrid or fully remote work." />
          <FAQ q="Do you hire freshers?" a="Yes, we hire 0–2 year candidates in multiple roles." />
          <FAQ q="What tech stack do you use?" a="React, Node.js, Python, AI/LLMs, AWS, Docker and more." />
          <FAQ q="Is there learning support?" a="We offer internal training, mentorship and certifications." />
        </div>
      </section>

      <Divider />

      {/* CTA */}
      <section className="py-16 px-6 bg-[#0F1A30] border-t border-white/10 text-center">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Ready to Join Veloshift?
        </h2>
        <p className="mt-3 text-[var(--vs-light)]/80">
          If you’re passionate about building the future of technology — apply now.
        </p>

        <button
          onClick={() => openApplyModal("")}
          className="mt-6 px-8 py-3 rounded-md text-lg font-semibold text-white bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] hover:opacity-90 transition shadow"
        >
          Apply Now
        </button>
      </section>

      {modalOpen && <ApplyModal role={selectedRole} onClose={closeModal} />}
    </div>
  );
}

/* ------------------ JOB CARD ------------------ */
function JobCard({ job, openApplyModal }) {
  return (
    <div className="
      relative p-6 rounded-2xl 
      bg-[#0d152b]/80 
      border border-white/10 
      backdrop-blur-xl shadow-xl
      transition-all duration-300 
      hover:-translate-y-3 hover:shadow-2xl
      hover:border-[var(--vs-secondary)]/40
      group
    ">
      <div className="flex items-center gap-4 relative z-10">
        <div
          className={`w-16 h-16 flex items-center justify-center rounded-xl ${job.iconBg} bg-opacity-20 border border-white/10 shadow-inner`}
        >
          <i className={`${job.icon} text-3xl text-white`}></i>
        </div>

        <div>
          <h3 className="text-xl font-bold text-white">{job.role}</h3>
          <div className="flex flex-wrap gap-2 mt-1 text-[var(--vs-light)]/70 text-xs">
            <span className="px-2 py-1 bg-white/5 rounded-md">{job.exp}</span>
            <span className="px-2 py-1 bg-white/5 rounded-md">{job.location}</span>
            <span className="px-2 py-1 bg-[var(--vs-secondary)]/20 text-[var(--vs-secondary)] rounded-md">
              {job.type}
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-5">
        {job.tags.map((tag, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-[var(--vs-light)]/80"
          >
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => openApplyModal(job.role)}
        className={`mt-6 w-full py-2 rounded-md text-white font-medium bg-gradient-to-r ${job.gradient} hover:opacity-90 transition`}
      >
        Apply Now →
      </button>
    </div>
  );
}

/* ------------------ SMALL COMPONENTS ------------------ */

function WhyCard({ icon, title, desc }) {
  return (
    <div className="bg-[#0F1A30] border border-white/10 p-6 rounded-2xl text-center hover:scale-[1.02] transition shadow">
      <i className={`${icon} text-4xl text-[var(--vs-secondary)]`}></i>
      <h3 className="text-lg font-bold text-white mt-4">{title}</h3>
      <p className="text-[var(--vs-light)]/75 mt-2">{desc}</p>
    </div>
  );
}

function Perk({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-xl bg-[#121b36]/40 border border-white/10">
      <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[var(--vs-primary)]/10">
        <i className={`${icon} text-2xl text-[var(--vs-primary)]`}></i>
      </div>
      <div>
        <h4 className="font-semibold text-white">{title}</h4>
        <p className="text-[var(--vs-light)]/75 mt-1">{desc}</p>
      </div>
    </div>
  );
}

function ProcessStep({ number, title, desc }) {
  return (
    <div className="bg-[#121b36]/40 border border-white/10 p-6 rounded-2xl">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--vs-secondary)]/10 text-[var(--vs-secondary)] font-extrabold">
          {number}
        </div>
        <div>
          <h4 className="text-lg font-bold text-white">{title}</h4>
          <p className="text-[var(--vs-light)]/75 mt-1">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function FAQ({ q, a }) {
  return (
    <details className="bg-[#121b36]/40 border border-white/10 p-6 rounded-xl cursor-pointer">
      <summary className="text-lg font-semibold text_white">{q}</summary>
      <p className="mt-3 text-[var(--vs-light)]/75">{a}</p>
    </details>
  );
}

/* ------------------ APPLY MODAL ------------------ */

function ApplyModal({ role, onClose }) {
  const resumeRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    role: role || "",
    coverLetter: "",
  });

  const [submitting, setSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  function onChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!form.name || !form.email || !form.role) {
      alert("Please fill all required fields.");
      return;
    }

    const resumeFile = resumeRef.current?.files[0];
    if (!resumeFile) {
      alert("Please upload a resume.");
      return;
    }

    setSubmitting(true);
    setProgress(0);

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    formData.append("resume", resumeFile);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      alert("Application submitted successfully!");
      onClose();
    } catch {
      alert("Failed to submit.");
    }

    setSubmitting(false);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
      <div className="bg-[#0b1324] w-full max-w-2xl rounded-2xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          ✕
        </button>

        <h3 className="text-2xl font-bold text-white">
          {role ? `Apply — ${role}` : "Apply to Veloshift"}
        </h3>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" className="input" value={form.name} onChange={onChange} placeholder="Full Name" />
            <input name="email" type="email" className="input" value={form.email} onChange={onChange} placeholder="Email" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="phone" className="input" value={form.phone} onChange={onChange} placeholder="Phone Number" />
            <input name="role" className="input" value={form.role} onChange={onChange} placeholder="Applying for" />
          </div>

          <textarea
            name="coverLetter"
            value={form.coverLetter}
            onChange={onChange}
            placeholder="Cover Letter (optional)"
            className="p-3 w-full rounded bg-transparent border border-white/10 text-white"
            rows={4}
          />

          <input type="file" ref={resumeRef} accept=".pdf,.doc,.docx" className="file:bg-[var(--vs-secondary)] file:text-white file:px-4 file:py-2 file:rounded-md" />

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-3 rounded-md bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] text-white font-semibold mt-4 disabled:opacity-70"
          >
            {submitting ? "Submitting..." : "Submit Application"}
          </button>
        </form>
      </div>
    </div>
  );
}

/* ------------------ HELPERS ------------------ */

function Divider() {
  return <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-8"></div>;
}

function Underline({ center }) {
  return (
    <div
      className={`h-1 w-24 ${center ? "mx-auto" : ""} mt-3 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] rounded-full`}
    />
  );
}