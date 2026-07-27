"use client";

import Link from "next/link";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full max-w-[850px] mx-auto px-4 md:px-6 pt-6 md:pt-8 pb-16 md:pb-24 flex flex-col items-center justify-center text-center gap-6 relative select-text pointer-events-auto"
    >
      <div className="flex flex-col items-center justify-center text-center gap-5 w-full">
        <span className="font-sans text-[13px] md:text-[14px] uppercase tracking-[3px] text-secondary/80">
          Making complexity work.
        </span>
        <h2 className="font-serif text-[36px] sm:text-[48px] md:text-[60px] leading-[1.08] text-secondary font-normal tracking-tight max-w-[760px]">
          I design brands, websites, products &amp; AI experiences.
        </h2>
        <p className="font-sans text-[15px] sm:text-[17px] md:text-[18px] leading-[24px] md:leading-[28px] text-secondary/90 font-normal max-w-[640px]">
          For over 15 years, I've helped businesses turn complex ideas into clear, useful experiences. The tools have evolved, but the goal has always been the same: solving the right problems.
        </p>
        <div className="pt-2">
          <Link
            href="/about"
            className="px-7 py-3.5 md:px-8 md:py-4 rounded-full bg-secondary text-background font-sans font-semibold text-[11px] md:text-[12px] uppercase tracking-[1.5px] hover:bg-secondary/90 transition-all duration-200 shadow-md inline-flex items-center gap-2 group"
          >
            About Me
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
