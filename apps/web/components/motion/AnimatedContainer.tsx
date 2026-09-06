"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeIn, fadeUp, pop, slideInLeft } from "@/lib/transitions";

const animations = { fadeUp, fadeIn, pop, slideInLeft } satisfies Record<
  string,
  Variants
>;

export interface AnimatedContainerProps {
  children: ReactNode;
  animation?: keyof typeof animations;
  /** Animate when scrolled into view instead of on mount. */
  inView?: boolean;
  delay?: number;
  once?: boolean;
  className?: string;
  as?: "div" | "section" | "article" | "span" | "li" | "header";
}

export function AnimatedContainer({
  children,
  animation = "fadeUp",
  inView = false,
  delay = 0,
  once = true,
  className,
  as = "div",
}: AnimatedContainerProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  const variants = animations[animation];
  return (
    <Tag
      className={className}
      variants={variants}
      initial={reduce ? false : "hidden"}
      {...(inView
        ? { whileInView: "show", viewport: { once, margin: "-80px 0px" } }
        : { animate: "show" })}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}
