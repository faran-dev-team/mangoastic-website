"use client";

import { memo } from "react";
import { cn } from "@/lib/cn";
import type { AdminOrderStatus } from "@/lib/admin/types";

type StatusBadgeProps = {
  status: AdminOrderStatus;
  className?: string;
  /** Soft entrance animation for table rows. */
  animate?: boolean;
};

type StatusVisual = {
  label: string;
  className: string;
};

/**
 * Visual registry for order statuses.
 * Add future statuses here — consumers stay unchanged.
 */
const STATUS_VISUALS: Record<AdminOrderStatus, StatusVisual> = {
  NEW: {
    label: "New",
    className:
      "bg-[rgba(59,130,246,0.14)] text-[#93c5fd] ring-1 ring-inset ring-[rgba(59,130,246,0.28)]",
  },
  CONFIRMED: {
    label: "Confirmed",
    className:
      "bg-[rgba(245,158,11,0.14)] text-[#fcd34d] ring-1 ring-inset ring-[rgba(245,158,11,0.28)]",
  },
  PACKED: {
    label: "Packed",
    className:
      "bg-[rgba(168,85,247,0.14)] text-[#d8b4fe] ring-1 ring-inset ring-[rgba(168,85,247,0.28)]",
  },
  DELIVERED: {
    label: "Delivered",
    className:
      "bg-[rgba(34,197,94,0.14)] text-[#86efac] ring-1 ring-inset ring-[rgba(34,197,94,0.28)]",
  },
  CANCELLED: {
    label: "Cancelled",
    className:
      "bg-[rgba(239,68,68,0.14)] text-[#fca5a5] ring-1 ring-inset ring-[rgba(239,68,68,0.28)]",
  },
};

/**
 * Reusable order status badge.
 * Accessible contrast on dark admin surfaces; easy to extend with new statuses.
 */
function StatusBadgeComponent({
  status,
  className,
  animate = false,
}: StatusBadgeProps) {
  const visual = STATUS_VISUALS[status] ?? STATUS_VISUALS.NEW;

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 font-outfit text-[11px] font-semibold tracking-wide",
        visual.className,
        animate && "admin-badge-enter",
        className,
      )}
    >
      <span className="sr-only">Status: </span>
      {visual.label}
    </span>
  );
}

const StatusBadge = memo(StatusBadgeComponent);
StatusBadge.displayName = "StatusBadge";

export default StatusBadge;
export type { StatusBadgeProps };
