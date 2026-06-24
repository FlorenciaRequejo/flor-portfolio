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
    title: "Concept to launch",
    description:
      "An AI-powered system that automates website audits, transforming UX, SEO and performance data into actionable business recommendations.",
    href: "/concept-to-launch",
    imageSrc: "/End To End Product Thinking.jpg",
    videoSrc: "/End To End Product Thinking.mp4",
  },
  {
    title: "Brand identity",
    description:
      "Developed a complete visual language, from logo design and app interfaces to marketing materials and brand collateral, creating a consistent and memorable experience across every touchpoint.",
    href: "/brand-identity",
    imageSrc: "/Ux and User Experience.png",
    videoSrc: "/Ux and User Experience.mp4",
  },
];
