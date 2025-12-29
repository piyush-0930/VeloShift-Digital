import { useState } from "react";

export default function Contact() {
  return (
    <div className="w-full bg-[var(--vs-bg)] text-[var(--vs-light)]">

      {/* ================================
          CONTACT HERO
      ================================= */}
      <section className="w-full pt-20 pb-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Get in{" "}
          <span className="bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] bg-clip-text text-transparent">
            Touch
          </span>
        </h1>

        <p className="mt-4 max-w-2xl mx-auto text-lg text-[var(--vs-light)]/80 leading-relaxed">
          Whether you need engineering expertise, AI solutions, automation,
          or digital transformation — Veloshift Co is here to help bring
          your vision to life.
        </p>
      </section>

      <Divider />

      {/* ================================
          SUPPORT CHANNELS
      ================================= */}
      <section className="py-12 px-6 max-w-6xl mx-auto text-center animate-fade-in">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">
          Support <span className="text-[var(--vs-secondary)]">Channels</span>
        </h2>

        <Underline center />

        <p className="mt-4 text-[var(--vs-light)]/75 max-w-2xl mx-auto">
          We're here to help you in every way possible.
        </p>

        <div className="mt-12 grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Technical Support",
              desc: "For help with ongoing projects or technical issues.",
              icon: "ri-cpu-line",
            },
            {
              title: "Sales Inquiries",
              desc: "For questions about our services or partnerships.",
              icon: "ri-money-rupee-circle-line",
            },
            {
              title: "General Questions",
              desc: "Response within 24 business hours.",
              icon: "ri-question-answer-line",
            },
          ].map((s, i) => (
            <div
              key={i}
              className="bg-[#0F1A30]/50 border border-white/10 rounded-2xl p-8 backdrop-blur-xl 
                         hover:scale-[1.03] transition-all shadow-lg"
            >
              <i className={`${s.icon} text-[var(--vs-secondary)] text-4xl`}></i>
              <h3 className="text-xl font-bold text-white mt-4">{s.title}</h3>
              <p className="text-[var(--vs-light)]/75 mt-2">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Divider />

      {/* ================================
          CONTACT DETAILS + FORM
      ================================= */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-16">

        {/* LEFT SIDE — CONTACT DETAILS */}
        <div className="space-y-10">

          <div className="bg-[#0F1A30] border border-white/10 rounded-2xl p-10">
            <h2 className="text-2xl font-bold text-white">Contact Information</h2>
            <Underline />

            <div className="space-y-6 mt-6 text-[var(--vs-light)]/90">

              <div className="flex items-start gap-4">
                <i className="ri-mail-line text-[var(--vs-secondary)] text-2xl"></i>
                <div>
                  <p className="font-medium">Email</p>
                  <p className="opacity-80">business.veloshift@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <i className="ri-phone-line text-[var(--vs-secondary)] text-2xl"></i>
                <div>
                  <p className="font-medium">Phone</p>
                  <p className="opacity-80">+91 95186-18418</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <i className="ri-map-pin-line text-[var(--vs-secondary)] text-2xl"></i>
                <div>
                  <p className="font-medium">Office Address</p>
                  <p className="opacity-80">
                    Chandigarh University, Mohali, India
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* MAP */}
          <div className="bg-[#0F1A30] border border-white/10 rounded-2xl overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1714.1031260403613!2d76.5729900983948!3d30.768790200000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ffb140bd63e07%3A0x68591e334d17a988!2sChandigarh%20University!5e0!3m2!1sen!2sin!4v1764696811565!5m2!1sen!2sin"
              width="100%"
              height="400"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-2xl"
            ></iframe>
          </div>

        </div>

        {/* RIGHT SIDE — CONTACT FORM */}
        <div className="bg-[#0F1A30] border border-white/10 rounded-2xl p-10 shadow-lg">
          <h2 className="text-2xl font-bold text-white">Send Us a Message</h2>
          <Underline />

          <ContactForm />
        </div>

      </section>

    </div>
  );
}

/* =====================================
   CONTACT FORM COMPONENT
===================================== */

function ContactForm() {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  function onChange(e) {
    const { name, value } = e.target;
    setState((s) => ({ ...s, [name]: value }));
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!state.name || !state.email || !state.message) {
      const { showError } = await import("../utils/message");
      showError("Please fill name, email and message");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("https://veloshift-backend.onrender.com/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: state.name,
          email: state.email,
          phone: state.phone,
          company: state.company,
          subject: "Website inquiry",
          message: state.message,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to send");
      }

      const { showSuccess } = await import("../utils/message");
      showSuccess("Message sent — we will contact you soon");

      setState({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (err) {
      const { showError } = await import("../utils/message");
      showError(err.message);
    }

    setSubmitting(false);
  }

  return (
    <form className="space-y-6 mt-6" onSubmit={onSubmit}>
      {/* NAME + EMAIL */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Your Name</label>
          <input
            name="name"
            value={state.name}
            onChange={onChange}
            placeholder="Full Name"
            className="w-full mt-2 px-4 py-3 bg-[#121b36] border border-white/10 rounded-md text-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Email Address</label>
          <input
            name="email"
            type="email"
            value={state.email}
            onChange={onChange}
            placeholder="Email Address"
            className="w-full mt-2 px-4 py-3 bg-[#121b36] border border-white/10 rounded-md text-white"
          />
        </div>
      </div>

      {/* PHONE + COMPANY */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium">Phone Number</label>
          <input
            name="phone"
            value={state.phone}
            onChange={onChange}
            placeholder="Phone Number"
            className="w-full mt-2 px-4 py-3 bg-[#121b36] border border-white/10 rounded-md text-white"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Company (Optional)</label>
          <input
            name="company"
            value={state.company}
            onChange={onChange}
            placeholder="Your Company"
            className="w-full mt-2 px-4 py-3 bg-[#121b36] border border-white/10 rounded-md text-white"
          />
        </div>
      </div>

      {/* MESSAGE */}
      <div>
        <label className="text-sm font-medium">Message</label>
        <textarea
          name="message"
          value={state.message}
          onChange={onChange}
          placeholder="Write your message here..."
          rows={5}
          className="w-full mt-2 px-4 py-3 bg-[#121b36] border border-white/10 rounded-md text-white"
        />
      </div>

      {/* BUTTON */}
      <button
        type="submit"
        disabled={submitting}
        className="w-full mt-4 px-6 py-3 rounded-md text-lg font-semibold text-white bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}

/* =====================================
   SMALL COMPONENTS
===================================== */

function Divider() {
  return (
    <div className="h-[1px] w-full bg-gradient-to-r 
    from-transparent via-white/10 to-transparent my-8"></div>
  );
}

function Underline({ center = false }) {
  return (
    <div
      className={`h-1 w-20 ${center ? "mx-auto" : ""} mt-3 
      bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] rounded-full`}
    ></div>
  );
}
