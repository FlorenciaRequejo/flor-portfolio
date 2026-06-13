"use client";

interface IndustriesSectionProps {
  innerRef: React.RefObject<HTMLDivElement | null>;
}

export default function IndustriesSection({ innerRef }: IndustriesSectionProps) {
  return (
    <div
      ref={innerRef}
      className="w-full flex-shrink-0 pointer-events-none opacity-0 select-none z-20 flex flex-col items-center justify-center gap-10 pb-[10vh]"
      style={{
        willChange: "opacity",
      }}
    >
      <h3 className="font-sans text-[16px] md:text-[18px] leading-[26px] text-primary/80 font-light text-center tracking-wide pointer-events-auto">
        Trusted by teams across many industries
      </h3>

      {/* Marquee Row 1 */}
      <div className="marquee-container w-full overflow-hidden py-2 pointer-events-auto">
        <div className="marquee-row-ltr">
          {[
            "Healthcare", "Government", "Media & Broadcasting", "Finance",
            "Beauty & Personal Care", "Retail & Consumer Goods", "Non-Profit"
          ].concat([
            "Healthcare", "Government", "Media & Broadcasting", "Finance",
            "Beauty & Personal Care", "Retail & Consumer Goods", "Non-Profit"
          ]).map((item, index) => (
            <div
              key={`row1-${index}`}
              className="h-[120px] px-12 rounded-[24px] bg-[#321414] border border-primary/15 flex items-center justify-center text-primary uppercase font-sans tracking-[2px] text-[13px] font-semibold hover:border-primary/40 transition-colors duration-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 */}
      <div className="marquee-container w-full overflow-hidden py-2 pointer-events-auto">
        <div className="marquee-row-rtl">
          {[
            "Construction", "Manufacturing", "Insurance",
            "Property & Real Estate", "Technology & SaaS", "Education"
          ].concat([
            "Construction", "Manufacturing", "Insurance",
            "Property & Real Estate", "Technology & SaaS", "Education"
          ]).map((item, index) => (
            <div
              key={`row2-${index}`}
              className="h-[120px] px-12 rounded-[24px] bg-[#321414] border border-primary/15 flex items-center justify-center text-primary uppercase font-sans tracking-[2px] text-[13px] font-semibold hover:border-primary/40 transition-colors duration-300"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
