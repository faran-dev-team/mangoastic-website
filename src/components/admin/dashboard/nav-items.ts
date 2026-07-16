import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  type LucideIcon,
} from "lucide-react";

export type AdminNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
  /** When true, item is visible but not yet wired to a feature phase. */
  placeholder?: boolean;
};

/**
 * Primary admin navigation.
 * Dashboard, Orders, Customers (+ Logout in shell).
 */
export const ADMIN_NAV_ITEMS: readonly AdminNavItem[] = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/orders",
    label: "Orders",
    icon: ShoppingBag,
  },
  {
    href: "/admin/customers",
    label: "Customers",
    icon: Users,
  },
] as const;

export type AdminBreadcrumbItem = {
  label: string;
  href?: string;
};

/**
 * Resolve a human-readable page title from the current pathname.
 */
export function getAdminPageTitle(pathname: string): string {
  const match = ADMIN_NAV_ITEMS.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );
  return match?.label ?? "Admin";
}

/**
 * Build a simple breadcrumb trail for admin routes.
 */
export function getAdminBreadcrumbs(pathname: string): AdminBreadcrumbItem[] {
  const crumbs: AdminBreadcrumbItem[] = [
    { label: "Admin", href: "/admin/dashboard" },
  ];

  const match = ADMIN_NAV_ITEMS.find(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  if (match) {
    crumbs.push({ label: match.label, href: match.href });
  }

  return crumbs;
}

/**
 * Whether a nav item should show as active for the given pathname.
 */
export function isNavItemActive(pathname: string, href: string): boolean {
  if (pathname === href) {
    return true;
  }
  if (href === "/admin/dashboard") {
    return pathname === "/admin" || pathname === "/admin/dashboard";
  }
  return pathname.startsWith(`${href}/`);
}
