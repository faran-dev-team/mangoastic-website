/**
 * Frontend environment / API configuration.
 * Values come from NEXT_PUBLIC_* env vars — never hardcode production URLs.
 */

function requirePublicEnv(name: string, fallback?: string): string {
  const fromEnv = process.env[name]?.trim();
  const isProduction = process.env.NODE_ENV === "production";

  // Production builds must never silently fall back to localhost.
  if (!fromEnv) {
    if (isProduction || !fallback) {
      throw new Error(
        `Missing environment variable ${name}. Set it in Vercel / .env.local before building.`,
      );
    }
    return fallback.replace(/\/$/, "");
  }

  return fromEnv.replace(/\/$/, "");
}

/** Backend base URL, e.g. http://localhost:5000 */
export const API_BASE_URL = requirePublicEnv(
  "NEXT_PUBLIC_API_URL",
  process.env.NODE_ENV === "production" ? undefined : "http://localhost:5000",
);

export const ORDERS_ENDPOINT = `${API_BASE_URL}/api/orders`;

export const ADMIN_LOGIN_ENDPOINT = `${API_BASE_URL}/api/admin/login`;

export const ADMIN_PROFILE_ENDPOINT = `${API_BASE_URL}/api/admin/profile`;

export const ADMIN_DASHBOARD_ENDPOINT = `${API_BASE_URL}/api/admin/dashboard`;

export const ADMIN_DASHBOARD_CHARTS_ENDPOINT = `${API_BASE_URL}/api/admin/dashboard/charts`;

export const ADMIN_ORDERS_ENDPOINT = `${API_BASE_URL}/api/admin/orders`;

export const ADMIN_ORDER_CITIES_ENDPOINT = `${API_BASE_URL}/api/admin/orders/cities`;

export const ADMIN_CUSTOMERS_ENDPOINT = `${API_BASE_URL}/api/admin/customers`;

/** Builds GET /api/admin/orders/:orderId for a single order inspection. */
export function adminOrderDetailEndpoint(orderId: string): string {
  return `${ADMIN_ORDERS_ENDPOINT}/${encodeURIComponent(orderId)}`;
}

/** Builds PATCH /api/admin/orders/:orderId/status. */
export function adminOrderStatusEndpoint(orderId: string): string {
  return `${adminOrderDetailEndpoint(orderId)}/status`;
}

/** Builds GET /api/admin/customers/:phoneNumber. */
export function adminCustomerDetailEndpoint(phoneNumber: string): string {
  return `${ADMIN_CUSTOMERS_ENDPOINT}/${encodeURIComponent(phoneNumber)}`;
}

/** Order request timeout (ms). */
export const ORDER_REQUEST_TIMEOUT_MS = 30_000;

/** Admin auth request timeout (ms). */
export const AUTH_REQUEST_TIMEOUT_MS = 30_000;

/** Admin dashboard request timeout (ms). */
export const DASHBOARD_REQUEST_TIMEOUT_MS = 30_000;

/** Admin orders list request timeout (ms). */
export const ADMIN_ORDERS_REQUEST_TIMEOUT_MS = 30_000;

/** Admin order detail request timeout (ms). */
export const ADMIN_ORDER_DETAIL_REQUEST_TIMEOUT_MS = 30_000;

/** Admin customers request timeout (ms). */
export const ADMIN_CUSTOMERS_REQUEST_TIMEOUT_MS = 30_000;
