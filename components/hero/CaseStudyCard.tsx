"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";

interface CaseStudyCardProps {
  title: string;
  description?: string;
  videoSrc: string;
  href: string;
  featured: boolean;
}

export default function CaseStudyCard({
  title,
  description,
  videoSrc,
  href,
  featured,
}: CaseStudyCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  // Fallback to force video autoplay on iOS / safari if needed
  useEffect(() => {
    if (videoSrc && videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn("Autoplay failed/prevented:", err);
      });
    }
  }, [videoSrc]);

  // Animation variants
  const cardVariants = {
    initial: {
      y: 0,
      scale: 1,
      boxShadow: "0 10px 30px rgba(66, 27, 27, 0.04)",
    },
    hover: {
      y: -10,
      scale: 1.025,
      boxShadow: "0 30px 60px rgba(66, 27, 27, 0.12)",
    },
  };

  const titleVariants = {
    initial: { x: 0 },
    hover: { x: 6 },
  };

  const arrowVariants = {
    initial: { x: 0, opacity: 0.8 },
    hover: { x: 8, opacity: 1 },
  };

  return (
    <motion.a
      href={href}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className="relative flex flex-col justify-between overflow-hidden bg-white rounded-[32px] w-full select-none p-5 h-[480px] md:h-[530px]"
    >
      {/* Media Container */}
      <div className="relative w-full h-[220px] md:h-[260px] rounded-[20px] overflow-hidden">
        <Image
          src="/case-study-poster.png"
          alt={title}
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover object-center transition-opacity duration-500 ${
            isVideoReady ? "opacity-0" : "opacity-100"
          }`}
        />
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoReady(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
              isVideoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Content Container */}
      <div className="pt-0 mt-5 flex flex-col justify-between flex-grow text-left">
        <div>
          {/* Title and Arrow */}
          <div className="flex items-center text-[#421B1B] font-sans font-semibold text-[18px] leading-tight">
            <motion.span
              variants={titleVariants}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="inline-block"
            >
              {title}
            </motion.span>
            <motion.span
              variants={arrowVariants}
              transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
              className="inline-block ml-[6px]"
            >
              →
            </motion.span>
          </div>

          {/* Description */}
          {description && (
            <p className="font-sans text-[14px] leading-[22px] text-[#421B1B]/75 font-normal mt-3 max-w-[340px]">
              {description}
            </p>
          )}
        </div>

        {/* Read More pill */}
        <div className="flex justify-end mt-4">
          <div className="h-[38px] px-5 rounded-full bg-[#FAF6F0] border border-primary/20 text-[#421B1B] font-sans font-medium text-[12px] flex items-center justify-center gap-1.5 shadow-sm">
            <span>Read More</span>
            <span className="text-[14px]">↗</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}
