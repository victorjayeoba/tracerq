"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useSmoothScroll from "@/hooks/use-smooth-scroll";
import Link from "next/link";

interface NavItem {
  label: string;
  href: string;
  section: string;
}

export default function StickyNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Initialize smooth scrolling for anchor links
  useSmoothScroll();

  const navItems: NavItem[] = [
    { label: "Home", href: "#hero", section: "hero" },
    { label: "Solutions", href: "#solutions", section: "solutions" },
    { label: "How it Works", href: "#how-it-works", section: "how-it-works" },
    { label: "Use Cases", href: "#use-cases", section: "use-cases" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }

      // Check which section is in view
      const sections = document.querySelectorAll("section[id]");
      const scrollPosition = window.scrollY + 100; // Add offset for the header

      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute("id") || "";

        if (
          scrollPosition >= sectionTop &&
          scrollPosition <= sectionTop + sectionHeight
        ) {
          setActiveSection(sectionId);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-background/95 backdrop-blur-sm shadow-sm" 
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <div className="flex items-center space-x-2">
          <div className="h-10 flex items-center">
            <img src="/tracer-logo.svg" alt="tЯacer" className="h-10" />
          </div>
        </div>

        <nav className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <a
              key={item.section}
              href={item.href}
              className={`font-semibold transition ${
                activeSection === item.section
                  ? "text-accent"
                  : "text-foreground hover:text-accent"
              }`}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex">
          <Button 
            asChild
            className="bg-accent text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/signin">Trace</Link>
          </Button>
        </div>

        <button className="md:hidden text-foreground hover:text-accent">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
