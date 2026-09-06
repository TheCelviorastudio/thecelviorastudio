"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";

/** Recalculate ScrollTrigger positions after every route change and page-enter tween. */
export function ScrollTriggerRefresher() {
  const pathname = usePathname();
  useEffect(() => {
    const raf = requestAnimationFrame(() => ScrollTrigger.refresh());
    const late = setTimeout(() => ScrollTrigger.refresh(), 650);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(late);
    };
  }, [pathname]);
  return null;
}
