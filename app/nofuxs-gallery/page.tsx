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
      className={`flex flex-col gap-3 md:gap-4 relative w-full ${isMobile ? "items-start" : "items-end"}`}
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
            className={`overflow-hidden w-full md:w-[320px] ${isMobile ? "text-left" : "text-right"}`}
          >
            <div className="pt-2 pb-4 font-sans text-[13px] leading-[20px] text-foreground/70 text-left md:text-right">
              NoFuxs is a mobile-first artist portfolio and gallery voting app developed as a Google UX Certificate Project. The system tackles ID validation friction, vision limitations, and upload anxiety to allow regional Auckland creators to present collections and secure physical gallery exhibitions.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
    </div>
  );
}

export default function NoFuxsGalleryPage() {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isSynopsisOpen, setIsSynopsisOpen] = useState(false);
  const [justAutoActivated, setJustAutoActivated] = useState(false);
  const hasAutoActivatedRef = useRef(false);
  const hasManuallyToggledRef = useRef(false);

  // Automatically filter out current case study
  const otherCaseStudies = caseStudyCards.filter(
    (card) => card.href !== "/nofuxs-gallery"
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
                CASE STUDY / UX/UI & PRODUCT DESIGN
              </span>
              <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-primary font-normal tracking-tight">
                NoFuxs: Artist Portfolio & Gallery App
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
                Traditional art submission pipelines require complex digital interfaces and local documentation. I designed a mobile app that resolves user onboarding fatigue and validates artist originality, bridging digital collections and local physical galleries.
              </p>
            </div>

            {/* Metadata Grid */}
            <div className="col-span-1 lg:col-span-8 border-t border-border pt-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Role
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>Lead UX Designer</p>
                  <p>UX Researcher</p>
                  <p>UI Designer</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Timeline
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>Google Course Project</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Deliverables
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>Interaction Architecture</p>
                  <p>Usability Research</p>
                  <p>High-Fidelity Mockups</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Design Tokens
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>SF Pro Display Font</p>
                  <p>Lime Green Accent Palette</p>
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
              src="/nofuxs-gallery-hero.png"
              alt="NoFuxs Mobile Application User Interface Showcase"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 76vw"
              priority
            />
          </div>
        </div>
      </section>

      {/* THE CHALLENGE & SOLUTION */}
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
                Visual Submission Barriers & Plagiarism Concerns
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                Many local artists, especially recent immigrants, face authentication limits because they lack standard local IDs to validate profiles. Additionally, older creators feel isolated by complex technology or poor typography contrast, while most artists are deeply concerned about copyright theft when showcasing work online.
              </p>
            </div>

            <div className="space-y-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                The Solution
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-primary leading-tight font-normal">
                A Verified Artist Community & Voting System
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                NoFuxs offers a simplified registration flow with optional physical validation at local galleries. The platform features point-scored voting systems displayed directly on creator profiles, clean image copyright protections, large SF Pro typography, and an automated feed showcasing weekly community selections directly inside physical exhibitions.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* USER PERSONAS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-10">
          <div className="text-left space-y-2">
            <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
              Research & Empathy
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
              Auckland Artist Personas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
            {/* Mariel Card */}
            <div className="p-8 rounded-[24px] bg-surface border border-border flex flex-col justify-between text-left space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-[24px] text-primary">Mariel</h3>
                  <span className="text-[12px] text-foreground/70">Age: 31 · Palmerston North</span>
                </div>
                <p className="text-[11px] uppercase tracking-widest text-secondary font-semibold">
                  Graphic Designer · Recent Immigrant
                </p>
                <blockquote className="font-serif italic text-[15px] text-primary">
                  “Be true to yourself!”
                </blockquote>
                <p className="text-[14px] leading-relaxed text-foreground/70 font-light">
                  Mariel recently immigrated to New Zealand with her family. A busy working mother and painter, she wants to build a reputation and showcase her art. However, she struggles to navigate English interfaces and lacks local ID credentials for digital verification.
                </p>
              </div>
              <div className="space-y-2 border-t border-border pt-4">
                <h5 className="text-[11px] uppercase tracking-wider text-primary font-bold">Frustrations</h5>
                <p className="text-[13px] text-foreground/70 leading-relaxed font-light">
                  Language barriers make navigation fatigue high, and standard apps lack flexibility for non-local ID validation, blocking registration.
                </p>
              </div>
            </div>

            {/* Sam Card */}
            <div className="p-8 rounded-[24px] bg-surface border border-border flex flex-col justify-between text-left space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-[24px] text-primary">Sam</h3>
                  <span className="text-[12px] text-foreground/70">Age: 67 · Auckland</span>
                </div>
                <p className="text-[11px] uppercase tracking-widest text-secondary font-semibold">
                  Boutique Owner · Older Artist
                </p>
                <blockquote className="font-serif italic text-[15px] text-primary">
                  “Technology harms authenticity”
                </blockquote>
                <p className="text-[14px] leading-relaxed text-foreground/70 font-light">
                  Sam runs a local hotel boutique and teaches art to grandchildren. He has poor vision and is not familiar with complex digital interfaces, but wishes to connect with Auckland's larger artist community.
                </p>
              </div>
              <div className="space-y-2 border-t border-border pt-4">
                <h5 className="text-[11px] uppercase tracking-wider text-primary font-bold">Frustrations</h5>
                <p className="text-[13px] text-foreground/70 leading-relaxed font-light">
                  Poor typography contrast makes screens hard to read. He also deeply distrusts online portals and fears artwork replication or copyright theft.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* DEFINE: PROBLEM STATEMENT */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-surface text-primary font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit select-none">
            Problem Framing
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div className="space-y-3">
              <h4 className="font-sans text-[12px] font-bold tracking-widest uppercase text-secondary">Sam's Problem Statement</h4>
              <p className="font-serif text-[22px] md:text-[26px] leading-[34px] text-primary font-light">
                “Sam is a shop owner grandfather who needs to feel part of an artist community because that gives him a sense of validation of himself as an artist.”
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-sans text-[12px] font-bold tracking-widest uppercase text-secondary">Hypothesis Formula</h4>
              <p className="font-serif text-[22px] md:text-[26px] leading-[34px] text-primary font-light">
                “If Sam downloads the Gallery app, uploads his bio and interacts with others, then he will feel consecrated as an artist.”
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* USER JOURNEY */}
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
                User Flow
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Sam's Experience Roadmap
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
              <p>
                To support users like Sam, the onboarding maps out explicit milestones: discovering the app at the physical gallery, downloading, utilizing popular sign-in platforms to minimize password fatigue, uploading collections with copyright markers, and connecting with other local artists.
              </p>
            </div>
          </div>

          {/* User Journey Roadmap Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left font-sans">
            {[
              { step: "01. Discover", name: "Scan QR", desc: "Sees QR code poster inside the local physical gallery, learns about exhibition opportunities, and downloads." },
              { step: "02. Onboarding", name: "Easy Register", desc: "Selects Google/popular sign-in options to bypass complex account configurations." },
              { step: "03. Setup Profile", name: "Configure Bio", desc: "Enters visual details and chooses physical 'on location' validation to bypass online ID uploads." },
              { step: "04. Join Feed", name: "Upload Collection", desc: "Submits artwork collection drafts, receiving immediate upload receipt checks." },
              { step: "05. Engage", name: "Interact & Vote", desc: "Exchanges feedback, votes on peers, and tracks progress towards physical gallery selection." }
            ].map((wf, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[20px] bg-surface border border-border flex flex-col justify-between min-h-[190px]"
              >
                <div className="text-[11px] font-mono text-primary/50 font-bold">{wf.step}</div>
                <div>
                  <h4 className="text-[16px] font-bold text-primary mb-1">{wf.name}</h4>
                  <p className="text-[12px] leading-[18px] text-foreground/70 font-light">{wf.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* TESTING & ITERATION */}
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
              Usability Testing & Recommendations
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-tight font-normal">
              Refining the Interface for Extreme Clarity
            </h2>
            <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light max-w-4xl">
              I ran moderated usability research sessions across two iterative phases to identify points of user friction, such as account locks, verification anxiety, and confusing action icons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Low-Fi Usability Pain Points */}
            <div className="p-8 rounded-[24px] bg-surface border border-border space-y-6">
              <h3 className="font-serif text-[24px] text-primary border-b border-border pb-2">
                Usability Study 01 (Initial Setup)
              </h3>
              <div className="space-y-4 font-sans text-[14px] leading-relaxed text-foreground/70 font-light">
                <p>
                  <strong>Forced Art Uploads (4/5 users):</strong> Users expressed high frustration when blocked from finishing registration before having their digital artwork files ready.
                </p>
                <p>
                  <strong>Profile Customization (4/5 users):</strong> Selecting visual themes for profiles felt irrelevant. Users wanted simple layout configurations and social links instead.
                </p>
                <p>
                  <strong>Unconfirmed Submissions (5/5 users):</strong> Heavy concern about whether collections had uploaded successfully due to a complete lack of confirmation messages.
                </p>
              </div>
            </div>

            {/* Low-Fi Prototype #2 Solutions */}
            <div className="p-8 rounded-[24px] bg-surface border border-border space-y-6">
              <h3 className="font-serif text-[24px] text-primary border-b border-border pb-2">
                Usability Study 02 (Interactions & Copy)
              </h3>
              <div className="space-y-4 font-sans text-[14px] leading-relaxed text-foreground/70 font-light">
                <p>
                  <strong>Unclear Navigation Text (1/4 users):</strong> Initial copy caused navigation confusion. A text makeover was executed to transition parameters into user-focused copy.
                </p>
                <p>
                  <strong>Vote Icon Friction (4/4 users):</strong> Standard stars were not associated with gallery validation. I replaced them with a clear "VOTE / VOTED" button schema.
                </p>
                <p>
                  <strong>Validation Delays:</strong> Separated the "on location" validation from online flows, introducing a temporary profile state so artists could interact while validation was pending.
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* DESIGN SYSTEM STYLE SHEET */}
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
                Style Sheet
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                NoFuxs Style System
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
              <p>
                I established high-contrast typographic guides using SF Pro Display and designed custom, rounded vote actions using vibrant lime green and violet tokens to accommodate older users and maintain high visibility.
              </p>
            </div>
          </div>

          {/* Style Sheet Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left mt-8 font-sans">
            {/* Color Palette */}
            <div className="p-6 rounded-[20px] bg-surface border border-border space-y-4">
              <h4 className="font-bold text-[15px] text-primary">Color Palette</h4>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded bg-[#C6FF00] border border-white/10" />
                  <span className="text-[10px] mt-1 font-mono">#C6FF00</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded bg-[#1A0839] border border-white/10" />
                  <span className="text-[10px] mt-1 font-mono">#1A0839</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded bg-[#604CE9] border border-white/10" />
                  <span className="text-[10px] mt-1 font-mono">#604CE9</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded bg-[#30BEEC] border border-white/10" />
                  <span className="text-[10px] mt-1 font-mono">#30BEEC</span>
                </div>
              </div>
              <p className="text-[12px] text-foreground/70 font-light leading-relaxed">
                Featuring electric Lime Green (`#C6FF00`) for votes, Indigo (`#1A0839`) as dark canvas base, and Slate Blue/Light Blue for accents.
              </p>
            </div>

            {/* Typography */}
            <div className="p-6 rounded-[20px] bg-surface border border-border space-y-4">
              <h4 className="font-bold text-[15px] text-primary">SF Pro Display Hierarchy</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold">Artist Titles (25px / 21px)</span>
                  <p className="font-serif text-[20px] text-primary">AaBc (SF Pro)</p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-secondary font-semibold">Controls & Labels (16px / 14px)</span>
                  <p className="font-sans text-[16px] text-primary">AaBc (SF Pro)</p>
                </div>
              </div>
              <p className="text-[12px] text-foreground/70 font-light leading-relaxed">
                Utilizing SF Pro Display for absolute text scaling, screen readability, and iOS native compatibility.
              </p>
            </div>

            {/* Interface States */}
            <div className="p-6 rounded-[20px] bg-surface border border-border space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="font-bold text-[15px] text-primary mb-2">Platform Button Tokens</h4>
                <div className="flex flex-wrap gap-2 text-[11px]">
                  <span className="px-3 py-1 rounded bg-[#C6FF00] text-[#1A0839] font-bold">VOTE</span>
                  <span className="px-3 py-1 rounded border border-[#C6FF00] text-[#C6FF00] font-bold">VOTED</span>
                  <span className="px-3 py-1 rounded bg-white/10 text-primary">SMALL BUTTON</span>
                </div>
              </div>
              <p className="text-[12px] text-foreground/70 font-light leading-relaxed">
                Rounded capsule buttons adjust states on click to confirm a voted artwork cleanly without complicating pages.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FUTURE OUTLOOK */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12 text-left font-sans">
          <div className="space-y-3">
            <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
              Current Project Status
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-tight font-normal">
              Connecting Digital Communities & Local Galleries
            </h2>
            <p className="text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light max-w-3xl">
              The low-fidelity prototype validated key account workflows and collection compilation steps. The next phase centers on piloting in-person gallery verification hubs to support recently immigrated artists.
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
