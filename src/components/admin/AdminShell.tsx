"use client";

import { memo, useCallback, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import AdminMobileDrawer from "@/components/admin/dashboard/AdminMobileDrawer";
import AdminSidebar from "@/components/admin/dashboard/AdminSidebar";
import {
  AdminShellProvider,
  useAdminShell,
} from "@/components/admin/dashboard/AdminShellContext";
import AdminTopNav from "@/components/admin/dashboard/AdminTopNav";
import CloseMobileNavOnNavigate from "@/components/admin/dashboard/CloseMobileNavOnNavigate";
import AdminToastHost from "@/components/admin/AdminToastHost";
import { useAuth } from "@/hooks/useAuth";

type AdminShellProps = {
  children: ReactNode;
};

/**
 * Holds page content stable across shell context updates (e.g. drawer open).
 * Same children reference + memo ⇒ page islands skip re-render.
 */
const StableMainContent = memo(function StableMainContent({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
});

/**
 * Authenticated admin chrome — sidebar, mobile drawer, top nav, main.
 * Page children are isolated from shell context so drawer open/close
 * does not re-render dashboard/orders islands.
 */
function AdminShellChrome({ children }: AdminShellProps) {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = useCallback(() => {
    logout();
    router.replace("/admin/login");
  }, [logout, router]);

  return (
    <div className="admin-shell flex min-h-dvh bg-[var(--admin-bg)] text-[var(--admin-text)]">
      <a
        href="#admin-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-[100] focus:rounded-[var(--admin-radius-md)] focus:bg-[var(--admin-surface-elevated)] focus:px-3 focus:py-2 focus:font-outfit focus:text-sm focus:text-[var(--admin-text)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-focus-ring)]"
      >
        Skip to main content
      </a>

      <CloseMobileNavOnNavigate />
      <AdminSidebar onLogout={handleLogout} />
      <AdminMobileDrawer onLogout={handleLogout} />
      <AdminMainColumn onLogout={handleLogout}>
        <StableMainContent>{children}</StableMainContent>
      </AdminMainColumn>
      <AdminToastHost />
    </div>
  );
}

type AdminMainColumnProps = {
  children: ReactNode;
  onLogout: () => void;
};

function AdminMainColumn({ children, onLogout }: AdminMainColumnProps) {
  const { mobileNavOpen } = useAdminShell();

  return (
    <div
      className="flex min-w-0 flex-1 flex-col"
      inert={mobileNavOpen ? true : undefined}
    >
      <AdminTopNav onLogout={onLogout} />
      <main
        id="admin-main"
        tabIndex={-1}
        className="flex-1 overflow-x-hidden px-4 py-6 outline-none sm:px-6 sm:py-8 lg:px-8"
      >
        {children}
      </main>
    </div>
  );
}

export default function AdminShell({ children }: AdminShellProps) {
  return (
    <AdminShellProvider>
      <AdminShellChrome>{children}</AdminShellChrome>
    </AdminShellProvider>
  );
}
