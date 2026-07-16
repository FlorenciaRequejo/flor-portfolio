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
        10 min read
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
              Bite is a mobile application developed as a Google UX Design Professional Certificate final project. This study walks through the UX design thinking process (Empathize, Define, Ideate, Prototype, and Test) used to create a budget-friendly meal planning and local ingredient trading system tailored for low-income communities in Auckland, New Zealand.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      
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
                CASE STUDY / UX/UI & PRODUCT DESIGN
              </span>
              <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-primary font-normal tracking-tight">
                Helping people face grocery-related financial challenges in an economic recession.
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
                  <p>July 2022 – Nov 2022</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Client
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>Google Course Project</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <span className="font-sans text-[10px] uppercase tracking-widest text-secondary font-semibold">
                  Technologies
                </span>
                <div className="font-sans text-[13px] text-foreground/70 leading-relaxed">
                  <p>Figma</p>
                  <p>Miro</p>
                  <p>Adobe suite</p>
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
                Balancing complexity with clarity
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                As the app was going to have 4 different sections: recipes, meal plan, shopping list and trade; I needed to be able to clearly display its parts. Furthermore, I wanted for the app to be use as a tool rather than just as a recourse library, so highlighting the meal-plan function was critical.              </p>
            </div>

            <div className="space-y-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                The Solution
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-primary leading-tight font-normal">
                Simple interface, intuitive navigation              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                To be able to display everything correctly I needed to organize the information architecture very clearly to brake down the functionalities and differentiate them correctly for the users. Provide a very clear and simple user interface to guide the users was also crucial.              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mt-8">
            <Image
              src="/Bite-Cover-new.webp"
              alt="Bite App User Experience Showcase"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px] border border-border"
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
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-12 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                01. Research & Empathize
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Understanding the users.
              </h2>
              <p>
                I conducted research to understand what users were struggling with and how the app could make a difference in their lives.
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mt-8">
            <Image
              src="/Bite user research.webp"
              alt="Bite App User Experience Showcase"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px] border border-border"
              style={{ width: '100%', height: 'auto' }}
            />
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 text-left">
            <div className="space-y-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                UX Research
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-primary leading-tight font-normal">
                Personas              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                To form a deeper understanding of the users' goals, needs, experiences, and behaviors. I created 3 personas, I used them whenever I wanted to step out of myself and reconsider my initial ideas.
                <a href="https://www.figma.com/design/Mc4k5Jufrn1OmHLrRPKZMb/Bite-App---Web?node-id=0-1&p=f">Link to UX</a>
              </p>
            </div>

            <div className="space-y-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                Information Architecture
              </span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-primary leading-tight font-normal">
                User Flows & Structure</h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                I mapped how users would move through the product, organised the information architecture and identified opportunities to simplify navigation before designing the interface.
                <a href="https://www.figma.com/design/Mc4k5Jufrn1OmHLrRPKZMb/Bite-App---Web?node-id=58-2576&m=dev&t=tXE5hBvipYofyxsk-1">Explore the Architecture</a>
              </p>
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
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-12 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary block mb-3">
                02. Define Stage
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight mb-12 block">
                Problem & hypothesis statement</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-left">
                <div className="space-y-3">
                  <h2 className="font-serif text-[28px] md:text-[36px] text-primary leading-tight font-normal">
                    Problem statement: Suzy             </h2>
                  <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                    Suzy is a full-time nurse who needs a solution to her struggles with finding access to authentic ingredients and cultural resources because she wants to connect with her cultural heritage through food and provide her grandmother with healthy, traditional meals on a budget.
                  </p>
                </div>
                <div className="space-y-3">
                  <h2 className="font-serif text-[28px] md:text-[36px] text-primary leading-tight font-normal">
                    If/then statement              </h2>
                  <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                    If Suzy is concerned about preserving traditional Maori food practices and values within her tight budget, then she needs a way to access authentic ingredients and cultural resources at low prices.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* IDEATE & LOW-FI PROTOTYPE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-12 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                03. Ideate Stage
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight mb-4">
                Ideate & Low-fi Prototype
              </h2>
            </div>
          </div>

          {/* 4 Columns Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            {[
              {
                num: "1",
                title: "Preview",
                text: "Upon completing login, users will be presented with the preset selections made during the login process, displayed prominently next to the username for easy reference and understanding of their weekly plan."
              },
              {
                num: "2",
                title: "Price",
                text: "Cost-efficiency is a crucial aspect of our app, and we strive to make healthy meals affordable for our users. The pricing information will be prominently displayed throughout the app."
              },
              {
                num: "3",
                title: "Healthy",
                text: "Each meal option will have a clear and detailed nutritional information table, enabling users to make informed decisions about their meal choices and monitor their overall health."
              },
              {
                num: "4",
                title: "Family",
                text: "We recognize that many of our users have families and cater to different dietary needs. Our app allows for the inclusion of multiple family members, making meal planning and organization more convenient for all."
              }
            ].map((col) => (
              <div
                key={col.num}
                className="p-6 rounded-[20px] bg-surface border border-border flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <span className="text-[28px] font-serif text-primary block mb-2">{col.num}</span>
                  <h4 className="font-sans text-[15px] font-semibold text-primary mb-2">{col.title}</h4>
                  <p className="font-sans text-[13px] leading-[20px] text-foreground/70 font-light">{col.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Low-fi Image */}
          <div className="mt-8">
            <Image
              src="/bite-ideation.webp"
              alt="Bite App Low-fidelity Prototype Showcase"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px] border border-border"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </motion.section>

      {/* DESIGN SYSTEM & STYLE SHEET */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-12 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                3. Test
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Usability study: findings
              </h2>
              <p>
                I conducted a moderated research study to evaluate users' ability to complete key tasks and gather feedback on specific features, such as the transition from the Shop to Trade function and the meal plan generation feature              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mt-8">
            <Image
              src="/bite-test-findings.webp"
              alt="Bite App User Experience Showcase"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px] border border-border"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          {/* Recommendations Block */}
          <div className="mt-16 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <h3 className="font-serif text-[26px] md:text-[34px] text-primary tracking-tight font-normal border-b border-primary/20 pb-2 w-fit px-8">
              Recomendations:
            </h3>
            <ul className="space-y-6 text-left font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light w-full">
              {[
                "Implementing a user registration feature that allows customers to access a homepage before creating a meal plan",
                "Enhance the process for uploading and managing information for multiple family members",
                "Provide an option for users to opt-out of sharing their location with the app for privacy reasons"
              ].map((rec, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface border border-primary/30 flex items-center justify-center text-[12px] font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p>{rec}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* LOW-FI PROTOTYPE #2 */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          {/* Header */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-12 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                06. Low-fi Prototype #2
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight mb-4">
                Low-fi Prototype #2
              </h2>
              <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light">
                After conducting a usability study on the initial prototype, I have developed a second low-fidelity prototype incorporating the improvements and changes identified in the study findings. This prototype will be used as the foundation for creating a high-fidelity prototype.
              </p>
            </div>
          </div>

          {/* 3 Columns Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              {
                num: "1",
                title: "Home page",
                text: "Upon successful login, users are directed to the home page, where they can browse a variety of recipes, create a personalized meal plan, and access the trading area."
              },
              {
                num: "2",
                title: "Family Members",
                text: "Users can now easily add and manage the settings for each member of their family in the meal plan creation settings."
              },
              {
                num: "3",
                title: "Location",
                text: "Users now have the option to manually enter their address as an alternative to sharing their location, allowing for greater privacy control."
              }
            ].map((col) => (
              <div
                key={col.num}
                className="p-6 rounded-[20px] bg-surface border border-border flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <span className="text-[28px] font-serif text-primary block mb-2">{col.num}</span>
                  <h4 className="font-sans text-[15px] font-semibold text-primary mb-2">{col.title}</h4>
                  <p className="font-sans text-[13px] leading-[20px] text-foreground/70 font-light">{col.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Featured Low-fi Image */}
          <div className="mt-8">
            <Image
              src="/bite-testing-second-prototype.webp"
              alt="Bite App Low-fidelity Prototype Showcase"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px] border border-border"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </motion.section>

      {/* DESIGN & STYLING */}
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
              06. Design & Styling
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-tight font-normal">
              Style Sheet
            </h2>
            <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light max-w-4xl">
              As the lead UI designer on this project, I created the style sheet and components that gave the app its cohesive look and feel.
            </p>
          </div>

          {/* Featured Image */}
          <div className="mt-8">
            <Image
              src="/bite-style.webp"
              alt="Bite App Style Sheet Showcase"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px] border border-border"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        </div>
      </motion.section>

      {/* SECOND TESTING & ITERATION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          {/* Header */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left items-start">
            <div className="md:col-span-12 font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light space-y-4">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold uppercase tracking-[3px] text-secondary">
                07. Testing
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-[1.1] font-normal tracking-tight">
                Usability study: findings
              </h2>
              <p>
                I conducted a moderated research study to evaluate users' ability to complete key tasks and gather feedback on specific features, such as generating a meal plan and check recipes.
              </p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mt-8">
            <Image
              src="/usability findings.webp"
              alt="Bite App Usability Findings Showcase"
              width={0}
              height={0}
              sizes="100vw"
              className="w-full h-auto rounded-[24px] md:rounded-[36px] border border-border"
              style={{ width: '100%', height: 'auto' }}
            />
          </div>

          {/* Recommendations Block */}
          <div className="mt-16 flex flex-col items-center text-center max-w-3xl mx-auto space-y-8">
            <h3 className="font-serif text-[26px] md:text-[34px] text-primary tracking-tight font-normal border-b border-primary/20 pb-2 w-fit px-8">
              Recommendations:
            </h3>
            <ul className="space-y-6 text-left font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light w-full">
              {[
                "Include menu on meal card with options to include it on a meal plan",
                "Add option for users to add their own recipe",
                "Expand food type variables"
              ].map((rec, index) => (
                <li key={index} className="flex gap-4 items-start">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-surface border border-primary/30 flex items-center justify-center text-[12px] font-semibold text-primary">
                    {index + 1}
                  </span>
                  <p>{rec}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* MOCKUPS SHOWCASE */}
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
              08. Mockups
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-primary leading-tight font-normal">
              Simplifying the design
            </h2>
            <p className="font-sans text-[15px] md:text-[16px] leading-[26px] text-foreground/70 font-light max-w-4xl">
              I simplified the initial design of the app to focus on the key functions and reduce distractions for the users. I removed the information panel and replaced it with a direct function for creating meal plans. Now, users can create multiple meal plans and easily access them from the home page.
            </p>
          </div>

          {/* 3 Mockups Stack */}
          <div className="flex flex-col gap-8 md:gap-12 mt-8">
            {[
              { src: "/bite-mockup1.webp", alt: "Bite App Mockup 1" },
              { src: "/bite-mockup2.webp", alt: "Bite App Mockup 2" },
              { src: "/bite-mockup3.webp", alt: "Bite App Mockup 3" }
            ].map((mockup, index) => (
              <div key={index} className="overflow-hidden rounded-[24px] md:rounded-[36px] border border-border bg-surface shadow-sm">
                <Image
                  src={mockup.src}
                  alt={mockup.alt}
                  width={0}
                  height={0}
                  sizes="100vw"
                  className="w-full h-auto object-cover"
                  style={{ width: '100%', height: 'auto' }}
                />
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* FIGMA & BEHANCE LINKS INDEX */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-10">
          <div className="p-8 rounded-[24px] bg-surface border border-border space-y-8 text-left max-w-4xl mx-auto">
            <h3 className="font-serif text-[24px] text-primary border-b border-border pb-3">
              Figma Workspace & Case Study
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {/* Left Column: Figma files */}
              <div className="space-y-4">
                <h4 className="font-sans text-[12px] font-bold tracking-wider uppercase text-secondary">
                  Figma Work Files
                </h4>
                <ul className="space-y-3 font-sans text-[14px]">
                  {[
                    { label: "Wireframes", url: "https://www.figma.com/design/Mc4k5Jufrn1OmHLrRPKZMb/Bite-App---Web?node-id=47-38&m=dev&t=tXE5hBvipYofyxsk-1" },
                    { label: "Test prototype", url: "https://www.figma.com/design/Mc4k5Jufrn1OmHLrRPKZMb/Bite-App---Web?node-id=58-2702&m=dev&t=tXE5hBvipYofyxsk-1" },
                    { label: "Low-fi prototype", url: "https://www.figma.com/design/Mc4k5Jufrn1OmHLrRPKZMb/Bite-App---Web?node-id=65-14192&m=dev&t=tXE5hBvipYofyxsk-1" },
                    { label: "Mockup", url: "https://www.figma.com/design/Mc4k5Jufrn1OmHLrRPKZMb/Bite-App---Web?node-id=127-73&m=dev&t=tXE5hBvipYofyxsk-1" }
                  ].map((link, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-secondary">•</span>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-85 transition-opacity">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: Iterations & Behance */}
              <div className="space-y-4">
                <h4 className="font-sans text-[12px] font-bold tracking-wider uppercase text-secondary">
                  Prototypes & Publication
                </h4>
                <ul className="space-y-3 font-sans text-[14px]">
                  {[
                    { label: "Iteration: prototype 1", url: "https://www.figma.com/design/Mc4k5Jufrn1OmHLrRPKZMb/Bite-App---Web?node-id=320-4312&m=dev&t=tXE5hBvipYofyxsk-1" },
                    { label: "Prototype 2", url: "https://www.figma.com/design/Mc4k5Jufrn1OmHLrRPKZMb/Bite-App---Web?node-id=383-2536&m=dev&t=tXE5hBvipYofyxsk-1" },
                    { label: "Style sheet", url: "https://www.figma.com/design/Mc4k5Jufrn1OmHLrRPKZMb/Bite-App---Web?node-id=137-215&m=dev&t=tXE5hBvipYofyxsk-1" },
                    { label: "Behance Case Study", url: "https://www.behance.net/gallery/168776561/Bite-App" }
                  ].map((link, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="text-secondary">•</span>
                      <a href={link.url} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-85 transition-opacity font-medium">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
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
              className={`inline-block px-4 py-1.5 rounded-full font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit ${isReadingMode
                ? "bg-background/10 text-background"
                : "bg-[var(--cs-highlight-bg)] text-secondary"
                }`}
            >
              Other Projects
            </span>
            <h2
              className={`font-serif text-[42px] md:text-[64px] leading-[1.05] font-normal tracking-tight ${isReadingMode ? "text-background" : "text-secondary"
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
