"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DashboardApiError,
  fetchDashboardCharts,
} from "@/lib/admin/dashboard";
import { subscribeDashboardChartsRefresh } from "@/lib/admin/dashboardSummaryStore";
import type { DashboardCharts } from "@/lib/admin/types";
import { getAdminAccessToken } from "@/lib/auth/session";
import { useAuth } from "@/hooks/useAuth";

type UseDashboardChartsResult = {
  data: DashboardCharts | null;
  error: string | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

/**
 * Fetches CEO dashboard chart series once on mount.
 * Soft-refreshes when delete / status updates request a charts refresh.
 */
export function useDashboardCharts(): UseDashboardChartsResult {
  const { logout } = useAuth();
  const [data, setData] = useState<DashboardCharts | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const requestIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);
  const hasSucceededRef = useRef(false);

  const load = useCallback(
    (options?: { silent?: boolean }) => {
      const token = getAdminAccessToken();
      if (!token) {
        setIsLoading(false);
        setIsError(true);
        setError("Your session has expired. Please sign in again.");
        setData(null);
        logout();
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const requestId = ++requestIdRef.current;
      const silent = options?.silent === true;

      if (!silent) {
        setIsLoading(true);
        setError(null);
        setIsError(false);
      }

      void (async () => {
        try {
          const charts = await fetchDashboardCharts(token, controller.signal);
          if (requestId !== requestIdRef.current) {
            return;
          }
          hasSucceededRef.current = true;
          setData(charts);
          setIsLoading(false);
          setIsError(false);
          setError(null);
        } catch (err) {
          if (requestId !== requestIdRef.current || controller.signal.aborted) {
            return;
          }

          if (
            err instanceof DashboardApiError &&
            (err.statusCode === 401 || err.statusCode === 403)
          ) {
            logout();
            setIsLoading(false);
            setIsError(true);
            setError("Your session has expired. Please sign in again.");
            setData(null);
            return;
          }

          if (silent && hasSucceededRef.current) {
            return;
          }

          setIsLoading(false);
          setIsError(true);
          setError(
            err instanceof DashboardApiError
              ? err.message
              : "Unable to load dashboard charts. Please try again.",
          );
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
    return subscribeDashboardChartsRefresh(() => {
      load({ silent: true });
    });
  }, [load]);

  return {
    data,
    error,
    isLoading: isLoading && data === null,
    isError,
    refetch: () => load(),
  };
}
