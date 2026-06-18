"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const navCol1 = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Process", href: "#process" },
  { label: "Testimonials", href: "#testimonials" },
];

const navCol2 = [
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Email", href: "mailto:florencia@example.com" },
  { label: "GitHub", href: "https://github.com" },
  { label: "Contact", href: "#contact" },
];

const containerVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
};

export default function FooterSection() {
  return (
    <section id="contact" className="w-full bg-[#421B1B] pt-24 pb-16 md:pt-36 md:pb-24 relative z-10">
      <div className="mx-auto w-[min(76vw,1260px)] px-4 md:px-0">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col gap-16 md:gap-24"
        >
          {/* Top CTA Area */}
          <div className="flex flex-col items-center text-center gap-6 md:gap-8 max-w-[760px] mx-auto">
            <h2 className="font-serif text-[40px] sm:text-[48px] md:text-[72px] leading-[1.05] text-[#FF8BD1] font-normal tracking-tight">
              How I work.
              <br />
              What's my process
            </h2>
            <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-[#FF8BD1]/80 max-w-[620px] font-normal">
              From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't.
            </p>
            <a
              href="#about"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF8BD1] text-[#421B1B] font-sans font-medium text-[15px] rounded-full hover:scale-105 active:scale-95 transition-all duration-300 shadow-[0_10px_25px_rgba(255,139,209,0.15)] group mt-2"
            >
              <span>Read More About Me</span>
              <span className="text-[18px] group-hover:translate-x-1 transition-transform duration-300">↗</span>
            </a>
          </div>

          {/* Thin Horizontal Divider */}
          <div className="w-full h-[1px] bg-[#FF8BD1]/15" />

          {/* Bottom Footer Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* Left Column: Avatar & Bio Info */}
            <div className="md:col-span-6 flex flex-col gap-4 text-left items-start">
              <div className="relative w-[54px] h-[54px] rounded-full overflow-hidden bg-[#FF8BD1]/10 flex-shrink-0">
                <Image
                  src="/flor.webp"
                  alt="Flor Requejo"
                  fill
                  sizes="54px"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col text-left gap-1">
                <span className="font-sans font-semibold text-[18px] text-[#FF8BD1] tracking-tight">
                  Flor Requejo
                </span>
                <p className="font-sans text-[14px] leading-[22px] text-[#FF8BD1]/70 max-w-[320px] font-normal">
                  From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't.
                </p>
              </div>
            </div>

            {/* Right Column: Navigation Links */}
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
              {/* Col 1 */}
              <div className="flex flex-col gap-4">
                {navCol1.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-sans text-[15px] font-medium text-[#FF8BD1] hover:underline transition duration-300 w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              {/* Col 2 */}
              <div className="flex flex-col gap-4">
                {navCol2.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="font-sans text-[15px] font-medium text-[#FF8BD1] hover:underline transition duration-300 w-fit"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
