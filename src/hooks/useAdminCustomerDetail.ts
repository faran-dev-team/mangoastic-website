"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CustomersApiError,
  fetchAdminCustomerDetail,
} from "@/lib/admin/customers";
import { subscribeCustomersRefresh } from "@/lib/admin/dashboardSummaryStore";
import type { AdminCustomerDetail } from "@/lib/admin/types";
import { getAdminAccessToken } from "@/lib/auth/session";
import { useAuth } from "@/hooks/useAuth";

type UseAdminCustomerDetailResult = {
  data: AdminCustomerDetail | null;
  error: string | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

/**
 * Lazy-loads customer detail when a phone is selected.
 */
export function useAdminCustomerDetail(
  phoneNumber: string | null,
  enabled: boolean,
): UseAdminCustomerDetailResult {
  const { logout } = useAuth();
  const [data, setData] = useState<AdminCustomerDetail | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const requestIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(() => {
    if (!enabled || !phoneNumber) {
      setData(null);
      setError(null);
      setIsLoading(false);
      return;
    }

    const token = getAdminAccessToken();
    if (!token) {
      setError("Your session has expired. Please sign in again.");
      setData(null);
      setIsLoading(false);
      logout();
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const requestId = ++requestIdRef.current;

    setIsLoading(true);
    setError(null);

    void (async () => {
      try {
        const detail = await fetchAdminCustomerDetail(
          token,
          phoneNumber,
          controller.signal,
        );
        if (requestId !== requestIdRef.current) {
          return;
        }
        setData(detail);
        setError(null);
        setIsLoading(false);
      } catch (err) {
        if (requestId !== requestIdRef.current || controller.signal.aborted) {
          return;
        }

        if (
          err instanceof CustomersApiError &&
          (err.statusCode === 401 || err.statusCode === 403)
        ) {
          logout();
          setError("Your session has expired. Please sign in again.");
          setData(null);
          setIsLoading(false);
          return;
        }

        setError(
          err instanceof CustomersApiError
            ? err.message
            : "Unable to load customer details. Please try again.",
        );
        setData(null);
        setIsLoading(false);
      }
    })();
  }, [enabled, phoneNumber, logout]);

  useEffect(() => {
    load();
    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  useEffect(() => {
    return subscribeCustomersRefresh(() => {
      if (enabled && phoneNumber) {
        load();
      }
    });
  }, [enabled, phoneNumber, load]);

  return {
    data,
    error,
    isLoading,
    isError: error != null && !isLoading,
    refetch: load,
  };
}
