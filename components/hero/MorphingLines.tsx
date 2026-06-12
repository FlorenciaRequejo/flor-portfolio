"use client";

import { useEffect, useRef, useState } from "react";

interface Point {
  x: number;
  y: number;
}

interface PathData {
  fromPoints: Point[];
  toPoints: Point[];
  fromStrokeWidth: number;
  toStrokeWidth: number;
  element: SVGPathElement;
}

// The three initial paths extracted from 'New - SVG Initial.svg'
const INITIAL_PATHS = [
  {
    name: "Path_One",
    d: "M1916.94,735.91c-84.03,1.13-91.6-198.01-257.16-132.62-71.69,28.31-141.07,60.43-211.43,91.78-70.36,31.35-150.2,51.41-220.51,22.54-26.66-10.95-51.12-28.65-79.11-34.74-96.5-21-191.02,100.65-284.11,66.32-41.73-15.39-68.74-58.34-92.38-99-23.64-40.66-49.48-84.09-90.49-101.58-41.01-17.49-99.78,8.21-101.64,56.82-1.45,37.99,33.64,67.94,68.2,68.69,34.56.75,64.71-23.36,93.46-45.01,95.36-71.83,54.7-245.53-47.09-274.73C515.2,302.88,59.17,662.74-4.24,663.59"
  },
  {
    name: "Path_Two",
    d: "M-.05,290.93c201-.98,404.76-10.61,592.22-93.11,32.67-14.38,71.17-46.41,59.05-82.72-9.24-27.66-45.47-32.85-67.51-15.76s-31.89,48.05-35.93,77.51c-6.94,50.58,2.72,109.24,40.82,136.46,39.05,27.9,92.38,12.03,132.22-16.23,39.84-28.26,73.28-67.75,115.45-91.28,60.68-33.85,138.46-28.36,189.73,19.23s69.5,136.94,36.91,203.5c-21.5,43.91-79.81,73.52-109.3,37.07-7.85-9.7-12.11-22.54-14-35.54-8.71-60.1,39.8-123.77,94.38-122.71,63.2,1.23,104.13,70.64,135.98,131.04,46.38,87.95,98.23,174.91,171.04,236.37,63.49,53.6,140.43,85.31,219.22,101.01,54.29,10.82,110.19,8.2,162.95-13.65,148.78-61.61,53.15-356.98,196.83-356.98"
  },
  {
    name: "Path_Three",
    d: "M-.05,301.45c98.31,0,253.19,59.44,353.48,120.89,56.22,34.45,112.48,73.1,144.9,142.33,61.78,131.9-74.42,242.07-186.32,200.43-228.74-85.11,111.9-415.52,384.41-307.05,77.1,30.69,148.97,79.01,226.28,109.51,93.9,37.05,194.14,45,293.26,52.71,45.8,3.56,92.79,6.96,137.32-10.04,90.16-34.42,150.59-159.1,141.03-274.78-18.76-226.95-271.48-215.04-240.25-37.86,9.89,56.13,47.82,89.02,91.6,103.2,93.87,30.4,201.3,53.5,284.94-14.83,55.47-45.31,88.58-121.96,128.94-187.94,40.36-65.98,95.91-120.19,160.44-120.19"
  }
];

