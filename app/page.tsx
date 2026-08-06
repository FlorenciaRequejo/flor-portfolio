import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getPersonSchema, getWebsiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Flor Requejo | Senior Product Designer & Systems Developer",
  description:
    "Creative thinking, grounded in execution. Portfolio of Flor Requejo — Senior Product Designer, UX/UI Researcher, Systems Architect & AI Automation Specialist.",
  openGraph: {
    title: "Flor Requejo | Senior Product Designer & Systems Developer",
    description: "Creative thinking, grounded in execution. Design systems, UX/UI, web architecture, and AI content automation.",
    url: "https://flor-portfolio-flax.vercel.app",
    siteName: "Flor Requejo Portfolio",
    type: "website",
  },
};

export default function Home() {
  const personSchema = getPersonSchema();
  const websiteSchema = getWebsiteSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <HomeClient />
    </>
  );
}