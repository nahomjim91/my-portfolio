// /components/common/Header.tsx
"use client";

import * as React from "react";
import Link from "next/link";
import { nav } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const [active, setActive] = React.useState<string>("about");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const ids = nav.map((n) => n.id);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.2, 0.5, 1] }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all ",
        scrolled &&
          "border-[var(--border)]/80 bg-[color:var(--primary)]/70 backdrop-blur-md dark:bg-[color:var(--dark-primary)]/70"
      )}
    >
      <div className="flex justify-between items-center px-4 sm:px-6 lg:px-8 h-16">
        {/* Logo - responsive design */}
        <Link
          href="#hero"
          className="text-2xl md:text-3xl font-light tracking-wider hover:text-accent transition-colors duration-300"
        >
          <span className="">SELIHOM</span>
        </Link>

        {/* Right side - Theme toggle and mobile menu */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

