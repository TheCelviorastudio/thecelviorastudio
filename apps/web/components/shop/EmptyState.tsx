"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { buttonStyles } from "@repo/ui/button";
import { ProductArt } from "@/components/art/ProductArt";
import { fadeUp, pop, stagger } from "@/lib/transitions";

export function EmptyState() {
  return (
    <motion.div
      variants={stagger(0.08)}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center gap-4 py-16 text-center"
    >
      <motion.div variants={pop} className="w-44">
        <ProductArt art={{ palette: "lavender", shape: "sticker", seed: 3 }} />
      </motion.div>
      <motion.h2 variants={fadeUp} className="font-display text-display-sm font-bold">
        This scoop is empty
      </motion.h2>
      <motion.p variants={fadeUp} className="max-w-sm text-ink-soft">
        Nothing matches that filter right now. Try another category or check back after
        the next drop.
      </motion.p>
      <motion.div variants={fadeUp}>
        <Link href="/shop" className={buttonStyles({ variant: "primary" })}>
          See everything
        </Link>
      </motion.div>
    </motion.div>
  );
}
