import type { Metadata } from "next";
import { Suspense } from "react";
import PageContainer from "@/components/admin/dashboard/PageContainer";
import PageSection from "@/components/admin/dashboard/PageSection";
import OrdersTableSection from "@/components/admin/orders/OrdersTableSection";
import TableSkeleton from "@/components/admin/orders/TableSkeleton";

export const metadata: Metadata = {
  title: "Orders — Mangoastic Admin",
};

/**
 * Authenticated admin orders page.
 * Phase 6.4 — search, filters, sorting, and URL-synced discovery.
 */
export default function AdminOrdersPage() {
  return (
    <PageContainer>
      <PageSection>
        <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--admin-accent)] sm:text-xs">
          Operations
        </p>
        <h2 className="mt-2 font-sirelia text-3xl text-[var(--admin-text)] sm:text-4xl">
          Orders
        </h2>
        <p className="mt-3 max-w-xl font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)] sm:text-base">
          Run the pipeline without thinking — confirm, pack, deliver. Search,
          filter, and act on hundreds of orders in seconds.
        </p>
      </PageSection>

      <div className="mt-8">
        <Suspense
          fallback={
            <PageSection
              title="All orders"
              description="Search and filter the pipeline — results update as you refine."
            >
              <TableSkeleton rows={6} />
            </PageSection>
          }
        >
          <OrdersTableSection />
        </Suspense>
      </div>
    </PageContainer>
  );
}
