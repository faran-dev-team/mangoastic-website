import type { ReactNode } from "react";
import AdminShell from "@/components/admin/AdminShell";
import RequireAuth from "@/components/admin/RequireAuth";

/** Admin pages are auth-gated and must not be statically prerendered. */
export const dynamic = "force-dynamic";

/**
 * Every route under /admin except /admin/login is wrapped here.
 * Unauthenticated users are redirected to the login page.
 */
export default function AdminProtectedLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <RequireAuth>
      <AdminShell>{children}</AdminShell>
    </RequireAuth>
  );
}
