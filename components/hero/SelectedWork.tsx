"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CaseStudyCard from "./CaseStudyCard";

export default function SelectedWork() {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoBlobUrl, setVideoBlobUrl] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  
  // Projects Carousel state & refs
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isSnapping, setIsSnapping] = useState(true);
  const isHovered = useRef(false);
  const isTouching = useRef(false);
  const scrollDirectionRef = useRef(1); // 1 = right, -1 = left
  const settleTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Testimonials Carousel state & refs
  const testimonialsContainerRef = useRef<HTMLDivElement>(null);
  const [isTestimonialsSnapping, setIsTestimonialsSnapping] = useState(true);
  const isTestimonialsHovered = useRef(false);
  const isTestimonialsTouching = useRef(false);
  const testimonialsDirectionRef = useRef(1); // 1 = right, -1 = left
  const testimonialsSettleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollSpeed = 20; // speed in pixels per second

  useEffect(() => {
    let idleId: any;
    let observer: IntersectionObserver | null = null;

    const triggerLoad = () => {
      setShouldLoadVideo(true);
      if (observer) observer.disconnect();
      if (typeof window !== "undefined" && "requestIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
    };

    // 1. Idle loading fallback
    if (typeof window !== "undefined") {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(triggerLoad);
      } else {
        idleId = setTimeout(triggerLoad, 4000);
      }
    }

    // 2. Viewport entrance loading
    if (sectionRef.current) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            triggerLoad();
          }
        },
        { rootMargin: "300px" } // trigger loading before it enters viewport
      );
      observer.observe(sectionRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      if (typeof window !== "undefined") {
        if ("requestIdleCallback" in window) {
          window.cancelIdleCallback(idleId);
        } else {
          clearTimeout(idleId);
        }
      }
    };
  }, []);

  useEffect(() => {
    if (!shouldLoadVideo) return;

    let active = true;
    let createdUrl: string | null = null;

    fetch("/case-study-video.mp4")
      .then((res) => {
        if (!res.ok) throw new Error("Video load failed");
        return res.blob();
      })
      .then((blob) => {
        if (active) {
          createdUrl = URL.createObjectURL(blob);
          setVideoBlobUrl(createdUrl);
        }
      })
      .catch((err) => {
        console.error("Video preloading failed, falling back to static URL:", err);
        if (active) {
          setVideoBlobUrl("/case-study-video.mp4");
        }
      });

    return () => {
      active = false;
      if (createdUrl) {
        URL.revokeObjectURL(createdUrl);
      }
    };
  }, [shouldLoadVideo]);

  // Effect for Auto-Rotation programmatic loop
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    // Center Card 2 exactly in the viewport on desktop, start at 0 on mobile
    const centerCarousel = () => {
      if (window.innerWidth >= 768) {
        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 0) {
          container.scrollLeft = maxScroll / 2;
        }
      } else {
        container.scrollLeft = 0;
      }
    };

    centerCarousel();
    const loadTimeout = setTimeout(centerCarousel, 250);

    let animationId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isHovered.current && !isTouching.current) {
        // Optimize re-renders by setting snap state only at boundaries
        setIsSnapping((prev) => {
          if (prev) return false;
          return prev;
        });

        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 0) {
          let currentScroll = container.scrollLeft;
          let nextScroll = currentScroll + scrollDirectionRef.current * scrollSpeed * delta;

          if (nextScroll >= maxScroll) {
            nextScroll = maxScroll;
            scrollDirectionRef.current = -1;
          } else if (nextScroll <= 0) {
            nextScroll = 0;
            scrollDirectionRef.current = 1;
          }

          container.scrollLeft = nextScroll;
        }
      } else {
        setIsSnapping((prev) => {
          if (!prev) return true;
          return prev;
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    const startTimeout = setTimeout(() => {
      lastTime = performance.now();
      animationId = requestAnimationFrame(animate);
    }, 1500);

    const handleResize = () => {
      centerCarousel();
    };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(loadTimeout);
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    isHovered.current = true;
  };

  const handleMouseLeave = () => {
    isHovered.current = false;
  };

  const handleTouchStart = () => {
    isTouching.current = true;
    setIsSnapping((prev) => {
      if (!prev) return true;
      return prev;
    });
  };

  const handleTouchEnd = () => {
    if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
    settleTimerRef.current = setTimeout(() => {
      isTouching.current = false;
    }, 2000);
  };

  // Effect for Testimonials Auto-Rotation programmatic loop
  useEffect(() => {
    const container = testimonialsContainerRef.current;
    if (!container) return;

    let animationId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isTestimonialsHovered.current && !isTestimonialsTouching.current) {
        setIsTestimonialsSnapping((prev) => {
          if (prev) return false;
          return prev;
        });

        const maxScroll = container.scrollWidth - container.clientWidth;
        if (maxScroll > 0) {
          let currentScroll = container.scrollLeft;
          let nextScroll = currentScroll + testimonialsDirectionRef.current * scrollSpeed * delta;

          if (nextScroll >= maxScroll) {
            nextScroll = maxScroll;
            testimonialsDirectionRef.current = -1;
          } else if (nextScroll <= 0) {
            nextScroll = 0;
            testimonialsDirectionRef.current = 1;
          }

          container.scrollLeft = nextScroll;
        }
      } else {
        setIsTestimonialsSnapping((prev) => {
          if (!prev) return true;
          return prev;
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    // Stagger start slightly to keep page loading visual flow calm
    const startTimeout = setTimeout(() => {
      lastTime = performance.now();
      animationId = requestAnimationFrame(animate);
    }, 2000);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleTestimonialsMouseEnter = () => {
    isTestimonialsHovered.current = true;
  };

  const handleTestimonialsMouseLeave = () => {
    isTestimonialsHovered.current = false;
  };

  const handleTestimonialsTouchStart = () => {
    isTestimonialsTouching.current = true;
    setIsTestimonialsSnapping((prev) => {
      if (!prev) return true;
      return prev;
    });
  };

  const handleTestimonialsTouchEnd = () => {
    if (testimonialsSettleTimerRef.current) clearTimeout(testimonialsSettleTimerRef.current);
    testimonialsSettleTimerRef.current = setTimeout(() => {
      isTestimonialsTouching.current = false;
    }, 2000);
  };

  return (
    <section ref={sectionRef} className="w-full bg-white p-[8px] pb-[220px] md:p-[30px] md:pb-[320px] rounded-[48px] md:rounded-[110px] relative z-[1]">
      <div className="w-full bg-[#fbf5f5] rounded-[38px] md:rounded-[80px] pt-10 pb-16 md:pt-16 md:pb-24 relative">
        
        {/* Header Section: Two-column layout on desktop */}
        <div className="mx-auto w-[min(76vw,1260px)] px-4 md:px-0 mb-4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6 md:gap-12 w-full">
            {/* Left Side: Eyebrow and Headline */}
            <div className="flex flex-col gap-4 max-w-[620px]">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#421B1B]/5 text-[#421B1B] font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit">
                Selected Work
              </span>
              <h2 className="font-serif text-[42px] md:text-[64px] leading-[1.05] text-[#421B1B] font-normal tracking-tight">
                A few problems
                <br />
                I've helped solve.
              </h2>
            </div>

            {/* Right Side: Supporting Copy */}
            <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-[#421B1B]/75 font-normal max-w-[460px] md:mt-16">
              Every project is different. The common thread is turning complexity into something simple that people can actually use.
            </p>
          </div>
        </div>

        {/* Carousel / Cards Row: Unified scrollable carousel for desktop and mobile */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className="w-full overflow-x-auto scrollbar-none flex mt-2 md:mt-4 relative translate-y-[60px] md:translate-y-[80px] -mb-[60px] md:-mb-[80px] z-20"
          style={{
            scrollSnapType: isSnapping ? "x mandatory" : "none"
          }}
        >
          <div
            className="flex flex-nowrap gap-5 md:gap-10 shrink-0 py-4"
            style={{
              paddingLeft: "var(--carousel-padding-left)",
              paddingRight: "var(--carousel-padding-right)"
            }}
          >
            
            {/* Card 1: Web Design */}
            <div className="snap-start shrink-0 w-[78vw] sm:w-[340px] md:w-[36vw] max-w-[540px] min-w-[340px] flex">
              <CaseStudyCard
                title="Web design and development"
                description="From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't."
                videoSrc={videoBlobUrl || ""}
                href="#projects"
                featured={false}
              />
            </div>

            {/* Card 2: Product Thinking */}
            <div className="snap-start shrink-0 w-[78vw] sm:w-[340px] md:w-[36vw] max-w-[540px] min-w-[340px] flex">
              <CaseStudyCard
                title="End-to-end product thinking"
                description="From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't."
                videoSrc={videoBlobUrl || ""}
                href="#projects"
                featured={false}
              />
            </div>

            {/* Card 3: UX Experience */}
            <div className="snap-start shrink-0 w-[78vw] sm:w-[340px] md:w-[36vw] max-w-[540px] min-w-[340px] flex">
              <CaseStudyCard
                title="UX and customer experience"
                description="From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't."
                videoSrc={videoBlobUrl || ""}
                href="#projects"
                featured={false}
              />
            </div>

            {/* Mobile End Spacer */}
            <div className="w-4 md:hidden shrink-0" />
          </div>
        </div>

        {/* Testimonials Divider / Section */}
        <div className="mt-24 md:mt-32">
          
          {/* Testimonials Header */}
          <div className="mx-auto w-[min(76vw,1260px)] px-4 md:px-0 mb-8 md:mb-12 text-left">
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-12 w-full">
              {/* Left Side */}
              <div className="flex flex-col gap-4 max-w-[620px]">
                <span className="inline-block px-4 py-1.5 rounded-full bg-[#421B1B]/5 text-[#421B1B] font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit">
                  Testimonials
                </span>
                <h2 className="font-serif text-[36px] md:text-[52px] leading-[1.1] text-[#421B1B] font-normal tracking-tight">
                  What people say
                  <br />
                  after working with me
                </h2>
              </div>
              
              {/* Right Side */}
              <p className="font-sans text-[15px] md:text-[16px] leading-[24px] text-[#421B1B]/75 font-normal max-w-[440px] md:mb-2">
                A few words from people I’ve worked with across web, design, product and systems projects.
              </p>
            </div>
          </div>

          {/* Testimonials Carousel */}
          <div
            ref={testimonialsContainerRef}
            onMouseEnter={handleTestimonialsMouseEnter}
            onMouseLeave={handleTestimonialsMouseLeave}
            onTouchStart={handleTestimonialsTouchStart}
            onTouchEnd={handleTestimonialsTouchEnd}
            onTouchCancel={handleTestimonialsTouchEnd}
            className="w-full overflow-x-auto scrollbar-none flex relative z-20"
            style={{
              scrollSnapType: isTestimonialsSnapping ? "x mandatory" : "none"
            }}
          >
            <div
              className="flex flex-nowrap gap-5 md:gap-8 shrink-0 py-4"
              style={{
                paddingLeft: "var(--carousel-padding-left)",
                paddingRight: "var(--carousel-padding-right)"
              }}
            >
              {testimonials.map((t) => (
                <TestimonialCard
                  key={t.name}
                  quote={t.quote}
                  name={t.name}
                  role={t.role}
                  avatarSrc={t.avatarSrc}
                />
              ))}

              {/* Mobile End Spacer */}
              <div className="w-4 md:hidden shrink-0" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

// ==========================================
// Testimonials Data & Card Component
// ==========================================

const testimonials = [
  {
    quote: "Florencia has a rare ability to turn messy ideas into clear, usable systems.",
    name: "Sarah Mitchell",
    role: "Marketing Manager",
    avatarSrc: "/avatar-1.png",
  },
  {
    quote: "She understands the design, the user experience and the technical side, which made the whole project easier.",
    name: "James Carter",
    role: "Business Owner",
    avatarSrc: "/avatar-2.png",
  },
  {
    quote: "Working with Florencia helped us move from scattered requirements to a solution that actually worked.",
    name: "Emily Roberts",
    role: "Operations Lead",
    avatarSrc: "/avatar-3.png",
  },
  {
    quote: "She asks the right questions, finds the gaps quickly and brings structure without overcomplicating things.",
    name: "Liam Thompson",
    role: "Project Manager",
    avatarSrc: "/avatar-4.png",
  },
  {
    quote: "The final result felt considered, practical and easy for our team to manage.",
    name: "Rebecca Wilson",
    role: "Director",
    avatarSrc: "/avatar-5.png",
  },
];

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
}

function TestimonialCard({ quote, name, role, avatarSrc }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 flex flex-col justify-between h-[280px] md:h-[300px] w-[75vw] sm:w-[300px] md:w-[20vw] min-w-[280px] max-w-[340px] shadow-[0_10px_30px_rgba(66,27,27,0.03)] select-none shrink-0 snap-start">
      <p className="font-sans text-[15px] md:text-[16px] leading-[24px] text-[#421B1B]/95 font-normal italic text-left">
        “{quote}”
      </p>
      <div className="flex items-center gap-4 mt-6">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#FAF6F0] flex-shrink-0">
          <Image
            src={avatarSrc}
            alt={name}
            fill
            sizes="40px"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-sans text-[14px] font-semibold text-[#421B1B]">
            {name}
          </span>
          <span className="font-sans text-[12px] text-[#421B1B]/60 font-medium">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}
