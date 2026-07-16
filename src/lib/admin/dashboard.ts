import {
  ADMIN_DASHBOARD_CHARTS_ENDPOINT,
  ADMIN_DASHBOARD_ENDPOINT,
  DASHBOARD_REQUEST_TIMEOUT_MS,
  assertApiConfigured,
} from "@/lib/config";
import type {
  ApiErrorDetail,
  ApiErrorResponse,
  ApiSuccessResponse,
  DashboardCharts,
  DashboardSummary,
  DailyMetricPoint,
  OrdersByStatusSlice,
  TopCitySlice,
} from "@/lib/admin/types";

export class DashboardApiError extends Error {
  readonly statusCode: number;
  readonly errors: ApiErrorDetail[];

  constructor(
    message: string,
    statusCode: number,
    errors: ApiErrorDetail[] = [],
  ) {
    super(message);
    this.name = "DashboardApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

type DashboardSuccessResponse = ApiSuccessResponse<DashboardSummary>;

/**
 * GET /api/admin/dashboard — fetch order status summary.
 * Architecture is ready for a future refresh interval; callers control when to invoke.
 */
export async function fetchDashboardSummary(
  token: string,
  signal?: AbortSignal,
): Promise<DashboardSummary> {
  assertApiConfigured();

  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    DASHBOARD_REQUEST_TIMEOUT_MS,
  );

  const onExternalAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      window.clearTimeout(timeoutId);
      throw new DashboardApiError("Request cancelled.", 499);
    }
    signal.addEventListener("abort", onExternalAbort, { once: true });
  }

  try {
    const response = await fetch(ADMIN_DASHBOARD_ENDPOINT, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    const body = await parseJsonBody<
      DashboardSuccessResponse | ApiErrorResponse
    >(response);

    if (!response.ok || !body || body.success !== true) {
      const errorBody = body && body.success === false ? body : null;
      throw new DashboardApiError(
        mapDashboardFailureMessage(response.status, errorBody?.message),
        response.status || 500,
        errorBody?.errors ?? [],
      );
    }

    return normalizeSummary(body.data);
  } catch (error) {
    throw normalizeDashboardError(error);
  } finally {
    window.clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener("abort", onExternalAbort);
    }
  }
}

type ChartsSuccessResponse = ApiSuccessResponse<DashboardCharts>;

/**
 * GET /api/admin/dashboard/charts — lightweight CEO chart series.
 */
export async function fetchDashboardCharts(
  token: string,
  signal?: AbortSignal,
): Promise<DashboardCharts> {
  assertApiConfigured();

  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    DASHBOARD_REQUEST_TIMEOUT_MS,
  );

  const onExternalAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      window.clearTimeout(timeoutId);
      throw new DashboardApiError("Request cancelled.", 499);
    }
    signal.addEventListener("abort", onExternalAbort, { once: true });
  }

  try {
    const response = await fetch(ADMIN_DASHBOARD_CHARTS_ENDPOINT, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    const body = await parseJsonBody<
      ChartsSuccessResponse | ApiErrorResponse
    >(response);

    if (!response.ok || !body || body.success !== true) {
      const errorBody = body && body.success === false ? body : null;
      throw new DashboardApiError(
        mapDashboardFailureMessage(response.status, errorBody?.message),
        response.status || 500,
        errorBody?.errors ?? [],
      );
    }

    return normalizeCharts(body.data);
  } catch (error) {
    throw normalizeDashboardError(error);
  } finally {
    window.clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener("abort", onExternalAbort);
    }
  }
}

function normalizeCharts(data: DashboardCharts | undefined): DashboardCharts {
  if (!data) {
    throw new DashboardApiError(
      "Dashboard charts response was incomplete. Please try again.",
      500,
    );
  }

  return {
    ordersByStatus: normalizeStatusSlices(data.ordersByStatus),
    ordersLast7Days: normalizeDailyPoints(data.ordersLast7Days),
    revenueLast7Days: normalizeDailyPoints(data.revenueLast7Days),
    topCities: normalizeCitySlices(data.topCities),
  };
}

function normalizeStatusSlices(value: unknown): OrdersByStatusSlice[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }
      const row = item as OrdersByStatusSlice;
      if (typeof row.status !== "string") {
        return null;
      }
      return {
        status: row.status,
        count: toSafeCount(row.count),
      };
    })
    .filter((item): item is OrdersByStatusSlice => item !== null);
}

function normalizeDailyPoints(value: unknown): DailyMetricPoint[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }
      const row = item as DailyMetricPoint;
      if (typeof row.date !== "string" || !row.date) {
        return null;
      }
      return {
        date: row.date,
        value: toSafeMoney(row.value),
      };
    })
    .filter((item): item is DailyMetricPoint => item !== null);
}

function normalizeCitySlices(value: unknown): TopCitySlice[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }
      const row = item as TopCitySlice;
      if (typeof row.city !== "string" || !row.city.trim()) {
        return null;
      }
      return {
        city: row.city.trim(),
        count: toSafeCount(row.count),
      };
    })
    .filter((item): item is TopCitySlice => item !== null);
}

function normalizeSummary(data: DashboardSummary | undefined): DashboardSummary {
  if (!data) {
    throw new DashboardApiError(
      "Dashboard response was incomplete. Please try again.",
      500,
    );
  }

  return {
    totalOrders: toSafeCount(data.totalOrders),
    newOrders: toSafeCount(data.newOrders),
    confirmedOrders: toSafeCount(data.confirmedOrders),
    deliveredOrders: toSafeCount(data.deliveredOrders),
    cancelledOrders: toSafeCount(data.cancelledOrders),
    todaysOrders: toSafeCount(data.todaysOrders),
    pendingOrders: toSafeCount(data.pendingOrders),
    deliveredToday: toSafeCount(data.deliveredToday),
    todaysRevenue: toSafeMoney(data.todaysRevenue),
    totalRevenue: toSafeMoney(data.totalRevenue),
    averageOrderValue: toSafeMoney(data.averageOrderValue),
    activeCustomers: toSafeCount(data.activeCustomers),
    totalCustomers: toSafeCount(data.totalCustomers),
  };
}

function toSafeCount(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return 0;
  }
  return Math.floor(value);
}

function toSafeMoney(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return 0;
  }
  return value;
}

async function parseJsonBody<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function mapDashboardFailureMessage(
  statusCode: number,
  serverMessage?: string,
): string {
  if (statusCode === 401 || statusCode === 403) {
    return "Your session has expired. Please sign in again.";
  }
  if (statusCode === 0 || statusCode >= 500) {
    return "Unable to load dashboard statistics. Please try again.";
  }
  return serverMessage || "Unable to load dashboard statistics. Please try again.";
}

function normalizeDashboardError(error: unknown): DashboardApiError {
  if (error instanceof DashboardApiError) {
    return error;
  }

  if (error instanceof DOMException && error.name === "AbortError") {
    return new DashboardApiError(
      "The request timed out. Please check your connection and try again.",
      408,
    );
  }

  return new DashboardApiError(
    "Unable to reach the server. Please check your connection and try again.",
    0,
  );
}
