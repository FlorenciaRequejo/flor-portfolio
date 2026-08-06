import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import Script from "next/script";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import { PasswordProtectionProvider } from "@/context/PasswordContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const bagossExtended = localFont({
  src: "../public/fonts/BagossExtended-TRIAL-Medium.otf",
  variable: "--font-serif",
  weight: "500",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://flor-portfolio-flax.vercel.app"),
  title: {
    default: "Flor Requejo | Product Designer & Systems Developer",
    template: "%s | Flor Requejo",
  },
  description:
    "Flor Requejo is a Product Designer, UX/UI Researcher, and Systems Developer specializing in brand identity, scalable web architecture, GEO strategy, and AI automation engines.",
  keywords: [
    "Flor Requejo",
    "Product Designer",
    "UX/UI Designer",
    "UX Researcher",
    "Systems Architect",
    "Web Developer",
    "Brand Identity",
    "Design Systems",
    "GEO Strategy",
    "AI Automation",
    "WordPress Development",
    "Figma",
  ],
  authors: [{ name: "Flor Requejo" }],
  creator: "Flor Requejo",
  icons: {
    icon: "/favicon.jpg",
    shortcut: "/favicon.jpg",
    apple: "/favicon.jpg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://flor-portfolio-flax.vercel.app",
    title: "Flor Requejo | Product Designer & Systems Developer",
    description:
      "Creative thinking, grounded in execution. Product Design, UX/UI, Systems Architecture, and AI Automation.",
    siteName: "Flor Requejo Portfolio",
    images: [
      {
        url: "/flor.webp",
        width: 500,
        height: 500,
        alt: "Flor Requejo - Product Designer and Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Flor Requejo | Product Designer & Systems Developer",
    description:
      "Creative thinking, grounded in execution. Product Design, UX/UI, Systems Architecture, and AI Automation.",
    images: ["/flor.webp"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bagossExtended.variable}`} suppressHydrationWarning>
      <head>
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W86RG9SS');`,
          }}
        />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W86RG9SS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <PasswordProtectionProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </PasswordProtectionProvider>
      </body>
    </html>
  );
}
