import type { InputHTMLAttributes } from "react";
import { cn } from "./cn";

export const inputStyles =
  "h-12 w-full rounded-md border-2 border-ink bg-white px-4 text-base text-ink placeholder:text-ink-mute transition-shadow duration-200 focus:outline-none focus:shadow-glow-lavender aria-[invalid=true]:border-pink-deep aria-[invalid=true]:focus:shadow-glow-pink";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
}

export function Input({ className, invalid, ...rest }: InputProps) {
  return (
    <input
      aria-invalid={invalid ? true : undefined}
      className={cn(inputStyles, className)}
      {...rest}
    />
  );
}
