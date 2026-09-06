import type { ReactNode } from "react";
import type { Palette } from "@/lib/commerce/types";
import { cn } from "@repo/ui/cn";
import { paletteBg } from "./palette";

export interface StickerBadgeProps {
  children: ReactNode;
  palette?: Palette | "ink" | "white";
  rotate?: number;
  className?: string;
  size?: "sm" | "md" | "lg";
}

const sizes = {
  sm: "px-2.5 py-1 text-[11px]",
  md: "px-3.5 py-1.5 text-xs",
  lg: "px-5 py-2 text-sm",
} as const;

/** A tilted sticker-style chip. Pure CSS; safe in server components. */
export function StickerBadge({
  children,
  palette = "butter",
  rotate = -6,
  className,
  size = "md",
}: StickerBadgeProps) {
  const bg =
    palette === "ink"
      ? "bg-ink text-cream"
      : palette === "white"
        ? "bg-white"
        : paletteBg[palette];
  return (
    <span
      style={{ rotate: `${rotate}deg` }}
      className={cn(
        "inline-flex w-fit items-center gap-1 rounded-full font-display font-semibold tracking-wide uppercase shadow-sticker outline-ink",
        bg,
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
}