export default function MorphingLines() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // SVG Translation Parameters for vertical positioning
  const initialTranslateY = 0; // %
  const finalTranslateY = -12; // %

  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const originalSvgRef = useRef<SVGSVGElement>(null);
  const outputSvgRef = useRef<SVGSVGElement>(null);
  const navRef = useRef<HTMLElement>(null);

  // Elements to animate along scroll
  const copyRef = useRef<HTMLDivElement>(null);
  const chaosSvgRef = useRef<SVGSVGElement>(null);
  const orderedSvgRef = useRef<SVGSVGElement>(null);



  // Section & scroll container refs
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);
  const industriesRef = useRef<HTMLDivElement>(null);

  // Animation refs
  const initCountRef = useRef(0);
  const pathDataRef = useRef<PathData[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const scrollProgressRef = useRef({ current: 0, target: 0 });
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // Determine sample points count based on screen size (Mobile optimization)
    const pointsCount = window.innerWidth < 768 ? 100 : 180;

    let animationFrameId: number;
    const isLoopRunningRef = { current: false };

    const smoothRender = () => {
      const progress = scrollProgressRef.current;

      // Interpolate progress towards target with damping factor (0.075)
      const diff = progress.target - progress.current;
      let shouldContinue = false;
      if (Math.abs(diff) > 0.0001) {
        progress.current += diff * 0.075;
        shouldContinue = true;
      } else {
        progress.current = progress.target;
      }

      // Only animate if the precomputed geometries are fully loaded
      if (isLoadedRef.current) {
        updateProgress(progress.current);
      }

      if (shouldContinue) {
        animationFrameId = requestAnimationFrame(smoothRender);
      } else {
        isLoopRunningRef.current = false;
        console.log("[rAF-loop] Sleeping (progress stabilized)");
      }
    };

    const startLoop = () => {
      if (isLoopRunningRef.current) return;
      isLoopRunningRef.current = true;
      console.log("[rAF-loop] Starting/Resuming smoothRender loop");
      animationFrameId = requestAnimationFrame(smoothRender);
    };

    const init = () => {
      const chaosSvg = chaosSvgRef.current;
      const orderedSvg = orderedSvgRef.current;
      const outputSvg = outputSvgRef.current;
      const container = containerRef.current;

      if (!chaosSvg || !orderedSvg || !outputSvg || !container) return;

      initCountRef.current++;
      console.log(`[svg-sampling] Running init execution #${initCountRef.current}`);
      console.time("svg-sampling");

      const chaosPaths = Array.from(chaosSvg.querySelectorAll("path"));
      const orderedLines = Array.from(orderedSvg.querySelectorAll("line"));

      // Helper to sample points along an SVG geometry element
      const sampleGeometry = (
        el: SVGGeometryElement,
        count: number
      ): Point[] => {
        const length = el.getTotalLength();
        const points: Point[] = [];
        for (let i = 0; i < count; i++) {
          const distance = length * (i / (count - 1));
          const p = el.getPointAtLength(distance);
          points.push({ x: p.x, y: p.y });
        }
        return points;
      };

      // Helper to normalize path and parent IDs to match names
      const getNormalizedName = (el: SVGElement): string => {
        const id = el.id || "";
        const parentId = el.parentElement?.id || "";
        const combined = (id + "_" + parentId).toLowerCase();

        if (combined.includes("one")) return "Path_One";
        if (combined.includes("two")) return "Path_Two";
        if (combined.includes("three")) return "Path_Three";
        return id;
      };

      const pairedPaths: PathData[] = [];
      const targetNames = ["Path_One", "Path_Two", "Path_Three"];

      for (let i = 0; i < targetNames.length; i++) {
        const name = targetNames[i];
        const chaosEl = chaosPaths.find(p => getNormalizedName(p) === name);
        const orderedEl = orderedLines.find(l => getNormalizedName(l) === name);

        if (!chaosEl || !orderedEl) {
          console.error(`Could not find path pair for ${name}`);
          continue;
        }

        const fromPoints = sampleGeometry(chaosEl as SVGGeometryElement, pointsCount);
        const toPoints = sampleGeometry(orderedEl as SVGGeometryElement, pointsCount);

        // Reverse target coordinates for Path_One to match starting directions
        if (name === "Path_One") {
          toPoints.reverse();
        }

        // Bind to the statically rendered React output path element
        const outputPath = pathRefs.current[i];
        if (!outputPath) continue;

        pairedPaths.push({
          fromPoints,
          toPoints,
          fromStrokeWidth: 1.0,
          toStrokeWidth: 1.0,
          element: outputPath,
        });
      }

      pathDataRef.current = pairedPaths;
      console.timeEnd("svg-sampling");
      console.log(`[svg-sampling] Chaos paths count: ${chaosPaths.length}`);
      console.log(`[svg-sampling] Ordered lines count: ${orderedLines.length}`);
      console.log(`[svg-sampling] Sample points count: ${pointsCount}`);

      isLoadedRef.current = true;

      // Update progress immediately to align shapes
      updateProgress(scrollProgressRef.current.current);

      // Trigger smooth transition to target if there is scroll discrepancy
      startLoop();
    };

    // Defer the initialization so it does not block the initial paint
    const samplingTimeoutId = setTimeout(() => {
      init();
    }, 50);

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const scrollHeight = rect.height - window.innerHeight;

      // Calculate progress relative to the container scroll depth
      let p = 0;
      if (scrollHeight > 0) {
        p = -rect.top / scrollHeight;
      }
      scrollProgressRef.current.target = Math.max(0, Math.min(1, p));

      startLoop();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    let resizeTimeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        init();
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(samplingTimeoutId);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimeout);
    };
  }, []);

  // Interpolation and DOM updates
  const updateProgress = (p: number) => {
    const container = containerRef.current;
    const viewport = viewportRef.current;
    const svgWrapper = svgWrapperRef.current;
    const originalSvg = originalSvgRef.current;
    const outputSvg = outputSvgRef.current;
    const nav = navRef.current;
    if (!container || !viewport || !svgWrapper || !outputSvg) return;

    const vh = window.innerHeight;

    // Morph starts immediately at 0.0 and completes by 0.65
    const morphStart = 0.0;
    const morphEnd = 0.65;
    const morphRaw = Math.max(0, Math.min(1, (p - morphStart) / (morphEnd - morphStart)));

    // easeInOutCubic for line coordinates interpolation
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    const t = easeInOutCubic(morphRaw);

    const smoothstep = (edge0: number, edge1: number, x: number) => {
      const val = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return val * val * (3 - 2 * val);
    };

    // Shifts the SVG wrapper upward based on scroll progress parameters
    const svgTranslateY = initialTranslateY + (finalTranslateY - initialTranslateY) * t;
    svgWrapper.style.transform = `translate3d(0, ${svgTranslateY}%, 0)`;

    // OPACITY CROSS-FADE BETWEEN ORIGINAL AND SAMPLED MORPH
    const fadeStart = 0.0;
    const fadeEnd = 0.05;

    let originalOpacity = 1;
    let morphOpacity = 0;

    if (p > fadeStart) {
      const fadeRaw = Math.min(1, (p - fadeStart) / (fadeEnd - fadeStart));
      originalOpacity = 1 - fadeRaw;
      morphOpacity = fadeRaw;
    }

    if (originalSvg) {
      originalSvg.style.opacity = originalOpacity.toString();
      originalSvg.style.visibility = originalOpacity === 0 ? "hidden" : "visible";
    }

    outputSvg.style.opacity = morphOpacity.toString();
    outputSvg.style.visibility = morphOpacity === 0 ? "hidden" : "visible";

    // Update path shapes directly in the DOM
    const paths = pathDataRef.current;

    if (paths.length > 0) {
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const fromPoints = path.fromPoints;
        const toPoints = path.toPoints;

        let d = "";
        if (fromPoints.length > 0) {
          const x0 = fromPoints[0].x + (toPoints[0].x - fromPoints[0].x) * t;
          const y0 = fromPoints[0].y + (toPoints[0].y - fromPoints[0].y) * t;
          d = `M ${x0.toFixed(2)} ${y0.toFixed(2)}`;

          for (let j = 1; j < fromPoints.length; j++) {
            const x = fromPoints[j].x + (toPoints[j].x - fromPoints[j].x) * t;
            const y = fromPoints[j].y + (toPoints[j].y - fromPoints[j].y) * t;
            d += ` L ${x.toFixed(2)} ${y.toFixed(2)}`;
          }
        }

        path.element.setAttribute("d", d);
      }
    }

    // Update copy block opacity and transform
    const copy = copyRef.current;
    if (copy) {
      // Fade out as scroll progress increases
      const copyOpacity = Math.max(0, 1 - p * 3);
      copy.style.opacity = copyOpacity.toString();

      const translateY = p * -100;
      copy.style.transform = `translate3d(0, ${translateY}px, 0)`;

      if (copyOpacity > 0.01) {
        copy.style.pointerEvents = "auto";
      } else {
        copy.style.pointerEvents = "none";
      }
    }



    // Section 2: About Content Opacity & Transform (Fades in from p = 0.15 to 0.45)
    const about = aboutRef.current;
    if (about) {
      const aboutOpacity = Math.max(0, Math.min(1, (p - 0.15) / 0.3));
      about.style.opacity = aboutOpacity.toString();
      const translateY = (1 - aboutOpacity) * 40;
      about.style.transform = `translate3d(0, ${translateY}px, 0)`;
      if (aboutOpacity > 0.01) {
        about.style.pointerEvents = "auto";
      } else {
        about.style.pointerEvents = "none";
      }
    }

    // Section 3: Industries Opacity (Fades in from p = 0.35 to 0.65)
    const industries = industriesRef.current;
    if (industries) {
      const indOpacity = Math.max(0, Math.min(1, (p - 0.35) / 0.3));
      industries.style.opacity = indOpacity.toString();
      if (indOpacity > 0.01) {
        industries.style.pointerEvents = "auto";
      } else {
        industries.style.pointerEvents = "none";
      }
    }

    // Translate scroll wrapper for continuous page scrolling when p > 0.5
    const scrollContent = scrollContentRef.current;
    if (scrollContent) {
      let scrollY = 0;
      if (p > 0.5) {
        scrollY = (p - 0.5) * 2 * -vh;
      }
      scrollContent.style.transform = `translate3d(0, ${scrollY}px, 0)`;
    }

    // Update navbar scroll state
    if (nav) {
      if (p > 0.05) {
        nav.classList.add("is-scrolled");
      } else {
        nav.classList.remove("is-scrolled");
      }
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "300vh" }}
    >
      {/* Sticky Frame viewport */}
      <div
        ref={viewportRef}
        className="hero-viewport sticky top-0 left-0 w-full h-screen overflow-hidden transition-colors duration-0"
        style={{
          willChange: "background",
        }}
      >
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Mobile-only vertical shift container */}
          <div className="-translate-y-[8%] md:translate-y-0 w-full h-full absolute inset-0 overflow-visible">
            {/* SVG Wrapper - Translates vertically based on scroll progress */}
            <div
              ref={svgWrapperRef}
              className="absolute inset-0 w-full h-full overflow-visible will-change-[transform]"
              style={{ transform: "translate3d(0, 0%, 0)" }}
            >
              {/* 1. ORIGINAL NATIVE BEZIER CHAOS SVG (Active initially, fades out when user scrolls past 0.03) */}
              <svg
                ref={originalSvgRef}
                viewBox="0 0 1920 881.35"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 w-full h-full overflow-visible transition-opacity duration-0"
                style={{ opacity: 1, willChange: "opacity" }}
              >
                {INITIAL_PATHS.map((item) => (
                  <path
                    key={item.name}
                    d={item.d}
                    fill="none"
                    className={`svg-line-${item.name === "Path_One" ? "one" : item.name === "Path_Two" ? "two" : "three"}`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>

              {/* 2. SAMPLED MORPHING SVG (Hidden initially, active & fades in when user scrolls past 0.03) */}
              <svg
                ref={outputSvgRef}
                viewBox="0 0 1920 881.35"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 w-full h-full overflow-visible transition-opacity duration-0 pointer-events-none"
                style={{ opacity: 0, willChange: "opacity" }}
              >
                {INITIAL_PATHS.map((item, i) => (
                  <path
                    key={item.name}
                    ref={(el) => {
                      pathRefs.current[i] = el;
                    }}
                    d={item.d}
                    fill="none"
                    className={`svg-line-${item.name === "Path_One" ? "one" : item.name === "Path_Two" ? "two" : "three"}`}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    vectorEffect="non-scaling-stroke"
                  />
                ))}
              </svg>
            </div>
          </div>
        </div>

        {/* Hero Content Wrapper - Aligned to navigation width, sitting visually on the left */}
        <div
          ref={copyRef}
          className="hero-content-container"
          style={{
            willChange: "opacity, transform",
            opacity: 1
          }}
        >
          {/* Headline */}
          <h1 className="font-serif text-[42px] md:text-[72px] leading-[1.1] md:leading-[72px] text-primary font-normal text-left max-w-[800px] tracking-tight">
            Ideas are easy.
            <br />
            Making them work
            <br />
            is my job.
          </h1>

          {/* Sub-row */}
          <div className="flex flex-col md:flex-row md:justify-between items-start md:items-stretch gap-8">
            {/* Left Column: Supporting Copy & Scroll Indicator */}
            <div className="flex flex-col justify-between items-start gap-8 md:gap-0">
              {/* Supporting Copy */}
              <p className="font-sans text-[18px] leading-[24px] text-primary font-normal text-left max-w-[480px]">
                I turn ideas into products, systems and experiences.
                <br />
                By making the right decisions across design, tech and product.
              </p>

              {/* Scroll Indicator - Desktop only */}
              <div className="hidden md:flex items-end gap-4">
                {/* Line & Dot */}
                <div className="flex flex-col items-center">
                  <div className="w-[1.5px] h-[32px] bg-primary/40" />
                  <div className="w-[6px] h-[6px] rounded-full bg-primary -mt-[2px]" />
                </div>
                {/* Text */}
                <span className="font-sans text-[14px] leading-none tracking-[2.5px] uppercase text-primary pb-[1px]">
                  SCROLL TO UNTANGLE
                </span>
              </div>
            </div>

            {/* Right Column: Stacked Buttons */}
            <div className="flex flex-col gap-4 pointer-events-auto">
              {[
                "End-to-end product thinking",
                "UX and customer experience",
                "Web design and development"
              ].map((text, i) => (
                <a
                  key={i}
                  href="#projects"
                  className="w-[340px] h-[50px] px-6 rounded-full border border-primary/35 bg-[#421B1B]/70 flex items-center justify-between text-primary font-sans font-medium text-[15px] leading-none hover:bg-[#421B1B]/90 transition-colors duration-200"
                >
                  <span className="text-primary font-sans font-medium text-[15px] leading-none">
                    {text}
                  </span>
                  <span className="text-primary text-[15px]">→</span>
                </a>
              ))}
            </div>

            {/* Scroll Indicator - Mobile only (sits at bottom of Hero on mobile) */}
            <div className="flex md:hidden items-end gap-4 mt-4">
              {/* Line & Dot */}
              <div className="flex flex-col items-center">
                <div className="w-[1.5px] h-[32px] bg-primary/40" />
                <div className="w-[6px] h-[6px] rounded-full bg-primary -mt-[2px]" />
              </div>
              {/* Text */}
              <span className="font-sans text-[14px] leading-none tracking-[2.5px] uppercase text-primary pb-[1px]">
                SCROLL TO UNTANGLE
              </span>
            </div>
          </div>
        </div>

        {/* 2. Scroll content wrapper (contains scrolling Section 2 and Section 3) */}
        <div
          ref={scrollContentRef}
          className="absolute inset-0 w-full h-full will-change-transform flex flex-col"
          style={{ transform: "translate3d(0, 0, 0)" }}
        >
          {/* Section 2: About Content Wrapper */}
          <div
            ref={aboutRef}
            className="w-full flex-shrink-0 pointer-events-none opacity-0 select-none z-20 flex flex-col md:flex-row items-stretch gap-8 md:gap-16 relative"
            style={{
              paddingTop: "calc(38vh + 120px)",
              paddingLeft: "var(--section2-pad-left)",
              paddingRight: "var(--section2-pad-right)",
              willChange: "opacity, transform",
            }}
          >
            {/* Left Side: Text Content */}
            <div className="flex flex-col justify-between items-start text-left gap-6 max-w-[580px] pointer-events-auto">
              <div className="flex flex-col gap-6">
                <span className="font-sans text-[14px] uppercase tracking-[3px] text-primary/75">
                  Taking complexity and making it work.
                </span>
                <h2 className="font-serif text-[40px] md:text-[64px] leading-[1.05] text-primary font-normal tracking-tight">
                  15+ years of
                  <br />
                  solving problems.
                </h2>
                <p className="font-sans text-[16px] md:text-[18px] leading-[26px] text-primary/80 font-light">
                  From branding and marketing to websites, products and AI, the tools have changed. The goal hasn't.
                </p>
              </div>
            </div>

            {/* Right Side: Image and Overlapping Button */}
            <div className="section2-image-panel pointer-events-auto">
              <div className="relative h-full w-full overflow-visible">
                <div className="h-full w-full overflow-hidden rounded-l-[32px]">
                  <img
                    src="/flor.png"
                    alt="Flor Artwork"
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <a
                  href="#about"
                  className="absolute left-0 -translate-x-1/2 bottom-8 h-[54px] px-8 rounded-full bg-primary text-bg font-sans font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity duration-200 shadow-lg z-10 whitespace-nowrap"
                >
                  <span>Read More About Me</span>
                  <span className="text-[16px] font-bold">↗</span>
                </a>
              </div>
            </div>
          </div>

          {/* Spacer of at least 100px */}
          <div className="h-[100px] md:h-[120px] w-full flex-shrink-0" />

          {/* Section 3: Industries Section */}
          <div
            ref={industriesRef}
            className="w-full flex-shrink-0 pointer-events-none opacity-0 select-none z-20 flex flex-col items-center justify-center gap-10 pb-[10vh]"
            style={{
              willChange: "opacity",
            }}
          >
            <h3 className="font-sans text-[16px] md:text-[18px] leading-[26px] text-primary/80 font-light text-center tracking-wide pointer-events-auto">
              Trusted by teams across many industries
            </h3>

            {/* Marquee Row 1 */}
            <div className="marquee-container w-full overflow-hidden py-2 pointer-events-auto">
              <div className="marquee-row-ltr">
                {[
                  "Healthcare", "Government", "Media & Broadcasting", "Finance",
                  "Beauty & Personal Care", "Retail & Consumer Goods", "Non-Profit"
                ].concat([
                  "Healthcare", "Government", "Media & Broadcasting", "Finance",
                  "Beauty & Personal Care", "Retail & Consumer Goods", "Non-Profit"
                ]).map((item, index) => (
                  <div
                    key={`row1-${index}`}
                    className="h-[120px] px-12 rounded-[24px] bg-[#321414] border border-primary/15 flex items-center justify-center text-primary uppercase font-sans tracking-[2px] text-[13px] font-semibold hover:border-primary/40 transition-colors duration-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Marquee Row 2 */}
            <div className="marquee-container w-full overflow-hidden py-2 pointer-events-auto">
              <div className="marquee-row-rtl">
                {[
                  "Construction", "Manufacturing", "Insurance",
                  "Property & Real Estate", "Technology & SaaS", "Education"
                ].concat([
                  "Construction", "Manufacturing", "Insurance",
                  "Property & Real Estate", "Technology & SaaS", "Education"
                ]).map((item, index) => (
                  <div
                    key={`row2-${index}`}
                    className="h-[120px] px-12 rounded-[24px] bg-[#321414] border border-primary/15 flex items-center justify-center text-primary uppercase font-sans tracking-[2px] text-[13px] font-semibold hover:border-primary/40 transition-colors duration-300"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Navbar - Fixed floating outline pill */}
        <nav
          ref={navRef}
          className={`nav-outline-pill ${isMenuOpen ? "is-open" : ""}`}
        >
          {/* Top Row: Container that sits at the top of the nav pill */}
          <div className="flex justify-between items-center w-full">
            {/* Profile Section */}
            <div className="flex items-center gap-[10px]">
              <img
                src="/Florencia-500x500.jpg"
                alt="Flor Requejo"
                className="w-[50px] h-[50px] rounded-full object-cover border border-primary/20"
              />
              <a href="#" className="text-primary font-serif text-[15px] tracking-wide leading-[1.05] font-normal hover:opacity-80 transition-opacity duration-200">
                Flor
                <br />
                Requejo
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex gap-6 md:gap-12 font-sans items-center">
              {["About", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-primary font-sans text-[10px] md:text-xs tracking-[0.15em] uppercase hover:opacity-60 transition-opacity duration-200 font-medium"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Desktop CV Download Button */}
            <div className="hidden md:block">
              <a
                href="#online-cv"
                className="h-[50px] px-6 rounded-full flex items-center justify-center bg-primary text-bg font-sans font-semibold text-[10px] md:text-xs uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
              >
                Online CV
              </a>
            </div>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden w-[50px] h-[50px] rounded-full flex flex-col items-center justify-center gap-[5px] border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-200 focus:outline-none"
              aria-label="Toggle Menu"
            >
              <span className={`w-6 h-[2px] bg-primary transition-all duration-300 ${isMenuOpen ? "transform rotate-45 translate-y-[8px]" : ""}`} />
              <span className={`w-6 h-[2px] bg-primary transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`} />
              <span className={`w-6 h-[2px] bg-primary transition-all duration-300 ${isMenuOpen ? "transform -rotate-45 -translate-y-[8px]" : ""}`} />
            </button>
          </div>

          {/* Mobile Navigation Dropdown Block */}
          <div
            className={`md:hidden flex flex-col items-center gap-6 mt-6 w-full border-t border-primary/10 pt-6 transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
              }`}
          >
            <div className="flex flex-col items-center gap-4 w-full">
              {["About", "Projects", "Contact"].map((item) => (
                <a
                  key={item}
                  onClick={() => setIsMenuOpen(false)}
                  href={`#${item.toLowerCase().replace(" ", "-")}`}
                  className="text-primary font-sans text-xs tracking-[0.2em] uppercase hover:opacity-60 transition-opacity duration-200 font-medium"
                >
                  {item}
                </a>
              ))}
            </div>

            <a
              href="#online-cv"
              onClick={() => setIsMenuOpen(false)}
              className="w-full max-w-[200px] h-[44px] rounded-full flex items-center justify-center bg-primary text-bg font-sans font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
            >
              Online CV
            </a>
          </div>
        </nav>
      </div>

      {/* ────────────────────────────────────────────────────────
          HIDDEN SOURCE SVGS (Used solely for geometry sampling)
         ──────────────────────────────────────────────────────── */}
      <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
        {/* Chaos Path Source */}
        <svg ref={chaosSvgRef} viewBox="0 0 1920 881.35">
          <g id="Path_3">
            <path id="_x3C_Path_x5F_Three_x3E_" d="M-.05,301.45c98.31,0,253.19,59.44,353.48,120.89,56.22,34.45,112.48,73.1,144.9,142.33,61.78,131.9-74.42,242.07-186.32,200.43-228.74-85.11,111.9-415.52,384.41-307.05,77.1,30.69,148.97,79.01,226.28,109.51,93.9,37.05,194.14,45,293.26,52.71,45.8,3.56,92.79,6.96,137.32-10.04,90.16-34.42,150.59-159.1,141.03-274.78-18.76-226.95-271.48-215.04-240.25-37.86,9.89,56.13,47.82,89.02,91.6,103.2,93.87,30.4,201.3,53.5,284.94-14.83,55.47-45.31,88.58-121.96,128.94-187.94,40.36-65.98,95.91-120.19,160.44-120.19" />
          </g>
          <g id="Path_2">
            <path id="_x3C_Path_x5F_two_x3E_" d="M-.05,290.93c201-.98,404.76-10.61,592.22-93.11,32.67-14.38,71.17-46.41,59.05-82.72-9.24-27.66-45.47-32.85-67.51-15.76s-31.89,48.05-35.93,77.51c-6.94,50.58,2.72,109.24,40.82,136.46,39.05,27.9,92.38,12.03,132.22-16.23,39.84-28.26,73.28-67.75,115.45-91.28,60.68-33.85,138.46-28.36,189.73,19.23s69.5,136.94,36.91,203.5c-21.5,43.91-79.81,73.52-109.3,37.07-7.85-9.7-12.11-22.54-14-35.54-8.71-60.1,39.8-123.77,94.38-122.71,63.2,1.23,104.13,70.64,135.98,131.04,46.38,87.95,98.23,174.91,171.04,236.37,63.49,53.6,140.43,85.31,219.22,101.01,54.29,10.82,110.19,8.2,162.95-13.65,148.78-61.61,53.15-356.98,196.83-356.98" />
          </g>
          <g id="Path_1">
            <path id="_x3C_Path_x5F_One_x3E_" d="M1916.94,735.91c-84.03,1.13-91.6-198.01-257.16-132.62-71.69,28.31-141.07,60.43-211.43,91.78-70.36,31.35-150.2,51.41-220.51,22.54-26.66-10.95-51.12-28.65-79.11-34.74-96.5-21-191.02,100.65-284.11,66.32-41.73-15.39-68.74-58.34-92.38-99-23.64-40.66-49.48-84.09-90.49-101.58-41.01-17.49-99.78,8.21-101.64,56.82-1.45,37.99,33.64,67.94,68.2,68.69,34.56.75,64.71-23.36,93.46-45.01,95.36-71.83,54.7-245.53-47.09-274.73C515.2,302.88,59.17,662.74-4.24,663.59" />
          </g>
        </svg>

        {/* Ordered Line Source */}
        <svg ref={orderedSvgRef} viewBox="0 0 1920 881.35">
          <g id="Path_3">
            <line id="_x3C_Path_x5F_Three_x3E_" x1="-.05" y1="397.32" x2="1919.66" y2="397.32" />
          </g>
          <g id="Path_2">
            <line id="_x3C_Path_x5F_Two_x3E_" x1="-.05" y1="328.36" x2="1919.66" y2="328.36" />
          </g>
          <g id="Path_1">
            <line id="_x3C_Path_x5F_One_x3E_" x1="-.05" y1="259.39" x2="1919.66" y2="259.39" />
          </g>
        </svg>
      </div>
    </div>
  );
}
