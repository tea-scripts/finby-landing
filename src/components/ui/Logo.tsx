interface LogoProps {
  className?: string;
  /** Hide the wordmark, render the fin mark only. */
  markOnly?: boolean;
}

export function Logo({ className, markOnly = false }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg
        viewBox="0 0 32 32"
        width="28"
        height="28"
        aria-hidden
        className="shrink-0"
      >
        <rect width="32" height="32" rx="8" fill="#1d6ef5" />
        <path
          d="M9 21 L16 9 L19 15 L23 11"
          fill="none"
          stroke="white"
          strokeWidth="2.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23" cy="11" r="1.8" fill="white" />
      </svg>
      {markOnly ? null : (
        <span
          className="text-lg"
          style={{ color: "#1d6ef5", fontWeight: 800, letterSpacing: "-1px" }}
        >
          Finby
        </span>
      )}
    </span>
  );
}
