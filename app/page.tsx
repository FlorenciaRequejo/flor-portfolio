import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/hero/HeroSection";

const SelectedWork = dynamic(() => import("@/components/hero/SelectedWork"));
const ProcessSection = dynamic(() => import("@/components/hero/ProcessSection"));
const FooterSection = dynamic(() => import("@/components/hero/FooterSection"));

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <SelectedWork />
        <ProcessSection />
        <FooterSection />
      </main>
    </>
  );
}