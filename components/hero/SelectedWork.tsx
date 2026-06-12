"use client";

import CaseStudyCard from "./CaseStudyCard";

export default function SelectedWork() {
  return (
    <section className="relative w-full overflow-visible py-20 px-4 md:px-0 bg-[#421B1B]">
      {/* Large rounded light panel container */}
      <div className="mx-auto w-full max-w-[1440px] bg-[#FAF6F0] rounded-[48px] md:rounded-[80px] pt-16 pb-24 px-6 md:px-16 overflow-visible relative shadow-xl">
        
        {/* Header Section: Two-column layout on desktop */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-12 mb-16 max-w-[1260px] mx-auto">
          {/* Left Side: Eyebrow and Headline */}
          <div className="flex flex-col gap-4 max-w-[620px]">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#421B1B]/5 text-[#421B1B] font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit">
              Selected Work
            </span>
            <h2 className="font-serif text-[42px] md:text-[64px] leading-[1.05] text-[#421B1B] font-normal tracking-tight">
              A few problems
              <br />
              I've helped solve.
            </h2>
          </div>

          {/* Right Side: Supporting Copy */}
          <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-[#421B1B]/75 font-normal max-w-[460px] md:mt-16">
            Every project is different. The common thread is turning complexity into something simple that people can actually use.
          </p>
        </div>

        {/* Carousel / Cards Row: Overflow visible beyond container edges on desktop */}
        <div className="w-full overflow-x-auto md:overflow-visible scrollbar-none snap-x snap-mandatory flex py-4">
          <div className="flex flex-nowrap md:flex-wrap md:justify-center items-end gap-6 md:gap-8 min-w-full md:min-w-0 px-2 md:px-0 select-none">
            
            {/* Card 1: Web Design */}
            <div className="snap-center shrink-0 w-[85vw] sm:w-[360px] md:w-auto">
              <CaseStudyCard
                title="Web design and development"
                videoSrc="/case-study-video.mp4"
                href="#projects"
                featured={false}
              />
            </div>

            {/* Card 2: Product Thinking (Featured, slightly larger for balanced emphasis) */}
            <div className="snap-center shrink-0 w-[85vw] sm:w-[360px] md:w-auto">
              <CaseStudyCard
                title="End-to-end product thinking"
                description="From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't."
                videoSrc="/case-study-video.mp4"
                href="#projects"
                featured={true}
              />
            </div>

            {/* Card 3: UX Experience */}
            <div className="snap-center shrink-0 w-[85vw] sm:w-[360px] md:w-auto pr-4 md:pr-0">
              <CaseStudyCard
                title="UX and customer experience"
                videoSrc="/case-study-video.mp4"
                href="#projects"
                featured={false}
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
