import type { Metadata } from "next";
import MachineReadableBrandsClient from "./MachineReadableBrandsClient";
import { getPersonSchema, getProjectSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Machine-Readable Brands | Flor Requejo",
  description:
    "Design and architecture of a software tool that bridges visual branding and programmatic workflows, translating style variables into Markdown and JSON schemas.",
  openGraph: {
    title: "Machine-Readable Brands | Flor Requejo",
    description:
      "Design and architecture of a software tool that bridges visual branding and programmatic workflows, translating style variables into Markdown and JSON schemas.",
    url: "https://flor-portfolio-flax.vercel.app/machine-readable-brands",
    siteName: "Flor Requejo Portfolio",
    type: "article",
  },
};

export default function MachineReadableBrandsPage() {
  const personSchema = getPersonSchema();
  const projectSchema = getProjectSchema({
    title: "Machine-Readable Brands",
    description: "A software tool that bridges visual branding and programmatic workflows, translating style variables into human-and-AI-friendly Markdown and JSON schemas.",
    path: "/machine-readable-brands",
    tags: ["System Architecture", "JSON Schemas", "Developer Tooling"],
    image: "/machine-readable-brands-hero.png"
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
      />
      <MachineReadableBrandsClient />
    </>
  );
}
