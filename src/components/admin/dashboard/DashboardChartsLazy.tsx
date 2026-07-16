"use client";

import dynamic from "next/dynamic";

const DashboardChartsSection = dynamic(
  () => import("@/components/admin/dashboard/DashboardChartsSection"),
  {
    ssr: false,
    loading: () => (
      <div
        className="min-h-[280px] animate-pulse rounded-2xl bg-[var(--admin-surface-muted)]"
        aria-hidden
      />
    ),
  },
);

/**
 * Client boundary that code-splits Recharts out of the initial dashboard bundle.
 */
export default function DashboardChartsLazy() {
  return <DashboardChartsSection />;
}
