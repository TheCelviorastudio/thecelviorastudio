import type { ElementType, HTMLAttributes } from "react";
import { cn } from "@repo/ui/cn";

export interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  size?: "default" | "narrow" | "wide";
}

const sizes = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
  wide: "max-w-[96rem]",
} as const;

export function Container({ as, size = "default", className, ...rest }: ContainerProps) {
  const Tag: ElementType = as ?? "div";
  return (
    <Tag
      className={cn("mx-auto w-full px-4 sm:px-6 lg:px-8", sizes[size], className)}
      {...rest}
    />
  );
}
