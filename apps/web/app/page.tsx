import { AnnouncementMarquee } from "@/components/layout/AnnouncementMarquee";
import { CategoryShowcase } from "@/components/home/CategoryShowcase";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { Hero } from "@/components/home/Hero";
import { ScoopParallax } from "@/components/home/ScoopParallax";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { ValuesMarquee } from "@/components/home/ValuesMarquee";
import { commerce } from "@/lib/commerce";

export default async function Home() {
  const [featured, categories, newest] = await Promise.all([
    commerce.listProducts({ featuredOnly: true, limit: 8 }),
    commerce.listCategories(),
    commerce.listProducts({ sort: "newest", limit: 3 }),
  ]);
  const heroes = Object.fromEntries(
    categories.map((c) => [c.slug, featured.find((p) => p.category === c.slug)]),
  );

  return (
    <>
      <Hero />
      <AnnouncementMarquee />
      <CategoryShowcase categories={categories} heroes={heroes} />
      <FeaturedGrid products={featured} />
      <ScoopParallax products={newest} />
      <ValuesMarquee />
      <StoryTeaser />
    </>
  );
}
