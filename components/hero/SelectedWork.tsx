"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform, useMotionValue, useReducedMotion } from "framer-motion";
import { usePasswordProtection } from "@/context/PasswordContext";

const featuredCaseStudies = [
  {
    categoryPill: "Web & UX/UI Design",
    title: "Sport Manawatū: UX/UI & WordPress Website Redesign",
    description:
      "A full website redesign for Sport Manawatū, focused on improving information architecture, usability and the overall digital experience. The project included UX research, user flows, wireframing, interface design and the final responsive WordPress implementation.",
    href: "https://www.behance.net/gallery/254163819/Sport-Manawatu-UXUI-WordPress-Website-Redesign",
    imageSrc: "/sport-manawatu.webp",
    tags: ["WordPress", "UX/UI", "Web Design", "Responsive Design", "Information Architecture"],
  },
  {
    categoryPill: "Product Development",
    title: "Proactive Content Creation from an SEO Strategy",
    description:
      "An AI-powered content engine that connects a GEO strategy with automated article generation, custom graphics, and approval workflows with built-in notifications.",
    href: "/continuous-content",
    imageSrc: "/cover-blogbooster.webp",
    tags: ["AI Automation", "SEO Strategy", "Product Design"],
    isProtected: true,
  },
  {
    categoryPill: "Automation & Digital Systems",
    title: "Designing and Building an Automated Media Publishing Platform",
    description:
      "Rebuilt a fragile legacy news platform into a scalable publishing ecosystem by redesigning its architecture and separating infrastructure responsibilities.",
    href: "/web-design-and-development",
    imageSrc: "/waatea-ipad-mp3.webp",
    tags: ["Automation & Digital Systems", "Automation", "WordPress"],
    isProtected: true,
  },
];

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

interface TestimonialCardProps {
  quote: string;
  name: string;
  role: string;
  avatarSrc: string;
}

function TestimonialCard({ quote, name, role, avatarSrc }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-[24px] p-6 md:p-8 flex flex-col justify-between min-h-[420px] md:min-h-[500px] w-[75vw] sm:w-[340px] md:w-[24vw] min-w-[320px] max-w-[420px] shadow-[0_10px_30px_rgba(27,35,122,0.04)] select-none shrink-0 snap-start">
      <p className="font-sans text-[14px] leading-[26px] text-background/90 font-normal text-left">
        “{quote}”
      </p>

      <div className="flex items-center gap-4 mt-8 pt-6 border-t border-background/8">
        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-foreground flex-shrink-0">
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
          <span className="font-sans text-[14px] font-semibold text-background">
            {name}
          </span>

          <span className="font-sans text-[12px] text-background/60 font-medium">
            {role}
          </span>
        </div>
      </div>
    </div>
  );
}

