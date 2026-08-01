import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/ProductDetail";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/motion/ScrollReveal";
import { getProduct, getProductsByCategory, products } from "@/data/products";

type Params = { params: { id: string } };

export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export function generateMetadata({ params }: Params): Metadata {
  const product = getProduct(params.id);
  if (!product) return { title: "Product not found" };
  return { title: `${product.name} (${product.unit})`, description: product.description };
}

export default function ProductPage({ params }: Params) {
  const product = getProduct(params.id);
  if (!product) notFound();

  const related = getProductsByCategory(product.category)
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <>
      <ProductDetail product={product} />

      {related.length > 0 && (
        <section className="container-page pb-24">
          <ScrollReveal>
            <h2 className="text-headline font-semibold text-ink">You may also need</h2>
          </ScrollReveal>
          <StaggerGroup className="mt-10 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {related.map((item) => (
              <StaggerItem key={item.id} className="h-full">
                <ProductCard product={item} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}
    </>
  );
}
