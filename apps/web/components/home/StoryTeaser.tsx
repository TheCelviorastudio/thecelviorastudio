import { buttonStyles } from "@repo/ui/button";
import { ProductArt } from "@/components/art/ProductArt";
import { PressLink } from "@/components/motion/PressLink";
import { Reveal, RevealItem } from "@/components/motion/Reveal";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function StoryTeaser() {
  return (
    <section className="py-20 sm:py-28">
      <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.2fr]">
        <Reveal className="relative mx-auto w-full max-w-sm">
          <RevealItem className="animate-float">
            <ProductArt art={{ palette: "butter", shape: "heart", seed: 5 }} />
          </RevealItem>
          <RevealItem className="absolute -right-4 -bottom-6 w-1/2 animate-float [animation-delay:-2s]">
            <ProductArt
              art={{ palette: "sky", shape: "notebook", seed: 9 }}
              sprinkles={false}
            />
          </RevealItem>
        </Reveal>
        <Reveal className="flex flex-col gap-6">
          <RevealItem>
            <SectionHeading
              eyebrow="hi, we're celviora"
              eyebrowPalette="pink"
              title="A desk, a doodle, and a drawer of hoops"
              description="thecelviorastudio started as a habit of buying too many earrings and too many notebooks. We turned it into a tiny shop that ships small, curated scoops from Bengaluru."
            />
          </RevealItem>
          <RevealItem>
            <PressLink href="/about" className={buttonStyles({ variant: "lavender" })}>
              Read our story
            </PressLink>
          </RevealItem>
        </Reveal>
      </Container>
    </section>
  );
}
