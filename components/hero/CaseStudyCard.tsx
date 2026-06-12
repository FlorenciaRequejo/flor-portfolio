"use client";

import { motion } from "framer-motion";
import { useRef, useEffect } from "react";

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

  // Fallback to force video autoplay on iOS / safari if needed
  useEffect(() => {
    if (videoRef.current) {
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
      boxShadow: "0 10px 30px rgba(66, 27, 27, 0.03)",
      borderColor: "rgba(255, 139, 209, 0.15)",
    },
    hover: {
      y: -8,
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(255, 139, 209, 0.18), 0 0 0 1px #FF8BD1",
      borderColor: "#FF8BD1",
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
      className={`relative flex flex-col overflow-hidden bg-white rounded-[32px] border transition-colors duration-300 w-full md:w-[400px] select-none ${
        featured ? "h-[490px] md:h-[510px]" : "h-[460px] md:h-[480px]"
      }`}
    >
      {/* Media Container */}
      <div
        className={`w-full overflow-hidden relative ${
          featured ? "h-[250px] md:h-[270px]" : "h-[340px] md:h-[360px]"
        }`}
      >
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover object-center"
        />
      </div>

      {/* Content Container */}
      <div className="p-6 flex flex-col justify-between flex-grow text-left">
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

          {/* Description (featured card only) */}
          {featured && description && (
            <p className="font-sans text-[14px] leading-[22px] text-[#421B1B]/75 font-normal mt-3 max-w-[340px]">
              {description}
            </p>
          )}
        </div>

        {/* Read More pill (featured card only) */}
        {featured && (
          <div className="flex justify-end mt-4">
            <div className="h-[38px] px-5 rounded-full bg-[#FAF6F0] border border-primary/20 text-[#421B1B] font-sans font-medium text-[12px] flex items-center justify-center gap-1.5 shadow-sm hover:bg-[#FAF6F0]/90 transition-colors duration-200">
              <span>Read More</span>
              <span className="text-[14px]">↗</span>
            </div>
          </div>
        )}
      </div>
    </motion.a>
  );
}
