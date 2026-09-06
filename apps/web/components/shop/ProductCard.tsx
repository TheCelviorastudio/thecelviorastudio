"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ProductArt } from "@/components/art/ProductArt";
import { StickerBadge } from "@/components/art/StickerBadge";
import { AddToCartButton } from "@/components/product/AddToCartButton";
import { PriceTag } from "@/components/ui/PriceTag";
import type { Product, ProductBadge } from "@/lib/commerce/types";
import { spring } from "@/lib/transitions";

const badgePalette: Record<ProductBadge, "butter" | "pink" | "lavender" | "mint"> = {
  new: "mint",
  bestseller: "butter",
  limited: "lavender",
  sale: "pink",
};

export function ProductCard({ product }: { product: Product }) {
  const badge = product.badges?.[0];
  return (
    <motion.article
      className="group relative"
      initial="rest"
      whileHover="hover"
      whileTap="tap"
      variants={{ rest: { y: 0 }, hover: { y: -6 }, tap: { y: 0 } }}
      transition={spring.soft}
    >
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-lg bg-white shadow-sticker outline-ink transition-shadow duration-200 group-hover:shadow-sticker-lg">
          <motion.div
            variants={{
              rest: { rotate: 0, scale: 1 },
              hover: { rotate: -3, scale: 1.06 },
            }}
            transition={spring.bouncy}
            className="p-3"
          >
            <ProductArt art={product.art} title={product.name} />
          </motion.div>
          {badge ? (
            <div className="absolute top-3 left-3">
              <StickerBadge palette={badgePalette[badge]} size="sm" rotate={-8}>
                {badge}
              </StickerBadge>
            </div>
          ) : null}
        </div>
        <div className="mt-3 flex flex-col gap-0.5 px-1">
          <h3 className="font-display text-base font-bold sm:text-lg">{product.name}</h3>
          <p className="line-clamp-1 text-sm text-ink-soft">{product.tagline}</p>
          <PriceTag
            price={product.price}
            compareAtPrice={product.compareAtPrice}
            size="sm"
            className="mt-1"
          />
        </div>
      </Link>
      <div className="absolute right-3 bottom-[5.25rem] sm:bottom-[5.5rem]">
        <AddToCartButton product={product} compact buttonVariant="primary" />
      </div>
    </motion.article>
  );
}
