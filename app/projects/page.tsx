"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/hero/FooterSection";
import { caseStudyCards } from "@/lib/caseStudies";

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
  return (
    <div
      className="w-full min-h-screen bg-[#1B237A] text-[#FDABFF] selection:bg-[#FDABFF] selection:text-[#1B237A]"
    >
      <Navbar />

      {/* PROJECTS GRID HEADER */}
      <section className="relative w-full pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] text-left">
          <span className="text-[#FDABFF]/60 font-sans text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
            SELECTED WORK
          </span>
          <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-[#FDABFF] font-normal tracking-tight mt-3">
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
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-[5px]">
            {caseStudyCards.map((project) => (
              <Link
                key={project.title}
                href={project.href}
                className="group flex flex-col cursor-pointer select-none"
              >
                {/* Media Container */}
                <div className="relative w-full aspect-[4/3] rounded-[12px] overflow-hidden border border-[#FDABFF]/20 shadow-sm transition-all duration-300 group-hover:scale-[1.02] group-hover:shadow-md">
                  <Image
                    src={project.imageSrc}
                    alt={project.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA FOOTER */}
      <FooterSection />
    </div>
  );
}
