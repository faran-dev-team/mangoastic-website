import type { Metadata } from "next";
import PageContainer from "@/components/admin/dashboard/PageContainer";
import PageSection from "@/components/admin/dashboard/PageSection";
import CeoKpiSection from "@/components/admin/dashboard/CeoKpiSection";
import DashboardChartsLazy from "@/components/admin/dashboard/DashboardChartsLazy";
import DashboardStatsSection from "@/components/admin/dashboard/DashboardStatsSection";

export const metadata: Metadata = {
  title: "Dashboard — Mangoastic Admin",
};

/**
 * Authenticated admin landing page.
 * CEO KPIs + charts + existing order-status overview.
 * Charts are code-split so Recharts is not in the initial dashboard bundle.
 */
export default function AdminDashboardPage() {
  return (
    <PageContainer>
      <PageSection>
        <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--admin-accent)] sm:text-xs">
          Overview
        </p>
        <h2 className="mt-2 font-sirelia text-3xl text-[var(--admin-text)] sm:text-4xl">
          Welcome back
        </h2>
        <p className="mt-3 max-w-xl font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)] sm:text-base">
          A live snapshot of revenue, customers, and your order pipeline.
          Confirm new requests and track fulfillment at a glance.
        </p>
      </PageSection>

      <div className="mt-8 space-y-10">
        <CeoKpiSection />
        <DashboardChartsLazy />
        <DashboardStatsSection />
      </div>
    </PageContainer>
  );
}
