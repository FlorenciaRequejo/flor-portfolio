import type { Metadata } from "next";
import ContinuousContentClient from "./ContinuousContentClient";
import { getPersonSchema, getProjectSchemaByHref } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Proactive Content Creation from an SEO Strategy | AI Engine Case Study",
  description:
    "An AI-powered content engine that connects a GEO strategy with automated article generation, custom graphics, and approval workflows with built-in notifications.",
  openGraph: {
    title: "Proactive Content Creation from an SEO Strategy | Flor Requejo",
    description:
      "An AI-powered content engine that connects a GEO strategy with automated article generation, custom graphics, and approval workflows with built-in notifications.",
    url: "https://flor-portfolio-flax.vercel.app/continuous-content",
    siteName: "Flor Requejo Portfolio",
    type: "article",
  },
};

export default function ContinuousContentPage() {
  const personSchema = getPersonSchema();
  const projectSchema = getProjectSchemaByHref("/continuous-content");

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      {projectSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
        />
      )}
      <ContinuousContentClient />
    </>
  );
}
