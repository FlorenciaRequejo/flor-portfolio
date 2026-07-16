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
  isReadingMode: boolean;
  setIsReadingMode: (mode: boolean) => void;
  isMobile?: boolean;
  justAutoActivated?: boolean;
}

function HeroControls({
  isSynopsisOpen,
  setIsSynopsisOpen,
  isReadingMode,
  setIsReadingMode,
  isMobile = false,
  justAutoActivated = false,
}: HeroControlsProps) {
  return (
    <div
      className={`flex flex-col gap-3 md:gap-4 relative w-full ${isMobile ? "items-start" : "items-end"}`}
      onMouseEnter={() => !isMobile && setIsSynopsisOpen(true)}
      onMouseLeave={() => !isMobile && setIsSynopsisOpen(false)}
    >
      {/* Reading Time Pill */}
      <div className="h-[38px] px-5 rounded-full border border-[var(--cs-primary)] text-[var(--cs-primary)] font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-wider select-none bg-[var(--cs-accent-bg)] flex items-center justify-center">
        6 min read
      </div>

      {/* Synopsis Button */}
      <button
        onClick={() => setIsSynopsisOpen(!isSynopsisOpen)}
        className="h-[38px] px-5 rounded-full border border-[var(--cs-primary)] text-[var(--cs-primary)] hover:bg-[var(--cs-accent-bg)] font-sans font-medium text-[11px] md:text-[12px] flex items-center gap-2 cursor-pointer transition-all duration-300 select-none uppercase tracking-wider"
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
            <div className="pt-2 pb-4 font-sans text-[13px] leading-[20px] text-[var(--cs-muted)] text-left md:text-right">
              Proactive Content Creation from an SEO Strategy: design and development of an AI content automation engine, connecting keyword strategies to automatic article draft generation.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading Mode Toggle */}
      <div className="flex items-center gap-3 mt-2 relative">
        <span className="font-sans text-[11px] uppercase tracking-wider text-[var(--cs-primary)] select-none">
          Reading Mode
        </span>
        <div className="relative flex items-center">
          <motion.button
            onClick={() => setIsReadingMode(!isReadingMode)}
            className={`w-[50px] h-[26px] rounded-full border p-0.5 relative transition-colors duration-300 flex items-center cursor-pointer ${isReadingMode
              ? "bg-black border-black"
              : "bg-transparent border-[var(--cs-primary)]"
              }`}
            aria-label="Toggle Reading Mode"
            animate={justAutoActivated ? {
              x: [0, -4, 4, -4, 4, 0],
              scale: [1, 1.1, 1.1, 1.1, 1],
            } : {}}
            transition={justAutoActivated ? { duration: 0.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] } : {}}
          >
            <motion.div
              layout
              className={`w-5 h-5 rounded-full ${isReadingMode ? "bg-white" : "bg-[var(--cs-primary)]"
                }`}
              animate={{
                x: isReadingMode ? 22 : 0,
              }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </motion.button>
          
          {/* Pulsing ring animation */}
          {justAutoActivated && (
            <motion.span
              initial={{ scale: 0.8, opacity: 0.8 }}
              animate={{ scale: 1.6, opacity: 0 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 rounded-full border-2 border-[var(--cs-primary)] pointer-events-none"
            />
          )}
        </div>

        {/* Floating Tooltip */}
        <AnimatePresence>
          {justAutoActivated && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.8 }}
              className="absolute bottom-full mb-3 bg-[var(--cs-primary)] text-[var(--cs-bg)] px-3 py-1.5 rounded text-[10px] uppercase tracking-wider font-semibold font-sans pointer-events-none shadow-lg z-50 whitespace-nowrap"
              style={{
                transformOrigin: isMobile ? "bottom left" : "bottom right",
                left: isMobile ? "0" : "auto",
                right: isMobile ? "2px" : "auto",
              }}
            >
              Auto-Activated!
              {/* Little arrow */}
              <div 
                className="absolute top-full border-4 border-transparent"
                style={{
                  borderTopColor: "var(--cs-primary)",
                  left: isMobile ? "20px" : "auto",
                  right: isMobile ? "auto" : "20px",
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function ContinuousContentPage() {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isSynopsisOpen, setIsSynopsisOpen] = useState(false);
  const [justAutoActivated, setJustAutoActivated] = useState(false);
  const hasAutoActivatedRef = useRef(false);
  const hasManuallyToggledRef = useRef(false);

  // Filter case study cards list to exclude current route
  const otherCaseStudies = caseStudyCards.filter(
    (card) => card.href !== "/continuous-content"
  );

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
      className={`case-study-container w-full min-h-screen bg-[var(--cs-bg)] text-[var(--cs-text)] selection:bg-[var(--cs-primary)] selection:text-[var(--cs-bg)] ${isReadingMode ? "reading-mode" : ""
        }`}
    >
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
            {/* Left Title Area */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 text-left font-sans">
              <span className="text-[var(--cs-highlight)] text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
                CASE STUDY / AI AUTOMATION • PRODUCT DESIGN
              </span>
              <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-[var(--cs-primary)] font-normal tracking-tight">
                Proactive Content Creation from an SEO Strategy
              </h1>
            </div>

            {/* Right Controls - Desktop Only */}
            <div className="hidden lg:flex lg:col-span-4 flex-col items-end gap-4">
              <HeroControls
                isSynopsisOpen={isSynopsisOpen}
                setIsSynopsisOpen={setIsSynopsisOpen}
                isReadingMode={isReadingMode}
                setIsReadingMode={handleToggleReadingMode}
                justAutoActivated={justAutoActivated}
              />
            </div>

            {/* Metadata Grid */}
            <div className="col-span-1 lg:col-span-8 border-t border-[var(--cs-border)] pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--cs-highlight)] font-semibold">
                  Role
                </span>
                <div className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed">
                  <p>Developer</p>
                  <p>Ideation</p>
                  <p>Design</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--cs-highlight)] font-semibold">
                  Timeline
                </span>
                <div className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed">
                  <p>1 Year & Ongoing</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[var(--cs-highlight)] font-semibold">
                  Technology
                </span>
                <div className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed space-y-1">
                  <p>Make · Webhooks · Airtable</p>
                  <p>WordPress · Custom Plugin · functions.php</p>
                  <p>Placid API · OpenAI (ChatGPT) · OpenAI Images</p>
                  <p>Google Gemini · Google Imagen · Leonardo AI · Flux · DALL·E</p>
                </div>
              </div>
            </div>

            {/* Controls - Mobile Only */}
            <div className="flex lg:hidden col-span-1 flex-col items-start gap-4 mt-6">
              <HeroControls
                isSynopsisOpen={isSynopsisOpen}
                setIsSynopsisOpen={setIsSynopsisOpen}
                isReadingMode={isReadingMode}
                setIsReadingMode={handleToggleReadingMode}
                isMobile
                justAutoActivated={justAutoActivated}
              />
            </div>
          </div>
        </div>
      </section>

      {/* MY INVOLVEMENT & THE CHALLENGE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            {/* Left Column: My Involvement */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-[var(--cs-highlight)]">
                My involvement
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                From product ideation to end-to-end execution.
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light mt-2">
                I designed the product strategy, mapped the automation architecture, validated the workflow, built the Make scenarios, developed the WordPress integration, structured the Airtable database and iterated on the product based on real user feedback.
              </p>
            </div>

            {/* Right Column: The Challenge */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-[var(--cs-highlight)]">
                The Challenge
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                How to simplify content creation
              </h2>
              <div className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light space-y-4">
                <p>
                  Small businesses know they should be publishing content, but most don't have the time, confidence or resources to do it consistently.
                </p>
                <p>
                  The original challenge was to simplify content creation enough that anyone could generate social media posts in minutes. The bigger challenge, discovered after launch, was that content creation wasn't actually the problem.
                </p>
              </div>
            </div>
          </div>

          {/* Placeholder Workflow Image */}
          <div className="mt-12">
            <div className="relative w-full aspect-[16/9] rounded-[24px] md:rounded-[36px] overflow-hidden border border-[var(--cs-border)] bg-[var(--cs-accent-bg)]/20 flex flex-col items-center justify-center gap-2 select-none min-h-[300px]">
              <span className="text-[var(--cs-primary)] font-serif text-[24px]">Workflow Automation Architecture</span>
              <span className="text-[var(--cs-muted)] font-sans text-[13px]">Placeholder Visual</span>
            </div>
          </div>
        </div>
      </motion.section>

      {/* REFRAMING THE PROBLEM */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-[var(--cs-highlight)]">
                02. Reframing the Strategy
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                What if the System Didn't Wait for the Client?
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light">
              <p>
                Most content platforms depend on the user remembering to log in, identify keywords, draft copy, and schedule publishing. I reframed the platform around proactive content automation. Instead of asking busy business owners to operate a portal, the system evaluates strategy in the background and drops ready-to-approve assets directly into their workflow.
              </p>
            </div>
          </div>

          {/* Before vs After comparative loop */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8 text-left font-sans">
            <div className="p-8 rounded-[24px] bg-[var(--cs-accent-bg)] border border-[var(--cs-border)] space-y-4">
              <span className="text-[11px] uppercase tracking-widest text-[#FFB6C1] font-bold">Reactive Workflow (Typical Tools)</span>
              <div className="flex items-center gap-2 text-[13px] text-[var(--cs-muted)]">
                <span>Login</span> · <span>Find Topic</span> · <span>Draft Copy</span> · <span>Review Errors</span> · <span>Publish</span>
              </div>
              <p className="text-[12px] text-[var(--cs-muted)] font-light italic">Result: Project is abandoned within the first month due to cognitive fatigue.</p>
            </div>

            <div className="p-8 rounded-[24px] bg-[var(--cs-accent-bg)] border border-[var(--cs-border)] space-y-4">
              <span className="text-[11px] uppercase tracking-widest text-[var(--cs-highlight)] font-bold">Proactive Pipeline (This System)</span>
              <div className="flex items-center gap-2 text-[13px] text-[var(--cs-highlight)]">
                <span>Strategy</span> · <span>Extract Topic</span> · <span>Proactive Gen</span> · <span>Inbox Alert</span> · <span>Approval</span>
              </div>
              <p className="text-[12px] text-[var(--cs-muted)] font-light italic">Result: Continuous updates published consistently with under 5 minutes of work.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CONNECTING CONTENT TO STRATEGY */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)] bg-[var(--cs-accent-bg)]/20"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-[var(--cs-highlight)]">
                03. Content Funnel
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                Automation Without Strategy is Just More Content
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light">
              <p>
                AI systems easily produce low-quality noise. To avoid this, our pipeline anchors content creation to structured marketing inputs. Keyword clusters feed directly into blog parameters, ensuring all drafts target strategic business goals.
              </p>
            </div>
          </div>

          {/* Schematic Content Funnel map */}
          <div className="p-8 rounded-[24px] bg-[var(--cs-card-bg)] border border-[var(--cs-border)] text-left space-y-8 font-sans">
            <h4 className="font-serif text-[22px] text-[var(--cs-primary)] font-medium border-b border-[var(--cs-border)] pb-2">Pipeline Content Funnel</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-[12px]">
              <div className="p-4 rounded bg-white/5 border border-white/10 space-y-2">
                <span className="text-[var(--cs-highlight)] font-bold">1. STRATEGY INPUT</span>
                <p className="text-[var(--cs-muted)] font-light">Define target services, business locations, and SEO clusters.</p>
              </div>
              <div className="p-4 rounded bg-white/5 border border-white/10 space-y-2">
                <span className="text-[var(--cs-highlight)] font-bold">2. AUTO GENERATION</span>
                <p className="text-[var(--cs-muted)] font-light">Generate comprehensive blog article drafts and imagery packs.</p>
              </div>
              <div className="p-4 rounded bg-white/5 border border-white/10 space-y-2">
                <span className="text-[var(--cs-highlight)] font-bold">3. SOCIAL DERIVATIVES</span>
                <p className="text-[var(--cs-muted)] font-light">Extract 5 tailored social media posts based on the main draft.</p>
              </div>
              <div className="p-4 rounded bg-white/5 border border-white/10 space-y-2">
                <span className="text-[var(--cs-highlight)] font-bold">4. APPROVAL & POST</span>
                <p className="text-[var(--cs-muted)] font-light">Owner reviews draft in web portal and schedules publishing.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* DESIGNING THE SYSTEM */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="text-left space-y-3">
            <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-[var(--cs-highlight)]">
              04. System Architecture
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
              A Content Operations Pipeline
            </h2>
            <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light max-w-3xl">
              I designed and built the automation pipeline linking databases, serverless webhooks, and generative APIs to output review-ready assets seamlessly.
            </p>
          </div>

          {/* Architecture Map blocks */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left font-sans mt-8">
            <div className="p-6 rounded-[20px] bg-[var(--cs-accent-bg)] border border-[var(--cs-border)] space-y-3">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono">STAGE 1: DB & TOPIC TRIGGER</span>
              <h4 className="font-serif text-[18px] text-[var(--cs-primary)] font-medium">SEO Strategy Database</h4>
              <p className="text-[12px] leading-[18px] text-[var(--cs-muted)] font-light">Airtable stores the keyword registry, target parameters, and publication statuses. Every week, a webhook picks the highest-priority keywords for generation.</p>
            </div>

            <div className="p-6 rounded-[20px] bg-[var(--cs-accent-bg)] border border-[var(--cs-border)] space-y-3">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono">STAGE 2: LLM ENGINE</span>
              <h4 className="font-serif text-[18px] text-[var(--cs-primary)] font-medium">AI Content Generation</h4>
              <p className="text-[12px] leading-[18px] text-[var(--cs-muted)] font-light">Make.com routes requests to GPT-4 to write the article and structure social options, while DALL-E/Midjourney APIs generate corresponding feature images.</p>
            </div>

            <div className="p-6 rounded-[20px] bg-[var(--cs-accent-bg)] border border-[var(--cs-border)] space-y-3">
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-400 text-[10px] font-mono">STAGE 3: NOTIFY & PUBLISH</span>
              <h4 className="font-serif text-[18px] text-[var(--cs-primary)] font-medium">Review App Integration</h4>
              <p className="text-[12px] leading-[18px] text-[var(--cs-muted)] font-light">An email triggers to notify the business owner. They open the web app to edit, approve, or reschedule publishing parameters before WordPress API pushes it live.</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* THE CLIENT EXPERIENCE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-[var(--cs-highlight)]">
                05. UX / UI Design
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                The Complexity Stays Behind the System
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light">
              <p>
                To avoid dashboard fatigue, the interface presents choices rather than actions. The user opens the review card, reads the generated article, selects their favorite social copy variations, clicks accept, and is done.
              </p>
            </div>
          </div>

          {/* Client steps list diagram */}
          <div className="p-8 rounded-[24px] bg-[var(--cs-card-bg)] border border-[var(--cs-border)] text-left space-y-6 font-sans">
            <h4 className="font-serif text-[22px] text-[var(--cs-primary)] font-medium border-b border-[var(--cs-border)] pb-2">The Approval Flow</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-[12px] tracking-wide">
              <div>
                <span className="text-[var(--cs-highlight)] font-bold block mb-1">1. ALERT</span>
                <p className="text-[var(--cs-muted)] font-light">Receive email: "New content drafted for approval."</p>
              </div>
              <div>
                <span className="text-[var(--cs-highlight)] font-bold block mb-1">2. REVIEW</span>
                <p className="text-[var(--cs-muted)] font-light">Read blog draft and compare social post alternatives.</p>
              </div>
              <div>
                <span className="text-[var(--cs-highlight)] font-bold block mb-1">3. MODIFY</span>
                <p className="text-[var(--cs-muted)] font-light">Make quick edits directly in the textual textareas.</p>
              </div>
              <div>
                <span className="text-[var(--cs-highlight)] font-bold block mb-1">4. COMMIT</span>
                <p className="text-[var(--cs-muted)] font-light">Click Approve to queue publication automatically.</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* HUMAN CONTROL AS A PRODUCT DECISION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-8 text-left font-sans">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--cs-accent-bg)] text-[var(--cs-primary)] font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit select-none">
            06. Human Accountability
          </span>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <h3 className="font-serif text-[28px] text-[var(--cs-primary)] leading-tight">Automated Production. Human Accountability.</h3>
              <p className="text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light">
                Although content is drafted autonomously, releasing text without human oversight is a dangerous brand risk. The decision to enforce a manual review step ensures clients remain accountable for published statements, preventing hallucinated parameters from reaching public web feeds.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* WHAT I OWNED */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-[var(--cs-highlight)]">
                07. Contribution
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                From Observed Problem to Product System
              </h2>
            </div>
            <div className="lg:col-span-7 grid grid-cols-2 gap-4 font-sans text-[14px] text-[var(--cs-muted)] font-light">
              <div className="space-y-2">
                <p>· Problem Identification</p>
                <p>· Opportunity Strategy</p>
                <p>· Workflow Architecture</p>
                <p>· SEO-Content Integration</p>
                <p>· AI System Design</p>
              </div>
              <div className="space-y-2">
                <p>· UX/UI Mockups</p>
                <p>· Custom Web App Portal</p>
                <p>· API Webhook Construction</p>
                <p>· System Integrity Testing</p>
                <p>· Validation Frameworks</p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CURRENT STATUS / VALIDATION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12 text-left">
          <div className="space-y-3">
            <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-[var(--cs-highlight)]">
              08. Evolving Status
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
              Building the System is Only the First Hypothesis
            </h2>
            <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light max-w-3xl">
              We are actively testing the pipeline with a cohort of local service business pilots. The next stages are validating which copy layouts require the most editing, observing saved time margins, and measuring organic visibility gains.
            </p>
          </div>

          <div className="p-8 rounded-[24px] border border-[var(--cs-primary)]/20 bg-[var(--cs-accent-bg)]/10 text-center space-y-3">
            <h4 className="font-sans text-[11px] uppercase tracking-widest text-[var(--cs-highlight)] font-bold">The Bigger Opportunity</h4>
            <p className="font-serif text-[24px] md:text-[32px] leading-tight text-[var(--cs-primary)]">
              “The goal wasn't to generate more content. It was to design a system that makes consistent digital presence easier to maintain.”
            </p>
          </div>
        </div>
      </motion.section>

      {/* OTHER CASE STUDIES CAROUSEL */}
      <section
        id="projects"
        className={`w-full rounded-[48px] md:rounded-[110px] pt-12 pb-24 md:pt-20 md:pb-36 relative overflow-hidden z-[1] mt-12 md:mt-24 transition-colors duration-500 ${isReadingMode
            ? "bg-white border border-[var(--cs-border)]"
            : "bg-[#089998]"
          }`}
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] mb-8">
          <div className="flex flex-col gap-4 text-left">
            <span
              className={`inline-block px-4 py-1.5 rounded-full font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit ${isReadingMode
                  ? "bg-[#1B237A]/10 text-[#1B237A]"
                  : "bg-[var(--cs-highlight-bg)] text-[var(--cs-highlight)]"
                }`}
            >
              Other Projects
            </span>
            <h2
              className={`font-serif text-[42px] md:text-[64px] leading-[1.05] font-normal tracking-tight ${isReadingMode ? "text-[#1B237A]" : "text-[var(--cs-highlight)]"
                }`}
            >
              Other Case Studies
            </h2>
          </div>
        </div>

        {/* Carousel Container */}
        <div className="w-full overflow-x-auto scrollbar-none flex px-4 md:px-[calc((100%-min(76vw,1260px))/2)]">
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
      </section>

      {/* FOOTER CTA SECTION */}
      <FooterSection />
    </div>
  );
}
