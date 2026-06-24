"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import CaseStudyCard from "./CaseStudyCard";
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion } from "framer-motion";

const caseStudyCards = [
  {
    title: "Design + development",
    description:
      "Rebuilt a fragile legacy news platform into a scalable publishing ecosystem by redesigning its architecture and separating infrastructure responsibilities.",
    href: "/web-design-and-development",
    imageSrc: "/Web Design and Development.png",
    videoSrc: "/Web Design and Development.mp4",
  },
  {
    title: "Concept to launch",
    description:
      "An AI-powered system that automates website audits, transforming UX, SEO and performance data into actionable business recommendations.",
    href: "#projects",
    imageSrc: "/End To End Product Thinking.jpg",
    videoSrc: "/End To End Product Thinking.mp4",
  },
  {
    title: "Brand identity",
    description:
      "Developed a complete visual language, from logo design and app interfaces to marketing materials and brand collateral, creating a consistent and memorable experience across every touchpoint.",
    href: "#projects",
    imageSrc: "/Ux and User Experience.png",
    videoSrc: "/Ux and User Experience.mp4",
  },
];

const duplicatedCaseStudyCards = [...caseStudyCards, ...caseStudyCards, ...caseStudyCards];



const testimonials = [
  {
    quote:
      "Flossie is one of those rare creatives who just gets it. Whether it’s web, UX/UI, branding, or even structural design, she brings fresh ideas, great instincts, and an incredible eye for detail. She’s thoughtful in her approach, quick to solve problems, and always thinking about the user. Beyond her talent, she’s simply a lovely person to work with — positive, collaborative, and full of quiet confidence. I learned a lot working with her and would jump at the chance to do it again.",
    name: "Jasjeevan Singh",
    role: "Production Manager & Experienced Studio Leader",
    avatarSrc: "/avatar-1.jpg",
  },
  {
    quote:
      "If you’re looking for someone to really add value to your AI development, website performance or add creativity to your team. I would without hesitation recommend Florencia she did amazing work for us at Miles Nelson and lot of the outward facing media platforms that we use were initiated by her.",
    name: "David Eeles",
    role: "GM sales and operations at Miles Nelson",
    avatarSrc: "/avatar-2.jpg",
  },
  {
    quote:
      "Florencia is a standout tech leader—always ahead of the curve and deeply passionate about innovation. She combines sharp technical expertise with strong leadership, inspiring teams to push boundaries and deliver real impact.",
    name: "Sam Blenkiron",
    role: "Director",
    avatarSrc: "/avatar-3.jpg",
  },
  {
    quote:
      "Con creatividad y un gusto exquisito, la excelencia como premisa, pasión por su profesión, compromiso y absoluta responsabilidad, Florencia imprime su marca personal en cada uno de sus trabajos. Tenerla como colaboradora hace que todo sea más simple y otorga la tranquilidad de saber que el resultado es siempre superador.",
    name: "Paulina Abate",
    role: "Creative",
    avatarSrc: "/avatar-4.jpg",
  },
];

const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

function CarouselIndicator({ activeIndex, onClick }: { activeIndex: number; onClick: (index: number) => void }) {
  return (
    <div className="md:hidden flex justify-center gap-2.5 my-3 pointer-events-auto">
      {[0, 1, 2].map((i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          className={`h-[3px] rounded-full transition-all duration-300 ${
            activeIndex === i 
              ? "w-8 bg-[#B8F74B]" 
              : "w-4 bg-[#B8F74B]/30"
          }`}
          aria-label={`Go to slide ${i + 1}`}
        />
      ))}
    </div>
  );
}

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
}

