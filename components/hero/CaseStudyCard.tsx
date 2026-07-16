"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface CaseStudyCardProps {
  title: string;
  description?: string;
  videoSrc: string;
  imageSrc?: string;
  href: string;
  featured: boolean;
  tags?: string[];
}

export default function CaseStudyCard({
  title,
  description,
  videoSrc,
  imageSrc,
  href,
  featured,
  tags = [],
}: CaseStudyCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <Link
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className="w-full h-full block"
    >
      <motion.div
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="relative flex flex-col justify-between overflow-hidden bg-white rounded-[32px] md:rounded-[40px] w-full select-none p-6 md:p-8 h-[480px] md:h-[540px] lg:h-[580px] cursor-pointer"
      >
        {/* Media Container */}
        <div className="relative w-full h-[240px] md:h-[300px] lg:h-[340px] rounded-[20px] md:rounded-[28px] overflow-hidden flex-shrink-0">
          <Image
            src={imageSrc || "/case-study-poster.png"}
            alt={title}
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover object-center transition-opacity duration-500"
          />
        </div>

        {/* Content Container: Inset 10px more than media (total X + 10px) */}
        <div className="relative pt-0 mt-4 flex-grow flex flex-col justify-between text-left px-[10px]">
          {/* Text area */}
          <div>
            <h3 className="text-[#1B237A] font-sans font-semibold text-[18px] leading-tight">
              {title}
            </h3>

            {description && (
              <p className="font-sans text-[14px] leading-[22px] text-[#1B237A]/75 font-normal mt-3">
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
                  className="px-3 py-1 rounded-full border border-[#1B237A]/25 text-[#1B237A] text-[10px] md:text-[11px] font-sans font-medium whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Vertical Divider (hidden on mobile) */}
            <div className="hidden sm:block h-8 w-px bg-[#1B237A]/20 shrink-0 mx-[20px] md:mx-[24px]" />

            {/* Read More button */}
            <div className="shrink-0 w-fit">
              <div className="h-[50px] px-6 rounded-full bg-[#FDABFF] text-[#1B237A] font-sans font-semibold text-[10px] md:text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity duration-200">
                <span>Read More</span>
                <span className="text-[12px] md:text-[14px]">↗</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
