import type { ReactNode } from "react";
import { cn } from "@repo/ui/cn";
import { StickerBadge } from "@/components/art/StickerBadge";
import type { Palette } from "@/lib/commerce/types";

export interface SectionHeadingProps {
  eyebrow?: string;
  eyebrowPalette?: Palette;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  className?: string;
  as?: "h1" | "h2" | "h3";
}

export function SectionHeading({
  eyebrow,
  eyebrowPalette = "butter",
  title,
  description,
  align = "left",
  className,
  as: Tag = "h2",
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <StickerBadge palette={eyebrowPalette} rotate={align === "center" ? -3 : -4}>
          {eyebrow}
        </StickerBadge>
      ) : null}
      <Tag className="font-display text-display-md font-bold text-balance">{title}</Tag>
      {description ? (
        <p className="max-w-prose text-base text-ink-soft sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
