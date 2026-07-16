"use client";

import { useCallback, useRef, useState } from "react";
import { OrdersApiError, deleteAdminOrder } from "@/lib/admin/orders";
import {
  applyOptimisticDeleteToDashboardSummary,
  rollbackOptimisticDeleteFromDashboardSummary,
  requestCustomersRefresh,
  requestDashboardChartsRefresh,
  requestDashboardSummaryRefresh,
} from "@/lib/admin/dashboardSummaryStore";
import { showAdminToast } from "@/lib/admin/toast";
import type { AdminOrderListItem } from "@/lib/admin/types";
import { getAdminAccessToken } from "@/lib/auth/session";
import { useAuth } from "@/hooks/useAuth";

type UseDeleteOrderOptions = {
  onRemoved?: (orderId: string) => void;
  onRestoredLocal?: (order: AdminOrderListItem) => void;
  getSnapshot?: (orderId: string) => AdminOrderListItem | null;
};

/**
 * Permanent delete with optimistic row removal and widget refresh.
 */
export function useDeleteOrderActions(options: UseDeleteOrderOptions = {}) {
  const { logout } = useAuth();
  const [busyOrderId, setBusyOrderId] = useState<string | null>(null);
  const busyRef = useRef(false);
  const optionsRef = useRef(options);
  optionsRef.current = options;

  const deleteOrder = useCallback(
    async (orderId: string): Promise<boolean> => {
      const token = getAdminAccessToken();
      if (!token) {
        logout();
        return false;
      }
      if (busyRef.current) {
        return false;
      }

      busyRef.current = true;
      setBusyOrderId(orderId);

      const opts = optionsRef.current;
      const snapshot = opts.getSnapshot?.(orderId) ?? null;

      opts.onRemoved?.(orderId);
      if (snapshot) {
        applyOptimisticDeleteToDashboardSummary(snapshot.status, snapshot.total);
      }

      try {
        await deleteAdminOrder(token, orderId);
        showAdminToast({
          tone: "success",
          title: "Order deleted successfully",
          durationMs: 2400,
        });
        requestDashboardSummaryRefresh();
        requestDashboardChartsRefresh();
        requestCustomersRefresh();
        return true;
      } catch (err) {
        if (snapshot) {
          opts.onRestoredLocal?.(snapshot);
          rollbackOptimisticDeleteFromDashboardSummary(
            snapshot.status,
            snapshot.total,
          );
        }
        if (
          err instanceof OrdersApiError &&
          (err.statusCode === 401 || err.statusCode === 403)
        ) {
          logout();
          return false;
        }
        showAdminToast({
          tone: "error",
          title: "Delete failed",
          description:
            err instanceof OrdersApiError
              ? err.message
              : "Unable to delete order. Please try again.",
          durationMs: 3200,
        });
        requestDashboardSummaryRefresh();
        requestDashboardChartsRefresh();
        requestCustomersRefresh();
        return false;
      } finally {
        busyRef.current = false;
        setBusyOrderId(null);
      }
    },
    [logout],
  );

  return {
    busyOrderId,
    deleteOrder,
  };
}
