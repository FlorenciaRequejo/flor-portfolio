"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/hero/FooterSection";
import CaseStudyCard from "@/components/hero/CaseStudyCard";
import { caseStudyCards } from "@/lib/caseStudies";

// Animation Variants
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
      {/* Reading Time Pill */}
      <div className="h-[38px] px-5 rounded-full border border-primary text-primary font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-wider select-none bg-surface flex items-center justify-center">
        9 min read
      </div>

      {/* Synopsis Button */}
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

      {/* Synopsis Text Area */}
      <AnimatePresence initial={false}>
        {isSynopsisOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className={`overflow-hidden w-full md:w-[320px] ${
              isMobile ? "text-left" : "text-right"
            }`}
          >
            <div className="pt-2 pb-4 font-sans text-[13px] leading-[20px] text-foreground/70 text-left md:text-right">
              An AI-powered website audit platform that automatically evaluates performance, accessibility, SEO, and visual consistency, translating metrics into clear business tasks.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
}

export default function ConceptToLaunchClient() {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isSynopsisOpen, setIsSynopsisOpen] = useState(false);
  const [justAutoActivated, setJustAutoActivated] = useState(false);
  const hasAutoActivatedRef = useRef(false);
  const hasManuallyToggledRef = useRef(false);

  // Automatically pull existing case studies and exclude the current one
  const otherCaseStudies = caseStudyCards.filter(
    (card) => card.href !== "/concept-to-launch"
  );

    const otherScrollContainerRef = useRef<HTMLDivElement>(null);
