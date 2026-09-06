"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { ProductArt } from "@/components/art/ProductArt";
import { QuantityStepper } from "@/components/product/QuantityStepper";
import type { CartLine } from "@/lib/commerce/types";
import { formatPrice } from "@/lib/format";
import { useCartStore } from "@/lib/store/cart";
import { lineItem, press } from "@/lib/transitions";

export function CartLineItem({
  line,
  compact = false,
}: {
  line: CartLine;
  compact?: boolean;
}) {
  const setQty = useCartStore((s) => s.setQty);
  const remove = useCartStore((s) => s.remove);

  return (
    <motion.li
      layout
      variants={lineItem}
      initial="hidden"
      animate="show"
      exit="exit"
      className="overflow-hidden"
    >
      <div className="flex gap-4 py-4">
        <Link
          href={`/product/${line.slug}`}
          className={compact ? "size-20 shrink-0" : "size-24 shrink-0"}
          aria-label={line.name}
        >
          <ProductArt art={line.art} sprinkles={false} className="rounded-md" />
        </Link>
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <Link
                href={`/product/${line.slug}`}
                className="line-clamp-2 font-display font-bold underline-offset-4 hover:underline"
              >
                {line.name}
              </Link>
              {line.variant ? (
                <p className="text-xs text-ink-soft">{line.variant}</p>
              ) : null}
            </div>
            <motion.button
              type="button"
              whileTap={press}
              onClick={() => remove(line.productId, line.variant)}
              aria-label={`Remove ${line.name}`}
              className="rounded-full p-1.5 transition-colors hover:bg-pink"
            >
              <X className="size-4" />
            </motion.button>
          </div>
          <div className="mt-auto flex items-center justify-between gap-3">
            <QuantityStepper
              size="sm"
              value={line.qty}
              min={0}
              onChange={(q) => setQty(line.productId, line.variant, q)}
              label={`Quantity for ${line.name}`}
            />
            <span className="font-display font-bold tabular-nums">
              {formatPrice(line.price * line.qty)}
            </span>
          </div>
        </div>
      </div>
    </motion.li>
  );
}
