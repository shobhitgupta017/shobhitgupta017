"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CartLineWithProduct } from "@/context/CartContext";
import { useCart } from "@/context/CartContext";
import { formatInr } from "@/lib/format";
import { QuantityStepper } from "@/components/QuantityStepper";

export function CartItem({ line }: { line: CartLineWithProduct }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ type: "spring", stiffness: 200, damping: 24 }}
      className="flex gap-4 border-b border-ink/[0.06] py-5 last:border-b-0"
    >
      <Link
        href={`/product/${line.productId}`}
        className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-brand-50/50"
      >
        <Image src={line.product.image} alt={line.product.name} fill sizes="80px" className="object-cover" />
      </Link>

      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/product/${line.productId}`} className="text-[15px] font-semibold text-ink hover:text-brand-700">
              {line.product.name}
            </Link>
            <p className="text-sm text-ink-muted">
              {line.unit} · {formatInr(line.price)}
            </p>
          </div>
          <p className="text-[15px] font-semibold tabular-nums text-ink">
            {formatInr(line.price * line.quantity)}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <QuantityStepper
            size="sm"
            label={`${line.product.name} quantity`}
            quantity={line.quantity}
            onChange={(quantity) => updateQuantity(line.key, quantity)}
          />
          <button
            type="button"
            onClick={() => removeItem(line.key)}
            className="text-sm text-ink-muted transition-colors hover:text-red-600"
          >
            Remove
          </button>
        </div>
      </div>
    </motion.li>
  );
}
