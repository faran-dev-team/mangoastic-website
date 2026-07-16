"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { OrdersApiError, fetchAdminOrders } from "@/lib/admin/orders";
import type {
  AdminOrderListItem,
  AdminOrderListQuery,
  AdminOrderStatus,
} from "@/lib/admin/types";
import { getAdminAccessToken } from "@/lib/auth/session";
import { useAuth } from "@/hooks/useAuth";

export type AdminOrdersStatus = "idle" | "loading" | "success" | "error";

type UseAdminOrdersResult = {
  status: AdminOrdersStatus;
  data: AdminOrderListItem[];
  error: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
  isError: boolean;
  isEmpty: boolean;
  refetch: () => void;
  /**
   * Patch a single order's status in local list state.
   * When a status filter is active and the new status no longer matches,
   * the row is removed — filters themselves stay intact.
   */
  patchOrderStatus: (orderId: string, nextStatus: AdminOrderStatus) => void;
  /** Remove a row locally (permanent delete). */
  removeOrder: (orderId: string) => void;
  /** Restore a previously removed/changed row (optimistic rollback). */
  restoreOrder: (order: AdminOrderListItem) => void;
  /** Read a row snapshot before optimistic mutation. */
  getOrderSnapshot: (orderId: string) => AdminOrderListItem | null;
};

function toQueryKey(query: AdminOrderListQuery): string {
  return [
    query.search.trim(),
    query.status ?? "",
    query.city ?? "",
    query.sort,
  ].join("\0");
}

/**
 * Fetches admin orders whenever the discovery query changes.
 * Keeps previous rows visible during refresh to avoid layout flash.
 */
export function useAdminOrders(
  query: AdminOrderListQuery,
): UseAdminOrdersResult {
  const { logout } = useAuth();
  const [status, setStatus] = useState<AdminOrdersStatus>("loading");
  const [data, setData] = useState<AdminOrderListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);
  const requestIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const queryRef = useRef(query);
  queryRef.current = query;
  const dataRef = useRef(data);
  dataRef.current = data;

  const queryKey = useMemo(
    () => toQueryKey(query),
    [query.search, query.status, query.city, query.sort],
  );

  const load = useCallback(() => {
    const token = getAdminAccessToken();
    if (!token) {
      setStatus("error");
      setError("Your session has expired. Please sign in again.");
      setData([]);
      logout();
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const requestId = ++requestIdRef.current;
    const activeQuery = queryRef.current;

    setStatus("loading");
    setError(null);

    void (async () => {
      try {
        const orders = await fetchAdminOrders(
          token,
          activeQuery,
          controller.signal,
        );

        if (requestId !== requestIdRef.current) {
          return;
        }

        setData(orders);
        setStatus("success");
        setError(null);
        setHasLoadedOnce(true);
      } catch (err) {
        if (requestId !== requestIdRef.current) {
          return;
        }

        if (controller.signal.aborted) {
          return;
        }

        if (
          err instanceof OrdersApiError &&
          (err.statusCode === 401 || err.statusCode === 403)
        ) {
          logout();
          setStatus("error");
          setError("Your session has expired. Please sign in again.");
          setData([]);
          return;
        }

        const message =
          err instanceof OrdersApiError
            ? err.message
            : "Unable to load orders. Please try again.";

        setStatus("error");
        setError(message);
      }
    })();
  }, [logout, queryKey]);

  useEffect(() => {
    load();

    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  const patchOrderStatus = useCallback(
    (orderId: string, nextStatus: AdminOrderStatus) => {
      const activeFilter = queryRef.current.status;

      setData((prev) => {
        const index = prev.findIndex((order) => order.orderId === orderId);
        if (index === -1) {
          return prev;
        }

        const current = prev[index];
        if (!current || current.status === nextStatus) {
          return prev;
        }

        // Active status filter no longer matches — drop the row, keep filters.
        if (activeFilter && activeFilter !== nextStatus) {
          return prev.filter((order) => order.orderId !== orderId);
        }

        const next = prev.slice();
        next[index] = { ...current, status: nextStatus };
        return next;
      });
    },
    [],
  );

  const removeOrder = useCallback((orderId: string) => {
    setData((prev) => prev.filter((order) => order.orderId !== orderId));
  }, []);

  const restoreOrder = useCallback((order: AdminOrderListItem) => {
    setData((prev) => {
      const index = prev.findIndex((row) => row.orderId === order.orderId);
      if (index === -1) {
        // Re-insert near the top to keep the row visible after rollback.
        return [order, ...prev];
      }
      const next = prev.slice();
      next[index] = order;
      return next;
    });
  }, []);

  const getOrderSnapshot = useCallback((orderId: string) => {
    return dataRef.current.find((order) => order.orderId === orderId) ?? null;
  }, []);

  const isLoading = status === "loading" && !hasLoadedOnce;

  return {
    status,
    data,
    error,
    isLoading,
    isRefreshing: status === "loading" && hasLoadedOnce,
    isError: status === "error",
    isEmpty: status === "success" && data.length === 0,
    refetch: load,
    patchOrderStatus,
    removeOrder,
    restoreOrder,
    getOrderSnapshot,
  };
}
