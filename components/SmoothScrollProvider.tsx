"use client";

import { useEffect, useRef, useState } from "react";
import Lenis from "lenis";

// Simple toggle flag to easily disable/enable smooth scroll functionality
export const ENABLE_SMOOTH_SCROLL = true;

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isPastHero, setIsPastHero] = useState(false);

  useEffect(() => {
    if (!ENABLE_SMOOTH_SCROLL) return;

    // Accessibility: Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    // Set up IntersectionObserver to observe the #smooth-scroll-marker
    const marker = document.getElementById("smooth-scroll-marker");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // If the marker has reached or crossed above the bottom of the viewport
          const past = entry.boundingClientRect.top <= window.innerHeight;
          setIsPastHero(past);
        }
      },
      {
        root: null, // viewport
        rootMargin: "0px",
        threshold: [0, 1],
      }
    );

    if (marker) {
      observer.observe(marker);
    } else {
      // Fallback: poll for the marker if it isn't ready immediately during client hydration
      const pollTimer = setInterval(() => {
        const polledMarker = document.getElementById("smooth-scroll-marker");
        if (polledMarker) {
          observer.observe(polledMarker);
          clearInterval(pollTimer);
        }
      }, 100);
      return () => {
        clearInterval(pollTimer);
        observer.disconnect();
      };
    }

    // Scroll fallback event listener to guarantee activation state is always synced
    const handleScrollFallback = () => {
      const currentMarker = document.getElementById("smooth-scroll-marker");
      if (currentMarker) {
        const rect = currentMarker.getBoundingClientRect();
        const past = rect.top <= window.innerHeight;
        setIsPastHero(past);
      }
    };
    window.addEventListener("scroll", handleScrollFallback, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollFallback);
    };
  }, []);

  // Sync Lenis instance based on isPastHero state
  useEffect(() => {
    if (!ENABLE_SMOOTH_SCROLL) return;

    if (isPastHero) {
      // Initialize Lenis when past the hero section
      if (!lenisRef.current) {
        const lenis = new Lenis({
          duration: 0.8, // subtle duration, around 0.7 to 0.9
          smoothWheel: true,
          syncTouch: false, // keep mobile/touch behaviour natural (no smoothing on touch)
        });
        lenisRef.current = lenis;

        let rafId: number;
        let isStopped = false;

        const update = (time: number) => {
          // Check for temporary bypass flags:
          // - Carousel dragging
          // - Mobile menu open (class is-open on .nav-outline-pill)
          // - Body overflow hidden (locked scroll)
          const isCarouselDragging = document.documentElement.hasAttribute("data-carousel-dragging");
          const isMenuOpen = !!document.querySelector(".nav-outline-pill.is-open");
          const isBodyLocked =
            document.body.style.overflow === "hidden" ||
            document.documentElement.style.overflow === "hidden";

          if (isCarouselDragging || isMenuOpen || isBodyLocked) {
            if (!isStopped) {
              lenis.stop();
              isStopped = true;
            }
          } else {
            if (isStopped) {
              lenis.start();
              isStopped = false;
            }
          }

          lenis.raf(time);
          rafId = requestAnimationFrame(update);
        };
        rafId = requestAnimationFrame(update);

        cleanupRef.current = () => {
          cancelAnimationFrame(rafId);
          lenis.destroy();
          lenisRef.current = null;
        };
      }
    } else {
      // User is in the hero section, ensure Lenis is destroyed so scroll is 100% native
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    }

    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [isPastHero]);

  const isPastHeroRef = useRef(isPastHero);
  useEffect(() => {
    isPastHeroRef.current = isPastHero;
  }, [isPastHero]);

  const scrollToHash = (hash: string) => {
    const targetId = hash.slice(hash.indexOf("#") + 1);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return false;

    // Determine offset to prevent sticky navbar from cutting off headings
    const isMobile = window.innerWidth < 768;
    const offset = isMobile ? 80 : 110;

    // Calculate target Y position
    let targetScrollY = 0;
    if (hash.endsWith("#about")) {
      const container = targetElement.closest(".relative.w-full") as HTMLElement;
      if (container) {
        const containerTop = container.getBoundingClientRect().top + window.scrollY;
        const viewportHeight = window.innerHeight;
        const scrollHeight = container.offsetHeight - viewportHeight;
        // Scroll exactly to where the AboutSection is fully morphed and visible (p = 0.88)
        targetScrollY = containerTop + 0.88 * scrollHeight;
      } else {
        targetScrollY = targetElement.getBoundingClientRect().top + window.scrollY - offset;
      }
    } else {
      targetScrollY = targetElement.getBoundingClientRect().top + window.scrollY - offset;
    }

    // Check if target position is past the hero section to sync Lenis activation
    const marker = document.getElementById("smooth-scroll-marker");
    const markerTop = marker ? marker.getBoundingClientRect().top + window.scrollY : window.innerHeight;
    const isPast = targetScrollY > markerTop;

    const performScroll = () => {
      if (lenisRef.current) {
        lenisRef.current.scrollTo(targetScrollY, {
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      } else {
        window.scrollTo({ top: targetScrollY, behavior: "smooth" });
      }
    };

    if (isPast && !isPastHeroRef.current) {
      setIsPastHero(true);
      // Wait for Lenis to initialize in the next render cycle, then scroll
      setTimeout(performScroll, 150);
    } else {
      performScroll();
    }

    return true;
  };

  // Handle smooth scrolling for all anchor links
  useEffect(() => {
    if (!ENABLE_SMOOTH_SCROLL) return;

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Extract the hash from href (e.g. "#projects" from "/#projects" or "#projects")
      const hashIndex = href.indexOf("#");
      if (hashIndex === -1) return;

      const hash = href.slice(hashIndex);
      const path = href.slice(0, hashIndex);

      // Verify the link is for the current page
      const currentPath = window.location.pathname;
      if (path === "" || path === "/" || path === currentPath) {
        const scrolled = scrollToHash(hash);
        if (scrolled) {
          e.preventDefault();
          // Update the URL hash
          window.history.pushState(null, "", hash);
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  // Handle initial hash on page load
  useEffect(() => {
    if (!ENABLE_SMOOTH_SCROLL) return;

    const handleInitialHash = () => {
      const hash = window.location.hash;
      if (hash) {
        // Scroll to top immediately to prevent native jump, then smooth scroll
        window.scrollTo(0, 0);
        setTimeout(() => {
          scrollToHash(hash);
        }, 400);
        // Recalculate and scroll again after layout is fully stabilized
        setTimeout(() => {
          scrollToHash(hash);
        }, 1200);
      }
    };

    if (document.readyState === "complete") {
      handleInitialHash();
    } else {
      window.addEventListener("load", handleInitialHash);
      return () => window.removeEventListener("load", handleInitialHash);
    }
  }, []);

  return <>{children}</>;
}
