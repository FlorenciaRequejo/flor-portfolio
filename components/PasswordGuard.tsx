"use client";

import React from "react";
import { usePasswordProtection } from "@/context/PasswordContext";
import Navbar from "@/components/Navbar";
import FooterSection from "@/components/hero/FooterSection";

export default function PasswordGuard({
  children,
  title = "Protected Case Study",
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const { isUnlocked, openPasswordModal } = usePasswordProtection();

  if (isUnlocked) {
    return <>{children}</>;
  }

  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col justify-between selection:bg-primary selection:text-background">
      <Navbar />

      <main className="w-full flex-grow flex items-center justify-center pt-32 pb-20 px-4">
        <div className="mx-auto max-w-lg w-full bg-white rounded-[32px] md:rounded-[44px] p-8 md:p-12 text-center border border-border shadow-[0_20px_50px_rgba(0,0,0,0.06)] space-y-6">
          <div className="w-16 h-16 rounded-full bg-[#1B237A]/10 mx-auto flex items-center justify-center text-[#1B237A]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
          </div>

          <div className="space-y-2">
            <span className="text-[#D946EF] font-sans text-[11px] md:text-[12px] tracking-[4px] uppercase font-semibold">
              PASSWORD PROTECTED
            </span>
            <h1 className="font-serif text-[32px] md:text-[40px] leading-tight text-[#1B237A] font-normal tracking-tight">
              {title}
            </h1>
            <p className="font-sans text-[14px] leading-relaxed text-[#D946EF] font-medium max-w-sm mx-auto pt-2">
              This case study contains confidential work. Please insert the password to access the full case study.
            </p>
            <a
              href="mailto:florencia.requejo@gmail.com"
              className="inline-block font-sans text-[13px] text-[#D946EF] underline hover:opacity-80 transition-opacity pt-2"
            >
              Don't have the password? Request access via email
            </a>
          </div>

          <button
            onClick={() => openPasswordModal()}
            className="w-full h-[52px] rounded-full bg-primary text-background font-sans font-semibold text-[12px] uppercase tracking-wider hover:opacity-90 transition-opacity duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-4 h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <span>Insert Password</span>
          </button>
        </div>
      </main>

      <FooterSection />
    </div>
  );
}
