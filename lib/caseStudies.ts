export interface CaseStudyData {
  title: string;
  description: string;
  href: string;
  imageSrc: string;
  videoSrc: string;
  tags: string[];
  categoryPill: "Web & UX/UI Design" | "Product Development" | "Automation & Digital Systems";
  categoryLabel?: string;
  isProtected?: boolean;
}

export const caseStudyCards: CaseStudyData[] = [
  {
    categoryPill: "Product Development",
    title: "Proactive Content Creation from an SEO Strategy",
    description:
      "An AI-powered content engine that connects a GEO strategy with automated article generation, custom graphics, and approval workflows with built-in notifications.",
    href: "/continuous-content",
    imageSrc: "/cover-blogbooster.webp",
    videoSrc: "",
    tags: ["AI", "Automation", "Product Design", "Front End"],
    isProtected: true,
  },
  {
    categoryPill: "Automation & Digital Systems",
    title: "Designing and Building an Automated Media Publishing Platform",
    description:
      "Rebuilt a fragile legacy news platform into a scalable publishing ecosystem by redesigning its architecture and separating infrastructure responsibilities.",
    href: "/web-design-and-development",
    imageSrc: "/waatea-ipad-mp3.webp",
    videoSrc: "",
    tags: ["Automation", "WordPress", "Web Design", "Front End"],
    isProtected: true,
  },
  {
    categoryPill: "Web & UX/UI Design",
    title: "Brand Identity: Visual Language & Design System",
    description:
      "Developed a complete visual language, from logo design and app interfaces to marketing materials and brand collateral, creating a consistent and memorable experience across every touchpoint.",
    href: "/brand-identity",
    imageSrc: "/bite-brand-cover.png",
    videoSrc: "",
    tags: ["Branding", "Graphic Design", "Logo Design", "Figma"],
  },
  {
    categoryPill: "Product Development",
    title: "Meal Planning App. Product Research, Strategy & UX/UI Design",
    description:
      "A budget-friendly meal planning and trading mobile app designed through user research, empathy mapping, wireframing, and interactive prototyping.",
    href: "/ux-design",
    imageSrc: "/Bite-Cover-new.webp",
    videoSrc: "/Ux and User Experience.mp4",
    tags: ["Product Design", "UX/UI", "UX Research", "Figma"],
  },
  {
    categoryPill: "Product Development",
    title: "NoFuxs Gallery App: UX/UI Case Study",
    description:
      "View the Behance case study for a mobile platform designed for local artists to build verified profiles, upload collections, and host physical galleries.",
    href: "https://www.behance.net/gallery/168776189/No-Fuxs-Art-Gallery-App",
    imageSrc: "/behance-fux.webp",
    videoSrc: "",
    tags: ["UX/UI", "Product Design", "Figma"],
  },
  {
    categoryPill: "Automation & Digital Systems",
    title: "Foodaloo: Product Architecture & Design System",
    description:
      "A complete product architecture and design system created for an educational support platform. The project defines the grid, typography, colour system, iconography, borders, spacing and reusable UI components used to build a consistent and scalable digital product.",
    href: "https://www.behance.net/gallery/166639083/Design-system",
    imageSrc: "/Design-system.webp",
    videoSrc: "",
    tags: ["Automation", "Product Design", "Figma"],
  },
  {
    categoryPill: "Web & UX/UI Design",
    categoryLabel: "BRAND IDENTITY",
    title: "QODA: Architecture Brand Identity",
    description:
      "A complete brand identity developed for a new architecture and construction studio. The project covers early concept exploration, logo development, typography, visual direction and the final brand system across multiple applications.",
    href: "https://www.behance.net/gallery/253816843/QODA-Architecture-Construction-Brand-Identity",
    imageSrc: "/Qoda.webp",
    videoSrc: "",
    tags: ["Branding", "Logo Design", "Graphic Design"],
  },
  {
    categoryPill: "Web & UX/UI Design",
    title: "Sport Manawatū: UX/UI & WordPress Website Redesign",
    description:
      "A full website redesign for Sport Manawatū, focused on improving information architecture, usability and the overall digital experience. The project included UX research, user flows, wireframing, interface design and the final responsive WordPress implementation.",
    href: "https://www.behance.net/gallery/254163819/Sport-Manawatu-UXUI-WordPress-Website-Redesign",
    imageSrc: "/sport-manawatu.webp",
    videoSrc: "",
    tags: ["WordPress", "UX/UI", "Web Design", "UX Research", "Front End"],
  },
  {
    categoryPill: "Web & UX/UI Design",
    title: "Mirage Visual: UX/UI & WordPress Website Redesign",
    description:
      "A comprehensive website redesign for Mirage Visual, focusing on UX/UI design, information architecture, modern visual styling, and custom responsive WordPress development.",
    href: "https://www.behance.net/gallery/254166421/Mirage-Visual-UXUI-WordPress-Website-Redesign",
    imageSrc: "/mirage.webp",
    videoSrc: "",
    tags: ["WordPress", "UX/UI", "Web Design", "Figma", "Front End"],
  },
  {
    categoryPill: "Web & UX/UI Design",
    title: "Natasha Collins: Personal Stylist Website Redesign",
    description:
      "An elegant personal stylist website redesign for Natasha Collins, showcasing service offerings, visual portfolio, and client conversion flows with responsive web development.",
    href: "https://www.behance.net/gallery/254165859/Natasha-Collins-Personal-Stylist-Website-Redesign",
    imageSrc: "/natasha.webp",
    videoSrc: "",
    tags: ["Web Design", "UX/UI", "Branding", "WordPress", "Front End"],
  },
  {
    categoryPill: "Web & UX/UI Design",
    title: "Foodaloo Charity: UX/UI Design",
    description:
      "A user-centric UX/UI design and research project for Foodaloo Charity, creating intuitive donation and community support platform workflows.",
    href: "https://www.behance.net/gallery/254165157/Foodaloo-Charity-UXUI-Design",
    imageSrc: "/foodaloo2.webp",
    videoSrc: "",
    tags: ["UX/UI", "Product Design", "Figma", "UX Research", "Graphic Design"],
  },
  {
    categoryPill: "Web & UX/UI Design",
    title: "Etsy Dashboard UX Review: Research & Usability Improvement",
    description:
      "An independent UX research project focused on identifying usability issues within the Etsy seller dashboard and proposing improvements to make key information, sales data and navigation clearer and easier to use.",
    href: "https://www.behance.net/gallery/254162967/Etsy-Dashboard-UX-Review",
    imageSrc: "/etsy.webp",
    videoSrc: "",
    tags: ["Dashboard", "UX Research", "UX/UI", "Product Design", "Figma"],
  },
  {
    categoryPill: "Web & UX/UI Design",
    title: "Editorial Design: Print, Publications & Visual Communication",
    description:
      "A selection of editorial and print design work spanning magazines, books, flyers and other communication materials, focused on typography, hierarchy, layout and clear visual storytelling across different formats.",
    href: "/editorial-design",
    imageSrc: "/3x/Artboard 2@3x.png",
    videoSrc: "",
    tags: ["Editorial Design", "Graphic Design", "Branding"],
    isProtected: true,
  },
  {
    categoryPill: "Web & UX/UI Design",
    title: "Structural Design: Packaging, POS & Spatial Experiences",
    description:
      "A selection of structural and spatial design work encompassing packaging, point-of-sale displays, spatial environments, and 3D collateral visual storytelling.",
    href: "/structural-design",
    imageSrc: "/structural/Artboard 1@3x.png",
    videoSrc: "",
    tags: ["Graphic Design", "Branding", "Product Design"],
    isProtected: true,
  },
  {
    categoryPill: "Web & UX/UI Design",
    title: "Logo Collection: Branding & Identity Design",
    description:
      "A curated collection of logo explorations and brand marks created for different visual identity projects, focused on logo creation, symbol development and distinct graphic approaches for memorable and versatile brand identities.",
    href: "https://www.behance.net/gallery/254163399/Logo-Collection-Branding-Identity-Design",
    imageSrc: "/branding.webp",
    videoSrc: "",
    tags: ["Logo Design", "Branding", "Graphic Design"],
  },
  {
    categoryPill: "Web & UX/UI Design",
    categoryLabel: "BRAND DESIGN",
    title: "Guau: Logo Design & Brand Exploration",
    description:
      "A playful logo identity developed through sketching, concept exploration and refinement. The project documents the complete logo creation process and introduces the visual direction of the wider brand.",
    href: "https://www.behance.net/gallery/166638739/Guag-refreshed",
    imageSrc: "/behance-guau.png",
    videoSrc: "",
    tags: ["Logo Design", "Branding", "Graphic Design"],
  },
  {
    categoryPill: "Web & UX/UI Design",
    categoryLabel: "BRAND IDENTITY",
    title: "Dreams Gourmet Coffee: Brand Identity",
    description:
      "A complete visual identity created for a gourmet coffee brand in Portugal. The project includes the logo, supporting graphics and a flexible pattern system designed for packaging, cups and other café applications.",
    href: "https://www.behance.net/gallery/166638641/Gourmet-Coffee",
    imageSrc: "/behance-dreams.webp",
    videoSrc: "",
    tags: ["Branding", "Graphic Design", "Logo Design"],
  },
  {
    categoryPill: "Web & UX/UI Design",
    categoryLabel: "BRAND IDENTITY",
    title: "The Home Theory: Property Staging Rebrand",
    description:
      "A complete brand refresh for a property staging business, transforming its previous identity into a more refined and editorial visual system. The project includes the logo, typography, colour palette, patterns and branded applications.",
    href: "https://www.behance.net/gallery/253817995/The-Home-Theory-Editorial-Property-Staging-Branding",
    imageSrc: "/HT.webp",
    videoSrc: "",
    tags: ["Branding", "Editorial Design", "Graphic Design"],
  },
];

