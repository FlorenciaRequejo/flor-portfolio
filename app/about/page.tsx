"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/hero/FooterSection";

const skills = [
  { type: "category", label: "Design" },
  { type: "pill", label: "UX/UI" },
  { type: "pill", label: "Web design" },
  { type: "pill", label: "Website architecture" },
  { type: "pill", label: "Branding" },
  { type: "pill", label: "Problem discovery" },
  { type: "category", label: "Technology" },
  { type: "pill", label: "HTML & CSS" },
  { type: "pill", label: "WordPress, WooCommerce & Shopify" },
  { type: "pill", label: "AI-assisted development" },
  { type: "pill", label: "Automation systems" },
  { type: "pill", label: "API integrations" },
  { type: "pill", label: "Python-based workflows" },
  { type: "pill", label: "PHP customisations" },
  { type: "category", label: "Analysis & Optimisation" },
  { type: "pill", label: "Website audits" },
  { type: "pill", label: "SEO & GEO" },
  { type: "pill", label: "User behaviour analysis" },
  { type: "pill", label: "Performance optimisation" },
  { type: "pill", label: "Business process improvement" }
];

function FloatingPill({ label, index }: { label: string; index: number }) {
  const duration = 3.2 + (index % 3) * 0.6;
  const delay = (index % 4) * 0.25;
  const yOffset = 1 + (index % 2) * 1;

  return (
    <motion.span
      animate={{
        y: [0, -yOffset, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
      className="px-3.5 py-1 md:px-5 md:py-1.5 rounded-full border border-[#FDABFF] text-[#FDABFF] font-sans font-medium text-[11px] md:text-[13px] bg-[#FDABFF]/5 hover:bg-[#FDABFF]/15 transition-colors duration-200 cursor-default select-none whitespace-nowrap"
    >
      {label}
    </motion.span>
  );
}

function CategoryLabel({ label }: { label: string }) {
  return (
    <span className="font-sans font-bold text-[13px] md:text-[15px] text-[#FDABFF] self-center py-1 mr-1 select-none">
      {label}
    </span>
  );
}

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[#1B237A] text-[#FDABFF] selection:bg-[#FDABFF] selection:text-[#1B237A]">
      <Navbar />

      <section className="w-full pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16 relative">
          
          {/* Left Side: Bio Content */}
          <div className="flex flex-col gap-6 max-w-[580px] w-full text-left">
            <span className="font-sans text-[12px] md:text-[14px] uppercase tracking-[3px] text-[#FDABFF]/75 font-semibold">
              Taking complexity and making it work.
            </span>
            <h1 className="font-serif text-[40px] md:text-[68px] leading-[1.05] text-[#FDABFF] font-normal tracking-tight">
              15+ years of solving problems.
            </h1>
            <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-[#FDABFF]/80 font-light">
              From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't.
            </p>
          </div>

          {/* Right Side: Skills Grid */}
          <div className="w-full md:flex-1 flex flex-wrap gap-x-2 gap-y-2 md:gap-x-3 md:gap-y-2 max-w-full md:max-w-[620px] justify-start overflow-visible relative mt-8 md:mt-0">
            {skills.map((item, index) =>
              item.type === "category" ? (
                <CategoryLabel key={item.label} label={item.label} />
              ) : (
                <FloatingPill key={item.label} label={item.label} index={index} />
              )
            )}
          </div>

        </div>
      </section>

      <FooterSection />
    </div>
  );
}
