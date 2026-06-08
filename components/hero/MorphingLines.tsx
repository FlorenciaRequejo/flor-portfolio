"use client";

import { useEffect, useRef } from "react";
import { CHAOS_PATHS } from "@/lib/paths";

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

export default function MorphingLines() {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const originalSvgRef = useRef<SVGSVGElement>(null);
  const outputSvgRef = useRef<SVGSVGElement>(null);

  // Elements to animate along scroll
  const copyRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // Hidden sources refs
  const chaosSvgRef = useRef<SVGSVGElement>(null);
  const orderedSvgRef = useRef<SVGSVGElement>(null);

  // Animation refs
  const initCountRef = useRef(0);
  const pathDataRef = useRef<PathData[]>([]);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);
  const scrollProgressRef = useRef({ current: 0, target: 0 });
  const isLoadedRef = useRef(false);

  useEffect(() => {
    // Determine sample points count based on screen size (Mobile optimization)
    // 180 points on desktop and 100 on mobile provides buttery smooth rendering
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
      const orderedLines = Array.from(orderedSvg.querySelectorAll("polyline, path"));

      const chaosViewBox = chaosSvg.viewBox.baseVal;
      const orderedViewBox = orderedSvg.viewBox.baseVal;

      const xScale = chaosViewBox.width / orderedViewBox.width;
      const orderedYOffset = (chaosViewBox.height - orderedViewBox.height) / 2;
      const chaosWidth = chaosViewBox.width;

      // Helper to sample points along an SVG geometry element
      const sampleGeometry = (
        el: SVGGeometryElement,
        count: number,
        transformPoint?: (p: DOMPoint) => Point
      ): Point[] => {
        const length = el.getTotalLength();
        const points: Point[] = [];
        for (let i = 0; i < count; i++) {
          const distance = length * (i / (count - 1));
          const p = el.getPointAtLength(distance);
          points.push(
            transformPoint
              ? transformPoint(p)
              : { x: p.x, y: p.y }
          );
        }
        return points;
      };

      // Helper to calculate average Y of points (for spatial sorting)
      const getAverageY = (points: Point[]): number => {
        return points.reduce((sum, p) => sum + p.y, 0) / points.length;
      };

      // Extract chaos paths with their sampled points and original indices
      const sampledChaos = chaosPaths.map((pathEl, origIndex) => {
        const fromPoints = sampleGeometry(pathEl as SVGGeometryElement, pointsCount);
        const avgY = getAverageY(fromPoints);
        const fromStrokeWidth = pathEl.classList.contains("st0") ? 0.5 : 1.0;
        return {
          origIndex,
          fromPoints,
          avgY,
          fromStrokeWidth,
          element: pathEl,
        };
      });

      // Extract ordered lines/paths with their sampled and mapped points
      const sampledOrdered = orderedLines.map((lineEl, origIndex) => {
        const toPoints = sampleGeometry(lineEl as SVGGeometryElement, pointsCount, (p) => ({
          x: p.x * xScale,
          y: p.y + orderedYOffset,
        }));

        // Re-distribute X coordinates progressively from left to right along the line width
        // to untangle chaotic overlaps and eliminate horizontal zigzag artifacts
        for (let j = 0; j < toPoints.length; j++) {
          toPoints[j].x = (j / (toPoints.length - 1)) * chaosWidth;
        }

        const avgY = getAverageY(toPoints);
        const toStrokeWidth = lineEl.classList.contains("st0") ? 0.5 : 1.0;
        return {
          origIndex,
          toPoints,
          avgY,
          toStrokeWidth,
          element: lineEl,
        };
      });

      // Sort both by average Y to align them vertically:
      const sortedChaos = [...sampledChaos].sort((a, b) => a.avgY - b.avgY);
      const sortedOrdered = [...sampledOrdered].sort((a, b) => a.avgY - b.avgY);

      const pairedPaths: PathData[] = [];

      for (let i = 0; i < sortedChaos.length; i++) {
        const chaos = sortedChaos[i];

        // Find corresponding ordered line
        const orderedTargetIndex = i;
        const ordered = sortedOrdered[orderedTargetIndex] || sortedOrdered[sortedOrdered.length - 1];

        // Bind to the statically rendered React output path element
        const outputPath = pathRefs.current[i];
        if (!outputPath) continue;

        pairedPaths.push({
          fromPoints: chaos.fromPoints,
          toPoints: ordered.toPoints,
          fromStrokeWidth: chaos.fromStrokeWidth,
          toStrokeWidth: ordered.toStrokeWidth,
          element: outputPath,
        });
      }

      pathDataRef.current = pairedPaths;
      console.timeEnd("svg-sampling");
      console.log(`[svg-sampling] Chaos paths count: ${chaosPaths.length}`);
      console.log(`[svg-sampling] Ordered paths count: ${orderedLines.length}`);
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

    // Use passive scroll listener for high performance scrolling
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Initial call to set initial scroll position
    handleScroll();

    // Resize handler to re-initialize sample points and mapping if dimensions change
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
    if (!container || !viewport || !svgWrapper || !outputSvg) return;

    // ────────────────────────────────────────────────────────
    // PROGRESS MAPPING & TIMING
    // ────────────────────────────────────────────────────────
    // Morph starts immediately at 0.0 and completes by 0.65 (slower transition)
    const morphStart = 0.0;
    const morphEnd = 0.65;

    const morphRaw = Math.max(0, Math.min(1, (p - morphStart) / (morphEnd - morphStart)));

    // easeInOutCubic for line coordinates interpolation
    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };
    const t = easeInOutCubic(morphRaw);

    // smoothstep function for color and translation interpolation
    const smoothstep = (edge0: number, edge1: number, x: number) => {
      const val = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
      return val * val * (3 - 2 * val);
    };

    // Keep background consistently dark as per user visual request
    viewport.style.backgroundColor = "rgb(10, 10, 10)";

    // Keep lines consistently light
    const strokeColor = "rgb(245, 240, 232)";

    // bgT controls the stroke-width transition
    const bgT = smoothstep(0.0, 0.65, p);

    // ────────────────────────────────────────────────────────
    // VERTICAL POSITION ADJUSTMENT
    // ────────────────────────────────────────────────────────
    // Shifts the SVG wrapper upward:
    // - Starts at -18% translation (giving more breathing room to scroll indicator)
    // - Transitions to -38% translation (lifts lines up to landing layout)
    const svgTranslateY = -18 - 20 * t;
    svgWrapper.style.transform = `translate3d(0, ${svgTranslateY}%, 0)`;

    // ────────────────────────────────────────────────────────
    // OPACITY CROSS-FADE BETWEEN ORIGINAL AND SAMPLED MORPH
    // ────────────────────────────────────────────────────────
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
      originalSvg.style.color = strokeColor;
    }

    outputSvg.style.opacity = morphOpacity.toString();
    outputSvg.style.visibility = morphOpacity === 0 ? "hidden" : "visible";
    outputSvg.style.color = strokeColor;

    // Update path shapes and stroke properties directly in the DOM
    const paths = pathDataRef.current;

    if (paths.length > 0) {
      for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const fromPoints = path.fromPoints;
        const toPoints = path.toPoints;

        // 1. Interpolate coordinates (Precomputed arrays interpolation ONLY, no DOM layout reads)
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

        // 2. Interpolate stroke width
        const strokeWidth = path.fromStrokeWidth + (path.toStrokeWidth - path.fromStrokeWidth) * bgT;

        path.element.setAttribute("d", d);
        path.element.setAttribute("stroke-width", strokeWidth.toFixed(2));
      }
    }

    // 3. Update copy block opacity and transform
    // Fades in immediately after morph is almost complete (starts at 0.60, complete by 0.85)
    const copy = copyRef.current;
    if (copy) {
      const copyT = smoothstep(0.60, 0.85, p);
      copy.style.opacity = copyT.toString();
      copy.style.transform = `translate3d(0, ${(1 - copyT) * 24}px, 0)`;
      if (copyT > 0.1) {
        copy.style.pointerEvents = "auto";
        copy.style.userSelect = "auto";
      } else {
        copy.style.pointerEvents = "none";
        copy.style.userSelect = "none";
      }
    }

    // 4. Update scroll hint opacity and transform
    const hint = hintRef.current;
    if (hint) {
      const hintT = Math.max(0, 1 - p * 10); // Completely gone by 10% scroll
      hint.style.opacity = hintT.toString();
      hint.style.transform = `translate3d(0, ${p * -40}px, 0)`;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      style={{ height: "200vh" }}
    >
      {/* Sticky Frame viewport */}
      <div
        ref={viewportRef}
        className="sticky top-0 left-0 w-full h-screen overflow-hidden transition-colors duration-0"
        style={{
          backgroundColor: "rgb(10,10,10)",
          willChange: "background-color",
        }}
      >
        {/* Navbar - Fixed inside the sticky container, difference mix-blend */}
        <nav className="absolute top-0 left-0 right-0 z-50 flex items-start justify-between px-6 md:px-16 py-8 select-none mix-blend-difference pointer-events-auto">
          <a href="#" className="text-white font-mono text-xs md:text-sm tracking-widest uppercase leading-tight hover:opacity-60 transition-opacity duration-200">
            Flor
            <br />
            Requejo
          </a>
          <div className="flex gap-6 md:gap-12">
            {["About", "Projects", "Contact", "Online CV"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                className="text-white font-mono text-[10px] md:text-xs tracking-[0.15em] uppercase hover:opacity-50 transition-opacity duration-200"
              >
                {item}
              </a>
            ))}
          </div>
        </nav>

        <div className="absolute inset-0 w-full h-full overflow-hidden">
          {/* Mobile-only vertical shift container: shifts layout upward by 8% of viewport height only on mobile (<768px) */}
          <div className="-translate-y-[8%] md:translate-y-0 w-full h-full absolute inset-0 overflow-visible">
            {/* SVG Wrapper - Translates vertically based on scroll progress */}
            <div
              ref={svgWrapperRef}
              className="absolute inset-0 w-full h-full overflow-visible will-change-[transform]"
              style={{ transform: "translate3d(0, -18%, 0)" }}
            >
              {/* 1. ORIGINAL NATIVE BEZIER CHAOS SVG (Active initially, fades out when user scrolls past 0.03) */}
              <svg
                ref={originalSvgRef}
                viewBox="0 0 1287.62 1035.52"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 w-full h-full overflow-visible transition-opacity duration-0"
                style={{ opacity: 1, willChange: "opacity" }}
              >
                {CHAOS_PATHS.map((d, i) => {
                  const isSt0 = [1, 3, 5, 8, 9, 13, 16, 22].includes(i);
                  return (
                    <path
                      key={i}
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={isSt0 ? 0.5 : 1.0}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>

              {/* 2. SAMPLED MORPHING SVG (Hidden initially, active & fades in when user scrolls past 0.03) */}
              <svg
                ref={outputSvgRef}
                viewBox="0 0 1287.62 1035.52"
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 w-full h-full overflow-visible transition-opacity duration-0 pointer-events-none"
                style={{ opacity: 0, willChange: "opacity" }}
              >
                {CHAOS_PATHS.map((d, i) => {
                  const isSt0 = [1, 3, 5, 8, 9, 13, 16, 22].includes(i);
                  return (
                    <path
                      key={i}
                      ref={(el) => {
                        pathRefs.current[i] = el;
                      }}
                      d={d}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={isSt0 ? 0.5 : 1.0}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      vectorEffect="non-scaling-stroke"
                    />
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Hero Editorial Composition (Reveals below lines in the final state over dark background) */}
        <div
          ref={copyRef}
          className="absolute left-6 md:left-16 lg:left-24 top-[18vh] md:top-[21vh] max-w-[840px] z-20 pointer-events-none opacity-0 select-none flex flex-col gap-6 md:gap-8"
          style={{ willChange: "opacity, transform" }}
        >
          {/* Headline - Premium serif */}
          <h1 className="font-serif text-[42px] md:text-[68px] lg:text-[88px] tracking-tight leading-[0.92] text-stone-100 font-normal">
            Creative thinking,
            <br />
            grounded in
            <br />
            execution.
          </h1>

          {/* Subtitle - Mono */}
          <span className="font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-400">
            — From chaos to something that works.
          </span>

          {/* Paragraph and CTA block */}
          <div className="flex flex-col md:flex-row gap-6 md:gap-16 items-start mt-2">
            <p className="font-mono text-[10px] md:text-xs leading-relaxed text-stone-400 max-w-sm">
              I turn ideas into systems that actually work.
              <br />
              By making the right decisions across design, tech and product.
            </p>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 font-mono text-[10px] md:text-xs uppercase tracking-[0.2em] text-stone-100 border-b border-stone-100/30 pb-1 hover:border-stone-100 transition-colors group pointer-events-auto"
            >
              View Work
              <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200">
                ↗
              </span>
            </a>
          </div>
        </div>

        {/* Scroll Hint Outer Wrapper (handles centering independently from javascript X translations) */}
        <div
          className="scroll-hint-mobile-fix absolute bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none select-none"
        >
          {/* Scroll Hint Inner Animated Element */}
          <div
            ref={hintRef}
            className="flex flex-col items-center gap-3 transition-opacity duration-300"
            style={{ willChange: "opacity, transform" }}
          >
            <span className="text-white font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase opacity-60">
              Scroll to transform
            </span>
            <div className="flex flex-col items-center gap-1">
              <div className="w-px h-8 bg-white/40" />
              <div className="w-2 h-2 rounded-full bg-white/60 animate-pulse" />
            </div>
          </div>
        </div>
      </div>

      {/* ────────────────────────────────────────────────────────
          HIDDEN SOURCE SVGS (Used solely for geometry sampling)
         ──────────────────────────────────────────────────────── */}
      <div className="hidden" aria-hidden="true" style={{ display: "none" }}>
        {/* Chaos Path Source */}
        <svg ref={chaosSvgRef} viewBox="0 0 1287.62 1035.52">
          {CHAOS_PATHS.map((d, i) => (
            <path
              key={i}
              className={[1, 3, 5, 8, 9, 13, 16, 22].includes(i) ? "st0" : "st1"}
              d={d}
            />
          ))}
        </svg>

        {/* Ordered Polyline Source */}
        <svg ref={orderedSvgRef} viewBox="0 0 1284.29 271.91">
          <polyline className="st1" points="0 49.86 526.99 49.86 1069.59 49.86 1284.29 49.86" />
          <polyline className="st0" points="0 6.42 178.27 6.42 572.53 6.42 1284.29 6.42" />
          <polyline className="st1" points="0 56.53 395.57 56.53 196.49 56.53 515.28 56.53 441.11 56.53 654.51 56.53 1031.86 56.53 1284.29 56.53" />
          <polyline className="st0" points="0 12.59 463.23 12.59 780.43 12.59 1215.33 12.59 1284.29 12.59" />
          <polyline className="st1" points="0 63.2 347.42 63.2 594.65 63.2 705.26 63.2 517.88 63.2 625.8 63.2 588.15 63.2 858.8 63.2 1284.29 63.2" />
          <polyline className="st0" points="0 18.76 338.32 18.76 625.8 18.76 985.02 18.76 1284.29 18.76" />
          <polyline className="st1" points="0 69.87 266.75 69.87 357.83 69.87 608.97 69.87 824.97 69.87 1095.62 69.87 1284.29 69.87" />
          <polyline className="st1" points="0 76.53 256.34 76.53 642.8 76.53 1034.46 76.53 1284.29 76.53" />
          <polyline className="st0" points="0 24.93 248.53 24.93 443.71 24.93 625.8 24.93 805.45 24.93 1221.83 24.93 1284.29 24.93" />
          <path className="st0" d="M1284.29,31.1H0" />
          <polyline className="st1" points="0 83.2 411.18 83.2 642.8 83.2 595.95 83.2 726.08 83.2 871.81 83.2 975.91 83.2 1234.86 83.2 1284.29 83.2" />
          <polyline className="st1" points="0 90.87 467.14 90.87 607.67 90.87 744.29 90.87 553.02 90.87 849.69 90.87 964.2 90.87 739.09 90.87 1221.83 90.87 1284.29 90.87" />
          <polyline className="st1" points="0 99.54 134.03 99.54 387.76 99.54 553.02 99.54 766.41 99.54 726.08 99.54 688.34 99.54 903.04 99.54 1284.29 99.54" />
          <polyline className="st0" points="0 37.27 378.65 37.27 759.91 37.27 1284.29 37.27" />
          <polyline className="st1" points="0 109.21 374.75 109.21 585.55 109.21 864 109.21 1284.29 109.21" />
          <polyline className="st1" points="0 120.88 430.7 120.88 844.49 120.88 1284.29 120.88" />
          <path className="st0" d="M0,43.44h1284.29" />
          <path className="st1" d="M0,133.55h1284.29" />
          <path className="st1" d="M0,145.22h1284.29" />
          <polyline className="st1" points="0 161.89 266.75 161.89 508.77 161.89 650.61 161.89 813.26 161.89 1284.29 161.89" />
          <path className="st1" d="M0,188.56h1284.29" />
          <path className="st1" d="M0,225.23h1284.29" />
          <path className="st0" d="M0,271.65h369.2-34.59,784.4s129.51.59,165.28,0" />
          <polyline className="st1" points="0 0 290.17 0 403.35 0 330.51 0 483.87 0 588.58 0 867.91 0 1112.55 0 1284.29 0" />
        </svg>
      </div>
    </div>
  );
}
