"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type AuthNavProps = {
  currentPath: "signin" | "signup";
};

export default function AuthNav({ currentPath }: AuthNavProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if page is scrolled
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/95 backdrop-blur-sm shadow-sm"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4 md:px-8">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center gap-2">
            <img src="/tracer-logo-enhanced.svg" alt="tЯacer" className="h-10" />
          </Link>
        </div>

        <nav className="hidden md:flex space-x-6">
          <Link 
            href="/" 
            className="font-semibold transition text-foreground hover:text-accent"
          >
            Home
          </Link>
          <Link 
            href="/#solutions" 
            className="font-semibold transition text-foreground hover:text-accent"
          >
            Solutions
          </Link>
          <Link 
            href="/#how-it-works" 
            className="font-semibold transition text-foreground hover:text-accent"
          >
            How it Works
          </Link>
        </nav>

        <div className="hidden md:flex">
          {currentPath === "signin" ? (
            <Button 
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/signup">Sign Up</Link>
            </Button>
          ) : (
            <Button 
              asChild
              className="bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <Link href="/signin">Sign In</Link>
            </Button>
          )}
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
