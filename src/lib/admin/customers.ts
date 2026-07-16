import {
  ADMIN_CUSTOMERS_ENDPOINT,
  ADMIN_CUSTOMERS_REQUEST_TIMEOUT_MS,
  adminCustomerDetailEndpoint,
  assertApiConfigured,
} from "@/lib/config";
import type {
  AdminCustomerDetail,
  AdminCustomerListItem,
  AdminOrderStatus,
  ApiErrorDetail,
  ApiErrorResponse,
  ApiSuccessResponse,
} from "@/lib/admin/types";

export class CustomersApiError extends Error {
  readonly statusCode: number;
  readonly errors: ApiErrorDetail[];

  constructor(
    message: string,
    statusCode: number,
    errors: ApiErrorDetail[] = [],
  ) {
    super(message);
    this.name = "CustomersApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

type CustomersSuccessResponse = ApiSuccessResponse<AdminCustomerListItem[]>;
type CustomerDetailSuccessResponse = ApiSuccessResponse<AdminCustomerDetail>;

const VALID_STATUSES: ReadonlySet<AdminOrderStatus> = new Set([
  "NEW",
  "CONFIRMED",
  "PACKED",
  "DELIVERED",
  "CANCELLED",
]);

/**
 * GET /api/admin/customers — directory derived from orders.
 */
export async function fetchAdminCustomers(
  token: string,
  signal?: AbortSignal,
): Promise<AdminCustomerListItem[]> {
  return requestJson<CustomersSuccessResponse, AdminCustomerListItem[]>(
    ADMIN_CUSTOMERS_ENDPOINT,
    token,
    signal,
    (body) => {
      if (!Array.isArray(body.data)) {
        throw new CustomersApiError(
          "Customers response was incomplete. Please try again.",
          500,
        );
      }
      return body.data.map(normalizeCustomer);
    },
  );
}

/**
 * GET /api/admin/customers/:phoneNumber — profile + history.
 */
export async function fetchAdminCustomerDetail(
  token: string,
  phoneNumber: string,
  signal?: AbortSignal,
): Promise<AdminCustomerDetail> {
  const trimmed = phoneNumber.trim();
  if (!trimmed) {
    throw new CustomersApiError("Phone number is required.", 400);
  }

  return requestJson<CustomerDetailSuccessResponse, AdminCustomerDetail>(
    adminCustomerDetailEndpoint(trimmed),
    token,
    signal,
    (body) => {
      if (!body.data) {
        throw new CustomersApiError(
          "Customer response was incomplete. Please try again.",
          500,
        );
      }
      return normalizeCustomerDetail(body.data);
    },
  );
}

async function requestJson<TSuccess extends ApiSuccessResponse<unknown>, TResult>(
  url: string,
  token: string,
  signal: AbortSignal | undefined,
  map: (body: TSuccess) => TResult,
): Promise<TResult> {
  assertApiConfigured();

  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    ADMIN_CUSTOMERS_REQUEST_TIMEOUT_MS,
  );

  const onExternalAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      window.clearTimeout(timeoutId);
      throw new CustomersApiError("Request cancelled.", 499);
    }
    signal.addEventListener("abort", onExternalAbort, { once: true });
  }

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    const body = await parseJsonBody<TSuccess | ApiErrorResponse>(response);

    if (!response.ok || !body || body.success !== true) {
      const errorBody = body && body.success === false ? body : null;
      throw new CustomersApiError(
        mapFailureMessage(response.status, errorBody?.message),
        response.status || 500,
        errorBody?.errors ?? [],
      );
    }

    return map(body as TSuccess);
  } catch (error) {
    throw normalizeError(error);
  } finally {
    window.clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener("abort", onExternalAbort);
    }
  }
}

function normalizeCustomer(raw: AdminCustomerListItem): AdminCustomerListItem {
  return {
    phoneNumber: typeof raw.phoneNumber === "string" ? raw.phoneNumber : "",
    name: typeof raw.name === "string" ? raw.name : "Unknown",
    city: typeof raw.city === "string" ? raw.city : "—",
    totalOrders: toSafeCount(raw.totalOrders),
    lifetimeSpend: toSafeMoney(raw.lifetimeSpend),
    lastOrderAt: typeof raw.lastOrderAt === "string" ? raw.lastOrderAt : "",
    activeOrderId:
      typeof raw.activeOrderId === "string" ? raw.activeOrderId : null,
    activeOrderStatus: toSafeStatus(raw.activeOrderStatus),
  };
}

function normalizeCustomerDetail(raw: AdminCustomerDetail): AdminCustomerDetail {
  const base = normalizeCustomer(raw);
  const orders = Array.isArray(raw.orders)
    ? raw.orders.map((order) => ({
        orderId: typeof order.orderId === "string" ? order.orderId : "",
        mangoName: typeof order.mangoName === "string" ? order.mangoName : "",
        quantity: toSafeCount(order.quantity),
        total: toSafeMoney(order.total),
        status: toSafeStatus(order.status) ?? "NEW",
        city: typeof order.city === "string" ? order.city : "—",
        createdAt: typeof order.createdAt === "string" ? order.createdAt : "",
      }))
    : [];

  return { ...base, orders };
}

function toSafeStatus(value: unknown): AdminOrderStatus | null {
  if (typeof value === "string" && VALID_STATUSES.has(value as AdminOrderStatus)) {
    return value as AdminOrderStatus;
  }
  return null;
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

function mapFailureMessage(statusCode: number, serverMessage?: string): string {
  if (statusCode === 401 || statusCode === 403) {
    return "Your session has expired. Please sign in again.";
  }
  if (statusCode === 404) {
    return "Customer not found.";
  }
  if (statusCode === 0 || statusCode >= 500) {
    return "Unable to load customers. Please try again.";
  }
  return serverMessage || "Unable to load customers. Please try again.";
}

function normalizeError(error: unknown): CustomersApiError {
  if (error instanceof CustomersApiError) {
    return error;
  }

  if (error instanceof DOMException && error.name === "AbortError") {
    return new CustomersApiError(
      "The request timed out. Please check your connection and try again.",
      408,
    );
  }

  return new CustomersApiError(
    "Unable to reach the server. Please check your connection and try again.",
    0,
  );
}
