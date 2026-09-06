import type { HTMLAttributes } from "react";
import { cn } from "./cn";

export type BadgeTone = "butter" | "pink" | "lavender" | "mint" | "sky" | "ink" | "cream";

const tones: Record<BadgeTone, string> = {
  butter: "bg-butter text-ink",
  pink: "bg-pink text-ink",
  lavender: "bg-lavender text-ink",
  mint: "bg-mint text-ink",
  sky: "bg-sky text-ink",
  ink: "bg-ink text-cream",
  cream: "bg-cream text-ink",
};

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone;
  outlined?: boolean;
}

export function Badge({
  tone = "butter",
  outlined = true,
  className,
  ...rest
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-3 py-1 font-display text-xs font-semibold tracking-wide uppercase",
        tones[tone],
        outlined && "shadow-sticker outline-ink",
        className,
      )}
      {...rest}
    />
  );
}
