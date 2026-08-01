"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Parallax } from "@/components/motion/Parallax";
import { QuantityStepper } from "@/components/QuantityStepper";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatInr } from "@/lib/format";
import { site } from "@/data/site";

export function ProductDetail({ product }: { product: Product }) {
  const variants = product.variants ?? [{ unit: product.unit, price: product.price }];
  const [variantIndex, setVariantIndex] = useState(
    Math.max(
      variants.findIndex((variant) => variant.unit === product.unit),
      0,
    ),
  );
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addItem } = useCart();

  const variant = variants[variantIndex];

  const onAdd = () => {
    addItem(product, { unit: variant.unit, price: variant.price, quantity });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="container-page grid gap-12 py-12 lg:grid-cols-2 lg:gap-20 lg:py-20">
      <Parallax distance={40}>
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-square overflow-hidden rounded-4xl border border-ink/[0.06] bg-brand-50/40 shadow-soft"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority
            sizes="(max-width: 1024px) 92vw, 520px"
            className="object-cover"
          />
        </motion.div>
      </Parallax>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="lg:py-6"
      >
        <nav className="text-sm text-ink-muted">
          <Link href="/" className="hover:text-brand-700">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link href={`/category/${product.category}`} className="hover:text-brand-700">
            {product.category.replace(/-/g, " ")}
          </Link>
        </nav>

        <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-ink-muted">
          {product.brand}
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink sm:text-5xl">
          {product.name}
        </h1>

        <div className="mt-5 flex items-end gap-3">
          <p className="text-3xl font-semibold text-ink">{formatInr(variant.price)}</p>
          {product.mrp && variantIndex === 0 && (
            <p className="pb-1 text-base text-ink-muted line-through">{formatInr(product.mrp)}</p>
          )}
        </div>

        <p className="mt-6 max-w-lg text-lg leading-relaxed text-ink-soft">{product.description}</p>

        {variants.length > 1 && (
          <div className="mt-8">
            <p className="field-label">Pack size</p>
            <div className="flex flex-wrap gap-2">
              {variants.map((option, index) => (
                <button
                  key={option.unit}
                  type="button"
                  onClick={() => setVariantIndex(index)}
                  className={`rounded-full border px-4 py-2 text-sm transition ${
                    index === variantIndex
                      ? "border-brand-600 bg-brand-50 font-semibold text-brand-700"
                      : "border-ink/10 text-ink-soft hover:border-ink/25"
                  }`}
                >
                  {option.unit} · {formatInr(option.price)}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <QuantityStepper quantity={quantity} onChange={(next) => setQuantity(Math.max(1, next))} />
          <button type="button" onClick={onAdd} disabled={!product.inStock} className="btn-primary">
            {product.inStock ? `Add to cart · ${formatInr(variant.price * quantity)}` : "Out of stock"}
          </button>
          <Link href="/cart" className="btn-secondary">
            Go to cart
          </Link>
        </div>

        {added && (
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm font-medium text-brand-700"
          >
            Added to your cart.
          </motion.p>
        )}

        <dl className="mt-10 grid gap-4 rounded-3xl bg-brand-50/60 p-6 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-ink-muted">Delivery</dt>
            <dd className="mt-1 text-ink">
              Free above {formatInr(site.delivery.freeDeliveryThreshold)} in service areas
            </dd>
          </div>
          <div>
            <dt className="text-ink-muted">Nearby (≤ {site.delivery.nearbyRadiusKm} km)</dt>
            <dd className="mt-1 text-ink">
              Free above {formatInr(site.delivery.nearbyFreeDeliveryThreshold)}
            </dd>
          </div>
          <div>
            <dt className="text-ink-muted">Store hours</dt>
            <dd className="mt-1 text-ink">{site.hours.label}</dd>
          </div>
          <div>
            <dt className="text-ink-muted">Questions?</dt>
            <dd className="mt-1 text-ink">
              <a href={`tel:${site.phones[0].tel}`} className="hover:text-brand-700">
                {site.phones[0].number}
              </a>
            </dd>
          </div>
        </dl>
      </motion.div>
    </div>
  );
}