const handleToggleReadingMode = (newValue: boolean) => {
    hasManuallyToggledRef.current = true;
    setIsReadingMode(newValue);
    setJustAutoActivated(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        if (!hasAutoActivatedRef.current && !hasManuallyToggledRef.current && !isReadingMode) {
          hasAutoActivatedRef.current = true;
          setIsReadingMode(true);
          setJustAutoActivated(true);
          setTimeout(() => {
            setJustAutoActivated(false);
          }, 3000);
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
    <div
      className={`case-study-container w-full min-h-screen bg-background text-foreground selection:bg-primary selection:text-background ${
        isReadingMode ? "reading-mode" : ""
      }`}
    >
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
            {/* Left Title Area */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 text-left">
              <span className="text-secondary font-sans text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
                CASE STUDY / CONCEPT TO LAUNCH
              </span>
              <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-primary font-normal tracking-tight">
                Concept to Launch: Automating UX, SEO and Performance Audits
              </h1>
            </div>

            {/* Right Controls - Desktop Only */}
            <div className="hidden lg:flex lg:col-span-4 flex-col items-end gap-4">
              <HeroControls
                isSynopsisOpen={isSynopsisOpen}
                setIsSynopsisOpen={setIsSynopsisOpen}
              />
            </div>

            {/* Metadata Grid */}
            <div className="col-span-1 lg:col-span-8 border-t border-border pt-8 mt-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Role
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>Product Designer</p>
                  <p>AI Engineer</p>
                  <p>Full-Stack Developer</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Timeline
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>4 Months</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Technologies
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>React, FastAPI</p>
                  <p>Python, OpenAI</p>
                  <p>Tailwind CSS</p>
                  <p>Docker, AWS</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Client
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>AuditBuilder Inc.</p>
                </div>
              </div>
            </div>

            {/* Controls - Mobile Only */}
            <div className="flex lg:hidden col-span-1 flex-col items-start gap-4 mt-6">
              <HeroControls
                isSynopsisOpen={isSynopsisOpen}
                setIsSynopsisOpen={setIsSynopsisOpen}
                isMobile
              />
            </div>
          </div>
        </div>
      </section>

      {/* INTRO SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          {/* Challenge / Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-left">
            <div className="space-y-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                The Challenge
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-primary leading-tight font-normal">
                Slow Manual Reviews & Scalability Constraints
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                Conducting website reviews manually is historically slow and expensive. Analysts had to manually check hundreds of indicators across performance benchmarks, SEO configurations, and visual structures. Compiling audit recommendations took hours, which constrained the team from scaling reviews to multi-site structures or directories.
              </p>
            </div>

            <div className="space-y-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                The Solution
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-primary leading-tight font-normal">
                Automated Crawlers & AI recommendation Engine
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                We designed an event-driven audit engine built on Python worker nodes. The system crawls client pages, parses DOM configurations, triggers performance diagnostics, and formats raw data. This data is processed through custom AI models, compiling clear, customized optimizations in real time and displaying results in an interactive dashboard.
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-[24px] md:rounded-[36px] overflow-hidden border border-border mt-8">
            <Image
              src="/End To End Product Thinking.jpg"
              alt="AuditBuilder Platform Concept Mockup"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 85vw"
              className="object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* STAGE 01 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                Stage 01
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Problem Discovery & System Mapping
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <p>
                We began by listing all audit rules and metrics used during manual tests. We mapped how crawler packets would capture accessibility, speed, visual layout elements, and text structure.
              </p>
              <p>
                Structuring the data schema precisely was critical to ensure that when crawling is completed, the inputs are clean enough to be read and evaluated by the AI recommendations model.
              </p>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] rounded-[24px] md:rounded-[36px] overflow-hidden border border-border">
            <Image
              src="/case-study-poster.png"
              alt="System mapping illustration"
              fill
              sizes="(max-width: 768px) 100vw, 85vw"
              className="object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* STAGE 02 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                Stage 02
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Prototyping & AI Ingestion Prompts
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <p>
                We spent multiple iterations designing prompt structures to guide output generations. We tested visual layouts and colors system, ensuring technical code inputs compile into clear, readable paragraphs.
              </p>
              <p>
                The UI layout was shaped around simplicity, creating responsive dashboards to show raw audit figures alongside their corresponding AI advice packages.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[3/4] rounded-[24px] md:rounded-[36px] overflow-hidden border border-border">
              <Image
                src="/Ux and User Experience.png"
                alt="UX mockups side portrait"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-[24px] md:rounded-[36px] overflow-hidden border border-border">
              <Image
                src="/placeholder.jpg"
                alt="UI patterns view"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* STAGE 03 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                Stage 03
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Core AI Integration & Engine
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <p>
                We built automated crawler scripts to scan site code, test link hierarchies, check loading benchmarks, verify accessibility tags, and measure mobile performance indexes.
              </p>
              <p>
                This structured diagnostic information is formatted and analyzed through OpenAI LLMs. The recommendations are categorized, stored, and sent immediately to Vercel production servers.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* STAGE 04 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                Stage 04
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Reporting System & Dashboards
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <p>
                We built a responsive web interface to display results. Score meters, issue listings, and priority recommendations let users analyze what needs immediate action.
              </p>
              <p>
                We built PDF report generation scripts, allowing users to export results and share clear optimization lists with developers and project coordinators instantly.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* STAGE 05 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                Stage 05
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Release & Platform Launch
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <p>
                We conducted scale tests on the background database queues, verifying parser performance when scanning hundreds of pages simultaneously.
              </p>
              <p>
                The backend crawler nodes were optimized to limit host requests, ensuring the auditing platform scales smoothly without triggering server firewalls.
              </p>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] rounded-[24px] md:rounded-[36px] overflow-hidden border border-border">
            <Image
              src="/placeholder.jpg"
              alt="Dashboard in production release"
              fill
              sizes="(max-width: 768px) 100vw, 85vw"
              className="object-cover"
            />
          </div>
        </div>
      </motion.section>

      {/* TECH STACK PILLS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-12 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] text-left space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-surface text-primary font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit select-none">
            Technologies Used
          </span>
          <div className="flex flex-wrap gap-2 md:gap-3 max-w-4xl">
            {[
              "Python",
              "React",
              "Next.js",
              "FastAPI",
              "OpenAI API",
              "AWS",
              "Vercel",
              "Tailwind CSS",
              "PostgreSQL",
              "Docker",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full border border-primary text-primary font-sans font-medium text-[11px] md:text-[13px] bg-surface hover:bg-[var(--cs-primary)]/10 transition-colors duration-200 cursor-default select-none whitespace-nowrap"
              >
                {tech}
              </span>
            ))}
          </div>
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
                isReadingMode ? "bg-primary/10 text-primary" : "bg-secondary/15 text-secondary"
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

          {/* Carousel Wrapper with Arrows on Hover */}
        <div className="relative group w-full z-20">
          {/* Left Arrow */}
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

          {/* Right Arrow */}
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
                />
              </div>
            ))}
          </div>
        </div>
        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <FooterSection />


    </div>
  );
}
