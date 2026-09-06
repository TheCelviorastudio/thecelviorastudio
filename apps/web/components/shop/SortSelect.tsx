"use client";

import type { Route } from "next";
import { useRouter } from "next/navigation";
import { Select } from "@repo/ui/select";
import { SORT_OPTIONS } from "@/lib/commerce/filters";
import type { CategorySlug, SortKey } from "@/lib/commerce/types";

export function SortSelect({
  value,
  category,
}: {
  value: SortKey;
  category?: CategorySlug;
}) {
  const router = useRouter();
  return (
    <label className="flex items-center gap-2 text-sm font-medium">
      <span className="hidden sm:inline">Sort</span>
      <Select
        aria-label="Sort products"
        value={value}
        className="h-11 w-auto min-w-44 pr-11"
        onChange={(e) => {
          const params = new URLSearchParams();
          if (category) params.set("category", category);
          if (e.target.value !== "featured") params.set("sort", e.target.value);
          const qs = params.toString();
          router.replace((qs ? `/shop?${qs}` : "/shop") as Route, { scroll: false });
        }}
      >
        {SORT_OPTIONS.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </Select>
    </label>
  );
}
