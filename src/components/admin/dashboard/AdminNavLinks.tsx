"use client";

import { memo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ADMIN_NAV_ITEMS,
  isNavItemActive,
} from "@/components/admin/dashboard/nav-items";
import { cn } from "@/lib/cn";

type AdminNavLinksProps = {
  collapsed?: boolean;
  onNavigate?: () => void;
  className?: string;
};

/**
 * Shared navigation link list for desktop sidebar and mobile drawer.
 */
function AdminNavLinks({
  collapsed = false,
  onNavigate,
  className,
}: AdminNavLinksProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn("flex flex-col gap-0.5", className)}
      aria-label="Admin navigation"
    >
      {ADMIN_NAV_ITEMS.map((item) => {
        const active = isNavItemActive(pathname, item.href);
        const Icon = item.icon;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            title={collapsed ? item.label : undefined}
            className={cn(
              "group relative flex items-center gap-3 rounded-[var(--admin-radius-md)] font-outfit text-sm",
              "transition-[background-color,color,transform] duration-200 ease-out",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--admin-sidebar)]",
              "active:scale-[0.98]",
              collapsed ? "justify-center px-2 py-2.5" : "px-3 py-2.5",
              active
                ? "bg-[var(--admin-accent-soft)] text-[var(--admin-accent)]"
                : "text-[var(--admin-text-muted)] hover:bg-[var(--admin-surface-hover)] hover:text-[var(--admin-text)]",
            )}
          >
            {active ? (
              <span
                className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-[var(--admin-accent)]"
                aria-hidden
              />
            ) : null}
            <Icon
              className={cn(
                "h-[18px] w-[18px] shrink-0 transition-transform duration-200 ease-out",
                !active && "group-hover:scale-105",
              )}
              aria-hidden
            />
            {!collapsed ? (
              <span className="flex min-w-0 flex-1 items-center justify-between gap-2">
                <span className="truncate">{item.label}</span>
                {item.placeholder ? (
                  <span className="shrink-0 rounded px-1.5 py-0.5 font-outfit text-[10px] font-medium uppercase tracking-wider text-[var(--admin-text-subtle)] ring-1 ring-[var(--admin-border)]">
                    Soon
                  </span>
                ) : null}
              </span>
            ) : (
              <span className="sr-only">{item.label}</span>
            )}
          </Link>
        );
      })}
    </nav>
  );
}

export default memo(AdminNavLinks);
