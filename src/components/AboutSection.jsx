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
        Veloshift Technology is a modern software, AI, and automation company
        helping businesses scale through intelligent digital solutions. We build
        high-performance applications, AI-powered systems, automated workflows,
        and cloud-native platforms that enable organizations to innovate faster,
        operate smarter, and grow efficiently.
      </p>

    </section>
  );
}
