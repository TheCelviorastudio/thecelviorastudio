import type { Metadata } from "next";
import { StoryTimeline } from "@/components/brand/StoryTimeline";
import { TeamStickers } from "@/components/brand/TeamStickers";
import { StickerBadge } from "@/components/art/StickerBadge";
import { AnimatedContainer } from "@/components/motion/AnimatedContainer";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { milestones, values } from "@/data/story";

export const metadata: Metadata = {
  title: "Our story",
  description: "How a drawer of hoops and a stack of notebooks became thecelviorastudio.",
};

const valueTones = ["bg-butter", "bg-pink", "bg-lavender", "bg-mint"] as const;

export default function AboutPage() {
  return (
    <>
      <section className="border-b-2 border-ink bg-lavender dots-bg">
        <Container className="flex flex-col items-center gap-5 py-20 text-center sm:py-28">
          <AnimatedContainer animation="pop">
            <StickerBadge palette="white" rotate={-4} size="lg">
              our story
            </StickerBadge>
          </AnimatedContainer>
          <SplitHeading
            as="h1"
            className="max-w-4xl font-display text-display-xl font-bold"
            delay={0.2}
          >
            Small scoops from a small studio
          </SplitHeading>
          <AnimatedContainer animation="fadeUp" delay={0.8} className="max-w-xl">
            <p className="text-lg text-ink-soft sm:text-xl">
              We&apos;re a two-person (plus one cat) studio in Bengaluru curating jewelry
              and stationery we&apos;d actually wear and use.
            </p>
          </AnimatedContainer>
        </Container>
      </section>

      <Container className="grid gap-16 py-20 lg:grid-cols-[1fr_1.3fr] lg:gap-24">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            eyebrow="timeline"
            eyebrowPalette="pink"
            title="How we got here"
            description="Four years, a few thousand parcels, and one very supervised packing table."
          />
        </div>
        <StoryTimeline milestones={milestones} />
      </Container>

      <section className="border-y-2 border-ink bg-cream-deep py-20">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="what we care about"
            eyebrowPalette="mint"
            title="The small print, but nice"
            align="center"
          />
          <Reveal as="ul" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <RevealItem
                key={v.title}
                as="li"
                className={`rounded-xl p-6 shadow-sticker-lg outline-ink ${valueTones[i % valueTones.length]}`}
              >
                <h3 className="font-display text-xl font-bold">{v.title}</h3>
                <p className="mt-2 text-sm text-ink-soft">{v.body}</p>
              </RevealItem>
            ))}
          </Reveal>
        </Container>
      </section>

      <Container className="flex flex-col gap-10 py-20">
        <SectionHeading
          eyebrow="the studio"
          eyebrowPalette="butter"
          title="Who's packing your scoop"
          align="center"
        />
        <TeamStickers />
      </Container>
    </>
  );
}
