import type { SelectHTMLAttributes } from "react";
import { cn } from "./cn";
import { inputStyles } from "./input";

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  invalid?: boolean;
}

export function Select({ className, invalid, children, ...rest }: SelectProps) {
  return (
    <select
      aria-invalid={invalid ? true : undefined}
      className={cn(
        inputStyles,
        "bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%232b2140%22 stroke-width=%223%22 stroke-linecap=%22round%22 stroke-linejoin=%22round%22><path d=%22m6 9 6 6 6-6%22/></svg>')] cursor-pointer appearance-none bg-[length:16px_16px] bg-[position:right_1rem_center] bg-no-repeat pr-11",
        className,
      )}
      {...rest}
    >
      {children}
    </select>
  );
}
