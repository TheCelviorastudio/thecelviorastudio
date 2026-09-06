"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { selectCount, useCartHydrated, useCartStore } from "@/lib/store/cart";
import { useUiStore } from "@/lib/store/ui";
import { pop, press } from "@/lib/transitions";

export function CartButton() {
  const count = useCartStore(selectCount);
  const hydrated = useCartHydrated();
  const openCart = useUiStore((s) => s.openCart);
  const show = hydrated && count > 0;

  return (
    <motion.button
      type="button"
      onClick={openCart}
      whileTap={press}
      aria-label={show ? `Open cart, ${count} items` : "Open cart"}
      className="relative inline-flex size-11 items-center justify-center rounded-full bg-white shadow-sticker outline-ink transition-colors hover:bg-butter"
    >
      <ShoppingBag className="size-5" />
      <AnimatePresence mode="popLayout">
        {show ? (
          <motion.span
            key={count}
            variants={pop}
            initial="hidden"
            animate="show"
            exit="hidden"
            className="absolute -top-1.5 -right-1.5 flex size-6 items-center justify-center rounded-full bg-pink font-display text-xs font-bold outline-ink"
          >
            {count}
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
}
