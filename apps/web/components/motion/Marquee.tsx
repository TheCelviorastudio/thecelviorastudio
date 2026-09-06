"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@repo/ui/cn";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export interface MarqueeProps {
  children: ReactNode;
  /** Pixels per second. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
  trackClassName?: string;
}

/**
 * Seamless GSAP marquee. The track is duplicated in JSX (hydration-safe) and the
 * inner wrapper loops `xPercent: -50`. Static under prefers-reduced-motion.
 */
export function Marquee({
  children,
  speed = 70,
  reverse = false,
  pauseOnHover = true,
  className,
  trackClassName,
}: MarqueeProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const inner = ref.current?.querySelector<HTMLElement>(".marquee-inner");
      if (!inner) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const distance = inner.offsetWidth / 2;
        const duration = Math.max(8, distance / speed);
        const tween = reverse
          ? gsap.fromTo(
              inner,
              { xPercent: -50 },
              { xPercent: 0, duration, ease: "none", repeat: -1 },
            )
          : gsap.to(inner, { xPercent: -50, duration, ease: "none", repeat: -1 });
        if (!pauseOnHover) return;
        const slow = () => gsap.to(tween, { timeScale: 0.15, duration: 0.6 });
        const resume = () => gsap.to(tween, { timeScale: 1, duration: 0.6 });
        const root = ref.current;
        root?.addEventListener("pointerenter", slow);
        root?.addEventListener("pointerleave", resume);
        return () => {
          root?.removeEventListener("pointerenter", slow);
          root?.removeEventListener("pointerleave", resume);
        };
      });
    },
    { scope: ref, dependencies: [speed, reverse, pauseOnHover] },
  );

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <div className="marquee-inner flex w-max">
        <div className={cn("flex shrink-0 items-center", trackClassName)}>{children}</div>
        <div className={cn("flex shrink-0 items-center", trackClassName)} aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
