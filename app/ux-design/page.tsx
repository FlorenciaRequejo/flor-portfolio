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
      className={`flex flex-col gap-3 md:gap-4 relative w-full ${
        isMobile ? "items-start" : "items-end"
      }`}
      onMouseEnter={() => !isMobile && setIsSynopsisOpen(true)}
      onMouseLeave={() => !isMobile && setIsSynopsisOpen(false)}
    >
      {/* Reading Time Pill */}
      <div className="h-[38px] px-5 rounded-full border border-[var(--cs-primary)] text-[var(--cs-primary)] font-sans font-medium text-[11px] md:text-[12px] uppercase tracking-wider select-none bg-[var(--cs-accent-bg)] flex items-center justify-center">
        10 min read
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
              Bite is a mobile application developed as a Google UX Design Professional Certificate final project. This study walks through the UX design thinking process (Empathize, Define, Ideate, Prototype, and Test) used to create a budget-friendly meal planning and local ingredient trading system tailored for low-income communities in Auckland, New Zealand.
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
            className={`w-[50px] h-[26px] rounded-full border p-0.5 relative transition-colors duration-300 flex items-center cursor-pointer ${
              isReadingMode
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
              className={`w-5 h-5 rounded-full ${
                isReadingMode ? "bg-white" : "bg-[var(--cs-primary)]"
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

export default function UXDesignPage() {
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [isSynopsisOpen, setIsSynopsisOpen] = useState(false);
  const [justAutoActivated, setJustAutoActivated] = useState(false);
  const hasAutoActivatedRef = useRef(false);
  const hasManuallyToggledRef = useRef(false);

  // Automatically pull existing case studies and exclude the current one
  const otherCaseStudies = caseStudyCards.filter(
    (card) => card.href !== "/ux-design"
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
      className={`case-study-container w-full min-h-screen bg-[var(--cs-bg)] text-[var(--cs-text)] selection:bg-[var(--cs-primary)] selection:text-[var(--cs-bg)] ${
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
              <span className="text-[#B8F74B] font-sans text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
                CASE STUDY / UX/UI & PRODUCT DESIGN
              </span>
              <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-[var(--cs-primary)] font-normal tracking-tight">
                Bite: End-to-End UX/UI Case Study
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
                  <p>Lead UX Designer</p>
                  <p>UX Researcher</p>
                  <p>UI Designer</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#B8F74B] font-semibold">
                  Timeline
                </span>
                <div className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed">
                  <p>July 2021 – Nov 2022</p>
                  <p>(16 Months)</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#B8F74B] font-semibold">
                  Client
                </span>
                <div className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed">
                  <p>Google Course Project</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-[#B8F74B] font-semibold">
                  Technologies
                </span>
                <div className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed">
                  <p>Figma</p>
                  <p>Adobe Photoshop</p>
                  <p>Adobe Illustrator</p>
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
                Cost Barriers to Healthy Living
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light">
                In Auckland, New Zealand, buying healthy food is incredibly expensive. Lower-income communities often lack the financial resources, education, or access to affordable local ingredients to prepare nutritious meals. This systemic imbalance leaves many residents struggling with diet-related health complications.
              </p>
            </div>

            <div className="space-y-4">
              <span className="inline-block px-3 py-1 rounded-full bg-[var(--cs-accent-bg)] border border-[var(--cs-primary)]/10 text-[var(--cs-primary)] font-sans font-medium text-[11px] tracking-[2.5px] uppercase">
                The Solution
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-[var(--cs-primary)] leading-tight font-normal">
                Bite Budget App & Trading Community
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light">
                Bite is a mobile application designed to ensure all residents have access to healthy food options. The app generates custom weekly meal plans based on family budget limits, tracks calorie and allergy safety constraints, compiles structured local store lists to buy ingredients cheaply, and includes a P2P local trading system to exchange spare ingredients, reducing waste and fostering community support.
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mt-8">
            <Image
              src="/Ux and User Experience.png"
              alt="Bite App User Experience Showcase"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px] border border-[var(--cs-border)]"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </motion.section>

      {/* EMPATHIZE & USER RESEARCH */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[12px] md:text-[14px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                01. Research & Empathize
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                Understanding Auckland's Low-Income Context
              </h2>
            </div>
            <div className="md:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light space-y-4">
              <p>
                To design a solution that works, I conducted a qualitative research study with a selected group of regional Auckland residents. The user interviews focused on identifying current meal planning processes, grocery shopping behaviors, constraints regarding budget size, and struggles with dietary requirements.
              </p>
              <p>
                Through the synthesis of research empathy maps, four primary pain points emerged:
              </p>
            </div>
          </div>

          {/* Pain Points Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            {[
              {
                num: "2/5",
                title: "Safety & Allergy Filters",
                text: "Users with severe allergies expressed high anxiety that cross-contamination risks or ingredient warnings wouldn't be clearly handled by meal plans."
              },
              {
                num: "3/5",
                title: "Intimidating Recipes",
                text: "Many users felt recipe directions found online were overly complex, requiring expensive cooking tools or hard-to-source elements."
              },
              {
                num: "4/5",
                title: "Location Sourcing Proximity",
                text: "Low-income shoppers were highly concerned about the proximity and number of different stores they'd need to visit to get cheaper items."
              },
              {
                num: "2/5",
                title: "Setup & Onboarding Fatigue",
                text: "Users reported frustration when required to configure a massive checklist of dietary likes and dislikes before previewing value."
              }
            ].map((pt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[20px] bg-[var(--cs-accent-bg)] border border-[var(--cs-border)] flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <span className="text-[28px] font-serif text-[var(--cs-primary)] block mb-2">{pt.num}</span>
                  <h4 className="font-sans text-[15px] font-semibold text-[var(--cs-primary)] mb-2">{pt.title}</h4>
                  <p className="font-sans text-[13px] leading-[20px] text-[var(--cs-muted)] font-light">{pt.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* USER PERSONAS */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-10">
          <div className="text-left space-y-2">
            <span className="font-sans text-[12px] md:text-[14px] font-semibold text-[#B8F74B] uppercase tracking-wider">
              User Profiles
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
              Representing Our Auckland Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Sarah Card */}
            <div className="p-8 rounded-[24px] bg-[var(--cs-card-bg)] border border-[var(--cs-border)] flex flex-col justify-between text-left space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-[24px] text-[var(--cs-primary)]">Sarah</h3>
                  <span className="font-sans text-[12px] text-[var(--cs-muted)]">Age: 35 · Auckland</span>
                </div>
                <p className="font-sans text-[11px] uppercase tracking-widest text-[#B8F74B] font-semibold">
                  Retail Associate · Low Income
                </p>
                <blockquote className="font-serif italic text-[15px] text-[var(--cs-primary)]">
                  “My family is my everything”
                </blockquote>
                <p className="font-sans text-[14px] leading-[22px] text-[var(--cs-muted)] font-light">
                  Sarah is a single mother of two children (ages 5 and 8). Her eldest has Type 1 Diabetes, making nutritional tracking critical. She often feels overwhelmed by the high cost of healthy foods.
                </p>
              </div>
              <div className="space-y-2 border-t border-[var(--cs-border)] pt-4">
                <h5 className="font-sans text-[11px] uppercase tracking-wider text-[var(--cs-primary)] font-bold">Goals</h5>
                <p className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed font-light">
                  Plan allergen-friendly meals on a tight budget, track carbs/nutrients, and trade food items to reduce waste.
                </p>
              </div>
            </div>

            {/* Jack Card */}
            <div className="p-8 rounded-[24px] bg-[var(--cs-card-bg)] border border-[var(--cs-border)] flex flex-col justify-between text-left space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-[24px] text-[var(--cs-primary)]">Jack</h3>
                  <span className="font-sans text-[12px] text-[var(--cs-muted)]">Age: 45 · Auckland</span>
                </div>
                <p className="font-sans text-[11px] uppercase tracking-widest text-[#B8F74B] font-semibold">
                  Warehouse Worker · Low Income
                </p>
                <blockquote className="font-serif italic text-[15px] text-[var(--cs-primary)]">
                  “We only have one world”
                </blockquote>
                <p className="font-sans text-[14px] leading-[22px] text-[var(--cs-muted)] font-light">
                  Jack is a single father with two teenagers. Working part-time with strict budget limitations, he has scarce cooking experience and wants fast, clear recipe guidelines to cut down prep times.
                </p>
              </div>
              <div className="space-y-2 border-t border-[var(--cs-border)] pt-4">
                <h5 className="font-sans text-[11px] uppercase tracking-wider text-[var(--cs-primary)] font-bold">Goals</h5>
                <p className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed font-light">
                  Find simple budget recipes, reduce grocery bills, keep teenagers fed, and trade excess food to minimize environmental waste.
                </p>
              </div>
            </div>

            {/* Suzy Card */}
            <div className="p-8 rounded-[24px] bg-[var(--cs-card-bg)] border border-[var(--cs-border)] flex flex-col justify-between text-left space-y-6">
              <div className="space-y-4">
                <div className="flex justify-between items-baseline">
                  <h3 className="font-serif text-[24px] text-[var(--cs-primary)]">Suzy</h3>
                  <span className="font-sans text-[12px] text-[var(--cs-muted)]">Age: 29 · Auckland</span>
                </div>
                <p className="font-sans text-[11px] uppercase tracking-widest text-[#B8F74B] font-semibold">
                  Nurse · Low Income · Maori
                </p>
                <blockquote className="font-serif italic text-[15px] text-[var(--cs-primary)]">
                  “Kei te pai te ora”
                </blockquote>
                <p className="font-sans text-[14px] leading-[22px] text-[var(--cs-muted)] font-light">
                  Suzy lives with her elderly grandmother. She wants to cook traditional Maori meals and preserve cultural practices but struggles with the high cost of authentic native ingredients in standard stores.
                </p>
              </div>
              <div className="space-y-2 border-t border-[var(--cs-border)] pt-4">
                <h5 className="font-sans text-[11px] uppercase tracking-wider text-[var(--cs-primary)] font-bold">Goals</h5>
                <p className="font-sans text-[13px] text-[var(--cs-muted)] leading-relaxed font-light">
                  Access authentic cultural resources and local ingredients at low prices, planning traditional Maori meals on a strict budget.
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
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-[var(--cs-accent-bg)] text-[var(--cs-primary)] font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit select-none">
            02. Define Phase
          </span>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
            <div className="space-y-3">
              <h4 className="font-sans text-[12px] font-bold tracking-widest uppercase text-[#B8F74B]">Suzy's Problem Statement</h4>
              <p className="font-serif text-[22px] md:text-[26px] leading-[34px] text-[var(--cs-primary)] font-light">
                “Suzy is a full-time nurse who needs a solution to her struggles with finding access to authentic ingredients and cultural resources because she wants to connect with her cultural heritage through food and provide her grandmother with healthy, traditional meals on a budget.”
              </p>
            </div>
            <div className="space-y-3">
              <h4 className="font-sans text-[12px] font-bold tracking-widest uppercase text-[#B8F74B]">Hypothesis Formula</h4>
              <p className="font-serif text-[22px] md:text-[26px] leading-[34px] text-[var(--cs-primary)] font-light">
                “If Suzy is concerned about preserving traditional Maori food practices and values within her tight budget, then she needs a way to access authentic ingredients and cultural resources at low prices.”
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* DESIGN SYSTEM & STYLE SHEET */}
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
              <span className="font-sans text-[12px] md:text-[14px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                03. Design Architecture
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
                Cohesive Styling & Layout Schemas
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light space-y-4">
              <p>
                As the Lead UI Designer, I created a cohesive style guide and design sheet to keep the mobile platform visually clean, modern, and easy to navigate under high cognitive loads (such as grocery shopping).
              </p>
            </div>
          </div>

          {/* Style Sheet Specifics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {/* Color Palette */}
            <div className="p-6 rounded-[20px] bg-[var(--cs-accent-bg)] border border-[var(--cs-border)] space-y-4">
              <h4 className="font-sans text-[15px] font-bold text-[var(--cs-primary)]">Color Palette</h4>
              <div className="grid grid-cols-4 gap-2">
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded bg-[#ED1C24] border border-white/10" />
                  <span className="text-[10px] mt-1 font-mono">#ED1C24</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded bg-[#1A1A1A] border border-white/10" />
                  <span className="text-[10px] mt-1 font-mono">#1A1A1A</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded bg-[#8A9F89] border border-white/10" />
                  <span className="text-[10px] mt-1 font-mono">#8A9F89</span>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-full aspect-square rounded bg-[#F4BEA6] border border-white/10" />
                  <span className="text-[10px] mt-1 font-mono">#F4BEA6</span>
                </div>
              </div>
              <p className="font-sans text-[12px] text-[var(--cs-muted)] font-light leading-relaxed">
                A warm, fresh palette consisting of Bite Red (primary action), Dark Charcoal (high contrast text), Muted Sage (safety/health), and Soft Peach (warm secondary accent).
              </p>
            </div>

            {/* Typography Pairing */}
            <div className="p-6 rounded-[20px] bg-[var(--cs-accent-bg)] border border-[var(--cs-border)] space-y-4">
              <h4 className="font-sans text-[15px] font-bold text-[var(--cs-primary)]">Typography</h4>
              <div className="space-y-2">
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#B8F74B] font-semibold">Title Headers</span>
                  <p className="font-serif text-[20px] text-[var(--cs-primary)]">Cambria (AaBbCc)</p>
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-widest text-[#B8F74B] font-semibold">Body & App Controls</span>
                  <p className="font-sans text-[16px] text-[var(--cs-primary)]">Roboto (AaBbCc)</p>
                </div>
              </div>
              <p className="font-sans text-[12px] text-[var(--cs-muted)] font-light leading-relaxed">
                Combining a traditional, elegant Serif (Cambria) for content headers and recipe cards with a highly legible, clean Sans-serif (Roboto) for UI states and body readouts.
              </p>
            </div>

            {/* Categorization Tags */}
            <div className="p-6 rounded-[20px] bg-[var(--cs-accent-bg)] border border-[var(--cs-border)] space-y-4 flex flex-col justify-between">
              <div>
                <h4 className="font-sans text-[15px] font-bold text-[var(--cs-primary)] mb-2">Dietary & Cultural Variables</h4>
                <div className="flex flex-wrap gap-1.5">
                  {["Kai", "Just Food", "Vegan", "Vegetarian", "Maori", "Gluten Free", "No Nuts", "No Eggs"].map((label) => (
                    <span
                      key={label}
                      className="px-2 py-0.5 rounded bg-white/10 text-[10px] font-mono text-[var(--cs-primary)] font-light"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
              <p className="font-sans text-[12px] text-[var(--cs-muted)] font-light leading-relaxed">
                Standardized tags map cleanly across user preferences and meal cards to filter out undesired ingredients immediately and maintain custom constraints.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ITERATIVE STUDY & LOW-FI PROTOTYPES */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12 text-left">
          <div className="space-y-3">
            <span className="inline-block px-3 py-1 rounded-full bg-[var(--cs-accent-bg)] border border-[var(--cs-primary)]/10 text-[var(--cs-primary)] font-sans font-medium text-[11px] tracking-[2.5px] uppercase">
              04. Testing & Iteration
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-tight font-normal">
              Usability Studies & Critical Design Adjustments
            </h2>
            <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light max-w-4xl">
              I conducted a moderated usability research study to evaluate users' interaction with the initial wireframes, focus on the transition from the Shop list to the Local Trade areas, and analyze the meal plan builder. This testing yielded valuable insights that reshaped key product elements.
            </p>
          </div>

          {/* Test Results vs Solutions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {/* Low-Fi Usability Pain Points */}
            <div className="p-8 rounded-[24px] bg-[var(--cs-card-bg)] border border-[var(--cs-border)] space-y-6">
              <h3 className="font-serif text-[24px] text-[#FFB6C1] border-b border-[var(--cs-border)] pb-2">
                Usability Study Findings
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[12px] text-[#B8F74B] font-bold block mb-1">FINDING 01</span>
                  <p className="font-sans text-[14px] text-[var(--cs-muted)] font-light leading-relaxed">
                    <strong>Onboarding Friction (3/5 users):</strong> Users disliked having to enter family size, allergy lists, and activity levels prior to previewing any recipe catalog.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[12px] text-[#B8F74B] font-bold block mb-1">FINDING 02</span>
                  <p className="font-sans text-[14px] text-[var(--cs-muted)] font-light leading-relaxed">
                    <strong>Trading Navigation (4/5 users):</strong> The transition between searching stores (Shop) and coordinate swaps (Trade) was confusing. Users expected a cleaner dashboard switch.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[12px] text-[#B8F74B] font-bold block mb-1">FINDING 03</span>
                  <p className="font-sans text-[14px] text-[var(--cs-muted)] font-light leading-relaxed">
                    <strong>Family Settings (4/5 users):</strong> Managing specific allergies for multiple family members was complex and tedious within the main profile settings tab.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[12px] text-[#B8F74B] font-bold block mb-1">FINDING 04</span>
                  <p className="font-sans text-[14px] text-[var(--cs-muted)] font-light leading-relaxed">
                    <strong>Location Privacy (1/5 users):</strong> Users expressed discomfort with always-on geolocation permissions and requested address search fallback options.
                  </p>
                </div>
              </div>
            </div>

            {/* Low-Fi Prototype #2 Solutions */}
            <div className="p-8 rounded-[24px] bg-[var(--cs-card-bg)] border border-[var(--cs-border)] space-y-6">
              <h3 className="font-serif text-[24px] text-[var(--cs-primary)] border-b border-[var(--cs-border)] pb-2">
                Prototype #2 Implementations
              </h3>
              <div className="space-y-4">
                <div>
                  <span className="font-mono text-[12px] text-[#B8F74B] font-bold block mb-1">SOLUTION 01</span>
                  <p className="font-sans text-[14px] text-[var(--cs-muted)] font-light leading-relaxed">
                    <strong>Guest Access & Home Preview:</strong> Implemented a user registration flow that allows guests to access the recipes page before committing to planning parameters.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[12px] text-[#B8F74B] font-bold block mb-1">SOLUTION 02</span>
                  <p className="font-sans text-[14px] text-[var(--cs-muted)] font-light leading-relaxed">
                    <strong>Direct Header Swap Switch:</strong> Redesigned the top navigation header with a clean, segmented tab controller: [Shop | Trade] for instantaneous swapping.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[12px] text-[#B8F74B] font-bold block mb-1">SOLUTION 03</span>
                  <p className="font-sans text-[14px] text-[var(--cs-muted)] font-light leading-relaxed">
                    <strong>Interactive Family Grid:</strong> Integrated a family sizing grid directly in the onboarding flow, with visual cards for each member ("Adult 1", "Child 1") mapping customized requirements.
                  </p>
                </div>
                <div>
                  <span className="font-mono text-[12px] text-[#B8F74B] font-bold block mb-1">SOLUTION 04</span>
                  <p className="font-sans text-[14px] text-[var(--cs-muted)] font-light leading-relaxed">
                    <strong>Manual Geolocation Input:</strong> Added location preference settings allowing address input and maximum travel search radius constraints (e.g. "Distance: 20Km").
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* MOCKUPS SHOWCASE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-[var(--cs-border)]"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-10">
          <div className="text-left space-y-2">
            <span className="font-sans text-[12px] md:text-[14px] font-semibold text-[#B8F74B] uppercase tracking-wider">
              05. High-Fidelity Design
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-[var(--cs-primary)] leading-[1.1] font-normal tracking-tight">
              Simplifying the Mobile Flow
            </h2>
            <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light max-w-4xl">
              By removing layout clutter (such as excessive information cards), the high-fidelity UI guides users cleanly towards meal creation, grocery list compiling, and item trading.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Mockup Left */}
            <Image
              src="/bite-app-mockup.jpg"
              alt="Bite App High-Fidelity UI Screens"
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px]"
              style={{ width: '100%', height: 'auto' }}
            />
            
            {/* Description Right */}
            <div className="space-y-6 text-left">
              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full bg-[var(--cs-accent-bg)] border border-[var(--cs-primary)]/10 text-[var(--cs-primary)] font-sans font-medium text-[11px] tracking-[2px] uppercase">
                  Featured Flow
                </span>
                <h3 className="font-serif text-[28px] text-[var(--cs-primary)]">Card Pop-up Menu</h3>
                <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[var(--cs-muted)] font-light">
                  A floating pop-up menu was added to each recipe card, allowing users to perform frequent tasks instantly. Without leaving the catalog, users can: Add a recipe to their plan, Save it for later, View details, Share, or Like the card. This minimized screen clutter and kept onboarding steps extremely fluid.
                </p>
              </div>

              <div className="p-6 rounded-[20px] bg-[var(--cs-accent-bg)] border border-[var(--cs-border)] space-y-3">
                <h4 className="font-sans text-[15px] font-bold text-[var(--cs-primary)]">Interactive Mockup Links</h4>
                <p className="font-sans text-[13px] text-[var(--cs-muted)] font-light leading-relaxed">
                  The final mobile prototype presents polished visual flows for meal plans, ingredients sourcing, and Maori custom recipes lookup.
                </p>
                <div>
                  <a
                    href="https://shorturl.at/gtAP0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-[38px] px-5 rounded-full border border-[var(--cs-primary)] text-[var(--cs-primary)] hover:bg-[var(--cs-primary)] hover:text-[var(--cs-bg)] font-sans font-medium text-[11px] uppercase tracking-wider items-center justify-center transition-all duration-300"
                  >
                    View Figma Prototype
                  </a>
                </div>
              </div>
            </div>
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
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] mb-8">
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
    </div>
  );
}
