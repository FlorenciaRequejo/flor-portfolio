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
      className={`flex flex-col gap-3 md:gap-4 relative w-full ${isMobile ? "items-start" : "items-end"
        }`}
      onMouseEnter={() => !isMobile && setIsSynopsisOpen(true)}
      onMouseLeave={() => !isMobile && setIsSynopsisOpen(false)}
    >
      {/* Reading Time Pill */}
      <div className="h-[38px] px-5 rounded-full border border-primary text-primary font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-wider select-none bg-surface flex items-center justify-center">
        8 min read
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
            className={`overflow-hidden w-full md:w-[320px] ${isMobile ? "text-left" : "text-right"
              }`}
          >
            <div className="pt-2 pb-4 font-sans text-[13px] leading-[20px] text-foreground/70 text-left md:text-right">
              Bite is a healthy meal planning concept designed to make affordable eating feel more accessible, enjoyable and less restrictive. This case study explores the creation of the brand from its initial naming and visual direction to the development of a cohesive identity and foundational design system, establishing a flexible visual language that could scale across product and marketing touchpoints.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
}

export default function BrandIdentityPage() {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isSynopsisOpen, setIsSynopsisOpen] = useState(false);
  const [justAutoActivated, setJustAutoActivated] = useState(false);
  const hasAutoActivatedRef = useRef(false);
  const hasManuallyToggledRef = useRef(false);

  // Automatically pull existing case studies and exclude the current one
  const otherCaseStudies = caseStudyCards.filter(
    (card) => card.href !== "/brand-identity"
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
      className={`case-study-container w-full min-h-screen bg-background text-foreground selection:bg-primary selection:text-background ${isReadingMode ? "reading-mode" : ""
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
                CASE STUDY / BRAND IDENTITY
              </span>
              <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-primary font-normal tracking-tight">
                Brand Identity: Visual Language & Design System
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
            <div className="col-span-1 lg:col-span-8 border-t border-border pt-8 mt-4 grid grid-cols-2 md:grid-cols-3 gap-6 text-left">
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Role
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>Creative Director</p>
                  <p>Brand Strategist</p>
                  <p>UI Designer</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Timeline
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>3 Months</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Technologies
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>Figma</p>
                  <p>Adobe Suite</p>
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
                Standing Out in a Crowded Market
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                The healthy food and recipe market is already crowded with brands using similar visual codes and messaging. The challenge was to create a short, memorable name that immediately connected with food, then build a distinctive identity around it that could stand out in the market and scale consistently across a digital product and future marketing touchpoints.
              </p>
            </div>

            <div className="space-y-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                The Solution
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-primary leading-tight font-normal">
                A Playful and Approachable Brand System
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                Bite became the foundation of a playful and approachable brand built around making healthy eating feel accessible rather than restrictive. A bold red and pink palette, expressive typography and a character embedded within the logo established a distinctive visual identity. These elements were then translated into a basic design system, creating the foundations for consistent icons, UI components and marketing assets as the product evolved.
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mt-8">
            <Image
              src="/Tote-Bag.png"
              alt="Bite Brand Identity Tote Bag Mockup"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px]"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </motion.section>

      {/* BRAND VOICE */}
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
                Brand Voice
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Friendly, Playful & Encouraging
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <p>
                Bite's voice is friendly, playful and encouraging. It avoids the restrictive or overly serious language often associated with healthy eating, focusing instead on making meal planning and cooking feel simple, accessible and enjoyable.
              </p>
              <p>
                The tone is direct and conversational, using clear language, short messages and moments of personality to guide users without overwhelming them. Across the product and marketing touchpoints, the voice reinforces Bite as a helpful companion rather than an authority telling people how they should eat.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BRAND IDENTITY */}
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
                Brand Identity
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Standing Out from the Convention
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <p>
                Bite's visual identity was designed to stand out from the conventional visual language of health and nutrition brands. Bold reds, soft pinks, expressive typography and playful shapes create a distinctive system that feels energetic, approachable and recognisable.
              </p>
              <p>
                The logo established the foundation for a broader visual language that expanded into colour, typography, iconography, illustrations and graphic assets. These elements formed a flexible design system capable of maintaining consistency across the product, website and marketing materials.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* BRAND VISUALS SHOWCASE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-8">
          {/* Logo Showcase */}
          <Image
            src="/bite-logos.jpg"
            alt="Bite Logo Guidelines and Variations"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-[24px] md:rounded-[36px]"
            style={{ width: '100%', height: 'auto' }}
          />

          {/* Cards Showcase */}
          <Image
            src="/Bite-Cards.jpg"
            alt="Bite Business Cards Mockup"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-[24px] md:rounded-[36px]"
            style={{ width: '100%', height: 'auto' }}
          />

          {/* 2-Column Grid Showcase */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Image
              src="/bite-freezer.jpg"
              alt="Bite Packaging Freezer Mockup"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px]"
              style={{ width: '100%', height: 'auto' }}
            />
            <Image
              src="/bite-app-mockup.jpg"
              alt="Bite Mobile App UI Mockup"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px]"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          {/* Colors Showcase */}
          <Image
            src="/Bite-Colours.jpg"
            alt="Bite Brand Colors Palette"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-[24px] md:rounded-[36px]"
            style={{ width: '100%', height: 'auto' }}
          />

          {/* Icons Showcase 1 */}
          <Image
            src="/Bite---Icons.jpg"
            alt="Bite Custom Icons Sheet Part 1"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-[24px] md:rounded-[36px]"
            style={{ width: '100%', height: 'auto' }}
          />

          {/* Icons Showcase 2 */}
          <Image
            src="/Bite---Icons-2.jpg"
            alt="Bite Custom Icons Sheet Part 2"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-[24px] md:rounded-[36px]"
            style={{ width: '100%', height: 'auto' }}
          />

          {/* Socials Showcase */}
          <Image
            src="/bite-socials.jpg"
            alt="Bite Social Media Graphics Mockup"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-[24px] md:rounded-[36px]"
            style={{ width: '100%', height: 'auto' }}
          />

          {/* Web Showcase */}
          <Image
            src="/bite-web.jpg"
            alt="Bite Responsive Web Mockup"
            width={0}
            height={0}
            sizes="100vw"
            className="w-full h-auto rounded-[24px] md:rounded-[36px]"
            style={{ width: '100%', height: 'auto' }}
          />
        </div>
      </motion.section>

      {/* FULL BRANDING SYSTEM */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border bg-surface/20"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-stretch text-left">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-center">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                Branding System
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Complete Design & Branding Guidelines
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                The full Bite branding system establishes a robust visual foundation. It defines logo usage rules and color-allowed backgrounds, specifies a semantic and core color system, details typography pairings and scaling, defines layout principles, and includes a comprehensive component design system (buttons, inputs, and forms) along with high-fidelity imagery and icon guidelines.
              </p>
              <div>
                <a
                  href="/BITE-Brand-System.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-[48px] px-8 rounded-full border border-primary text-primary hover:bg-[var(--cs-primary)] hover:text-[var(--cs-bg)] font-sans font-medium text-[12px] uppercase tracking-wider items-center justify-center transition-all duration-300 select-none"
                >
                  View Full Branding System
                </a>
              </div>
            </div>

            {/* Right Image Column */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full min-h-[320px] lg:min-h-full overflow-hidden rounded-[24px] md:rounded-[36px] hover:scale-[1.02] transition-transform duration-500">
                <Image
                  src="/BIte Design System.webp"
                  alt="Bite Complete Branding System Showcase"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
            </div>
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
              "Figma",
              "Adobe Illustrator",
              "Photoshop",
              "Typography System",
              "Design System",
              "Color System",
              "Collateral Assets",
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
        className={`w-full rounded-[48px] md:rounded-[110px] pt-12 pb-24 md:pt-20 md:pb-36 relative overflow-hidden z-[1] mt-12 md:mt-24 transition-colors duration-500 ${isReadingMode
            ? "bg-white border border-border"
            : "bg-secondary-bg"
          }`}
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] mb-8">
          <div className="flex flex-col gap-4 text-left">
            <span
              className={`inline-block px-4 py-1.5 rounded-full font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit ${isReadingMode ? "bg-primary/10 text-primary" : "bg-secondary/15 text-secondary"
                }`}
            >
              Other Projects
            </span>
            <h2
              className={`font-serif text-[42px] md:text-[64px] leading-[1.05] font-normal tracking-tight ${isReadingMode ? "text-primary" : "text-secondary"
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
