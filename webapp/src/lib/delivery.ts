import { site } from "@/data/site";
import { formatInr } from "@/lib/format";

export type DeliveryZone = "nearby" | "service-area";

export type DeliveryQuote = {
  zone: DeliveryZone;
  subtotal: number;
  isFree: boolean;
  charge: number;
  total: number;
  /** Threshold that applies to the selected zone. */
  threshold: number;
  /** Amount still needed to unlock free delivery (0 when already free). */
  amountToFreeDelivery: number;
  /** 0..1 progress towards the applicable free-delivery threshold. */
  progress: number;
  reason: string;
};

export function thresholdForZone(zone: DeliveryZone): number {
  return zone === "nearby"
    ? site.delivery.nearbyFreeDeliveryThreshold
    : site.delivery.freeDeliveryThreshold;
}

export function getDeliveryQuote(
  subtotal: number,
  zone: DeliveryZone = "service-area",
): DeliveryQuote {
  const threshold = thresholdForZone(zone);
  const isFree = subtotal >= threshold;
  const charge = isFree || subtotal === 0 ? 0 : site.delivery.deliveryCharge;
  const amountToFreeDelivery = isFree ? 0 : threshold - subtotal;

  return {
    zone,
    subtotal,
    isFree,
    charge,
    total: subtotal + charge,
    threshold,
    amountToFreeDelivery,
    progress: threshold === 0 ? 1 : Math.min(subtotal / threshold, 1),
    reason: isFree
      ? zone === "nearby"
        ? `Free delivery unlocked — you are within ${site.delivery.nearbyRadiusKm} km of the store.`
        : "Free delivery unlocked for your service area."
      : zone === "nearby"
        ? `Within ${site.delivery.nearbyRadiusKm} km of the store, delivery is free above ${formatInr(threshold)}.`
        : `Delivery is free on orders above ${formatInr(threshold)} in our service areas.`,
  };
}

export function meetsMinimumOrder(subtotal: number): boolean {
  return subtotal >= site.delivery.minimumOrderValue;
}
