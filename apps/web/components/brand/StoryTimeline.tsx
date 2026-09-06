"use client";

import { useRef } from "react";
import { cn } from "@repo/ui/cn";
import { StickerBadge } from "@/components/art/StickerBadge";
import { paletteBg } from "@/components/art/palette";
import type { Milestone } from "@/data/story";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** GSAP-scrubbed vertical line draw with milestones that pop in as the line reaches them. */
export function StoryTimeline({ milestones }: { milestones: Milestone[] }) {
  const ref = useRef<HTMLOListElement>(null);

  useGSAP(
    () => {
      const line = ref.current?.querySelector<SVGPathElement>(".timeline-line");
      if (!line) return;
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const length = line.getTotalLength();
        gsap.set(line, { strokeDasharray: length, strokeDashoffset: length });
        gsap.to(line, {
          strokeDashoffset: 0,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: 0.6,
          },
        });
        gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
          gsap.from(item, {
            autoAlpha: 0,
            x: -24,
            duration: 0.7,
            ease: "back.out(1.6)",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });
          gsap.from(item.querySelector(".timeline-dot"), {
            scale: 0,
            duration: 0.6,
            ease: "back.out(3)",
            scrollTrigger: {
              trigger: item,
              start: "top 78%",
              toggleActions: "play none none reverse",
            },
          });
        });
      });
    },
    { scope: ref },
  );

  return (
    <ol ref={ref} className="relative flex flex-col gap-10 pl-10 sm:pl-14">
      <svg
        className="pointer-events-none absolute top-2 left-[13px] h-[calc(100%-1rem)] w-2 sm:left-[21px]"
        viewBox="0 0 8 1000"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path
          d="M4 0v1000"
          className="timeline-line"
          stroke="var(--color-ink)"
          strokeWidth="4"
          strokeLinecap="round"
          fill="none"
        />
      </svg>
      {milestones.map((m) => (
        <li key={m.year} className="timeline-item relative">
          <span
            className={cn(
              "timeline-dot absolute top-1 -left-10 inline-flex size-7 items-center justify-center rounded-full outline-ink sm:-left-14 sm:size-9",
              paletteBg[m.palette],
            )}
          />
          <StickerBadge palette={m.palette} rotate={-3} size="sm">
            {m.year}
          </StickerBadge>
          <h3 className="mt-2 font-display text-display-sm font-bold">{m.title}</h3>
          <p className="mt-1 max-w-prose text-ink-soft">{m.body}</p>
        </li>
      ))}
    </ol>
  );
}