function TestimonialCard({ quote, name, role, avatarSrc }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 flex flex-col justify-between min-h-[420px] md:min-h-[500px] w-[75vw] sm:w-[340px] md:w-[24vw] min-w-[320px] max-w-[420px] shadow-[0_10px_30px_rgba(27,35,122,0.04)] select-none shrink-0 snap-start">
      <p className="font-sans text-[14px] leading-[26px] text-[#1B237A]/90 font-normal text-left">
        “{quote}”
      </p>

      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-[#1B237A]/8">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-[#FAF6F0] flex-shrink-0">
          <Image
            src={avatarSrc}
            alt={name}
            fill
            sizes="40px"
            draggable="false"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col text-left">
          <span className="font-sans text-[14px] font-semibold text-[#1B237A]">
            {name}
          </span>

          <span className="font-sans text-[12px] text-[#1B237A]/60 font-medium">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"]
  });

  const shouldReduceMotion = useReducedMotion();

  const borderProgress = shouldReduceMotion
    ? useMotionValue(1)
    : useTransform(scrollYProgress, [0.0, 1.0], [0, 1]);

  const [maxBorderWidth, setMaxBorderWidth] = useState(35);
  const [activeWorkIndex, setActiveWorkIndex] = useState(0);

  useEffect(() => {
    const updateBorderWidth = () => {
      setMaxBorderWidth(window.innerWidth < 768 ? 10 : 35);
    };
    updateBorderWidth();
    window.addEventListener("resize", updateBorderWidth);
    return () => window.removeEventListener("resize", updateBorderWidth);
  }, []);

  const borderWidthStyle = useTransform(borderProgress, [0, 1], [0, maxBorderWidth]);

  // Log values for debugging scroll progress
  useEffect(() => {
    console.log("SelectedWork mounted. shouldReduceMotion:", shouldReduceMotion);
    return borderProgress.on("change", (latest) => {
      console.log("borderProgress changed:", latest, "scrollYProgress:", scrollYProgress.get());
    });
  }, [borderProgress, scrollYProgress, shouldReduceMotion]);

  const scrollToWorkIndex = (index: number) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const flexWrapper = container.firstElementChild as HTMLElement;
    if (!flexWrapper) return;
    const cards = Array.from(flexWrapper.children) as HTMLElement[];
    if (cards.length < 2) return;
    const cardWidthActual = cards[1].offsetLeft - cards[0].offsetLeft;
    if (cardWidthActual > 0) {
      const originalCount = caseStudyCards.length;
      setIsSnapping(false);
      const targetScroll = cardWidthActual * originalCount + index * cardWidthActual;
      container.scrollTo({
        left: targetScroll,
        behavior: "smooth",
      });
      if (settleTimerRef.current) clearTimeout(settleTimerRef.current);
      settleTimerRef.current = setTimeout(() => {
        setIsSnapping(true);
      }, 500);
    }
  };

  const [isSnapping, setIsSnapping] = useState(true);
  const isHovered = useRef(false);
  const isTouching = useRef(false);
  const settleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const testimonialsContainerRef = useRef<HTMLDivElement>(null);
  const [isTestimonialsSnapping, setIsTestimonialsSnapping] = useState(true);
  const isTestimonialsHovered = useRef(false);
  const isTestimonialsTouching = useRef(false);
  const testimonialsSettleTimerRef = useRef<NodeJS.Timeout | null>(null);

  const scrollSpeed = 20;

  // Viewport visibility states
  const [isVisible, setIsVisible] = useState(false);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);

  // Mouse drag states for Selected Work
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const isMouseDownRef = useRef(false);
  const wasDraggingRef = useRef(false);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const speedFactorRef = useRef(0);

  // Mouse drag states for Testimonials
  const testStartXRef = useRef(0);
  const testStartScrollLeftRef = useRef(0);
  const testIsMouseDownRef = useRef(false);
  const testWasDraggingRef = useRef(false);
  const [isTestimonialsMouseDown, setIsTestimonialsMouseDown] = useState(false);
  const testSpeedFactorRef = useRef(0);



  // Selected Work Visibility Observer
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Selected Work Auto-rotation effect
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    let animationId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isHovered.current && !isTouching.current && !isMouseDownRef.current && isVisible) {
        setIsSnapping((prev) => {
          if (prev) return false;
          return prev;
        });

        // Gently speed up when resuming auto movement
        speedFactorRef.current = Math.min(1, speedFactorRef.current + delta * 2);

        const flexWrapper = container.firstElementChild as HTMLElement;
        if (flexWrapper) {
          const cards = Array.from(flexWrapper.children) as HTMLElement[];
          const originalCount = caseStudyCards.length;
          if (cards.length >= originalCount * 2) {
            const child1 = cards[0];
            const child2 = cards[originalCount];
            if (child1 && child2) {
              const loopWidth = child2.offsetLeft - child1.offsetLeft;
              if (loopWidth > 0) {
                container.scrollLeft += scrollSpeed * delta * speedFactorRef.current;
              }
            }
          }
        }
      } else {
        speedFactorRef.current = 0;
        setIsSnapping((prev) => {
          const shouldSnap = !isMouseDownRef.current;
          if (prev !== shouldSnap) return shouldSnap;
          return prev;
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    const startTimeout = setTimeout(() => {
      lastTime = performance.now();
      animationId = requestAnimationFrame(animate);
    }, 1500);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  const handleMouseEnter = () => {
    isHovered.current = true;
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

  // Testimonials Visibility Observer
  useEffect(() => {
    const container = testimonialsContainerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsTestimonialsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      observer.disconnect();
    };
  }, []);

  // Testimonials Auto-rotation effect
  useEffect(() => {
    const container = testimonialsContainerRef.current;
    if (!container) return;

    let animationId: number;
    let lastTime = performance.now();

    const animate = (time: number) => {
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      if (!isTestimonialsHovered.current && !isTestimonialsTouching.current && !testIsMouseDownRef.current && isTestimonialsVisible) {
        setIsTestimonialsSnapping((prev) => {
          if (prev) return false;
          return prev;
        });

        // Gently speed up when resuming auto movement
        testSpeedFactorRef.current = Math.min(1, testSpeedFactorRef.current + delta * 2);

        const flexWrapper = container.firstElementChild as HTMLElement;
        if (flexWrapper) {
          const cards = Array.from(flexWrapper.children) as HTMLElement[];
          const originalCount = testimonials.length;
          if (cards.length >= originalCount * 2) {
            const child1 = cards[0];
            const child2 = cards[originalCount];
            if (child1 && child2) {
              const loopWidth = child2.offsetLeft - child1.offsetLeft;
              if (loopWidth > 0) {
                container.scrollLeft += scrollSpeed * delta * testSpeedFactorRef.current;
              }
            }
          }
        }
      } else {
        testSpeedFactorRef.current = 0;
        setIsTestimonialsSnapping((prev) => {
          const shouldSnap = !testIsMouseDownRef.current;
          if (prev !== shouldSnap) return shouldSnap;
          return prev;
        });
      }

      animationId = requestAnimationFrame(animate);
    };

    const startTimeout = setTimeout(() => {
      lastTime = performance.now();
      animationId = requestAnimationFrame(animate);
    }, 2000);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(animationId);
    };
  }, [isTestimonialsVisible]);

  const handleTestimonialsMouseEnter = () => {
    isTestimonialsHovered.current = true;
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

  // Selected Work Mouse Drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    const container = scrollContainerRef.current;
    if (!container) return;
    isMouseDownRef.current = true;
    setIsMouseDown(true);
    setIsSnapping(false);
    wasDraggingRef.current = false;
    startXRef.current = e.clientX;
    startScrollLeftRef.current = container.scrollLeft;
    speedFactorRef.current = 0;
    document.documentElement.setAttribute('data-carousel-dragging', 'true');
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isMouseDownRef.current) return;
    const container = scrollContainerRef.current;
    if (!container) return;
    const walk = e.clientX - startXRef.current;
    if (Math.abs(walk) > 5) {
      wasDraggingRef.current = true;
    }
    container.scrollLeft = startScrollLeftRef.current - walk;
  };

  const handleMouseUpOrLeave = () => {
    if (!isMouseDownRef.current) return;
    isMouseDownRef.current = false;
    setIsMouseDown(false);
    setIsSnapping(true);
    speedFactorRef.current = 0;
    document.documentElement.removeAttribute('data-carousel-dragging');
  };

  const handleSelectedWorkMouseLeave = () => {
    isHovered.current = false;
    handleMouseUpOrLeave();
  };

  const handleContainerClickCapture = (e: React.MouseEvent) => {
    if (wasDraggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
      wasDraggingRef.current = false;
    }
  };

  const handleSelectedWorkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const flexWrapper = container.firstElementChild as HTMLElement;
    if (!flexWrapper) return;
    const cards = Array.from(flexWrapper.children) as HTMLElement[];
    const originalCount = caseStudyCards.length;
    if (cards.length < originalCount * 2) return;

    const child1 = cards[0];
    const child2 = cards[originalCount];
    if (!child1 || !child2) return;

    const loopWidth = child2.offsetLeft - child1.offsetLeft;
    if (loopWidth <= 0) return;

    const scrollLeft = container.scrollLeft;

    if (scrollLeft < loopWidth || scrollLeft >= 2 * loopWidth) {
      const offset = ((scrollLeft - loopWidth) % loopWidth + loopWidth) % loopWidth;
      container.scrollLeft = loopWidth + offset;
    }

    const cardWidthActual = cards[1].offsetLeft - cards[0].offsetLeft;
    if (cardWidthActual > 0) {
      const relativeScroll = (container.scrollLeft - loopWidth) % loopWidth;
      const index = Math.round(relativeScroll / cardWidthActual) % originalCount;
      setActiveWorkIndex((index + originalCount) % originalCount);
    }
  };

  // Center scroll positions on mount to the middle copy
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const flexWrapper = container.firstElementChild as HTMLElement;
    if (!flexWrapper) return;

    const initScroll = () => {
      const cards = Array.from(flexWrapper.children) as HTMLElement[];
      const originalCount = caseStudyCards.length;
      if (cards.length >= originalCount * 2) {
        const child1 = cards[0];
        const child2 = cards[originalCount];
        if (child1 && child2) {
          const loopWidth = child2.offsetLeft - child1.offsetLeft;
          if (loopWidth > 0) {
            container.scrollLeft = loopWidth;
          }
        }
      }
    };

    initScroll();
    const t = setTimeout(initScroll, 150);
    return () => clearTimeout(t);
  }, []);

  // Testimonials Mouse Drag handlers
  const handleTestimonialsMouseDown = (e: React.MouseEvent) => {
    const container = testimonialsContainerRef.current;
    if (!container) return;
    testIsMouseDownRef.current = true;
    setIsTestimonialsMouseDown(true);
    setIsTestimonialsSnapping(false);
    testWasDraggingRef.current = false;
    testStartXRef.current = e.clientX;
    testStartScrollLeftRef.current = container.scrollLeft;
    testSpeedFactorRef.current = 0;
    document.documentElement.setAttribute('data-carousel-dragging', 'true');
  };

  const handleTestimonialsMouseMove = (e: React.MouseEvent) => {
    if (!testIsMouseDownRef.current) return;
    const container = testimonialsContainerRef.current;
    if (!container) return;
    const walk = e.clientX - testStartXRef.current;
    if (Math.abs(walk) > 5) {
      testWasDraggingRef.current = true;
    }
    container.scrollLeft = testStartScrollLeftRef.current - walk;
  };

  const handleTestimonialsMouseUpOrLeave = () => {
    if (!testIsMouseDownRef.current) return;
    testIsMouseDownRef.current = false;
    setIsTestimonialsMouseDown(false);
    setIsTestimonialsSnapping(true);
    testSpeedFactorRef.current = 0;
    document.documentElement.removeAttribute('data-carousel-dragging');
  };

  const handleTestimonialsMouseLeaveCombined = () => {
    isTestimonialsHovered.current = false;
    handleTestimonialsMouseUpOrLeave();
  };

  const handleTestimonialsClickCapture = (e: React.MouseEvent) => {
    if (testWasDraggingRef.current) {
      e.preventDefault();
      e.stopPropagation();
      testWasDraggingRef.current = false;
    }
  };

  const handleTestimonialsScroll = () => {
    const container = testimonialsContainerRef.current;
    if (!container) return;
    const flexWrapper = container.firstElementChild as HTMLElement;
    if (!flexWrapper) return;
    const cards = Array.from(flexWrapper.children) as HTMLElement[];
    const originalCount = testimonials.length;
    if (cards.length < originalCount * 2) return;

    const child1 = cards[0];
    const child2 = cards[originalCount];
    if (!child1 || !child2) return;

    const loopWidth = child2.offsetLeft - child1.offsetLeft;
    if (loopWidth <= 0) return;

    const scrollLeft = container.scrollLeft;

    if (scrollLeft < loopWidth || scrollLeft >= 2 * loopWidth) {
      const offset = ((scrollLeft - loopWidth) % loopWidth + loopWidth) % loopWidth;
      container.scrollLeft = loopWidth + offset;
    }
  };

  useEffect(() => {
    const container = testimonialsContainerRef.current;
    if (!container) return;
    const flexWrapper = container.firstElementChild as HTMLElement;
    if (!flexWrapper) return;

    const initScroll = () => {
      const cards = Array.from(flexWrapper.children) as HTMLElement[];
      const originalCount = testimonials.length;
      if (cards.length >= originalCount * 2) {
        const child1 = cards[0];
        const child2 = cards[originalCount];
        if (child1 && child2) {
          const loopWidth = child2.offsetLeft - child1.offsetLeft;
          if (loopWidth > 0) {
            container.scrollLeft = loopWidth;
          }
        }
      }
    };

    initScroll();
    const t = setTimeout(initScroll, 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <motion.section
      id="projects"
      ref={sectionRef}
      className="w-full bg-[#089998] border-[#FDABFF] border-solid rounded-[48px] md:rounded-[110px] pt-10 pb-[284px] md:pt-16 md:pb-[416px] relative overflow-hidden z-[1] mt-12 md:mt-24"
      style={{
        borderWidth: borderWidthStyle,
      }}
    >
      <div className="mx-auto w-[min(85vw,1260px)] px-4 md:px-12 mb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-[72px] w-full">
          <div className="flex flex-col gap-4 max-w-[620px]">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#B8F74B]/15 text-[#B8F74B] font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit">
              SELECTED WORK
            </span>
            <h2 className="font-serif text-[42px] md:text-[64px] leading-[1.05] text-[#B8F74B] font-normal tracking-tight">
              A few problems
              <br />
              I've made work
            </h2>
          </div>

          <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-[#B8F74B] font-normal max-w-[460px] md:mt-16">
            Each project presented a different challenge. Solving it required understanding what mattered, what didn't, and where to focus first.
          </p>
        </div>
      </div>

      <CarouselIndicator activeIndex={activeWorkIndex} onClick={scrollToWorkIndex} />

      <div
        ref={scrollContainerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleSelectedWorkMouseLeave}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
        onScroll={handleSelectedWorkScroll}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onClickCapture={handleContainerClickCapture}
        onDragStart={(e) => e.preventDefault()}
        className={`w-full overflow-x-auto overflow-y-visible scrollbar-none flex mt-12 md:mt-16 relative z-20 py-8 select-none ${isMouseDown ? "cursor-grabbing" : "cursor-grab"
          }`}
        style={{
          scrollSnapType: isSnapping ? "x mandatory" : "none",
        }}
      >
        <div
          className="flex flex-nowrap gap-6 md:gap-10 shrink-0 py-8"
          style={{
            paddingLeft: "calc((100% - min(85vw, 1260px)) / 2 + var(--selected-work-pad-left))",
            paddingRight: "calc((100% - min(85vw, 1260px)) / 2 + var(--selected-work-pad-left))",
          }}
        >
          {duplicatedCaseStudyCards.map((card, index) => (
            <div
              key={`${card.title}-${index}`}
              className="snap-start shrink-0 w-[82vw] md:w-[60vw] lg:w-[44vw] max-w-[680px] flex"
            >
              <CaseStudyCard
                title={card.title}
                description={card.description}
                videoSrc={card.videoSrc}
                imageSrc={card.imageSrc}
                href={card.href}
                featured={false}
              />
            </div>
          ))}
        </div>
      </div>

      <CarouselIndicator activeIndex={activeWorkIndex} onClick={scrollToWorkIndex} />

      <div id="testimonials" className="mt-20 md:mt-28">
        <div className="mx-auto w-[min(85vw,1260px)] px-4 md:px-12 mb-8 md:mb-12 text-left">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-[72px] w-full">
            <div className="flex flex-col gap-4 max-w-[620px]">
              <span className="inline-block px-4 py-1.5 rounded-full bg-[#B8F74B]/15 text-[#B8F74B] font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit">
                Testimonials
              </span>
              <h2 className="font-serif text-[36px] md:text-[64px] leading-[1.1] text-[#B8F74B] font-normal tracking-tight">
                They Said It,
                <br />
                Not Me
              </h2>
            </div>

            <p className="font-sans text-[15px] md:text-[16px] leading-[24px] text-[#B8F74B] font-normal max-w-[440px] md:mb-2">
              A few words from people I’ve worked with across web, design, product and systems projects.
            </p>
          </div>
        </div>

        <div
          ref={testimonialsContainerRef}
          onMouseEnter={handleTestimonialsMouseEnter}
          onMouseLeave={handleTestimonialsMouseLeaveCombined}
          onTouchStart={handleTestimonialsTouchStart}
          onTouchEnd={handleTestimonialsTouchEnd}
          onTouchCancel={handleTestimonialsTouchEnd}
          onScroll={handleTestimonialsScroll}
          onMouseDown={handleTestimonialsMouseDown}
          onMouseMove={handleTestimonialsMouseMove}
          onMouseUp={handleTestimonialsMouseUpOrLeave}
          onClickCapture={handleTestimonialsClickCapture}
          onDragStart={(e) => e.preventDefault()}
          className={`w-full overflow-x-auto scrollbar-none flex relative z-20 select-none ${isTestimonialsMouseDown ? "cursor-grabbing" : "cursor-grab"
            }`}
          style={{
            scrollSnapType: isTestimonialsSnapping ? "x mandatory" : "none",
          }}
        >
          <div
            className="flex flex-nowrap gap-5 md:gap-8 shrink-0 py-4"
            style={{
              paddingLeft: "var(--carousel-padding-left)",
              paddingRight: "var(--carousel-padding-right)",
            }}
          >
            {duplicatedTestimonials.map((t, index) => (
              <TestimonialCard
                key={`${t.name}-${index}`}
                quote={t.quote}
                name={t.name}
                role={t.role}
                avatarSrc={t.avatarSrc}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
