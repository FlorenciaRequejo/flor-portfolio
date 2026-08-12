"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/hero/FooterSection";
import { caseStudyCards } from "@/lib/caseStudies";
import { usePasswordProtection } from "@/context/PasswordContext";

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

// Exact requested order for Graphic & Digital Design projects
const graphicDesignHrefsOrder = [
  "https://www.behance.net/gallery/254163399/Logo-Collection-Branding-Identity-Design",
  "/editorial-design",
  "https://www.behance.net/gallery/254165859/Natasha-Collins-Personal-Stylist-Website-Redesign",
  "https://www.behance.net/gallery/254166421/Mirage-Visual-UXUI-WordPress-Website-Redesign",
  "/structural-design",
  "/brand-identity",
  "https://www.behance.net/gallery/166638739/Guag-refreshed",
  "https://www.behance.net/gallery/166638641/Gourmet-Coffee",
  "https://www.behance.net/gallery/253817995/The-Home-Theory-Editorial-Property-Staging-Branding",
  "https://www.behance.net/gallery/253816843/QODA-Architecture-Construction-Brand-Identity",
];

const selectedGraphicProjects = graphicDesignHrefsOrder
  .map((href) => caseStudyCards.find((c) => c.href === href))
  .filter((c): c is (typeof caseStudyCards)[number] => c !== undefined);

const capabilitiesList = [
  {
    title: "Brand Identity",
    items: "Logo Design, Visual Systems, Brand Guidelines",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.006-.61l3.087-7.006A2.25 2.25 0 0113.06 5.5l7.006 3.086a2.25 2.25 0 011.386 2.066v5.848a2.25 2.25 0 01-2.25 2.25h-5.848a2.25 2.25 0 01-2.066-1.386l-1.89-4.295z" />
      </svg>
    ),
  },
  {
    title: "Editorial & Print",
    items: "Magazines, Books, Flyers, Brochures, Marketing Collateral",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18c-2.305 0-4.408.867-6 2.292m0-14.25v14.25" />
      </svg>
    ),
  },
  {
    title: "Digital Design",
    items: "Web Visual Design, Campaign Assets, Social Content, Digital Graphics",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0v6.75A2.25 2.25 0 0118.75 14H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
  {
    title: "Commercial Design",
    items: "Packaging, POS, Structural Design, Sales & Marketing Materials",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.8" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
      </svg>
    ),
  },
];

