"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  CustomersApiError,
  fetchAdminCustomers,
} from "@/lib/admin/customers";
import { subscribeCustomersRefresh } from "@/lib/admin/dashboardSummaryStore";
import type { AdminCustomerListItem } from "@/lib/admin/types";
import { getAdminAccessToken } from "@/lib/auth/session";
import { useAuth } from "@/hooks/useAuth";

type UseAdminCustomersResult = {
  data: AdminCustomerListItem[];
  error: string | null;
  isLoading: boolean;
  isRefreshing: boolean;
  isError: boolean;
  refetch: () => void;
};

/**
 * Customer directory — aggregates from orders, soft-refreshes after status updates.
 */
export function useAdminCustomers(): UseAdminCustomersResult {
  const { logout } = useAuth();
  const [data, setData] = useState<AdminCustomerListItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const hasLoadedRef = useRef(false);
  const requestIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(
    (options?: { silent?: boolean }) => {
      const token = getAdminAccessToken();
      if (!token) {
        setError("Your session has expired. Please sign in again.");
        setData([]);
        setIsLoading(false);
        setIsRefreshing(false);
        logout();
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const requestId = ++requestIdRef.current;
      const silent = options?.silent === true;

      if (!silent || !hasLoadedRef.current) {
        setIsLoading(!hasLoadedRef.current);
        setIsRefreshing(hasLoadedRef.current);
        setError(null);
      } else {
        setIsRefreshing(true);
      }

      void (async () => {
        try {
          const customers = await fetchAdminCustomers(token, controller.signal);
          if (requestId !== requestIdRef.current) {
            return;
          }
          hasLoadedRef.current = true;
          setData(customers);
          setError(null);
          setIsLoading(false);
          setIsRefreshing(false);
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
            setData([]);
            setIsLoading(false);
            setIsRefreshing(false);
            return;
          }

          if (silent && hasLoadedRef.current) {
            setIsRefreshing(false);
            return;
          }

          setError(
            err instanceof CustomersApiError
              ? err.message
              : "Unable to load customers. Please try again.",
          );
          setIsLoading(false);
          setIsRefreshing(false);
        }
      })();
    },
    [logout],
  );

  useEffect(() => {
    load();
    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  useEffect(() => {
    return subscribeCustomersRefresh(() => {
      load({ silent: true });
    });
  }, [load]);

  return {
    data,
    error,
    isLoading,
    isRefreshing,
    isError: error != null && !isLoading,
    refetch: () => load(),
  };
}
