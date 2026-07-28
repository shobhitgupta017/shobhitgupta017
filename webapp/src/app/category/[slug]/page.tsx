import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductBrowser } from "@/components/ProductBrowser";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { categories, getCategory, getProductsByCategory } from "@/data/products";

type Params = { params: { slug: string } };

export function generateStaticParams() {
  return categories.map((category) => ({ slug: category.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const category = getCategory(params.slug);
  if (!category) return { title: "Category not found" };
  return { title: category.name, description: `${category.name} — ${category.tagline}` };
}

export default function CategoryPage({ params }: Params) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const items = getProductsByCategory(category.slug);

  return (
    <>
      <section className={`bg-gradient-to-br ${category.gradient} border-b border-ink/[0.06]`}>
        <div className="container-page py-16 sm:py-20">
          <ScrollReveal>
            <nav className="text-sm text-ink-muted">
              <Link href="/" className="hover:text-brand-700">
                Home
              </Link>
              <span className="px-2">/</span>
              <span className="text-ink">{category.name}</span>
            </nav>
            <p className="mt-8 text-5xl">{category.emoji}</p>
            <h1 className="mt-4 text-headline font-semibold text-ink">{category.name}</h1>
            <p className="mt-3 max-w-xl text-lg text-ink-soft">{category.tagline}</p>
          </ScrollReveal>
        </div>
      </section>

      <section className="container-page py-12 sm:py-16">
        <ProductBrowser products={items} />
      </section>

      <section className="container-page pb-20">
        <h2 className="text-sm font-semibold uppercase tracking-widest text-ink-muted">
          Other categories
        </h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {categories
            .filter((other) => other.slug !== category.slug)
            .map((other) => (
              <Link
                key={other.slug}
                href={`/category/${other.slug}`}
                className="rounded-full border border-ink/10 px-4 py-2 text-sm text-ink-soft transition hover:border-brand-500 hover:text-brand-700"
              >
                {other.emoji} {other.name}
              </Link>
            ))}
        </div>
      </section>
    </>
  );
}
