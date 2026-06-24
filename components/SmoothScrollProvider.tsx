"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

// Simple toggle flag to easily disable/enable smooth scroll functionality
export const ENABLE_SMOOTH_SCROLL = true;

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isPastHero, setIsPastHero] = useState(false);
  const isProgrammaticScrollingRef = useRef(false);
  const programmaticScrollTimeoutRef = useRef<any>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (programmaticScrollTimeoutRef.current) {
        clearTimeout(programmaticScrollTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!ENABLE_SMOOTH_SCROLL) return;

    // Accessibility: Check prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    // Set up IntersectionObserver to observe the #smooth-scroll-marker
    const observer = new IntersectionObserver(
      (entries) => {
        if (isProgrammaticScrollingRef.current) return;
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

    let observed = false;
    let pollTimer: any = null;

    const startObserving = (el: HTMLElement) => {
      observer.observe(el);
      observed = true;
    };

    const initialMarker = document.getElementById("smooth-scroll-marker");
    if (initialMarker) {
      startObserving(initialMarker);
    } else {
      // Poll a limited number of times (e.g. 15 times over 1.5 seconds)
      let attempts = 0;
      pollTimer = setInterval(() => {
        const polledMarker = document.getElementById("smooth-scroll-marker");
        attempts++;
        if (polledMarker) {
          startObserving(polledMarker);
          if (pollTimer) clearInterval(pollTimer);
        } else if (attempts >= 15) {
          if (pollTimer) clearInterval(pollTimer);
        }
      }, 100);
    }

    // Scroll fallback event listener to guarantee activation state is always synced
    const handleScrollFallback = () => {
      if (isProgrammaticScrollingRef.current) return;
      const currentMarker = document.getElementById("smooth-scroll-marker");
      if (currentMarker) {
        const rect = currentMarker.getBoundingClientRect();
        const past = rect.top <= window.innerHeight;
        setIsPastHero(past);
      }
    };
    window.addEventListener("scroll", handleScrollFallback, { passive: true });

    return () => {
      if (pollTimer) clearInterval(pollTimer);
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollFallback);
    };
  }, [pathname]);

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
      const container = targetElement.closest(".morphing-lines-container") as HTMLElement;
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

    // Set programmatic scroll lock to prevent observer/fallback scroll events from destroying Lenis
    isProgrammaticScrollingRef.current = true;
    if (programmaticScrollTimeoutRef.current) {
      clearTimeout(programmaticScrollTimeoutRef.current);
    }
    programmaticScrollTimeoutRef.current = setTimeout(() => {
      isProgrammaticScrollingRef.current = false;
    }, 1800);

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

  // Handle hash changes on page load or client-side navigation
  useEffect(() => {
    if (!ENABLE_SMOOTH_SCROLL) return;

    const handleHash = () => {
      // Next.js routing might update history/hash asynchronously relative to pathname changes,
      // so poll for the hash to be present in window.location if it's empty initially.
      let hashAttempts = 0;
      const checkHash = () => {
        const hash = window.location.hash;
        if (!hash) {
          if (hashAttempts < 15) {
            hashAttempts++;
            setTimeout(checkHash, 50);
          }
          return;
        }

        // Parse the ID
        const targetId = hash.slice(hash.indexOf("#") + 1);
        if (!targetId) return;

        // Scroll to top immediately to avoid jumpy behavior
        window.scrollTo(0, 0);

        // Start polling for the target element to become available in the DOM
        let attempts = 0;
        const maxAttempts = 40; // up to 2 seconds (40 * 50ms)
        const pollInterval = setInterval(() => {
          const targetElement = document.getElementById(targetId);
          attempts++;

          if (targetElement) {
            clearInterval(pollInterval);
            // Scroll now that the element is in the DOM
            scrollToHash(hash);
            
            // Also schedule follow-up scrolls to stabilize after layout settles
            setTimeout(() => {
              scrollToHash(hash);
            }, 600);
            setTimeout(() => {
              scrollToHash(hash);
            }, 1200);
          } else if (attempts >= maxAttempts) {
            clearInterval(pollInterval);
            console.warn(`[SmoothScroll] Target #${targetId} not found after polling.`);
          }
        }, 50);
      };

      checkHash();
    };

    // Run on pathname change (and initial load)
    handleHash();

    // Also listen to hashchange events just in case
    window.addEventListener("hashchange", handleHash);
    return () => {
      window.removeEventListener("hashchange", handleHash);
    };
  }, [pathname]);

  return <>{children}</>;
}
