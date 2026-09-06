import type { Metadata } from "next";
import { FaqAccordion } from "@/components/brand/FaqAccordion";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/data/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Answers about scoops, shipping, products and returns.",
};

export default function FaqPage() {
  return (
    <Container size="narrow" className="flex flex-col gap-12 py-10 sm:py-14">
      <SectionHeading
        as="h1"
        eyebrow="questions"
        eyebrowPalette="butter"
        title="Frequently asked"
        description="If it's not here, ask us on the contact page."
      />
      <FaqAccordion groups={faq} />
    </Container>
  );
}
