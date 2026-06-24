"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";

export const ENABLE_SMOOTH_SCROLL = true;

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export default function SmoothScrollProvider({ children }: SmoothScrollProviderProps) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const [isPastHero, setIsPastHero] = useState(false);

  // IntersectionObserver to sync isPastHero based on the scroll marker
  useEffect(() => {
    if (!ENABLE_SMOOTH_SCROLL) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const past = entry.boundingClientRect.top <= window.innerHeight;
          setIsPastHero(past);
        }
      },
      {
        root: null,
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
      if (pollTimer) clearInterval(pollTimer);
      observer.disconnect();
      window.removeEventListener("scroll", handleScrollFallback);
    };
  }, [pathname]);

  // Sync Lenis instance based on isPastHero state
  useEffect(() => {
    if (!ENABLE_SMOOTH_SCROLL) return;

    if (isPastHero) {
      if (!lenisRef.current) {
        const lenis = new Lenis({
          duration: 0.8,
          smoothWheel: true,
          syncTouch: false,
        });
        lenisRef.current = lenis;

        let rafId: number;
        let isStopped = false;

        const update = (time: number) => {
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

  // Reset scroll and states on pathname changes
  useEffect(() => {
    window.scrollTo(0, 0);
    setIsPastHero(false);
  }, [pathname]);

  return <>{children}</>;
}
