"use client";

import { motion } from "framer-motion";

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
  // Generate pseudo-random animation parameters based on the index to ensure consistency and avoid SSR hydration issues
  const duration = 3.2 + (index % 3) * 0.6; // 3.2s, 3.8s, 4.4s
  const delay = (index % 4) * 0.25; // 0s, 0.25s, 0.5s, 0.75s
  const yOffset = 1 + (index % 2) * 1; // 1px, 2px (extremely subtle floating motion)

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
      className="px-3.5 py-1 md:px-5 md:py-1.5 rounded-full border border-[#B8F74B] text-secondary font-sans font-medium text-[11px] md:text-[13px] bg-secondary/5 hover:bg-secondary/15 transition-colors duration-200 cursor-default select-none whitespace-nowrap"
    >
      {label}
    </motion.span>
  );
}

function CategoryLabel({ label }: { label: string }) {
  return (
    <span className="font-sans font-bold text-[13px] md:text-[15px] text-secondary self-center py-1 mr-1 select-none">
      {label}
    </span>
  );
}

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full pl-4 md:pl-[calc((100%-min(76vw,1260px))/2)] pr-4 md:pr-[calc((100%-min(76vw,1260px))/2)] pt-6 md:pt-8 pb-20 md:pb-32 grid grid-cols-1 md:grid-cols-[5fr_5fr] items-center gap-8 md:gap-16 relative select-text"
    >
      {/* Left Side: Text Content */}
      <div className="flex flex-col justify-between items-center md:items-start text-center md:text-left gap-6 pointer-events-auto w-full">
        <div className="flex flex-col gap-6 w-full">
          <span className="font-sans text-[14px] uppercase tracking-[3px] text-secondary/75">
            Making complexity work.
          </span>
          <h2 className="font-serif text-[40px] md:text-[64px] leading-[1.05] text-secondary font-normal tracking-tight">
            15+ years of solving problems.
          </h2>
          <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-secondary font-normal max-w-[460px]">
            From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't.
          </p>
        </div>
      </div>

      {/* Right Side: Skills block of floating pills */}
      <div className="w-full flex flex-wrap gap-x-2 gap-y-2 md:gap-x-3 md:gap-y-2 justify-center md:justify-start pointer-events-auto overflow-visible relative">
        {skills.map((item, index) =>
          item.type === "category" ? (
            <CategoryLabel key={item.label} label={item.label} />
          ) : (
            <FloatingPill key={item.label} label={item.label} index={index} />
          )
        )}
      </div>
    </section>
  );
}
