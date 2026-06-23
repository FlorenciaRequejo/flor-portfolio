"use client";

export default function IndustriesSection() {
  return (
    <section
      className="w-full flex flex-col items-center justify-center gap-4 py-[5vh] md:pt-0 md:pb-[10vh] select-text relative z-20"
    >
      <h3 className="font-sans text-[16px] md:text-[18px] leading-[26px] text-[#B8F74B]/80 font-light text-center tracking-wide pointer-events-auto">
        Trusted by teams across many industries
      </h3>

      {/* Marquee Row 1 */}
      <div className="marquee-container w-full overflow-hidden py-2 mt-4 md:mt-[30px] pointer-events-auto">
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
              className="h-[60px] md:h-[120px] px-6 md:px-12 rounded-[12px] md:rounded-[24px] bg-[#B8F74B] flex items-center justify-center text-[#089998] uppercase font-sans tracking-[2px] text-[11px] md:text-[13px] font-semibold"
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
              className="h-[60px] md:h-[120px] px-6 md:px-12 rounded-[12px] md:rounded-[24px] bg-[#B8F74B] flex items-center justify-center text-[#089998] uppercase font-sans tracking-[2px] text-[11px] md:text-[13px] font-semibold"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
