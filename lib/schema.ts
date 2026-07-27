import { caseStudyCards } from "./caseStudies";

export const BASE_URL = "https://flor-portfolio-flax.vercel.app";

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    "name": "Flor Requejo",
    "url": BASE_URL,
    "email": "florencia.requejo@gmail.com",
    "jobTitle": "Product Designer & Developer",
    "description": "Creative thinking, grounded in execution. Design, tech and product.",
    "image": `${BASE_URL}/flor.webp`,
    "sameAs": [
      "https://www.linkedin.com/in/florencia-requejo/",
      "https://www.instagram.com/marielfreqche/",
      "https://www.behance.net/gallery/168776561/Bite-App"
    ],
    "knowsAbout": [
      "Product Design",
      "UX/UI Design",
      "System Architecture",
      "Web Design & Development",
      "SEO Strategy",
      "AI Automation",
      "Brand Identity"
    ]
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    "url": BASE_URL,
    "name": "Flor Requejo | Portfolio",
    "description": "Creative thinking, grounded in execution. Design, tech and product.",
    "publisher": {
      "@id": `${BASE_URL}/#person`
    }
  };
}

export function getProjectSchema({
  title,
  description,
  path,
  tags,
  image,
}: {
  title: string;
  description: string;
  path: string;
  tags: string[];
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${BASE_URL}${path}/#project`,
    "name": title,
    "description": description,
    "url": `${BASE_URL}${path}`,
    "image": `${BASE_URL}${image}`,
    "keywords": tags.join(", "),
    "author": {
      "@id": `${BASE_URL}/#person`
    },
    "publisher": {
      "@id": `${BASE_URL}/#person`
    }
  };
}

export function getProjectSchemaByHref(href: string) {
  const project = caseStudyCards.find(c => c.href === href);
  if (!project) return null;
  return getProjectSchema({
    title: project.title,
    description: project.description,
    path: project.href,
    tags: project.tags,
    image: project.imageSrc
  });
}
