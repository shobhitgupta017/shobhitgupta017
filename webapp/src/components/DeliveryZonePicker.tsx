"use client";

import { site } from "@/data/site";
import type { DeliveryZone } from "@/lib/delivery";
import { formatInr } from "@/lib/format";

export function DeliveryZonePicker({
  zone,
  onChange,
}: {
  zone: DeliveryZone;
  onChange: (zone: DeliveryZone) => void;
}) {
  const options: { value: DeliveryZone; title: string; detail: string }[] = [
    {
      value: "nearby",
      title: `Within ${site.delivery.nearbyRadiusKm} km of the shop`,
      detail: `Free above ${formatInr(site.delivery.nearbyFreeDeliveryThreshold)}`,
    },
    {
      value: "service-area",
      title: "Other service areas",
      detail: `Free above ${formatInr(site.delivery.freeDeliveryThreshold)}`,
    },
  ];

  return (
    <fieldset className="card p-5">
      <legend className="px-1 text-sm font-semibold text-ink">Where are we delivering?</legend>
      <div className="mt-3 space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm transition ${
              zone === option.value
                ? "border-brand-600 bg-brand-50/70"
                : "border-ink/10 hover:border-ink/25"
            }`}
          >
            <input
              type="radio"
              name="delivery-zone"
              value={option.value}
              checked={zone === option.value}
              onChange={() => onChange(option.value)}
              className="mt-1 accent-brand-600"
            />
            <span>
              <span className="block font-medium text-ink">{option.title}</span>
              <span className="block text-ink-muted">{option.detail}</span>
            </span>
          </label>
        ))}
      </div>
      <p className="mt-3 text-xs text-ink-muted">
        We serve {site.delivery.serviceAreas.join(", ")}.
      </p>
    </fieldset>
  );
}
