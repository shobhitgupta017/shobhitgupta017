/**
 * Generates the lightweight SVG placeholder artwork referenced by src/data/products.ts.
 * Replace public/products/<id>.svg with real photography when it is available.
 *
 * Usage: node scripts/generate-product-images.mjs
 */
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const source = readFileSync(join(root, "src/data/products.ts"), "utf8");
const outDir = join(root, "public/products");

const palettes = {
  "fruits-vegetables": ["#ecfdf5", "#d1fae5", "#065f46"],
  "dairy-bakery": ["#eff6ff", "#dbeafe", "#1e3a8a"],
  "staples-grains": ["#fffbeb", "#fef3c7", "#92400e"],
  snacks: ["#fff1f2", "#ffe4e6", "#9f1239"],
  beverages: ["#f5f3ff", "#ede9fe", "#4c1d95"],
  household: ["#ecfeff", "#cffafe", "#155e75"],
  "personal-care": ["#fdf4ff", "#fae8ff", "#86198f"],
};

const blocks = source.split("  p({").slice(1);
const entries = blocks.map((block) => ({
  id: block.match(/id:\s*"([^"]+)"/)?.[1],
  name: block.match(/name:\s*"([^"]+)"/)?.[1],
  emoji: block.match(/emoji:\s*"([^"]+)"/)?.[1],
  category: block.match(/category:\s*"([^"]+)"/)?.[1],
}));

mkdirSync(outDir, { recursive: true });

for (const entry of entries) {
  if (!entry.id) continue;
  const [from, to, ink] = palettes[entry.category] ?? ["#f8fafc", "#e2e8f0", "#0f172a"];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="600" height="600" role="img" aria-label="${entry.name}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${from}"/>
      <stop offset="100%" stop-color="${to}"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="42%" r="42%">
      <stop offset="0%" stop-color="#ffffff" stop-opacity="0.95"/>
      <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="600" height="600" fill="url(#bg)"/>
  <circle cx="300" cy="255" r="185" fill="url(#glow)"/>
  <text x="300" y="330" font-size="220" text-anchor="middle" dominant-baseline="middle">${entry.emoji ?? "🛒"}</text>
  <text x="300" y="520" font-size="30" font-family="Helvetica, Arial, sans-serif" font-weight="600" fill="${ink}" text-anchor="middle" opacity="0.75">${entry.name?.replace(/&/g, "&amp;")}</text>
</svg>
`;
  writeFileSync(join(outDir, `${entry.id}.svg`), svg);
}

console.log(`Generated ${entries.length} product images in public/products`);
