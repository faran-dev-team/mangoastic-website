export { default as PageContainer } from "@/components/admin/dashboard/PageContainer";
export { default as PageSection } from "@/components/admin/dashboard/PageSection";
export { default as DashboardCard } from "@/components/admin/dashboard/DashboardCard";
export { default as DashboardGrid } from "@/components/admin/dashboard/DashboardGrid";
export { default as CardStat } from "@/components/admin/dashboard/CardStat";
export type {
  CardStatColor,
  CardStatProps,
  CardStatTrend,
} from "@/components/admin/dashboard/CardStat";
export { default as DashboardStatsSection } from "@/components/admin/dashboard/DashboardStatsSection";
export { default as CeoKpiSection } from "@/components/admin/dashboard/CeoKpiSection";
export { default as DashboardChartsSection } from "@/components/admin/dashboard/DashboardChartsSection";
export {
  ADMIN_NAV_ITEMS,
  getAdminBreadcrumbs,
  getAdminPageTitle,
  isNavItemActive,
  type AdminBreadcrumbItem,
  type AdminNavItem,
} from "@/components/admin/dashboard/nav-items";
export {
  AdminShellProvider,
  useAdminShell,
} from "@/components/admin/dashboard/AdminShellContext";
