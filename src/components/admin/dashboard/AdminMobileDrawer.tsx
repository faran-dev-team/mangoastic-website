"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import AdminNavLinks from "@/components/admin/dashboard/AdminNavLinks";
import AdminUserMenu from "@/components/admin/dashboard/AdminUserMenu";
import { useAdminShell } from "@/components/admin/dashboard/AdminShellContext";
import { cn } from "@/lib/cn";

type AdminMobileDrawerProps = {
  onLogout: () => void;
};

/**
 * Slide-over navigation drawer for tablet / mobile viewports.
 * Uses transform + opacity only for 60 FPS on low-end devices.
 * Focus is trapped while open; restored on close.
 */
function AdminMobileDrawer({ onLogout }: AdminMobileDrawerProps) {
  const { mobileNavOpen, closeMobileNav } = useAdminShell();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);

  const handleLogout = useCallback(() => {
    closeMobileNav();
    onLogout();
  }, [closeMobileNav, onLogout]);

  useEffect(() => {
    if (!mobileNavOpen) {
      return;
    }
    previouslyFocused.current = document.activeElement as HTMLElement | null;
    closeButtonRef.current?.focus();

    return () => {
      previouslyFocused.current?.focus?.();
    };
  }, [mobileNavOpen]);

  useEffect(() => {
    if (!mobileNavOpen) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const focusable = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", handleKeyDown);
    return () => panel.removeEventListener("keydown", handleKeyDown);
  }, [mobileNavOpen]);

  return (
    <div className="lg:hidden" aria-hidden={!mobileNavOpen}>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-black/55 transition-opacity duration-200 ease-out",
          mobileNavOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
        onClick={closeMobileNav}
        aria-hidden
      />

      {/* Panel */}
      <div
        ref={panelRef}
        id="admin-mobile-nav"
        role="dialog"
        aria-modal="true"
        aria-label="Admin navigation"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[min(100vw-3rem,18.5rem)] flex-col bg-[var(--admin-sidebar)] shadow-xl shadow-black/40",
          "transition-transform duration-200 ease-out",
          mobileNavOpen
            ? "translate-x-0 will-change-transform"
            : "-translate-x-full",
        )}
      >
        <div className="flex h-[var(--admin-topnav-height)] items-center justify-between gap-3 border-b border-[var(--admin-border)] px-4">
          <Link
            href="/admin/dashboard"
            onClick={closeMobileNav}
            className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/logo-mangoastic.svg"
              alt="Mangoastic"
              className="h-auto w-28 object-contain"
            />
          </Link>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={closeMobileNav}
            className="admin-btn-press inline-flex h-11 w-11 items-center justify-center rounded-[var(--admin-radius-md)] text-[var(--admin-text-muted)] transition-[color,background-color,transform] duration-200 ease-out hover:bg-[var(--admin-surface-hover)] hover:text-[var(--admin-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] active:scale-[0.96]"
            aria-label="Close navigation"
          >
            <X className="h-5 w-5" aria-hidden />
          </button>
        </div>

        <p className="px-5 pb-1 pt-4 font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--admin-accent)]">
          Admin Console
        </p>

        <div className="flex-1 overflow-y-auto px-2.5 py-2">
          <AdminNavLinks onNavigate={closeMobileNav} />
        </div>

        <div className="shrink-0 border-t border-[var(--admin-border)] p-4">
          <AdminUserMenu onLogout={handleLogout} />
        </div>
      </div>
    </div>
  );
}

export default memo(AdminMobileDrawer);
