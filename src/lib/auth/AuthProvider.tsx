"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { AuthApiError, fetchAdminProfile, loginAdmin } from "@/lib/auth/api";
import {
  clearAdminSession,
  getAdminSession,
  setAdminSession,
} from "@/lib/auth/session";
import type {
  AdminLoginPayload,
  AdminPublicProfile,
  AuthStatus,
} from "@/lib/auth/types";

type AuthContextValue = {
  status: AuthStatus;
  admin: AdminPublicProfile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (payload: AdminLoginPayload) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

/**
 * Admin authentication provider.
 * Restores session on mount, validates the token against /api/admin/profile,
 * and exposes login / logout for the admin UI.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [status, setStatus] = useState<AuthStatus>("loading");
  const [admin, setAdmin] = useState<AdminPublicProfile | null>(null);
  const restoreStartedRef = useRef(false);

  const logout = useCallback(() => {
    clearAdminSession();
    setAdmin(null);
    setStatus("unauthenticated");
  }, []);

  useEffect(() => {
    if (restoreStartedRef.current) {
      return;
    }
    restoreStartedRef.current = true;

    let cancelled = false;
    const controller = new AbortController();

    const restoreSession = async () => {
      const session = getAdminSession();

      if (!session) {
        if (!cancelled) {
          setAdmin(null);
          setStatus("unauthenticated");
        }
        return;
      }

      try {
        const profile = await fetchAdminProfile(
          session.token,
          controller.signal,
        );
        if (cancelled) {
          return;
        }

        setAdminSession({ token: session.token, admin: profile });
        setAdmin(profile);
        setStatus("authenticated");
      } catch (error) {
        if (cancelled || controller.signal.aborted) {
          return;
        }

        // Expired / invalid tokens must clear the session.
        if (
          error instanceof AuthApiError &&
          (error.statusCode === 401 || error.statusCode === 403)
        ) {
          clearAdminSession();
          setAdmin(null);
          setStatus("unauthenticated");
          return;
        }

        // Transient network/server issues: restore the persisted profile so a
        // refresh does not bounce the admin to login. Protected API calls will
        // still enforce validity and force logout on 401.
        setAdmin(session.admin);
        setStatus("authenticated");
      }
    };

    void restoreSession();

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const login = useCallback(async (payload: AdminLoginPayload) => {
    const result = await loginAdmin(payload);
    setAdminSession({
      token: result.token,
      admin: result.admin,
    });
    setAdmin(result.admin);
    setStatus("authenticated");
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      status,
      admin,
      isAuthenticated: status === "authenticated",
      isLoading: status === "loading",
      login,
      logout,
    }),
    [status, admin, login, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Access the admin auth context. Must be used within AuthProvider.
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider.");
  }
  return context;
}
