import type { Metadata } from "next";
import ContinuousContentClient from "./ContinuousContentClient";
import { getPersonSchema, getProjectSchemaByHref } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Proactive Content Creation from an SEO Strategy | Flor Requejo",
  description:
    "An AI-powered content engine connecting local search strategy to automated article generation, custom graphics, and notification approval loops developed by Flor Requejo.",
  openGraph: {
    title: "Proactive Content Creation from an SEO Strategy | Flor Requejo",
    description:
      "An AI-powered content engine connecting local search strategy to automated article generation, custom graphics, and notification approval loops developed by Flor Requejo.",
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
