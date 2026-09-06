import { Marquee } from "@/components/motion/Marquee";
import { values } from "@/data/story";

const tones = ["bg-butter", "bg-lavender", "bg-mint", "bg-sky"] as const;

export function ValuesMarquee() {
  return (
    <div className="border-y-2 border-ink bg-cream-deep py-5">
      <Marquee reverse speed={45} trackClassName="gap-4 pr-4">
        {values.map((v, i) => (
          <span
            key={v.title}
            className={`inline-flex items-baseline gap-2 rounded-full px-5 py-2.5 shadow-sticker outline-ink ${tones[i % tones.length]}`}
            style={{ rotate: `${i % 2 ? 1.5 : -1.5}deg` }}
          >
            <span className="font-display text-base font-bold">{v.title}</span>
            <span className="text-sm text-ink-soft">{v.body}</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}
