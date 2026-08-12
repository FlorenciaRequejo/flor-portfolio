"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/hero/FooterSection";
import CaseStudyCard from "@/components/hero/CaseStudyCard";
import PasswordGuard from "@/components/PasswordGuard";
import { caseStudyCards } from "@/lib/caseStudies";

const fadeInVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 1, 0.5, 1] as const,
    },
  },
};

const structuralImages = [
  "/structural/Artboard 1@3x.png",
  "/structural/Artboard 1 copy@3x.png",
  "/structural/Artboard 1 copy 2@3x.png",
  "/structural/Artboard 1 copy 3@3x.png",
];

const structuralTags = [
  "Structural Design",
  "Packaging",
  "Graphic Design",
  "Branding",
  "Product Design",
];

interface HeroControlsProps {
  isSynopsisOpen: boolean;
  setIsSynopsisOpen: (open: boolean) => void;
  isMobile?: boolean;
}

function HeroControls({
  isSynopsisOpen,
  setIsSynopsisOpen,
  isMobile = false,
}: HeroControlsProps) {
  return (
    <div
      className={`flex flex-col gap-3 md:gap-4 relative w-full ${
        isMobile ? "items-start" : "items-end"
      }`}
      onMouseEnter={() => !isMobile && setIsSynopsisOpen(true)}
      onMouseLeave={() => !isMobile && setIsSynopsisOpen(false)}
    >
      <div className="h-[38px] px-5 rounded-full border border-primary text-primary font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-wider select-none bg-surface flex items-center justify-center">
        3 min read
      </div>

      <button
        onClick={() => setIsSynopsisOpen(!isSynopsisOpen)}
        className="h-[38px] px-5 rounded-full border border-primary text-primary hover:bg-surface font-sans font-medium text-[11px] md:text-[12px] flex items-center gap-2 cursor-pointer transition-all duration-300 select-none uppercase tracking-wider"
      >
        <span>Synopsis</span>
        <motion.span
          animate={{ rotate: isSynopsisOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-[9px]"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isSynopsisOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`overflow-hidden w-full md:w-[340px] ${
              isMobile ? "text-left" : "text-right"
            }`}
          >
            <div className="pt-2 pb-4 font-sans text-[13px] leading-[20px] text-foreground/70 text-left md:text-right">
              A selection of structural and spatial design work encompassing packaging, point-of-sale displays, spatial environments, and 3D collateral visual storytelling.
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function StructuralDesignClient() {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isSynopsisOpen, setIsSynopsisOpen] = useState(false);
  const hasAutoActivatedRef = useRef(false);
  const hasManuallyToggledRef = useRef(false);
  const otherScrollContainerRef = useRef<HTMLDivElement>(null);

  const otherCaseStudies = caseStudyCards.filter(
    (card) => card.href !== "/structural-design"
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (!hasAutoActivatedRef.current && !hasManuallyToggledRef.current && !isReadingMode) {
          hasAutoActivatedRef.current = true;
          setIsReadingMode(true);
        }
      } else {
        if (isReadingMode) {
          setIsReadingMode(false);
        }
        hasAutoActivatedRef.current = false;
        hasManuallyToggledRef.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isReadingMode]);

  return (
    <PasswordGuard title="Structural Design: Packaging, POS & Spatial Experiences">
      <div
        className={`case-study-container w-full min-h-screen bg-background text-foreground selection:bg-primary selection:text-background ${
          isReadingMode ? "reading-mode" : ""
        }`}
      >
        <Navbar />

        {/* HERO SECTION */}
        <section className="relative w-full pt-32 pb-12 md:pt-40 md:pb-16">
          <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
              {/* Left Title Area */}
              <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 text-left">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-secondary font-sans text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
                    CASE STUDY / STRUCTURAL &amp; SPATIAL
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-primary/10 text-primary font-sans text-[10px] md:text-[11px] font-semibold uppercase tracking-wider">
                    Web &amp; UX/UI Design
                  </span>
                </div>
                <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-primary font-normal tracking-tight">
                  Structural Design: Packaging, POS &amp; Spatial Experiences
                </h1>
                <p className="font-sans text-[15px] sm:text-[17px] leading-[26px] text-foreground/75 font-normal max-w-[700px] mt-2">
                  A selection of structural and spatial design work encompassing packaging, point-of-sale displays, spatial environments, and 3D collateral visual storytelling.
                </p>
              </div>

              {/* Right Controls - Desktop Only */}
              <div className="hidden lg:flex lg:col-span-4 flex-col items-end gap-4">
                <HeroControls
                  isSynopsisOpen={isSynopsisOpen}
                  setIsSynopsisOpen={setIsSynopsisOpen}
                />
              </div>

              {/* Metadata Grid */}
              <div className="col-span-1 lg:col-span-12 border-t border-border pt-8 mt-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
                <div className="flex flex-col gap-1.5">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                    Discipline
                  </span>
                  <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                    <p>Structural Design</p>
                    <p>Packaging &amp; POS</p>
                    <p>Spatial Environments</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                    Focus Areas
                  </span>
                  <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                    <p>3D Structure &amp; Layout</p>
                    <p>Material &amp; Finishing</p>
                    <p>Brand Touchpoints</p>
                  </div>
                </div>

                <div className="flex flex-col gap-1.5 col-span-2 md:col-span-2">
                  <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                    Tags
                  </span>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {structuralTags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-surface border border-border text-[11px] font-sans text-primary font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Controls - Mobile Only */}
              <div className="flex lg:hidden col-span-1 flex-col items-start gap-4 mt-4">
                <HeroControls
                  isSynopsisOpen={isSynopsisOpen}
                  setIsSynopsisOpen={setIsSynopsisOpen}
                  isMobile
                />
              </div>
            </div>
          </div>
        </section>

        {/* FULL-WIDTH CONTINUOUS STRUCTURAL IMAGE STACK */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInVariants}
          className="w-full py-8 md:py-16 border-t border-border"
        >
          <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(88vw,1440px)] flex flex-col gap-6 md:gap-10">
            {structuralImages.map((src, index) => (
              <div key={src} className="w-full">
                <img
                  src={src}
                  alt={`Structural Design artwork ${index + 1}`}
                  className="w-full h-auto block rounded-xl md:rounded-2xl"
                  loading={index < 2 ? "eager" : "lazy"}
                />
              </div>
            ))}
          </div>
        </motion.section>

        {/* OTHER CASE STUDIES CAROUSEL */}
        <section
          id="projects"
          className={`w-full rounded-[48px] md:rounded-[110px] pt-12 pb-24 md:pt-20 md:pb-36 relative overflow-hidden z-[1] mt-12 md:mt-24 transition-colors duration-500 ${
            isReadingMode
              ? "bg-white border border-border"
              : "bg-secondary-bg"
          }`}
        >
          <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] mb-8">
            <div className="flex flex-col gap-4 text-left">
              <span
                className={`inline-block px-4 py-1.5 rounded-full font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit ${
                  isReadingMode
                    ? "bg-primary/10 text-primary"
                    : "bg-secondary/15 text-secondary"
                }`}
              >
                Other Projects
              </span>
              <h2
                className={`font-serif text-[42px] md:text-[64px] leading-[1.05] font-normal tracking-tight ${
                  isReadingMode ? "text-primary" : "text-secondary"
                }`}
              >
                Other Case Studies
              </h2>
            </div>
          </div>

          <div className="relative group w-full z-20">
            <button
              onClick={() => {
                const container = otherScrollContainerRef.current;
                if (container) {
                  const cardWidth = container.firstElementChild?.firstElementChild?.clientWidth || 400;
                  container.scrollBy({ left: -cardWidth - 40, behavior: "smooth" });
                }
              }}
              className="absolute left-4 md:left-[min(6vw,80px)] top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 h-14 rounded-full bg-secondary text-secondary-bg hover:bg-secondary/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer select-none hidden md:flex"
              aria-label="Scroll left"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={() => {
                const container = otherScrollContainerRef.current;
                if (container) {
                  const cardWidth = container.firstElementChild?.firstElementChild?.clientWidth || 400;
                  container.scrollBy({ left: cardWidth + 40, behavior: "smooth" });
                }
              }}
              className="absolute right-4 md:right-[min(6vw,80px)] top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 h-14 rounded-full bg-secondary text-secondary-bg hover:bg-secondary/90 shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-auto cursor-pointer select-none hidden md:flex"
              aria-label="Scroll right"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5 md:w-6 md:h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>

            <div
              ref={otherScrollContainerRef}
              className="w-full overflow-x-auto scrollbar-none flex px-4 md:px-[calc((100%-min(76vw,1260px))/2)] scroll-smooth"
            >
              <div className="flex flex-nowrap gap-6 md:gap-10 pb-4">
                {otherCaseStudies.map((card) => (
                  <div
                    key={card.title}
                    className="shrink-0 w-[82vw] md:w-[40vw] max-w-[540px] flex"
                  >
                    <CaseStudyCard
                      title={card.title}
                      description={card.description}
                      videoSrc={card.videoSrc}
                      imageSrc={card.imageSrc}
                      href={card.href}
                      featured={false}
                      tags={card.tags}
                      isProtected={card.isProtected}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <FooterSection />
      </div>
    </PasswordGuard>
  );
}
