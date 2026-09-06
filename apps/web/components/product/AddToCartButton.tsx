"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, Plus, ShoppingBag } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { buttonStyles, type ButtonSize, type ButtonVariant } from "@repo/ui/button";
import { cn } from "@repo/ui/cn";
import type { Product } from "@/lib/commerce/types";
import { useCartStore } from "@/lib/store/cart";
import { useUiStore } from "@/lib/store/ui";
import { press, spring } from "@/lib/transitions";

type Phase = "idle" | "adding" | "added";

export interface AddToCartButtonProps {
  product: Product;
  variant?: string;
  qty?: number;
  size?: ButtonSize;
  buttonVariant?: ButtonVariant;
  /** Icon-only compact button for product cards. */
  compact?: boolean;
  /** Open the cart drawer after adding. */
  openDrawer?: boolean;
  className?: string;
}

const phaseContent: Record<Phase, { icon: typeof ShoppingBag; label: string }> = {
  idle: { icon: ShoppingBag, label: "Add to scoop" },
  adding: { icon: Loader2, label: "Adding…" },
  added: { icon: Check, label: "Added!" },
};

export function AddToCartButton({
  product,
  variant,
  qty = 1,
  size = "lg",
  buttonVariant = "pink",
  compact = false,
  openDrawer = false,
  className,
}: AddToCartButtonProps) {
  const add = useCartStore((s) => s.add);
  const openCart = useUiStore((s) => s.openCart);
  const pushToast = useUiStore((s) => s.pushToast);
  const [phase, setPhase] = useState<Phase>("idle");
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => clearTimeout(t));
  }, []);

  const handleClick = () => {
    if (phase !== "idle" || !product.inStock) return;
    setPhase("adding");
    timers.current.push(
      window.setTimeout(() => {
        add({
          productId: product.id,
          slug: product.slug,
          name: product.name,
          price: product.price,
          qty,
          art: product.art,
          image: product.images[0]?.src,
          variant,
        });
        setPhase("added");
        if (openDrawer) openCart();
        else
          pushToast({
            title: `${product.name} added`,
            description: "Tap the bag to check out.",
            tone: "mint",
          });
        timers.current.push(window.setTimeout(() => setPhase("idle"), 1400));
      }, 420),
    );
  };

  const { icon: Icon, label } = phaseContent[phase];
  const tone = phase === "added" ? "mint" : buttonVariant;

  if (compact) {
    return (
      <motion.button
        type="button"
        whileTap={press}
        onClick={handleClick}
        aria-label={`Add ${product.name} to cart`}
        disabled={!product.inStock}
        className={cn(
          buttonStyles({ variant: tone, size: "icon" }),
          "shadow-sticker",
          className,
        )}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={phase}
            initial={{ scale: 0.4, rotate: -90, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            exit={{ scale: 0.4, rotate: 90, opacity: 0 }}
            transition={spring.snappy}
            className="inline-flex"
          >
            {phase === "idle" ? (
              <Plus className="size-5" />
            ) : (
              <Icon className={cn("size-5", phase === "adding" && "animate-spin")} />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>
    );
  }

  return (
    <motion.button
      type="button"
      layout
      whileTap={press}
      whileHover={{ y: -2 }}
      onClick={handleClick}
      disabled={!product.inStock}
      aria-live="polite"
      className={cn(buttonStyles({ variant: tone, size }), "min-w-48", className)}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={phase}
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -12, opacity: 0 }}
          transition={spring.snappy}
          className="inline-flex items-center gap-2"
        >
          <Icon className={cn("size-5", phase === "adding" && "animate-spin")} />
          {product.inStock ? label : "Sold out"}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}
