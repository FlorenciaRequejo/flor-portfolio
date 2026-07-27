import type { Metadata } from "next";
import ConceptToLaunchClient from "./ConceptToLaunchClient";
import { getPersonSchema, getProjectSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Concept to Launch: AI-Powered Auditing Platform | Flor Requejo",
  description:
    "An AI-powered website audit platform that automatically evaluates performance, accessibility, SEO, and visual consistency, translating metrics into clear business tasks.",
  openGraph: {
    title: "Concept to Launch: AI-Powered Auditing Platform | Flor Requejo",
    description:
      "An AI-powered website audit platform that automatically evaluates performance, accessibility, SEO, and visual consistency, translating metrics into clear business tasks.",
    url: "https://flor-portfolio-flax.vercel.app/concept-to-launch",
    siteName: "Flor Requejo Portfolio",
    type: "article",
  },
};

export default function ConceptToLaunchPage() {
  const personSchema = getPersonSchema();
  const projectSchema = getProjectSchema({
    title: "Concept to Launch: AI-Powered Auditing Platform",
    description: "An AI-powered website audit platform that automatically evaluates performance, accessibility, SEO, and visual consistency.",
    path: "/concept-to-launch",
    tags: ["AI Automation", "Web Auditing", "Product Design"],
    image: "/laptop.jpg"
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <ConceptToLaunchClient />
    </>
  );
}
