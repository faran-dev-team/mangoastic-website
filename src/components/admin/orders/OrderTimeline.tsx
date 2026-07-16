"use client";

import { memo, useMemo } from "react";
import StatusBadge from "@/components/admin/orders/StatusBadge";
import { formatAdminDateTime } from "@/lib/format/datetime";
import { cn } from "@/lib/cn";
import type { AdminOrderStatus } from "@/lib/admin/types";

/**
 * Timeline event contract — ready for future status-history rows.
 * Phase 7.1 only emits real created + current-status events.
 */
export type OrderTimelineEvent = {
  id: string;
  label: string;
  at: string;
  kind: "created" | "status" | "note" | "system";
  status?: AdminOrderStatus;
};

type OrderTimelineProps = {
  createdAt: string;
  status: AdminOrderStatus;
  updatedAt: string;
  className?: string;
  /** Optional future events (ignored if empty). Never invent history. */
  extraEvents?: OrderTimelineEvent[];
};

const STATUS_TIMELINE_LABELS: Record<AdminOrderStatus, string> = {
  NEW: "Status: New",
  CONFIRMED: "Status: Confirmed",
  PACKED: "Status: Packed",
  DELIVERED: "Status: Delivered",
  CANCELLED: "Status: Cancelled",
};

/**
 * Builds real timeline events only — no fabricated intermediate history.
 */
export function buildOrderTimelineEvents(
  createdAt: string,
  status: AdminOrderStatus,
  updatedAt: string,
  extraEvents: OrderTimelineEvent[] = [],
): OrderTimelineEvent[] {
  const events: OrderTimelineEvent[] = [
    {
      id: "created",
      label: "Order Created",
      at: createdAt,
      kind: "created",
    },
  ];

  // Only show a distinct status node when status has progressed past NEW,
  // or when updatedAt differs from createdAt for NEW (edge: notes/touch).
  // For NEW with identical timestamps, a single "Order Created" is enough;
  // we still show current status as the second real node for clarity.
  events.push({
    id: `status-${status}`,
    label: STATUS_TIMELINE_LABELS[status] ?? `Status: ${status}`,
    at: updatedAt || createdAt,
    kind: "status",
    status,
  });

  if (extraEvents.length > 0) {
    events.push(...extraEvents);
  }

  return events;
}

/**
 * Simple professional order timeline.
 * Architecture accepts future events without inventing fake history.
 */
function OrderTimelineComponent({
  createdAt,
  status,
  updatedAt,
  className,
  extraEvents,
}: OrderTimelineProps) {
  const events = useMemo(
    () =>
      buildOrderTimelineEvents(createdAt, status, updatedAt, extraEvents ?? []),
    [createdAt, status, updatedAt, extraEvents],
  );

  return (
    <section
      className={cn(
        "admin-order-section rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] p-4 sm:p-5",
        className,
      )}
      style={{ animationDelay: "160ms" }}
      aria-label="Order timeline"
    >
      <h3 className="font-outfit text-xs font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
        Timeline
      </h3>

      <ol className="mt-4 space-y-0">
        {events.map((event, index) => {
          const isLast = index === events.length - 1;
          const dateLabel = formatAdminDateTime(event.at);

          return (
            <li key={event.id} className="relative flex gap-3.5 pb-5 last:pb-0">
              {/* Vertical connector */}
              {!isLast ? (
                <span
                  className="absolute left-[7px] top-4 bottom-0 w-px bg-[var(--admin-border-strong)]"
                  aria-hidden
                />
              ) : null}

              {/* Node */}
              <span
                className={cn(
                  "relative z-[1] mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full ring-2 ring-[var(--admin-surface-elevated)]",
                  isLast
                    ? "bg-[var(--admin-accent)]"
                    : "bg-[var(--admin-border-strong)]",
                )}
                aria-hidden
              />

              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-outfit text-sm font-medium text-[var(--admin-text)]">
                    {event.label}
                  </p>
                  {event.status ? (
                    <StatusBadge status={event.status} />
                  ) : null}
                </div>
                <p className="mt-0.5 font-outfit text-xs text-[var(--admin-text-muted)]">
                  <time dateTime={event.at || undefined}>{dateLabel}</time>
                </p>
              </div>
            </li>
          );
        })}
      </ol>
    </section>
  );
}

const OrderTimeline = memo(OrderTimelineComponent);
OrderTimeline.displayName = "OrderTimeline";

export default OrderTimeline;
export type { OrderTimelineProps };
