"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { DeliveryQuote } from "@/lib/delivery";
import { formatInr } from "@/lib/format";

export function FreeDeliveryProgress({ quote }: { quote: DeliveryQuote }) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-3xl bg-brand-50/70 p-5">
      <p className="text-sm font-medium text-ink">
        {quote.isFree ? (
          <>🎉 Free delivery unlocked on this order.</>
        ) : (
          <>
            Add {formatInr(quote.amountToFreeDelivery)} more to get free delivery
            {quote.zone === "nearby" ? " (within 1 km of the store)" : ""}.
          </>
        )}
      </p>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white">
        <motion.div
          className="h-full rounded-full bg-brand-600"
          initial={reduceMotion ? false : { width: 0 }}
          animate={{ width: `${Math.round(quote.progress * 100)}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 20 }}
        />
      </div>
      <p className="mt-2 text-xs text-ink-soft">
        {formatInr(quote.subtotal)} of {formatInr(quote.threshold)} · {quote.reason}
      </p>
    </div>
  );
}
