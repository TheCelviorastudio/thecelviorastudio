"use client";

import { LayoutGroup, motion } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@repo/ui/cn";
import type { ProductArt as ProductArtSpec, ProductImage } from "@/lib/commerce/types";
import { gsap, useGSAP } from "@/lib/gsap";
import { press, spring } from "@/lib/transitions";
import { ProductPhoto } from "./ProductPhoto";

/**
 * GSAP owns the stage (crossfade + pop between photos).
 * Framer Motion owns the thumbnail rail (active ring via layoutId).
 * With a single photo the rail is hidden and the stage is static.
 */
export function ProductGallery({
  images,
  art,
  name,
}: {
  images: ProductImage[];
  art: ProductArtSpec;
  name: string;
}) {
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const views: (ProductImage | undefined)[] = images.length ? images : [undefined];

  useGSAP(
    () => {
      const els = gsap.utils.toArray<HTMLElement>(".gallery-view");
      const incoming = els[active];
      if (!incoming) return;
      const tl = gsap.timeline({ defaults: { overwrite: "auto" } });
      els.forEach((v, i) => {
        if (i === active) return;
        tl.to(v, { autoAlpha: 0, scale: 0.96, duration: 0.3, ease: "power2.in" }, 0);
      });
      tl.fromTo(
        incoming,
        { autoAlpha: 0, scale: 1.04 },
        { autoAlpha: 1, scale: 1, duration: 0.5, ease: "power3.out" },
        0.08,
      );
    },
    { scope: stage, dependencies: [active] },
  );

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={stage}
        className="relative aspect-square overflow-hidden rounded-xl bg-cream shadow-sticker-lg outline-ink"
      >
        {views.map((img, i) => (
          <div
            key={img?.src ?? "art"}
            className="gallery-view absolute inset-0"
            style={i === 0 ? undefined : { opacity: 0, visibility: "hidden" }}
            aria-hidden={i !== active}
          >
            <ProductPhoto
              src={img?.src}
              alt={img?.alt ?? name}
              art={art}
              sizes="(min-width: 1024px) 50vw, 100vw"
              priority={i === 0}
              className="h-full"
            />
          </div>
        ))}
      </div>
      {views.length > 1 ? (
        <LayoutGroup id="gallery-thumbs">
          <div className="flex gap-3" role="tablist" aria-label="Product photos">
            {views.map((img, i) => {
              const isActive = i === active;
              return (
                <motion.button
                  key={img?.src ?? "art"}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Photo ${i + 1}`}
                  whileTap={press}
                  whileHover={{ y: -3 }}
                  onClick={() => setActive(i)}
                  className={cn(
                    "relative size-20 overflow-hidden rounded-md bg-white p-1 outline-ink transition-colors",
                    isActive ? "bg-cream" : "hover:bg-cream-deep",
                  )}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="gallery-ring"
                      transition={spring.snappy}
                      className="absolute inset-0 z-10 rounded-md ring-4 ring-lavender-deep ring-inset"
                    />
                  ) : null}
                  <ProductPhoto
                    src={img?.src}
                    alt=""
                    art={art}
                    sizes="80px"
                    className="rounded-sm"
                  />
                </motion.button>
              );
            })}
          </div>
        </LayoutGroup>
      ) : null}
    </div>
  );
}
