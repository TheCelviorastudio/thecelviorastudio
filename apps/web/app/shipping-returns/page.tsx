import type { Metadata } from "next";
import { PolicySection } from "@/components/brand/PolicySection";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { policies } from "@/data/policies";

export const metadata: Metadata = {
  title: "Shipping & returns",
  description: "Delivery times, costs, and how returns work.",
};

export default function ShippingReturnsPage() {
  return (
    <Container size="narrow" className="flex flex-col gap-10 py-10 sm:py-14">
      <SectionHeading
        as="h1"
        eyebrow="the practical bit"
        eyebrowPalette="sky"
        title="Shipping & returns"
        description="Short version: we ship fast, and we'll make it right if something goes wrong."
      />
      <nav aria-label="On this page" className="flex flex-wrap gap-2">
        {policies.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className="rounded-full bg-white px-4 py-2 font-display text-sm font-semibold outline-ink transition-colors hover:bg-butter"
          >
            {p.title}
          </a>
        ))}
      </nav>
      <div className="flex flex-col gap-6">
        {policies.map((p) => (
          <PolicySection key={p.id} section={p} />
        ))}
      </div>
    </Container>
  );
}
