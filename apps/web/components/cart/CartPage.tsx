"use client";

import { AnimatePresence, motion } from "framer-motion";
import { selectSubtotal, useCartHydrated, useCartStore } from "@/lib/store/cart";
import { fadeUp } from "@/lib/transitions";
import { CartEmpty } from "./CartEmpty";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";

export function CartPage() {
  const hydrated = useCartHydrated();
  const lines = useCartStore((s) => s.lines);
  const subtotal = useCartStore(selectSubtotal);

  if (!hydrated) {
    return <div className="min-h-[40vh]" aria-busy="true" />;
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-md">
        <CartEmpty />
      </div>
    );
  }

  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_22rem]">
      <ul className="divide-y-2 divide-dashed divide-ink/20 rounded-xl bg-white px-5 shadow-sticker-lg outline-ink">
        <AnimatePresence initial={false}>
          {lines.map((l) => (
            <CartLineItem key={`${l.productId}:${l.variant ?? ""}`} line={l} />
          ))}
        </AnimatePresence>
      </ul>
      <motion.aside
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="h-fit rounded-xl bg-cream-deep p-5 shadow-sticker-lg outline-ink lg:sticky lg:top-24"
      >
        <h2 className="mb-4 font-display text-display-sm font-bold">Summary</h2>
        <CartSummary subtotal={subtotal} />
      </motion.aside>
    </div>
  );
}
