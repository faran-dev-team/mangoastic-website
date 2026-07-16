"use client";

import { memo } from "react";
import {
  Banknote,
  CheckCircle2,
  Clock3,
  ShoppingBag,
} from "lucide-react";
import { formatPKR } from "@/lib/format/money";
import { cn } from "@/lib/cn";
import type { DashboardSummary } from "@/lib/admin/types";

type OrdersMetricsStripProps = {
  summary: DashboardSummary | null;
  loading?: boolean;
  className?: string;
};

type MetricDef = {
  key: string;
  label: string;
  value: string;
  icon: typeof ShoppingBag;
  tone: string;
};

/**
 * Compact operational metrics above the orders table.
 * Reuses GET /api/admin/dashboard — no duplicate queries.
 */
function OrdersMetricsStripComponent({
  summary,
  loading = false,
  className,
}: OrdersMetricsStripProps) {
  const metrics: MetricDef[] = [
    {
      key: "today",
      label: "Today's Orders",
      value: String(summary?.todaysOrders ?? 0),
      icon: ShoppingBag,
      tone: "bg-[rgba(59,130,246,0.12)] text-[#93c5fd]",
    },
    {
      key: "pending",
      label: "Pending Orders",
      value: String(summary?.pendingOrders ?? 0),
      icon: Clock3,
      tone: "bg-[rgba(245,158,11,0.12)] text-[#fcd34d]",
    },
    {
      key: "delivered",
      label: "Delivered Today",
      value: String(summary?.deliveredToday ?? 0),
      icon: CheckCircle2,
      tone: "bg-[rgba(34,197,94,0.12)] text-[#86efac]",
    },
    {
      key: "revenue",
      label: "Today's Revenue",
      value: formatPKR(summary?.todaysRevenue ?? 0),
      icon: Banknote,
      tone: "bg-[var(--admin-accent-soft)] text-[var(--admin-accent)]",
    },
  ];

  if (loading && !summary) {
    return (
      <div
        className={cn(
          "grid grid-cols-2 gap-3 lg:grid-cols-4",
          className,
        )}
        aria-busy="true"
        aria-label="Loading today's metrics"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={`metric-skel-${index}`}
            className="rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-4"
          >
            <div className="admin-shimmer h-3 w-20 rounded-md" />
            <div className="admin-shimmer mt-3 h-7 w-16 rounded-md" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn("grid grid-cols-2 gap-3 lg:grid-cols-4", className)}
      role="group"
      aria-label="Today's order metrics"
    >
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        return (
          <article
            key={metric.key}
            className={cn(
              "admin-card-enter rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-4",
              "transition-[transform,border-color] duration-[180ms] ease-out hover:-translate-y-0.5 hover:border-[var(--admin-border-strong)]",
            )}
            style={{ animationDelay: `${index * 40}ms` }}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-muted)]">
                  {metric.label}
                </p>
                <p className="mt-2 font-outfit text-xl font-semibold tabular-nums tracking-tight text-[var(--admin-text)] sm:text-2xl">
                  {metric.value}
                </p>
              </div>
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--admin-radius-md)]",
                  metric.tone,
                )}
                aria-hidden
              >
                <Icon className="h-4 w-4" />
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}

const OrdersMetricsStrip = memo(OrdersMetricsStripComponent);
OrdersMetricsStrip.displayName = "OrdersMetricsStrip";

export default OrdersMetricsStrip;
export type { OrdersMetricsStripProps };
