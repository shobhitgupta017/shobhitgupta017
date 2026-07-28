import Link from "next/link";
import type { Category } from "@/data/products";

export function CategoryCard({ category, count }: { category: Category; count?: number }) {
  return (
    <Link
      href={`/category/${category.slug}`}
      className={`group relative flex h-full flex-col justify-between overflow-hidden rounded-3xl border border-ink/[0.06] bg-gradient-to-br ${category.gradient} p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift`}
    >
      <span className="text-4xl transition-transform duration-500 group-hover:scale-110">
        {category.emoji}
      </span>
      <div className="mt-10">
        <h3 className="text-lg font-semibold tracking-tight text-ink">{category.name}</h3>
        <p className="mt-1 text-sm text-ink-soft">{category.tagline}</p>
        {typeof count === "number" && (
          <p className="mt-3 text-xs font-medium uppercase tracking-widest text-ink-muted">
            {count} items
          </p>
        )}
      </div>
      <span className="pointer-events-none absolute bottom-5 right-6 text-xl text-ink-muted opacity-0 transition-all duration-500 group-hover:translate-x-1 group-hover:opacity-100">
        →
      </span>
    </Link>
  );
}
