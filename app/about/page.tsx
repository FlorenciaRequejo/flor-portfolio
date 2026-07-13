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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left Info Column */}
            <div className="lg:col-span-6 flex flex-col gap-6 text-left">
              <span className="font-sans text-[11px] md:text-[12px] uppercase tracking-[3px] text-[#FDABFF]/75 font-semibold">
                ABOUT ME
              </span>
              <h1 className="font-serif text-[38px] sm:text-[48px] md:text-[62px] leading-[1.1] text-[#FDABFF] font-normal tracking-tight">
                I didn't plan a multidisciplinary career.
                <br />
                I kept following the problems.
              </h1>
              <p className="font-sans text-[15px] md:text-[17px] leading-[26px] text-[#FDABFF]/80 font-light max-w-lg">
                I started in graphic design, moved into structural design, websites, UX/UI, automation and eventually AI-powered products.
                <br /><br />
                Not because I wanted to collect disciplines. Each new problem required me to understand something I couldn't do yet.
                <br /><br />
                Today, that range allows me to move between the visual, technical and strategic parts of a product — and understand how they affect each other.
              </p>

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

            {/* Right Asset Column */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-[#FDABFF]/20 bg-[#FDABFF]/5 shadow-sm">
                <Image
                  src="/career-evolution.png"
                  alt="Career Evolution Timeline Schematic"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
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
        className="w-full py-20 border-t border-[#FDABFF]/15 bg-[#FDABFF]/5"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                HOW I GOT HERE
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[#FDABFF] leading-[1.15] font-normal tracking-tight">
                One problem kept leading to the next.
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[#FDABFF]/80 font-light space-y-4">
              <p>
                My career started with visual communication and physical products. I worked on branding, packaging and structural point-of-sale displays, learning how ideas survive real constraints: materials, production, budgets and deadlines.
              </p>
              <p>
                Then I moved into digital. Designing websites made me want to understand how they were built. Development exposed inefficient workflows. Repetitive processes led me to automation. Automation led me to AI.
              </p>
              <p>
                The tools kept changing. The pattern didn't. I find problems, learn what I need to understand them, and build solutions that connect disciplines that are usually treated separately.
              </p>
            </div>
          </div>

          {/* Horizontal Story Timeline */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 text-left font-sans mt-12">
            {[
              { step: "VISUAL DESIGN", q: "“How should it communicate?”", desc: "Branding, graphics layout and asset design." },
              { step: "STRUCTURAL DESIGN", q: "“How will it actually work?”", desc: "Packaging systems, materials, and dielines." },
              { step: "WEB DEVELOPMENT", q: "“How do I build it?”", desc: "Frontend structures, CMS systems, and custom templates." },
              { step: "UX/UI + PRODUCT", q: "“How should people use it?”", desc: "Interaction logic, wireframes, and platform user flows." },
              { step: "AUTOMATION", q: "“Why are we doing this manually?”", desc: "API webhooks, custom server automation, and scripts." },
              { step: "AI + SYSTEMS", q: "“How can the system do more of the work?”", desc: "LLMs content pipelines, custom prompts, and infrastructure." }
            ].map((node, idx) => (
              <div
                key={idx}
                className="p-5 rounded-[16px] bg-[#FDABFF]/5 border border-[#FDABFF]/10 flex flex-col justify-between min-h-[160px] hover:border-[#FDABFF]/30 transition-colors duration-300"
              >
                <div>
                  <span className="text-[10px] tracking-wider uppercase text-[#B8F74B] font-bold block mb-1">{node.step}</span>
                  <p className="font-serif italic text-[13px] text-[#FDABFF] leading-snug">{node.q}</p>
                </div>
                <p className="text-[11px] text-[#FDABFF]/60 font-light mt-3 leading-relaxed">{node.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 03 — HOW I THINK */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-20 border-t border-[#FDABFF]/15"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                HOW I WORK
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[#FDABFF] leading-[1.15] font-normal tracking-tight">
                I rarely see a design problem as only a design problem.
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[#FDABFF]/80 font-light space-y-4">
              <p>
                A confusing interface might be a workflow problem. An inconsistent brand might be a systems problem. A slow production process might be an automation opportunity. A website problem might require changing the architecture behind it.
              </p>
              <p>
                I like understanding enough of the whole system to know where the real problem lives — and then deciding what should be designed, built, automated or simplified.
              </p>
            </div>
          </div>

          {/* Problem-Centric Schematic Map */}
          <div className="relative max-w-2xl mx-auto py-12 flex items-center justify-center">
            {/* Visual connected system structure using SVG grids */}
            <div className="relative w-full aspect-[4/3] max-w-[540px] border border-[#FDABFF]/15 rounded-[32px] bg-[#FDABFF]/5 p-8 flex items-center justify-center overflow-hidden">
              <div className="grid grid-cols-3 gap-6 text-center font-sans text-[11px] uppercase tracking-wider w-full h-full items-center">
                <div />
                <div className="px-3 py-2 border border-[#FDABFF]/20 rounded bg-[#1B237A] text-[#FDABFF]">BRAND</div>
                <div />

                <div className="px-3 py-2 border border-[#FDABFF]/20 rounded bg-[#1B237A] text-[#FDABFF]">DEVELOPMENT</div>
                <div className="p-4 border-2 border-[#B8F74B] rounded-full bg-[#1B237A] text-[#B8F74B] font-serif font-bold text-[13px] tracking-tight shadow-[0_0_15px_rgba(184,247,75,0.15)]">THE PROBLEM</div>
                <div className="px-3 py-2 border border-[#FDABFF]/20 rounded bg-[#1B237A] text-[#FDABFF]">PRODUCT</div>

                <div className="px-3 py-2 border border-[#FDABFF]/20 rounded bg-[#1B237A] text-[#FDABFF]">AUTOMATION</div>
                <div className="px-3 py-2 border border-[#FDABFF]/20 rounded bg-[#1B237A] text-[#FDABFF]">BUSINESS</div>
                <div />
              </div>

              {/* Connecting lines vector overlay */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" xmlns="http://www.w3.org/2000/svg">
                <line x1="50%" y1="15%" x2="50%" y2="85%" stroke="#FDABFF" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="15%" y1="50%" x2="85%" y2="50%" stroke="#FDABFF" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </div>
          </div>
        </div>
      </motion.section>

      {/* SECTION 04 — SELECTED EVIDENCE */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-20 border-t border-[#FDABFF]/15 bg-[#FDABFF]/5"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="text-left space-y-3">
            <span className="font-sans text-[11px] md:text-[12px] font-semibold text-[#B8F74B] uppercase tracking-wider">
              A FEW THINGS I'VE BUILT ALONG THE WAY
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] text-[#FDABFF] leading-[1.15] font-normal tracking-tight">
              Different outputs. The same way of thinking.
            </h2>
          </div>

          {/* Evidence Story 1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-[#FDABFF]/10 pt-10">
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#B8F74B] font-sans text-[10px] uppercase font-bold tracking-widest">STORY 01</span>
              <h3 className="font-serif text-[22px] md:text-[26px] text-[#FDABFF]">Building a new capability inside a business.</h3>
              <p className="font-sans text-[14px] leading-[22px] text-[#FDABFF]/80 font-light">
                I joined iDigital to work across design and web, then helped build its web development capability into the company's highest revenue-generating area within its first year. What started as execution became systems, processes, products and new opportunities for the business.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="p-6 rounded-[20px] bg-[#1B237A]/50 border border-[#FDABFF]/15 text-left font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center text-[11px] uppercase tracking-wider items-center">
                  <div className="p-3 border border-red-400/20 bg-red-400/5 text-red-300 rounded">No Internal Web Capability</div>
                  <div className="text-white/30">→</div>
                  <div className="p-3 border border-[#FDABFF]/20 bg-[#FDABFF]/5 rounded">Build Process & Delivery Capability</div>
                  <div className="text-white/30">→</div>
                  <div className="p-3 border border-[#FDABFF]/20 bg-[#FDABFF]/5 rounded">Repeatable Web Service</div>
                  <div className="text-white/30">→</div>
                  <div className="p-3 border border-green-400/20 bg-green-400/5 text-green-300 rounded">New Revenue Stream</div>
                </div>
              </div>
            </div>
          </div>

          {/* Evidence Story 2 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-[#FDABFF]/10 pt-10">
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#B8F74B] font-sans text-[10px] uppercase font-bold tracking-widest">STORY 02</span>
              <h3 className="font-serif text-[22px] md:text-[26px] text-[#FDABFF]">Learning enough to build the solution.</h3>
              <p className="font-sans text-[14px] leading-[22px] text-[#FDABFF]/80 font-light">
                I designed a disposable point-of-sale display required to hold more than 40kg of product. Solving it meant moving beyond visual design into structural engineering, materials, prototyping, production constraints and repeated physical testing.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden border border-[#FDABFF]/15 bg-[#1B237A]">
                <Image
                  src="/evidence-structural.png"
                  alt="Packaging technical dielines blueprint schematics"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>

          {/* Evidence Story 3 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-t border-[#FDABFF]/10 pt-10">
            <div className="lg:col-span-5 space-y-4 text-left">
              <span className="text-[#B8F74B] font-sans text-[10px] uppercase font-bold tracking-widest">STORY 03</span>
              <h3 className="font-serif text-[22px] md:text-[26px] text-[#FDABFF]">Turning repeated work into systems.</h3>
              <p className="font-sans text-[14px] leading-[22px] text-[#FDABFF]/80 font-light">
                Working across websites, content and digital products repeatedly exposed the same problem: talented people spending time operating processes that could be improved. That led me from design into automation, AI-assisted workflows and products designed to make organisations work differently.
              </p>
            </div>
            <div className="lg:col-span-7">
              <div className="p-6 rounded-[20px] bg-[#1B237A]/50 border border-[#FDABFF]/15 text-left font-sans">
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center text-[10px] uppercase tracking-wider items-center">
                  <div className="p-2.5 border border-white/10 rounded">Manual Work</div>
                  <div className="text-white/20">→</div>
                  <div className="p-2.5 border border-white/10 rounded">Workflow Map</div>
                  <div className="text-white/20">→</div>
                  <div className="p-2.5 border border-[#FDABFF]/20 rounded">Automation</div>
                  <div className="text-white/20">→</div>
                  <div className="p-2.5 border border-[#FDABFF]/20 rounded">AI Assisted System</div>
                  <div className="text-white/20">→</div>
                  <div className="p-2.5 border border-green-400/25 text-[#B8F74B] rounded">Product Build</div>
                </div>
              </div>
            </div>
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
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                THE VALUE OF RANGE
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[#FDABFF] leading-[1.15] font-normal tracking-tight">
                I can go deep. But I know when to zoom out.
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[#FDABFF]/80 font-light">
              <p>
                I can work through interface details, write front-end code, map a workflow, question the product strategy or prototype an AI-powered system. The value isn't that I can do everything. It's that I can see connections between disciplines, communicate with the people responsible for them and help move a problem from ambiguity to something that can actually be built.
              </p>
            </div>
          </div>

          {/* Connected Capabilities Blocks */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left font-sans mt-8">
            {[
              { num: "01", title: "PRODUCT THINKING", desc: "Finding the problem behind the request and turning ambiguity into a direction." },
              { num: "02", title: "SYSTEMS THINKING", desc: "Understanding how products, people, technology and processes affect each other." },
              { num: "03", title: "DESIGN + BUILD", desc: "Moving between visual design, UX/UI, prototyping and technical implementation." },
              { num: "04", title: "AI + AUTOMATION", desc: "Identifying where new technology can remove repetitive work or create entirely new product opportunities." }
            ].map((cap, idx) => (
              <div
                key={idx}
                className="p-6 rounded-[20px] bg-[#FDABFF]/5 border border-[#FDABFF]/10 space-y-4 hover:border-[#FDABFF]/30 transition-colors duration-300"
              >
                <div className="text-[20px] font-mono text-[#FDABFF]/40 font-bold">{cap.num}</div>
                <h4 className="font-serif text-[18px] text-[#FDABFF] font-medium">{cap.title}</h4>
                <p className="text-[13px] leading-[20px] text-[#FDABFF]/70 font-light">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* SECTION 06 — WHAT I'M LOOKING FOR NEXT */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-20 border-t border-[#FDABFF]/15"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12 text-left">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                WHAT'S NEXT
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[#FDABFF] leading-[1.15] font-normal tracking-tight">
                I want to work closer to the problem.
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[#FDABFF]/80 font-light space-y-4">
              <p>
                I'm most interested in product teams and organisations solving complex internal, operational or customer problems. I want the time to understand a product deeply, improve the systems around it and stay involved long enough to see what actually works.
              </p>
              <p>
                I'm particularly interested in roles where design, product thinking, technology and AI overlap — and where identifying the right problem matters as much as executing the solution.
              </p>
            </div>
          </div>

          {/* Simple Visual Statement Diagram */}
          <div className="p-8 rounded-[24px] bg-[#FDABFF]/5 border border-[#FDABFF]/10 text-center mt-8 font-sans">
            <div className="flex flex-wrap items-center justify-center gap-4 text-[11px] md:text-[13px] uppercase tracking-wider text-[#B8F74B] font-bold">
              <span>UNDERSTAND THE PROBLEM</span>
              <span className="text-white/20">↓</span>
              <span>DESIGN THE SYSTEM</span>
              <span className="text-white/20">↓</span>
              <span>BUILD THE SOLUTION</span>
              <span className="text-white/20">↓</span>
              <span>LEARN WHAT WORKS</span>
              <span className="text-white/20">↓</span>
              <span>IMPROVE IT</span>
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
        className="w-full py-20 border-t border-[#FDABFF]/15 bg-[#FDABFF]/5"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-left items-start">
            <div className="lg:col-span-5 flex flex-col gap-2">
              <span className="font-sans text-[11px] md:text-[12px] font-semibold text-[#B8F74B] uppercase tracking-wider">
                OUTSIDE THE SCREEN
              </span>
              <h2 className="font-serif text-[32px] md:text-[44px] text-[#FDABFF] leading-[1.15] font-normal tracking-tight">
                I still make things just because I want to see if I can.
              </h2>
            </div>
            <div className="lg:col-span-7 font-sans text-[15px] md:text-[16px] leading-[26px] text-[#FDABFF]/80 font-light">
              <p>
                I draw, experiment with visual systems and create personal projects built around constraints. Limiting colours, changing techniques or working within strict rules forces me to find different solutions. It's the same reason I enjoy building products. Constraints make problems more interesting.
              </p>
            </div>
          </div>

          {/* Horizontal Gallery Collage */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-[#FDABFF]/25 bg-[#1B237A]">
              <Image
                src="/personal-artwork-1.png"
                alt="Generative geometric print print artwork constraint experiment"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden border border-[#FDABFF]/25 bg-[#1B237A]">
              <Image
                src="/personal-artwork-2.png"
                alt="Minimalist abstract shape canvas drawing visual guidelines"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </motion.section>

      {/* FINAL CTA SECTION */}
      <section className="w-full py-20 border-t border-[#FDABFF]/15 text-center bg-[#1B237A]">
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-2xl space-y-6">
          <h2 className="font-serif text-[38px] sm:text-[48px] text-[#FDABFF] font-normal tracking-tight leading-tight">
            Have a problem worth figuring out?
          </h2>
          <p className="font-sans text-[15px] md:text-[17px] leading-[26px] text-[#FDABFF]/80 font-light">
            I'm interested in product, design and AI roles where complex problems need structure, experimentation and someone willing to follow them beyond the obvious solution.
          </p>

          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Link
              href="/#projects"
              className="h-[50px] px-8 rounded-full border border-[#FDABFF] text-[#FDABFF] font-sans font-semibold text-[11px] md:text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-200 hover:bg-[#FDABFF]/10"
            >
              View My Work
            </Link>
            <a
              href="/florencia-requejo-cv.pdf"
              download="florencia-requejo-cv.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="h-[50px] px-8 rounded-full bg-[#FDABFF] text-[#1B237A] font-sans font-semibold text-[11px] md:text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-200 hover:opacity-90"
            >
              Download CV
            </a>
            <a
              href="mailto:florencia.requejo@gmail.com"
              className="h-[50px] px-8 rounded-full border border-[#FDABFF] text-[#FDABFF] font-sans font-semibold text-[11px] md:text-xs uppercase tracking-wider flex items-center justify-center transition-all duration-200 hover:bg-[#FDABFF]/10"
            >
              Email Me
            </a>
          </div>
        </div>
      </section>

      <FooterSection />
    </div>
  );
}
