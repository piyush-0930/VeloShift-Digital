import { useState } from "react";
import { post } from "../utils/api";

export default function Contact() {
  return (
    <div className="w-full bg-[var(--vs-bg)] text-[var(--vs-light)]">

      {/* HERO */}
      <section className="w-full pt-20 pb-10 text-center px-6">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white">
          Get in{" "}
          <span className="bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] bg-clip-text text-transparent">
            Touch
          </span>
        </h1>
      </section>

      <Divider />

      {/* MAIN */}
      <section className="py-16 px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-stretch">
        
        {/* LEFT */}
        <div className="flex flex-col gap-6 h-full">

          {/* 2x2 CONTACT CARDS */}
          <div className="grid grid-cols-2 gap-4">
            <InfoCard icon="ri-mail-line" title="Email" value="business.veloshift@gmail.com" />
            <InfoCard icon="ri-phone-line" title="Phone" value="+91 95186-18418" />
            <InfoCard icon="ri-whatsapp-line" title="WhatsApp" value="+91 89011-27336" />
            <InfoCard icon="ri-map-pin-line" title="Location" value="CU-TBI, Mohali" />
          </div>

          {/* MAP */}
          <div className="bg-[#0F1A30] border border-white/10 rounded-2xl overflow-hidden flex-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1714.1031260403613!2d76.5729900983948!3d30.768790200000016!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ffb140bd63e07%3A0x68591e334d17a988!2sChandigarh%20University!5e0!3m2!1sen!2sin!4v1764696811565!5m2!1sen!2sin"
              className="w-full h-full min-h-[320px]"
              loading="lazy"
            ></iframe>
          </div>

        </div>

        {/* RIGHT FORM */}
        <div className="bg-[#0F1A30] border border-white/10 rounded-2xl p-10 shadow-lg flex flex-col">
          
          <div>
            <h2 className="text-2xl font-bold text-white">Send Message</h2>
            <Underline />
            <p className="text-sm text-[var(--vs-light)]/70 mt-2">
              Fill the form and our team will get back to you quickly.
            </p>
          </div>

          <ContactForm />

        </div>

      </section>

    </div>
  );
}

/* 🔥 PREMIUM INFO CARD */
function InfoCard({ icon, title, value }) {
  return (
    <div className="relative overflow-hidden bg-[#0F1A30]/70 border border-white/10 
                    rounded-xl p-5 transition-all duration-300 
                    hover:scale-[1.04] hover:border-[var(--vs-secondary)]/40 group">

      {/* BIG CURVED GLOW */}
      <div className="absolute -top-12 -right-12 w-40 h-40 
                      bg-gradient-to-br from-[var(--vs-secondary)]/20 to-transparent 
                      rounded-full blur-xl group-hover:scale-110 transition"></div>

      {/* SHARP CORNER SHAPE */}
      <div className="absolute top-0 right-0 w-20 h-20 
                      bg-gradient-to-bl from-[var(--vs-secondary)]/30 to-transparent 
                      rounded-bl-[60px]"></div>

      {/* HEADER */}
      <div className="flex items-center gap-3 relative z-10">
        <i className={`${icon} text-[var(--vs-secondary)] text-xl`}></i>
        <p className="text-white font-medium">{title}</p>
      </div>

      {/* VALUE */}
      <p className="text-sm text-[var(--vs-light)]/70 mt-3 relative z-10">
        {value}
      </p>
    </div>
  );
}

/* FORM */
function ContactForm() {
  const [state, setState] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  function onChange(e) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  async function onSubmit(e) {
    e.preventDefault();

    if (!state.name || !state.email || !state.message) {
      setMsg("Please fill required fields");
      return;
    }

    setSubmitting(true);

    try {
      await post("/api/contact/submit", state);
      setMsg("Message sent successfully!");
      setState({ name: "", email: "", phone: "", company: "", message: "" });
    } catch {
      setMsg("Something went wrong");
    }

    setSubmitting(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5 mt-6 flex-1 flex flex-col justify-between">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="name" value={state.name} onChange={onChange}
          placeholder="Full Name"
          className="px-4 py-3 bg-[#121b36] border border-white/10 rounded-md text-white" />

        <input name="email" value={state.email} onChange={onChange}
          placeholder="Email"
          className="px-4 py-3 bg-[#121b36] border border-white/10 rounded-md text-white" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input name="phone" value={state.phone} onChange={onChange}
          placeholder="Phone"
          className="px-4 py-3 bg-[#121b36] border border-white/10 rounded-md text-white" />

        <input name="company" value={state.company} onChange={onChange}
          placeholder="Company"
          className="px-4 py-3 bg-[#121b36] border border-white/10 rounded-md text-white" />
      </div>

      <textarea name="message" value={state.message} onChange={onChange}
        placeholder="Your message..."
        rows={5}
        className="px-4 py-3 bg-[#121b36] border border-white/10 rounded-md w-full text-white" />

      {msg && <p className="text-sm text-green-400">{msg}</p>}

      <button
        disabled={submitting}
        className="w-full py-3 rounded-md bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] font-semibold text-white"
      >
        {submitting ? "Sending..." : "Send Message"}
      </button>

    </form>
  );
}

/* UI */
function Divider() {
  return <div className="h-[1px] w-full bg-white/10"></div>;
}

function Underline({ center = false }) {
  return (
    <div className={`h-1 w-16 mt-2 ${center ? "mx-auto" : ""} 
    bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] rounded`} />
  );
}