"use client";

import { memo, useMemo } from "react";
import { LogOut } from "lucide-react";
import { getAdminInitials } from "@/components/admin/dashboard/getAdminInitials";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/cn";

type AdminUserMenuProps = {
  className?: string;
  /** Compact mode for collapsed sidebar. */
  compact?: boolean;
  onLogout: () => void;
};

/**
 * Authenticated admin profile surface.
 * Name, email, and avatar initials always come from the session — never hardcoded.
 */
function AdminUserMenu({ className, compact = false, onLogout }: AdminUserMenuProps) {
  const { admin } = useAuth();

  const initials = useMemo(() => getAdminInitials(admin?.name), [admin?.name]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      <div
        className={cn(
          "flex items-center gap-3",
          compact && "justify-center",
        )}
      >
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--admin-accent-soft)] font-outfit text-xs font-semibold text-[var(--admin-accent)] ring-1 ring-[var(--admin-border)]"
          aria-hidden
        >
          {initials}
        </div>
        {!compact ? (
          <div className="min-w-0 flex-1">
            <p className="truncate font-outfit text-sm font-medium text-[var(--admin-text)]">
              {admin?.name ?? "—"}
            </p>
            <p className="truncate font-outfit text-xs text-[var(--admin-text-muted)]">
              {admin?.email ?? "—"}
            </p>
          </div>
        ) : (
          <span className="sr-only">
            {admin?.name ?? "Admin"} ({admin?.email ?? ""})
          </span>
        )}
      </div>

      <button
        type="button"
        onClick={onLogout}
        className={cn(
          "admin-btn-press inline-flex items-center justify-center gap-2 rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] font-outfit text-sm text-[var(--admin-text-muted)]",
          "transition-[color,border-color,background-color,transform] duration-200 ease-out",
          "hover:border-[var(--admin-accent)]/40 hover:text-[var(--admin-accent)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--admin-bg)]",
          "active:scale-[0.98]",
          compact ? "h-9 w-9 px-0" : "w-full px-3 py-2",
        )}
        aria-label="Sign out"
        title="Sign out"
      >
        <LogOut className="h-4 w-4 shrink-0" aria-hidden />
        {!compact ? <span>Sign out</span> : null}
      </button>
    </div>
  );
}

export default memo(AdminUserMenu);
