"use client";

import { useCallback, useRef, useState } from "react";
import {
  OrdersApiError,
  updateAdminOrderStatus,
} from "@/lib/admin/orders";
import {
  applyOptimisticStatusToDashboardSummary,
  requestCustomersRefresh,
  requestDashboardChartsRefresh,
  requestDashboardSummaryRefresh,
} from "@/lib/admin/dashboardSummaryStore";
import { getStatusSuccessToastTitle } from "@/lib/admin/orderActions";
import { showAdminToast } from "@/lib/admin/toast";
import type { AdminOrderListItem, AdminOrderStatus } from "@/lib/admin/types";
import { getAdminAccessToken } from "@/lib/auth/session";
import { useAuth } from "@/hooks/useAuth";

type StatusChangeHandlers = {
  getOrderSnapshot: (orderId: string) => AdminOrderListItem | null;
  onOptimistic: (
    orderId: string,
    from: AdminOrderStatus,
    to: AdminOrderStatus,
  ) => void;
  onRollback: (
    orderId: string,
    from: AdminOrderStatus,
    to: AdminOrderStatus,
    snapshot: AdminOrderListItem | null,
  ) => void;
};

type UseUpdateOrderStatusResult = {
  updatingOrderId: string | null;
  requestStatusChange: (
    orderId: string,
    fromStatus: AdminOrderStatus,
    toStatus: AdminOrderStatus,
  ) => Promise<boolean>;
};

/**
 * Shared status mutation flow: optimistic UI → API → toast → stats refresh.
 * Returns `false` when the update failed (caller keeps confirm dialog open).
 */
export function useUpdateOrderStatus(
  handlers: StatusChangeHandlers,
): UseUpdateOrderStatusResult {
  const { logout } = useAuth();
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);
  const inFlightRef = useRef<string | null>(null);
  const handlersRef = useRef(handlers);
  handlersRef.current = handlers;

  const requestStatusChange = useCallback(
    async (
      orderId: string,
      fromStatus: AdminOrderStatus,
      toStatus: AdminOrderStatus,
    ): Promise<boolean> => {
      if (inFlightRef.current) {
        return false;
      }

      const token = getAdminAccessToken();
      if (!token) {
        showAdminToast({
          tone: "error",
          title: "Session expired",
          description: "Please sign in again to update orders.",
        });
        logout();
        return false;
      }

      inFlightRef.current = orderId;
      setUpdatingOrderId(orderId);

      const snapshot = handlersRef.current.getOrderSnapshot(orderId);

      // Optimistic: table, drawer, and dashboard cards.
      handlersRef.current.onOptimistic(orderId, fromStatus, toStatus);
      applyOptimisticStatusToDashboardSummary(fromStatus, toStatus);

      try {
        await updateAdminOrderStatus(token, orderId, toStatus);

        showAdminToast({
          tone: "success",
          title: getStatusSuccessToastTitle(toStatus),
          description: `${orderId} is now ${toStatus === "DELIVERED" ? "delivered" : toStatus === "CANCELLED" ? "cancelled" : toStatus.toLowerCase()}.`,
        });

        // Reconcile stats + customer aggregates from the server without a full reload.
        requestDashboardSummaryRefresh();
        requestDashboardChartsRefresh();
        requestCustomersRefresh();
        return true;
      } catch (err) {
        handlersRef.current.onRollback(
          orderId,
          fromStatus,
          toStatus,
          snapshot,
        );
        // Reverse the optimistic stats patch.
        applyOptimisticStatusToDashboardSummary(toStatus, fromStatus);

        if (
          err instanceof OrdersApiError &&
          (err.statusCode === 401 || err.statusCode === 403)
        ) {
          showAdminToast({
            tone: "error",
            title: "Session expired",
            description: "Please sign in again to update orders.",
          });
          logout();
          return false;
        }

        const message =
          err instanceof OrdersApiError
            ? err.message
            : "Unable to update order status. Please try again.";

        showAdminToast({
          tone: "error",
          title: "Update failed",
          description: message,
        });

        if (
          err instanceof OrdersApiError &&
          (err.statusCode === 409 || err.statusCode === 422)
        ) {
          requestDashboardSummaryRefresh();
        }

        return false;
      } finally {
        inFlightRef.current = null;
        setUpdatingOrderId(null);
      }
    },
    [logout],
  );

  return {
    updatingOrderId,
    requestStatusChange,
  };
}
