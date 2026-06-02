/**
 * Generates all brand image assets into /public:
 *   - og-image.png (1200×630)
 *   - favicon-16x16.png, favicon-32x32.png
 *   - apple-touch-icon.png (180×180)
 *   - icon-192.png, icon-512.png (PWA)
 *   - favicon.ico (32×32 PNG bytes — modern browsers accept this)
 *
 * Run with: pnpm generate:assets
 */
import { createCanvas } from "canvas";
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const PUBLIC = join(process.cwd(), "public");
mkdirSync(PUBLIC, { recursive: true });

const BG = "#06101f";
const ACCENT = "#1d6ef5";
const WHITE = "#ffffff";

function write(name: string, buf: Buffer): void {
  writeFileSync(join(PUBLIC, name), buf);
  // eslint-disable-next-line no-console
  console.log("✓ wrote", name);
}

/** 1200×630 Open Graph card. */
function buildOg(): Buffer {
  const w = 1200;
  const h = 630;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);

  // Accent glow behind the wordmark for depth.
  const glow = ctx.createRadialGradient(w / 2, 250, 40, w / 2, 250, 520);
  glow.addColorStop(0, "rgba(29, 110, 245, 0.22)");
  glow.addColorStop(1, "rgba(29, 110, 245, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";

  ctx.fillStyle = WHITE;
  ctx.font = "900 96px sans-serif";
  ctx.fillText("Budgy", w / 2, 320);

  ctx.fillStyle = ACCENT;
  ctx.font = "700 42px sans-serif";
  ctx.fillText("Stop tracking. Start talking.", w / 2, 400);

  return canvas.toBuffer("image/png");
}

/** Square app icon: solid accent field with a white "B". */
function buildIcon(size: number): Buffer {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = ACCENT;
  ctx.fillRect(0, 0, size, size);

  ctx.fillStyle = WHITE;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.font = `900 ${Math.round(size * 0.62)}px sans-serif`;
  ctx.fillText("B", size / 2, size / 2 + size * 0.04);

  return canvas.toBuffer("image/png");
}

write("og-image.png", buildOg());
write("favicon-16x16.png", buildIcon(16));
write("favicon-32x32.png", buildIcon(32));
write("apple-touch-icon.png", buildIcon(180));
write("icon-192.png", buildIcon(192));
write("icon-512.png", buildIcon(512));
write("favicon.ico", buildIcon(32));
