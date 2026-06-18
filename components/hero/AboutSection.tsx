"use client";

import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="w-full pl-4 md:pl-[calc((100vw-min(76vw,1260px))/2)] pr-4 md:pr-0 pt-6 md:pt-8 pb-20 md:pb-32 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 relative select-text"
    >
      {/* Left Side: Text Content */}
      <div className="flex flex-col justify-between items-center md:items-start text-center md:text-left gap-6 max-w-[580px] pointer-events-auto w-full">
        <div className="flex flex-col gap-6 w-full">
          <span className="font-sans text-[14px] uppercase tracking-[3px] text-primary/75">
            Taking complexity and making it work.
          </span>
          <h2 className="font-serif text-[40px] md:text-[64px] leading-[1.05] text-primary font-normal tracking-tight">
            15+ years of
            <br />
            solving problems.
          </h2>
          <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-primary/80 font-light">
            From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't.
          </p>
        </div>
      </div>

      {/* Right Side: Image and Overlapping Button */}
      <div className="w-full md:w-[38vw] h-[320px] md:h-[260px] relative flex justify-end overflow-visible pointer-events-auto">
        <div className="relative h-full w-full overflow-visible">
          <div className="relative h-full w-full overflow-hidden rounded-[32px] md:rounded-r-none md:rounded-l-[32px]">
            <Image
              src="/flor.webp"
              alt="Flor Artwork"
              fill
              sizes="(max-width: 768px) 100vw, 30vw"
              priority={false}
              className="object-cover object-center"
            />
          </div>

          <a
            href="#about"
            className="absolute left-1/2 md:left-0 -translate-x-1/2 bottom-8 h-[54px] px-8 rounded-full bg-primary text-bg font-sans font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity duration-200 shadow-lg z-10 whitespace-nowrap"
          >
            <span>Read More About Me</span>
            <span className="text-[16px] font-bold">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
