"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

const SIDEBAR_COLLAPSED_KEY = "mangoastic.admin.sidebarCollapsed";

type AdminShellContextValue = {
  /** Desktop sidebar collapsed to icon rail. */
  sidebarCollapsed: boolean;
  /** Mobile slide-over drawer open. */
  mobileNavOpen: boolean;
  toggleSidebarCollapsed: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
  openMobileNav: () => void;
  closeMobileNav: () => void;
  toggleMobileNav: () => void;
};

const AdminShellContext = createContext<AdminShellContextValue | null>(null);

type AdminShellProviderProps = {
  children: ReactNode;
};

function readStoredCollapsed(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  try {
    return window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1";
  } catch {
    return false;
  }
}

/**
 * Shared shell chrome state: desktop collapse + mobile drawer.
 * Collapse preference persists in localStorage for a calm return experience.
 */
export function AdminShellProvider({ children }: AdminShellProviderProps) {
  const [sidebarCollapsed, setSidebarCollapsedState] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSidebarCollapsedState(readStoredCollapsed());
    setHydrated(true);
  }, []);

  const setSidebarCollapsed = useCallback((collapsed: boolean) => {
    setSidebarCollapsedState(collapsed);
    try {
      window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, collapsed ? "1" : "0");
    } catch {
      // Ignore quota / private mode failures.
    }
  }, []);

  const toggleSidebarCollapsed = useCallback(() => {
    setSidebarCollapsedState((prev) => {
      const next = !prev;
      try {
        window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
      } catch {
        // Ignore storage failures.
      }
      return next;
    });
  }, []);

  const openMobileNav = useCallback(() => setMobileNavOpen(true), []);
  const closeMobileNav = useCallback(() => setMobileNavOpen(false), []);
  const toggleMobileNav = useCallback(
    () => setMobileNavOpen((prev) => !prev),
    [],
  );

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (!mobileNavOpen) {
      return;
    }
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [mobileNavOpen]);

  // Close mobile drawer on Escape.
  useEffect(() => {
    if (!mobileNavOpen) {
      return;
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileNavOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileNavOpen]);

  const value = useMemo<AdminShellContextValue>(
    () => ({
      sidebarCollapsed: hydrated ? sidebarCollapsed : false,
      mobileNavOpen,
      toggleSidebarCollapsed,
      setSidebarCollapsed,
      openMobileNav,
      closeMobileNav,
      toggleMobileNav,
    }),
    [
      hydrated,
      sidebarCollapsed,
      mobileNavOpen,
      toggleSidebarCollapsed,
      setSidebarCollapsed,
      openMobileNav,
      closeMobileNav,
      toggleMobileNav,
    ],
  );

  return (
    <AdminShellContext.Provider value={value}>
      <div data-admin-shell-ready={hydrated ? "true" : "false"} className="contents">
        {children}
      </div>
    </AdminShellContext.Provider>
  );
}

export function useAdminShell(): AdminShellContextValue {
  const context = useContext(AdminShellContext);
  if (!context) {
    throw new Error("useAdminShell must be used within AdminShellProvider.");
  }
  return context;
}
