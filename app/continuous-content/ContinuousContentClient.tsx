"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/hero/FooterSection";
import CaseStudyCard from "@/components/hero/CaseStudyCard";
import PasswordGuard from "@/components/PasswordGuard";
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
      className={`flex flex-col gap-3 md:gap-4 relative w-full ${isMobile ? "items-start" : "items-end"}`}
      onMouseEnter={() => !isMobile && setIsSynopsisOpen(true)}
      onMouseLeave={() => !isMobile && setIsSynopsisOpen(false)}
    >
      {/* Reading Time Pill */}
      <div className="h-[38px] px-5 rounded-full border border-primary text-primary font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-wider select-none bg-surface flex items-center justify-center">
        6 min read
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
              Proactive Content Creation from an SEO Strategy: design and development of an AI content automation engine, connecting keyword strategies to automatic article draft generation.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
}

export default function ContinuousContentClient() {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isSynopsisOpen, setIsSynopsisOpen] = useState(false);
  const [justAutoActivated, setJustAutoActivated] = useState(false);
  const hasAutoActivatedRef = useRef(false);
  const hasManuallyToggledRef = useRef(false);

  // Filter case study cards list to exclude current route
  const otherCaseStudies = caseStudyCards.filter(
    (card) => card.href !== "/continuous-content"
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
    <PasswordGuard title="Proactive Content Creation from an SEO Strategy">
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
                CASE STUDY / AI AUTOMATION • PRODUCT DESIGN
              </span>
              <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-primary font-normal tracking-tight">
                Proactive Content Creation from an SEO Strategy
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
            <div className="col-span-1 lg:col-span-8 border-t border-border pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Role
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>System Ideation</p>
                  <p>Product Architecture</p>
                  <p>UX Researcher</p>
                  <p>Main Developer</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Timeline
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>1 Year & Ongoing</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5 md:col-span-2">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Technology
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed space-y-1">
                  <p>Automation Tool</p>
                  <p>Webhooks</p>
                  <p>Data Base</p>
                  <p>WordPress · Custom Plugin</p>
                  <p>Various API</p>
                  <p>LLMS</p>
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

      {/* MY INVOLVEMENT & THE CHALLENGE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            {/* Left Column: The Challenge */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                The Challenge
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                How to simplify content creation for <br className="hidden sm:inline" /> Small businesses
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light mt-2">
                Small businesses know they should be publishing content, but most don't have the time, confidence or resources to do it consistently. The challenge was to simplify content creation enough that anyone could generate it. The bigger challenge, discovered after launch, was that content creation wasn't actually the main problem.
              </p>
            </div>

            {/* Right Column: My Involvement */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                My involvement
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                From product ideation to end-to-end execution.
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light mt-2">
                When automation platforms like Make started taking off, I saw an opportunity to rethink how small businesses create marketing content. I came up with the idea, designed the product and built. From mapping the architecture and validating the workflows to developing the Make scenarios, WordPress integration, Airtable database and refining the product through real user feedback.
              </p>
            </div>
          </div>

          {/* Workflow Automation Image */}
          <div className="mt-12">
            <Image
              src="/make.JPG"
              alt="Make workflow automation architecture diagram"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px] border border-border"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </motion.section>

      {/* THE SOLUTION & USER PERSONA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-center">
            {/* Left Column: Image */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <Image
                src="/article-1024x670.webp"
                alt="Small business marketing automation dashboard interface visual"
                width={0}
                height={0}
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="w-full h-auto rounded-[24px] md:rounded-[36px]"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>

            {/* Right Column: Texts */}
            <div className="lg:col-span-6 flex flex-col gap-10">
              {/* Solution Block */}
              <div className="flex flex-col gap-3">
                <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                  The Solution
                </span>
                <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                  A Proactive Content Engine
                </h2>
                <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                  Rather than building another content generator, the project evolved into a proactive marketing system that plans, generates and prepares content automatically while keeping the user in control of publishing.
                </p>
              </div>

              {/* User Persona Block */}
              <div className="flex flex-col gap-3">
                <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                  User Persona
                </span>
                <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                  For small business owners
                </h2>
                <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                  Businesses that invest in marketing but don't have dedicated staff to manage their website or social media. They rarely know what to post, don't understand SEO and struggle to publish consistently while running their business.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* STAGE 01: MAPPING THE ARCHITECTURE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-8">
          {/* Header & Copy block: 100% width */}
          <div className="flex flex-col gap-4 text-left max-w-3xl">
            <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
              Stage 01
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
              Mapping the Architecture
            </h2>
            <div className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <p>
                Before writing a single automation, I designed the complete user journey and system architecture inside Make to validate that the idea was technically possible.
              </p>
              <p>
                The workflow connected user requests with a central Airtable database enriched with company information. It generated branded content and returned ready-to-publish assets for user approval.
              </p>
            </div>
          </div>

          {/* Underneath Image Showcase */}
          <div className="mt-8">
            <Image
              src="/blog-booster.webp"
              alt="Blog post booster dashboard view"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px] border border-border"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </motion.section>

      {/* STAGE 02: DEVELOPMENT & UX RESEARCH */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          {/* Part A: First Prototype */}
          <div className="flex flex-col gap-4 text-left max-w-3xl">
            <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
              02. Stage. Development
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
              First Prototype
            </h2>
            <div className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <p>
                The first version allowed users to submit a content request, automatically generate copy and branded imagery, and review everything from Airtable before publishing.
              </p>
              <p>
                The system successfully automated content production while keeping a human approval step.
              </p>
            </div>
          </div>

          {/* Prototype Image Visual */}
          <div className="mt-8">
            <Image
              src="/first-prototype.webp"
              alt="First prototype Airtable content management and review interface"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px] border border-border"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          {/* Part B: UX Research & Insight Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start pt-8">
            {/* Left Column: UX Research Feedback */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                UX Research
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Although users liked the concept, adoption remained low.
              </h2>
              <div className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
                <p>Feedback consistently pointed to two issues:</p>
                <ul className="list-disc pl-5 space-y-1.5 font-sans">
                  <li>The workflow wasn't intuitive.</li>
                  <li>Users still didn't know what to create or when to create it.</li>
                </ul>
              </div>
            </div>

            {/* Right Column: Key Insight Quote */}
            <div className="lg:col-span-6 flex flex-col lg:pt-16">
              <div className="p-6 md:p-8 rounded-[24px] bg-surface border border-border flex flex-col gap-4">
                <span className="font-sans font-bold text-[11px] md:text-[12px] uppercase tracking-[3px] text-primary">
                  The research revealed a more fundamental insight:
                </span>
                <p className="font-serif text-[24px] md:text-[30px] leading-snug text-primary font-light italic">
                  Businesses that don't post consistently usually don't lack tools, they lack strategy.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* STAGE 03: FROM REACTIVE TO PROACTIVE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-center">
            {/* Left Column: Text Content */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                Stage 03
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                From Reactive to Proactive
              </h2>
              <div className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
                <p>
                  Instead of waiting for users to request content, the product became proactive.
                </p>
                <p>
                  I expanded the Airtable database to include SEO research, keywords, search intent and topic clusters for each business.
                </p>
                <p>
                  Using this SEO Strategy as a base structure, suddently the automation could independently generate:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 font-sans">
                  <li>One GEO focused blog article</li>
                  <li>Five supporting social media posts</li>
                </ul>
                <p>
                  All this branded in look and copy tailored for the company and filled with Metadata ready for publishing supporting the SEO strategy.
                </p>
              </div>
            </div>

            {/* Right Column: Image */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <Image
                src="/blog-booster-app.webp"
                alt="Proactive content generation engine dashboard"
                width={0}
                height={0}
                sizes="(max-width: 1024px) 100vw, 38vw"
                className="w-full h-auto rounded-[24px] md:rounded-[36px]"
                style={{ width: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* STAGE 04: MAKING IT INVISIBLE & OUTCOME */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          {/* Top Two Columns */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            {/* Left Column: Stage 4 */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                Stage 04
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Making it Invisible
              </h2>
              <div className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
                <p>
                  To reduce friction even further, I designed a lightweight interface where users could review generated blogs, preview social posts and schedule publication across multiple social platforms from a single place.
                </p>
                <p className="font-semibold text-primary">
                  The experience shifted from creating content to simply approving it.
                </p>
              </div>
            </div>

            {/* Right Column: Outcome */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary opacity-0 h-0 select-none">
                Outcome
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Outcome
              </h2>
              <div className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                <p>
                  The project evolved from a simple AI content generator into an automated content marketing system that combines SEO strategy, content generation and publishing workflows into a single product.
                </p>
              </div>
            </div>
          </div>

          {/* Underneath Image Visual */}
          <div className="mt-8">
            <Image
              src="/new-prototype.webp"
              alt="Invisible automated content marketing system dashboard preview"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px] border border-border"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </motion.section>

      {/* SKILLS DEMONSTRATED */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-6 text-left">
          <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
            Skills Demonstrated
          </span>
          <div className="flex flex-wrap gap-2 pt-2">
            {[
              "Product Strategy",
              "AI Workflow Design",
              "Automation Architecture",
              "System Thinking",
              "SEO Strategy",
              "Information Architecture",
              "UX Design",
              "Database Design",
              "API Integration",
              "WordPress Development",
              "AI Image Generation",
              "Workflow Optimisation"
            ].map((skill) => (
              <span
                key={skill}
                className="px-4 py-1.5 rounded-full bg-surface border border-border text-[13px] font-sans text-primary font-light select-none"
              >
                {skill}
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
                  isProtected={card.isProtected}
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
    </PasswordGuard>
  );
}
