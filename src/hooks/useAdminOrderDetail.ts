"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { OrdersApiError, fetchAdminOrder } from "@/lib/admin/orders";
import type { AdminOrderDetail, AdminOrderStatus } from "@/lib/admin/types";
import { getAdminAccessToken } from "@/lib/auth/session";
import { useAuth } from "@/hooks/useAuth";

export type AdminOrderDetailStatus = "idle" | "loading" | "success" | "error";

type UseAdminOrderDetailResult = {
  status: AdminOrderDetailStatus;
  data: AdminOrderDetail | null;
  error: string | null;
  isLoading: boolean;
  isError: boolean;
  isNotFound: boolean;
  refetch: () => void;
  /** Optimistic / rollback status patch for the open order. */
  patchOrderStatus: (nextStatus: AdminOrderStatus) => void;
};

/**
 * Fetches a single order when `orderId` is set.
 * Idle when closed — no request until the admin opens details.
 */
export function useAdminOrderDetail(
  orderId: string | null,
): UseAdminOrderDetailResult {
  const { logout } = useAuth();
  const [status, setStatus] = useState<AdminOrderDetailStatus>("idle");
  const [data, setData] = useState<AdminOrderDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const requestIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const orderIdRef = useRef(orderId);
  orderIdRef.current = orderId;

  const load = useCallback(() => {
    const activeOrderId = orderIdRef.current;
    if (!activeOrderId) {
      abortRef.current?.abort();
      setStatus("idle");
      setData(null);
      setError(null);
      setIsNotFound(false);
      return;
    }

    const token = getAdminAccessToken();
    if (!token) {
      setStatus("error");
      setError("Your session has expired. Please sign in again.");
      setData(null);
      setIsNotFound(false);
      logout();
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const requestId = ++requestIdRef.current;

    setStatus("loading");
    setError(null);
    setIsNotFound(false);

    void (async () => {
      try {
        const order = await fetchAdminOrder(
          token,
          activeOrderId,
          controller.signal,
        );

        if (requestId !== requestIdRef.current) {
          return;
        }

        setData(order);
        setStatus("success");
        setError(null);
        setIsNotFound(false);
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
          setData(null);
          setIsNotFound(false);
          return;
        }

        if (err instanceof OrdersApiError && err.statusCode === 404) {
          setStatus("error");
          setError("Order not found.");
          setData(null);
          setIsNotFound(true);
          return;
        }

        const message =
          err instanceof OrdersApiError
            ? err.message
            : "Unable to load order details. Please try again.";

        setStatus("error");
        setError(message);
        setData(null);
        setIsNotFound(false);
      }
    })();
  }, [logout, orderId]);

  useEffect(() => {
    load();

    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  const patchOrderStatus = useCallback((nextStatus: AdminOrderStatus) => {
    setData((prev) => {
      if (!prev || prev.status === nextStatus) {
        return prev;
      }
      return {
        ...prev,
        status: nextStatus,
        updatedAt: new Date().toISOString(),
      };
    });
  }, []);

  return {
    status,
    data,
    error,
    isLoading: status === "loading",
    isError: status === "error",
    isNotFound,
    refetch: load,
    patchOrderStatus,
  };
}
