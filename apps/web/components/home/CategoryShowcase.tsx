"use client";

import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { buttonStyles } from "@repo/ui/button";
import { cn } from "@repo/ui/cn";
import { ProductArt } from "@/components/art/ProductArt";
import { StickerBadge } from "@/components/art/StickerBadge";
import { PressLink } from "@/components/motion/PressLink";
import type { Category, Product } from "@/lib/commerce/types";
import { DESKTOP, gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

export interface CategoryShowcaseProps {
  categories: Category[];
  heroes: Record<string, Product | undefined>;
}

const panelBg = {
  butter: "bg-butter",
  lavender: "bg-lavender",
  pink: "bg-pink",
  mint: "bg-mint",
  sky: "bg-sky",
} as const;

/**
 * Desktop: the section pins and scrolling wipes the stationery panel up over the
 * jewelry panel (GSAP scrub). Mobile / reduced motion: two stacked panels, no pin.
 */
export function CategoryShowcase({ categories, heroes }: CategoryShowcaseProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${DESKTOP} and ${MOTION_OK}`, () => {
        const panels = gsap.utils.toArray<HTMLElement>(".showcase-panel");
        const [first, second] = panels;
        if (!first || !second) return;
        gsap.set(second, { clipPath: "inset(100% 0% 0% 0%)" });
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "+=140%",
            pin: true,
            scrub: 0.8,
            anticipatePin: 1,
          },
        });
        tl.to(
          first.querySelector(".showcase-content"),
          { yPercent: -12, scale: 0.94, autoAlpha: 0.4, ease: "none" },
          0,
        )
          .to(
            first.querySelector(".showcase-art"),
            { rotation: -14, scale: 0.9, ease: "none" },
            0,
          )
          .to(second, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
          .from(
            second.querySelector(".showcase-art"),
            { rotation: 18, scale: 0.7, ease: "none" },
            0.15,
          )
          .from(
            second.querySelector(".showcase-content"),
            { yPercent: 20, ease: "none" },
            0.2,
          );
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative md:h-svh md:overflow-hidden">
      {categories.map((c, i) => {
        const hero = heroes[c.slug];
        return (
          <div
            key={c.slug}
            className={cn(
              "showcase-panel relative flex min-h-[80svh] items-center border-y-2 border-ink md:absolute md:inset-0 md:min-h-0",
              panelBg[c.palette],
              i > 0 && "md:z-10",
            )}
          >
            <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8">
              <div className="showcase-content flex flex-col gap-5">
                <StickerBadge palette="white" rotate={-4}>
                  {c.tagline}
                </StickerBadge>
                <h2 className="font-display text-display-xl font-bold">{c.name}</h2>
                <p className="max-w-md text-lg text-ink-soft">{c.description}</p>
                <PressLink
                  href={`/shop?category=${c.slug}`}
                  className={buttonStyles({
                    variant: "ink",
                    size: "lg",
                    className: "w-fit",
                  })}
                >
                  Shop {c.name.toLowerCase()}
                  <ArrowRight className="size-5" aria-hidden />
                </PressLink>
              </div>
              {hero ? (
                <div className="showcase-art mx-auto w-full max-w-md">
                  <ProductArt
                    art={hero.art}
                    title={hero.name}
                    className="drop-shadow-[0_8px_0_rgba(43,33,64,1)]"
                  />
                </div>
              ) : null}
            </div>
          </div>
        );
      })}
    </section>
  );
}
