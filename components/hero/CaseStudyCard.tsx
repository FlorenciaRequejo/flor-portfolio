"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePasswordProtection } from "@/context/PasswordContext";

interface CaseStudyCardProps {
  title: string;
  description?: string;
  videoSrc: string;
  imageSrc?: string;
  href: string;
  featured: boolean;
  tags?: string[];
  isProtected?: boolean;
}

export default function CaseStudyCard({
  title,
  description,
  videoSrc,
  imageSrc,
  href,
  featured,
  tags = [],
  isProtected = false,
}: CaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();
  const { isUnlocked, openPasswordModal } = usePasswordProtection();

  const isLocked = isProtected && !isUnlocked;

  // Clean soft shadow variants (size/scale and position stay completely fixed)
  const cardVariants = {
    initial: {
      boxShadow: "0 15px 45px rgba(27, 35, 122, 0.07)",
    },
    hover: {
      boxShadow: "0 30px 60px rgba(27, 35, 122, 0.12)",
    },
  };

  const isExternal = href.startsWith("http");

  const handleClick = (e: React.MouseEvent) => {
    if (isLocked) {
      e.preventDefault();
      openPasswordModal(() => {
        if (isExternal) {
          window.open(href, "_blank", "noopener,noreferrer");
        } else {
          router.push(href);
        }
      });
    }
  };

  return (
    <Link
      href={href}
      target={isExternal && !isLocked ? "_blank" : undefined}
      rel={isExternal && !isLocked ? "noopener noreferrer" : undefined}
      onClick={handleClick}
      className="w-full h-full block"
    >
      <motion.div
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="relative flex flex-col justify-between overflow-hidden bg-white rounded-[32px] md:rounded-[40px] w-full select-none p-6 md:p-8 h-[580px] md:h-[620px] lg:h-[660px] cursor-pointer"
      >
        {/* Media Container */}
        <div className="relative w-full h-[200px] sm:h-[240px] md:h-[300px] lg:h-[340px] rounded-[20px] md:rounded-[28px] overflow-hidden flex-shrink-0">
          <Image
            src={imageSrc || "/case-study-poster.png"}
            alt={title}
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover object-center transition-all duration-500 ${
              isLocked ? "blur-md scale-105" : ""
            }`}
          />

          {/* Corner Lock Badge */}
          {isLocked && (
            <div className="absolute top-3 right-3 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-sans font-medium text-[10px] uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-3 h-3"
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

        {/* Content Container: Inset 10px more than media (total X + 10px) */}
        <div className="relative pt-0 mt-4 flex-grow flex flex-col justify-between text-left px-[10px]">
          {/* Text area */}
          <div>
            <h3 className="text-fixed-dark font-sans font-semibold text-[18px] leading-tight">
              {title}
            </h3>

            {description && (
              <p className="font-sans text-[14px] leading-[22px] text-fixed-dark/75 font-normal mt-3">
                {description}
              </p>
            )}
          </div>

          {/* Footer Area: flex-row on desktop, flex-col on mobile */}
          <div className="mt-auto pt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full">
            {/* Pills group */}
            <div className="flex flex-1 min-w-0 flex-wrap gap-2 items-center">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full border border-fixed-dark/25 text-fixed-dark text-[10px] md:text-[11px] font-sans font-medium whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Vertical Divider (hidden on mobile) */}
            <div className="hidden sm:block h-8 w-px bg-fixed-dark/20 shrink-0 mx-[20px] md:mx-[24px]" />

            {/* Read More / Unlock button */}
            <div className="shrink-0 w-fit">
              <div className="h-[50px] px-6 rounded-full bg-primary text-background font-sans font-semibold text-[10px] md:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity duration-200">
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
                <span>{isLocked ? "Unlock" : "Read More"}</span>
                {!isLocked && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="2.5"
                    stroke="currentColor"
                    className="w-3.5 h-3.5 md:w-4 md:h-4"
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
        </div>
      </motion.div>
    </Link>
  );
}
