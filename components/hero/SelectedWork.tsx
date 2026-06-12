"use client";

import CaseStudyCard from "./CaseStudyCard";

export default function SelectedWork() {
  return (
    <section className="w-full bg-white p-[20px] md:p-[30px] overflow-hidden rounded-[100px] md:rounded-[110px]">
      <div className="w-full bg-[#fbf5f5] rounded-[80px] pt-16 pb-24 overflow-hidden relative">
        
        {/* Header Section: Two-column layout on desktop */}
        <div className="mx-auto w-[min(76vw,1260px)] px-6 md:px-0 mb-16">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-12 w-full">
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
        </div>

        {/* Carousel / Cards Row: Centered featured card, clipped side cards */}
        <div className="w-full overflow-hidden flex justify-center mt-16 relative">
          {/* Mobile swipe layout */}
          <div className="md:hidden w-full overflow-x-auto scrollbar-none snap-x snap-mandatory flex px-6 py-4">
            <div className="flex flex-nowrap gap-6 shrink-0">
              
              {/* Card 1: Web Design */}
              <div className="snap-center shrink-0 w-[80vw] sm:w-[360px]">
                <CaseStudyCard
                  title="Web design and development"
                  videoSrc="/case-study-video.mp4"
                  href="#projects"
                  featured={false}
                />
              </div>

              {/* Card 2: Product Thinking (Featured) */}
              <div className="snap-center shrink-0 w-[80vw] sm:w-[360px]">
                <CaseStudyCard
                  title="End-to-end product thinking"
                  description="From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't."
                  videoSrc="/case-study-video.mp4"
                  href="#projects"
                  featured={true}
                />
              </div>

              {/* Card 3: UX Experience */}
              <div className="snap-center shrink-0 w-[80vw] sm:w-[360px] pr-6">
                <CaseStudyCard
                  title="UX and customer experience"
                  videoSrc="/case-study-video.mp4"
                  href="#projects"
                  featured={false}
                />
              </div>

            </div>
          </div>

          {/* Desktop static centered carousel layout */}
          <div className="hidden md:flex justify-center items-end gap-10 shrink-0 w-max py-4 select-none">
            
            {/* Card 1: Web Design (Non-featured, clipped) */}
            <div className="shrink-0 w-[32vw] max-w-[440px] min-w-[280px]">
              <CaseStudyCard
                title="Web design and development"
                videoSrc="/case-study-video.mp4"
                href="#projects"
                featured={false}
              />
            </div>

            {/* Card 2: Product Thinking (Featured, centered, larger) */}
            <div className="shrink-0 w-[38vw] max-w-[580px] min-w-[340px]">
              <CaseStudyCard
                title="End-to-end product thinking"
                description="From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't."
                videoSrc="/case-study-video.mp4"
                href="#projects"
                featured={true}
              />
            </div>

            {/* Card 3: UX Experience (Non-featured, clipped) */}
            <div className="shrink-0 w-[32vw] max-w-[440px] min-w-[280px]">
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
