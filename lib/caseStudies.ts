export interface CaseStudyData {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  videoSrc: string;
  tags: string[];
}

export const caseStudyCards: CaseStudyData[] = [
  {
    title: "Designing and Building an Automated Media Publishing Platform",
    description:
      "Rebuilt a fragile legacy news platform into a scalable publishing ecosystem by redesigning its architecture and separating infrastructure responsibilities.",
    href: "/web-design-and-development",
    imageSrc: "/waatea-ipad-mp3.webp",
    videoSrc: "",
    tags: ["System Architecture", "Automation", "WordPress"],
  },
  {
    title: "Brand Identity: Visual Language & Design System",
    description:
      "Developed a complete visual language, from logo design and app interfaces to marketing materials and brand collateral, creating a consistent and memorable experience across every touchpoint.",
    href: "/brand-identity",
    imageSrc: "/bite-brand-cover.png",
    videoSrc: "",
    tags: ["Brand Strategy", "Visual Identity", "Design System"],
  },
  {
    title: "UX/UI Design: Product Case Study",
    description:
      "A budget-friendly meal planning and trading mobile app designed through user research, empathy mapping, wireframing, and interactive prototyping.",
    href: "/ux-design",
    imageSrc: "/Ux and User Experience.png",
    videoSrc: "/Ux and User Experience.mp4",
    tags: ["Product Design", "UX/UI", "Prototyping"],
  },
  {
    title: "Concept to Launch: Website Audit App",
    description:
      "An AI-powered website audit platform that automatically evaluates performance, accessibility, SEO, and visual consistency, translating metrics into clear business tasks.",
    href: "/concept-to-launch",
    imageSrc: "/End To End Product Thinking.jpg",
    videoSrc: "/End To End Product Thinking.mp4",
    tags: ["Product Strategy", "AI Integration", "Automation"],
  },
  {
    title: "Making Brands Machine-Readable",
    description:
      "Designed and built a system that translates brand decisions into structured JSON/Markdown, enabling designers, developers, and AI agents to work from a single source of truth.",
    href: "/machine-readable-brands",
    imageSrc: "/machine-readable-brands-hero.png",
    videoSrc: "",
    tags: ["Brand Systems", "Automation", "AI Readiness"],
  },
  {
    title: "Designing a Content System That Does the Work",
    description:
      "An AI-powered content pipeline that proactively converts keyword strategy into review-ready blogs and social media campaigns for small businesses.",
    href: "/continuous-content",
    imageSrc: "/continuous-content-hero.png",
    videoSrc: "",
    tags: ["AI Integration", "Automation", "Content Strategy"],
  },
  {
    title: "NoFuxs: Artist Portfolio & Gallery App",
    description:
      "A mobile platform designed for local artists to build verified profiles, upload collections, vote on art, and showcase their work in physical galleries.",
    href: "/nofuxs-gallery",
    imageSrc: "/nofuxs-gallery-hero.png",
    videoSrc: "",
    tags: ["Product Design", "UX/UI", "Web App"],
  },
];
