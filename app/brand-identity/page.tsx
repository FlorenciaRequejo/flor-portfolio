import type { Metadata } from "next";
import BrandIdentityClient from "./BrandIdentityClient";
import { getPersonSchema, getProjectSchemaByHref } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Brand Identity: Visual Language & Design System | Flor Requejo",
  description:
    "Explore the design of Bite's brand identity, custom logo, visual language, and design system developed by Flor Requejo.",
  openGraph: {
    title: "Brand Identity: Visual Language & Design System | Flor Requejo",
    description:
      "Explore the design of Bite's brand identity, custom logo, visual language, and design system developed by Flor Requejo.",
    url: "https://flor-portfolio-flax.vercel.app/brand-identity",
    siteName: "Flor Requejo Portfolio",
    type: "article",
  },
};

export default function BrandIdentityPage() {
  const personSchema = getPersonSchema();
  const projectSchema = getProjectSchemaByHref("/brand-identity");

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
      <BrandIdentityClient />
    </>
  );
}
