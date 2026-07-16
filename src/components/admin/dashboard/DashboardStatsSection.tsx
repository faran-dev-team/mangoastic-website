"use client";

import { memo, useMemo, type ReactNode } from "react";
import {
  CheckCircle2,
  Package,
  ShoppingBag,
  Truck,
  XCircle,
} from "lucide-react";
import CardStat, {
  type CardStatColor,
} from "@/components/admin/dashboard/CardStat";
import DashboardGrid from "@/components/admin/dashboard/DashboardGrid";
import PageSection from "@/components/admin/dashboard/PageSection";
import { AdminSectionErrorBoundary } from "@/components/admin/AdminSectionErrorBoundary";
import { useDashboardSummary } from "@/hooks/useDashboardSummary";
import type { DashboardSummary } from "@/lib/admin/types";

type StatDefinition = {
  key: keyof DashboardSummary;
  title: string;
  description: string;
  color: CardStatColor;
  icon: ReactNode;
};

const STAT_DEFINITIONS: readonly StatDefinition[] = [
  {
    key: "totalOrders",
    title: "Total Orders",
    description: "All orders across every status",
    color: "accent",
    icon: <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    key: "newOrders",
    title: "New Orders",
    description: "Awaiting confirmation",
    color: "info",
    icon: <Package className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    key: "confirmedOrders",
    title: "Confirmed Orders",
    description: "Accepted and in progress",
    color: "warning",
    icon: <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    key: "deliveredOrders",
    title: "Delivered Orders",
    description: "Successfully fulfilled",
    color: "success",
    icon: <Truck className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    key: "cancelledOrders",
    title: "Cancelled Orders",
    description: "Closed without delivery",
    color: "danger",
    icon: <XCircle className="h-5 w-5" strokeWidth={1.75} />,
  },
] as const;

/**
 * Live dashboard statistics section.
 * Isolated client island so the page shell can remain a Server Component.
 */
function DashboardStatsSectionComponent() {
  const { data, error, isLoading, isError, animateCount, refetch } =
    useDashboardSummary();

  const cards = useMemo(() => {
    return STAT_DEFINITIONS.map((def, index) => ({
      ...def,
      value: data ? data[def.key] : 0,
      animationDelayMs: index * 40,
    }));
  }, [data]);

  const showCards = isLoading || (!isError && data !== null);

  return (
    <AdminSectionErrorBoundary
      title="Unable to display statistics"
      description="The overview cards could not be displayed. You can retry without leaving the page."
    >
      <PageSection
        id="dashboard-stats"
        title="Order overview"
        description="Live counts from your order pipeline — refresh automatically when order status changes."
        actions={
          isError && !isLoading ? (
            <button
              type="button"
              onClick={refetch}
              className="admin-btn-press inline-flex items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-3.5 py-2 font-outfit text-xs font-medium text-[var(--admin-text)] transition-[transform,border-color,background-color] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
            >
              Retry
            </button>
          ) : null
        }
      >
        {isError && !isLoading ? (
          <div
            role="alert"
            className="rounded-[var(--admin-radius-lg)] border border-[rgba(239,68,68,0.35)] bg-[rgba(239,68,68,0.08)] px-5 py-6 sm:px-6"
          >
            <p className="font-outfit text-sm font-medium text-[var(--admin-text)]">
              Unable to load statistics
            </p>
            <p className="mt-1.5 max-w-lg font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)]">
              {error ??
                "Something went wrong while loading your order overview. Please try again."}
            </p>
            <button
              type="button"
              onClick={refetch}
              className="admin-btn-press mt-4 inline-flex items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-4 py-2 font-outfit text-xs font-medium text-[var(--admin-text)] transition-[transform,border-color,background-color] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
            >
              Try again
            </button>
          </div>
        ) : null}

        {showCards ? (
          <DashboardGrid cols={5} gap="md">
            {cards.map((card) => (
              <CardStat
                key={card.key}
                title={card.title}
                value={card.value}
                description={card.description}
                color={card.color}
                icon={card.icon}
                loading={isLoading}
                animateCount={animateCount && !isLoading}
                animationDelayMs={card.animationDelayMs}
              />
            ))}
          </DashboardGrid>
        ) : null}
      </PageSection>
    </AdminSectionErrorBoundary>
  );
}

const DashboardStatsSection = memo(DashboardStatsSectionComponent);
DashboardStatsSection.displayName = "DashboardStatsSection";

export default DashboardStatsSection;
