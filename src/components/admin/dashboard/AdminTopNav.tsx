"use client";

import { memo, useMemo } from "react";
import { usePathname } from "next/navigation";
import { Bell, Menu } from "lucide-react";
import AdminBreadcrumb from "@/components/admin/dashboard/AdminBreadcrumb";
import { getAdminInitials } from "@/components/admin/dashboard/getAdminInitials";
import {
  getAdminBreadcrumbs,
  getAdminPageTitle,
} from "@/components/admin/dashboard/nav-items";
import { useAdminShell } from "@/components/admin/dashboard/AdminShellContext";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

type AdminTopNavProps = {
  onLogout: () => void;
};

/**
 * Sticky top navigation: page title, breadcrumb, notifications, profile.
 */
function AdminTopNav({ onLogout }: AdminTopNavProps) {
  const pathname = usePathname();
  const { admin } = useAuth();
  const { openMobileNav, mobileNavOpen } = useAdminShell();

  const title = useMemo(() => getAdminPageTitle(pathname), [pathname]);
  const breadcrumbs = useMemo(() => getAdminBreadcrumbs(pathname), [pathname]);
  const initials = useMemo(() => getAdminInitials(admin?.name), [admin?.name]);

  return (
    <header
      className={cn(
        "admin-topnav sticky top-0 z-20 flex h-[var(--admin-topnav-height)] shrink-0 items-center gap-3 border-b border-[var(--admin-border)] bg-[var(--admin-topnav)] px-3 backdrop-blur-sm sm:gap-4 sm:px-5 lg:px-6",
      )}
    >
      <button
        type="button"
        onClick={openMobileNav}
        className="admin-btn-press inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--admin-radius-md)] text-[var(--admin-text-muted)] transition-[color,background-color,transform] duration-200 ease-out hover:bg-[var(--admin-surface-hover)] hover:text-[var(--admin-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] active:scale-[0.96] lg:hidden"
        aria-label="Open navigation"
        aria-expanded={mobileNavOpen}
        aria-controls="admin-mobile-nav"
      >
        <Menu className="h-5 w-5" aria-hidden />
      </button>

      <div className="admin-topnav-fade min-w-0 flex-1">
        <AdminBreadcrumb items={breadcrumbs} className="mb-0.5 hidden sm:block" />
        <h1 className="truncate font-outfit text-base font-semibold tracking-tight text-[var(--admin-text)] sm:text-lg">
          {title}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
        <button
          type="button"
          className="admin-btn-press relative inline-flex h-10 w-10 items-center justify-center rounded-[var(--admin-radius-md)] text-[var(--admin-text-muted)] transition-[color,background-color,transform] duration-200 ease-out hover:bg-[var(--admin-surface-hover)] hover:text-[var(--admin-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] active:scale-[0.96] disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Notifications unavailable — coming soon"
          title="Notifications — coming soon"
          aria-disabled="true"
          disabled
        >
          <Bell className="h-[18px] w-[18px]" aria-hidden />
        </button>

        <div className="hidden items-center gap-2.5 rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)] py-1.5 pl-1.5 pr-3 sm:flex">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--admin-accent-soft)] font-outfit text-[11px] font-semibold text-[var(--admin-accent)]"
            aria-hidden
          >
            {initials}
          </div>
          <div className="min-w-0 max-w-[10rem] lg:max-w-[14rem]">
            <p className="truncate font-outfit text-sm font-medium leading-tight text-[var(--admin-text)]">
              {admin?.name ?? "—"}
            </p>
            <p className="truncate font-outfit text-[11px] leading-tight text-[var(--admin-text-muted)]">
              {admin?.email ?? "—"}
            </p>
          </div>
        </div>

        {/* Mobile avatar — profile details live in the drawer */}
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--admin-accent-soft)] font-outfit text-xs font-semibold text-[var(--admin-accent)] ring-1 ring-[var(--admin-border)] sm:hidden"
          aria-label={admin ? `${admin.name}, ${admin.email}` : "Admin profile"}
        >
          {initials}
        </div>

        <button
          type="button"
          onClick={onLogout}
          className="admin-btn-press ml-0.5 hidden h-10 items-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-3 font-outfit text-sm text-[var(--admin-text-muted)] transition-[color,border-color,transform] duration-200 ease-out hover:border-[var(--admin-accent)]/40 hover:text-[var(--admin-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] active:scale-[0.98] xl:inline-flex"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}

export default memo(AdminTopNav);
