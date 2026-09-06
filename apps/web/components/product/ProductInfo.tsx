"use client";

import { LayoutGroup, motion } from "framer-motion";
import { Truck, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@repo/ui/cn";
import { StickerBadge } from "@/components/art/StickerBadge";
import { Accordion } from "@/components/motion/Accordion";
import { PriceTag } from "@/components/ui/PriceTag";
import type { Product, ProductBadge } from "@/lib/commerce/types";
import { SHIPPING } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { fadeUp, press, spring, stagger } from "@/lib/transitions";
import { AddToCartButton } from "./AddToCartButton";
import { QuantityStepper } from "./QuantityStepper";

const badgePalette: Record<ProductBadge, "butter" | "pink" | "lavender" | "mint"> = {
  new: "mint",
  bestseller: "butter",
  limited: "lavender",
  sale: "pink",
};

export function ProductInfo({ product }: { product: Product }) {
  const [variant, setVariant] = useState<string | undefined>(product.variant?.options[0]);
  const [qty, setQty] = useState(1);

  return (
    <motion.div
      variants={stagger(0.07)}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-6"
    >
      <motion.div variants={fadeUp} className="flex flex-col gap-3">
        {product.badges?.length ? (
          <div className="flex flex-wrap gap-2">
            {product.badges.map((b, i) => (
              <StickerBadge key={b} palette={badgePalette[b]} rotate={i % 2 ? 4 : -5}>
                {b}
              </StickerBadge>
            ))}
          </div>
        ) : null}
        <h1 className="font-display text-display-lg font-bold text-balance">
          {product.name}
        </h1>
        <p className="text-lg text-ink-soft">{product.tagline}</p>
        <PriceTag
          price={product.price}
          compareAtPrice={product.compareAtPrice}
          size="lg"
        />
      </motion.div>

      {product.variant ? (
        <motion.fieldset variants={fadeUp} className="flex flex-col gap-2">
          <legend className="mb-2 font-display text-sm font-bold">
            {product.variant.name}
          </legend>
          <LayoutGroup id="variant-pills">
            <div className="flex flex-wrap gap-2">
              {product.variant.options.map((opt) => {
                const active = opt === variant;
                return (
                  <motion.button
                    key={opt}
                    type="button"
                    whileTap={press}
                    onClick={() => setVariant(opt)}
                    aria-pressed={active}
                    className={cn(
                      "relative h-11 rounded-full bg-white px-5 font-display text-sm font-semibold outline-ink transition-colors",
                      !active && "text-ink-soft hover:bg-cream-deep",
                    )}
                  >
                    {active ? (
                      <motion.span
                        layoutId="variant-pill"
                        transition={spring.snappy}
                        className="absolute inset-0 -z-10 rounded-full bg-butter shadow-sticker"
                      />
                    ) : null}
                    {opt}
                  </motion.button>
                );
              })}
            </div>
          </LayoutGroup>
        </motion.fieldset>
      ) : null}

      <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-3">
        <QuantityStepper value={qty} onChange={setQty} />
        <AddToCartButton
          product={product}
          variant={variant}
          qty={qty}
          openDrawer
          className="flex-1 sm:flex-none"
        />
      </motion.div>

      <motion.ul variants={fadeUp} className="flex flex-col gap-2 text-sm text-ink-soft">
        <li className="flex items-center gap-2">
          <Truck className="size-4 shrink-0 text-ink" aria-hidden />
          Free standard shipping over {formatPrice(SHIPPING.freeThreshold)}. Ships in 1–2
          days.
        </li>
        <li className="flex items-center gap-2">
          <Sparkles className="size-4 shrink-0 text-ink" aria-hidden />
          Small batch. Once this scoop is gone, it&apos;s gone.
        </li>
      </motion.ul>

      <motion.div variants={fadeUp}>
        <Accordion
          defaultOpen="about"
          items={[
            {
              id: "about",
              title: "About this piece",
              content: <p>{product.description}</p>,
            },
            {
              id: "details",
              title: "Details",
              content: (
                <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2">
                  {product.details.map((d) => (
                    <div key={d.label} className="contents">
                      <dt className="font-semibold text-ink">{d.label}</dt>
                      <dd>{d.value}</dd>
                    </div>
                  ))}
                </dl>
              ),
            },
            {
              id: "shipping",
              title: "Shipping & returns",
              content: (
                <p>
                  Standard delivery in {SHIPPING.methods.standard.eta}, express in{" "}
                  {SHIPPING.methods.express.eta}. Unworn items can be returned within 14
                  days. Earrings are final sale.
                </p>
              ),
            },
          ]}
        />
      </motion.div>
    </motion.div>
  );
}
