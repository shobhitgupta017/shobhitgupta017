"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { StaggerGroup, StaggerItem } from "@/components/motion/ScrollReveal";
import type { Product } from "@/data/products";

type SortKey = "popular" | "price-asc" | "price-desc" | "name";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "popular", label: "Popularity" },
  { value: "price-asc", label: "Price: low to high" },
  { value: "price-desc", label: "Price: high to low" },
  { value: "name", label: "Name: A to Z" },
];

export function ProductBrowser({
  products,
  showSearch = true,
}: {
  products: Product[];
  showSearch?: boolean;
}) {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    const filtered = q
      ? products.filter((product) =>
          `${product.name} ${product.brand} ${product.description}`.toLowerCase().includes(q),
        )
      : products;

    const sorted = [...filtered];
    if (sort === "price-asc") sorted.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") sorted.sort((a, b) => b.price - a.price);
    if (sort === "name") sorted.sort((a, b) => a.name.localeCompare(b.name));
    if (sort === "popular") sorted.sort((a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured)));
    return sorted;
  }, [products, query, sort]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {showSearch && (
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search in this category…"
            aria-label="Search in this category"
            className="field h-11 max-w-sm rounded-full py-0"
          />
        )}
        <label className="flex items-center gap-2 text-sm text-ink-soft">
          Sort by
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="field h-11 w-auto rounded-full py-0 pr-8 text-sm"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="mt-4 text-sm text-ink-muted">
        {visible.length} {visible.length === 1 ? "product" : "products"}
      </p>

      {visible.length === 0 ? (
        <p className="mt-16 text-center text-ink-soft">
          Nothing matched that search. Try a different word, or call us on the number in the header —
          we probably have it on the shelf.
        </p>
      ) : (
        <StaggerGroup className="mt-6 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {visible.map((product) => (
            <StaggerItem key={product.id} className="h-full">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      )}
    </div>
  );
}
