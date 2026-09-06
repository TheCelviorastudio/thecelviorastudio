"use client";

import "@/lib/gsap";
import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { ScrollTriggerRefresher } from "@/components/motion/ScrollTriggerRefresher";
import { StoreHydrator } from "@/components/motion/StoreHydrator";
import { Toaster } from "@/components/motion/Toaster";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <StoreHydrator />
      <ScrollTriggerRefresher />
      {children}
      <Toaster />
    </MotionConfig>
  );
}
