const FALLBACK_SITE_URL = "https://finby.app";

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

/** The live Finby web app. Every primary CTA on the landing page points here. */
export const appUrl = "https://chat.finby.app";

/**
 * The live waitlist counter is only rendered once real signups cross this
 * threshold. Below it, a tiny real number reads as weak social proof, so the
 * UI shows a "be one of the first" message instead — honest either way. We
 * never fabricate or pad the count.
 */
export const WAITLIST_DISPLAY_THRESHOLD = 50;
