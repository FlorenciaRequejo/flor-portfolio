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
    title: "Helping people face grocery-related financial challenges in an economic recession.",
    description:
      "A budget-friendly meal planning and trading mobile app designed through user research, empathy mapping, wireframing, and interactive prototyping.",
    href: "/ux-design",
    imageSrc: "/Bite-Cover-new.webp",
    videoSrc: "/Ux and User Experience.mp4",
    tags: ["Product Design", "UX/UI", "Prototyping"],
  },
  {
    title: "Proactive Content Creation from an SEO Strategy",
    description:
      "An AI-powered content engine connecting local search strategy to automated article generation, custom graphics, and notification approval loops.",
    href: "/continuous-content",
    imageSrc: "/seo-automation-cover.png",
    videoSrc: "",
    tags: ["AI Automation", "SEO Strategy", "Product Design"],
  },
  {
    title: "Bite App — UX/UI Case Study",
    description:
      "Explore the detailed UX design process on Behance, showing user research, empathy mapping, and wireframing for the grocery-planning mobile app.",
    href: "https://www.behance.net/gallery/168776561/Bite-App",
    imageSrc: "/behance-Bite.webp",
    videoSrc: "",
    tags: ["UX/UI", "Product Design", "Behance"],
  },
  {
    title: "NoFuxs Gallery App — UX/UI Case Study",
    description:
      "View the Behance case study for a mobile platform designed for local artists to build verified profiles, upload collections, and host physical galleries.",
    href: "https://www.behance.net/gallery/168776189/No-Fuxs-Art-Gallery-App",
    imageSrc: "/behance-fux.webp",
    videoSrc: "",
    tags: ["UX/UI", "Art Platform", "Behance"],
  },
  {
    title: "Guag Refreshed — Brand & UI Design",
    description:
      "A visual redesign and enhanced onboarding flow for a pet care and coordination application, published on Behance.",
    href: "https://www.behance.net/gallery/166638739/Guag-refreshed",
    imageSrc: "/behance-guau.webp",
    videoSrc: "",
    tags: ["Visual Design", "Mobile App", "Behance"],
  },
  {
    title: "Drams: Gourmet Coffee — E-Commerce Design",
    description:
      "A premium coffee purchasing experience featuring minimalist typography, dark aesthetics, and a streamlined ordering flow.",
    href: "https://www.behance.net/gallery/166638641/Gourmet-Coffee",
    imageSrc: "/behance-dreams.webp",
    videoSrc: "",
    tags: ["E-Commerce", "UI Design", "Behance"],
  },
  {
    title: "Bite Design System — Component Library",
    description:
      "A comprehensive UI kit and design system built to ensure consistency, scalability, and seamless handoffs between designers and developers.",
    href: "https://www.behance.net/gallery/166639083/Design-system",
    imageSrc: "/Design-system.webp",
    videoSrc: "",
    tags: ["Design System", "UI Kit", "Figma"],
  },
];
