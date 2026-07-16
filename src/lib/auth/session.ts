import type { AdminPublicProfile, AdminSession } from "@/lib/auth/types";

/**
 * Application-managed admin session storage.
 *
 * Uses localStorage today so sessions survive refresh.
 * The interface is intentionally thin so this can later move to
 * HttpOnly cookie session exchange with minimal caller changes.
 */

const SESSION_STORAGE_KEY = "mangoastic.admin.session";

function canUseStorage(): boolean {
  return typeof window !== "undefined" && typeof window.localStorage !== "undefined";
}

function isAdminProfile(value: unknown): value is AdminPublicProfile {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.id === "string" &&
    candidate.id.length > 0 &&
    typeof candidate.name === "string" &&
    typeof candidate.email === "string"
  );
}

function isAdminSession(value: unknown): value is AdminSession {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Record<string, unknown>;
  return (
    typeof candidate.token === "string" &&
    candidate.token.length > 0 &&
    isAdminProfile(candidate.admin)
  );
}

/**
 * Reads the stored admin session, or null if missing / corrupt.
 */
export function getAdminSession(): AdminSession | null {
  if (!canUseStorage()) {
    return null;
  }

  try {
    const raw = window.localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) {
      return null;
    }

    const parsed: unknown = JSON.parse(raw);
    if (!isAdminSession(parsed)) {
      window.localStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    }

    return parsed;
  } catch {
    window.localStorage.removeItem(SESSION_STORAGE_KEY);
    return null;
  }
}

/**
 * Persists an authenticated admin session.
 */
export function setAdminSession(session: AdminSession): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

/**
 * Clears the authenticated admin session.
 */
export function clearAdminSession(): void {
  if (!canUseStorage()) {
    return;
  }

  window.localStorage.removeItem(SESSION_STORAGE_KEY);
}

/**
 * Returns only the access token when a session exists.
 */
export function getAdminAccessToken(): string | null {
  return getAdminSession()?.token ?? null;
}
