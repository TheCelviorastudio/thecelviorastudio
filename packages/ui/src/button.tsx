import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

export type ButtonVariant =
  "primary" | "secondary" | "pink" | "lavender" | "mint" | "ghost" | "ink";
export type ButtonSize = "sm" | "md" | "lg" | "icon";

const base =
  "inline-flex items-center justify-center gap-2 font-display font-semibold tracking-tight select-none whitespace-nowrap rounded-full transition-[background-color,color,box-shadow] duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-butter text-ink outline-ink shadow-sticker hover:bg-butter-deep",
  secondary: "bg-white text-ink outline-ink shadow-sticker hover:bg-cream-deep",
  pink: "bg-pink text-ink outline-ink shadow-sticker hover:bg-pink-deep",
  lavender: "bg-lavender text-ink outline-ink shadow-sticker hover:bg-lavender-deep",
  mint: "bg-mint text-ink outline-ink shadow-sticker hover:bg-mint-deep",
  ink: "bg-ink text-cream outline-ink shadow-[0_3px_0_0_var(--color-ink-soft)] hover:bg-ink-soft",
  ghost: "bg-transparent text-ink hover:bg-ink/5",
};

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-base",
  lg: "h-14 px-8 text-lg",
  icon: "size-11 p-0",
};

export interface ButtonStyleOptions {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
}

/** Class recipe so `motion.button` / `Link` can reuse the look without wrapping. */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}): string {
  return cn(base, variants[variant], sizes[size], className);
}

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, Omit<ButtonStyleOptions, "className"> {
  children?: ReactNode;
}

export function Button({
  variant,
  size,
  className,
  type = "button",
  children,
  ...rest
}: ButtonProps) {
  return (
    <button type={type} className={buttonStyles({ variant, size, className })} {...rest}>
      {children}
    </button>
  );
}
