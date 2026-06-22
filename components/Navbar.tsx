"use client";

import { useState, useEffect, forwardRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface NavbarProps {
  manualScrollControl?: boolean;
}

export const Navbar = forwardRef<HTMLElement, NavbarProps>(
  ({ manualScrollControl = false }, ref) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
      if (manualScrollControl) return;

      const handleScroll = () => {
        if (window.scrollY > 50) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
        }
      };

      window.addEventListener("scroll", handleScroll);
      handleScroll(); // Check initial scroll position

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }, [manualScrollControl]);

    // Use internal state if scroll is not manually controlled by parent
    const scrolledClass = manualScrollControl ? "" : isScrolled ? "is-scrolled" : "";

    return (
      <nav
        ref={ref}
        className={`nav-outline-pill ${scrolledClass} ${isMenuOpen ? "is-open" : ""}`}
      >
        {/* Top Row: Container that sits at the top of the nav pill */}
        <div className="flex justify-between items-center w-full">
          {/* Profile Section */}
          <div className="flex items-center gap-[10px]">
            <Link href="/" className="flex items-center gap-[10px] select-none">
              <Image
                src="/Florencia-500x500.jpg"
                alt="Flor Requejo"
                width={50}
                height={50}
                priority
                className="w-[50px] h-[50px] rounded-full object-cover border border-primary/20"
              />
              <span className="text-primary font-serif text-[15px] tracking-wide leading-[1.05] font-normal hover:opacity-80 transition-opacity duration-200 block text-left">
                Flor
                <br />
                Requejo
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex gap-6 md:gap-12 font-sans items-center">
            {[
              { label: "About", href: "/#about" },
              { label: "Projects", href: "/#projects" },
              { label: "Contact", href: "/#contact" },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="text-primary font-sans text-[10px] md:text-xs tracking-[0.15em] uppercase hover:opacity-60 transition-opacity duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CV Download Button */}
          <div className="hidden md:block">
            <a
              href="#online-cv"
              className="h-[50px] px-6 rounded-full flex items-center justify-center bg-primary text-[#1B237A] font-sans font-semibold text-[10px] md:text-xs uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
            >
              Download CV
            </a>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden w-[50px] h-[50px] rounded-full flex flex-col items-center justify-center gap-[5px] border border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors duration-200 focus:outline-none"
            aria-label="Toggle Menu"
          >
            <span
              className={`w-6 h-[2px] bg-primary transition-all duration-300 ${isMenuOpen ? "transform rotate-45 translate-y-[8px]" : ""
                }`}
            />
            <span
              className={`w-6 h-[2px] bg-primary transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""
                }`}
            />
            <span
              className={`w-6 h-[2px] bg-primary transition-all duration-300 ${isMenuOpen ? "transform -rotate-45 -translate-y-[8px]" : ""
                }`}
            />
          </button>
        </div>

        {/* Mobile Navigation Dropdown Block */}
        <div
          className={`md:hidden flex flex-col items-center gap-6 mt-6 w-full border-t border-primary/10 pt-6 transition-all duration-500 ${isMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
            }`}
        >
          <div className="flex flex-col items-center gap-4 w-full">
            {[
              { label: "About", href: "/#about" },
              { label: "Projects", href: "/#projects" },
              { label: "Contact", href: "/#contact" },
            ].map((item) => (
              <Link
                key={item.label}
                onClick={() => setIsMenuOpen(false)}
                href={item.href}
                className="text-primary font-sans text-xs tracking-[0.2em] uppercase hover:opacity-60 transition-opacity duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <a
            href="#online-cv"
            onClick={() => setIsMenuOpen(false)}
            className="w-full max-w-[200px] h-[44px] rounded-full flex items-center justify-center bg-primary text-[#1B237A] font-sans font-semibold text-xs uppercase tracking-wider hover:opacity-90 transition-opacity duration-200"
          >
            Download CV
          </a>
        </div>
      </nav>
    );
  }
);

Navbar.displayName = "Navbar";
export default Navbar;
