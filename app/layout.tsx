import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
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
  title: "Flor Requejo",
  description:
    "Creative thinking, grounded in execution. Design, tech and product.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${bagossExtended.variable}`} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
