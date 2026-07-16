"use client";

import { memo } from "react";
import Link from "next/link";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";
import AdminNavLinks from "@/components/admin/dashboard/AdminNavLinks";
import AdminUserMenu from "@/components/admin/dashboard/AdminUserMenu";
import { useAdminShell } from "@/components/admin/dashboard/AdminShellContext";
import { cn } from "@/lib/cn";

type AdminSidebarProps = {
  onLogout: () => void;
};

/**
 * Sticky, collapsible desktop sidebar.
 * Width animates via CSS transition on a fixed pixel rail — GPU-friendly.
 */
function AdminSidebar({ onLogout }: AdminSidebarProps) {
  const { sidebarCollapsed, toggleSidebarCollapsed } = useAdminShell();

  return (
    <aside
      className={cn(
        "admin-sidebar sticky top-0 z-30 hidden h-dvh shrink-0 flex-col border-r border-[var(--admin-border)] bg-[var(--admin-sidebar)] lg:flex",
        "transition-[width] duration-300 ease-out will-change-[width]",
        sidebarCollapsed ? "w-[var(--admin-sidebar-collapsed)]" : "w-[var(--admin-sidebar-expanded)]",
      )}
      aria-label="Admin sidebar"
      data-collapsed={sidebarCollapsed ? "true" : "false"}
    >
      <div
        className={cn(
          "flex h-[var(--admin-topnav-height)] shrink-0 items-center border-b border-[var(--admin-border)]",
          sidebarCollapsed ? "justify-center px-2" : "justify-between gap-2 px-4",
        )}
      >
        <Link
          href="/admin/dashboard"
          className={cn(
            "min-w-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--admin-sidebar)]",
            sidebarCollapsed && "flex justify-center",
          )}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-mangoastic.svg"
            alt="Mangoastic"
            className={cn(
              "h-auto object-contain transition-[width,opacity] duration-300 ease-out",
              sidebarCollapsed ? "w-8" : "w-32",
            )}
          />
        </Link>

        {!sidebarCollapsed ? (
          <button
            type="button"
            onClick={toggleSidebarCollapsed}
            className="admin-btn-press inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-[var(--admin-radius-md)] text-[var(--admin-text-muted)] transition-[color,background-color,transform] duration-200 ease-out hover:bg-[var(--admin-surface-hover)] hover:text-[var(--admin-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] active:scale-[0.96]"
            aria-label="Collapse sidebar"
            title="Collapse sidebar"
          >
            <PanelLeftClose className="h-4 w-4" aria-hidden />
          </button>
        ) : null}
      </div>

      {!sidebarCollapsed ? (
        <p className="px-5 pb-1 pt-4 font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--admin-accent)]">
          Admin Console
        </p>
      ) : (
        <div className="flex justify-center py-3">
          <button
            type="button"
            onClick={toggleSidebarCollapsed}
            className="admin-btn-press inline-flex h-8 w-8 items-center justify-center rounded-[var(--admin-radius-md)] text-[var(--admin-text-muted)] transition-[color,background-color,transform] duration-200 ease-out hover:bg-[var(--admin-surface-hover)] hover:text-[var(--admin-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] active:scale-[0.96]"
            aria-label="Expand sidebar"
            title="Expand sidebar"
          >
            <PanelLeftOpen className="h-4 w-4" aria-hidden />
          </button>
        </div>
      )}

      <div className="flex-1 overflow-y-auto overflow-x-hidden px-2.5 py-2">
        <AdminNavLinks collapsed={sidebarCollapsed} />
      </div>

      <div
        className={cn(
          "shrink-0 border-t border-[var(--admin-border)]",
          sidebarCollapsed ? "p-2.5" : "p-4",
        )}
      >
        <AdminUserMenu compact={sidebarCollapsed} onLogout={onLogout} />
      </div>
    </aside>
  );
}

export default memo(AdminSidebar);
