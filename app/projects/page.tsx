"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/hero/FooterSection";
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

export default function ProjectsLandingPage() {
  const [isExiting, setIsExiting] = useState(false);
  const router = useRouter();

  // Intercept anchor clicks to animate transitions out of this page
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Intercept local transitions
      if (href.startsWith("/") && href !== "/projects") {
        e.preventDefault();
        setIsExiting(true);
        router.prefetch(href);
        setTimeout(() => {
          router.push(href);
        }, 600);
      }
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
    };
  }, [router]);

  return (
    <div
      className="case-study-container reading-mode w-full min-h-screen bg-white text-black selection:bg-[#1B237A] selection:text-white"
    >
      <Navbar />

      {/* PROJECTS GRID HEADER */}
      <section className="relative w-full pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto w-full max-w-[min(76vw,1260px)] px-4 md:px-0 text-left">
          <span className="text-[#1B237A]/60 font-sans text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
            SELECTED WORK
          </span>
          <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-[#1B237A] font-normal tracking-tight mt-3">
            Projects Portfolio
          </h1>
        </div>
      </section>

      {/* PROJECTS GRID CONTAINER */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full pb-24"
      >
        <div className="mx-auto w-full max-w-[min(76vw,1260px)] px-4 md:px-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {caseStudyCards.map((project) => (
              <a
                key={project.title}
                href={project.href}
                className="group flex flex-col cursor-pointer select-none"
              >
                {/* Media Container */}
                <div className="relative w-full aspect-[4/3] rounded-[24px] md:rounded-[32px] overflow-hidden border border-black/10 shadow-sm transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-md">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>

                {/* Content Container */}
                <div className="flex flex-col items-start mt-4 px-1.5">
                  <span className="text-[#1B237A]/50 font-sans text-[10px] tracking-wider uppercase font-semibold">
                    Case Study
                  </span>
                  <h3 className="font-serif text-[18px] md:text-[22px] leading-tight font-semibold text-[#1B237A] mt-1.5 transition-colors duration-200 group-hover:text-[#1B237A]/75 text-left">
                    {project.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA FOOTER */}
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
