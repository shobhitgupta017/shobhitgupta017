import Link from "next/link";
import { Hero } from "@/components/home/Hero";
import { StickyShowcase } from "@/components/home/StickyShowcase";
import { CategoryCard } from "@/components/CategoryCard";
import { ProductCard } from "@/components/ProductCard";
import { ScrollReveal, StaggerGroup, StaggerItem } from "@/components/motion/ScrollReveal";
import { Parallax } from "@/components/motion/Parallax";
import { categories, getFeaturedProducts, getProduct, getProductsByCategory, products } from "@/data/products";
import { site } from "@/data/site";
import { formatInr } from "@/lib/format";

export default function HomePage() {
  const featured = getFeaturedProducts();
  const showcase = getProduct("aashirvaad-atta") ?? products[0];
  const popular = products.slice(0, 10);

  return (
    <>
      <Hero />

      <section className="container-page py-20 sm:py-28">
        <ScrollReveal>
          <p className="eyebrow">Shop by category</p>
          <h2 className="mt-3 max-w-2xl text-headline font-semibold text-ink">
            Everything a Delhi kitchen runs on.
          </h2>
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
          {categories.map((category) => (
            <StaggerItem key={category.slug} className="h-full">
              <CategoryCard category={category} count={getProductsByCategory(category.slug).length} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="bg-brand-50/40 py-20 sm:py-28">
        <div className="container-page">
          <ScrollReveal className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Handpicked</p>
              <h2 className="mt-3 text-headline font-semibold text-ink">Featured this week</h2>
            </div>
            <Link href="/category/staples-grains" className="btn-secondary">
              Browse staples
            </Link>
          </ScrollReveal>

          <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-4">
            {featured.map((product) => (
              <StaggerItem key={product.id} className="h-full">
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <StickyShowcase product={showcase} />

      <section className="container-page py-20 sm:py-28">
        <ScrollReveal>
          <p className="eyebrow">Popular in Krishna Nagar</p>
          <h2 className="mt-3 text-headline font-semibold text-ink">What the colony buys daily.</h2>
        </ScrollReveal>

        <StaggerGroup className="mt-12 grid grid-cols-2 gap-4 sm:gap-5 lg:grid-cols-5">
          {popular.map((product) => (
            <StaggerItem key={product.id} className="h-full">
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="container-page pb-24">
        <Parallax distance={60}>
          <div className="relative overflow-hidden rounded-4xl bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 px-8 py-16 text-white sm:px-14">
            <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 text-[220px] opacity-10">
              🛒
            </div>
            <ScrollReveal>
              <p className="eyebrow text-accent-400">Delivery promise</p>
              <h2 className="mt-4 max-w-2xl text-headline font-semibold">
                Free delivery above {formatInr(site.delivery.freeDeliveryThreshold)} — or above{" "}
                {formatInr(site.delivery.nearbyFreeDeliveryThreshold)} if you live within{" "}
                {site.delivery.nearbyRadiusKm} km.
              </h2>
              <p className="mt-5 max-w-xl text-white/70">
                We deliver to {site.delivery.serviceAreas.slice(0, -1).join(", ")} and nearby colonies,
                every day from {site.hours.label}.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/cart" className="btn bg-white text-ink hover:-translate-y-0.5">
                  View cart
                </Link>
                <Link href="/contact" className="btn border border-white/30 text-white hover:bg-white/10">
                  Store details
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </Parallax>
      </section>

      <section className="border-t border-ink/[0.06] bg-white py-20">
        <div className="container-page grid gap-10 sm:grid-cols-3">
          {[
            { title: "Call to order", body: site.phones.map((phone) => phone.number).join(" · "), href: `tel:${site.phones[0].tel}` },
            { title: "Email us", body: site.email, href: `mailto:${site.email}` },
            { title: "Visit the shop", body: site.address.full, href: "/contact" },
          ].map((item, index) => (
            <ScrollReveal key={item.title} delay={index * 0.08}>
              <a href={item.href} className="block rounded-3xl p-6 transition-colors hover:bg-brand-50/60">
                <p className="eyebrow">{item.title}</p>
                <p className="mt-3 text-lg font-medium text-ink">{item.body}</p>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </>
  );
}
