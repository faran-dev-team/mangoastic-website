"use client";

import { useCallback, useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  DEFAULT_ORDER_QUERY,
  hasActiveOrderFilters,
  orderQueriesEqual,
  parseOrderQuery,
  serializeOrderQuery,
} from "@/lib/admin/orderQuery";
import type {
  AdminOrderListQuery,
  AdminOrderSort,
  AdminOrderStatus,
} from "@/lib/admin/types";

type UseOrderQueryStateResult = {
  query: AdminOrderListQuery;
  hasActiveFilters: boolean;
  setSearch: (search: string) => void;
  setStatus: (status: AdminOrderStatus | null) => void;
  setCity: (city: string | null) => void;
  setSort: (sort: AdminOrderSort) => void;
  clearFilters: () => void;
  replaceQuery: (next: AdminOrderListQuery) => void;
};

/**
 * Synchronizes order discovery state with `/admin/orders` URL query params.
 * Back/forward and refresh preserve shareable filter links.
 */
export function useOrderQueryState(): UseOrderQueryStateResult {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const query = useMemo(
    () => parseOrderQuery(searchParams),
    [searchParams],
  );

  const hasActiveFilters = useMemo(
    () => hasActiveOrderFilters(query),
    [query],
  );

  const replaceQuery = useCallback(
    (next: AdminOrderListQuery) => {
      if (orderQueriesEqual(next, query)) {
        return;
      }

      const params = serializeOrderQuery(next);
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, query, router],
  );

  const setSearch = useCallback(
    (search: string) => {
      replaceQuery({ ...query, search });
    },
    [query, replaceQuery],
  );

  const setStatus = useCallback(
    (status: AdminOrderStatus | null) => {
      replaceQuery({ ...query, status });
    },
    [query, replaceQuery],
  );

  const setCity = useCallback(
    (city: string | null) => {
      replaceQuery({ ...query, city });
    },
    [query, replaceQuery],
  );

  const setSort = useCallback(
    (sort: AdminOrderSort) => {
      replaceQuery({ ...query, sort });
    },
    [query, replaceQuery],
  );

  const clearFilters = useCallback(() => {
    replaceQuery({ ...DEFAULT_ORDER_QUERY });
  }, [replaceQuery]);

  return {
    query,
    hasActiveFilters,
    setSearch,
    setStatus,
    setCity,
    setSort,
    clearFilters,
    replaceQuery,
  };
}
