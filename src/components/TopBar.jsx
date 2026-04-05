import { Phone, Mail } from "lucide-react";
import { FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function TopBar() {
  return (
    <div className="hidden md:flex justify-end items-center bg-[#0B142B] text-white px-8 py-3 text-sm border-b border-white/10 backdrop-blur-md">
      <div className="flex items-center gap-8">
        
        {/* Phone */}
        <a
          href="tel:+919518618418"
          className="flex items-center gap-2 group transition"
        >
          <Phone
            size={15}
            className="text-[#38A7F0] group-hover:scale-110 transition-transform"
          />
          <span className="text-white/80 group-hover:text-white transition">
            +91 9518618418
          </span>
        </a>

        <div className="h-4 w-px bg-white/20" />

        {/* Email */}
        <a
          href="mailto:business.veloshift@gmail.com"
          className="flex items-center gap-2 group transition"
        >
          <Mail
            size={15}
            className="text-[#38A7F0] group-hover:scale-110 transition-transform"
          />
          <span className="text-white/80 group-hover:text-white transition">
            business.veloshift@gmail.com
          </span>
        </a>

        <div className="h-4 w-px bg-white/20" />

        {/* WhatsApp with Prefilled Message */}
        <a
          href="https://wa.me/918901127336?text=Hi%20VeloShift%2C%20I%20came%20across%20your%20website%20and%20would%20like%20to%20discuss%20a%20project."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group transition"
        >
          <FaWhatsapp
            size={16}
            className="text-[#25D366] group-hover:scale-110 transition-transform"
          />
          <span className="hidden lg:inline text-white/80 group-hover:text-white transition">
            WhatsApp
          </span>
        </a>

        <div className="h-4 w-px bg-white/20" />

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/company/veloshift"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 group transition"
        >
          <FaLinkedin
            size={16}
            className="text-[#38A7F0] group-hover:scale-110 transition-transform"
          />
          <span className="hidden lg:inline text-white/80 group-hover:text-white transition">
            LinkedIn
          </span>
        </a>

      </div>
    </div>
  );
}