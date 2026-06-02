import type { ReactNode } from "react";

interface GradientTextProps {
  children: ReactNode;
  className?: string;
}

/** Renders text with the accent → light gradient (see `.text-gradient`). */
export function GradientText({ children, className }: GradientTextProps) {
  return <span className={`text-gradient ${className ?? ""}`}>{children}</span>;
}
