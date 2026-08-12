import type { Metadata } from "next";
import EditorialDesignClient from "./EditorialDesignClient";
import { getPersonSchema, getProjectSchemaByHref } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Editorial Design: Print, Publications & Visual Communication | Flor Requejo",
  description:
    "A selection of editorial and print design work spanning magazines, books, flyers and other communication materials, focused on typography, hierarchy, layout and clear visual storytelling across different formats.",
  openGraph: {
    title: "Editorial Design: Print, Publications & Visual Communication | Flor Requejo",
    description:
      "A selection of editorial and print design work spanning magazines, books, flyers and other communication materials, focused on typography, hierarchy, layout and clear visual storytelling across different formats.",
    url: "https://flor-portfolio-flax.vercel.app/editorial-design",
    siteName: "Flor Requejo Portfolio",
    type: "article",
  },
};

export default function EditorialDesignPage() {
  const personSchema = getPersonSchema();
  const projectSchema = getProjectSchemaByHref("/editorial-design");

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
      <EditorialDesignClient />
    </>
  );
}
