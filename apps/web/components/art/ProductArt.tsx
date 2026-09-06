import type { ProductArt as ProductArtSpec } from "@/lib/commerce/types";
import { cn } from "@repo/ui/cn";
import { Blob } from "./Blob";
import { Doodle } from "./Doodle";
import { nextPalette } from "./palette";

export interface ProductArtProps {
  art: ProductArtSpec;
  /** 0 = hero view, 1 = zoomed, 2 = alternate palette. */
  view?: 0 | 1 | 2;
  className?: string;
  /** Show sprinkles around the doodle. */
  sprinkles?: boolean;
  title?: string;
}

/** mulberry32: tiny seeded PRNG so sprinkles are stable between server and client. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round2 = (n: number) => Math.round(n * 100) / 100;

interface Sprinkle {
  x: number;
  y: number;
  r: number;
  kind: "dot" | "star" | "sparkle";
  rot: number;
}

function makeSprinkles(seed: number, count: number): Sprinkle[] {
  const rand = rng(seed);
  const out: Sprinkle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2 + rand() * 0.6;
    const dist = 130 + rand() * 45;
    // Round so server (Node) and client (browser) render identical attribute strings.
    out.push({
      x: round2(200 + Math.cos(angle) * dist),
      y: round2(200 + Math.sin(angle) * dist),
      r: round2(5 + rand() * 7),
      kind: (["dot", "star", "sparkle"] as const)[Math.floor(rand() * 3)] ?? "dot",
      rot: round2(rand() * 360),
    });
  }
  return out;
}

function SprinkleGlyph({ s, color }: { s: Sprinkle; color: string }) {
  if (s.kind === "dot") return <circle cx={s.x} cy={s.y} r={s.r} fill={color} />;
  if (s.kind === "star") {
    const r = round2(s.r * 1.6);
    return (
      <path
        d={`M${s.x} ${s.y - r}l${r * 0.35} ${r * 0.65}h${r * 0.65}l-${r * 0.55} ${r * 0.4}l${r * 0.2} ${r * 0.7}l-${r * 0.65}-${r * 0.45}l-${r * 0.65} ${r * 0.45}l${r * 0.2}-${r * 0.7}l-${r * 0.55}-${r * 0.4}h${r * 0.65}z`}
        fill={color}
        transform={`rotate(${s.rot} ${s.x} ${s.y})`}
      />
    );
  }
  const r = round2(s.r * 1.5);
  return (
    <path
      d={`M${s.x} ${s.y - r}Q${s.x} ${s.y} ${s.x + r} ${s.y}Q${s.x} ${s.y} ${s.x} ${s.y + r}Q${s.x} ${s.y} ${s.x - r} ${s.y}Q${s.x} ${s.y} ${s.x} ${s.y - r}z`}
      fill={color}
      transform={`rotate(${s.rot} ${s.x} ${s.y})`}
    />
  );
}

/**
 * Server-safe inline SVG placeholder for a product. Deterministic per `art.seed`,
 * so it renders identically on server and client. GSAP can target `.art-blob`,
 * `.art-shape` and `.art-sprinkle` inside it.
 */
export function ProductArt({
  art,
  view = 0,
  className,
  sprinkles = true,
  title,
}: ProductArtProps) {
  const palette = view === 2 ? nextPalette(art.palette, 2) : art.palette;
  const bg = `var(--color-${palette})`;
  const deep = `var(--color-${palette}-deep)`;
  const accentPalette = nextPalette(palette, view === 1 ? 3 : 1);
  const accent = `var(--color-${accentPalette}-deep)`;
  const blobVariant = ((art.seed + view) % 3) as 0 | 1 | 2;
  const blobRotate = ((art.seed * 37) % 60) - 30 + view * 25;
  const shapeScale = view === 1 ? 1.28 : 1;
  const shapeRotate = view === 1 ? -12 : view === 2 ? 8 : 0;
  const dots = makeSprinkles(art.seed + view * 7, 7);

  return (
    <svg
      viewBox="0 0 400 400"
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      className={cn("block h-auto w-full", className)}
    >
      <g className="art-blob" transform={`rotate(${blobRotate} 200 200)`}>
        <Blob variant={blobVariant} fill={bg} />
      </g>
      {sprinkles ? (
        <g className="art-sprinkles">
          {dots.map((s, i) => (
            <g key={i} className="art-sprinkle">
              <SprinkleGlyph s={s} color={i % 2 ? deep : accent} />
            </g>
          ))}
        </g>
      ) : null}
      <g
        className="art-shape-wrap"
        transform={`translate(200 200) scale(${shapeScale}) rotate(${shapeRotate}) translate(-200 -200)`}
      >
        <Doodle shape={art.shape} fill="#ffffff" accent={accent} />
      </g>
    </svg>
  );
}
