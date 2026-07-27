import type { Metadata } from "next";
import AboutClient from "./AboutClient";
import { getPersonSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "About Flor Requejo | Product Designer & Developer",
  description:
    "Learn about Flor Requejo's experience in product design, UX/UI, system architecture, web development, and branding.",
  openGraph: {
    title: "About Flor Requejo | Product Designer & Developer",
    description:
      "Learn about Flor Requejo's experience in product design, UX/UI, system architecture, web development, and branding.",
    url: "https://flor-portfolio-flax.vercel.app/about",
    siteName: "Flor Requejo Portfolio",
    type: "profile",
  },
};

export default function AboutPage() {
  const personSchema = getPersonSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <AboutClient />
    </>
  );
}
