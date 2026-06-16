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
      <div className="flex flex-col items-center flex-shrink-0 w-[3px] mb-12 md:mb-16">
        <div className="w-[3px] flex-grow bg-white rounded-full overflow-hidden relative">
          <motion.div
            style={{ scaleY: scrollYProgress, transformOrigin: "top" }}
            className="absolute inset-x-0 top-0 bottom-0 bg-[#FF8BD1] rounded-full"
          />
        </div>
      </div>

      <div className={`${isLast ? "pb-4" : "pb-14 md:pb-20"}`}>
        <span className="inline-block font-sans text-[14px] font-semibold tracking-wider text-[#421B1B]/55 uppercase mb-3">
          {number}
        </span>
        <h3 className="font-serif text-[24px] md:text-[28px] text-[#421B1B] font-normal leading-tight mb-3">
          {title}
        </h3>
        <p className="font-sans text-[15px] md:text-[16px] leading-[24px] text-[#421B1B]/75 font-normal max-w-[520px]">
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
    description: "I start by finding what is unclear, broken or slowing people down.",
  },
  {
    number: "02",
    title: "Map the system",
    description: "I look at the moving parts: users, content, tools, workflows and business goals.",
  },
  {
    number: "03",
    title: "Design the solution",
    description: "I turn the structure into a clear experience, interface or process.",
  },
  {
    number: "04",
    title: "Make it work",
    description: "I build, test, refine and push the solution until it is ready to be used.",
  },
];

export default function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={containerRef}
      className="w-full bg-[#fbf5f5] p-[8px] md:p-[30px] rounded-[48px] md:rounded-[110px] relative z-10 -mt-[180px] md:-mt-[250px]"
    >
      <div className="w-full bg-[#f2eaea] rounded-[38px] md:rounded-[80px] py-16 md:py-24 relative">
        <div className="mx-auto w-[min(85vw,1260px)] px-4 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-18 items-start">
            <div className="md:col-span-5 md:sticky md:top-32 h-fit flex flex-col gap-6 md:gap-8 text-left">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#421B1B]/5 text-[#421B1B] font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit">
                Process
              </span>
              <h2 className="font-serif text-[42px] md:text-[64px] leading-[1.05] text-[#421B1B] font-normal tracking-tight">
                How I work.
                <br />
                What’s my process
              </h2>
              <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-[#421B1B]/75 font-normal max-w-[460px]">
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
  );
}