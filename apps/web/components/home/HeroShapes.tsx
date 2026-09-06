"use client";

import { useRef } from "react";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

interface ShapeSpec {
  kind: "star" | "heart" | "hoop" | "sprinkle" | "scoop";
  color: string;
  size: number;
  x: string;
  y: string;
  rotate: number;
  depth: number;
  /** Too big for phone-width heroes; hidden below md. */
  hideOnMobile?: boolean;
}

const shapes: ShapeSpec[] = [
  {
    kind: "hoop",
    color: "var(--color-butter)",
    size: 120,
    x: "6%",
    y: "18%",
    rotate: -12,
    depth: 2,
    hideOnMobile: true,
  },
  {
    kind: "star",
    color: "var(--color-pink)",
    size: 64,
    x: "16%",
    y: "70%",
    rotate: 12,
    depth: 3,
  },
  {
    kind: "heart",
    color: "var(--color-lavender)",
    size: 88,
    x: "80%",
    y: "14%",
    rotate: 14,
    depth: 2.5,
  },
  {
    kind: "scoop",
    color: "var(--color-mint)",
    size: 110,
    x: "86%",
    y: "64%",
    rotate: -8,
    depth: 1.5,
    hideOnMobile: true,
  },
  {
    kind: "sprinkle",
    color: "var(--color-pink-deep)",
    size: 26,
    x: "30%",
    y: "12%",
    rotate: 40,
    depth: 4,
  },
  {
    kind: "sprinkle",
    color: "var(--color-lavender-deep)",
    size: 22,
    x: "68%",
    y: "82%",
    rotate: -30,
    depth: 3.5,
  },
  {
    kind: "star",
    color: "var(--color-butter-deep)",
    size: 40,
    x: "58%",
    y: "8%",
    rotate: -20,
    depth: 4,
  },
  {
    kind: "sprinkle",
    color: "var(--color-mint-deep)",
    size: 20,
    x: "10%",
    y: "46%",
    rotate: 65,
    depth: 5,
  },
];

function ShapeSvg({ kind, color }: Pick<ShapeSpec, "kind" | "color">) {
  const stroke = {
    stroke: "var(--color-ink)",
    strokeWidth: 5,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "hoop":
      return (
        <svg viewBox="0 0 100 100" className="size-full">
          <circle
            cx="50"
            cy="50"
            r="36"
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="22"
          />
          <circle cx="50" cy="50" r="36" fill="none" stroke={color} strokeWidth="12" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 100 100" className="size-full">
          <path
            d="M50 8l12 27 29 3-22 20 7 29-26-15-26 15 7-29L9 38l29-3z"
            fill={color}
            {...stroke}
          />
        </svg>
      );
    case "heart":
      return (
        <svg viewBox="0 0 100 100" className="size-full">
          <path
            d="M50 88C26 70 8 54 8 34c0-12 9-22 21-22 9 0 16 5 21 12 5-7 12-12 21-12 12 0 21 10 21 22 0 20-18 36-42 54z"
            fill={color}
            {...stroke}
          />
        </svg>
      );
    case "scoop":
      return (
        <svg viewBox="0 0 100 100" className="size-full">
          <path
            d="M28 46h44l-18 42c-1.6 3.6-6.4 3.6-8 0z"
            fill="var(--color-butter)"
            {...stroke}
          />
          <circle cx="34" cy="38" r="16" fill={color} {...stroke} />
          <circle cx="66" cy="38" r="16" fill="var(--color-pink)" {...stroke} />
          <circle cx="50" cy="24" r="16" fill="var(--color-lavender)" {...stroke} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className="size-full">
          <rect x="20" y="38" width="60" height="24" rx="12" fill={color} {...stroke} />
        </svg>
      );
  }
}

/**
 * Decorative floating shapes around the hero. GSAP: staggered pop-in, endless
 * random float, and a gentle pointer parallax. Static under reduced motion.
 */
export function HeroShapes() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    (_, contextSafe) => {
      const root = ref.current;
      if (!root) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const items = gsap.utils.toArray<HTMLElement>(".hero-shape", root);
        gsap.from(items, {
          scale: 0,
          rotation: "random(-90, 90)",
          duration: 1,
          ease: "back.out(2)",
          stagger: { each: 0.08, from: "random" },
          delay: 0.3,
        });
        items.forEach((el) => {
          gsap.to(el, {
            y: "random(-18, 18)",
            x: "random(-10, 10)",
            rotation: "+=random(-12, 12)",
            duration: "random(3, 5.5)",
            ease: "sine.inOut",
            repeat: -1,
            yoyo: true,
            delay: "random(0, 1.5)",
          });
        });
        const movers = items.map((el) => ({
          x: gsap.quickTo(el, "x", { duration: 0.9, ease: "power3.out" }),
          y: gsap.quickTo(el, "y", { duration: 0.9, ease: "power3.out" }),
          depth: Number(el.dataset.depth ?? 2),
        }));
        const onMove = contextSafe?.((e: PointerEvent) => {
          const rect = root.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;
          movers.forEach((m) => {
            m.x(nx * 14 * m.depth);
            m.y(ny * 14 * m.depth);
          });
        });
        if (!onMove) return;
        root.addEventListener("pointermove", onMove);
        return () => root.removeEventListener("pointermove", onMove);
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {shapes.map((s, i) => (
        <div
          key={i}
          className={
            s.hideOnMobile ? "hero-shape absolute max-md:hidden" : "hero-shape absolute"
          }
          data-depth={s.depth}
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            rotate: `${s.rotate}deg`,
          }}
        >
          <ShapeSvg kind={s.kind} color={s.color} />
        </div>
      ))}
    </div>
  );
}
