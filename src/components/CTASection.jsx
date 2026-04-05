import { useState } from "react";

export default function CTASection() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(""); // success | error

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      setType("error");
      setMessage("Please enter your email");
      return;
    }

    const enteredEmail = email;
    setEmail(""); // ✅ instant clear

    try {
      setLoading(true);
      setMessage(null);

      const res = await fetch("http://localhost:5000/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: enteredEmail }),
      });

      const data = await res.json();

      if (!res.ok) {
        setType("error");
        setMessage(data.msg || "Something went wrong");
      } else {
        setType("success");
        setMessage("Subscribed successfully!");
      }
    } catch (err) {
      setType("error");
      setMessage("Server error");
    } finally {
      setLoading(false);

      setTimeout(() => {
        setMessage(null);
      }, 3000);
    }
  };

  return (
    <section className="relative w-full py-24 bg-[var(--vs-bg)] text-center px-6 overflow-hidden">
      
      {/* GRID BG */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none"></div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">

          {/* LEFT CONTENT */}
          <div className="text-center lg:text-left max-w-xl">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Stay Updated with{" "}
              <span className="text-[var(--vs-secondary)]">
                Tech & AI Insights
              </span>
            </h2>

            <p className="mt-5 text-lg text-[var(--vs-light)]/80">
              Get the latest updates on AI, cloud, automation, and modern development trends —
              straight to your inbox.
            </p>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full max-w-md">
            <form
              onSubmit={handleSubmit}
              className="flex items-center bg-white/5 border border-white/10 rounded-lg overflow-hidden backdrop-blur-md"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-transparent text-white outline-none placeholder:text-white/50 disabled:opacity-50"
              />

              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 text-white font-semibold
                bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)]
                hover:opacity-90 transition disabled:opacity-50"
              >
                {loading ? "Submitting..." : "Subscribe"}
              </button>
            </form>

            {/* MESSAGE UI */}
            {message && (
              <p
                className={`mt-3 text-sm text-left ${
                  type === "success"
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                {message}
              </p>
            )}

            {/* NOTE */}
            <p className="text-xs text-[var(--vs-light)]/60 mt-2 text-left">
              No spam • Only valuable insights
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}