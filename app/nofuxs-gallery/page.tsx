import type { Metadata } from "next";
import NoFuxsGalleryClient from "./NofuxsGalleryClient";
import { getPersonSchema, getProjectSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "NoFuxs Gallery: Mobile Art Platform | Flor Requejo",
  description:
    "A mobile-first artist portfolio and gallery voting app that tackles ID validation friction, vision limitations, and upload anxiety to allow regional Auckland creators to secure physical gallery exhibitions.",
  openGraph: {
    title: "NoFuxs Gallery: Mobile Art Platform | Flor Requejo",
    description:
      "A mobile-first artist portfolio and gallery voting app that tackles ID validation friction, vision limitations, and upload anxiety to allow regional Auckland creators to secure physical gallery exhibitions.",
    url: "https://flor-portfolio-flax.vercel.app/nofuxs-gallery",
    siteName: "Flor Requejo Portfolio",
    type: "article",
  },
};

export default function NoFuxsGalleryPage() {
  const personSchema = getPersonSchema();
  const projectSchema = getProjectSchema({
    title: "NoFuxs Gallery: Mobile Art Platform",
    description: "A mobile-first artist portfolio and gallery voting app designed to help local artists secure physical gallery exhibitions.",
    path: "/nofuxs-gallery",
    tags: ["UX/UI Design", "Product Design", "Auckland Art"],
    image: "/nofuxs-gallery-hero.png"
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
      <NoFuxsGalleryClient />
    </>
  );
}
