/**
 * Allowed order lifecycle transitions (Phase 7.2).
 * Mirrors backend `constants/orderStatus` for UX filtering.
 * Backend remains the source of truth.
 */
import type { AdminOrderStatus } from "@/lib/admin/types";

export const ORDER_STATUS_TRANSITIONS: Readonly<
  Record<AdminOrderStatus, readonly AdminOrderStatus[]>
> = {
  NEW: ["CONFIRMED", "CANCELLED"],
  CONFIRMED: ["PACKED", "CANCELLED"],
  PACKED: ["DELIVERED"],
  DELIVERED: [],
  CANCELLED: [],
} as const;

export const ORDER_STATUS_LABELS: Record<AdminOrderStatus, string> = {
  NEW: "New",
  CONFIRMED: "Confirmed",
  PACKED: "Packed",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

export function isOrderStatusTransitionAllowed(
  from: AdminOrderStatus,
  to: AdminOrderStatus,
): boolean {
  if (from === to) {
    return false;
  }
  return ORDER_STATUS_TRANSITIONS[from].includes(to);
}

export function getAllowedNextOrderStatuses(
  from: AdminOrderStatus,
): readonly AdminOrderStatus[] {
  return ORDER_STATUS_TRANSITIONS[from];
}

export function isTerminalOrderStatus(status: AdminOrderStatus): boolean {
  return ORDER_STATUS_TRANSITIONS[status].length === 0;
}
