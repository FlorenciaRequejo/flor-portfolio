import type { Metadata } from "next";
import HomeClient from "./HomeClient";
import { getPersonSchema, getWebsiteSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Flor Requejo | Product Designer & Developer",
  description:
    "Creative thinking, grounded in execution. Design, tech and product. Portfolio of Flor Requejo.",
  openGraph: {
    title: "Flor Requejo | Product Designer & Developer",
    description: "Creative thinking, grounded in execution. Design, tech and product.",
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