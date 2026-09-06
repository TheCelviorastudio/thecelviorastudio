"use client";

import { LayoutGroup, motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@repo/ui/cn";
import type { CheckoutStep } from "@/lib/store/checkout";
import { spring } from "@/lib/transitions";

export const STEP_LABELS = ["Info", "Shipping", "Payment", "Review"] as const;

export function CheckoutStepper({
  step,
  onStep,
}: {
  step: CheckoutStep;
  onStep: (s: CheckoutStep) => void;
}) {
  return (
    <LayoutGroup id="checkout-steps">
      <ol
        className="flex items-center gap-1 rounded-full bg-white p-1 outline-ink sm:gap-2"
        aria-label="Checkout progress"
      >
        {STEP_LABELS.map((label, i) => {
          const s = i as CheckoutStep;
          const done = i < step;
          const active = i === step;
          return (
            <li key={label} className="flex-1">
              <button
                type="button"
                disabled={!done}
                onClick={() => onStep(s)}
                aria-current={active ? "step" : undefined}
                className={cn(
                  "relative flex w-full items-center justify-center gap-1.5 rounded-full px-2 py-2 font-display text-xs font-bold sm:text-sm",
                  active
                    ? "text-ink"
                    : done
                      ? "text-ink hover:bg-cream-deep"
                      : "text-ink-mute",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="checkout-step-pill"
                    transition={spring.snappy}
                    className="absolute inset-0 rounded-full bg-butter outline-ink"
                  />
                ) : null}
                <span className="relative flex items-center gap-1.5">
                  <span
                    className={cn(
                      "inline-flex size-5 items-center justify-center rounded-full text-[10px]",
                      done
                        ? "bg-mint outline-ink"
                        : active
                          ? "bg-white outline-ink"
                          : "bg-cream-deep",
                    )}
                  >
                    {done ? <Check className="size-3" /> : i + 1}
                  </span>
                  <span className="hidden sm:inline">{label}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </LayoutGroup>
  );
}
