"use client";

import MorphingLines from "./MorphingLines";

export default function HeroSection() {
  return (
    <>
      <HeroSectionInner />
    </>
  );
}

function HeroSectionInner() {
  return (
    <div className="relative w-full min-h-screen">
      <MorphingLines />
    </div>
  );
}
