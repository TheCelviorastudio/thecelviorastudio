"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { pageEnter } from "@/lib/transitions";

/** Enter-only page transition. Next unmounts the previous tree immediately, so no exit. */
export default function Template({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion();
  return (
    <motion.div variants={pageEnter} initial={reduce ? false : "hidden"} animate="show">
      {children}
    </motion.div>
  );
}
