import cutbi from "../assets/cutbi.png";

export default function AboutSection() {
  return (
    <section className="w-full py-24 bg-[var(--vs-bg)] px-6">
      
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">
          
          {/* TITLE */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-white">
            About{" "}
            <span className="text-[var(--vs-secondary)]">
              VeloShift Technology
            </span>
          </h2>

          {/* UNDERLINE */}
          <div className="h-1 w-28 bg-gradient-to-r from-[var(--vs-primary)] to-[var(--vs-secondary)] mt-4 md:mx-0 mx-auto rounded-full shadow-[0_0_15px_var(--vs-primary)]"></div>

          {/* DESCRIPTION */}
          <p className="mt-10 text-lg md:text-xl text-[var(--vs-light)]/90 leading-relaxed">
            VeloShift Technology is a next-generation digital engineering company focused on building 
            scalable, high-performance solutions for modern businesses. We specialize in full-stack web 
            and mobile development, AI-driven automation, cloud infrastructure, and seamless system integrations.
            <br /><br />
            From startups to growing enterprises, we help organizations transform ideas into powerful digital 
            products by combining clean design, robust architecture, and intelligent technology. Our approach 
            is centered around performance, scalability, and long-term business impact.
          </p>

          {/* TAGLINE */}
          <p className="mt-6 text-sm text-[var(--vs-light)]/60">
            Building Future-Ready Digital Systems • AI • Cloud • Automation
          </p>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center md:justify-end">
          <img
            src={cutbi}
            alt="About VeloShift"
            className="w-full max-w-md md:max-w-lg object-contain drop-shadow-[0_0_30px_rgba(0,255,255,0.25)]"
          />
        </div>

      </div>

    </section>
  );
}