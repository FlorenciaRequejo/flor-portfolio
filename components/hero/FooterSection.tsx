"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const navCol1 = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
];

const navCol2 = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/florencia-requejo/", target: "_blank" },
  { label: "Email", href: "mailto:florencia.requejo@gmail.com" },
  { label: "Instagram", href: "https://www.instagram.com/marielfreqche/", target: "_blank" },
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
    <section id="contact" className="w-full bg-background pt-24 pb-16 md:pt-36 md:pb-24 relative z-10">
      <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col gap-16 md:gap-24"
        >
          {/* Top CTA Area */}
          <div className="flex flex-col items-center text-center gap-6 md:gap-8 max-w-[760px] mx-auto">
            <h2 className="font-serif text-[40px] sm:text-[48px] md:text-[72px] leading-[1.05] text-primary font-normal tracking-tight">
              Interested in
              <br />
              working together?
            </h2>
            <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-primary/80 max-w-[620px] font-normal">
              Whether it’s a new product, a website, a brand or a complex business challenge, I’d love to hear about it.
            </p>
            <div className="flex flex-wrap justify-center gap-4 pt-6 relative z-20">
              <Link
                href="/projects"
                className="h-[50px] px-8 rounded-full border border-primary text-primary font-sans font-semibold text-[11px] md:text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-200 hover:bg-primary/10 cursor-pointer pointer-events-auto relative z-20"
              >
                View My Work
              </Link>
              <a
                href="/florencia-requejo-cv.pdf"
                download="florencia-requejo-cv.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="h-[50px] px-8 rounded-full bg-primary text-background font-sans font-semibold text-[11px] md:text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-200 hover:opacity-90"
              >
                Download CV
              </a>
              <a
                href="mailto:florencia.requejo@gmail.com"
                className="h-[50px] px-8 rounded-full border border-primary text-primary font-sans font-semibold text-[11px] md:text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-200 hover:bg-primary/10"
              >
                Email Me
              </a>
            </div>
          </div>

          {/* Thin Horizontal Divider */}
          <div className="w-full h-[1px] bg-primary/15" />

          {/* Bottom Footer Area */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* Left Column: Avatar & Bio Info */}
            <div className="md:col-span-6 flex flex-col gap-4 text-left items-start">

              <div className="flex flex-col text-left gap-1">
                <span className="font-sans font-semibold text-[18px] text-primary tracking-tight">
                  Flor Requejo
                </span>
                <p className="font-sans text-[14px] leading-[22px] text-primary/70 max-w-[320px] font-normal">
                  From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't.
                </p>
              </div>
            </div>

            {/* Right Column: Navigation Links */}
            <div className="md:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8 text-left">
              {/* Col 1 */}
              <div className="flex flex-col gap-4">
                {navCol1.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-sans text-[15px] font-medium text-primary hover:underline transition duration-300 w-fit"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Col 2 */}
              <div className="flex flex-col gap-4">
                {navCol2.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target={link.target}
                    rel={link.target === "_blank" ? "noopener noreferrer" : undefined}
                    className="font-sans text-[15px] font-medium text-primary hover:underline transition duration-300 w-fit"
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
