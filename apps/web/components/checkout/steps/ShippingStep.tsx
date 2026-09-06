"use client";

import { motion } from "framer-motion";
import { Rocket, Truck } from "lucide-react";
import { cn } from "@repo/ui/cn";
import { SHIPPING, shippingCost, type ShippingMethod } from "@/lib/config";
import { formatPrice } from "@/lib/format";
import { useCheckoutStore } from "@/lib/store/checkout";
import { press, spring } from "@/lib/transitions";
import { StepShell } from "../StepShell";

const icons = { standard: Truck, express: Rocket } as const;

export function ShippingStep({ subtotal }: { subtotal: number }) {
  const method = useCheckoutStore((s) => s.shippingMethod);
  const setMethod = useCheckoutStore((s) => s.setShippingMethod);
  const setStep = useCheckoutStore((s) => s.setStep);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setStep(2);
      }}
    >
      <StepShell
        title="How fast?"
        description="Both options are tracked. Orders leave the studio within 1–2 working days."
        onBack={() => setStep(0)}
      >
        <fieldset className="grid gap-3">
          <legend className="sr-only">Shipping method</legend>
          {(Object.keys(SHIPPING.methods) as ShippingMethod[]).map((key) => {
            const m = SHIPPING.methods[key];
            const cost = shippingCost(key, subtotal);
            const active = method === key;
            const Icon = icons[key];
            return (
              <motion.label
                key={key}
                whileTap={press}
                animate={{ scale: active ? 1.01 : 1 }}
                transition={spring.snappy}
                className={cn(
                  "flex cursor-pointer items-center gap-4 rounded-lg p-4 outline-ink transition-colors",
                  active ? "bg-butter shadow-sticker" : "bg-cream hover:bg-cream-deep",
                )}
              >
                <input
                  type="radio"
                  name="shipping"
                  value={key}
                  checked={active}
                  onChange={() => setMethod(key)}
                  className="sr-only"
                />
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-white outline-ink">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="flex-1">
                  <span className="block font-display font-bold">{m.label}</span>
                  <span className="block text-sm text-ink-soft">
                    {m.description} · {m.eta}
                  </span>
                </span>
                <span className="font-display font-bold tabular-nums">
                  {cost === 0 ? "Free" : formatPrice(cost)}
                </span>
              </motion.label>
            );
          })}
        </fieldset>
      </StepShell>
    </form>
  );
}
