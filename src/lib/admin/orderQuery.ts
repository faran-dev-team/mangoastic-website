import type {
  AdminOrderListQuery,
  AdminOrderSort,
  AdminOrderStatus,
} from "@/lib/admin/types";

export const DEFAULT_ORDER_QUERY: AdminOrderListQuery = {
  search: "",
  status: null,
  city: null,
  sort: "newest",
};

export const ADMIN_ORDER_STATUSES: readonly AdminOrderStatus[] = [
  "NEW",
  "CONFIRMED",
  "PACKED",
  "DELIVERED",
  "CANCELLED",
] as const;

export const ADMIN_ORDER_SORTS: readonly {
  value: AdminOrderSort;
  label: string;
}[] = [
  { value: "newest", label: "Newest first" },
  { value: "oldest", label: "Oldest first" },
  { value: "highest_total", label: "Highest total" },
  { value: "lowest_total", label: "Lowest total" },
] as const;

const VALID_STATUSES = new Set<string>(ADMIN_ORDER_STATUSES);
const VALID_SORTS = new Set<string>(
  ADMIN_ORDER_SORTS.map((option) => option.value),
);

/**
 * Parse URL search params into a normalized order query.
 */
export function parseOrderQuery(
  params: URLSearchParams | ReadonlyURLSearchParamsLike,
): AdminOrderListQuery {
  const search = (params.get("search") ?? "").trim();
  const statusRaw = (params.get("status") ?? "").trim().toUpperCase();
  const cityRaw = (params.get("city") ?? "").trim();
  const sortRaw = (params.get("sort") ?? "").trim().toLowerCase();

  return {
    search,
    status: VALID_STATUSES.has(statusRaw)
      ? (statusRaw as AdminOrderStatus)
      : null,
    city: cityRaw.length > 0 ? cityRaw : null,
    sort: VALID_SORTS.has(sortRaw)
      ? (sortRaw as AdminOrderSort)
      : DEFAULT_ORDER_QUERY.sort,
  };
}

/**
 * Serialize an order query to URLSearchParams, omitting defaults.
 */
export function serializeOrderQuery(
  query: AdminOrderListQuery,
): URLSearchParams {
  const params = new URLSearchParams();
  const search = query.search.trim();

  if (search) {
    params.set("search", search);
  }
  if (query.status) {
    params.set("status", query.status);
  }
  if (query.city) {
    params.set("city", query.city);
  }
  if (query.sort !== DEFAULT_ORDER_QUERY.sort) {
    params.set("sort", query.sort);
  }

  return params;
}

export function hasActiveOrderFilters(query: AdminOrderListQuery): boolean {
  return (
    query.search.trim().length > 0 ||
    query.status !== null ||
    query.city !== null ||
    query.sort !== DEFAULT_ORDER_QUERY.sort
  );
}

export function orderQueriesEqual(
  a: AdminOrderListQuery,
  b: AdminOrderListQuery,
): boolean {
  return (
    a.search.trim() === b.search.trim() &&
    a.status === b.status &&
    a.city === b.city &&
    a.sort === b.sort
  );
}

/** Minimal interface so this module stays framework-agnostic. */
type ReadonlyURLSearchParamsLike = {
  get(name: string): string | null;
};
