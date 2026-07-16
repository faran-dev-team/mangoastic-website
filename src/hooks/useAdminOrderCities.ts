"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { OrdersApiError, fetchAdminOrderCities } from "@/lib/admin/orders";
import { getAdminAccessToken } from "@/lib/auth/session";
import { useAuth } from "@/hooks/useAuth";

type UseAdminOrderCitiesResult = {
  cities: string[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

/**
 * Loads distinct cities once for the city filter dropdown.
 */
export function useAdminOrderCities(): UseAdminOrderCitiesResult {
  const { logout } = useAuth();
  const [cities, setCities] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const load = useCallback(() => {
    const token = getAdminAccessToken();
    if (!token) {
      setIsLoading(false);
      setError("Your session has expired. Please sign in again.");
      setCities([]);
      logout();
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    setError(null);

    void (async () => {
      try {
        const next = await fetchAdminOrderCities(token, controller.signal);
        if (controller.signal.aborted) {
          return;
        }
        setCities(next);
        setIsLoading(false);
        setError(null);
      } catch (err) {
        if (controller.signal.aborted) {
          return;
        }

        if (
          err instanceof OrdersApiError &&
          (err.statusCode === 401 || err.statusCode === 403)
        ) {
          logout();
          setError("Your session has expired. Please sign in again.");
          setCities([]);
          setIsLoading(false);
          return;
        }

        setError(
          err instanceof OrdersApiError
            ? err.message
            : "Unable to load cities.",
        );
        setIsLoading(false);
      }
    })();
  }, [logout]);

  useEffect(() => {
    load();
    return () => {
      abortRef.current?.abort();
    };
  }, [load]);

  return { cities, isLoading, error, refetch: load };
}
