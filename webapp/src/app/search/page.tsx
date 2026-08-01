import type { Metadata } from "next";
import { ProductBrowser } from "@/components/ProductBrowser";
import { searchProducts } from "@/data/products";

export const metadata: Metadata = { title: "Search" };

export default function SearchPage({
  searchParams,
}: {
  searchParams: { q?: string };
}) {
  const query = searchParams.q?.trim() ?? "";
  const results = searchProducts(query);

  return (
    <section className="container-page py-14 sm:py-20">
      <p className="eyebrow">Search</p>
      <h1 className="mt-3 text-headline font-semibold text-ink">
        {query ? `Results for “${query}”` : "Search our shelves"}
      </h1>

      <div className="mt-10">
        {query && results.length === 0 ? (
          <p className="text-ink-soft">
            We could not find anything for “{query}”. Try a broader word such as “milk”, “atta” or
            “soap”.
          </p>
        ) : (
          <ProductBrowser products={results} showSearch={false} />
        )}
      </div>
    </section>
  );
}
