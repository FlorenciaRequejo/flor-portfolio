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
      className={`flex flex-col gap-3 md:gap-4 relative w-full ${isMobile ? "items-start" : "items-end"
        }`}
      onMouseEnter={() => !isMobile && setIsSynopsisOpen(true)}
      onMouseLeave={() => !isMobile && setIsSynopsisOpen(false)}
    >
      {/* Reading Time Pill */}
      <div className="h-[38px] px-5 rounded-full border border-[var(--cs-primary)] text-[var(--cs-primary)] font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-wider select-none bg-[var(--cs-accent-bg)] flex items-center justify-center">
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
            className={`overflow-hidden w-full md:w-[320px] ${isMobile ? "text-left" : "text-right"
              }`}
          >
            <div className="pt-2 pb-4 font-sans text-[13px] leading-[20px] text-[var(--cs-muted)] text-left md:text-right">
              A complete platform rebuild for one of New Zealand’s largest Māori media organisations. The project involved designing a new publishing architecture, developing automated content workflows between Burli and WordPress, creating dedicated media infrastructure, and migrating more than 60,000 articles and media assets. Using Python, WordPress, PHP and custom automation tools, the solution transformed a fragile legacy system into a scalable publishing platform while delivering a seamless go-live with minimal disruption.            </div>
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

export default function WebDesignAndDevelopmentPage() {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isSynopsisOpen, setIsSynopsisOpen] = useState(false);
  const [justAutoActivated, setJustAutoActivated] = useState(false);
  const hasAutoActivatedRef = useRef(false);
  const hasManuallyToggledRef = useRef(false);

  // Automatically pull existing case studies and exclude the current one
  const otherCaseStudies = caseStudyCards.filter(
    (card) => card.href !== "/web-design-and-development"
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
                setIsReadingMode={handleToggleReadingMode}
                justAutoActivated={justAutoActivated}
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
                  <p>12 Months</p>
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

      {/* INTRO SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          {/* Challenge / Solution Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-left">
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--cs-accent-bg)] border border-[var(--cs-primary)]/10 text-[var(--cs-primary)] font-sans font-medium text-[11px] tracking-[2.5px] uppercase">
                The Challenge
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-[var(--cs-primary)] leading-tight font-normal">
                A fragile Architecture + Complex Content Migration
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light">
                This client’s existing platform had become increasingly difficult to maintain. Years of content, media files, legacy infrastructure and publishing workflows had created a system that was fragile, resource-heavy and risky to update. The challenge wasn’t simply to modernise the website, but to create a sustainable platform capable of supporting ongoing publishing, automation and future growth.
              </p>
            </div>

            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--cs-accent-bg)] border border-[var(--cs-primary)]/10 text-[var(--cs-primary)] font-sans font-medium text-[11px] tracking-[2.5px] uppercase">
                The Solution
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-[var(--cs-primary)] leading-tight font-normal">
                An out-of-the box solution              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light">
                Rather than approaching the project as a website redesign, it was treated as a systems problem. The solution focused on separating responsibilities across dedicated environments, introducing an automated publishing workflow, modernising the user experience and creating a more scalable architecture that could support both editorial teams and long-term maintenance.
              </p>
            </div>
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
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-10">
          <div className="w-full rounded-[12px] md:rounded-[12px] overflow-hidden">
            <Image
              src="/waatea-system-brainstorm.webp"
              alt="Architecture Blueprint Overview"
              width={3000}
              height={1000}
              sizes="100vw"
              className="w-full h-auto"
            />
          </div>
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
                Before any design or development work began, the first priority was identifying where the real risk existed. The website was handling content management, media storage, publishing, processing and presentation within the same environment.
              </p>
              <p>
                To reduce complexity and improve reliability, the platform was redesigned around a separated architecture: a dedicated media server for large assets, a processing layer responsible for automation and validation, and a lightweight public-facing website focused solely on delivering content. This decision became the foundation for every stage that followed.
              </p>
            </div>
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
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-10">
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
                With the architecture defined, the next step was selecting a WordPress foundation capable of supporting a content-heavy publishing environment without introducing unnecessary complexity.
              </p>
              <p>
                A lightweight Gutenberg-based theme was chosen to minimise overhead, improve performance and provide long-term flexibility. The interface was then customised extensively, particularly across mobile experiences, navigation patterns and content consumption workflows, creating a modern looking interfaz in a plataform that remained easy to use and familiar for the publishing team.              </p>
            </div>
          </div>
          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-[12px] md:rounded-[12px] overflow-hidden mt-8">
            <Image
              src="/waatea-ipad.webp"
              alt="Waatea Platform Design Featured Mockup"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 85vw"
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="relative aspect-[4/3] rounded-[12px] md:rounded-[12px] overflow-hidden">
              <Image
                src="/waatea-ipad-mp3.webp"
                alt="Interface Design Mobile Mockup"
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[4/3] rounded-[12px] md:rounded-[12px] overflow-hidden">
              <Image
                src="/listening-waatea-mp3.webp"
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
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[12px] md:text-[14px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                Stage 03
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                Automation Development & Publishing Infrastructure              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light space-y-4">
              <p>
                Once the front-end foundation was in place, development shifted to the publishing pipeline. This stage focused on building and testing the automation layer responsible for receiving content from Burli, validating incoming files, processing media assets and distributing them across the platform. Custom Python applications, databases and integration workflows were developed to connect the newsroom system, media server and website.
              </p>
              <p>
                By separating content processing from content delivery, the public website remained lightweight while handling thousands of articles, images and audio files efficiently behind the scenes.              </p>
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
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[12px] md:text-[14px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                Stage 04
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                Historical Content Migration              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light space-y-4">
              <p>
                Migrating more than 60,000 existing articles and media assets required a process that prioritised control and validation over speed alone. Rather than attempting a single large migration, the project was broken into a series of staged Python-based migration tools supported by temporary databases and tracking tables. Each step could be executed, reviewed and validated independently before moving forward. This approach significantly reduced risk while maintaining efficiency, allowing batches of over 20,000 articles and their associated media to be migrated in under ten minutes. The migration itself became a controlled process rather than a high-risk event.              </p>
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
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[12px] md:text-[14px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                Stage 05
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                Delta Migration & Go-Live              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light space-y-4">
              <p>
                The final stage focused on migrating the content created since the initial migration and preparing the platform for launch. Because every previous step had been carefully tested, documented and validated, the final migration was completed with minimal disruption to the live environment. Approximately 1,200 recently published articles were transferred in under three minutes while the existing platform remained operational. The launch itself was uneventful, which was precisely the objective. Months of planning, testing and process design resulted in a smooth transition that was largely invisible to end users.              </p>

            </div>
          </div>

          <div className="relative w-full aspect-[16/9] rounded-[12px] md:rounded-[12px] overflow-hidden">
            <Image
              src="/laptop.jpg"
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
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] text-left space-y-6">
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
                : "bg-[#B8F74B]/15 text-[#B8F74B]"
                }`}
            >
              Other Projects
            </span>
            <h2
              className={`font-serif text-[42px] md:text-[64px] leading-[1.05] font-normal tracking-tight ${isReadingMode ? "text-[#1B237A]" : "text-[#B8F74B]"
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
