import type { Config } from "tailwindcss";

// Tailwind CSS v4 is CSS-first: the theme (brand tokens, fonts, keyframes) lives
// in `src/app/globals.css` via `@theme` and `:root` CSS variables. This file only
// scopes content sources for tooling/editor integrations. Do not duplicate tokens here.
const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
};

export default config;
