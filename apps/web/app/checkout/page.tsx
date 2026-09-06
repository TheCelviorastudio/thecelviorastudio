import type { Metadata } from "next";
import { CheckoutFlow } from "@/components/checkout/CheckoutFlow";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Checkout", robots: { index: false } };

export default function CheckoutPage() {
  return (
    <Container className="flex flex-col gap-8 py-10 sm:py-14">
      <SectionHeading
        as="h1"
        eyebrow="almost there"
        eyebrowPalette="mint"
        title="Checkout"
      />
      <CheckoutFlow />
    </Container>
  );
}
