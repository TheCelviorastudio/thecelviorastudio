import type { Category, CategorySlug, SortKey } from "@/lib/commerce/types";
import { CategoryChips } from "./CategoryChips";
import { SortSelect } from "./SortSelect";

export interface ShopToolbarProps {
  categories: Category[];
  category?: CategorySlug;
  sort: SortKey;
  count: number;
}

export function ShopToolbar({ categories, category, sort, count }: ShopToolbarProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <CategoryChips categories={categories} active={category} sort={sort} />
      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-ink-soft" aria-live="polite">
          {count} {count === 1 ? "piece" : "pieces"}
        </p>
        <SortSelect value={sort} category={category} />
      </div>
    </div>
  );
}
