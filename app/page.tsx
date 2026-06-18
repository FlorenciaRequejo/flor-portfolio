import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero/HeroSection";

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
    </>
  );
}