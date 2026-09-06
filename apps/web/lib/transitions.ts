import type { TargetAndTransition, Transition, Variants } from "framer-motion";

/** Central Framer Motion presets. Components import from here, never inline transitions. */
export const spring = {
  bouncy: { type: "spring", stiffness: 420, damping: 22, mass: 0.9 },
  soft: { type: "spring", stiffness: 220, damping: 26 },
  snappy: { type: "spring", stiffness: 640, damping: 34 },
  gentle: { type: "spring", stiffness: 140, damping: 20 },
} as const satisfies Record<string, Transition>;

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: spring.soft },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.4 } },
};

export const pop: Variants = {
  hidden: { opacity: 0, scale: 0.6, rotate: -8 },
  show: { opacity: 1, scale: 1, rotate: 0, transition: spring.bouncy },
};

export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: { opacity: 1, x: 0, transition: spring.soft },
};

export const stagger = (each = 0.06, delayChildren = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren } },
});

export const pageEnter: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOutExpo } },
};

export const drawer: Variants = {
  hidden: { x: "100%" },
  show: { x: 0, transition: spring.soft },
  exit: { x: "100%", transition: { duration: 0.28, ease: "easeIn" } },
};

export const backdrop: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const overlayMenu: Variants = {
  hidden: { opacity: 0, clipPath: "circle(0% at 100% 0%)" },
  show: {
    opacity: 1,
    clipPath: "circle(150% at 100% 0%)",
    transition: {
      duration: 0.55,
      ease: easeOutExpo,
      when: "beforeChildren",
      staggerChildren: 0.06,
    },
  },
  exit: {
    opacity: 0,
    clipPath: "circle(0% at 100% 0%)",
    transition: { duration: 0.35, ease: "easeIn" },
  },
};

export const accordion: Variants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      height: { duration: 0.28, ease: easeOutExpo },
      opacity: { duration: 0.15 },
    },
  },
  open: {
    height: "auto",
    opacity: 1,
    transition: {
      height: { duration: 0.36, ease: easeOutExpo },
      opacity: { duration: 0.25, delay: 0.08 },
    },
  },
};

export const toast: Variants = {
  hidden: { opacity: 0, y: 24, scale: 0.9 },
  show: { opacity: 1, y: 0, scale: 1, transition: spring.bouncy },
  exit: { opacity: 0, y: 12, scale: 0.95, transition: { duration: 0.2 } },
};

export const lineItem: Variants = {
  hidden: { opacity: 0, x: 24, height: 0 },
  show: { opacity: 1, x: 0, height: "auto", transition: spring.soft },
  exit: { opacity: 0, x: 40, height: 0, transition: { duration: 0.25, ease: "easeIn" } },
};

export const stepSlide: Variants = {
  enter: (direction: number) => ({ opacity: 0, x: direction > 0 ? 48 : -48 }),
  center: { opacity: 1, x: 0, transition: spring.soft },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction > 0 ? -48 : 48,
    transition: { duration: 0.2, ease: "easeIn" },
  }),
};

export const shake: TargetAndTransition = {
  x: [0, -7, 7, -5, 5, 0],
  transition: { duration: 0.4 },
};

/** Sticker-style press: sink into the hard shadow. */
export const press = { y: 3, scale: 0.98 } as const;
export const lift = { y: -4 } as const;
export const cardHover = { y: -8, rotate: -1 } as const;
