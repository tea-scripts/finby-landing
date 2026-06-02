import { Logo } from "@/components/ui/Logo";

const LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Contact", href: "#" },
];

export function Footer() {
  return (
    <footer
      className="py-12"
      style={{ borderTop: "1px solid var(--color-border)" }}
    >
      <div className="section-shell">
        <div className="flex flex-col items-center gap-2 text-center">
          <Logo />
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            Stop tracking. Start talking.
          </p>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm" style={{ color: "var(--color-text-muted)" }}>
            © 2026 Budgy. All rights reserved.
          </p>
          <nav className="flex gap-6">
            {LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors"
                style={{ color: "var(--color-text-secondary)" }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
