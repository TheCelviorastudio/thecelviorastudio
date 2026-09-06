"use client";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { Flip } from "gsap/Flip";

/**
 * Single registration point. Every GSAP consumer imports from "@/lib/gsap",
 * never from "gsap" directly, so plugins are registered exactly once.
 */
gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText, Flip);
gsap.defaults({ ease: "back.out(1.6)", duration: 0.8 });
ScrollTrigger.config({ ignoreMobileResize: true });

export const REDUCED = "(prefers-reduced-motion: reduce)";
export const MOTION_OK = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 768px)";
export const MOBILE = "(max-width: 767px)";

export { gsap, useGSAP, ScrollTrigger, SplitText, Flip };
