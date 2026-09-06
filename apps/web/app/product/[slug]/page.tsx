import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { ProductGallery } from "@/components/product/ProductGallery";
import { ProductInfo } from "@/components/product/ProductInfo";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { commerce } from "@/lib/commerce";
import { CURRENCY, SITE } from "@/lib/config";

export async function generateStaticParams() {
  const products = await commerce.listProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await commerce.getProduct(slug);
  if (!product) return { title: "Not found" };
  return {
    title: product.name,
    description: `${product.tagline}. ${product.description}`,
    openGraph: {
      title: product.name,
      description: product.tagline,
      images: product.images.map((i) => ({
        url: i.src,
        alt: i.alt,
        width: i.width,
        height: i.height,
      })),
    },
  };
}

export default async function ProductPage({ params }: PageProps<"/product/[slug]">) {
  const { slug } = await params;
  const product = await commerce.getProduct(slug);
  if (!product) notFound();

  const related = await commerce.listProducts({
    category: product.category,
    excludeSlug: product.slug,
    limit: 4,
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.id,
    image: product.images.map((i) => `${SITE.url}${i.src}`),
    brand: { "@type": "Brand", name: SITE.name },
    offers: {
      "@type": "Offer",
      priceCurrency: CURRENCY.code,
      price: product.price,
      availability: product.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      url: `${SITE.url}/product/${product.slug}`,
    },
  };

  return (
    <Container className="py-8 sm:py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Link
        href="/shop"
        className="mb-6 inline-flex items-center gap-1 text-sm font-medium text-ink-soft underline-offset-4 hover:underline"
      >
        <ChevronLeft className="size-4" aria-hidden />
        Back to all scoops
      </Link>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        <ProductGallery images={product.images} art={product.art} name={product.name} />
        <div className="lg:sticky lg:top-24 lg:self-start">
          <ProductInfo product={product} />
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-20 flex flex-col gap-8">
          <SectionHeading
            eyebrow="goes well with"
            eyebrowPalette="lavender"
            title="Other scoop sizes"
          />
          <ProductGrid products={related} />
        </section>
      ) : null}
    </Container>
  );
}
