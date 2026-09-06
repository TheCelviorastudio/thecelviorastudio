"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus } from "lucide-react";
import { cn } from "@repo/ui/cn";
import { MAX_QTY } from "@/lib/config";
import { press, spring } from "@/lib/transitions";

export interface QuantityStepperProps {
  value: number;
  onChange: (next: number) => void;
  min?: number;
  max?: number;
  size?: "sm" | "md";
  label?: string;
}

export function QuantityStepper({
  value,
  onChange,
  min = 1,
  max = MAX_QTY,
  size = "md",
  label = "Quantity",
}: QuantityStepperProps) {
  const btn = cn(
    "inline-flex items-center justify-center rounded-full transition-colors hover:bg-butter disabled:opacity-40 disabled:hover:bg-transparent",
    size === "sm" ? "size-8" : "size-10",
  );
  return (
    <div
      role="group"
      aria-label={label}
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-white outline-ink",
        size === "sm" ? "p-0.5" : "p-1",
      )}
    >
      <motion.button
        type="button"
        whileTap={press}
        className={btn}
        aria-label="Decrease quantity"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
      >
        <Minus className="size-4" />
      </motion.button>
      <span
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden font-display font-bold tabular-nums",
          size === "sm" ? "w-6 text-sm" : "w-8 text-base",
        )}
        aria-live="polite"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={value}
            initial={{ y: 14, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -14, opacity: 0 }}
            transition={spring.snappy}
          >
            {value}
          </motion.span>
        </AnimatePresence>
      </span>
      <motion.button
        type="button"
        whileTap={press}
        className={btn}
        aria-label="Increase quantity"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
      >
        <Plus className="size-4" />
      </motion.button>
    </div>
  );
}
