"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero/HeroSection";
import { motion } from "framer-motion";

const IndustriesSection = dynamic(() => import("@/components/hero/IndustriesSection"));
const SelectedWork = dynamic(() => import("@/components/hero/SelectedWork"));
const ProcessSection = dynamic(() => import("@/components/hero/ProcessSection"));
const FooterSection = dynamic(() => import("@/components/hero/FooterSection"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <div id="smooth-scroll-marker" className="w-full h-px pointer-events-none" />
        <IndustriesSection />
        <SelectedWork />
        <ProcessSection />
        <FooterSection />
      </main>

      {/* Slide-out entrance overlay logic */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] as const }}
        className="fixed inset-0 bg-[#1B237A] z-[9999] pointer-events-none"
      />
    </>
  );
}