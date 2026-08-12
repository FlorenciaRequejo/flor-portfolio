import type { Metadata } from "next";
import GraphicDesignClient from "./GraphicDesignClient";
import { getPersonSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Senior Graphic & Digital Designer | Flor Requejo",
  description:
    "Senior graphic & digital designer with 15+ years across branding, editorial, print, web and visual communication. Explore selected branding, editorial, and web visual design work.",
  openGraph: {
    title: "Senior Graphic & Digital Designer | Flor Requejo",
    description:
      "Senior graphic & digital designer with 15+ years across branding, editorial, print, web and visual communication.",
    url: "https://flor-portfolio-flax.vercel.app/graphic-design",
    siteName: "Flor Requejo Portfolio",
    type: "website",
  },
};

export default function GraphicDesignPage() {
  const personSchema = getPersonSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <GraphicDesignClient />
    </>
  );
}
