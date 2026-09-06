"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { cn } from "@repo/ui/cn";
import type { Product } from "@/lib/commerce/types";
import { spring } from "@/lib/transitions";
import { EmptyState } from "./EmptyState";
import { ProductCard } from "./ProductCard";

export interface ProductGridProps {
  products: Product[];
  className?: string;
  columns?: 3 | 4;
}

export function ProductGrid({ products, className, columns = 4 }: ProductGridProps) {
  const reduce = useReducedMotion();
  if (products.length === 0) return <EmptyState />;

  return (
    <motion.ul
      layout
      className={cn(
        "grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6",
        columns === 4 ? "md:grid-cols-3 xl:grid-cols-4" : "md:grid-cols-3",
        className,
      )}
    >
      <AnimatePresence mode="popLayout" initial={!reduce}>
        {products.map((p, i) => (
          <motion.li
            key={p.id}
            layout
            initial={{ opacity: 0, y: 28, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.18 } }}
            transition={{ ...spring.soft, delay: Math.min(i, 8) * 0.05 }}
          >
            <ProductCard product={p} />
          </motion.li>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
