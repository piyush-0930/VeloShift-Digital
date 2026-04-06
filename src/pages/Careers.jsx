import { useState, useRef } from "react";
import FAQ from "../components/FAQ";

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
      <section className="w-full py-14 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
          Build Your{" "}
          <span className="bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] bg-clip-text text-transparent">
            Future
          </span>{" "}
          With Us
        </h1>
      </section>

      <Divider />

      {/* WHY CHOOSE */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-10">
          {/* Left: text */}
          <div className="flex-1">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white">
              Why Work at{" "}
              <span className="text-[var(--vs-secondary)]">VeloShift?</span>
            </h2>
            <Underline />
            <p className="mt-6 text-[var(--vs-light)]/70 text-base leading-relaxed">
              VeloShift is a fast-growing tech company where you work directly on cutting-edge cloud, automation, AI and SaaS products that make a real impact. We put innovation first — you'll have the freedom to experiment, iterate, and build future-focused solutions without bureaucracy slowing you down. And at the heart of it all is an amazing team culture built on collaboration, where talented developers, designers, and engineers push each other to grow every single day.
            </p>
          </div>
          {/* Right: image */}
          <div className="flex-1 flex justify-center">
            <img
              src="/src/assets/cutbi.png"
              alt="Why Veloshift"
              className="w-full max-w-sm rounded-2xl object-cover"
            />
          </div>
        </div>
      </section>

      <Divider />

      {/* PERKS */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white">
          Perks & <span className="text-[var(--vs-secondary)]">Benefits</span>
        </h2>
        <Underline center />

        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-5">
          <Perk icon="ri-booklet-line" title="Learning & Certifications" desc="AI, cloud and tech upskilling programs." />
          <Perk icon="ri-health-book-line" title="Health Support" desc="Employee wellness & flexible assistance." />
          <Perk icon="ri-wallet-3-line" title="Competitive Pay" desc="Great compensation with growth cycles." />
          <Perk icon="ri-time-line" title="Flexible Work" desc="Hybrid & remote-friendly environments." />
          <Perk icon="ri-flag-line" title="Leave Policies" desc="Fair and transparent leave structure." />
          <Perk icon="ri-gift-line" title="Team Events" desc="Offsites, hackathons, and celebrations." />
        </div>
      </section>

      <Divider />

      {/* OPEN POSITIONS */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            Open <span className="text-[var(--vs-secondary)]">Positions</span>
          </h2>
          <Underline center />
          <p className="mt-4 text-[var(--vs-light)]/60 text-sm">
            Don't see a role that fits?{" "}
            <button
              onClick={() => openApplyModal("")}
              className="text-[var(--vs-secondary)] hover:underline font-medium"
            >
              Apply with a custom application →
            </button>
          </p>
        </div>

        <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {jobs.map((job, i) => (
            <JobCard key={i} job={job} openApplyModal={openApplyModal} />
          ))}
        </div>
      </section>

      <Divider />

      {/* FAQ */}
      <FAQ />

      {modalOpen && <ApplyModal role={selectedRole} onClose={closeModal} />}
    </div>
  );
}

/* ------------------ JOB CARD ------------------ */
function JobCard({ job, openApplyModal }) {
  return (
    <div className="
      relative p-5 rounded-2xl
      bg-[#0d152b]/80
      border border-white/10
      backdrop-blur-xl shadow-xl
      transition-all duration-300
      hover:-translate-y-2 hover:shadow-2xl
      hover:border-[var(--vs-secondary)]/40
      group
    ">
      <div className="flex items-center gap-3 relative z-10">
        <div className={`w-14 h-14 flex items-center justify-center rounded-xl ${job.iconBg} bg-opacity-20 border border-white/10 shadow-inner shrink-0`}>
          <i className={`${job.icon} text-2xl text-white`}></i>
        </div>
        <div>
          <h3 className="text-base font-bold text-white leading-snug">{job.role}</h3>
          <div className="flex flex-wrap gap-1.5 mt-1 text-[var(--vs-light)]/70 text-xs">
            <span className="px-2 py-0.5 bg-white/5 rounded-md">{job.exp}</span>
            <span className="px-2 py-0.5 bg-white/5 rounded-md">{job.location}</span>
            <span className="px-2 py-0.5 bg-[var(--vs-secondary)]/20 text-[var(--vs-secondary)] rounded-md">{job.type}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        {job.tags.map((tag, idx) => (
          <span key={idx} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs text-[var(--vs-light)]/80">
            {tag}
          </span>
        ))}
      </div>

      <button
        onClick={() => openApplyModal(job.role)}
        className={`mt-4 w-full py-2 rounded-lg text-white text-sm font-medium bg-gradient-to-r ${job.gradient} hover:opacity-90 transition`}
      >
        Apply Now →
      </button>
    </div>
  );
}

/* ------------------ SMALL COMPONENTS ------------------ */

function Perk({ icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 p-4 rounded-xl bg-[#121b36]/40 border border-white/10">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[var(--vs-primary)]/10 shrink-0">
        <i className={`${icon} text-xl text-[var(--vs-primary)]`}></i>
      </div>
      <div>
        <h4 className="font-semibold text-white text-sm">{title}</h4>
        <p className="text-[var(--vs-light)]/75 mt-1 text-sm">{desc}</p>
      </div>
    </div>
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
  const [submitStatus, setSubmitStatus] = useState(null); // null | "success" | "error"
  const [errorMsg, setErrorMsg] = useState("");

  function onChange(e) {
    const { name, value } = e.target;
    if (name === "phone") {
      const digitsOnly = value.replace(/\D/g, "").slice(0, 15);
      setForm((prev) => ({ ...prev, phone: digitsOnly }));
      return;
    }
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();
    setSubmitStatus(null);
    setErrorMsg("");

    if (!form.name || !form.email || !form.role) {
      setSubmitStatus("error");
      setErrorMsg("Please fill all required fields.");
      return;
    }

    const resumeFile = resumeRef.current?.files[0];
    if (!resumeFile) {
      setSubmitStatus("error");
      setErrorMsg("Please upload your resume.");
      return;
    }

    setSubmitting(true);

    const formData = new FormData();
    Object.keys(form).forEach((key) => formData.append(key, form[key]));
    formData.append("resume", resumeFile);

    try {
      const response = await fetch("https://veloshift-backend.onrender.com/api/careers", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setSubmitStatus("error");
        setErrorMsg(data.error || "Submission failed. Please try again.");
      } else {
        setSubmitStatus("success");
      }
    } catch {
      setSubmitStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }

    setSubmitting(false);
  }

  // ── SUCCESS SCREEN ──
  if (submitStatus === "success") {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
        <div className="bg-[#0b1324] w-full max-w-md rounded-2xl shadow-2xl border border-white/10 px-8 py-12 flex flex-col items-center text-center gap-4">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
            <i className="ri-check-line text-3xl text-emerald-400"></i>
          </div>
          <h4 className="text-xl font-bold text-white">Application Submitted!</h4>
          <p className="text-[var(--vs-light)]/60 text-sm leading-relaxed max-w-xs">
            Thanks for applying. Our team will review your application and get back to you — keep an eye on your mail for updates.
          </p>
          <button
            onClick={onClose}
            className="mt-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] text-white text-sm font-semibold hover:opacity-90 transition"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  // ── FORM ──
  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-[#0b1324] w-full max-w-xl rounded-2xl shadow-2xl border border-white/10 overflow-hidden">

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0d152b]">
          <div>
            <h3 className="text-lg font-bold text-white">
              {role ? `Apply — ${role}` : "Custom Application"}
            </h3>
            <p className="text-xs text-[var(--vs-light)]/50 mt-0.5">
              {role
                ? "Fill in your details to apply for this role."
                : "Tell us about yourself and what role you're interested in."}
            </p>
          </div>
          <button
            onClick={onClose}
            type="button"
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 hover:bg-white/10 text-white/60 hover:text-white transition"
          >
            ✕
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={onSubmit} className="px-6 py-5 space-y-4">

          {submitStatus === "error" && (
            <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              <i className="ri-error-warning-line text-base mt-0.5 shrink-0"></i>
              <span>{errorMsg}</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[var(--vs-light)]/50 font-medium">
                Full Name <span className="text-red-400">*</span>
              </label>
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                placeholder="John Doe"
                className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[var(--vs-secondary)]/50 transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[var(--vs-light)]/50 font-medium">
                Email Address <span className="text-red-400">*</span>
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                placeholder="john@example.com"
                className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[var(--vs-secondary)]/50 transition"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[var(--vs-light)]/50 font-medium">Phone Number</label>
              <input
                name="phone"
                value={form.phone}
                onChange={onChange}
                inputMode="numeric"
                maxLength={15}
                placeholder="9876543210"
                className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[var(--vs-secondary)]/50 transition"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-[var(--vs-light)]/50 font-medium">
                Applying For <span className="text-red-400">*</span>
              </label>
              <input
                name="role"
                value={form.role}
                onChange={onChange}
                placeholder="e.g. AI Engineer"
                className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[var(--vs-secondary)]/50 transition"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[var(--vs-light)]/50 font-medium">
              Cover Letter <span className="text-[var(--vs-light)]/30">(optional)</span>
            </label>
            <textarea
              name="coverLetter"
              value={form.coverLetter}
              onChange={onChange}
              placeholder="Tell us why you'd be a great fit..."
              rows={3}
              className="px-3 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[var(--vs-secondary)]/50 transition resize-none"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs text-[var(--vs-light)]/50 font-medium">
              Resume <span className="text-red-400">*</span>
            </label>
            <div className="px-3 py-2.5 rounded-lg bg-white/5 border border-dashed border-white/10">
              <input
                type="file"
                ref={resumeRef}
                accept=".pdf"
                className="w-full text-sm text-white/60
                  file:mr-3 file:py-1.5 file:px-3
                  file:rounded-md file:border-0
                  file:text-xs file:font-medium
                  file:bg-[var(--vs-secondary)] file:text-white
                  hover:file:opacity-90 file:cursor-pointer"
              />
            </div>
            <p className="text-[10px] text-[var(--vs-light)]/30">Accepted formats: PDF</p>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] text-white text-sm font-semibold hover:opacity-90 transition disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {submitting ? (
              <>
                <svg
                  className="animate-spin w-4 h-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12" cy="12" r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </button>

        </form>
      </div>
    </div>
  );
}

/* ------------------ HELPERS ------------------ */

function Divider() {
  return <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-6" />;
}

function Underline({ center }) {
  return (
    <div
      className={`h-1 w-20 ${center ? "mx-auto" : ""} mt-3 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] rounded-full`}
    />
  );
}