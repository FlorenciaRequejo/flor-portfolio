"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function WebDesignAndDevelopmentPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");
  const containerRef = useRef<HTMLDivElement>(null);

  // Track global page scroll progress for the left edge timeline
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    { id: "overview", label: "Overview", percentage: "10%" },
    { id: "challenge", label: "Challenge", percentage: "20%" },
    { id: "architecture", label: "Architecture", percentage: "40%" },
    { id: "automation", label: "Automation", percentage: "60%" },
    { id: "ui-design", label: "UI Design", percentage: "75%" },
    { id: "migration", label: "Migration", percentage: "90%" },
    { id: "launch", label: "Launch", percentage: "95%" },
    { id: "outcome", label: "Outcome", percentage: "100%" },
  ];

  // Track active section as the user scrolls
  useEffect(() => {
    const handleActiveSection = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleActiveSection);
    handleActiveSection();
    return () => window.removeEventListener("scroll", handleActiveSection);
  }, []);

  // Smooth scroll handler with offset for sticky components
  const handleRoadmapClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = window.innerWidth >= 768 ? 160 : 130;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({
        top,
        behavior: "smooth",
      });
    }
  };

  return (
    <div ref={containerRef} className="relative w-full min-h-screen bg-[#1B237A] text-[#FAF6F0] selection:bg-[#FDABFF] selection:text-[#1B237A]">
      {/* Floating Outline Navbar */}
      <Navbar />

      {/* LEFT EDGE TIMELINE */}
      <div className="fixed left-4 md:left-8 lg:left-12 top-[20vh] bottom-[20vh] w-[2px] bg-white/10 z-40 hidden sm:flex flex-col items-center">
        {/* Fill Line */}
        <div
          className="absolute top-0 w-full bg-[#FDABFF] transition-all duration-75 ease-out rounded-full shadow-[0_0_8px_rgba(253, 171, 255,0.5)]"
          style={{ height: `${scrollProgress}%` }}
        />

        {/* Top Accent Dot */}
        <div className="absolute top-0 -translate-y-1/2 w-2 h-2 rounded-full bg-[#FDABFF] shadow-[0_0_8px_rgba(253, 171, 255,0.8)]" />

        {/* Dynamic Status at the Bottom */}
        <div className="absolute bottom-[-75px] flex flex-col items-center text-center select-none w-32">
          <div className="w-2 h-2 rounded-full bg-[#FDABFF] shadow-[0_0_8px_rgba(253, 171, 255,0.8)] mb-2" />
          <span className="text-[#FDABFF] font-serif text-[18px] leading-none font-bold tracking-tight">
            {Math.round(scrollProgress)}%
          </span>
          <span className="text-white/40 text-[9px] uppercase tracking-[1.5px] font-sans font-medium mt-1 leading-tight block max-w-[100px]">
            {scrollProgress === 0
              ? "at page load"
              : scrollProgress >= 99
                ? "when reaching the end"
                : "reading progress"}
          </span>
        </div>
      </div>

      {/* HERO SECTION */}
      <section className="relative w-full h-screen overflow-hidden flex flex-col justify-between items-center pt-32 pb-16 px-6 md:px-16 lg:px-24">
        {/* Cover Hero Image */}
        <div className="absolute inset-0 w-full h-full">
          <Image
            src="/placeholder.jpg"
            alt="Waatea News Platform"
            fill
            priority
            sizes="100vw"
            className="w-full h-full object-cover object-center"
          />
          {/* Deep dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B237A] via-[#1B237A]/75 to-[#1B237A]/40" />
        </div>

        {/* Centered Hero Content */}
        <div className="relative z-10 text-center max-w-[980px] my-auto flex flex-col items-center justify-center gap-6">
          <motion.span
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-sans text-xs md:text-sm tracking-[4px] uppercase text-[#FDABFF] font-medium"
          >
            Waatea News Platform Rebuild
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className="font-serif text-[48px] sm:text-[68px] md:text-[88px] lg:text-[104px] leading-[1.02] text-[#FDABFF] font-normal tracking-tight"
          >
            WAATEA
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/95 max-w-[840px] leading-snug font-light"
          >
            Rebuilding a High-Volume News Platform Without Breaking the Editorial Workflow
          </motion.p>
        </div>

        {/* Hero Metadata Info Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="relative z-10 w-full max-w-[1260px] border-t border-white/10 pt-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-left"
        >
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#FDABFF] font-semibold">
              Role
            </span>
            <div className="font-sans text-xs md:text-[13px] text-white/70 space-y-1">
              <p>Product Developer</p>
              <p>UX/UI Designer</p>
              <p>Systems Architect</p>
              <p>Automation Designer</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#FDABFF] font-semibold">
              Duration
            </span>
            <div className="font-sans text-xs md:text-[13px] text-white/70">
              <p>Multi-stage rebuild</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-sans text-[10px] uppercase tracking-widest text-[#FDABFF] font-semibold">
              Deliverables
            </span>
            <div className="font-sans text-xs md:text-[13px] text-white/70 space-y-1">
              <p>Architecture & Migration Strategy</p>
              <p>Automation Pipeline & Content Workflows</p>
              <p>UI/UX Design System</p>
              <p>WordPress Core Integration</p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* STICKY ROADMAP / JOURNEY NAVIGATION */}
      <div className="sticky top-[76px] md:top-[86px] z-30 w-full bg-[#1B237A]/95 backdrop-blur-md border-b border-white/10 py-4 px-6 md:px-16 lg:px-24">
        <div className="max-w-[1260px] mx-auto overflow-x-auto scrollbar-none flex justify-between items-center gap-6 md:gap-8 text-[11px] font-sans">
          {sections.map((sec) => {
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                onClick={() => handleRoadmapClick(sec.id)}
                className={`flex items-center gap-1.5 whitespace-nowrap uppercase tracking-widest transition-all duration-300 ${isActive
                    ? "text-[#FDABFF] font-bold"
                    : "text-white/40 hover:text-white/80"
                  }`}
              >
                <span>{sec.label}</span>
                <span className="text-[9px] text-white/10">...........</span>
                <span className={isActive ? "text-[#FDABFF]" : "text-white/30"}>
                  {sec.percentage}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* CORE CASE STUDY SECTIONS CONTAINER */}
      <div className="max-w-[1260px] mx-auto px-6 md:px-16 lg:px-24 pb-32 space-y-32 md:space-y-48">

        {/* SECTION 1: OVERVIEW */}
        <section id="overview" className="scroll-mt-48 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 pt-24">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FDABFF]/10 text-[#FDABFF] font-sans font-medium text-[11px] tracking-[2.5px] uppercase w-fit">
              01 Journey
            </span>
            <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.05] text-[#FDABFF] font-normal tracking-tight">
              Overview
            </h2>
          </div>

          <div className="lg:col-span-8 flex flex-col gap-6 text-left">
            <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-white/80 font-light">
              Waatea News represents a critical cultural and community broadcasting hub. Over two decades, the platform compiled a massive digital repository of Māori-focused news stories, interviews, and real-time audio broadcasts. Over time, however, quick technical fixes and mounting structural constraints turned their legacy website into an operational bottleneck.
            </p>
            <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-white/80 font-light">
              The legacy platform, built entirely on a highly modified, monolithic WordPress configuration, was struggling under the weight of severe technical debt. Editorial teams had to wrestle with manual workflows, audio files were managed without structured metadata, and the front-end layout failed to communicate news hierarchy on modern mobile devices. High traffic spikes frequently caused severe performance degradation, hindering their ability to deliver critical news when it mattered most.
            </p>

            <div className="border-l-2 border-[#FDABFF] pl-6 py-2 my-8">
              <p className="font-serif text-2xl md:text-3xl lg:text-4xl text-[#FDABFF] leading-snug font-normal italic">
                "This was not a website redesign. It was a publishing infrastructure rebuild."
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 2: THE CHALLENGE */}
        <section id="challenge" className="scroll-mt-48 pt-12 border-t border-white/10">
          <div className="flex flex-col gap-4 mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FDABFF]/10 text-[#FDABFF] font-sans font-medium text-[11px] tracking-[2.5px] uppercase w-fit">
              02 The Bottleneck
            </span>
            <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.05] text-[#FDABFF] font-normal tracking-tight">
              The Challenge
            </h2>
          </div>

          <div className="space-y-12">
            {/* Storytelling introduction */}
            <p className="font-serif text-2xl md:text-3xl text-white/90 leading-relaxed max-w-[940px] font-light">
              Over two decades of continuous broadcasting, the platform compiled an archive containing tens of thousands of media artifacts. Behind the curtain, however, the digital engine was failing under the weight of its own history.
            </p>

            {/* Visual statistics grid (replaces walls of text) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 pt-8">
              <div className="bg-[#1B237A]/40 border border-white/10 rounded-[28px] p-8 hover:border-[#FDABFF]/30 transition-all duration-300">
                <span className="block font-serif text-[42px] text-[#FDABFF] font-bold mb-4">50K+</span>
                <h4 className="font-sans text-[14px] uppercase tracking-wider text-[#FDABFF] font-bold mb-2">Legacy Articles</h4>
                <p className="font-sans text-[14px] text-white/60 leading-[22px]">
                  Decades of historical reporting structured across varying formats, requiring unified schema transformation.
                </p>
              </div>

              <div className="bg-[#1B237A]/40 border border-white/10 rounded-[28px] p-8 hover:border-[#FDABFF]/30 transition-all duration-300">
                <span className="block font-serif text-[42px] text-[#FDABFF] font-bold mb-4">40GB+</span>
                <h4 className="font-sans text-[14px] uppercase tracking-wider text-[#FDABFF] font-bold mb-2">Audio Media Files</h4>
                <p className="font-sans text-[14px] text-white/60 leading-[22px]">
                  Unstructured radio broadcasts and field interviews stored directly in default directories without proper metadata schemas.
                </p>
              </div>

              <div className="bg-[#1B237A]/40 border border-white/10 rounded-[28px] p-8 hover:border-[#FDABFF]/30 transition-all duration-300">
                <span className="block font-serif text-[42px] text-[#FDABFF] font-bold mb-4">PHP 5.6</span>
                <h4 className="font-sans text-[14px] uppercase tracking-wider text-[#FDABFF] font-bold mb-2">Deprecated Legacy</h4>
                <p className="font-sans text-[14px] text-white/60 leading-[22px]">
                  A host of deprecated library dependencies and unsupported plugins, presenting severe stability and security concerns.
                </p>
              </div>
            </div>

            {/* Typography callout narrative block */}
            <div className="bg-[#FDABFF]/5 border-l-4 border-[#FDABFF] rounded-r-[24px] p-8 md:p-12 space-y-6">
              <h3 className="font-serif text-[24px] md:text-[32px] text-[#FDABFF] leading-tight font-normal">
                Why a conventional redesign would fail
              </h3>
              <p className="font-sans text-[16px] md:text-[18px] leading-[28px] text-white/85 max-w-[900px] font-light">
                An overlay solution would leave the underlying structural fragmentation completely intact. The editorial team would still waste hours manually converting audio formats, media loading speeds would continue to degrade under concurrent user loads, and deprecated PHP functions could break page layouts unpredictably. A complete systemic separation of concerns was required to secure the platform's future.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION 3: ARCHITECTURE STRATEGY */}
        <section id="architecture" className="scroll-mt-48 pt-12 border-t border-white/10">
          <div className="flex flex-col gap-4 mb-8">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FDABFF]/10 text-[#FDABFF] font-sans font-medium text-[11px] tracking-[2.5px] uppercase w-fit">
              03 Structural Design
            </span>
            <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.05] text-[#FDABFF] font-normal tracking-tight">
              Architecture Strategy
            </h2>
          </div>

          <div className="space-y-12">
            <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-white/80 max-w-[860px] font-light">
              The fundamental problem was structural: **one monolithic WordPress system was doing everything**—storing content, parsing broadcasts, transcoding audio, hosting media assets, and rendering pages. Under heavy visitor traffic, the database locked up, blocking editors from publishing breaking updates.
            </p>

            {/* Large Blueprint Infographic Container */}
            <div className="w-full h-[520px] md:h-[680px] border border-white/10 rounded-[40px] bg-[#0B1F6B] relative overflow-hidden flex flex-col justify-between p-8 md:p-12">
              {/* Background grid markings for diagram feel */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />

              {/* Blueprint Title */}
              <div className="relative z-10 flex justify-between items-start border-b border-white/10 pb-6 w-full">
                <div>
                  <span className="text-[10px] tracking-[3px] uppercase text-[#FDABFF] font-semibold block mb-1">
                    System Topology
                  </span>
                  <h4 className="font-serif text-lg md:text-xl text-white">
                    Decoupled Infrastructure Map
                  </h4>
                </div>
                <span className="px-3 py-1 border border-[#FDABFF]/30 rounded-full font-sans text-[9px] uppercase tracking-widest text-[#FDABFF] font-bold">
                  Draft v2.4
                </span>
              </div>

              {/* Central Blueprint Box */}
              <div className="relative z-10 my-auto flex flex-col items-center justify-center gap-6">
                <div className="relative w-24 h-24 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-dashed border-[#FDABFF]/30 animate-spin" style={{ animationDuration: "30s" }} />
                  <div className="w-16 h-16 rounded-full bg-[#FDABFF]/10 border border-[#FDABFF]/30 flex items-center justify-center">
                    <span className="text-[#FDABFF] font-serif text-[24px]">⚙</span>
                  </div>
                </div>
                <div className="text-center space-y-2 max-w-[400px]">
                  <p className="font-serif text-[18px] text-[#FDABFF]">
                    [Architecture Diagram Coming Soon]
                  </p>
                  <p className="font-sans text-[12px] text-white/40 leading-relaxed">
                    Interactive engineering blueprint illustrating API gateways, audio transcoding nodes, CDN layer configurations, and WordPress endpoints.
                  </p>
                </div>
              </div>

              {/* Legend details */}
              <div className="relative z-10 w-full border-t border-white/10 pt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left font-sans text-[10px]">
                <div>
                  <span className="block text-[#FDABFF] font-bold mb-1">01 / SOURCE</span>
                  <span className="text-white/40">Studio Automation API</span>
                </div>
                <div>
                  <span className="block text-[#FDABFF] font-bold mb-1">02 / PIPELINE</span>
                  <span className="text-white/40">Worker & Parser Layer</span>
                </div>
                <div>
                  <span className="block text-[#FDABFF] font-bold mb-1">03 / AUDIO CDN</span>
                  <span className="text-white/40">S3 Media Object Host</span>
                </div>
                <div>
                  <span className="block text-[#FDABFF] font-bold mb-1">04 / RENDER</span>
                  <span className="text-white/40">Staged WP Core Endpoint</span>
                </div>
              </div>
            </div>

            {/* Separated Responsibilities Flow */}
            <div className="pt-8 space-y-8">
              <h3 className="font-serif text-[28px] text-[#FDABFF] leading-tight font-normal">
                Separating Responsibilities: The Decoupled Model
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative">
                {/* Horizontal arrows on desktop (using absolute container) */}
                <div className="hidden md:block absolute top-[44px] left-[15%] right-[15%] h-[1px] bg-gradient-to-r from-[#FDABFF]/50 to-transparent z-0" />

                <div className="bg-[#0B1F6B]/60 border border-white/10 rounded-[24px] p-6 relative z-10">
                  <span className="font-sans text-[11px] font-semibold text-[#FDABFF] uppercase tracking-wider block mb-3">01 / Source System</span>
                  <h4 className="font-serif text-[18px] text-white font-normal mb-2">Studio Desk</h4>
                  <p className="font-sans text-[13px] text-white/50 leading-relaxed">
                    Local radio automation pipeline exporting XML metadata and audio tracks directly.
                  </p>
                </div>

                <div className="bg-[#0B1F6B]/60 border border-white/10 rounded-[24px] p-6 relative z-10">
                  <span className="font-sans text-[11px] font-semibold text-[#FDABFF] uppercase tracking-wider block mb-3">02 / Processing Layer</span>
                  <h4 className="font-serif text-[18px] text-white font-normal mb-2">Pipeline Parser</h4>
                  <p className="font-sans text-[13px] text-white/50 leading-relaxed">
                    Validation service transforming data formats and transcoding legacy audio files.
                  </p>
                </div>

                <div className="bg-[#0B1F6B]/60 border border-white/10 rounded-[24px] p-6 relative z-10">
                  <span className="font-sans text-[11px] font-semibold text-[#FDABFF] uppercase tracking-wider block mb-3">03 / Media Server</span>
                  <h4 className="font-serif text-[18px] text-white font-normal mb-2">CDN Storage</h4>
                  <p className="font-sans text-[13px] text-white/50 leading-relaxed">
                    S3 media container distributing audio files globally, reducing database processing loads.
                  </p>
                </div>

                <div className="bg-[#0B1F6B]/60 border border-white/10 rounded-[24px] p-6 relative z-10">
                  <span className="font-sans text-[11px] font-semibold text-[#FDABFF] uppercase tracking-wider block mb-3">04 / Live Site</span>
                  <h4 className="font-serif text-[18px] text-white font-normal mb-2">WordPress Host</h4>
                  <p className="font-sans text-[13px] text-white/50 leading-relaxed">
                    Decoupled front-end rendering pages instantly from a lightweight database.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 4: AUTOMATION & CONTENT PIPELINE */}
        <section id="automation" className="scroll-mt-48 pt-12 border-t border-white/10">
          <div className="flex flex-col gap-4 mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FDABFF]/10 text-[#FDABFF] font-sans font-medium text-[11px] tracking-[2.5px] uppercase w-fit">
              04 Automation Pipeline
            </span>
            <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.05] text-[#FDABFF] font-normal tracking-tight">
              Automation & Content Pipeline
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
            <div className="lg:col-span-5 flex flex-col gap-6 text-left">
              <h3 className="font-serif text-[28px] text-white leading-tight font-normal">
                Connecting broadcast studios directly to the web
              </h3>
              <p className="font-sans text-[16px] leading-[26px] text-white/80 font-light">
                Broadcasters generate high-quality audio files constantly during the day. In the legacy workflow, editors had to manually transfer these files from raw network drives, transcode audio codecs, format metadata tags, and paste them manually into WordPress articles.
              </p>
              <p className="font-sans text-[16px] leading-[26px] text-white/80 font-light">
                We designed an event-driven automation framework. Once a reporter saves a record at the studio desk, the pipeline takes over—verifying raw audio integrity, mapping metadata schemas, distributing resources to S3 containers, and rendering draft posts automatically.
              </p>
            </div>

            {/* Alternating Automation Steps Flow Grid */}
            <div className="lg:col-span-7 space-y-6">
              {[
                {
                  step: "01",
                  title: "Collect Files",
                  desc: "Watcher processes monitor local networks to capture new raw files directly from studio automation logs.",
                },
                {
                  step: "02",
                  title: "Parse Content",
                  desc: "Metadata parsers extract tags, categories, descriptions and author details from XML configurations.",
                },
                {
                  step: "03",
                  title: "Validate Assets",
                  desc: "Validation services check format compatibility and transcode MP3/WAV records to streaming formats automatically.",
                },
                {
                  step: "04",
                  title: "Publish to WordPress",
                  desc: "The core platform hooks create fully structured records with nested categories and linked media assets.",
                },
                {
                  step: "05",
                  title: "Monitor & Track",
                  desc: "Health trackers monitor status indicators to ensure uninterrupted publishing speed.",
                },
              ].map((item, idx) => (
                <div
                  key={item.step}
                  className="group bg-[#1B237A]/40 hover:bg-[#FDABFF]/5 border border-white/10 hover:border-[#FDABFF]/30 rounded-[24px] p-6 flex items-start gap-6 transition-all duration-300 transform hover:-translate-y-1"
                >
                  <span className="font-serif text-3xl font-bold text-[#FDABFF]/30 group-hover:text-[#FDABFF] transition-colors duration-300">
                    {item.step}
                  </span>
                  <div className="space-y-1.5 text-left">
                    <h4 className="font-serif text-[18px] text-white group-hover:text-[#FDABFF] transition-colors duration-300">
                      {item.title}
                    </h4>
                    <p className="font-sans text-[14px] text-white/60 leading-[22px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 5: UI & CONTENT EXPERIENCE */}
        <section id="ui-design" className="scroll-mt-48 pt-12 border-t border-white/10">
          <div className="flex flex-col gap-4 mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FDABFF]/10 text-[#FDABFF] font-sans font-medium text-[11px] tracking-[2.5px] uppercase w-fit">
              05 User Experience
            </span>
            <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.05] text-[#FDABFF] font-normal tracking-tight">
              UI & Content Experience
            </h2>
          </div>

          <div className="space-y-24">

            {/* Alternating Layout 1: Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="lg:col-span-6 relative aspect-[4/3] rounded-[32px] overflow-hidden border border-white/10">
                <Image
                  src="/placeholder.jpg"
                  alt="News hierarchy illustration"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-6 flex flex-col gap-4 text-left">
                <span className="text-[11px] font-sans uppercase tracking-[2px] text-[#FDABFF] font-semibold">
                  01 / Information Architecture
                </span>
                <h3 className="font-serif text-[28px] md:text-[34px] text-white leading-tight font-normal">
                  Defining News Hierarchy & Audio Discovery
                </h3>
                <p className="font-sans text-[15px] leading-[24px] text-white/70 font-light">
                  A high-volume news site needs to command attention. We overhauled page structures, ensuring real-time news alerts are immediately visible while providing prominent audio triggers for visitors to play broadcasts without navigating away from the page.
                </p>
              </div>
            </div>

            {/* Alternating Layout 2: Image Right, Text Left */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="lg:col-span-6 order-2 lg:order-1 flex flex-col gap-4 text-left">
                <span className="text-[11px] font-sans uppercase tracking-[2px] text-[#FDABFF] font-semibold">
                  02 / Mobile Experience
                </span>
                <h3 className="font-serif text-[28px] md:text-[34px] text-white leading-tight font-normal">
                  Seamless Access Across Devices
                </h3>
                <p className="font-sans text-[15px] leading-[24px] text-white/70 font-light">
                  Over 75% of Waatea's audience accesses news stories directly from mobile devices. The custom media players and text hierarchies were redesigned to load instantly, scaling down perfectly on varying screen sizes while maintaining touch target convenience.
                </p>
              </div>
              <div className="lg:col-span-6 order-1 lg:order-2 relative aspect-[4/3] rounded-[32px] overflow-hidden border border-white/10">
                <Image
                  src="/placeholder.jpg"
                  alt="Mobile device view mock"
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Alternating Layout 3: Image Left, Text Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
              <div className="lg:col-span-6 relative aspect-[4/3] rounded-[32px] overflow-hidden border border-white/10">
                <Image
                  src="/placeholder.jpg"
                  alt="Design system overview"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="lg:col-span-6 flex flex-col gap-4 text-left">
                <span className="text-[11px] font-sans uppercase tracking-[2px] text-[#FDABFF] font-semibold">
                  03 / Scale & Performance
                </span>
                <h3 className="font-serif text-[28px] md:text-[34px] text-white leading-tight font-normal">
                  Designing a Reusable Modular System
                </h3>
                <p className="font-sans text-[15px] leading-[24px] text-white/70 font-light">
                  Instead of static layouts, we built a modular system of reusable components. Editorial leads can dynamically reorganize landing sections to emphasize breaking coverage, while background caching systems ensure page rendering speeds remain high.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* SECTION 6: MIGRATION STRATEGY */}
        <section id="migration" className="scroll-mt-48 pt-12 border-t border-white/10">
          <div className="flex flex-col gap-4 mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FDABFF]/10 text-[#FDABFF] font-sans font-medium text-[11px] tracking-[2.5px] uppercase w-fit">
              06 Data Preservation
            </span>
            <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.05] text-[#FDABFF] font-normal tracking-tight">
              Migration Strategy
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
            {/* Context Explanation */}
            <div className="lg:col-span-4 space-y-6 text-left">
              <h3 className="font-serif text-[28px] text-white leading-tight font-normal">
                Safeguarding 20 years of news history
              </h3>
              <p className="font-sans text-[15px] leading-[24px] text-white/70 font-light">
                A common issue during platform migrations is the loss of media metadata, breaking permalinks, and corrupting historical records. We treated the migration process as a controlled pipeline, utilizing audit tables and verification scripts to ensure complete integrity.
              </p>

              <div className="border-l border-[#FDABFF]/30 pl-4 py-1 text-white/60 text-xs font-sans space-y-2">
                <p className="font-semibold text-white">Migration Control Matrix</p>
                <p>• Unique lookup mapping tables</p>
                <p>• Fallback audio patterns</p>
                <p>• Automated redirects tracking integrity</p>
              </div>
            </div>

            {/* Vertical timeline steps */}
            <div className="lg:col-span-8 relative pl-6 border-l border-white/15 ml-4 space-y-12">
              {[
                {
                  num: "01",
                  title: "Extract Content",
                  desc: "Sanitized data dump extracting 50,000+ posts from legacy database structures, separating content markup from PHP wrappers.",
                },
                {
                  num: "02",
                  title: "Identify Media Links",
                  desc: "Scanning HTML records to map all nested image attachments and raw MP3 audio URLs.",
                },
                {
                  num: "03",
                  title: "Move Assets",
                  desc: "Bulk media transfers copying directory structures directly to S3 storage bucket buckets securely.",
                },
                {
                  num: "04",
                  title: "Validate Metadata",
                  desc: "Verifying category taxonomy structures, publication dates, and author profiles match corresponding archives.",
                },
                {
                  num: "05",
                  title: "Publish Safely",
                  desc: "Staged imports publishing elements in batches, validating post ID ranges to prevent database collision errors.",
                },
                {
                  num: "06",
                  title: "Track Status",
                  desc: "Running audit scripts comparing original and new database records to confirm zero article losses.",
                },
              ].map((step, idx) => (
                <div key={step.num} className="relative flex gap-6 text-left">
                  {/* Circle dot on line */}
                  <div className="absolute left-[-31px] top-1.5 w-[11px] h-[11px] rounded-full bg-[#FDABFF] border border-[#1B237A] shadow-[0_0_6px_#FDABFF]" />

                  <div>
                    <span className="font-sans text-[10px] tracking-wider text-[#FDABFF] font-bold block mb-1">
                      STEP {step.num}
                    </span>
                    <h4 className="font-serif text-[18px] text-white font-normal mb-1">
                      {step.title}
                    </h4>
                    <p className="font-sans text-[14px] text-white/50 leading-relaxed font-light">
                      {step.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 7: LAUNCH STRATEGY */}
        <section id="launch" className="scroll-mt-48 pt-12 border-t border-white/10">
          <div className="flex flex-col gap-4 mb-12">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FDABFF]/10 text-[#FDABFF] font-sans font-medium text-[11px] tracking-[2.5px] uppercase w-fit">
              07 Risk Management
            </span>
            <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.05] text-[#FDABFF] font-normal tracking-tight">
              Launch Strategy
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-start">
            <div className="lg:col-span-5 text-left space-y-6">
              <h3 className="font-serif text-[28px] text-white leading-tight font-normal">
                Executing a zero-downtime transition
              </h3>
              <p className="font-sans text-[15px] leading-[24px] text-white/70 font-light">
                For a breaking news platform, dropping offline for multiple hours is unacceptable. We executed a double-publishing launch strategy to ensure continuous operations while staging changes.
              </p>
              <p className="font-sans text-[15px] leading-[24px] text-white/70 font-light">
                This approach allowed us to launch the database, deploy DNS records, and test CDN performance without interrupting the newsroom's writing schedules.
              </p>
            </div>

            {/* Launch Checklist Grid */}
            <div className="lg:col-span-7 bg-[#0B1F6B]/60 border border-white/10 rounded-[32px] p-8 space-y-6 text-left">
              <span className="font-sans text-[10px] tracking-[3px] uppercase text-[#FDABFF] font-semibold block border-b border-white/10 pb-4">
                LAUNCH DEPLOYMENT RUNBOOK
              </span>

              <div className="space-y-6">
                {[
                  {
                    title: "Delta Migration Sync",
                    desc: "Running differential database syncs right before launch to capture articles published during transition staging.",
                  },
                  {
                    title: "Sanity & Integrity Testing",
                    desc: "Verifying audio players, metadata categorization, search indices, and user authentication on the production database.",
                  },
                  {
                    title: "DNS Switchover Preparation",
                    desc: "Configuring Cloudflare caching layers and lowering TTL records to distribute DNS changes globally within minutes.",
                  },
                  {
                    title: "Validation Audits",
                    desc: "Running custom check-scripts to monitor error logs and verify asset routing path requests.",
                  },
                  {
                    title: "Warm Up Caching Layers",
                    desc: "Executing query warmups on heavy category pages to ensure first-time visitors receive instant responses.",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <span className="text-[#FDABFF] text-lg select-none">✓</span>
                    <div className="space-y-1">
                      <h4 className="font-serif text-[16px] text-white leading-none font-semibold">
                        {item.title}
                      </h4>
                      <p className="font-sans text-[13px] text-white/40 leading-relaxed font-light">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 8: OUTCOME & CONTRIBTIONS */}
        <section id="outcome" className="scroll-mt-48 pt-12 border-t border-white/10 space-y-16">
          <div className="flex flex-col gap-4">
            <span className="inline-block px-3 py-1 rounded-full bg-[#FDABFF]/10 text-[#FDABFF] font-sans font-medium text-[11px] tracking-[2.5px] uppercase w-fit">
              08 Impact & Outcomes
            </span>
            <h2 className="font-serif text-[42px] md:text-[56px] leading-[1.05] text-[#FDABFF] font-normal tracking-tight">
              Outcome & Contributions
            </h2>
          </div>

          {/* Outcome cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "Modernised Front-End",
                desc: "Responsive grid layouts featuring high readability, prioritizing article accessibility and custom audio player availability.",
              },
              {
                title: "Separated Media Server",
                desc: "Migrated 40GB+ of audio materials to secure storage containers, dropping server performance load by over 60%.",
              },
              {
                title: "Automated Publishing",
                desc: "Transformed manual transcoding workflows into an event-driven ingestion pipeline, saving hours daily.",
              },
              {
                title: "Safer Migration Process",
                desc: "Migrated 50,000+ posts systematically with audit matrices, preventing archive loss.",
              },
              {
                title: "Improved Maintainability",
                desc: "Replaced custom PHP code and dependencies with modular layouts, simplifying operations.",
              },
              {
                title: "Reduced Technical Debt",
                desc: "Sanitized database configurations and updated dependencies, ensuring security standards.",
              },
            ].map((card, idx) => (
              <div
                key={idx}
                className="bg-[#0B1F6B]/40 border border-white/10 rounded-[28px] p-8 hover:border-[#FDABFF]/30 transition-all duration-300"
              >
                <h4 className="font-serif text-[18px] text-[#FDABFF] font-normal mb-3">
                  {card.title}
                </h4>
                <p className="font-sans text-[14px] text-white/50 leading-[22px]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

          {/* What I Personally Solved */}
          <div className="bg-white text-[#1B237A] rounded-[36px] p-8 md:p-12 lg:p-16 space-y-8 text-left">
            <span className="font-sans text-[11px] uppercase tracking-[3px] text-[#1B237A]/60 font-semibold">
              My Contribution
            </span>
            <h3 className="font-serif text-[36px] md:text-[48px] leading-tight text-[#1B237A]">
              What I Personally Solved
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
              {[
                {
                  title: "Architecture Design",
                  desc: "Structured the decoupled environment separating WordPress layout delivery from backend studio database ingestion layers.",
                },
                {
                  title: "Automation Pipeline",
                  desc: "Developed directory listeners and processing tasks to automate audio parsing and formatting workflows.",
                },
                {
                  title: "Migration Scripting",
                  desc: "Created database mapping scripts to secure post associations and preserve permalinks.",
                },
                {
                  title: "UI/UX Design System",
                  desc: "Designed layout prototypes and mobile navigation configurations to prioritize audio playing features.",
                },
                {
                  title: "Theme Development",
                  desc: "Engineered high-performance WordPress themes, optimizing page sizes and reducing load speeds.",
                },
                {
                  title: "Go-Live Planning",
                  desc: "Developed transition runbooks and server configs, enabling zero-downtime DNS deployment changes.",
                },
              ].map((item, idx) => (
                <div key={idx} className="space-y-2">
                  <h4 className="font-serif text-[18px] text-[#1B237A] font-bold">
                    {item.title}
                  </h4>
                  <p className="font-sans text-[14px] text-[#1B237A]/75 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RELATED PROJECTS */}
        <section className="scroll-mt-48 pt-24 border-t border-white/10 space-y-12">
          <div className="text-left space-y-2">
            <span className="font-sans text-[11px] uppercase tracking-[3px] text-[#FDABFF] font-semibold">
              Keep Exploring
            </span>
            <h3 className="font-serif text-[36px] md:text-[48px] text-[#FDABFF] font-normal leading-tight">
              Related Projects
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                title: "E-Commerce System",
                desc: "An enterprise scalable shopping infrastructure with complex inventory integrations.",
              },
              {
                title: "Custom CRM & Workflow",
                desc: "A custom automation dashboard designed to manage lead assignment operations.",
              },
              {
                title: "Creative Portfolio Studio",
                desc: "A custom storytelling website created with dynamic interactions and animations.",
              },
            ].map((proj, idx) => (
              <div
                key={idx}
                className="group border border-white/10 rounded-[28px] overflow-hidden hover:border-[#FDABFF]/30 transition-all duration-300 flex flex-col justify-between h-[360px] relative bg-[#0B1F6B]/30"
              >
                {/* Visual card poster placeholder */}
                <div className="relative w-full h-[180px]">
                  <Image
                    src="/placeholder.jpg"
                    alt={proj.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-[#1B237A]/40" />
                </div>

                <div className="p-6 flex flex-col justify-between flex-grow text-left">
                  <div className="space-y-1">
                    <h4 className="font-serif text-[18px] text-white group-hover:text-[#FDABFF] transition-colors duration-300">
                      {proj.title}
                    </h4>
                    <p className="font-sans text-[13px] text-white/50 leading-relaxed font-light">
                      {proj.desc}
                    </p>
                  </div>
                  <span className="font-sans text-[11px] text-[#FDABFF] font-bold mt-4 block">
                    View Project ↗
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Slide-out entrance overlay logic */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
        className="fixed inset-0 bg-white z-50 pointer-events-none"
      />
    </div>
  );
}
