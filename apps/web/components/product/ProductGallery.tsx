"use client";

import { LayoutGroup, motion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@repo/ui/cn";
import { ProductArt } from "@/components/art/ProductArt";
import type { ProductArt as ProductArtSpec } from "@/lib/commerce/types";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";
import { press, spring } from "@/lib/transitions";

const VIEWS = [0, 1, 2] as const;
const viewLabels = ["Front", "Close-up", "Alt colour"] as const;

/**
 * GSAP owns the stage (crossfade + pop between views and idle sprinkle drift).
 * Framer Motion owns the thumbnail rail (active ring via layoutId).
 */
export function ProductGallery({ art, name }: { art: ProductArtSpec; name: string }) {
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<0 | 1 | 2>(0);

  // Idle sprinkle drift, set up once.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.to(".art-sprinkle", {
          x: "random(-8, 8)",
          y: "random(-10, 10)",
          rotation: "random(-25, 25)",
          duration: "random(2.2, 4)",
          ease: "sine.inOut",
          repeat: -1,
          yoyo: true,
          stagger: { each: 0.12, from: "random" },
        });
      });
    },
    { scope: stage },
  );

  // View transition timeline, re-runs whenever `active` changes.
  useGSAP(
    () => {
      const views = gsap.utils.toArray<HTMLElement>(".gallery-view");
      const incoming = views[active];
      if (!incoming) return;
      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
      views.forEach((v, i) => {
        if (i === active) return;
        tl.to(v, { autoAlpha: 0, scale: 0.92, duration: 0.35, ease: "power2.in" }, 0);
      });
      tl.fromTo(
        incoming,
        { autoAlpha: 0, scale: 1.08 },
        { autoAlpha: 1, scale: 1, duration: 0.55, ease: "power3.out" },
        0.1,
      );
      const shape = incoming.querySelector(".art-shape-wrap");
      if (shape) {
        tl.fromTo(
          shape,
          { rotation: -10, scale: 0.85, transformOrigin: "50% 50%" },
          { rotation: 0, scale: 1, duration: 0.8, ease: "back.out(2)" },
          0.15,
        );
      }
    },
    { scope: stage, dependencies: [active] },
  );

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={stage}
        className="relative aspect-square overflow-hidden rounded-xl bg-white shadow-sticker-lg outline-ink"
      >
        {VIEWS.map((v) => (
          <div
            key={v}
            className="gallery-view absolute inset-0 p-6 sm:p-8"
            style={v === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
            aria-hidden={v !== active}
          >
            <ProductArt art={art} view={v} title={v === 0 ? name : undefined} />
          </div>
        ))}
      </div>
      <LayoutGroup id="gallery-thumbs">
        <div className="flex gap-3" role="tablist" aria-label="Product views">
          {VIEWS.map((v) => {
            const isActive = v === active;
            return (
              <motion.button
                key={v}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={viewLabels[v]}
                whileTap={press}
                whileHover={{ y: -3 }}
                onClick={() => setActive(v)}
                className={cn(
                  "relative size-20 overflow-hidden rounded-md bg-white p-1.5 outline-ink transition-colors",
                  isActive ? "bg-cream" : "hover:bg-cream-deep",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="gallery-ring"
                    transition={spring.snappy}
                    className="absolute inset-0 rounded-md ring-4 ring-lavender-deep ring-inset"
                  />
                ) : null}
                <ProductArt art={art} view={v} sprinkles={false} />
              </motion.button>
            );
          })}
        </div>
      </LayoutGroup>
    </div>
  );
}
