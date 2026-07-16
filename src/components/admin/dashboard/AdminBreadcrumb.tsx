"use client";

import { memo } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { AdminBreadcrumbItem } from "@/components/admin/dashboard/nav-items";
import { cn } from "@/lib/cn";

type AdminBreadcrumbProps = {
  items: AdminBreadcrumbItem[];
  className?: string;
};

/**
 * Compact breadcrumb trail for the admin top navigation.
 */
function AdminBreadcrumb({ items, className }: AdminBreadcrumbProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Breadcrumb" className={cn("min-w-0", className)}>
      <ol className="flex min-w-0 items-center gap-1.5 overflow-hidden">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={`${item.label}-${index}`}
              className="flex min-w-0 items-center gap-1.5"
            >
              {index > 0 ? (
                <ChevronRight
                  className="h-3.5 w-3.5 shrink-0 text-[var(--admin-text-subtle)]"
                  aria-hidden
                />
              ) : null}
              {isLast || !item.href ? (
                <span
                  aria-current={isLast ? "page" : undefined}
                  className={cn(
                    "truncate font-outfit text-xs sm:text-sm",
                    isLast
                      ? "font-medium text-[var(--admin-text)]"
                      : "text-[var(--admin-text-muted)]",
                  )}
                >
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="truncate font-outfit text-xs text-[var(--admin-text-muted)] transition-colors duration-200 ease-out hover:text-[var(--admin-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--admin-bg)] sm:text-sm"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default memo(AdminBreadcrumb);
