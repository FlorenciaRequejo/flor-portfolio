"use client";

import Navbar from "@/components/Navbar";
import FooterSection from "@/components/hero/FooterSection";

export default function ContactPage() {
  return (
    <div className="w-full min-h-screen bg-[#1B237A] text-[#FDABFF] selection:bg-[#FDABFF] selection:text-[#1B237A] flex flex-col justify-between">
      <Navbar />
      
      <main className="flex-grow flex flex-col justify-center">
        {/* Renders the full Contact CTA and social links as the main body of this dedicated contact page */}
        <FooterSection />
      </main>
    </div>
  );
}
