import { FREE_DELIVERY_THRESHOLD_PKR } from "@/data/microcopy";

export function parsePkr(value: string | number): number {
  if (typeof value === "number") return value;
  return Number(value.replace(/[^\d]/g, "")) || 0;
}

export function formatPkr(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}

/** Amount still needed for free delivery, or null if already qualified. */
export function freeDeliveryGapPkr(subtotal: number): number | null {
  if (subtotal >= FREE_DELIVERY_THRESHOLD_PKR) return null;
  return FREE_DELIVERY_THRESHOLD_PKR - subtotal;
}

export function freeDeliveryMessage(subtotal: number): string | null {
  const gap = freeDeliveryGapPkr(subtotal);
  if (gap === null) return null;
  return `Add ${formatPkr(gap)} more for free delivery.`;
}
