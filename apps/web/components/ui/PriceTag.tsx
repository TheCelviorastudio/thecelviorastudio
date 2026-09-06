import { cn } from "@repo/ui/cn";
import { discountPercent, formatPrice } from "@/lib/format";

export interface PriceTagProps {
  price: number;
  compareAtPrice?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizes = {
  sm: "text-base",
  md: "text-lg",
  lg: "text-display-sm",
} as const;

export function PriceTag({
  price,
  compareAtPrice,
  size = "md",
  className,
}: PriceTagProps) {
  const off = discountPercent(price, compareAtPrice);
  return (
    <span className={cn("inline-flex flex-wrap items-baseline gap-2", className)}>
      <span className={cn("font-display font-bold text-ink", sizes[size])}>
        {formatPrice(price)}
      </span>
      {off && compareAtPrice ? (
        <>
          <span className="text-sm text-ink-mute line-through">
            {formatPrice(compareAtPrice)}
          </span>
          <span className="rounded-full bg-pink px-2 py-0.5 font-display text-xs font-semibold text-ink">
            {off}% off
          </span>
        </>
      ) : null}
    </span>
  );
}
