"use client";

import { motion, useScroll } from "framer-motion";
import { useRef } from "react";

interface ProcessStepProps {
  number: string;
  title: string;
  description: string;
  isLast: boolean;
}

function ProcessStep({ number, title, description, isLast }: ProcessStepProps) {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "start 35%"],
  });

  return (
    <div ref={ref} className="flex gap-8 md:gap-12 items-stretch min-h-[180px] md:min-h-[230px]">
      <div className={`flex flex-col items-center flex-shrink-0 w-[3px] ${isLast ? "mb-4" : "mb-12 md:mb-16"}`}>
        <div className="w-[3px] flex-grow bg-[#1B237A]/10 rounded-full overflow-hidden relative">
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute inset-x-0 top-0 bottom-0 bg-[#FDABFF] rounded-full"
          />
        </div>
      </div>

      <div className={`${isLast ? "pb-4" : "pb-14 md:pb-20"}`}>
        <span className="inline-block font-sans text-[14px] font-semibold tracking-wider text-[#1B237A]/55 uppercase mb-3">
          {number}
        </span>
        <h3 className="font-serif text-[24px] md:text-[28px] text-[#1B237A] font-normal leading-tight mb-3">
          {title}
        </h3>
        <p className="font-sans text-[15px] md:text-[16px] leading-[24px] text-[#1B237A]/75 font-normal max-w-[520px]">
          {description}
        </p>
      </div>
    </div>
  );
}

const processItems = [
  {
    number: "01",
    title: "Understand the problem",
    description: "As Einstein once said, “If I had an hour to solve a problem, I’d spend 55 minutes thinking about the problem and 5 minutes thinking about solutions.” I approach projects the same way. Before proposing solutions, I focus on understanding what is really happening, identifying root causes, and uncovering what is getting in the way of the desired result.",
  },
  {
    number: "02",
    title: "Map the system",
    description: "Once I understand the problem, I start mapping the system around it. Research, testing and observation help reveal how things actually work, not just how they are supposed to work. Theory can be very different from reality, which is why validation is a critical part of my process. I focus on building and testing a working solution first, then refining and improving the experience.",
  },
  {
    number: "03",
    title: "Design the solution",
    description: "Once the solution is proven and the foundations are in place, it is time to make it human. Whether it is a logo, a website or an app, design helps people understand, trust and engage with what has been built. The visual layer is just as important as the underlying structure. What people see matters as much as what they don’t. Throughout this process, I keep the end user front and centre, designing with their needs, goals and experience in mind.",
  },
  {
    number: "04",
    title: "Make it work",
    description: "A solution is never finished when it looks good. It needs to perform in the real world. I test, refine and validate every part of the experience before launch, using checklists, workflows and quality-control processes developed over years of practice. Everything has room to grow, but knowing when to stop refining and start delivering is just as important. The goal is to launch with confidence, minimise risk, and create a solid foundation for future improvements.",
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative w-full overflow-visible">
      {/* Background filler for bottom rounded corners to match the footer's dark blue */}
      <div className="absolute bottom-0 left-0 right-0 h-[200px] bg-[#1B237A] pointer-events-none" />

      <section
        id="process"
        ref={containerRef}
        className="w-full bg-[#B8F74B] pt-[8px] px-[8px] pb-[8px] md:pt-[30px] md:px-[30px] md:pb-[30px] rounded-[48px] md:rounded-[110px] relative z-10 -mt-[180px] md:-mt-[250px]"
      >
        <div className="w-full bg-white rounded-[38px] md:rounded-[80px] py-16 md:py-24 relative">
          <div className="mx-auto w-[min(85vw,1260px)] px-4 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-18 items-start">
              <div className="md:col-span-5 md:sticky md:top-32 h-fit flex flex-col gap-6 md:gap-8 text-left">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#1B237A]/10 text-[#1B237A] font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit">
                  PROCESS
                </span>
                <h2 className="font-serif text-[42px] md:text-[64px] leading-[1.05] text-[#1B237A] font-normal tracking-tight">
                  How I work.
                  <br />
                  What’s my process
                </h2>
                <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-[#1B237A]/75 font-normal max-w-[460px]">
                  Every project is different, but the way I approach problems stays the same: understand the mess, simplify the structure, and build something people can actually use.
                </p>
              </div>

              <div className="md:col-span-7 flex flex-col gap-0 pt-2 md:pt-4">
                {processItems.map((item, index) => (
                  <ProcessStep
                    key={item.number}
                    number={item.number}
                    title={item.title}
                    description={item.description}
                    isLast={index === processItems.length - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}