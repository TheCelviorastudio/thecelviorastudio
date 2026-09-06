import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { ShopToolbar } from "@/components/shop/ShopToolbar";
import { commerce } from "@/lib/commerce";
import { isCategorySlug, isSortKey } from "@/lib/commerce/filters";

export const metadata: Metadata = {
  title: "Shop",
  description: "Every gift box we currently pack, from the Mini Scoop to the Grand Scoop.",
};

export default async function ShopPage({ searchParams }: PageProps<"/shop">) {
  const sp = await searchParams;
  const category = isCategorySlug(sp.category) ? sp.category : undefined;
  const sort = isSortKey(sp.sort) ? sp.sort : "featured";

  const [products, categories] = await Promise.all([
    commerce.listProducts({ category, sort }),
    commerce.listCategories(),
  ]);
  const current = categories.find((c) => c.slug === category);

  return (
    <Container className="flex flex-col gap-8 py-10 sm:py-14">
      <SectionHeading
        as="h1"
        eyebrow={current ? current.tagline : "all scoops"}
        eyebrowPalette={current?.palette ?? "pink"}
        title={current ? current.name : "The whole scoop"}
        description={
          current?.description ??
          "Four sizes of the same idea: jewellery, hair accessories and stationery, packed with love."
        }
      />
      <ShopToolbar
        categories={categories}
        category={category}
        sort={sort}
        count={products.length}
      />
      <ProductGrid key={`${category ?? "all"}-${sort}`} products={products} />
    </Container>
  );
}
