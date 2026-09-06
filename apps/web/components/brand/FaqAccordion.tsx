"use client";

import { Accordion } from "@/components/motion/Accordion";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { StickerBadge } from "@/components/art/StickerBadge";
import type { FaqGroup } from "@/data/faq";

const palettes = ["butter", "pink", "lavender", "mint"] as const;

export function FaqAccordion({ groups }: { groups: FaqGroup[] }) {
  return (
    <div className="flex flex-col gap-12">
      {groups.map((g, gi) => (
        <Reveal key={g.title} as="section" className="flex flex-col gap-5">
          <RevealItem>
            <StickerBadge
              palette={palettes[gi % palettes.length]}
              rotate={gi % 2 ? 3 : -3}
            >
              {g.title}
            </StickerBadge>
          </RevealItem>
          <RevealItem>
            <Accordion
              defaultOpen={gi === 0 ? `${g.title}-0` : null}
              items={g.items.map((item, i) => ({
                id: `${g.title}-${i}`,
                title: item.q,
                content: <p>{item.a}</p>,
              }))}
            />
          </RevealItem>
        </Reveal>
      ))}
    </div>
  );
}
