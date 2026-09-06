"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonStyles } from "@repo/ui/button";
import { SHIPPING, shippingCost } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { spring } from "@/lib/transitions";

export interface CartSummaryProps {
  subtotal: number;
  onNavigate?: () => void;
  showCheckout?: boolean;
}

export function CartSummary({
  subtotal,
  onNavigate,
  showCheckout = true,
}: CartSummaryProps) {
  const remaining = Math.max(0, SHIPPING.freeThreshold - subtotal);
  const progress = Math.min(1, subtotal / SHIPPING.freeThreshold);
  const shipping = shippingCost("standard", subtotal);

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-md bg-white p-3 outline-ink">
        <p className="text-sm font-medium">
          {remaining > 0 ? (
            <>
              Add <strong>{formatPrice(remaining)}</strong> more for free standard
              shipping
            </>
          ) : (
            <>You unlocked free standard shipping 🎉</>
          )}
        </p>
        <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-cream-deep outline-ink">
          <motion.div
            className="h-full origin-left rounded-full bg-mint-deep"
            initial={false}
            animate={{ scaleX: progress }}
            transition={spring.soft}
          />
        </div>
      </div>
      <dl className="flex flex-col gap-1.5 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-soft">Subtotal</dt>
          <dd className="font-semibold tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-soft">Standard shipping</dt>
          <dd className="font-semibold tabular-nums">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </dd>
        </div>
        <div className="mt-1 flex justify-between border-t-2 border-dashed border-ink/30 pt-2 text-base">
          <dt className="font-display font-bold">Total</dt>
          <dd className="font-display font-bold tabular-nums">
            {formatPrice(subtotal + shipping)}
          </dd>
        </div>
      </dl>
      {showCheckout ? (
        <Link
          href="/checkout"
          onClick={onNavigate}
          className={buttonStyles({ variant: "pink", size: "lg", className: "w-full" })}
        >
          Checkout
        </Link>
      ) : null}
    </div>
  );
}
