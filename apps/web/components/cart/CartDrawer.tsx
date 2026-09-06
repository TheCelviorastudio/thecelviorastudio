"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { selectCount, selectSubtotal, useCartStore } from "@/lib/store/cart";
import { useUiStore } from "@/lib/store/ui";
import { backdrop, drawer, press } from "@/lib/transitions";
import { CartEmpty } from "./CartEmpty";
import { CartLineItem } from "./CartLineItem";
import { CartSummary } from "./CartSummary";

export function CartDrawer() {
  const open = useUiStore((s) => s.cartOpen);
  const closeCart = useUiStore((s) => s.closeCart);
  const lines = useCartStore((s) => s.lines);
  const count = useCartStore(selectCount);
  const subtotal = useCartStore(selectSubtotal);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.documentElement.classList.add("cart-open");
    window.addEventListener("keydown", onKey);
    const focusTimer = setTimeout(() => closeRef.current?.focus(), 80);
    return () => {
      document.documentElement.classList.remove("cart-open");
      window.removeEventListener("keydown", onKey);
      clearTimeout(focusTimer);
    };
  }, [open, closeCart]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.div
            key="backdrop"
            variants={backdrop}
            initial="hidden"
            animate="show"
            exit="exit"
            onClick={closeCart}
            className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-[2px]"
            aria-hidden
          />
          <motion.aside
            key="drawer"
            variants={drawer}
            initial="hidden"
            animate="show"
            exit="exit"
            role="dialog"
            aria-modal="true"
            aria-label="Your cart"
            className="fixed inset-y-0 right-0 z-[61] flex w-full max-w-md flex-col border-l-2 border-ink bg-cream shadow-[-8px_0_0_0_var(--color-ink)]"
          >
            <header className="flex items-center justify-between border-b-2 border-ink px-5 py-4">
              <h2 className="font-display text-display-sm font-bold">
                Your scoop{" "}
                {count > 0 ? (
                  <span className="text-base font-semibold text-ink-soft">({count})</span>
                ) : null}
              </h2>
              <motion.button
                ref={closeRef}
                type="button"
                whileTap={press}
                onClick={closeCart}
                aria-label="Close cart"
                className="inline-flex size-10 items-center justify-center rounded-full bg-white shadow-sticker outline-ink hover:bg-pink"
              >
                <X className="size-5" />
              </motion.button>
            </header>
            <div className="flex-1 overflow-y-auto px-5">
              {lines.length === 0 ? (
                <CartEmpty onNavigate={closeCart} />
              ) : (
                <ul className="divide-y-2 divide-dashed divide-ink/20">
                  <AnimatePresence initial={false}>
                    {lines.map((l) => (
                      <CartLineItem
                        key={`${l.productId}:${l.variant ?? ""}`}
                        line={l}
                        compact
                      />
                    ))}
                  </AnimatePresence>
                </ul>
              )}
            </div>
            {lines.length > 0 ? (
              <footer className="border-t-2 border-ink bg-cream-deep px-5 py-4">
                <CartSummary subtotal={subtotal} onNavigate={closeCart} />
                <Link
                  href="/cart"
                  onClick={closeCart}
                  className="mt-3 block text-center text-sm font-medium underline-offset-4 hover:underline"
                >
                  View full cart
                </Link>
              </footer>
            ) : null}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
