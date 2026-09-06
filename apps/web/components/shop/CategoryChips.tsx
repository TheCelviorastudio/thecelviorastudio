"use client";

import { LayoutGroup, motion } from "framer-motion";
import type { Route } from "next";
import Link from "next/link";
import { cn } from "@repo/ui/cn";
import type { Category, CategorySlug, SortKey } from "@/lib/commerce/types";
import { press, spring } from "@/lib/transitions";

export interface CategoryChipsProps {
  categories: Category[];
  active?: CategorySlug;
  sort: SortKey;
}

function href(category: CategorySlug | undefined, sort: SortKey): Route {
  const params = new URLSearchParams();
  if (category) params.set("category", category);
  if (sort !== "featured") params.set("sort", sort);
  const qs = params.toString();
  return (qs ? `/shop?${qs}` : "/shop") as Route;
}

export function CategoryChips({ categories, active, sort }: CategoryChipsProps) {
  const chips: { slug?: CategorySlug; label: string }[] = [
    { label: "All scoops" },
    ...categories.map((c) => ({ slug: c.slug, label: c.name })),
  ];

  return (
    <LayoutGroup id="category-chips">
      <nav
        aria-label="Categories"
        className="-mx-4 no-scrollbar flex gap-2 overflow-x-auto px-4 sm:mx-0 sm:px-0"
      >
        {chips.map((chip) => {
          const isActive = chip.slug === active;
          return (
            <motion.div key={chip.label} whileTap={press} className="shrink-0">
              <Link
                href={href(chip.slug, sort)}
                scroll={false}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "relative inline-flex h-11 items-center rounded-full px-5 font-display text-sm font-semibold outline-ink transition-colors",
                  isActive ? "text-ink" : "bg-white text-ink-soft hover:bg-cream-deep",
                )}
              >
                {isActive ? (
                  <motion.span
                    layoutId="category-pill"
                    transition={spring.snappy}
                    className="absolute inset-0 -z-10 rounded-full bg-lavender shadow-sticker"
                  />
                ) : null}
                {chip.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    </LayoutGroup>
  );
}
