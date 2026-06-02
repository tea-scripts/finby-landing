"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";

export function NavBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        backgroundColor: scrolled
          ? "color-mix(in srgb, var(--color-bg) 88%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `1px solid ${scrolled ? "var(--color-border)" : "transparent"}`,
        transition:
          "background-color 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
      }}
    >
      <nav className="section-shell flex items-center justify-between py-4">
        <a href="#top" aria-label="Budgy home">
          <Logo />
        </a>
        <span className="pill">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: "var(--color-accent)" }}
            aria-hidden
          />
          Coming soon
        </span>
      </nav>
    </header>
  );
}
