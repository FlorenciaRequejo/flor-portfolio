import type { Metadata } from "next";
import StructuralDesignClient from "./StructuralDesignClient";
import { getPersonSchema, getProjectSchemaByHref } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Structural Design: Packaging, POS & Spatial Experiences | Flor Requejo",
  description:
    "A selection of structural and spatial design work encompassing packaging, point-of-sale displays, spatial environments, and 3D collateral visual storytelling.",
  openGraph: {
    title: "Structural Design: Packaging, POS & Spatial Experiences | Flor Requejo",
    description:
      "A selection of structural and spatial design work encompassing packaging, point-of-sale displays, spatial environments, and 3D collateral visual storytelling.",
    url: "https://flor-portfolio-flax.vercel.app/structural-design",
    siteName: "Flor Requejo Portfolio",
    type: "article",
  },
};

export default function StructuralDesignPage() {
  const personSchema = getPersonSchema();
  const projectSchema = getProjectSchemaByHref("/structural-design");

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
      <StructuralDesignClient />
    </>
  );
}
