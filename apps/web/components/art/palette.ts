import type { Palette } from "@/lib/commerce/types";

/** Tailwind class lookups (full strings so Tailwind can see them). */
export const paletteBg: Record<Palette, string> = {
  lavender: "bg-lavender",
  butter: "bg-butter",
  pink: "bg-pink",
  mint: "bg-mint",
  sky: "bg-sky",
};

export const paletteBgDeep: Record<Palette, string> = {
  lavender: "bg-lavender-deep",
  butter: "bg-butter-deep",
  pink: "bg-pink-deep",
  mint: "bg-mint-deep",
  sky: "bg-sky-deep",
};

export const paletteText: Record<Palette, string> = {
  lavender: "text-lavender-deep",
  butter: "text-butter-deep",
  pink: "text-pink-deep",
  mint: "text-mint-deep",
  sky: "text-sky-deep",
};

/** Raw values for contexts where CSS variables are unavailable (OG images). */
export const paletteHex: Record<Palette, { base: string; deep: string }> = {
  lavender: { base: "#cdbcff", deep: "#a891f5" },
  butter: { base: "#ffe68f", deep: "#f7cf4a" },
  pink: { base: "#ffbdd3", deep: "#ff8fb6" },
  mint: { base: "#c3ecdc", deep: "#7fd4b4" },
  sky: { base: "#c9e6ff", deep: "#8ec5ff" },
};

export const PALETTES: Palette[] = ["lavender", "butter", "pink", "mint", "sky"];

export function nextPalette(p: Palette, step = 1): Palette {
  const i = PALETTES.indexOf(p);
  return PALETTES[(i + step + PALETTES.length) % PALETTES.length] ?? p;
}
