"use client";

import { useState, useEffect } from "react";
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
      staggerChildren: 0.15,
    },
  },
};

interface HeroControlsProps {
  isSynopsisOpen: boolean;
  setIsSynopsisOpen: (open: boolean) => void;
  isReadingMode: boolean;
  setIsReadingMode: (mode: boolean) => void;
  isMobile?: boolean;
}

function HeroControls({
  isSynopsisOpen,
  setIsSynopsisOpen,
  isReadingMode,
  setIsReadingMode,
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
      <div className="px-4 py-1.5 rounded-full border border-[var(--cs-primary)] text-[var(--cs-primary)] font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-wider select-none bg-[var(--cs-accent-bg)]">
        12 min read
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
            className={`overflow-hidden w-full md:w-[320px] ${
              isMobile ? "text-left" : "text-right"
            }`}
          >
            <div className="pt-2 pb-4 font-sans text-[13px] leading-[20px] text-[var(--cs-muted)] text-left md:text-right">
              Waatea News represents a critical cultural and community broadcasting hub. This case study explores how we decoupled a monolithic legacy setup, automated editorial workflows, migrated 50,000+ historical articles, and deployed a modern UI design system with zero downtime.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reading Mode Toggle */}
      <div className="flex items-center gap-3 mt-2">
        <span className="font-sans text-[11px] uppercase tracking-wider text-[var(--cs-primary)] select-none">
          Reading Mode
        </span>
        <button
          onClick={() => setIsReadingMode(!isReadingMode)}
          className={`w-[50px] h-[26px] rounded-full border p-0.5 relative transition-colors duration-300 flex items-center cursor-pointer ${
            isReadingMode
              ? "bg-black border-black"
              : "bg-transparent border-[var(--cs-primary)]"
          }`}
          aria-label="Toggle Reading Mode"
        >
          <motion.div
            layout
            className={`w-5 h-5 rounded-full ${
              isReadingMode ? "bg-white" : "bg-[var(--cs-primary)]"
            }`}
            animate={{
              x: isReadingMode ? 22 : 0,
            }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      </div>
    </div>
  );
}

