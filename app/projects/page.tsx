import type { Metadata } from "next";
import ProjectsClient from "./ProjectsClient";
import { getPersonSchema, getProjectSchemaByHref, BASE_URL } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Projects Portfolio | Flor Requejo",
  description:
    "Explore Flor Requejo's portfolio of selected works, including automated media platforms, branding systems, UX/UI case studies, and SEO strategy systems.",
  openGraph: {
    title: "Projects Portfolio | Flor Requejo",
    description:
      "Explore Flor Requejo's portfolio of selected works, including automated media platforms, branding systems, UX/UI case studies, and SEO strategy systems.",
    url: "https://flor-portfolio-flax.vercel.app/projects",
    siteName: "Flor Requejo Portfolio",
    type: "website",
  },
};

export default function ProjectsPage() {
  const personSchema = getPersonSchema();
  
  // Create an ItemList schema representing all the projects
  const projectsListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Flor Requejo Selected Projects",
    "description": "A collection of design, tech, and product development case studies.",
    "url": `${BASE_URL}/projects`,
    "numberOfItems": 4,
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "item": getProjectSchemaByHref("/web-design-and-development")
      },
      {
        "@type": "ListItem",
        "position": 2,
        "item": getProjectSchemaByHref("/brand-identity")
      },
      {
        "@type": "ListItem",
        "position": 3,
        "item": getProjectSchemaByHref("/ux-design")
      },
      {
        "@type": "ListItem",
        "position": 4,
        "item": getProjectSchemaByHref("/continuous-content")
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectsListSchema) }}
      />
      <ProjectsClient />
    </>
  );
}
