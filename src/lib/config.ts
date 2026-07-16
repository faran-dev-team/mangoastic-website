/**
 * Frontend environment / API configuration.
 * Values come from NEXT_PUBLIC_* env vars — never hardcode production URLs.
 *
 * NEXT_PUBLIC_* values are inlined at build time. Missing vars must not throw
 * during `next build` / prerender (Vercel), or the deploy fails. API helpers
 * call `assertApiConfigured()` when a request is actually made.
 */

function readPublicEnv(name: string, devFallback?: string): string {
  const fromEnv = process.env[name]?.trim();
  if (fromEnv) {
    return fromEnv.replace(/\/$/, "");
  }

  // Local/dev convenience only — never bake localhost into a production bundle
  // unless the operator explicitly set NEXT_PUBLIC_API_URL.
  if (process.env.NODE_ENV !== "production" && devFallback) {
    return devFallback.replace(/\/$/, "");
  }

  return "";
}

/** Backend base URL, e.g. https://api.example.com — empty until set in Vercel. */
export const API_BASE_URL = readPublicEnv(
  "NEXT_PUBLIC_API_URL",
  "http://localhost:5000",
);

/** True when a usable API base URL is configured. */
export const isApiConfigured = API_BASE_URL.length > 0;

/**
 * Throws a clear error when API calls run without NEXT_PUBLIC_API_URL.
 * Safe at request time; does not break static builds.
 */
export function assertApiConfigured(): void {
  if (!isApiConfigured) {
    throw new Error(
      "Missing NEXT_PUBLIC_API_URL. Set it in Vercel (Project → Settings → Environment Variables) to your Render backend URL (no trailing slash), then redeploy.",
    );
  }
}

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
