const FALLBACK_SITE_URL = "https://budgy.app";

/**
 * Resolves NEXT_PUBLIC_SITE_URL to a valid absolute origin (no trailing slash).
 * Falls back to the production domain if the env var is missing OR malformed —
 * a bad value (e.g. "lol") must never crash the build via `new URL()`.
 */
function resolveSiteUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return FALLBACK_SITE_URL;
  try {
    const url = new URL(raw);
    return (url.origin + url.pathname).replace(/\/$/, "");
  } catch {
    if (process.env.NODE_ENV !== "production") {
      console.warn(
        `[site] NEXT_PUBLIC_SITE_URL="${raw}" is not a valid URL — falling back to ${FALLBACK_SITE_URL}`,
      );
    }
    return FALLBACK_SITE_URL;
  }
}

export const siteUrl = resolveSiteUrl();
