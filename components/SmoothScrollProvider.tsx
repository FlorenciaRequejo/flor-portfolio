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
        const targetElement = document.getElementById(hash.slice(1));
        if (targetElement) {
          e.preventDefault();

          // Update the URL hash
          window.history.pushState(null, "", hash);

          // Scroll smoothly
          if (lenisRef.current) {
            // Lenis is active, let Lenis scroll smoothly
            lenisRef.current.scrollTo(targetElement, {
              duration: 1.2,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          } else {
            // If Lenis is not active (because we are in the hero section),
            // check if the target is past the hero section.
            const marker = document.getElementById("smooth-scroll-marker");
            const targetRect = targetElement.getBoundingClientRect();
            const markerRect = marker?.getBoundingClientRect();

            // If the target element is below the marker, we should enable Lenis first!
            if (markerRect && targetRect.top + window.scrollY > markerRect.top + window.scrollY) {
              setIsPastHero(true);
              // Wait a tiny bit for Lenis to be initialized in the next render cycle, then scroll with it
              setTimeout(() => {
                if (lenisRef.current) {
                  lenisRef.current.scrollTo(targetElement, { duration: 1.2 });
                } else {
                  targetElement.scrollIntoView({ behavior: "smooth" });
                }
              }, 50);
            } else {
              // Otherwise (e.g. target is `#about` in the hero), scroll natively/smoothly
              targetElement.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);
    return () => {
      document.removeEventListener("click", handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}
