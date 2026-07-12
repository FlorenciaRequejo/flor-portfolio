"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";

const AboutSection = dynamic(() => import("./AboutSection"), { ssr: false });


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

  // SVG Translation Parameters for vertical positioning
  const initialTranslateY = 0; // %
  const finalTranslateY = 13; // %

  const containerRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const svgWrapperRef = useRef<HTMLDivElement>(null);
  const originalSvgRef = useRef<SVGSVGElement>(null);
  const outputSvgRef = useRef<SVGSVGElement>(null);

  // Elements to animate along scroll
  const copyRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const chaosSvgRef = useRef<SVGSVGElement>(null);
  const orderedSvgRef = useRef<SVGSVGElement>(null);
  const indicatorChromeRef = useRef<HTMLDivElement>(null);
  const pill1Ref = useRef<HTMLSpanElement>(null);
  const pill2Ref = useRef<HTMLSpanElement>(null);
  const pill3Ref = useRef<HTMLSpanElement>(null);



  // Section & scroll container refs
  const scrollContentRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);


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

      // Interpolate progress towards target with damping factor (0.12)
      const diff = progress.target - progress.current;
      let shouldContinue = false;
      if (Math.abs(diff) > 0.0001) {
        progress.current += diff * 0.12;
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
        // console.log("[rAF-loop] Sleeping (progress stabilized)");
      }
    };

    const startLoop = () => {
      if (isLoopRunningRef.current) return;
      isLoopRunningRef.current = true;
      // console.log("[rAF-loop] Starting/Resuming smoothRender loop");
      animationFrameId = requestAnimationFrame(smoothRender);
    };

    const init = () => {
      const chaosSvg = chaosSvgRef.current;
      const orderedSvg = orderedSvgRef.current;
      const outputSvg = outputSvgRef.current;
      const container = containerRef.current;

      if (!chaosSvg || !orderedSvg || !outputSvg || !container) return;

      // Ensure SVG layout is ready and paths have geometry
      const firstPath = chaosSvg.querySelector("path");
      if (firstPath) {
        try {
          const length = firstPath.getTotalLength();
          if (length === 0) {
            console.warn("[svg-sampling] SVG length is 0, layout not ready. Retrying in next animation frame...");
            requestAnimationFrame(init);
            return;
          }
        } catch (e) {
          console.warn("[svg-sampling] SVG geometry error, retrying in next animation frame...", e);
          requestAnimationFrame(init);
          return;
        }
      }

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
      const viewportHeight = viewportRef.current ? viewportRef.current.clientHeight : window.innerHeight;
      const scrollHeight = rect.height - viewportHeight;

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
      document.body.style.backgroundColor = "";
      document.documentElement.style.backgroundColor = "";
      document.documentElement.style.removeProperty("--color-bg");
      document.documentElement.style.removeProperty("--color-dark");
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

    const vh = viewport.clientHeight;

    // Morph starts immediately at 0.0 and completes by 0.45
    const morphStart = 0.0;
    const morphEnd = 0.45;
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

    let transformStr = `translate3d(0, ${svgTranslateY}%, 0)`;
    if (p > 0.85) {
      const postMorphScroll = (p - 0.85) * 0.4 * vh;
      transformStr = `translate3d(0, calc(${svgTranslateY}% - ${postMorphScroll}px), 0)`;
    }
    svgWrapper.style.transform = transformStr;

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
      // Calculate color progress (from p = 0.0 to 0.40)
      const colorFactor = Math.max(0, Math.min(1, p / 0.40));

      let color1 = "";
      let color2 = "";
      let color3 = "";
      let strokeWidth1 = 50;
      let strokeWidth2 = 50;
      let strokeWidth3 = 50;
      let otherLinesOpacity = 1;

      if (p <= 0.45) {
        // Phase 1 & 2: Interpolate colors from initial blue theme (#0B1F6B, #111D72, #091E68) to target colors
        // Path 1 (from #0B1F6B to #ADEA54)
        const r1 = Math.round(11 + (173 - 11) * colorFactor);
        const g1 = Math.round(31 + (234 - 31) * colorFactor);
        const b1 = Math.round(107 + (84 - 107) * colorFactor);
        color1 = `rgb(${r1}, ${g1}, ${b1})`;

        // Path 2 (from #111D72 to #FDABFF)
        const r2 = Math.round(17 + (253 - 17) * colorFactor);
        const g2 = Math.round(29 + (171 - 29) * colorFactor);
        const b2 = Math.round(114 + (255 - 114) * colorFactor);
        color2 = `rgb(${r2}, ${g2}, ${b2})`;

        // Path 3 (from #091E68 to #089998)
        const r3 = Math.round(9 + (8 - 9) * colorFactor);
        const g3 = Math.round(30 + (153 - 30) * colorFactor);
        const b3 = Math.round(104 + (152 - 104) * colorFactor);
        color3 = `rgb(${r3}, ${g3}, ${b3})`;

        strokeWidth1 = 50;
        strokeWidth2 = 50;
        strokeWidth3 = 50;
        otherLinesOpacity = 1;

        // Reset backgrounds to default dark blue theme (#1B237A)
        viewport.style.backgroundColor = "rgb(27, 35, 122)";
        document.body.style.backgroundColor = "rgb(27, 35, 122)";
        document.documentElement.style.backgroundColor = "rgb(27, 35, 122)";
        document.documentElement.style.setProperty("--color-bg", "rgb(27, 35, 122)");
        document.documentElement.style.setProperty("--color-dark", "rgb(27, 35, 122)");
      } else {
        // Phase 3: p from 0.45 to 0.85: The 3 lines get thicker and thicker in a smooth transition
        const thicknessRaw = Math.max(0, Math.min(1, (p - 0.45) / (0.85 - 0.45)));
        const thicknessT = easeInOutCubic(thicknessRaw);

        // Expand stroke width of all 3 lines to cover the viewport
        strokeWidth1 = 50 + (1200 - 50) * thicknessT;
        strokeWidth2 = 50 + (1200 - 50) * thicknessT;
        strokeWidth3 = 50 + (1200 - 50) * thicknessT;

        // Keep all lines visible (no fade out)
        otherLinesOpacity = 1;

        // Color blend: from p = 0.60 to 0.85 (delayed to keep glowing blues visible initially as they expand)
        const colorBlendRaw = Math.max(0, Math.min(1, (p - 0.60) / (0.85 - 0.60)));
        const colorBlendT = easeInOutCubic(colorBlendRaw);

        const targetR = 8; // #089998: R=8, G=153, B=152
        const targetG = 153;
        const targetB = 152;

        // Path 1 (from #ADEA54 to #089998)
        const r1 = Math.round(173 + (targetR - 173) * colorBlendT);
        const g1 = Math.round(234 + (targetG - 234) * colorBlendT);
        const b1 = Math.round(84 + (targetB - 84) * colorBlendT);
        color1 = `rgb(${r1}, ${g1}, ${b1})`;

        // Path 2 (from #FDABFF to #089998)
        const r2 = Math.round(253 + (targetR - 253) * colorBlendT);
        const g2 = Math.round(171 + (targetG - 171) * colorBlendT);
        const b2 = Math.round(255 + (targetB - 255) * colorBlendT);
        color2 = `rgb(${r2}, ${g2}, ${b2})`;

        // Path 3 (from #089998 to #089998)
        const r3 = Math.round(8 + (targetR - 8) * colorBlendT);
        const g3 = Math.round(153 + (targetG - 153) * colorBlendT);
        const b3 = Math.round(152 + (targetB - 152) * colorBlendT);
        color3 = `rgb(${r3}, ${g3}, ${b3})`;

        // Interpolate viewport and document backgrounds to `#089998`
        const bgR = Math.round(27 + (targetR - 27) * colorBlendT);
        const bgG = Math.round(35 + (targetG - 35) * colorBlendT);
        const bgB = Math.round(122 + (targetB - 122) * colorBlendT);

        // Transition back to dark blue (#1B237A: 27, 35, 122) near the page bottom (footer)
        const docScrollHeight = document.documentElement.scrollHeight - vh;
        const pageProgress = docScrollHeight > 0 ? window.scrollY / docScrollHeight : 0;
        
        let finalBgR = bgR;
        let finalBgG = bgG;
        let finalBgB = bgB;

        if (pageProgress > 0.82) {
          const footerFactor = Math.min(1, (pageProgress - 0.82) / (0.95 - 0.82));
          const footerT = easeInOutCubic(footerFactor);
          const darkBlueR = 27;
          const darkBlueG = 35;
          const darkBlueB = 122;
          finalBgR = Math.round(bgR + (darkBlueR - bgR) * footerT);
          finalBgG = Math.round(bgG + (darkBlueG - bgG) * footerT);
          finalBgB = Math.round(bgB + (darkBlueB - bgB) * footerT);
        }

        viewport.style.backgroundColor = `rgb(${finalBgR}, ${finalBgG}, ${finalBgB})`;
        document.body.style.backgroundColor = `rgb(${finalBgR}, ${finalBgG}, ${finalBgB})`;
        document.documentElement.style.backgroundColor = `rgb(${finalBgR}, ${finalBgG}, ${finalBgB})`;
        document.documentElement.style.setProperty("--color-bg", `rgb(${finalBgR}, ${finalBgG}, ${finalBgB})`);
        document.documentElement.style.setProperty("--color-dark", `rgb(${finalBgR}, ${finalBgG}, ${finalBgB})`);
      }

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

        // Apply dynamic color, stroke width, and opacity
        if (i === 0) {
          path.element.style.stroke = color1;
          path.element.style.strokeWidth = `${strokeWidth1}px`;
          path.element.style.opacity = morphOpacity.toString();
        } else if (i === 1) {
          path.element.style.stroke = color2;
          path.element.style.strokeWidth = `${strokeWidth2}px`;
          path.element.style.opacity = (otherLinesOpacity * morphOpacity).toString();
        } else if (i === 2) {
          path.element.style.stroke = color3;
          path.element.style.strokeWidth = `${strokeWidth3}px`;
          path.element.style.opacity = (otherLinesOpacity * morphOpacity).toString();
        }
      }
    }

    // Update copy block opacity and transform
    const copy = copyRef.current;
    if (copy) {
      // Fade out completely by p = 0.20
      const copyOpacity = Math.max(0, 1 - p / 0.20);
      copy.style.opacity = copyOpacity.toString();

      const translateY = p * -80;
      copy.style.transform = `translate3d(0, ${translateY}px, 0)`;

      if (copyOpacity > 0.01) {
        copy.style.pointerEvents = "auto";
      } else {
        copy.style.pointerEvents = "none";
      }
    }

    // Update scroll indicator / pills opacity and transform
    const scrollIndicator = scrollIndicatorRef.current;
    if (scrollIndicator) {
      // Sits static in place to align perfectly with flat lines
      scrollIndicator.style.transform = `translate3d(0, 0, 0)`;

      const indicatorChrome = indicatorChromeRef.current;
      const pill1 = pill1Ref.current;
      const pill2 = pill2Ref.current;
      const pill3 = pill3Ref.current;

      // 1. Chrome (vertical line and follow process text) fades out between p = 0.20 and 0.45
      if (indicatorChrome) {
        const chromeOpacity = Math.max(0, Math.min(1, 1 - (p - 0.20) / (0.45 - 0.20)));
        indicatorChrome.style.opacity = chromeOpacity.toString();
        indicatorChrome.style.visibility = chromeOpacity === 0 ? "hidden" : "visible";
      }

      // 2. Pills align with flat horizontal lines between p = 0.20 and 0.45
      if (pill1 && pill2 && pill3) {
        const alignRaw = Math.max(0, Math.min(1, (p - 0.20) / (0.45 - 0.20)));
        const alignT = easeInOutCubic(alignRaw);

        // Compute top offset values in pixels
        const isMobile = window.innerWidth < 768;
        const targetOffset = isMobile ? -0.08 * vh : 0;
        const target1 = 0.1743 * vh + targetOffset;
        const target2 = 0.2525 * vh + targetOffset;
        const target3 = 0.3308 * vh + targetOffset;

        const startOffset = isMobile ? 0 : 30;
        const start1 = 0 + startOffset;
        const start2 = 44 + startOffset;
        const start3 = 88 + startOffset;

        const top1 = start1 + (target1 - start1) * alignT;
        const top2 = start2 + (target2 - start2) * alignT;
        const top3 = start3 + (target3 - start3) * alignT;

        pill1.style.top = `${top1}px`;
        pill2.style.top = `${top2}px`;
        pill3.style.top = `${top3}px`;

        // Color transition: from #FDABFF (253, 171, 255) to #1B237A (27, 35, 122)
        const r = Math.round(253 + (27 - 253) * alignT);
        const g = Math.round(171 + (35 - 171) * alignT);
        const b = Math.round(255 + (122 - 255) * alignT);
        const colorStr = `rgb(${r}, ${g}, ${b})`;
        
        pill1.style.color = colorStr;
        pill2.style.color = colorStr;
        pill3.style.color = colorStr;

        const borderOpacity = 0.2 * (1 - alignT);
        pill1.style.borderColor = `rgba(${r}, ${g}, ${b}, ${borderOpacity})`;
        pill2.style.borderColor = `rgba(${r}, ${g}, ${b}, ${borderOpacity})`;
        pill3.style.borderColor = `rgba(${r}, ${g}, ${b}, ${borderOpacity})`;

        if (alignT > 0.8) {
          pill1.style.borderWidth = '0px';
          pill2.style.borderWidth = '0px';
          pill3.style.borderWidth = '0px';
        } else {
          pill1.style.borderWidth = '1px';
          pill2.style.borderWidth = '1px';
          pill3.style.borderWidth = '1px';
        }

        // Pills fade out between p = 0.75 and 0.85
        let pillsOpacity = Math.max(0, Math.min(1, 1 - (p - 0.75) / (0.85 - 0.75)));

        if (isMobile) {
          // Fade in between p = 0.20 and 0.45 on mobile to avoid overlapping the hero text
          const fadeIn = Math.max(0, Math.min(1, (p - 0.20) / (0.45 - 0.20)));
          pillsOpacity = pillsOpacity * fadeIn;
        }

        pill1.style.opacity = pillsOpacity.toString();
        pill2.style.opacity = pillsOpacity.toString();
        pill3.style.opacity = pillsOpacity.toString();

        pill1.style.visibility = pillsOpacity === 0 ? "hidden" : "visible";
        pill2.style.visibility = pillsOpacity === 0 ? "hidden" : "visible";
        pill3.style.visibility = pillsOpacity === 0 ? "hidden" : "visible";

        if (pillsOpacity > 0.01) {
          scrollIndicator.style.pointerEvents = "auto";
        } else {
          scrollIndicator.style.pointerEvents = "none";
        }
      }
    }

    // Section 2: About Content Opacity & Transform (Grows and fades in from p = 0.62 to 0.88)
    const about = aboutRef.current;
    if (about) {
      const aboutOpacity = Math.max(0, Math.min(1, (p - 0.62) / 0.26));
      about.style.opacity = aboutOpacity.toString();
      const scale = 0.85 + aboutOpacity * 0.15;
      about.style.transformOrigin = "center";
      about.style.transform = `scale(${scale})`;
      if (aboutOpacity > 0.01) {
        about.style.pointerEvents = "auto";
      } else {
        about.style.pointerEvents = "none";
      }
    }

    // Translate scroll wrapper for continuous page scrolling when p > 0.5
    const scrollContent = scrollContentRef.current;
    if (scrollContent) {
      let scrollY = 0;
      if (p > 0.5) {
        const isMobile = window.innerWidth < 768;
        const multiplier = isMobile ? 1.8 : 1.3;
        scrollY = (p - 0.5) * multiplier * -vh;
      }
      scrollContent.style.transform = `translate3d(0, ${scrollY}px, 0)`;
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full morphing-lines-container"
      style={{ height: "var(--hero-scroll-height, 300vh)" }}
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
          <h1 className="font-serif text-[42px] md:text-[72px] leading-[1.1] md:leading-[72px] text-primary font-normal text-center md:text-left max-w-[800px] tracking-tight">
            Ideas are messy. <br />Without structure, they'll stay as ideas.
          </h1>

          {/* Supporting Copy */}
          <p className="font-sans text-[18px] leading-[24px] text-primary font-normal text-center md:text-left max-w-[480px]">
            Combining design, development and strategic thinking, I turn them into products, systems and experiences.
          </p>

          {/* Mobile Pills - visible on mobile/tablet, hidden on desktop */}
          <div className="md:hidden flex flex-wrap gap-2.5 justify-center mt-2 w-full max-w-[480px] pointer-events-auto">
            <span className="px-3.5 py-1.5 rounded-full border border-primary/20 text-primary font-sans text-[10px] font-medium uppercase tracking-[1.2px] bg-transparent whitespace-nowrap">
              15+ Years Experience
            </span>
            <span className="px-3.5 py-1.5 rounded-full border border-primary/20 text-primary font-sans text-[10px] font-medium uppercase tracking-[1.2px] bg-transparent whitespace-nowrap">
              Design + Development
            </span>
            <span className="px-3.5 py-1.5 rounded-full border border-primary/20 text-primary font-sans text-[10px] font-medium uppercase tracking-[1.2px] bg-transparent whitespace-nowrap">
              Concept to Launch
            </span>
          </div>

          {/* Mobile-only Scroll Indicator: sits below hero copy and is visible on all screen aspect ratios */}
          <div className="md:hidden flex flex-col items-center gap-3 mt-4 pointer-events-none w-full">
            <span className="font-sans text-[12px] tracking-[2.5px] uppercase text-primary">
              FOLLOW THE PROCESS
            </span>
            <div className="flex flex-col items-center">
              <div className="w-[1.5px] h-[32px] bg-primary/40" />
              <div className="w-[6px] h-[6px] rounded-full bg-primary -mt-[2px]" />
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Desktop only (fixed to bottom of viewport, line extended up) */}
        <div
          ref={scrollIndicatorRef}
          className="flex absolute top-[25vh] bottom-[50px] left-0 right-0 mx-auto z-20 pointer-events-none w-full md:w-[min(76vw,1260px)] justify-center md:justify-end transition-opacity duration-0"
          style={{
            willChange: "opacity, transform",
          }}
        >
          <div className="flex items-end gap-4 h-full relative w-full md:w-auto justify-center md:justify-end">
            {/* Extended Line & Dot Chrome */}
            <div ref={indicatorChromeRef} className="hidden md:flex items-end gap-4 h-full">
              <div className="flex flex-col items-center h-full relative">
                {/* Tall vertical line */}
                <div className="w-[1.5px] flex-grow bg-primary/40" />
                {/* Dot */}
                <div className="w-[6px] h-[6px] rounded-full bg-primary -mt-[2px]" />
              </div>
              {/* Text */}
              <span className="font-sans text-[14px] leading-none tracking-[2.5px] uppercase text-primary pb-[1px] whitespace-nowrap">
                FOLLOW THE PROCESS
              </span>
            </div>

            {/* Pills container positioned on the right side of the vertical line */}
            <div className="absolute left-0 md:left-6 top-0 h-full pointer-events-auto w-full md:w-auto">
              <span
                ref={pill1Ref}
                className="absolute flat-pill px-4 py-1.5 rounded-full border border-primary/20 text-primary font-sans text-[11px] font-medium uppercase tracking-[1.5px] bg-transparent whitespace-nowrap hover:border-primary/55 transition-colors top-0 md:top-[30px]"
              >
                15+ Years Experience
              </span>
              <span
                ref={pill2Ref}
                className="absolute flat-pill px-4 py-1.5 rounded-full border border-primary/20 text-primary font-sans text-[11px] font-medium uppercase tracking-[1.5px] bg-transparent whitespace-nowrap hover:border-primary/55 transition-colors top-[44px] md:top-[74px]"
              >
                Design + Development
              </span>
              <span
                ref={pill3Ref}
                className="absolute flat-pill px-4 py-1.5 rounded-full border border-primary/20 text-primary font-sans text-[11px] font-medium uppercase tracking-[1.5px] bg-transparent whitespace-nowrap hover:border-primary/55 transition-colors top-[88px] md:top-[118px]"
              >
                Concept to Launch
              </span>
            </div>
          </div>
        </div>

        {/* Section 2: About Content (Fades in during morph) */}
        <div
          ref={aboutRef}
          className="absolute inset-0 w-full h-full flex items-end justify-center z-20 pointer-events-none pb-[4vh] md:pb-[7vh]"
          style={{
            opacity: 0,
            willChange: "opacity, transform",
          }}
        >
          <AboutSection />
        </div>

      </div>

      {/* ────────────────────────────────────────────────────────
          HIDDEN SOURCE SVGS (Used solely for geometry sampling)
         ──────────────────────────────────────────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          width: 0,
          height: 0,
          overflow: "hidden",
          opacity: 0,
          pointerEvents: "none",
        }}
      >
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
