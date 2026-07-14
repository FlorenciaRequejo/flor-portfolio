"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/hero/FooterSection";

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
      staggerChildren: 0.12,
    },
  },
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-[#1B237A] text-[#FDABFF] selection:bg-[#FDABFF] selection:text-[#1B237A]">
      <Navbar />

      {/* SECTION 01 — HERO */}
      <section className="w-full pt-32 pb-20 md:pt-40 md:pb-28">
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">

          <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-12 lg:gap-16 items-start">

            {/* Left Column: Image + Skills */}
            {/* On mobile this appears second */}
            <div className="order-2 lg:order-1 flex flex-col gap-8">

              {/* Image */}
              <div className="w-full rounded-[24px] overflow-hidden">
                <Image
                  src="/florencia_requejo_about_us_2.webp"
                  alt="Florencia Requejo"
                  width={1200}
                  height={1346}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  priority
                />
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-5">

                {/* Design */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-2 font-sans text-[14px] font-semibold text-[#FDABFF]">
                    Design
                  </span>

                  {[
                    "UX/UI",
                    "Web design",
                    "Website architecture",
                    "Branding",
                    "Problem discovery",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[#FDABFF]/70 px-4 py-2 font-sans text-[12px] leading-none text-[#FDABFF]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Technology */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-2 font-sans text-[14px] font-semibold text-[#FDABFF]">
                    Technology
                  </span>

                  {[
                    "HTML & CSS",
                    "WordPress, WooCommerce & Shopify",
                    "AI-assisted development",
                    "Automation systems",
                    "API integrations",
                    "Python-based workflows",
                    "PHP customisations",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[#FDABFF]/70 px-4 py-2 font-sans text-[12px] leading-none text-[#FDABFF]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Analysis */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="mr-2 font-sans text-[14px] font-semibold text-[#FDABFF]">
                    Analysis & Optimisation
                  </span>

                  {[
                    "Website audits",
                    "SEO & GEO",
                    "User behaviour analysis",
                    "Performance optimisation",
                    "Business process improvement",
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-[#FDABFF]/70 px-4 py-2 font-sans text-[12px] leading-none text-[#FDABFF]"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

              </div>
            </div>

            {/* Right Column: Text + Buttons */}
            {/* On mobile this appears first */}
            <div className="order-1 lg:order-2 flex flex-col gap-6 text-left">

              <span className="font-sans text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#FDABFF]/75 font-semibold">
                ABOUT ME
              </span>

              <h1 className="font-serif text-[38px] sm:text-[48px] md:text-[62px] leading-[1.1] text-[#FDABFF] font-normal tracking-tight">
                I didn't plan a multidisciplinary career.
                <br />
                I just kept following the problems.
              </h1>

              <div className="flex flex-col gap-6 pt-2">
                <p className="w-full font-sans text-[15px] md:text-[17px] leading-[26px] text-[#FDABFF]/80 font-light">
                  I graduated as a graphic designer in 2008, but once I started
                  working, I quickly realised that nothing exists on its own.
                  Everything is part of something bigger, so I got curious about it.
                  How everything worked, why it worked that way, and what I needed to
                  understand to make my part fit better.
                </p>

                <p className="w-full font-sans text-[15px] md:text-[17px] leading-[26px] text-[#FDABFF]/80 font-light">
                  That curiosity took me from graphic design to self-taught
                  structural design, web development, UX/UI, automation and
                  eventually AI-powered product development.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <a
                  href="/florencia-requejo-cv.pdf"
                  download="florencia-requejo-cv.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-[50px] px-8 rounded-full bg-[#FDABFF] text-[#1B237A] font-sans font-semibold text-[11px] md:text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-200 hover:opacity-90"
                >
                  Download CV
                </a>

                <Link
                  href="/#projects"
                  className="h-[50px] px-8 rounded-full border border-[#FDABFF] text-[#FDABFF] font-sans font-semibold text-[11px] md:text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-200 hover:bg-[#FDABFF]/10"
                >
                  View My Work
                </Link>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — CAREER STORY */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-20 border-t border-[#FDABFF]/15"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">

          {/* Section Intro */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 text-left items-start">

            {/* Left Column — 50% */}
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                HOW I GOT HERE
              </span>

              <h2 className="font-serif text-[32px] md:text-[44px] text-[#FDABFF] leading-[1.15] font-normal tracking-tight">
                I started by learning how to communicate ideas. Now I want to make them work.
              </h2>
            </div>

            {/* Right Column — 50% */}
            <div className="font-sans text-[15px] md:text-[16px] leading-[26px] text-[#FDABFF]/80 font-light">
              <p>
                I graduated as a graphic designer in Argentina, but curiosity kept
                moving me forward, both professionally and geographically. From Italy
                to international clients, software development and eventually New
                Zealand, every move exposed me to a new part of the process. Design led
                me to code, physical products to users, digital to marketing, and
                repetitive workflows to automation and AI. I started by learning how
                to communicate ideas. Over time, I became more interested in
                understanding everything around them and making the whole system work.
              </p>
            </div>
          </div>

          {/* Career Milestones */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 text-left font-sans mt-12">

            {[
              {
                discipline: "Graphic Design Graduate",
                location: "Argentina",
                year: "2008",
                desc: "Graduated in Graphic Design and built the foundations of my career."
              },
              {
                discipline: "Adaptability + perspective",
                location: "Florence · Italy",
                year: "2008–09",
                desc: "Mario Olla Scholarship and my first professional experience abroad."
              },
              {
                discipline: "Design + code",
                location: "Argentina + global",
                year: "2009–12",
                desc: "Combined software development with graphic work for clients in Miami and Europe."
              },
              {
                discipline: "Users + digital systems",
                location: "Palmerston North · NZ",
                year: "2017–22",
                desc: "Expanded into structural design, web, UX/UI and digital leadership."
              },
              {
                discipline: "Marketing + product thinking",
                location: "Auckland · NZ",
                year: "2022–26",
                desc: "Learned how design, users, technology and business work together."
              },
              {
                discipline: "Automation + AI systems",
                location: "Auckland · NZ",
                year: "Today",
                desc: "Building connected products and workflows that do more of the work."
              }
            ].map((node, idx) => (

              <div
                key={idx}
                className="min-w-0 p-5 rounded-[16px] bg-[#FDABFF]/5 border border-[#FDABFF]/10 flex flex-col min-h-[220px] hover:border-[#FDABFF]/30 transition-colors duration-300"
              >

                {/* Discipline — Primary Information */}
                <h3 className="font-sans text-[18px] md:text-[20px] xl:text-[18px] 2xl:text-[20px] text-[#FDABFF] font-semibold leading-[1.15] tracking-[-0.02em] break-words [overflow-wrap:anywhere]">
                  {node.discipline}
                </h3>

                {/* Location and Year */}
                <div className="flex flex-col gap-1 mt-5">
                  <span className="font-sans text-[10px] leading-[1.4] tracking-[0.08em] uppercase text-[#B8F74B] font-bold break-words">
                    {node.location}
                  </span>

                  <span className="font-sans text-[11px] text-[#FDABFF]/50">
                    {node.year}
                  </span>
                </div>

                {/* Description */}
                <p className="font-sans text-[11px] text-[#FDABFF]/60 font-light mt-auto pt-6 leading-[1.65] break-words">
                  {node.desc}
                </p>

              </div>
            ))}
          </div>

        </div>
      </motion.section>

      {/* SECTION 05 — WHAT I BRING TO A TEAM */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-20 border-t border-[#FDABFF]/15"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 text-left items-start">

            {/* Left Column */}
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                THE VALUE OF RANGE
              </span>

              <h2 className="font-serif text-[32px] md:text-[44px] text-[#FDABFF] leading-[1.15] font-normal tracking-tight">
                I can go deep. But I know when to zoom out.
              </h2>
            </div>

            {/* Right Column */}
            <div className="flex flex-col gap-6 font-sans text-[15px] md:text-[16px] leading-[26px] text-[#FDABFF]/80 font-light">

              <p>
                Specialisation is valuable. But complex problems rarely stay inside
                one discipline. A product decision can affect the interface, the
                technology, the workflow, the business and the people responsible for
                making it all work.
              </p>

              <p>
                My range allows me to move between those layers without losing the
                bigger picture. I can go deep enough to understand the work, recognise
                dependencies earlier, communicate across disciplines and know when a
                problem needs a specialist rather than pretending I should solve
                everything myself.
              </p>

              <p className="text-[#FDABFF] font-normal">
                The value isn't that I can do everything. It's that I can help the
                right problems get solved, by the right people, in the right context.
              </p>

            </div>

          </div>

        </div>
      </motion.section>

      {/* SECTION 07 — PERSONAL / HUMAN SECTION */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-20 border-t border-[#FDABFF]/15"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

            {/* Left Column — Artwork */}
            <div className="order-2 lg:order-1">
              <div className="w-full rounded-[24px] overflow-hidden">
                <Image
                  src="/flor.webp"
                  alt="Personal artwork by Florencia Requejo"
                  width={1200}
                  height={1200}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>

            {/* Right Column — Personal Story */}
            <div className="order-1 lg:order-2 flex flex-col gap-6 text-left">

              <span className="font-sans text-[11px] md:text-[12px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                OUTSIDE THE SCREEN
              </span>

              <h2 className="font-serif text-[32px] md:text-[44px] text-[#FDABFF] leading-[1.15] font-normal tracking-tight">
                I still make things just because I want to see if I can.
              </h2>

              <div className="flex flex-col gap-5 font-sans text-[15px] md:text-[16px] leading-[26px] text-[#FDABFF]/80 font-light">

                <p>
                  I'm curious outside work too. I read, make digital art, draw and
                  enjoy learning things that have nothing to do with a screen.
                </p>

                <p>
                  Before graphic design, I studied fashion design, and I still enjoy
                  making clothes and working with my hands. I like starting with
                  something I don't fully know how to do, figuring it out as I go and
                  eventually making something real.
                </p>
              </div>

            </div>

          </div>

        </div>
      </motion.section>
      <FooterSection />
    </div>
  );
}
