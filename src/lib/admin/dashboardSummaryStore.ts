/**
 * Cross-page dashboard summary coordination (Phase 7.2).
 * Orders page can optimistic-patch + request a background refetch;
 * DashboardStatsSection / OrdersMetricsStrip listen without a full page reload.
 */
import type { AdminOrderStatus, DashboardSummary } from "@/lib/admin/types";

type Listener = () => void;

const listeners = new Set<Listener>();
const refreshListeners = new Set<Listener>();

let cachedSummary: DashboardSummary | null = null;

const PENDING: ReadonlySet<AdminOrderStatus> = new Set([
  "NEW",
  "CONFIRMED",
  "PACKED",
]);

function statusToSummaryKey(
  status: AdminOrderStatus,
): keyof Pick<
  DashboardSummary,
  "newOrders" | "confirmedOrders" | "deliveredOrders" | "cancelledOrders"
> | null {
  switch (status) {
    case "NEW":
      return "newOrders";
    case "CONFIRMED":
      return "confirmedOrders";
    case "DELIVERED":
      return "deliveredOrders";
    case "CANCELLED":
      return "cancelledOrders";
    case "PACKED":
      return null;
    default:
      return null;
  }
}

export function getCachedDashboardSummary(): DashboardSummary | null {
  return cachedSummary;
}

export function setCachedDashboardSummary(summary: DashboardSummary): void {
  cachedSummary = summary;
  listeners.forEach((listener) => listener());
}

/**
 * Optimistic bucket adjustment when status changes.
 * totalOrders / todaysOrders / todaysRevenue unchanged on status-only updates.
 * pendingOrders and deliveredToday adjust when entering/leaving those buckets.
 */
export function applyOptimisticStatusToDashboardSummary(
  from: AdminOrderStatus,
  to: AdminOrderStatus,
): void {
  if (!cachedSummary || from === to) {
    return;
  }

  const next: DashboardSummary = { ...cachedSummary };
  const fromKey = statusToSummaryKey(from);
  const toKey = statusToSummaryKey(to);

  if (fromKey) {
    next[fromKey] = Math.max(0, next[fromKey] - 1);
  }
  if (toKey) {
    next[toKey] = next[toKey] + 1;
  }

  const fromPending = PENDING.has(from);
  const toPending = PENDING.has(to);
  if (fromPending && !toPending) {
    next.pendingOrders = Math.max(0, next.pendingOrders - 1);
  } else if (!fromPending && toPending) {
    next.pendingOrders = next.pendingOrders + 1;
  }

  if (to === "DELIVERED" && from !== "DELIVERED") {
    next.deliveredToday = next.deliveredToday + 1;
  } else if (from === "DELIVERED" && to !== "DELIVERED") {
    next.deliveredToday = Math.max(0, next.deliveredToday - 1);
  }

  cachedSummary = next;
  listeners.forEach((listener) => listener());
}

/**
 * Soft-remove one order from KPI buckets after delete (row-level only).
 * Full accuracy comes from the silent refetch that follows.
 */
export function applyOptimisticDeleteToDashboardSummary(
  status: AdminOrderStatus,
  total: number,
): void {
  if (!cachedSummary) {
    return;
  }

  const next: DashboardSummary = { ...cachedSummary };
  next.totalOrders = Math.max(0, next.totalOrders - 1);

  const key = statusToSummaryKey(status);
  if (key) {
    next[key] = Math.max(0, next[key] - 1);
  }
  if (PENDING.has(status)) {
    next.pendingOrders = Math.max(0, next.pendingOrders - 1);
  }
  if (status !== "CANCELLED" && Number.isFinite(total) && total > 0) {
    next.totalRevenue = Math.max(0, next.totalRevenue - total);
  }

  cachedSummary = next;
  listeners.forEach((listener) => listener());
}

/**
 * Roll back optimistic delete adjustments after a failed mutation.
 */
export function rollbackOptimisticDeleteFromDashboardSummary(
  status: AdminOrderStatus,
  total: number,
): void {
  if (!cachedSummary) {
    return;
  }

  const next: DashboardSummary = { ...cachedSummary };
  next.totalOrders = next.totalOrders + 1;

  const key = statusToSummaryKey(status);
  if (key) {
    next[key] = next[key] + 1;
  }
  if (PENDING.has(status)) {
    next.pendingOrders = next.pendingOrders + 1;
  }
  if (status !== "CANCELLED" && Number.isFinite(total) && total > 0) {
    next.totalRevenue = next.totalRevenue + total;
  }

  cachedSummary = next;
  listeners.forEach((listener) => listener());
}

export function subscribeDashboardSummary(listener: Listener): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

/** Ask mounted dashboard hooks to refetch from the API. */
export function requestDashboardSummaryRefresh(): void {
  refreshListeners.forEach((listener) => listener());
}

export function subscribeDashboardSummaryRefresh(
  listener: Listener,
): () => void {
  refreshListeners.add(listener);
  return () => {
    refreshListeners.delete(listener);
  };
}

/** Soft refresh bus for customer directory after order status changes. */
const customerRefreshListeners = new Set<Listener>();

export function requestCustomersRefresh(): void {
  customerRefreshListeners.forEach((listener) => listener());
}

export function subscribeCustomersRefresh(listener: Listener): () => void {
  customerRefreshListeners.add(listener);
  return () => {
    customerRefreshListeners.delete(listener);
  };
}

/** Soft refresh bus for dashboard charts after delete / status changes. */
const chartsRefreshListeners = new Set<Listener>();

export function requestDashboardChartsRefresh(): void {
  chartsRefreshListeners.forEach((listener) => listener());
}

export function subscribeDashboardChartsRefresh(
  listener: Listener,
): () => void {
  chartsRefreshListeners.add(listener);
  return () => {
    chartsRefreshListeners.delete(listener);
  };
}
