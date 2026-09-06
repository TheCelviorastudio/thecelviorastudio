"use client";

import { useRef } from "react";
import { buttonStyles } from "@repo/ui/button";
import { ProductArt } from "@/components/art/ProductArt";
import { PressLink } from "@/components/motion/PressLink";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import type { Product } from "@/lib/commerce/types";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/** Three product blobs drifting at different speeds as you scroll past (GSAP scrub). */
export function ScoopParallax({ products }: { products: Product[] }) {
  const ref = useRef<HTMLElement>(null);
  const trio = products.slice(0, 3);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.utils.toArray<HTMLElement>(".parallax-layer").forEach((layer) => {
          const depth = Number(layer.dataset.depth ?? 1);
          gsap.fromTo(
            layer,
            { yPercent: 18 * depth, rotation: -4 * depth },
            {
              yPercent: -18 * depth,
              rotation: 4 * depth,
              ease: "none",
              scrollTrigger: {
                trigger: ref.current,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.2,
              },
            },
          );
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative overflow-hidden bg-pink py-24 sm:py-32">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal className="relative z-10 flex flex-col gap-5">
          <RevealItem>
            <p className="font-display text-sm font-bold tracking-wide uppercase">
              how it works
            </p>
          </RevealItem>
          <RevealItem>
            <h2 className="font-display text-display-lg font-bold text-balance">
              Scoops, not shelves
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="max-w-md text-lg text-ink-soft">
              We don&apos;t stock hundreds of things. Every month we pick a handful of
              pieces we actually love, photograph them in our kitchen, and release them as
              one small scoop. When it&apos;s gone, it&apos;s gone.
            </p>
          </RevealItem>
          <RevealItem>
            <PressLink
              href="/shop?sort=newest"
              className={buttonStyles({ variant: "secondary" })}
            >
              See this month&apos;s scoop
            </PressLink>
          </RevealItem>
        </Reveal>
        <div className="relative mx-auto aspect-square w-full max-w-lg">
          {trio.map((p, i) => (
            <div
              key={p.id}
              data-depth={[1.6, 1, 0.5][i]}
              className={[
                "parallax-layer absolute will-change-transform",
                i === 0 && "top-0 left-0 w-3/5",
                i === 1 && "right-0 bottom-0 w-1/2",
                i === 2 && "top-1/3 right-1/4 w-2/5",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <ProductArt
                art={p.art}
                view={i === 2 ? 2 : 0}
                className="drop-shadow-[0_6px_0_rgba(43,33,64,0.9)]"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
