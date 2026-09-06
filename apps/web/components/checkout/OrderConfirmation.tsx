"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect } from "react";
import { buttonStyles } from "@repo/ui/button";
import { ProductArt } from "@/components/art/ProductArt";
import { StickerBadge } from "@/components/art/StickerBadge";
import { PressLink } from "@/components/motion/PressLink";
import { SHIPPING } from "@/lib/config";
import { formatDate, formatPrice } from "@/lib/format";
import { useCheckoutStore } from "@/lib/store/checkout";
import { useOrdersHydrated, useOrdersStore } from "@/lib/store/orders";
import { fadeUp, pop, stagger } from "@/lib/transitions";

const confetti = [
  { text: "yay", palette: "pink", x: "-6%", y: "2%", r: -14 },
  { text: "✦", palette: "butter", x: "96%", y: "-2%", r: 12 },
  { text: "scoop!", palette: "lavender", x: "92%", y: "84%", r: -8 },
  { text: "♥", palette: "mint", x: "-4%", y: "70%", r: 10 },
  { text: "✿", palette: "sky", x: "88%", y: "40%", r: 6 },
] as const;

export function OrderConfirmation({ id }: { id: string }) {
  const hydrated = useOrdersHydrated();
  const order = useOrdersStore((s) => s.byId[id]);
  const resetCheckout = useCheckoutStore((s) => s.reset);

  // Clear the finished checkout draft now that we're off /checkout.
  useEffect(() => {
    resetCheckout();
  }, [resetCheckout]);

  if (!hydrated) return <div className="min-h-[40vh]" aria-busy="true" />;

  if (!order) {
    return (
      <motion.div
        variants={stagger()}
        initial="hidden"
        animate="show"
        className="mx-auto flex max-w-md flex-col items-center gap-4 text-center"
      >
        <motion.div variants={pop} className="w-40">
          <ProductArt art={{ palette: "pink", shape: "note", seed: 21 }} />
        </motion.div>
        <motion.h1 variants={fadeUp} className="font-display text-display-md font-bold">
          We couldn&apos;t find that scoop
        </motion.h1>
        <motion.p variants={fadeUp} className="text-ink-soft">
          Order <span className="font-mono">{id}</span> isn&apos;t in this browser
          session. Demo orders live only in the tab that placed them.
        </motion.p>
        <motion.div variants={fadeUp}>
          <Link href="/shop" className={buttonStyles({ variant: "primary" })}>
            Back to the shop
          </Link>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      animate="show"
      className="relative mx-auto max-w-2xl"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        {confetti.map((c) => (
          <motion.span
            key={c.text + c.x}
            variants={pop}
            className="absolute"
            style={{ left: c.x, top: c.y }}
          >
            <StickerBadge palette={c.palette} rotate={c.r} size="lg">
              {c.text}
            </StickerBadge>
          </motion.span>
        ))}
      </div>
      <motion.div
        variants={fadeUp}
        className="flex flex-col items-center gap-3 text-center"
      >
        <StickerBadge palette="mint" rotate={-3}>
          order confirmed
        </StickerBadge>
        <h1 className="font-display text-display-lg font-bold text-balance">
          Thank you, {order.address.name.split(" ")[0]}!
        </h1>
        <p className="max-w-md text-ink-soft">
          Your scoop is being packed. We&apos;ve sent a confirmation to{" "}
          {order.address.email} (well, we would have, if this were real).
        </p>
      </motion.div>

      <motion.div
        variants={fadeUp}
        className="mt-10 rounded-xl bg-white p-6 shadow-sticker-lg outline-ink"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-dashed border-ink/20 pb-4">
          <div>
            <p className="text-xs font-semibold tracking-wide text-ink-soft uppercase">
              Order
            </p>
            <p className="font-mono text-lg font-bold">{order.id}</p>
          </div>
          <p className="text-sm text-ink-soft">{formatDate(order.createdAt)}</p>
        </div>
        <ul className="divide-y-2 divide-dashed divide-ink/10">
          {order.lines.map((l) => (
            <li
              key={`${l.productId}:${l.variant ?? ""}`}
              className="flex items-center gap-4 py-3"
            >
              <div className="size-14 shrink-0">
                <ProductArt art={l.art} sprinkles={false} className="rounded-sm" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-display font-bold">{l.name}</p>
                <p className="text-sm text-ink-soft">
                  {l.variant ? `${l.variant} · ` : ""}× {l.qty}
                </p>
              </div>
              <p className="font-semibold tabular-nums">{formatPrice(l.price * l.qty)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-2 flex flex-col gap-1 border-t-2 border-dashed border-ink/20 pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-ink-soft">Subtotal</dt>
            <dd className="tabular-nums">{formatPrice(order.totals.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-ink-soft">
              {SHIPPING.methods[order.shippingMethod].label}
            </dt>
            <dd className="tabular-nums">
              {order.totals.shipping === 0 ? "Free" : formatPrice(order.totals.shipping)}
            </dd>
          </div>
          <div className="flex justify-between text-base">
            <dt className="font-display font-bold">Total</dt>
            <dd className="font-display font-bold tabular-nums">
              {formatPrice(order.totals.total)}
            </dd>
          </div>
        </dl>
        <div className="mt-4 grid gap-4 rounded-lg bg-cream p-4 text-sm outline-ink sm:grid-cols-2">
          <div>
            <p className="font-display font-bold">Delivering to</p>
            <p>
              {order.address.line1}
              {order.address.line2 ? `, ${order.address.line2}` : ""}
            </p>
            <p>
              {order.address.city}, {order.address.state} {order.address.pincode}
            </p>
          </div>
          <div>
            <p className="font-display font-bold">Arrives in</p>
            <p>{SHIPPING.methods[order.shippingMethod].eta}</p>
            <p className="text-ink-soft">Paid with card •••• {order.paymentLast4}</p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-8 flex flex-wrap justify-center gap-3">
        <PressLink href="/shop" className={buttonStyles({ variant: "pink", size: "lg" })}>
          Keep scooping
        </PressLink>
        <PressLink
          href="/"
          className={buttonStyles({ variant: "secondary", size: "lg" })}
        >
          Back home
        </PressLink>
      </motion.div>
    </motion.div>
  );
}
