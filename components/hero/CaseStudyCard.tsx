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
  const [isHovered, setIsHovered] = useState(false);

  // Control video playback based on hover state
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isHovered) {
      video.play().catch((err) => {
        console.warn("Autoplay on hover prevented:", err);
      });
    } else {
      video.pause();
      if (video.readyState >= 1) {
        video.currentTime = 0;
      }
    }
  }, [isHovered]);

  // Clean scale lift and soft shadow variants
  const cardVariants = {
    initial: {
      y: 0,
      scale: 1,
      boxShadow: "0 15px 45px rgba(66, 27, 27, 0.07)",
    },
    hover: {
      y: -10,
      scale: 1.025,
      boxShadow: "0 30px 60px rgba(66, 27, 27, 0.12)",
    },
  };

  return (
    <motion.a
      href={href}
      variants={cardVariants}
      initial="initial"
      whileHover="hover"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
      className="relative flex flex-col justify-between overflow-hidden bg-white rounded-[32px] w-full select-none p-5 h-[420px] md:h-[470px]"
    >
      {/* Media Container */}
      <div className="relative w-full h-[180px] md:h-[220px] rounded-[20px] overflow-hidden">
        <Image
          src="/case-study-poster.png"
          alt={title}
          fill
          priority={false}
          sizes="(max-width: 768px) 100vw, 33vw"
          className={`object-cover object-center transition-opacity duration-500 ${
            isHovered && isVideoReady ? "opacity-0" : "opacity-100"
          }`}
        />
        {videoSrc && (
          <video
            ref={videoRef}
            src={videoSrc}
            muted
            loop
            playsInline
            onLoadedData={() => setIsVideoReady(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${
              isHovered && isVideoReady ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* Content Container: Inset 10px more than media (total X + 10px) */}
      <div className="relative pt-0 mt-5 flex-grow text-left px-[10px] pb-[10px]">
        {/* Text area: pr only on desktop, bottom padding on mobile to clear centered button */}
        <div className="pb-16 md:pb-0 md:pr-[115px]">
          <h3 className="text-[#421B1B] font-sans font-semibold text-[18px] leading-tight">
            {title}
          </h3>

          {description && (
            <p className="font-sans text-[14px] leading-[22px] text-[#421B1B]/75 font-normal mt-3">
              {description}
            </p>
          )}
        </div>

        {/* Minimal Read More pill: bottom-center on mobile, bottom-right on desktop */}
        <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[10px]">
          <div className="h-[38px] px-5 rounded-full bg-[#FAF6F0] text-[#421B1B] font-sans font-medium text-[12px] flex items-center justify-center gap-1.5">
            <span>Read More</span>
            <span className="text-[14px]">↗</span>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

