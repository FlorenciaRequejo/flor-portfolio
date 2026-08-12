"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/hero/FooterSection";
import { caseStudyCards } from "@/lib/caseStudies";
import { usePasswordProtection } from "@/context/PasswordContext";

const categories = [
  "All",
  "Web & UX/UI Design",
  "Product Development",
  "Automation & Digital Systems",
] as const;

const availableTags = [
  "WordPress",
  "Graphic Design",
  "Branding",
  "UX/UI",
  "Web Design",
  "Product Design",
  "Automation",
  "AI",
  "Figma",
  "UX Research",
  "Dashboard",
  "Editorial Design",
  "Logo Design",
  "Front End",
] as const;

type Category = (typeof categories)[number];

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

export default function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState<Category>("All");
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isUnlocked, openPasswordModal } = usePasswordProtection();

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam && categories.includes(categoryParam as Category)) {
      setSelectedCategory(categoryParam as Category);
    }
  }, [searchParams]);

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    if (cat === "All") {
      router.replace("/projects", { scroll: false });
    } else {
      router.replace(`/projects?category=${encodeURIComponent(cat)}`, { scroll: false });
    }
  };

  const filteredProjects = caseStudyCards.filter((card) => {
    const matchesCategory =
      selectedCategory === "All" || card.categoryPill === selectedCategory;
    const matchesTag =
      !selectedTag ||
      card.tags.some((t) => t.toLowerCase() === selectedTag.toLowerCase());
    return matchesCategory && matchesTag;
  });

  return (
    <div className="w-full min-h-screen bg-background text-primary selection:bg-primary selection:text-background">
      <Navbar />

      {/* PROJECTS GRID HEADER */}
      <section className="relative w-full pt-32 pb-8 md:pt-40 md:pb-12">
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)] text-left">
          <span className="text-primary/60 font-sans text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
            SELECTED WORK
          </span>
          <h1 className="font-serif text-[38px] sm:text-[52px] md:text-[68px] lg:text-[76px] leading-[1.05] text-primary font-normal tracking-tight mt-3">
            Projects Portfolio
          </h1>
          <p className="font-sans text-[15px] md:text-[17px] leading-[26px] text-foreground/75 font-normal max-w-[620px] mt-4">
            Different problems, different approaches. Explore my work across web, UX/UI, product development and digital systems.
          </p>

          {/* CATEGORY FILTER BAR */}
          <div className="flex flex-wrap gap-2.5 sm:gap-3 mt-8 pt-4 border-t border-border">
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`h-[42px] px-5 sm:px-6 rounded-full font-sans text-[11px] sm:text-[12px] font-semibold uppercase tracking-[1.5px] transition-all duration-300 select-none cursor-pointer ${
                    isActive
                      ? "bg-primary text-background shadow-md scale-[1.02]"
                      : "bg-surface text-foreground/80 border border-border hover:border-primary/50 hover:text-primary"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* SUB-TAG FILTER BAR */}
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-3">
            <span className="font-sans text-[11px] font-semibold uppercase tracking-wider text-primary/50 mr-1">
              Filter by tag:
            </span>
            {availableTags.map((tag) => {
              const isTagActive = selectedTag === tag;
              return (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(isTagActive ? null : tag)}
                  className={`h-[30px] px-3.5 rounded-full font-sans text-[10px] md:text-[11px] font-medium transition-all duration-200 select-none cursor-pointer ${
                    isTagActive
                      ? "bg-primary text-background shadow-sm scale-105"
                      : "bg-surface/80 text-foreground/70 border border-border hover:border-primary/40 hover:text-primary"
                  }`}
                >
                  {tag}
                </button>
              );
            })}
            {selectedTag && (
              <button
                onClick={() => setSelectedTag(null)}
                className="h-[30px] px-3 rounded-full font-sans text-[10px] text-primary/60 hover:text-primary underline cursor-pointer"
              >
                Clear tag filter
              </button>
            )}
          </div>
        </div>
      </section>

      {/* PROJECTS CARDS CONTAINER */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
        className="w-full pb-24 md:pb-36"
      >
        <div className="mx-auto w-full px-4 md:px-0 max-w-full md:max-w-[min(76vw,1260px)]">
          <motion.div layout className="flex flex-col gap-8 md:gap-12">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => {
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
                  <motion.div
                    key={project.href + project.title}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                  >
                    <Link
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
                        {/* Category Pill above title */}
                        <div>
                          <span className="inline-block px-4 py-1.5 rounded-full bg-background/8 border border-background/15 text-background font-sans font-semibold text-[11px] md:text-[12px] uppercase tracking-[1.5px]">
                            {project.categoryLabel || project.categoryPill}
                          </span>

                          {/* Title */}
                          <h2 className="font-serif text-[26px] sm:text-[32px] md:text-[38px] leading-[1.12] text-background font-normal tracking-tight mt-4 group-hover:text-background/80 transition-colors">
                            {project.title}
                          </h2>

                          {/* Description */}
                          <p className="font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[24px] md:leading-[26px] text-background/75 font-normal mt-3">
                            {project.description}
                          </p>
                        </div>

                        {/* Tags & Action Button */}
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
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA FOOTER */}
      <FooterSection />
    </div>
  );
}
