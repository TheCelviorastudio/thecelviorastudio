import type { TextareaHTMLAttributes } from "react";
import { cn } from "./cn";
import { inputStyles } from "./input";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export function Textarea({ className, invalid, rows = 4, ...rest }: TextareaProps) {
  return (
    <textarea
      rows={rows}
      aria-invalid={invalid ? true : undefined}
      className={cn(inputStyles, "h-auto resize-y py-3 leading-relaxed", className)}
      {...rest}
    />
  );
}
