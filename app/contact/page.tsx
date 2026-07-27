import type { Metadata } from "next";
import ContactClient from "./ContactClient";
import { getPersonSchema } from "@/lib/schema";

export const metadata: Metadata = {
  title: "Contact Flor Requejo | Product Designer & Developer",
  description:
    "Get in touch with Flor Requejo for product design, web development, brand identity, or AI automation collaborations.",
  openGraph: {
    title: "Contact Flor Requejo | Product Designer & Developer",
    description:
      "Get in touch with Flor Requejo for product design, web development, brand identity, or AI automation collaborations.",
    url: "https://flor-portfolio-flax.vercel.app/contact",
    siteName: "Flor Requejo Portfolio",
    type: "website",
  },
};

export default function ContactPage() {
  const personSchema = getPersonSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <ContactClient />
    </>
  );
}
