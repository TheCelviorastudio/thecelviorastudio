"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, stagger } from "@/lib/transitions";

export interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  /** Stagger direct `motion` children that use the `fadeUp` variant. */
  staggerChildren?: number;
  as?: "div" | "section" | "ul" | "li";
}

/** Scroll-triggered fade-up wrapper. Children may opt into stagger via `RevealItem`. */
export function Reveal({
  children,
  className,
  delay = 0,
  staggerChildren = 0.08,
  as = "div",
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = motion[as];
  return (
    <Tag
      className={className}
      variants={stagger(staggerChildren, delay)}
      initial={reduce ? false : "hidden"}
      whileInView="show"
      viewport={{ once: true, margin: "-60px 0px" }}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "article" | "p" | "span";
}) {
  const Tag = motion[as];
  return (
    <Tag className={className} variants={fadeUp}>
      {children}
    </Tag>
  );
}
