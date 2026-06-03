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

type Ctx = ReturnType<ReturnType<typeof createCanvas>["getContext"]>;

/**
 * Draws the Finby "fin" mark — a white upward-trend path with a node, on a
 * rounded #1d6ef5 square — into the box (x, y, size). Mirrors the inline SVG
 * (viewBox 0 0 32 32) used by the in-app <Logo /> so brand assets stay in sync.
 */
function drawFin(ctx: Ctx, x: number, y: number, size: number): void {
  const k = size / 32;
  const px = (n: number) => x + n * k;
  const py = (n: number) => y + n * k;

  ctx.fillStyle = ACCENT;
  ctx.beginPath();
  ctx.roundRect(x, y, size, size, 8 * k);
  ctx.fill();

  ctx.strokeStyle = WHITE;
  ctx.lineWidth = 2.4 * k;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  ctx.moveTo(px(9), py(21));
  ctx.lineTo(px(16), py(9));
  ctx.lineTo(px(19), py(15));
  ctx.lineTo(px(23), py(11));
  ctx.stroke();

  ctx.fillStyle = WHITE;
  ctx.beginPath();
  ctx.arc(px(23), py(11), 1.8 * k, 0, Math.PI * 2);
  ctx.fill();
}

/** 1200×630 Open Graph card. */
function buildOg(): Buffer {
  const w = 1200;
  const h = 630;
  const canvas = createCanvas(w, h);
  const ctx = canvas.getContext("2d");

  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, w, h);

  // Accent glow behind the lockup for depth.
  const glow = ctx.createRadialGradient(w / 2, 280, 40, w / 2, 280, 520);
  glow.addColorStop(0, "rgba(29, 110, 245, 0.22)");
  glow.addColorStop(1, "rgba(29, 110, 245, 0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Horizontal lockup: fin mark + "Finby" wordmark, centered as a group.
  const markSize = 160;
  const gap = 36;
  const lockupY = 290;

  ctx.font = "900 96px sans-serif";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  const wordmark = "Finby";
  const textWidth = ctx.measureText(wordmark).width;
  const groupWidth = markSize + gap + textWidth;
  const startX = (w - groupWidth) / 2;

  drawFin(ctx, startX, lockupY - markSize / 2, markSize);

  ctx.fillStyle = WHITE;
  ctx.fillText(wordmark, startX + markSize + gap, lockupY);

  ctx.fillStyle = ACCENT;
  ctx.font = "700 42px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "alphabetic";
  ctx.fillText("Stop tracking. Start talking.", w / 2, 440);

  return canvas.toBuffer("image/png");
}

/** Square app icon: the fin mark filling the full canvas. */
function buildIcon(size: number): Buffer {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext("2d");
  drawFin(ctx, 0, 0, size);
  return canvas.toBuffer("image/png");
}

write("og-image.png", buildOg());
write("favicon-16x16.png", buildIcon(16));
write("favicon-32x32.png", buildIcon(32));
write("apple-touch-icon.png", buildIcon(180));
write("icon-192.png", buildIcon(192));
write("icon-512.png", buildIcon(512));
write("favicon.ico", buildIcon(32));
