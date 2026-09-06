"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonStyles } from "@repo/ui/button";
import { ProductArt } from "@/components/art/ProductArt";
import { pop, stagger, fadeUp } from "@/lib/transitions";

export function CartEmpty({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center gap-4 py-10 text-center"
    >
      <motion.div variants={pop} className="w-40">
        <ProductArt art={{ palette: "sky", shape: "note", seed: 8 }} />
      </motion.div>
      <motion.h3 variants={fadeUp} className="font-display text-display-sm font-bold">
        Your scoop is empty
      </motion.h3>
      <motion.p variants={fadeUp} className="max-w-xs text-sm text-ink-soft">
        Nothing in here yet. Go find something small and shiny, or something to write
        with.
      </motion.p>
      <motion.div variants={fadeUp}>
        <Link
          href="/shop"
          onClick={onNavigate}
          className={buttonStyles({ variant: "primary" })}
        >
          Browse the shop
        </Link>
      </motion.div>
    </motion.div>
  );
}