export default function WebDesignAndDevelopmentPage() {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isSynopsisOpen, setIsSynopsisOpen] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  // Intercept anchor clicks to animate transition out of this page
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Only intercept local routes going away from this page
      if (href.startsWith("/") && href !== "/web-design-and-development") {
        e.preventDefault();
        setIsExiting(true);
        router.prefetch(href);
        setTimeout(() => {
          router.push(href, { scroll: false });
        }, 600);
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, [router]);

  // Automatically pull existing case studies and exclude the current one
  const otherCaseStudies = caseStudyCards.filter(
    (card) => card.href !== "/web-design-and-development"
  );

  return (
    <div
      className={`case-study-container w-full min-h-screen bg-[var(--cs-bg)] text-[var(--cs-text)] selection:bg-[var(--cs-primary)] selection:text-[var(--cs-bg)] ${
        isReadingMode ? "reading-mode" : ""
      }`}
    >
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative w-full pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="mx-auto w-full max-w-[min(76vw,1260px)] px-4 md:px-0">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start w-full">
            {/* Left Title Area */}
            <div className="col-span-1 lg:col-span-8 flex flex-col gap-4 text-left">
              <span className="text-[#B8F74B] font-sans text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
                CASE STUDY / DESIGN + DEVELOPMENT
              </span>
              <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-[var(--cs-primary)] font-normal tracking-tight">
                Designing and Building an Automated Media Publishing Platform
              </h1>
            </div>

            {/* Right Controls - Desktop Only */}
            <div className="hidden lg:flex lg:col-span-4 flex-col items-end gap-4">
              <HeroControls
                isSynopsisOpen={isSynopsisOpen}
                setIsSynopsisOpen={setIsSynopsisOpen}
                isReadingMode={isReadingMode}
                setIsReadingMode={setIsReadingMode}
              />
            </div>

            {/* Metadata Grid */}
            <div className="col-span-1 lg:col-span-8 border-t border-[var(--cs-border)] pt-8 mt-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#B8F74B] font-semibold">
                  Role
                </span>
                <div className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed">
                  <p>Product Developer</p>
                  <p>UX/UI Designer</p>
                  <p>Systems Architect</p>
                  <p>Automation Designer</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#B8F74B] font-semibold">
                  Timeline
                </span>
                <div className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed">
                  <p>6 Months</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#B8F74B] font-semibold">
                  Technologies
                </span>
                <div className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed">
                  <p>WordPress</p>
                  <p>PHP, MySQL</p>
                  <p>Python</p>
                  <p>AWS S3</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#B8F74B] font-semibold">
                  Client
                </span>
                <div className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed">
                  <p>Waatea News</p>
                </div>
              </div>
            </div>

            {/* Controls - Mobile Only */}
            <div className="flex lg:hidden col-span-1 flex-col items-start gap-4 mt-6">
              <HeroControls
                isSynopsisOpen={isSynopsisOpen}
                setIsSynopsisOpen={setIsSynopsisOpen}
                isReadingMode={isReadingMode}
                setIsReadingMode={setIsReadingMode}
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
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full max-w-[min(76vw,1260px)] px-4 md:px-0 space-y-12">
          {/* Challenge / Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-left">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--cs-accent-bg)] border border-[var(--cs-primary)]/10 text-[var(--cs-primary)] font-sans font-medium text-[11px] tracking-[2.5px] uppercase">
                The Challenge
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-[var(--cs-primary)] leading-tight font-normal">
                Monolithic Constraints & Manual Bottlenecks
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light">
                Over two decades, Waatea News accumulated over 50,000 legacy articles and 40GB+ of unstructured audio files. Built entirely as a monolithic WordPress application running on deprecated versions, the platform suffered from severe performance degradation during high-traffic breaking news spikes. Editorial workflows were heavily manual, requiring broadcasters to copy audio metadata and transcode tracks manually for web publication.
              </p>
            </div>

            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--cs-accent-bg)] border border-[var(--cs-primary)]/10 text-[var(--cs-primary)] font-sans font-medium text-[11px] tracking-[2.5px] uppercase">
                The Solution
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-[var(--cs-primary)] leading-tight font-normal">
                Decoupled Ingestion & Modular Front-End
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light">
                We designed a decoupled architecture to separate user-facing delivery from background media transcoding and data processing. By engineering an event-driven automation worker pipeline, studio broadcast files are automatically ingested and transcoded. The user experience was modernized with an accessible modular design system using flexible layouts and native-like custom audio players.
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-[24px] md:rounded-[36px] overflow-hidden border border-[var(--cs-border)] mt-8">
            <Image
              src="/Web Design and Development.png"
              alt="Waatea Platform Design Featured Mockup"
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
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full max-w-[min(76vw,1260px)] px-4 md:px-0 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[12px] md:text-[14px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                Stage 01
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                Design Thinking & Architecture Strategy
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light space-y-4">
              <p>
                We began with an intensive system-mapping exercise to identify core bottlenecks. It was clear that CPU-heavy audio transcoding operations and database reads were colliding under load.
              </p>
              <p>
                Our architectural strategy focused on decoupling these responsibilities. We designed a worker service running in the background to handle the parsing, transcoding, and media distribution tasks, saving critical server processing bandwidth for public users.
              </p>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] rounded-[24px] md:rounded-[36px] overflow-hidden border border-[var(--cs-border)]">
            <Image
              src="/case-study-poster.png"
              alt="Architecture Blueprint Overview"
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
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full max-w-[min(76vw,1260px)] px-4 md:px-0 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[12px] md:text-[14px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                Stage 02
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                Interface Design & Platform Foundation
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light space-y-4">
              <p>
                To provide a modern, accessible experience, we created a streamlined UI framework centered on legibility and ease of use. A highly requested feature was standard audio playing controls that follow users as they scroll.
              </p>
              <p>
                We built custom components with flexible grids, setting up a solid foundation to handle breaking coverage, regular articles, and audio playlists across tablet and mobile displays gracefully.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[3/4] rounded-[24px] md:rounded-[36px] overflow-hidden border border-[var(--cs-border)]">
              <Image
                src="/Ux and User Experience.png"
                alt="Interface Design Mobile Mockup"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-[24px] md:rounded-[36px] overflow-hidden border border-[var(--cs-border)]">
              <Image
                src="/placeholder.jpg"
                alt="Layout and Colors System"
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
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full max-w-[min(76vw,1260px)] px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[12px] md:text-[14px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                Stage 03
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                Automation Development & Publishing Infrastructure
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light space-y-4">
              <p>
                We engineered a Python-based background worker pipeline that monitors broadcast automation XML feeds. As soon as a radio segment finishes recording, the worker intercepts the audio stream.
              </p>
              <p>
                The asset is automatically parsed, tagged with correct categorization, transcoded into optimized streaming formats, distributed to secure AWS S3 bucket containers, and prepared as a draft post inside WordPress. This removed hours of manual work for editors daily.
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
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full max-w-[min(76vw,1260px)] px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[12px] md:text-[14px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                Stage 04
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                Historical Content Migration
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light space-y-4">
              <p>
                Migrating 50,000+ posts from a heavily customized database schema required bulletproof safeguards. We wrote secure migration scripts to map historical URLs, category associations, and audio media paths.
              </p>
              <p>
                We ran validation scripts comparing old database records against the new schema, checking media path integrity, and setting up automated 301 redirects through Cloudflare to avoid breaking search engine placement.
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
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full max-w-[min(76vw,1260px)] px-4 md:px-0 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[12px] md:text-[14px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                Stage 05
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                Delta Migration & Go-Live
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light space-y-4">
              <p>
                For a news broadcast site, scheduling downtime is not an option. We implemented a double-publishing window where the legacy database remained live, and changes were synchronized in real time.
              </p>
              <p>
                After a final differential delta migration to capture last-minute posts, we changed global DNS records. Caching layers were pre-warmed, resulting in a zero-downtime, frictionless go-live sequence.
              </p>
            </div>
          </div>

          <div className="relative w-full aspect-[16/9] rounded-[24px] md:rounded-[36px] overflow-hidden border border-[var(--cs-border)]">
            <Image
              src="/placeholder.jpg"
              alt="Platform In Production Use"
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
        className="w-full py-12 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full max-w-[min(76vw,1260px)] px-4 md:px-0 text-left space-y-6">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--cs-accent-bg)] text-[var(--cs-primary)] font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit select-none">
            Technologies Used
          </span>
          <div className="flex flex-wrap gap-2 md:gap-3 max-w-4xl">
            {[
              "Python",
              "WordPress",
              "Gutenberg",
              "PHP",
              "MySQL",
              "ACF",
              "Burli",
              "Cloudways",
              "ChatGPT",
              "Claude",
            ].map((tech) => (
              <span
                key={tech}
                className="px-4 py-1.5 rounded-full border border-[var(--cs-primary)] text-[var(--cs-primary)] font-sans font-medium text-[11px] md:text-[13px] bg-[var(--cs-accent-bg)] hover:bg-[var(--cs-primary)]/10 transition-colors duration-200 cursor-default select-none whitespace-nowrap"
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
            ? "bg-white border border-[var(--cs-border)]"
            : "bg-[#089998]"
        }`}
      >
        <div className="mx-auto w-full max-w-[min(76vw,1260px)] px-4 md:px-0 mb-8">
          <div className="flex flex-col gap-4 text-left">
            <span
              className={`inline-block px-4 py-1.5 rounded-full font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit ${
                isReadingMode
                  ? "bg-[#1B237A]/10 text-[#1B237A]"
                  : "bg-[#B8F74B]/15 text-[#B8F74B]"
              }`}
            >
              Other Projects
            </span>
            <h2
              className={`font-serif text-[42px] md:text-[64px] leading-[1.05] font-normal tracking-tight ${
                isReadingMode ? "text-[#1B237A]" : "text-[#B8F74B]"
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
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER CTA SECTION */}
      <FooterSection />

      {/* Slide-out entrance overlay logic */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="fixed inset-0 bg-[#1B237A] z-[999999] pointer-events-none"
      />

      {/* Page exit transition overlay */}
      <AnimatePresence>
        {isExiting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className="fixed inset-0 bg-[#1B237A] z-[999999] pointer-events-none"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
