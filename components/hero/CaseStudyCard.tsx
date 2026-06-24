"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";
import Image from "next/image";

interface CaseStudyCardProps {
  title: string;
  description?: string;
  videoSrc: string;
  imageSrc?: string;
  href: string;
  featured: boolean;
}

export default function CaseStudyCard({
  title,
  description,
  videoSrc,
  imageSrc,
  href,
  featured,
}: CaseStudyCardProps) {
  const router = useRouter();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanding, setIsExpanding] = useState(false);
  const [cardRect, setCardRect] = useState<DOMRect | null>(null);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("/")) {
      e.preventDefault();
      const rect = e.currentTarget.getBoundingClientRect();
      setCardRect(rect);
      setIsExpanding(true);

      router.prefetch(href);
      setTimeout(() => {
        router.push(href);
      }, 600);
    }
  };

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

  // Clean soft shadow variants (size/scale and position stay completely fixed)
  const cardVariants = {
    initial: {
      boxShadow: "0 15px 45px rgba(27, 35, 122, 0.07)",
    },
    hover: {
      boxShadow: "0 30px 60px rgba(27, 35, 122, 0.12)",
    },
  };

  return (
    <>
      <motion.a
        href={href}
        variants={cardVariants}
        initial="initial"
        whileHover="hover"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleClick}
        transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
        className="relative flex flex-col justify-between overflow-hidden bg-white rounded-[32px] md:rounded-[40px] w-full select-none p-6 md:p-8 h-[480px] md:h-[540px] lg:h-[580px]"
      >
        {/* Media Container */}
        <div className="relative w-full h-[240px] md:h-[300px] lg:h-[340px] rounded-[20px] md:rounded-[28px] overflow-hidden">
          <Image
            src={imageSrc || "/case-study-poster.png"}
            alt={title}
            fill
            priority={false}
            sizes="(max-width: 768px) 100vw, 33vw"
            className={`object-cover object-center transition-opacity duration-500 ${isHovered && isVideoReady ? "opacity-0" : "opacity-100"
              }`}
          />
          {videoSrc && (
            <video
              ref={videoRef}
              src={videoSrc}
              preload="none"
              muted
              loop
              playsInline
              onLoadedData={() => setIsVideoReady(true)}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ${isHovered && isVideoReady ? "opacity-100" : "opacity-0"
                }`}
            />
          )}
        </div>

        {/* Content Container: Inset 10px more than media (total X + 10px) */}
        <div className="relative pt-0 mt-4 flex-grow text-left px-[10px] pb-[10px]">
          {/* Text area: pr only on desktop, bottom padding on mobile to clear centered button */}
          <div className="pb-16 md:pb-0 md:pr-[115px]">
            <h3 className="text-[#1B237A] font-sans font-semibold text-[18px] leading-tight">
              {title}
            </h3>

            {description && (
              <p className="font-sans text-[14px] leading-[22px] text-[#1B237A]/75 font-normal mt-3">
                {description}
              </p>
            )}
          </div>

          {/* Minimal Read More pill: bottom-center on mobile, bottom-right on desktop */}
          <div className="absolute bottom-[10px] left-1/2 -translate-x-1/2 md:left-auto md:translate-x-0 md:right-[10px]">
            <div className="h-[38px] px-5 rounded-full bg-[#B8F74B] text-[#1B237A] font-sans font-medium text-[12px] flex items-center justify-center gap-1.5">
              <span>Read More</span>
              <span className="text-[14px]">↗</span>
            </div>
          </div>
        </div>
      </motion.a>

      {/* Transition Portal Overlay */}
      {isExpanding && cardRect && typeof document !== "undefined" && createPortal(
        <motion.div
          initial={{
            position: "fixed",
            top: cardRect.top,
            left: cardRect.left,
            width: cardRect.width,
            height: cardRect.height,
            borderRadius: "32px",
            backgroundColor: "white",
            zIndex: 9999,
          }}
          animate={{
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            borderRadius: "0px",
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 1, 0.5, 1],
          }}
          className="pointer-events-none"
        />,
        document.body
      )}
    </>
  );
}

