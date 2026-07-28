"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CartItem } from "@/components/CartItem";
import { FreeDeliveryProgress } from "@/components/FreeDeliveryProgress";
import { DeliveryZonePicker } from "@/components/DeliveryZonePicker";
import { useCart } from "@/context/CartContext";
import { site } from "@/data/site";
import { getDeliveryQuote, meetsMinimumOrder } from "@/lib/delivery";
import type { DeliveryZone } from "@/lib/delivery";
import { formatInr } from "@/lib/format";

export default function CartPage() {
  const { lines, subtotal, isReady, clearCart } = useCart();
  const [zone, setZone] = useState<DeliveryZone>("service-area");
  const quote = getDeliveryQuote(subtotal, zone);
  const belowMinimum = subtotal > 0 && !meetsMinimumOrder(subtotal);

  if (isReady && lines.length === 0)
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <p className="text-6xl">🛒</p>
        <h1 className="mt-6 text-headline font-semibold text-ink">Your cart is empty</h1>
        <p className="mt-3 max-w-md text-ink-soft">
          Add a few essentials and we will bring them over — {site.hours.label}, {site.hours.days}.
        </p>
        <Link href="/" className="btn-primary mt-8">
          Start shopping
        </Link>
      </section>
    );

  return (
    <section className="container-page py-12 sm:py-16">
      <p className="eyebrow">Your basket</p>
      <h1 className="mt-3 text-headline font-semibold text-ink">Cart</h1>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="card p-5 sm:p-7">
          <ul>
            <AnimatePresence initial={false}>
              {lines.map((line) => (
                <CartItem key={line.key} line={line} />
              ))}
            </AnimatePresence>
          </ul>
          <div className="mt-6 flex justify-between border-t border-ink/[0.06] pt-5">
            <Link href="/" className="text-sm font-medium text-brand-700 hover:text-brand-800">
              ← Continue shopping
            </Link>
            <button onClick={clearCart} className="text-sm text-ink-muted hover:text-red-600">
              Clear cart
            </button>
          </div>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-40 lg:self-start">
          <DeliveryZonePicker zone={zone} onChange={setZone} />
          <FreeDeliveryProgress quote={quote} />

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-ink">Order summary</h2>
            <dl className="mt-5 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="font-medium tabular-nums text-ink">{formatInr(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Delivery</dt>
                <dd className="font-medium tabular-nums text-ink">
                  {quote.isFree ? (
                    <span className="text-brand-700">Free</span>
                  ) : (
                    formatInr(quote.charge)
                  )}
                </dd>
              </div>
              <div className="flex justify-between border-t border-ink/[0.06] pt-3 text-base">
                <dt className="font-semibold text-ink">Total</dt>
                <dd className="font-semibold tabular-nums text-ink">{formatInr(quote.total)}</dd>
              </div>
            </dl>

            {belowMinimum && (
              <p className="mt-4 rounded-2xl bg-accent-400/15 px-4 py-3 text-sm text-ink">
                Minimum order value is {formatInr(site.delivery.minimumOrderValue)}. Add{" "}
                {formatInr(site.delivery.minimumOrderValue - subtotal)} more to check out.
              </p>
            )}

            <Link
              href="/checkout"
              aria-disabled={belowMinimum}
              className={`btn-primary mt-6 w-full ${belowMinimum ? "pointer-events-none opacity-50" : ""}`}
            >
              Proceed to checkout
            </Link>
            <p className="mt-3 text-center text-xs text-ink-muted">
              {site.paymentMethods.map((method) => method.label).join(" · ")}
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
