import { buttonStyles } from "@repo/ui/button";
import { StickerBadge } from "@/components/art/StickerBadge";
import { AnimatedContainer } from "@/components/motion/AnimatedContainer";
import { PressLink } from "@/components/motion/PressLink";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Container } from "@/components/ui/Container";
import { HeroShapes } from "./HeroShapes";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream dots-bg">
      <HeroShapes />
      <Container className="relative flex min-h-[78svh] flex-col items-center justify-center py-20 text-center sm:py-28">
        <AnimatedContainer animation="pop" delay={0.1}>
          <StickerBadge palette="pink" rotate={-4} size="lg">
            new scoop just dropped
          </StickerBadge>
        </AnimatedContainer>
        <SplitHeading
          as="h1"
          className="mt-6 max-w-5xl font-display text-display-xl font-bold text-balance"
          delay={0.35}
        >
          Little boxes of happiness, packed with love
        </SplitHeading>
        <AnimatedContainer animation="fadeUp" delay={0.9} className="mt-6 max-w-xl">
          <p className="text-lg text-ink-soft sm:text-xl">
            Curated scoops of jewellery, hair accessories and stationery in one gift-ready
            box. Small things, brighter days.
          </p>
        </AnimatedContainer>
        <AnimatedContainer
          animation="fadeUp"
          delay={1.05}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <PressLink
            href="/shop"
            className={buttonStyles({ variant: "pink", size: "lg" })}
          >
            Shop the scoop
          </PressLink>
          <PressLink
            href="/about"
            className={buttonStyles({ variant: "secondary", size: "lg" })}
          >
            Our story
          </PressLink>
        </AnimatedContainer>
      </Container>
    </section>
  );
}
