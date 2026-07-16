/**
 * Admin authentication domain types (frontend).
 * Mirrors the backend Phase 5.1 response contracts.
 */

export type AdminPublicProfile = {
  id: string;
  name: string;
  email: string;
};

export type AdminLoginPayload = {
  email: string;
  password: string;
};

export type AdminLoginSuccessData = {
  token: string;
  admin: AdminPublicProfile;
};

/** Persisted session shape — swap storage backend without changing callers. */
export type AdminSession = {
  token: string;
  admin: AdminPublicProfile;
};

export type ApiErrorDetail = {
  field?: string;
  message: string;
};

export type ApiSuccessResponse<T> = {
  success: true;
  message: string;
  data: T;
  requestId?: string;
  timestamp?: string;
};

export type ApiErrorResponse = {
  success: false;
  message: string;
  errors?: ApiErrorDetail[];
  requestId?: string;
  timestamp?: string;
};

export type AuthStatus = "loading" | "authenticated" | "unauthenticated";
