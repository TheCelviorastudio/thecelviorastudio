"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2, PartyPopper } from "lucide-react";
import type { Route } from "next";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { buttonStyles } from "@repo/ui/button";
import { Textarea } from "@repo/ui/textarea";
import { commerce } from "@/lib/commerce";
import type { CartLine } from "@/lib/commerce/types";
import { SHIPPING, shippingCost } from "@/lib/config";
import { useCartStore } from "@/lib/store/cart";
import { useCheckoutStore } from "@/lib/store/checkout";
import { useOrdersStore } from "@/lib/store/orders";
import { useUiStore } from "@/lib/store/ui";
import { press, spring } from "@/lib/transitions";
import { StepShell } from "../StepShell";

type Phase = "idle" | "placing" | "done";

export function ReviewStep({ lines, subtotal }: { lines: CartLine[]; subtotal: number }) {
  const router = useRouter();
  const address = useCheckoutStore((s) => s.address);
  const shippingMethod = useCheckoutStore((s) => s.shippingMethod);
  const payment = useCheckoutStore((s) => s.payment);
  const giftNote = useCheckoutStore((s) => s.giftNote);
  const setGiftNote = useCheckoutStore((s) => s.setGiftNote);
  const setStep = useCheckoutStore((s) => s.setStep);
  const setPlacing = useCheckoutStore((s) => s.setPlacing);
  const clearCart = useCartStore((s) => s.clear);
  const addOrder = useOrdersStore((s) => s.add);
  const pushToast = useUiStore((s) => s.pushToast);
  const [phase, setPhase] = useState<Phase>("idle");

  const shipping = shippingCost(shippingMethod, subtotal);
  const last4 = payment.cardNumber.replace(/\s+/g, "").slice(-4) || "4242";

  const placeOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phase !== "idle") return;
    setPhase("placing");
    setPlacing(true);
    await new Promise((r) => setTimeout(r, 900));
    const order = await commerce.createOrder({
      lines,
      address,
      shippingMethod,
      totals: { subtotal, shipping, total: subtotal + shipping },
      paymentLast4: last4,
    });
    addOrder(order);
    setPhase("done");
    pushToast({
      title: "Order placed!",
      description: `Scoop ${order.id} is on its way.`,
      tone: "mint",
    });
    await new Promise((r) => setTimeout(r, 600));
    clearCart();
    // Checkout state is reset by the confirmation page once we have left /checkout.
    router.push(`/order/${order.id}` as Route);
  };

  const label =
    phase === "idle" ? "Place order" : phase === "placing" ? "Placing…" : "Done!";
  const Icon = phase === "idle" ? PartyPopper : phase === "placing" ? Loader2 : Check;

  return (
    <form onSubmit={placeOrder}>
      <StepShell
        title="One last look"
        onBack={() => setStep(2)}
        nextSlot={
          <motion.button
            type="submit"
            layout
            whileTap={press}
            disabled={phase !== "idle"}
            className={buttonStyles({
              variant: phase === "done" ? "mint" : "pink",
              size: "lg",
              className: "min-w-48",
            })}
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
                <Icon
                  className={phase === "placing" ? "size-5 animate-spin" : "size-5"}
                  aria-hidden
                />
                {label}
              </motion.span>
            </AnimatePresence>
          </motion.button>
        }
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <ReviewCard title="Deliver to" onEdit={() => setStep(0)}>
            <p className="font-semibold">{address.name}</p>
            <p>
              {address.line1}
              {address.line2 ? `, ${address.line2}` : ""}
            </p>
            <p>
              {address.city}, {address.state} {address.pincode}
            </p>
            <p className="text-ink-soft">
              {address.phone} · {address.email}
            </p>
          </ReviewCard>
          <ReviewCard title="Shipping" onEdit={() => setStep(1)}>
            <p className="font-semibold">{SHIPPING.methods[shippingMethod].label}</p>
            <p className="text-ink-soft">{SHIPPING.methods[shippingMethod].eta}</p>
          </ReviewCard>
          <ReviewCard title="Payment" onEdit={() => setStep(2)}>
            <p className="font-semibold">Card ending •••• {last4}</p>
            <p className="text-ink-soft">Demo only, nothing is charged.</p>
          </ReviewCard>
          <div className="rounded-lg bg-cream p-4 outline-ink">
            <label htmlFor="gift-note" className="font-display text-sm font-bold">
              Gift note (optional)
            </label>
            <Textarea
              id="gift-note"
              rows={3}
              className="mt-2 bg-white"
              placeholder="We'll handwrite this on the card."
              value={giftNote}
              onChange={(e) => setGiftNote(e.target.value)}
              maxLength={140}
            />
          </div>
        </div>
      </StepShell>
    </form>
  );
}

function ReviewCard({
  title,
  onEdit,
  children,
}: {
  title: string;
  onEdit: () => void;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-lg bg-cream p-4 text-sm outline-ink">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="font-display text-sm font-bold uppercase">{title}</h3>
        <button
          type="button"
          onClick={onEdit}
          className="text-xs font-semibold underline underline-offset-4"
        >
          Edit
        </button>
      </div>
      <div className="flex flex-col gap-0.5">{children}</div>
    </div>
  );
}
