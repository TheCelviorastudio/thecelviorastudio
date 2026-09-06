import { buttonStyles } from "@repo/ui/button";
import { StickerBadge } from "@/components/art/StickerBadge";
import { HeroShapes } from "@/components/home/HeroShapes";
import { AnimatedContainer } from "@/components/motion/AnimatedContainer";
import { PressLink } from "@/components/motion/PressLink";
import { SplitHeading } from "@/components/motion/SplitHeading";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-butter dots-bg">
      <HeroShapes />
      <Container className="relative flex min-h-[70svh] flex-col items-center justify-center gap-5 py-20 text-center">
        <AnimatedContainer animation="pop">
          <StickerBadge palette="white" rotate={-5} size="lg">
            404
          </StickerBadge>
        </AnimatedContainer>
        <SplitHeading
          as="h1"
          className="font-display text-display-xl font-bold"
          delay={0.2}
        >
          This scoop melted
        </SplitHeading>
        <AnimatedContainer animation="fadeUp" delay={0.7} className="max-w-md">
          <p className="text-lg text-ink-soft">
            The page you&apos;re after isn&apos;t here. Maybe it sold out, maybe it never
            existed.
          </p>
        </AnimatedContainer>
        <AnimatedContainer
          animation="fadeUp"
          delay={0.85}
          className="flex flex-wrap justify-center gap-3"
        >
          <PressLink
            href="/shop"
            className={buttonStyles({ variant: "pink", size: "lg" })}
          >
            Back to the shop
          </PressLink>
          <PressLink
            href="/"
            className={buttonStyles({ variant: "secondary", size: "lg" })}
          >
            Home
          </PressLink>
        </AnimatedContainer>
      </Container>
    </section>
  );
}
