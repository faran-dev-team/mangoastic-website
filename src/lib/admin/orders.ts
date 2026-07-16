import {
  ADMIN_ORDER_CITIES_ENDPOINT,
  ADMIN_ORDERS_ENDPOINT,
  ADMIN_ORDERS_REQUEST_TIMEOUT_MS,
  adminOrderDetailEndpoint,
  adminOrderStatusEndpoint,
} from "@/lib/config";
import { serializeOrderQuery } from "@/lib/admin/orderQuery";
import type {
  AdminOrderDetail,
  AdminOrderListItem,
  AdminOrderListQuery,
  AdminOrderStatus,
  ApiErrorDetail,
  ApiErrorResponse,
  ApiSuccessResponse,
  UpdateAdminOrderStatusResult,
} from "@/lib/admin/types";

export class OrdersApiError extends Error {
  readonly statusCode: number;
  readonly errors: ApiErrorDetail[];

  constructor(
    message: string,
    statusCode: number,
    errors: ApiErrorDetail[] = [],
  ) {
    super(message);
    this.name = "OrdersApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

type OrdersSuccessResponse = ApiSuccessResponse<AdminOrderListItem[]>;
type CitiesSuccessResponse = ApiSuccessResponse<string[]>;
type OrderDetailSuccessResponse = ApiSuccessResponse<AdminOrderDetail>;
type StatusUpdateSuccessResponse =
  ApiSuccessResponse<UpdateAdminOrderStatusResult>;
type DeleteSuccessResponse = ApiSuccessResponse<undefined>;

const VALID_STATUSES: ReadonlySet<AdminOrderStatus> = new Set([
  "NEW",
  "CONFIRMED",
  "PACKED",
  "DELIVERED",
  "CANCELLED",
]);

/**
 * GET /api/admin/orders — lean order list with optional search/filters/sort.
 */
export async function fetchAdminOrders(
  token: string,
  query: AdminOrderListQuery,
  signal?: AbortSignal,
): Promise<AdminOrderListItem[]> {
  const params = serializeOrderQuery(query);
  const url =
    params.size > 0
      ? `${ADMIN_ORDERS_ENDPOINT}?${params.toString()}`
      : ADMIN_ORDERS_ENDPOINT;

  return requestJson<OrdersSuccessResponse, AdminOrderListItem[]>(
    url,
    token,
    signal,
    (body) => {
      if (!Array.isArray(body.data)) {
        throw new OrdersApiError(
          "Orders response was incomplete. Please try again.",
          500,
        );
      }
      return body.data.map(normalizeOrder);
    },
  );
}

/**
 * GET /api/admin/orders/cities — distinct cities for the city filter.
 */
export async function fetchAdminOrderCities(
  token: string,
  signal?: AbortSignal,
): Promise<string[]> {
  return requestJson<CitiesSuccessResponse, string[]>(
    ADMIN_ORDER_CITIES_ENDPOINT,
    token,
    signal,
    (body) => {
      if (!Array.isArray(body.data)) {
        throw new OrdersApiError(
          "Cities response was incomplete. Please try again.",
          500,
        );
      }
      return body.data
        .filter((city): city is string => typeof city === "string")
        .map((city) => city.trim())
        .filter((city) => city.length > 0);
    },
  );
}

/**
 * GET /api/admin/orders/:orderId — full order inspection.
 * Fetched only when the admin opens details — never preloaded.
 */
export async function fetchAdminOrder(
  token: string,
  orderId: string,
  signal?: AbortSignal,
): Promise<AdminOrderDetail> {
  const trimmed = orderId.trim();
  if (!trimmed) {
    throw new OrdersApiError("Order not found.", 404);
  }

  return requestJson<OrderDetailSuccessResponse, AdminOrderDetail>(
    adminOrderDetailEndpoint(trimmed),
    token,
    signal,
    (body) => {
      if (!body.data || typeof body.data !== "object") {
        throw new OrdersApiError(
          "Order response was incomplete. Please try again.",
          500,
        );
      }
      return normalizeOrderDetail(body.data);
    },
    {
      notFoundMessage: "Order not found.",
      failureFallback: "Unable to load order details. Please try again.",
    },
  );
}

/**
 * PATCH /api/admin/orders/:orderId/status — lifecycle status update.
 */
export async function updateAdminOrderStatus(
  token: string,
  orderId: string,
  status: AdminOrderStatus,
  signal?: AbortSignal,
): Promise<UpdateAdminOrderStatusResult> {
  const trimmed = orderId.trim();
  if (!trimmed) {
    throw new OrdersApiError("Order not found.", 404);
  }

  return requestJson<StatusUpdateSuccessResponse, UpdateAdminOrderStatusResult>(
    adminOrderStatusEndpoint(trimmed),
    token,
    signal,
    (body) => {
      if (!body.data || typeof body.data !== "object") {
        throw new OrdersApiError(
          "Status update response was incomplete. Please try again.",
          500,
        );
      }
      return {
        orderId:
          typeof body.data.orderId === "string" ? body.data.orderId : trimmed,
        status: toSafeStatus(body.data.status),
      };
    },
    {
      method: "PATCH",
      body: { status },
      notFoundMessage: "Order not found.",
      failureFallback: "Unable to update order status. Please try again.",
    },
  );
}

/**
 * DELETE /api/admin/orders/:orderId — permanently delete an order (any status).
 */
export async function deleteAdminOrder(
  token: string,
  orderId: string,
  signal?: AbortSignal,
): Promise<void> {
  const trimmed = orderId.trim();
  if (!trimmed) {
    throw new OrdersApiError("Order not found.", 404);
  }

  await requestJson<DeleteSuccessResponse, void>(
    adminOrderDetailEndpoint(trimmed),
    token,
    signal,
    () => undefined,
    {
      method: "DELETE",
      notFoundMessage: "Order not found.",
      failureFallback: "Unable to delete order. Please try again.",
    },
  );
}

type RequestJsonOptions = {
  method?: "GET" | "PATCH" | "DELETE";
  body?: Record<string, unknown>;
  notFoundMessage?: string;
  failureFallback?: string;
};

async function requestJson<TSuccess extends ApiSuccessResponse<unknown>, TResult>(
  url: string,
  token: string,
  signal: AbortSignal | undefined,
  mapData: (body: TSuccess) => TResult,
  options?: RequestJsonOptions,
): Promise<TResult> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    ADMIN_ORDERS_REQUEST_TIMEOUT_MS,
  );

