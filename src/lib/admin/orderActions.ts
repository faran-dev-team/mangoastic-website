/**
 * Action-based order workflow helpers.
 * Primary actions guide the CEO; cancel stays in the overflow menu.
 */
import type { AdminOrderStatus } from "@/lib/admin/types";
import { isOrderStatusTransitionAllowed } from "@/lib/admin/orderStatus";

export type OrderPrimaryAction = {
  nextStatus: AdminOrderStatus;
  label: string;
  /** Compact label for narrow table cells. */
  shortLabel: string;
  /** Decorative prefix shown in UI (not emoji-dependent for a11y). */
  icon: "confirm" | "pack" | "deliver";
};

const PRIMARY_BY_STATUS: Partial<
  Record<AdminOrderStatus, OrderPrimaryAction>
> = {
  NEW: {
    nextStatus: "CONFIRMED",
    label: "Confirm Order",
    shortLabel: "Confirm",
    icon: "confirm",
  },
  CONFIRMED: {
    nextStatus: "PACKED",
    label: "Mark as Packed",
    shortLabel: "Pack",
    icon: "pack",
  },
  PACKED: {
    nextStatus: "DELIVERED",
    label: "Mark as Delivered",
    shortLabel: "Deliver",
    icon: "deliver",
  },
};

export function getPrimaryOrderAction(
  status: AdminOrderStatus,
): OrderPrimaryAction | null {
  const action = PRIMARY_BY_STATUS[status];
  if (!action) {
    return null;
  }
  if (!isOrderStatusTransitionAllowed(status, action.nextStatus)) {
    return null;
  }
  return action;
}

export function canCancelOrder(status: AdminOrderStatus): boolean {
  return isOrderStatusTransitionAllowed(status, "CANCELLED");
}

export function getStatusSuccessToastTitle(
  toStatus: AdminOrderStatus,
): string {
  switch (toStatus) {
    case "CONFIRMED":
      return "Order Confirmed";
    case "PACKED":
      return "Order Packed";
    case "DELIVERED":
      return "Order Delivered";
    case "CANCELLED":
      return "Order Cancelled";
    default:
      return "Status updated";
  }
}

export function getConfirmDialogCopy(
  toStatus: AdminOrderStatus,
): { title: string; confirmLabel: string } {
  switch (toStatus) {
    case "CONFIRMED":
      return { title: "Confirm this order?", confirmLabel: "Confirm Order" };
    case "PACKED":
      return { title: "Mark order as packed?", confirmLabel: "Mark as Packed" };
    case "DELIVERED":
      return {
        title: "Mark order as delivered?",
        confirmLabel: "Mark as Delivered",
      };
    case "CANCELLED":
      return { title: "Cancel this order?", confirmLabel: "Cancel Order" };
    default:
      return { title: "Update order status?", confirmLabel: "Confirm" };
  }
}
