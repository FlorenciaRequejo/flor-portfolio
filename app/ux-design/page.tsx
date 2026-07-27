import type { Metadata } from "next";
import UxDesignClient from "./UxDesignClient";
import { getPersonSchema, getProjectSchemaByHref } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Bite Mobile App UX/UI Case Study | Flor Requejo",
  description:
    "Explore the UX design process (Empathize, Define, Ideate, Prototype, and Test) for Bite, a grocery budgeting and trading mobile app developed by Flor Requejo.",
  openGraph: {
    title: "Bite Mobile App UX/UI Case Study | Flor Requejo",
    description:
      "Explore the UX design process (Empathize, Define, Ideate, Prototype, and Test) for Bite, a grocery budgeting and trading mobile app developed by Flor Requejo.",
    url: "https://flor-portfolio-flax.vercel.app/ux-design",
    siteName: "Flor Requejo Portfolio",
    type: "article",
  },
};

export default function UXDesignPage() {
  const personSchema = getPersonSchema();
  const projectSchema = getProjectSchemaByHref("/ux-design");

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
      <UxDesignClient />
    </>
  );
}