export default function SelectedWork() {
  const router = useRouter();
  const { isUnlocked, openPasswordModal } = usePasswordProtection();
  const sectionRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  const shouldReduceMotion = useReducedMotion();

  const borderProgress = shouldReduceMotion
    ? useMotionValue(1)
    : useTransform(scrollYProgress, [0.0, 1.0], [0, 1]);

  const [maxBorderWidth, setMaxBorderWidth] = useState(35);

  useEffect(() => {
    const updateBorderWidth = () => {
      setMaxBorderWidth(window.innerWidth < 768 ? 10 : 35);
    };
    updateBorderWidth();
    window.addEventListener("resize", updateBorderWidth);
    return () => window.removeEventListener("resize", updateBorderWidth);
  }, []);

  const borderWidthStyle = useTransform(borderProgress, [0, 1], [0, maxBorderWidth]);

  // Testimonials state and handlers
  const testimonialsContainerRef = useRef<HTMLDivElement>(null);
  const [isTestimonialsSnapping, setIsTestimonialsSnapping] = useState(true);
  const isTestimonialsHovered = useRef(false);
  const isTestimonialsTouching = useRef(false);
  const testimonialsSettleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isTestimonialsVisible, setIsTestimonialsVisible] = useState(false);
  const testStartXRef = useRef(0);
  const testStartScrollLeftRef = useRef(0);
  const testIsMouseDownRef = useRef(false);
  const testWasDraggingRef = useRef(false);
  const [isTestimonialsMouseDown, setIsTestimonialsMouseDown] = useState(false);
  const testSpeedFactorRef = useRef(0);
  const scrollSpeed = 20;

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
    document.documentElement.setAttribute("data-carousel-dragging", "true");
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
    document.documentElement.removeAttribute("data-carousel-dragging");
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
      className="w-full bg-secondary-bg border-primary border-solid rounded-[48px] md:rounded-[110px] pt-10 pb-[240px] md:pt-16 md:pb-[360px] relative overflow-hidden z-[1] mt-12 md:mt-24"
      style={{
        borderWidth: borderWidthStyle,
      }}
    >
      {/* Section Header */}
      <div className="mx-auto w-[min(85vw,1260px)] px-4 md:px-12 mb-4">
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-[72px] w-full">
          <div className="flex flex-col gap-4 max-w-[620px]">
            <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit">
              SELECTED WORK
            </span>
            <h2 className="font-serif text-[42px] md:text-[64px] leading-[1.05] text-secondary font-normal tracking-tight">
              A few problems
              <br />
              I've made work
            </h2>
          </div>

          <p className="font-sans text-[16px] pb-4 md:text-[18px] leading-[26px] text-secondary font-normal max-w-[460px] md:mt-16">
            Each project presents a different challenge. Solving it requires understanding what matters, what doesn't, and how to set the priorities.
          </p>
        </div>
      </div>

      {/* Featured 3 Fixed Case Studies stacked vertically */}
      <div className="mx-auto w-[min(85vw,1260px)] px-4 md:px-12 mt-10 md:mt-16 flex flex-col gap-8 md:gap-12 relative z-20 pointer-events-auto">
        {featuredCaseStudies.map((study) => {
          const isLocked = study.isProtected && !isUnlocked;

          const handleClick = (e: React.MouseEvent) => {
            if (isLocked) {
              e.preventDefault();
              openPasswordModal(() => {
                router.push(study.href);
              });
            }
          };

          return (
            <Link
              key={study.href}
              href={study.href}
              onClick={handleClick}
              className="group w-full bg-white rounded-[32px] md:rounded-[44px] p-6 md:p-8 lg:p-10 flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-12 items-center shadow-[0_15px_45px_rgba(27,35,122,0.08)] hover:shadow-[0_25px_60px_rgba(27,35,122,0.16)] transition-all duration-300 select-none cursor-pointer relative"
            >
              {/* Left Column: Image */}
              <div className="relative w-full md:w-1/2 h-[260px] sm:h-[320px] md:h-[360px] lg:h-[400px] rounded-[24px] md:rounded-[32px] overflow-hidden shrink-0">
                <Image
                  src={study.imageSrc}
                  alt={study.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className={`object-cover object-center transition-all duration-500 ${
                    isLocked ? "blur-md scale-105" : "group-hover:scale-[1.03]"
                  }`}
                />

                {/* Corner Lock Badge */}
                {isLocked && (
                  <div className="absolute top-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white font-sans font-medium text-[11px] uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-3.5 h-3.5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                      />
                    </svg>
                    <span>Protected</span>
                  </div>
                )}
              </div>

              {/* Right Column: Information */}
              <div className="w-full md:w-1/2 flex flex-col justify-between text-left h-full py-1 md:py-2 gap-4">
                {/* Category Pill above title */}
                <div>
                  <span className="inline-block px-4 py-1.5 rounded-full bg-background/8 border border-background/15 text-background font-sans font-semibold text-[11px] md:text-[12px] uppercase tracking-[1.5px]">
                    {study.categoryPill}
                  </span>

                  {/* Title */}
                  <h3 className="font-serif text-[26px] sm:text-[32px] md:text-[38px] leading-[1.12] text-background font-normal tracking-tight mt-4 group-hover:text-background/80 transition-colors">
                    {study.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-[14px] sm:text-[15px] md:text-[16px] leading-[24px] md:leading-[26px] text-background/75 font-normal mt-3">
                    {study.description}
                  </p>
                </div>

                {/* Tags & Action Button */}
                <div className="pt-4 mt-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4 w-full border-t border-background/10">
                  <div className="flex flex-wrap gap-2 items-center">
                    {study.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full border border-background/20 text-background/80 text-[10px] md:text-[11px] font-sans font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="h-[46px] px-6 rounded-full bg-primary text-background font-sans font-semibold text-[10px] md:text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 group-hover:opacity-90 transition-opacity duration-200 shrink-0 w-fit">
                    {isLocked && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                        />
                      </svg>
                    )}
                    <span>{isLocked ? "Unlock Case Study" : "View Case Study"}</span>
                    {!isLocked && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2.5"
                        stroke="currentColor"
                        className="w-3.5 h-3.5"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}

        {/* View All Case Studies Button */}
        <div className="flex justify-center mt-4 md:mt-6 pointer-events-auto">
          <Link
            href="/projects"
            className="px-8 py-4 rounded-full bg-secondary text-background font-sans font-semibold text-[11px] md:text-[12px] uppercase tracking-[2px] hover:bg-secondary/90 transition-all duration-200 shadow-md inline-flex items-center gap-2 group cursor-pointer"
          >
            <span>Ver todos los case study</span>
            <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* Testimonials */}
      <div id="testimonials" className="mt-20 md:mt-28">
        <div className="mx-auto w-[min(85vw,1260px)] px-4 md:px-12 mb-8 md:mb-12 text-left">
          <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-6 md:gap-[72px] w-full">
            <div className="flex flex-col gap-4 max-w-[620px]">
              <span className="inline-block px-4 py-1.5 rounded-full bg-secondary/15 text-secondary font-sans font-medium text-[12px] tracking-[2px] uppercase w-fit">
                Testimonials
              </span>
              <h2 className="font-serif text-[36px] md:text-[64px] leading-[1.1] text-secondary font-normal tracking-tight">
                They Said It,
                <br />
                Not Me
              </h2>
            </div>

            <p className="font-sans text-[16px] pb-4 md:text-[18px] leading-[26px] text-secondary font-normal max-w-[460px] md:mt-16">
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
