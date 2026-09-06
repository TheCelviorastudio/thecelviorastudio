"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "@/lib/transitions";

export interface AnimatedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => ReactNode;
  keyExtractor: (item: T, index: number) => string;
  className?: string;
  itemClassName?: string;
  each?: number;
  inView?: boolean;
}

export function AnimatedList<T>({
  items,
  renderItem,
  keyExtractor,
  className,
  itemClassName,
  each = 0.06,
  inView = true,
}: AnimatedListProps<T>) {
  const reduce = useReducedMotion();
  return (
    <motion.ul
      className={className}
      variants={stagger(each)}
      initial={reduce ? false : "hidden"}
      {...(inView
        ? { whileInView: "show", viewport: { once: true, margin: "-60px 0px" } }
        : { animate: "show" })}
    >
      {items.map((item, i) => (
        <motion.li
          key={keyExtractor(item, i)}
          variants={fadeUp}
          className={itemClassName}
        >
          {renderItem(item, i)}
        </motion.li>
      ))}
    </motion.ul>
  );
}
