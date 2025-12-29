export default function AboutSection() {
  return (
    <section className="w-full py-24 bg-[var(--vs-bg)] text-center px-6">

      {/* SECTION TITLE */}
      <h2 className="text-3xl md:text-5xl font-extrabold text-white">
        About{" "}
        <span className="text-[var(--vs-secondary)]">
          Veloshift Technology
        </span>
      </h2>

      {/* UNDERLINE */}
      <div className="h-1 w-28 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] mx-auto mt-4 rounded-full shadow-[0_0_15px_var(--vs-primary)]"></div>

      {/* DESCRIPTION */}
      <p className="mt-10 text-lg md:text-xl text-[var(--vs-light)]/90 max-w-4xl mx-auto leading-relaxed">
        Veloshift Technology is a modern tech agency delivering end-to-end digital
        solutions for businesses of all sizes. We specialize in web & app development,
        AI-powered automation, cloud deployments, API integrations, and technical
        consulting. Our mission is to help organizations innovate faster with
        scalable, secure, and intelligent digital systems that drive real growth.
      </p>

    </section>
  );
}
