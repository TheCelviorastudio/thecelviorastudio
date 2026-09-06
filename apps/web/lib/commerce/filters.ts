import type { CategorySlug, Product, ProductQuery, SortKey } from "./types";

export const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
];

export function isSortKey(value: unknown): value is SortKey {
  return SORT_OPTIONS.some((o) => o.value === value);
}

export function isCategorySlug(value: unknown): value is CategorySlug {
  return value === "gift-boxes";
}

const sorters: Record<SortKey, (a: Product, b: Product) => number> = {
  featured: (a, b) =>
    Number(Boolean(b.featured)) - Number(Boolean(a.featured)) ||
    b.createdAt.localeCompare(a.createdAt),
  newest: (a, b) => b.createdAt.localeCompare(a.createdAt),
  "price-asc": (a, b) => a.price - b.price,
  "price-desc": (a, b) => b.price - a.price,
};

export function applyQuery(products: Product[], query: ProductQuery = {}): Product[] {
  let out = products;
  if (query.category) out = out.filter((p) => p.category === query.category);
  if (query.featuredOnly) out = out.filter((p) => p.featured);
  if (query.excludeSlug) out = out.filter((p) => p.slug !== query.excludeSlug);
  out = [...out].sort(sorters[query.sort ?? "featured"]);
  if (query.limit) out = out.slice(0, query.limit);
  return out;
}
