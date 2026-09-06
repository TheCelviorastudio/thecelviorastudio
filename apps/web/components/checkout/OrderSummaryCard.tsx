"use client";

import { ProductPhoto } from "@/components/product/ProductPhoto";
import type { CartLine } from "@/lib/commerce/types";
import { SHIPPING, shippingCost, type ShippingMethod } from "@/lib/config";
import { formatPrice } from "@/lib/format";

export function OrderSummaryCard({
  lines,
  subtotal,
  shippingMethod,
}: {
  lines: CartLine[];
  subtotal: number;
  shippingMethod: ShippingMethod;
}) {
  const shipping = shippingCost(shippingMethod, subtotal);
  return (
    <aside className="h-fit rounded-xl bg-cream-deep p-5 shadow-sticker-lg outline-ink lg:sticky lg:top-24">
      <h2 className="font-display text-display-sm font-bold">Your scoop</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {lines.map((l) => (
          <li
            key={`${l.productId}:${l.variant ?? ""}`}
            className="flex items-center gap-3"
          >
            <div className="relative size-14 shrink-0">
              <ProductPhoto
                src={l.image}
                alt={l.name}
                art={l.art}
                sizes="56px"
                className="rounded-sm outline-ink"
              />
              <span className="absolute -top-1.5 -right-1.5 inline-flex size-5 items-center justify-center rounded-full bg-pink font-display text-[10px] font-bold outline-ink">
                {l.qty}
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-sm font-bold">{l.name}</p>
              {l.variant ? <p className="text-xs text-ink-soft">{l.variant}</p> : null}
            </div>
            <span className="text-sm font-semibold tabular-nums">
              {formatPrice(l.price * l.qty)}
            </span>
          </li>
        ))}
      </ul>
      <dl className="mt-4 flex flex-col gap-1.5 border-t-2 border-dashed border-ink/30 pt-4 text-sm">
        <div className="flex justify-between">
          <dt className="text-ink-soft">Subtotal</dt>
          <dd className="tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between">
          <dt className="text-ink-soft">{SHIPPING.methods[shippingMethod].label}</dt>
          <dd className="tabular-nums">
            {shipping === 0 ? "Free" : formatPrice(shipping)}
          </dd>
        </div>
        <div className="mt-1 flex justify-between text-base">
          <dt className="font-display font-bold">Total</dt>
          <dd className="font-display font-bold tabular-nums">
            {formatPrice(subtotal + shipping)}
          </dd>
        </div>
      </dl>
    </aside>
  );
}
