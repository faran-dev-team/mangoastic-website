import {
  ADMIN_LOGIN_ENDPOINT,
  ADMIN_PROFILE_ENDPOINT,
  AUTH_REQUEST_TIMEOUT_MS,
} from "@/lib/config";
import type {
  AdminLoginPayload,
  AdminLoginSuccessData,
  AdminPublicProfile,
  ApiErrorDetail,
  ApiErrorResponse,
  ApiSuccessResponse,
} from "@/lib/auth/types";

export class AuthApiError extends Error {
  readonly statusCode: number;
  readonly errors: ApiErrorDetail[];

  constructor(message: string, statusCode: number, errors: ApiErrorDetail[] = []) {
    super(message);
    this.name = "AuthApiError";
    this.statusCode = statusCode;
    this.errors = errors;
  }
}

type LoginSuccessResponse = ApiSuccessResponse<AdminLoginSuccessData>;
type ProfileSuccessResponse = ApiSuccessResponse<AdminPublicProfile>;

/**
 * POST /api/admin/login — authenticate an administrator.
 */
export async function loginAdmin(
  payload: AdminLoginPayload,
): Promise<AdminLoginSuccessData> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    AUTH_REQUEST_TIMEOUT_MS,
  );

  try {
    const response = await fetch(ADMIN_LOGIN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
      }),
      signal: controller.signal,
    });

    const body = await parseJsonBody<LoginSuccessResponse | ApiErrorResponse>(
      response,
    );

    if (!response.ok || !body || body.success !== true) {
      const errorBody = body && body.success === false ? body : null;
      throw new AuthApiError(
        mapAuthFailureMessage(response.status, errorBody?.message),
        response.status || 500,
        errorBody?.errors ?? [],
      );
    }

    if (!body.data?.token || !body.data.admin) {
      throw new AuthApiError(
        "Login succeeded but the server returned an incomplete session.",
        500,
      );
    }

    return body.data;
  } catch (error) {
    throw normalizeAuthError(error);
  } finally {
    window.clearTimeout(timeoutId);
  }
}

/**
 * GET /api/admin/profile — validate the current access token.
 */
export async function fetchAdminProfile(
  token: string,
  signal?: AbortSignal,
): Promise<AdminPublicProfile> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    AUTH_REQUEST_TIMEOUT_MS,
  );

  const onExternalAbort = () => controller.abort();
  if (signal) {
    if (signal.aborted) {
      window.clearTimeout(timeoutId);
      throw new AuthApiError("Request cancelled.", 499);
    }
    signal.addEventListener("abort", onExternalAbort, { once: true });
  }

  try {
    const response = await fetch(ADMIN_PROFILE_ENDPOINT, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      signal: controller.signal,
    });

    const body = await parseJsonBody<ProfileSuccessResponse | ApiErrorResponse>(
      response,
    );

    if (!response.ok || !body || body.success !== true) {
      const errorBody = body && body.success === false ? body : null;
      throw new AuthApiError(
        mapSessionFailureMessage(response.status, errorBody?.message),
        response.status || 500,
        errorBody?.errors ?? [],
      );
    }

    if (!body.data?.id || !body.data.email) {
      throw new AuthApiError(
        "Profile response was incomplete. Please sign in again.",
        500,
      );
    }

    return body.data;
  } catch (error) {
    throw normalizeAuthError(error);
  } finally {
    window.clearTimeout(timeoutId);
    if (signal) {
      signal.removeEventListener("abort", onExternalAbort);
    }
  }
}

async function parseJsonBody<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

function mapAuthFailureMessage(
  statusCode: number,
  serverMessage?: string,
): string {
  if (statusCode === 401) {
    return "Invalid email or password.";
  }
  if (statusCode === 422) {
    return serverMessage || "Please check your email and password.";
  }
  if (statusCode === 0 || statusCode >= 500) {
    return "Unable to reach the server. Please try again shortly.";
  }
  return serverMessage || "Unable to sign in. Please try again.";
}

function mapSessionFailureMessage(
  statusCode: number,
  serverMessage?: string,
): string {
  if (statusCode === 401) {
    return "Your session has expired. Please sign in again.";
  }
  if (statusCode === 0 || statusCode >= 500) {
    return "Unable to verify your session. Please try again.";
  }
  return serverMessage || "Your session is no longer valid. Please sign in again.";
}

function normalizeAuthError(error: unknown): AuthApiError {
  if (error instanceof AuthApiError) {
    return error;
  }

  if (error instanceof DOMException && error.name === "AbortError") {
    return new AuthApiError(
      "The request timed out. Please check your connection and try again.",
      408,
    );
  }

  return new AuthApiError(
    "Unable to reach the server. Please check your connection and try again.",
    0,
  );
}
