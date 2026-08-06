export interface CaseStudyData {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  videoSrc: string;
  tags: string[];
  categoryPill: "Digital Design" | "Product Development" | "System Architecture";
  categoryLabel?: string;
  isProtected?: boolean;
}

export const caseStudyCards: CaseStudyData[] = [
  {
    categoryPill: "System Architecture",
    title: "Designing and Building an Automated Media Publishing Platform",
    description:
      "Rebuilt a fragile legacy news platform into a scalable publishing ecosystem by redesigning its architecture and separating infrastructure responsibilities.",
    href: "/web-design-and-development",
    imageSrc: "/waatea-ipad-mp3.webp",
    videoSrc: "",
    tags: ["System Architecture", "Automation", "WordPress"],
    isProtected: true,
  },
  {
    categoryPill: "Digital Design",
    title: "Brand Identity: Visual Language & Design System",
    description:
      "Developed a complete visual language, from logo design and app interfaces to marketing materials and brand collateral, creating a consistent and memorable experience across every touchpoint.",
    href: "/brand-identity",
    imageSrc: "/bite-brand-cover.png",
    videoSrc: "",
    tags: ["Brand Strategy", "Visual Identity", "Design System"],
  },
  {
    categoryPill: "Product Development",
    title: "Meal Planning App. Product Research, Strategy & UX/UI Design",
    description:
      "A budget-friendly meal planning and trading mobile app designed through user research, empathy mapping, wireframing, and interactive prototyping.",
    href: "/ux-design",
    imageSrc: "/Bite-Cover-new.webp",
    videoSrc: "/Ux and User Experience.mp4",
    tags: ["Product Design", "UX/UI", "Prototyping"],
  },
  {
    categoryPill: "Product Development",
    title: "Proactive Content Creation from an SEO Strategy",
    description:
      "An AI-powered content engine that connects a GEO strategy with automated article generation, custom graphics, and approval workflows with built-in notifications.",
    href: "/continuous-content",
    imageSrc: "/cover-blogbooster.webp",
    videoSrc: "",
    tags: ["AI Automation", "SEO Strategy", "Product Design"],
    isProtected: true,
  },
  {
    categoryPill: "Product Development",
    title: "NoFuxs Gallery App — UX/UI Case Study",
    description:
      "View the Behance case study for a mobile platform designed for local artists to build verified profiles, upload collections, and host physical galleries.",
    href: "https://www.behance.net/gallery/168776189/No-Fuxs-Art-Gallery-App",
    imageSrc: "/behance-fux.webp",
    videoSrc: "",
    tags: ["UX/UI", "Art Platform", "Behance"],
  },
  {
    categoryPill: "Digital Design",
    categoryLabel: "BRAND DESIGN",
    title: "Guau — Logo Design & Brand Exploration",
    description:
      "A playful logo identity developed through sketching, concept exploration and refinement. The project documents the complete logo creation process and introduces the visual direction of the wider brand.",
    href: "https://www.behance.net/gallery/166638739/Guag-refreshed",
    imageSrc: "/behance-guau.png",
    videoSrc: "",
    tags: ["Logo Design", "Brand Exploration", "Behance"],
  },
  {
    categoryPill: "Digital Design",
    categoryLabel: "BRAND IDENTITY",
    title: "Dreams Gourmet Coffee — Brand Identity",
    description:
      "A complete visual identity created for a gourmet coffee brand in Portugal. The project includes the logo, supporting graphics and a flexible pattern system designed for packaging, cups and other café applications.",
    href: "https://www.behance.net/gallery/166638641/Gourmet-Coffee",
    imageSrc: "/behance-dreams.webp",
    videoSrc: "",
    tags: ["Brand Identity", "Packaging", "Behance"],
  },
  {
    categoryPill: "System Architecture",
    title: "Foodaloo — Product Architecture & Design System",
    description:
      "A complete product architecture and design system created for an educational support platform. The project defines the grid, typography, colour system, iconography, borders, spacing and reusable UI components used to build a consistent and scalable digital product.",
    href: "https://www.behance.net/gallery/166639083/Design-system",
    imageSrc: "/Design-system.webp",
    videoSrc: "",
    tags: ["Product Architecture", "Design System", "UI Components"],
  },
  {
    categoryPill: "Digital Design",
    categoryLabel: "BRAND IDENTITY",
    title: "The Home Theory — Property Staging Rebrand",
    description:
      "A complete brand refresh for a property staging business, transforming its previous identity into a more refined and editorial visual system. The project includes the logo, typography, colour palette, patterns and branded applications.",
    href: "https://www.behance.net/gallery/253817995/The-Home-Theory-Editorial-Property-Staging-Branding",
    imageSrc: "/HT.webp",
    videoSrc: "",
    tags: ["Brand Refresh", "Property Staging", "Behance"],
  },
  {
    categoryPill: "Digital Design",
    categoryLabel: "BRAND IDENTITY",
    title: "QODA — Architecture Brand Identity",
    description:
      "A complete brand identity developed for a new architecture and construction studio. The project covers early concept exploration, logo development, typography, visual direction and the final brand system across multiple applications.",
    href: "https://www.behance.net/gallery/253816843/QODA-Architecture-Construction-Brand-Identity",
    imageSrc: "/Qoda.webp",
    videoSrc: "",
    tags: ["Brand Identity", "Architecture", "Behance"],
  },
];

