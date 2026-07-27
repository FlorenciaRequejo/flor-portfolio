import type { Metadata } from "next";
import WebDesignClient from "./WebDesignClient";
import { getPersonSchema, getProjectSchemaByHref } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Automated Media Publishing Platform | Flor Requejo",
  description:
    "Case study of rebuilding a fragile legacy Māori news platform into a scalable publishing ecosystem by redesigning its architecture and automating workflows.",
  openGraph: {
    title: "Automated Media Publishing Platform | Flor Requejo",
    description:
      "Case study of rebuilding a fragile legacy Māori news platform into a scalable publishing ecosystem by redesigning its architecture and automating workflows.",
    url: "https://flor-portfolio-flax.vercel.app/web-design-and-development",
    siteName: "Flor Requejo Portfolio",
    type: "article",
  },
};

export default function WebDesignAndDevelopmentPage() {
  const personSchema = getPersonSchema();
  const projectSchema = getProjectSchemaByHref("/web-design-and-development");

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
      <WebDesignClient />
    </>
  );
}
