"use client";

import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { buttonStyles } from "@repo/ui/button";
import { press } from "@/lib/transitions";

export function StepShell({
  title,
  description,
  children,
  onBack,
  nextLabel = "Continue",
  nextSlot,
}: {
  title: string;
  description?: string;
  children: ReactNode;
  onBack?: () => void;
  nextLabel?: string;
  /** Override the default submit button (e.g. the place-order morph button). */
  nextSlot?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 rounded-xl bg-white p-5 shadow-sticker-lg outline-ink sm:p-7">
      <div>
        <h2 className="font-display text-display-sm font-bold">{title}</h2>
        {description ? <p className="mt-1 text-sm text-ink-soft">{description}</p> : null}
      </div>
      {children}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-dashed border-ink/20 pt-5">
        {onBack ? (
          <motion.button
            type="button"
            whileTap={press}
            onClick={onBack}
            className={buttonStyles({ variant: "ghost", size: "md" })}
          >
            <ArrowLeft className="size-4" aria-hidden />
            Back
          </motion.button>
        ) : (
          <span />
        )}
        {nextSlot ?? (
          <motion.button
            type="submit"
            whileTap={press}
            whileHover={{ y: -2 }}
            className={buttonStyles({ variant: "pink", size: "lg" })}
          >
            {nextLabel}
            <ArrowRight className="size-5" aria-hidden />
          </motion.button>
        )}
      </div>
    </div>
  );
}
