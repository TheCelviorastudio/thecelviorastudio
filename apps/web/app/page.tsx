import { AnnouncementMarquee } from "@/components/layout/AnnouncementMarquee";
import { FeaturedGrid } from "@/components/home/FeaturedGrid";
import { Hero } from "@/components/home/Hero";
import { ScoopParallax } from "@/components/home/ScoopParallax";
import { StoryTeaser } from "@/components/home/StoryTeaser";
import { ValuesMarquee } from "@/components/home/ValuesMarquee";
import { commerce } from "@/lib/commerce";

export default async function Home() {
  const [featured, newest] = await Promise.all([
    commerce.listProducts({ featuredOnly: true, limit: 8 }),
    commerce.listProducts({ sort: "newest", limit: 3 }),
  ]);

  return (
    <>
      <Hero />
      <AnnouncementMarquee />
      <FeaturedGrid products={featured} />
      <ScoopParallax products={newest} />
      <ValuesMarquee />
      <StoryTeaser />
    </>
  );
}
