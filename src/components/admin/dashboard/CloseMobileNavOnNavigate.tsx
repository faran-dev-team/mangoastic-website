"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAdminShell } from "@/components/admin/dashboard/AdminShellContext";

/**
 * Closes the mobile drawer on route change without subscribing the
 * page content tree to shell context updates.
 */
export default function CloseMobileNavOnNavigate() {
  const pathname = usePathname();
  const { closeMobileNav } = useAdminShell();

  useEffect(() => {
    closeMobileNav();
  }, [pathname, closeMobileNav]);

  return null;
}
