import dynamic from "next/dynamic";
import HeroSection from "@/components/hero/HeroSection";

const SelectedWork = dynamic(() => import("@/components/hero/SelectedWork"));

export default function Home() {
  return (
    <main>
      <HeroSection />
      <SelectedWork />
    </main>
  );
}
