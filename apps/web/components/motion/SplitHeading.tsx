"use client";

import { useRef } from "react";
import { cn } from "@repo/ui/cn";
import { gsap, MOTION_OK, REDUCED, SplitText, useGSAP } from "@/lib/gsap";

export interface SplitHeadingProps {
  as?: "h1" | "h2" | "h3";
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  unit?: "chars" | "words";
}

/**
 * GSAP SplitText reveal. Waits for fonts, respects reduced motion, re-splits on
 * resize via `autoSplit`, and reverts on unmount through useGSAP's context.
 */
export function SplitHeading({
  as: Tag = "h1",
  children,
  className,
  delay = 0,
  stagger = 0.028,
  unit = "chars",
}: SplitHeadingProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add({ ok: MOTION_OK, reduced: REDUCED }, (ctx) => {
        if (ctx.conditions?.reduced) {
          gsap.set(el, { autoAlpha: 1 });
          return;
        }
        let split: SplitText | undefined;
        let cancelled = false;
        void document.fonts.ready.then(() => {
          if (cancelled) return;
          split = SplitText.create(el, {
            type: unit === "chars" ? "words,chars" : "words",
            mask: unit,
            autoSplit: true,
            onSplit(self) {
              gsap.set(el, { autoAlpha: 1 });
              const targets = unit === "chars" ? self.chars : self.words;
              return gsap.from(targets, {
                yPercent: 115,
                rotation: 5,
                stagger,
                delay,
                duration: 0.75,
                ease: "back.out(1.7)",
              });
            },
          });
        });
        return () => {
          cancelled = true;
          split?.revert();
        };
      });
    },
    { scope: ref, dependencies: [children, unit, delay, stagger] },
  );

  return (
    <Tag ref={ref} className={cn("split-pending", className)}>
      {children}
    </Tag>
  );
}
