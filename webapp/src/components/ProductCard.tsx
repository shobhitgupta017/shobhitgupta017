"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import type { Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { formatInr } from "@/lib/format";
import { QuantityStepper } from "@/components/QuantityStepper";

export function ProductCard({ product }: { product: Product }) {
  const { addItem, quantityOf, updateQuantity } = useCart();
  const reduceMotion = useReducedMotion();
  const quantity = quantityOf(product.id, product.unit);
  const saving = product.mrp ? product.mrp - product.price : 0;

  return (
    <motion.article
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="card group flex h-full flex-col overflow-hidden transition-shadow duration-300 hover:shadow-lift"
    >
      <Link href={`/product/${product.id}`} className="relative block aspect-square overflow-hidden bg-brand-50/40">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 22vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.06]"
        />
        {saving > 0 && (
          <span className="absolute left-3 top-3 rounded-full bg-accent-500 px-2.5 py-1 text-[11px] font-bold text-ink">
            Save {formatInr(saving)}
          </span>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-medium uppercase tracking-widest text-ink-muted">
          {product.brand}
        </p>
        <Link href={`/product/${product.id}`} className="mt-1 line-clamp-2 text-[15px] font-semibold leading-snug text-ink hover:text-brand-700">
          {product.name}
        </Link>
        <p className="mt-1 text-sm text-ink-muted">{product.unit}</p>

        <div className="mt-auto flex items-end justify-between gap-3 pt-4">
          <div>
            <p className="text-lg font-semibold text-ink">{formatInr(product.price)}</p>
            {product.mrp && (
              <p className="text-xs text-ink-muted line-through">{formatInr(product.mrp)}</p>
            )}
          </div>

          {quantity > 0 ? (
            <QuantityStepper
              size="sm"
              label={`${product.name} quantity`}
              quantity={quantity}
              onChange={(next) => updateQuantity(`${product.id}::${product.unit}`, next)}
            />
          ) : (
            <button
              type="button"
              onClick={() => addItem(product)}
              disabled={!product.inStock}
              className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition-all duration-300 hover:bg-brand-700 hover:shadow-lift disabled:cursor-not-allowed disabled:bg-ink/20"
            >
              {product.inStock ? "Add" : "Out of stock"}
            </button>
          )}
        </div>
      </div>
    </motion.article>
  );
}
