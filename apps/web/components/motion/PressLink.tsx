"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { lift, press } from "@/lib/transitions";

export interface PressLinkProps {
  href: ComponentProps<typeof Link>["href"];
  className?: string;
  children: ReactNode;
  onClick?: () => void;
  scroll?: boolean;
}

/** A Link with sticker-style hover lift and tap press. Wrapper span carries the motion. */
export function PressLink({
  href,
  className,
  children,
  onClick,
  scroll,
}: PressLinkProps) {
  return (
    <motion.span whileHover={lift} whileTap={press} className="inline-flex">
      <Link href={href} className={className} onClick={onClick} scroll={scroll}>
        {children}
      </Link>
    </motion.span>
  );
}
