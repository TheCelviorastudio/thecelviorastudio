import type { Metadata } from "next";
import { CartPage } from "@/components/cart/CartPage";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = { title: "Your cart" };

export default function Cart() {
  return (
    <Container className="flex flex-col gap-8 py-10 sm:py-14">
      <SectionHeading as="h1" eyebrow="your scoop" eyebrowPalette="pink" title="Cart" />
      <CartPage />
    </Container>
  );
}
