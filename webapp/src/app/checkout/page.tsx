"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { motion } from "framer-motion";
import { DeliveryZonePicker } from "@/components/DeliveryZonePicker";
import { FreeDeliveryProgress } from "@/components/FreeDeliveryProgress";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import { site } from "@/data/site";
import { getDeliveryQuote, meetsMinimumOrder } from "@/lib/delivery";
import type { DeliveryZone } from "@/lib/delivery";
import { formatInr } from "@/lib/format";

type PlacedOrder = {
  id: string;
  name: string;
  total: number;
  payment: string;
  itemCount: number;
};

export default function CheckoutPage() {
  const { lines, subtotal, itemCount, clearCart, isReady } = useCart();
  const { user, isLoggedIn } = useAuth();

  const [zone, setZone] = useState<DeliveryZone>("service-area");
  const [payment, setPayment] = useState<"cod" | "upi">("cod");
  const [form, setForm] = useState<{
    name: string;
    email: string;
    phone: string;
    address: string;
    area: string;
    notes: string;
  }>({
    name: "",
    email: "",
    phone: "",
    address: "",
    area: site.delivery.serviceAreas[0],
    notes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [order, setOrder] = useState<PlacedOrder | null>(null);

  useEffect(() => {
    if (user)
      setForm((current) => ({
        ...current,
        name: current.name || user.name,
        email: current.email || user.email,
        phone: current.phone || user.phone || "",
      }));
  }, [user]);

  const quote = getDeliveryQuote(subtotal, zone);

  const update = (key: keyof typeof form, value: string) =>
    setForm((current) => ({ ...current, [key]: value }));

  const placeOrder = (event: FormEvent) => {
    event.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (!form.name.trim()) nextErrors.name = "Please tell us who to deliver to.";
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s|\+91/g, "")))
      nextErrors.phone = "Enter a valid 10-digit mobile number.";
    if (!form.address.trim()) nextErrors.address = "Please enter your full delivery address.";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      nextErrors.email = "Enter a valid email address.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setOrder({
      id: `MMGS-${Date.now().toString().slice(-6)}`,
      name: form.name.trim(),
      total: quote.total,
      payment: site.paymentMethods.find((method) => method.id === payment)?.label ?? "Cash on Delivery",
      itemCount,
    });
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (order)
    return (
      <section className="container-page flex min-h-[70vh] items-center justify-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="card max-w-lg p-10 text-center"
        >
          <p className="text-5xl">🎉</p>
          <h1 className="mt-6 text-3xl font-semibold tracking-tight text-ink">
            Thank you, {order.name.split(" ")[0]}!
          </h1>
          <p className="mt-3 text-ink-soft">
            Your order <span className="font-semibold text-ink">{order.id}</span> is confirmed. We
            will call you on {form.phone} to confirm the delivery slot.
          </p>
          <dl className="mt-8 space-y-2 rounded-2xl bg-brand-50/70 p-5 text-left text-sm">
            <div className="flex justify-between">
              <dt className="text-ink-soft">Items</dt>
              <dd className="text-ink">{order.itemCount}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Payment</dt>
              <dd className="text-ink">{order.payment}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-ink-soft">Amount payable</dt>
              <dd className="font-semibold text-ink">{formatInr(order.total)}</dd>
            </div>
          </dl>
          <p className="mt-6 text-xs text-ink-muted">
            This is a demo checkout — no payment has been taken and no order has been sent to the
            store.
          </p>
          <Link href="/" className="btn-primary mt-8">
            Back to shop
          </Link>
        </motion.div>
      </section>
    );

  if (isReady && lines.length === 0)
    return (
      <section className="container-page flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
        <h1 className="text-headline font-semibold text-ink">Nothing to check out</h1>
        <p className="mt-3 text-ink-soft">Add some items to your cart first.</p>
        <Link href="/" className="btn-primary mt-8">
          Start shopping
        </Link>
      </section>
    );

  const canPlaceOrder = meetsMinimumOrder(subtotal);

  return (
    <section className="container-page py-12 sm:py-16">
      <p className="eyebrow">Almost there</p>
      <h1 className="mt-3 text-headline font-semibold text-ink">Checkout</h1>

      <form onSubmit={placeOrder} className="mt-10 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          <div className="card p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-semibold text-ink">
                {isLoggedIn ? `Logged in as ${user?.name}` : "Continue as guest"}
              </h2>
              {!isLoggedIn && (
                <Link href="/login?redirect=/checkout" className="text-sm font-medium text-brand-700">
                  Log in instead →
                </Link>
              )}
            </div>
            <p className="mt-2 text-sm text-ink-soft">
              {isLoggedIn
                ? "We have pre-filled your details. Edit them below if this order goes elsewhere."
                : "You can place this order without an account, or log in to save your details for next time."}
            </p>
          </div>

          <div className="card space-y-5 p-6">
            <h2 className="text-lg font-semibold text-ink">Delivery details</h2>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="field-label">
                  Full name
                </label>
                <input
                  id="name"
                  className="field"
                  value={form.name}
                  onChange={(event) => update("name", event.target.value)}
                  placeholder="Your name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="phone" className="field-label">
                  Mobile number
                </label>
                <input
                  id="phone"
                  className="field"
                  value={form.phone}
                  onChange={(event) => update("phone", event.target.value)}
                  placeholder="10-digit mobile number"
                  inputMode="tel"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-600">{errors.phone}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="email" className="field-label">
                Email (optional)
              </label>
              <input
                id="email"
                className="field"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                placeholder="you@example.com"
                type="email"
              />
              {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
            </div>

            <div>
              <label htmlFor="address" className="field-label">
                Delivery address
              </label>
              <textarea
                id="address"
                rows={3}
                className="field resize-none"
                value={form.address}
                onChange={(event) => update("address", event.target.value)}
                placeholder="House / flat number, street, landmark"
              />
              {errors.address && <p className="mt-1 text-xs text-red-600">{errors.address}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="area" className="field-label">
                  Service area
                </label>
                <select
                  id="area"
                  className="field"
                  value={form.area}
                  onChange={(event) => update("area", event.target.value)}
                >
                  {site.delivery.serviceAreas.map((area) => (
                    <option key={area} value={area}>
                      {area}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="notes" className="field-label">
                  Delivery notes (optional)
                </label>
                <input
                  id="notes"
                  className="field"
                  value={form.notes}
                  onChange={(event) => update("notes", event.target.value)}
                  placeholder="Ring the bell twice"
                />
              </div>
            </div>
          </div>

          <DeliveryZonePicker zone={zone} onChange={setZone} />

          <fieldset className="card p-6">
            <legend className="px-1 text-lg font-semibold text-ink">Payment method</legend>
            <div className="mt-4 space-y-3">
              {site.paymentMethods.map((method) => (
                <label
                  key={method.id}
                  className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
                    payment === method.id
                      ? "border-brand-600 bg-brand-50/70"
                      : "border-ink/10 hover:border-ink/25"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method.id}
                    checked={payment === method.id}
                    onChange={() => setPayment(method.id)}
                    className="mt-1 accent-brand-600"
                  />
                  <span>
                    <span className="block font-medium text-ink">{method.label}</span>
                    <span className="block text-ink-muted">{method.description}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-40 lg:self-start">
          <FreeDeliveryProgress quote={quote} />

          <div className="card p-6">
            <h2 className="text-lg font-semibold text-ink">Order summary</h2>
            <ul className="mt-4 space-y-3 text-sm">
              {lines.map((line) => (
                <li key={line.key} className="flex justify-between gap-3">
                  <span className="text-ink-soft">
                    {line.product.name}
                    <span className="text-ink-muted"> × {line.quantity}</span>
                  </span>
                  <span className="tabular-nums text-ink">
                    {formatInr(line.price * line.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <dl className="mt-5 space-y-3 border-t border-ink/[0.06] pt-4 text-sm">
              <div className="flex justify-between">
                <dt className="text-ink-soft">Subtotal</dt>
                <dd className="tabular-nums text-ink">{formatInr(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink-soft">Delivery</dt>
                <dd className="tabular-nums text-ink">
                  {quote.isFree ? <span className="text-brand-700">Free</span> : formatInr(quote.charge)}
                </dd>
              </div>
              <div className="flex justify-between border-t border-ink/[0.06] pt-3 text-base font-semibold">
                <dt>Total</dt>
                <dd className="tabular-nums">{formatInr(quote.total)}</dd>
              </div>
            </dl>

            {!canPlaceOrder && (
              <p className="mt-4 rounded-2xl bg-accent-400/15 px-4 py-3 text-sm text-ink">
                Minimum order value is {formatInr(site.delivery.minimumOrderValue)}.
              </p>
            )}

            <button type="submit" disabled={!canPlaceOrder} className="btn-primary mt-6 w-full">
              Place order · {formatInr(quote.total)}
            </button>
            <p className="mt-3 text-center text-xs text-ink-muted">
              Demo checkout — no payment is processed.
            </p>
          </div>
        </aside>
      </form>
    </section>
  );
}
