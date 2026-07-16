"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  DashboardApiError,
  fetchDashboardSummary,
} from "@/lib/admin/dashboard";
import {
  getCachedDashboardSummary,
  setCachedDashboardSummary,
  subscribeDashboardSummary,
  subscribeDashboardSummaryRefresh,
} from "@/lib/admin/dashboardSummaryStore";
import type { DashboardSummary } from "@/lib/admin/types";
import { getAdminAccessToken } from "@/lib/auth/session";
import { useAuth } from "@/hooks/useAuth";

export type DashboardSummaryStatus = "idle" | "loading" | "success" | "error";

type UseDashboardSummaryResult = {
  status: DashboardSummaryStatus;
  data: DashboardSummary | null;
  error: string | null;
  isLoading: boolean;
  isError: boolean;
  /** True for the first successful load only — drives one-shot count-up. */
  animateCount: boolean;
  refetch: () => void;
};

/**
 * Fetches admin dashboard statistics once on mount.
 * Subscribes to optimistic patches + soft refresh requests from order updates.
 */
export function useDashboardSummary(): UseDashboardSummaryResult {
  const { logout } = useAuth();
  const [status, setStatus] = useState<DashboardSummaryStatus>("loading");
  const [data, setData] = useState<DashboardSummary | null>(
    () => getCachedDashboardSummary(),
  );
  const [error, setError] = useState<string | null>(null);
  const [animateCount, setAnimateCount] = useState(false);
  const hasSucceededRef = useRef(false);
  const requestIdRef = useRef(0);
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(
    (options?: { silent?: boolean }) => {
      const token = getAdminAccessToken();
      if (!token) {
        setStatus("error");
        setError("Your session has expired. Please sign in again.");
        setData(null);
        setAnimateCount(false);
        logout();
        return;
      }

      abortRef.current?.abort();
      const controller = new AbortController();
      abortRef.current = controller;
      const requestId = ++requestIdRef.current;
      const silent = options?.silent === true;

      if (!silent) {
        setStatus("loading");
        setError(null);
        setAnimateCount(false);
      }

      void (async () => {
        try {
          const summary = await fetchDashboardSummary(token, controller.signal);

          if (requestId !== requestIdRef.current) {
            return;
          }

          const isFirst = !hasSucceededRef.current;
          hasSucceededRef.current = true;
          setCachedDashboardSummary(summary);
          setData(summary);
          setStatus("success");
          setError(null);
          setAnimateCount(isFirst && !silent);
        } catch (err) {
          if (requestId !== requestIdRef.current) {
            return;
          }

          if (controller.signal.aborted) {
            return;
          }

          if (
            err instanceof DashboardApiError &&
            (err.statusCode === 401 || err.statusCode === 403)
          ) {
            logout();
            setStatus("error");
            setError("Your session has expired. Please sign in again.");
            setData(null);
            setAnimateCount(false);
            return;
          }

          // Silent refresh failures keep the last known optimistic/cached values.
          if (silent && hasSucceededRef.current) {
            return;
          }

          const message =
            err instanceof DashboardApiError
              ? err.message
              : "Unable to load dashboard statistics. Please try again.";

          setStatus("error");
          setError(message);
          setAnimateCount(false);
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

  // Mirror optimistic patches from the shared store.
  useEffect(() => {
    return subscribeDashboardSummary(() => {
      const cached = getCachedDashboardSummary();
      if (cached) {
        setData(cached);
        setStatus("success");
      }
    });
  }, []);

  // Soft refetch after successful status updates (no loading flash).
  useEffect(() => {
    return subscribeDashboardSummaryRefresh(() => {
      load({ silent: true });
    });
  }, [load]);

  return {
    status,
    data,
    error,
    isLoading: status === "loading" && data === null,
    isError: status === "error",
    animateCount,
    refetch: () => load(),
  };
}