  const onExternalAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      window.clearTimeout(timeoutId);
      throw new OrdersApiError("Request cancelled.", 499);
    }
    signal.addEventListener("abort", onExternalAbort, { once: true });
  }

  const method = options?.method ?? "GET";

  try {
    const headers: Record<string, string> = {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    };

    if (options?.body !== undefined) {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      method,
      headers,
      body: options?.body !== undefined ? JSON.stringify(options.body) : undefined,
      signal: controller.signal,
    });

    const body = await parseJsonBody<TSuccess | ApiErrorResponse>(response);

    if (!response.ok || !body || body.success !== true) {
      const errorBody = body && body.success === false ? body : null;
      throw new OrdersApiError(
        mapOrdersFailureMessage(response.status, errorBody?.message, options),
        response.status || 500,
        errorBody?.errors ?? [],
      );
    }

    return mapData(body);
  } catch (error) {
    throw normalizeOrdersError(error, options);
  } finally {
    window.clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener("abort", onExternalAbort);
    }
  }
}

function normalizeOrder(raw: AdminOrderListItem): AdminOrderListItem {
  return {
    orderId: typeof raw.orderId === "string" ? raw.orderId : "",
    customerName: typeof raw.customerName === "string" ? raw.customerName : "",
    phoneNumber: typeof raw.phoneNumber === "string" ? raw.phoneNumber : "",
    city: typeof raw.city === "string" ? raw.city : "",
    mangoName: typeof raw.mangoName === "string" ? raw.mangoName : "",
    quantity: toSafeCount(raw.quantity),
    total: toSafeTotal(raw.total),
    status: toSafeStatus(raw.status),
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : "",
  };
}

