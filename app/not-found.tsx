"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-stone-950 text-stone-100 px-6">
      <div className="text-center max-w-md">
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-stone-500 mb-4 block">
          — Error 404
        </span>
        <h1 className="font-serif text-4xl md:text-5xl tracking-tight text-stone-200 mb-6 font-normal">
          Page Not Found
        </h1>
        <p className="font-mono text-[11px] md:text-xs leading-relaxed text-stone-400 mb-8 uppercase tracking-widest">
          The requested system or path could not be located.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-mono text-[11px] md:text-xs uppercase tracking-[0.2em] text-stone-200 border-b border-stone-200/30 pb-1 hover:border-stone-200 transition-colors"
        >
          Return Home
        </Link>
      </div>
    </main>
  );
}
