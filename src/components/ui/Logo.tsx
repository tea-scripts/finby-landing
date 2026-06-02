interface LogoProps {
  className?: string;
  /** Hide the wordmark, render the coin mark only. */
  markOnly?: boolean;
}

export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        aria-hidden
        className="shrink-0"
      >
        <circle
          cx="14"
          cy="14"
          r="13"
          fill="var(--color-accent)"
          stroke="var(--color-border-accent)"
        />
        <circle cx="14" cy="14" r="9.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.5" />
        <path
          d="M11 9.5h4.4a2.6 2.6 0 0 1 0 5.2H11V9.5Zm0 5.2h4.9a2.65 2.65 0 0 1 0 5.3H11v-5.3Z"
          fill="#ffffff"
        />
      </svg>
      {markOnly ? null : (
        <span
          className="text-lg font-extrabold tracking-tight"
          style={{ color: "var(--color-text-primary)", letterSpacing: "-0.02em" }}
        >
          Budgy
        </span>
      )}
    </span>
  );
}
