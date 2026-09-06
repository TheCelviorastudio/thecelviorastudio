import { cn } from "@repo/ui/cn";
import { paletteBg } from "@/components/art/palette";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import type { PolicySection as PolicySectionData } from "@/data/policies";

export function PolicySection({ section }: { section: PolicySectionData }) {
  return (
    <Reveal as="section" className="scroll-mt-28">
      <RevealItem
        as="article"
        className={cn(
          "rounded-xl p-6 shadow-sticker-lg outline-ink sm:p-8",
          paletteBg[section.palette],
        )}
      >
        <h2 id={section.id} className="font-display text-display-sm font-bold">
          {section.title}
        </h2>
        <div className="mt-3 flex flex-col gap-3 text-ink-soft">
          {section.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
          {section.bullets ? (
            <ul className="flex flex-col gap-1.5 pl-1">
              {section.bullets.map((b) => (
                <li key={b} className="flex gap-2">
                  <span
                    aria-hidden
                    className="mt-2 inline-block size-2 shrink-0 rounded-full bg-ink"
                  />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </RevealItem>
    </Reveal>
  );
}
