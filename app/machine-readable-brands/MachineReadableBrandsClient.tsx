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

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
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
      className={`flex flex-col gap-3 md:gap-4 relative w-full ${isMobile ? "items-start" : "items-end"}`}
      onMouseEnter={() => !isMobile && setIsSynopsisOpen(true)}
      onMouseLeave={() => !isMobile && setIsSynopsisOpen(false)}
    >
      {/* Reading Time Pill */}
      <div className="h-[38px] px-5 rounded-full border border-primary text-primary font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-wider select-none bg-surface flex items-center justify-center">
        5 min read
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
            className={`overflow-hidden w-full md:w-[320px] ${isMobile ? "text-left" : "text-right"}`}
          >
            <div className="pt-2 pb-4 font-sans text-[13px] leading-[20px] text-foreground/70 text-left md:text-right">
              Brand decisions are usually locked in static PDF documents or Figma artboards. This project details the design and architecture of a software tool that bridges visual branding and programmatic workflows, translating style variables into human-and-AI-friendly Markdown and JSON schemas.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
}

export default function MachineReadableBrandsClient() {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isSynopsisOpen, setIsSynopsisOpen] = useState(false);
  const [justAutoActivated, setJustAutoActivated] = useState(false);
  const hasAutoActivatedRef = useRef(false);
  const hasManuallyToggledRef = useRef(false);

  // Filter case study cards list to exclude current route
  const otherCaseStudies = caseStudyCards.filter(
    (card) => card.href !== "/machine-readable-brands"
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
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 text-left font-sans">
              <span className="text-secondary text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
                AI PRODUCT + DESIGN SYSTEMS
              </span>
              <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-primary font-normal tracking-tight">
                Making Brands Machine-Readable
              </h1>
            </div>

            {/* Right Controls - Desktop Only */}
            <div className="hidden lg:flex lg:col-span-4 flex-col items-end gap-4">
              <HeroControls
                isSynopsisOpen={isSynopsisOpen}
                setIsSynopsisOpen={setIsSynopsisOpen}
              />
            </div>

            {/* Introduction Blurb */}
            <div className="col-span-1 lg:col-span-8 border-t border-border pt-8 mt-4 text-left">
              <p className="font-serif text-[20px] md:text-[24px] leading-relaxed text-primary font-light max-w-3xl">
                Brand guidelines were designed to be read. I wanted to explore what happens when they are designed to be used — by designers, developers, and AI systems working from the same source of truth.
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="col-span-1 lg:col-span-8 border-t border-border pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Competencies
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>Systems Thinking</p>
                  <p>Design Systems</p>
                  <p>AI Infrastructure</p>
                  <p>Product Design</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Timeline
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>3 Months (Evolving)</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Deliverables
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>System Architecture</p>
                  <p>JSON Schema Schema</p>
                  <p>React Web Interface</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Tech Stack
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>Next.js / TypeScript</p>
                  <p>Figma Tokens</p>
                  <p>Markdown / JSON</p>
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

      {/* FEATURED HERO VISUAL */}
      <section className="w-full pb-16">
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <div className="relative w-full aspect-[16/9] rounded-[24px] md:rounded-[36px] overflow-hidden border border-border bg-surface">
            <Image
              src="/machine-readable-brands-hero.png"
              alt="Visual Brand System to JSON/Markdown representation"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 76vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* THE PROBLEM SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                01. The Problem
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Brand Guidelines Were Never Designed for AI
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <p>
                Traditional brand guidelines communicate decisions visually or through descriptive prose. However, automated development workflows and generative AI tools (such as Claude or GPT) require explicit, structured parameters, not design PDFs.
              </p>
              <p>
                As AI becomes integrated into design production pipelines, teams risk repeatedly writing custom prompts, maintaining duplicated instruction sets, and producing highly inconsistent visual outputs. The challenge lay in translating human decisions into structured code datasets.
              </p>
            </div>
          </div>

          {/* Workflow Diagram Blocks */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 text-left">
            {/* Before Block */}
            <div className="p-8 rounded-[24px] bg-surface border border-border space-y-6">
              <h3 className="font-serif text-[22px] md:text-[26px] text-primary border-b border-border pb-3">
                Before: The Static Loop
              </h3>
              <div className="space-y-4 font-sans text-[13px] tracking-wide">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-mono">STEP 1</span>
                  <p className="text-foreground/70">PDF / Figma guidelines created as locked documentation.</p>
                </div>
                <div className="text-[10px] text-foreground/70/45 pl-14">↓</div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-mono">STEP 2</span>
                  <p className="text-foreground/70">Human manual interpretation required for each code file.</p>
                </div>
                <div className="text-[10px] text-foreground/70/45 pl-14">↓</div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-mono">STEP 3</span>
                  <p className="text-foreground/70">Repeatedly prompt AI engines manually with style definitions.</p>
                </div>
                <div className="text-[10px] text-foreground/70/45 pl-14">↓</div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 font-mono">OUTPUT</span>
                  <p className="font-semibold text-red-400">Inconsistent assets, custom layouts, and style drift.</p>
                </div>
              </div>
            </div>

            {/* After Block */}
            <div className="p-8 rounded-[24px] bg-surface border border-border space-y-6">
              <h3 className="font-serif text-[22px] md:text-[26px] text-primary border-b border-border pb-3">
                After: Machine-Readable System
              </h3>
              <div className="space-y-4 font-sans text-[13px] tracking-wide">
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-secondary font-mono">STEP 1</span>
                  <p className="text-foreground/70">Brand identity configured as variables in a visual editor.</p>
                </div>
                <div className="text-[10px] text-foreground/70/45 pl-14">↓</div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-secondary font-mono">STEP 2</span>
                  <p className="text-foreground/70">Instantly exported into structured Markdown and JSON config files.</p>
                </div>
                <div className="text-[10px] text-foreground/70/45 pl-14">↓</div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-secondary font-mono">STEP 3</span>
                  <p className="text-foreground/70">Designers, developers, and AI agents reference the same code source.</p>
                </div>
                <div className="text-[10px] text-foreground/70/45 pl-14">↓</div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-0.5 rounded bg-green-500/10 text-secondary font-mono">OUTPUT</span>
                  <p className="font-semibold text-secondary">Consistent, programmatically compliant assets at scale.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* THE PRODUCT IDEA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border bg-surface/20"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                02. The Product Concept
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                From Documentation to Infrastructure
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
              <p>
                I designed a modular system that handles brand values as configuration matrices rather than guidelines text. The editor outputs structured JSON keys that feed directly into software and codebases, changing brand guidelines into executable code infrastructure.
              </p>
            </div>
          </div>

          {/* Module Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left mt-8 font-sans">
            {[
              { title: "Identity", desc: "Core identifiers: naming rules, brand hierarchy, product pillars, and logo permissions." },
              { title: "Logo", desc: "Explicit dimensions: exclusion zones, file variations, positioning constraints, and background rules." },
              { title: "Colour", desc: "Semantic paint matrices: core values, usage splits, background matching, and accessibility scores." },
              { title: "Typography", desc: "Semantic hierarchies: font pairings, line weight mappings, scaling steps, and line heights." },
              { title: "Grid & Spacing", desc: "Structural margins: layout paddings, column numbers, gutter sizing, and element spacing." },
              { title: "Radius & Shadow", desc: "Interface styling: corner roundness arrays, light angles, depths, and blur states." },
              { title: "Imagery", desc: "Asset standards: composition grid, lighting temperature, focal limits, and contrast ratios." },
              { title: "Components", desc: "Modular building blocks: button scales, inputs, margins, and active states." },
              { title: "Voice & Language", desc: "Copywriting constraints: target reading scores, tone ranges, and prohibited terminology." }
            ].map((mod, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[20px] bg-surface border border-border space-y-2 hover:border-primary/40 transition-colors duration-300"
              >
                <h4 className="font-serif text-[18px] text-primary font-medium">{mod.title}</h4>
                <p className="text-[13px] leading-[20px] text-foreground/70 font-light">{mod.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SYSTEM ARCHITECTURE & WORKFLOW */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="text-left space-y-3">
            <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
              03. Programmatic Pipeline
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
              One System. Multiple Users.
            </h2>
            <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light max-w-3xl">
              This system does not replace human creators. It is designed to optimize human-AI collaboration: designers define constraints, software runs the production, and AI generates outputs that remain fully reviewable against the original instructions.
            </p>
          </div>

          {/* Workflow Blocks Layout */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 text-left mt-8 font-sans">
            {[
              { step: "01", name: "Define", desc: "Designers configure rules inside the modular interface." },
              { step: "02", name: "Structure", desc: "The engine formats design definitions into structured schemas." },
              { step: "03", name: "Export", desc: "Config files generate Markdown and JSON files on changes." },
              { step: "04", name: "Distribute", desc: "Engineers and AI agents pull the updated source variables." },
              { step: "05", name: "Review", desc: "Compiled code is audited automatically against style margins." }
            ].map((wf, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[20px] bg-surface border border-border flex flex-col justify-between min-h-[180px] relative"
              >
                <div className="absolute top-4 right-4 text-[12px] font-mono text-primary/40 font-bold">{wf.step}</div>
                <div>
                  <h4 className="text-[16px] font-bold text-primary mb-2">{wf.name}</h4>
                  <p className="text-[12px] leading-[18px] text-foreground/70 font-light">{wf.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* DESIGNING FOR CONSISTENCY */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                04. Flexible Guidelines
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Rules Create Freedom, Not Repetition
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
              <p>
                Visual systems require adaptability. Rather than locking down strict asset layouts, the programmatic guidelines divide rules into two fields: global rules (retained universally) and local rules (allowing custom graphic creation).
              </p>
            </div>
          </div>

          {/* Grid Split */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left mt-8">
            <div className="p-8 rounded-[24px] bg-surface border border-border space-y-6">
              <h4 className="font-serif text-[22px] text-primary font-medium border-b border-border pb-2">Global Rules (Programmatic Core)</h4>
              <p className="font-sans text-[13px] leading-[20px] text-foreground/70 font-light">
                Rules that remain completely unchanged across all assets to guarantee continuity:
              </p>
              <ul className="space-y-2 font-mono text-[12px] text-primary/80">
                <li>· Hex color code mappings</li>
                <li>· Font weight & heading hierarchies</li>
                <li>· Standard spacing grids (e.g. 8px scale)</li>
                <li>· Naming conventions & voice standards</li>
                <li>· Logo proportions & scale limits</li>
              </ul>
            </div>

            <div className="p-8 rounded-[24px] bg-surface border border-border space-y-6">
              <h4 className="font-serif text-[22px] text-primary font-medium border-b border-border pb-2">Local Flexibility (Creative Layouts)</h4>
              <p className="font-sans text-[13px] leading-[20px] text-foreground/70 font-light">
                Parameters that visual templates alter dynamically depending on the medium:
              </p>
              <ul className="space-y-2 font-mono text-[12px] text-primary/80">
                <li>· Component compositions & alignment</li>
                <li>· Imagery context choices</li>
                <li>· Copy content structures</li>
                <li>· Decorative shapes & graphic patterns</li>
                <li>· Grid column span distributions</li>
              </ul>
            </div>
          </div>
        </div>
      </motion.section>

      {/* PROVING THE SYSTEM */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="text-left space-y-3">
            <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
              05. System Validation
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
              Can the System Control the Output?
            </h2>
            <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light max-w-3xl">
              I tested the validity of our system by generating mock assets for the Bite project. The guidelines are exported into JSON/Markdown formatting, parsed by code, and evaluated against dynamic layout standards to review structural compliance.
            </p>
          </div>

          {/* Compliance Matrix Graphic placeholders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-left font-sans mt-8">
            {[
              { type: "Social Post", status: "96% Compliant", issues: "No layout overlaps" },
              { type: "Website Section", status: "100% Compliant", issues: "Contrast checked" },
              { type: "Campaign Graphic", status: "92% Compliant", issues: "Margins verified" },
              { type: "Product UI", status: "98% Compliant", issues: "Spacing validated" },
              { type: "Marketing Banner", status: "94% Compliant", issues: "Typography scaling ok" }
            ].map((item, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[16px] bg-surface border border-border space-y-3 flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-secondary">{item.type}</span>
                  <p className="font-serif text-[18px] text-primary mt-1 font-semibold">{item.status}</p>
                </div>
                <p className="text-[11px] text-foreground/70 font-light">{item.issues}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* WHAT I OWNED */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                06. Contributions
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Designing the Product & System Architecture
              </h2>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 font-sans text-[14px] text-foreground/70 font-light">
              <div className="space-y-2">
                <p>· Problem Identification</p>
                <p>· Product Strategy & Pitch</p>
                <p>· Information Architecture</p>
                <p>· System Schema Design</p>
                <p>· UX/UI Mockups</p>
              </div>
              <div className="space-y-2">
                <p>· Custom Design System</p>
                <p>· AI Prompt Engineering</p>
                <p>· React Prototyping</p>
                <p>· Asset Pipeline Testing</p>
                <p>· Validation Frameworks</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CURRENT STATUS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12 text-left">
          <div className="space-y-3">
            <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
              07. The Future
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
              The Product is Still Evolving
            </h2>
            <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light max-w-3xl">
              Currently, the core workflow (Define → Structure → Export → Connect → Generate → Review) is operational. The next stage involves onboarding external design teams, testing validation tolerances, and refining the review compiler.
            </p>
          </div>

          <div className="p-8 rounded-[24px] border border-primary/20 bg-surface/10 text-center space-y-3">
            <h4 className="font-sans text-[11px] uppercase tracking-widest text-secondary font-bold">Open Closing Question</h4>
            <p className="font-serif text-[24px] md:text-[32px] leading-tight text-primary">
              “What happens when brand guidelines stop being documents and become infrastructure?”
            </p>
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
