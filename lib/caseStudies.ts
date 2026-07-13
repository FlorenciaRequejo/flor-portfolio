export interface CaseStudyData {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  videoSrc: string;
}

export const caseStudyCards: CaseStudyData[] = [
  {
    title: "Design + development",
    description:
      "Rebuilt a fragile legacy news platform into a scalable publishing ecosystem by redesigning its architecture and separating infrastructure responsibilities.",
    href: "/web-design-and-development",
    imageSrc: "/Web Design and Development.png",
    videoSrc: "/Web Design and Development.mp4",
  },
  {
    title: "Brand Identity: Visual Language & Design System",
    description:
      "Developed a complete visual language, from logo design and app interfaces to marketing materials and brand collateral, creating a consistent and memorable experience across every touchpoint.",
    href: "/brand-identity",
    imageSrc: "/bite-brand-cover.png",
    videoSrc: "",
  },
  {
    title: "UX/UI Design: Product Case Study",
    description:
      "A budget-friendly meal planning and trading mobile app designed through user research, empathy mapping, wireframing, and interactive prototyping.",
    href: "/ux-design",
    imageSrc: "/Ux and User Experience.png",
    videoSrc: "/Ux and User Experience.mp4",
  },
];
