import type { HTMLAttributes } from "react";
import { cn } from "./cn";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  tone?: "white" | "cream" | "butter" | "pink" | "lavender" | "mint" | "sky";
  lift?: boolean;
}

const tones = {
  white: "bg-white",
  cream: "bg-cream-deep",
  butter: "bg-butter",
  pink: "bg-pink",
  lavender: "bg-lavender",
  mint: "bg-mint",
  sky: "bg-sky",
} as const;

export function Card({ tone = "white", lift = false, className, ...rest }: CardProps) {
  return (
    <div
      className={cn(
        "sticker-lg p-6",
        tones[tone],
        lift && "shadow-sticker-xl",
        className,
      )}
      {...rest}
    />
  );
}
