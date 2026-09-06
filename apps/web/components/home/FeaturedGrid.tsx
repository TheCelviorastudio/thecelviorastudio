import { ArrowRight } from "lucide-react";
import { buttonStyles } from "@repo/ui/button";
import { PressLink } from "@/components/motion/PressLink";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Product } from "@/lib/commerce/types";

export function FeaturedGrid({ products }: { products: Product[] }) {
  return (
    <section className="py-20 sm:py-28">
      <Container className="flex flex-col gap-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            eyebrow="fresh from the scoop"
            eyebrowPalette="mint"
            title="This month's favourites"
            description="The pieces our studio keeps stealing back from the packing table."
          />
          <PressLink href="/shop" className={buttonStyles({ variant: "secondary" })}>
            See all
            <ArrowRight className="size-4" aria-hidden />
          </PressLink>
        </div>
        <ProductGrid products={products} />
      </Container>
    </section>
  );
}