function normalizeOrderDetail(raw: AdminOrderDetail): AdminOrderDetail {
  const customer = raw.customer ?? { name: "", phone: "" };
  const delivery = raw.delivery ?? {
    city: "",
    address: "",
    landmark: null,
    notes: null,
  };
  const product = raw.product ?? {
    mango: "",
    box: "",
    quantity: 0,
    ripeness: "",
    addons: [],
  };
  const pricing = raw.pricing ?? { total: 0 };

  return {
    orderId: typeof raw.orderId === "string" ? raw.orderId : "",
    customer: {
      name: typeof customer.name === "string" ? customer.name : "",
      phone: typeof customer.phone === "string" ? customer.phone : "",
    },
    delivery: {
      city: typeof delivery.city === "string" ? delivery.city : "",
      address: typeof delivery.address === "string" ? delivery.address : "",
      landmark:
        typeof delivery.landmark === "string" ? delivery.landmark : null,
      notes: typeof delivery.notes === "string" ? delivery.notes : null,
    },
    product: {
      mango: typeof product.mango === "string" ? product.mango : "",
      box: typeof product.box === "string" ? product.box : "",
      quantity: toSafeCount(product.quantity),
      ripeness: typeof product.ripeness === "string" ? product.ripeness : "",
      addons: Array.isArray(product.addons)
        ? product.addons.filter(
            (addon): addon is string =>
              typeof addon === "string" && addon.trim().length > 0,
          )
        : [],
    },
    pricing: {
      total: toSafeTotal(pricing.total),
    },
    status: toSafeStatus(raw.status),
    createdAt: typeof raw.createdAt === "string" ? raw.createdAt : "",
    updatedAt: typeof raw.updatedAt === "string" ? raw.updatedAt : "",
  };
}

function toSafeCount(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return 0;
  }
  return Math.floor(value);
}

function toSafeTotal(value: unknown): number {
  if (typeof value !== "number" || !Number.isFinite(value) || value < 0) {
    return 0;
  }
  return Math.round(value * 100) / 100;
}

function toSafeStatus(value: unknown): AdminOrderStatus {
  if (typeof value === "string" && VALID_STATUSES.has(value as AdminOrderStatus)) {
    return value as AdminOrderStatus;
  }
  return "NEW";
}

async function parseJsonBody<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function mapOrdersFailureMessage(
  statusCode: number,
  serverMessage?: string,
  options?: RequestJsonOptions,
): string {
  if (statusCode === 401 || statusCode === 403) {
    return "Your session has expired. Please sign in again.";
  }
  if (statusCode === 404) {
    return options?.notFoundMessage || "Order not found.";
  }
  if (statusCode === 409) {
    return (
      serverMessage ||
      "Order was updated by someone else. Please refresh and try again."
    );
  }
  if (statusCode === 422) {
    return (
      serverMessage ||
      "This status change is not allowed. Please choose a valid next status."
    );
  }
  if (statusCode === 0 || statusCode >= 500) {
    return options?.failureFallback || "Unable to load orders. Please try again.";
  }
  return (
    serverMessage ||
    options?.failureFallback ||
    "Unable to load orders. Please try again."
  );
}

function normalizeOrdersError(
  error: unknown,
  options?: RequestJsonOptions,
): OrdersApiError {
  if (error instanceof OrdersApiError) {
    return error;
  }

  if (error instanceof DOMException && error.name === "AbortError") {
    return new OrdersApiError(
      "The request timed out. Please check your connection and try again.",
      408,
    );
  }

  return new OrdersApiError(
    options?.failureFallback ||
      "Unable to reach the server. Please check your connection and try again.",
    0,
  );
}
