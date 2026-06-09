"use client";

import { useEffect, useState } from "react";
import { Logo } from "@/components/ui/Logo";
import { appUrl } from "@/lib/site";

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
        <a href="#top" aria-label="Finby home">
          <Logo />
        </a>
        <a
          className="btn-accent"
          href={appUrl}
          style={{ padding: "0.6rem 1.1rem", fontSize: "14px" }}
        >
          Get started free
        </a>
      </nav>
    </header>
  );
}