export default function GraphicDesignClient() {
  const router = useRouter();
  const { isUnlocked, openPasswordModal } = usePasswordProtection();

  const handleScrollToWork = () => {
    document.getElementById("selected-work")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="w-full min-h-screen bg-background text-primary selection:bg-primary selection:text-background">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative w-full pt-36 pb-16 md:pt-44 md:pb-24">
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] text-left">
          <span className="text-secondary font-sans text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
            GRAPHIC &amp; DIGITAL DESIGN
          </span>
          
          <h1 className="font-serif text-[38px] sm:text-[54px] md:text-[68px] lg:text-[76px] leading-[1.05] text-primary font-normal tracking-tight mt-4 max-w-[980px]">
            Senior graphic &amp; digital designer with 15+ years across branding, editorial, web and visual communication.
          </h1>

          <p className="font-sans text-[16px] sm:text-[18px] md:text-[20px] leading-[28px] md:leading-[32px] text-foreground/80 font-normal max-w-[760px] mt-6">
            My background is rooted in graphic design, with experience spanning brand identity, editorial, print, digital campaigns and visual design for the web. I focus on creating clear, distinctive work that is both visually strong and commercially useful.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-8 pt-4">
            <button
              onClick={handleScrollToWork}
              className="h-[50px] px-8 rounded-full bg-primary text-background font-sans font-semibold text-[11px] sm:text-[12px] uppercase tracking-[1.5px] hover:opacity-90 transition-all duration-200 shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <span>View selected work</span>
              <span>↓</span>
            </button>

            <Link
              href="/projects"
              className="h-[50px] px-8 rounded-full border border-primary/30 text-primary font-sans font-semibold text-[11px] sm:text-[12px] uppercase tracking-[1.5px] hover:bg-primary/10 transition-all duration-200 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>View all projects</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. SELECTED GRAPHIC DESIGN WORK */}
      <motion.section
        id="selected-work"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 md:py-24 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <div className="text-left mb-12 md:mb-16">
            <span className="text-secondary font-sans text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
              PORTFOLIO HIGHLIGHTS
            </span>
            <h2 className="font-serif text-[36px] sm:text-[48px] md:text-[60px] leading-[1.08] text-primary font-normal tracking-tight mt-3">
              Selected Graphic &amp; Digital Work
            </h2>
            <p className="font-sans text-[15px] md:text-[17px] leading-[26px] text-foreground/75 font-normal max-w-[620px] mt-3">
              Branding, editorial design, visual direction and web design.
            </p>
          </div>

          <div className="flex flex-col gap-8 md:gap-12">
            {selectedGraphicProjects.map((project) => {
              const isExternal = project.href.startsWith("http");
              const isLocked = project.isProtected && !isUnlocked;

              const handleClick = (e: React.MouseEvent) => {
                if (isLocked) {
                  e.preventDefault();
                  openPasswordModal(() => {
                    if (isExternal) {
                      window.open(project.href, "_blank", "noopener,noreferrer");
                    } else {
                      router.push(project.href);
                    }
                  });
                }
              };

              return (
                <Link
                  key={project.href + project.title}
                  href={project.href}
                  target={isExternal && !isLocked ? "_blank" : undefined}
                  rel={isExternal && !isLocked ? "noopener noreferrer" : undefined}
                  onClick={handleClick}
                  className="group w-full bg-white rounded-[32px] md:rounded-[44px] p-6 md:p-8 lg:p-10 flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-12 items-center shadow-[0_15px_45px_rgba(27,35,122,0.08)] hover:shadow-[0_25px_60px_rgba(27,35,122,0.16)] transition-all duration-300 select-none cursor-pointer relative"
                >
                  {/* Left Column: Image */}
                  <div className="relative w-full md:w-1/2 h-[260px] sm:h-[320px] md:h-[360px] lg:h-[400px] rounded-[24px] md:rounded-[32px] overflow-hidden shrink-0">
                    <Image
                      src={project.imageSrc}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className={`object-cover object-center transition-all duration-500 ${
                        isLocked ? "blur-md scale-105" : "group-hover:scale-[1.03]"
                      }`}
                    />

                    {/* Corner Lock Badge */}
                    {isLocked && (
                      <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-sans font-medium text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="w-3.5 h-3.5"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                          />
                        </svg>
                        <span>Protected</span>
                      </div>
                    )}
                  </div>

                  {/* Right Column: Information */}
                  <div className="w-full md:w-1/2 flex flex-col justify-between text-left h-full py-1 md:py-2 gap-4">
                    <div>
                      <span className="inline-block px-4 py-1.5 rounded-full bg-background/8 border border-background/15 text-background font-sans font-semibold text-[11px] md:text-[12px] uppercase tracking-[1.5px]">
                        {project.categoryLabel || project.categoryPill}
                      </span>

                      <h3 className="font-serif text-[26px] sm:text-[32px] md:text-[38px] leading-[1.12] text-background font-normal tracking-tight mt-4 group-hover:text-background/80 transition-colors">
                        {project.title}
                      </h3>

                      <p className="font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[24px] md:leading-[26px] text-background/75 font-normal mt-3">
                        {project.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full border-t border-background/10">
                      <div className="flex flex-wrap gap-2 items-center">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 rounded-full border border-background/20 text-background/80 text-[10px] md:text-[11px] font-sans font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="h-[46px] px-6 rounded-full bg-primary text-background font-sans font-semibold text-[10px] md:text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 group-hover:opacity-90 transition-opacity duration-200 shrink-0 w-fit">
                        {isLocked && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="w-3.5 h-3.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                            />
                          </svg>
                        )}
                        <span>
                          {isLocked
                            ? "Unlock Case Study"
                            : isExternal
                            ? "EXPLORE ON BEHANCE ↗"
                            : "View Case Study"}
                        </span>
                        {!isLocked && !isExternal && (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="2.5"
                            stroke="currentColor"
                            className="w-3.5 h-3.5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                            />
                          </svg>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 3. DESIGN BACKGROUND */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 md:py-24 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <div className="bg-surface border border-border rounded-[32px] md:rounded-[44px] p-8 md:p-14 text-left space-y-6">
            <span className="text-secondary font-sans text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
              MY BACKGROUND
            </span>
            <h2 className="font-serif text-[32px] sm:text-[42px] md:text-[54px] leading-[1.1] text-primary font-normal tracking-tight max-w-[800px]">
              A design career that expanded into digital
            </h2>
            <p className="font-sans text-[16px] sm:text-[18px] md:text-[20px] leading-[28px] md:leading-[32px] text-foreground/85 font-normal max-w-[840px]">
              I started in graphic and visual design, working across branding, print, structural design and marketing materials before moving deeper into web and digital products. That foundation still shapes how I work today: strong hierarchy, typography, composition and brand consistency come first, regardless of the medium.
            </p>
          </div>
        </div>
      </motion.section>

      {/* 4. CAPABILITIES */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 md:py-24 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] text-left">
          <span className="text-secondary font-sans text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
            CAPABILITIES
          </span>
          <h2 className="font-serif text-[36px] sm:text-[48px] md:text-[56px] leading-[1.08] text-primary font-normal tracking-tight mt-3 mb-12">
            Core Design Expertise
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {capabilitiesList.map((cap) => (
              <div
                key={cap.title}
                className="bg-white rounded-[24px] p-6 md:p-8 flex flex-col justify-between border border-border shadow-[0_10px_30px_rgba(27,35,122,0.04)] space-y-6"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  {cap.icon}
                </div>

                <div className="space-y-2">
                  <h3 className="font-serif text-[22px] md:text-[24px] text-background font-normal tracking-tight">
                    {cap.title}
                  </h3>
                  <p className="font-sans text-[13px] md:text-[14px] leading-[22px] text-background/75 font-normal">
                    {cap.items}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. CLOSING CTA */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full py-16 md:py-24 border-t border-border"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <div className="bg-surface border border-border rounded-[32px] md:rounded-[44px] p-8 md:p-14 text-center flex flex-col items-center gap-8">
            <h2 className="font-serif text-[32px] sm:text-[44px] md:text-[56px] leading-[1.1] text-primary font-normal tracking-tight max-w-[760px]">
              Looking for a designer with strong visual and digital experience?
            </h2>

            <div className="flex flex-wrap justify-center gap-4 pt-2">
              <Link
                href="/projects"
                className="h-[50px] px-8 rounded-full bg-primary text-background font-sans font-semibold text-[11px] sm:text-[12px] uppercase tracking-[1.5px] hover:opacity-90 transition-all duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>View all projects</span>
                <span>→</span>
              </Link>

              <a
                href="/Florencia%20Requejo%20-%20CV%20-%202026.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="h-[50px] px-8 rounded-full border border-primary text-primary font-sans font-semibold text-[11px] sm:text-[12px] uppercase tracking-[1.5px] hover:bg-primary/10 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Download CV</span>
                <span>↓</span>
              </a>

              <Link
                href="/contact"
                className="h-[50px] px-8 rounded-full border border-primary text-primary font-sans font-semibold text-[11px] sm:text-[12px] uppercase tracking-[1.5px] hover:bg-primary/10 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Contact me</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <FooterSection />
    </div>
  );
}
