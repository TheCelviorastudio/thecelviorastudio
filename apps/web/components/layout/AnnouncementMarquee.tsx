import { Sparkles } from "lucide-react";
import { Marquee } from "@/components/motion/Marquee";
import { SHIPPING } from "@/lib/config";
import { formatPrice } from "@/lib/format";

const items = [
  `Free standard shipping over ${formatPrice(SHIPPING.freeThreshold)}`,
  "A new scoop every month",
  "Nickel-free posts, always",
  "Packed with love in Bengaluru",
  "Fountain-pen friendly paper",
];

export function AnnouncementMarquee({ tone = "bg-ink text-cream" }: { tone?: string }) {
  return (
    <Marquee speed={55} className={`border-y-2 border-ink py-2.5 ${tone}`}>
      {items.map((text) => (
        <span
          key={text}
          className="flex items-center gap-3 px-5 font-display text-sm font-semibold tracking-wide whitespace-nowrap uppercase"
        >
          <Sparkles className="size-4 text-butter" aria-hidden />
          {text}
        </span>
      ))}
    </Marquee>
  );
}
