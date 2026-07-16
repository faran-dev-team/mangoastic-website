"use client";

import { memo, useMemo, type ReactNode } from "react";
import {
  Banknote,
  CheckCircle2,
  Clock3,
  ShoppingBag,
  TrendingUp,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import CardStat, {
  type CardStatColor,
} from "@/components/admin/dashboard/CardStat";
import DashboardGrid from "@/components/admin/dashboard/DashboardGrid";
import PageSection from "@/components/admin/dashboard/PageSection";
import { AdminSectionErrorBoundary } from "@/components/admin/AdminSectionErrorBoundary";
import { useDashboardSummary } from "@/hooks/useDashboardSummary";
import type { DashboardSummary } from "@/lib/admin/types";

type KpiDefinition = {
  key: keyof DashboardSummary;
  title: string;
  description: string;
  color: CardStatColor;
  icon: ReactNode;
  valueFormat?: "count" | "currency";
};

const KPI_DEFINITIONS: readonly KpiDefinition[] = [
  {
    key: "todaysOrders",
    title: "Today's Orders",
    description: "Orders placed today",
    color: "info",
    icon: <ShoppingBag className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    key: "pendingOrders",
    title: "Pending Orders",
    description: "New, confirmed, or packed",
    color: "warning",
    icon: <Clock3 className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    key: "deliveredToday",
    title: "Delivered Today",
    description: "Fulfilled since midnight UTC",
    color: "success",
    icon: <CheckCircle2 className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    key: "todaysRevenue",
    title: "Today's Revenue",
    description: "Non-cancelled orders today",
    color: "accent",
    icon: <Banknote className="h-5 w-5" strokeWidth={1.75} />,
    valueFormat: "currency",
  },
  {
    key: "totalRevenue",
    title: "Total Revenue",
    description: "Lifetime non-cancelled revenue",
    color: "accent",
    icon: <Wallet className="h-5 w-5" strokeWidth={1.75} />,
    valueFormat: "currency",
  },
  {
    key: "averageOrderValue",
    title: "Average Order Value",
    description: "Mean ticket across active orders",
    color: "info",
    icon: <TrendingUp className="h-5 w-5" strokeWidth={1.75} />,
    valueFormat: "currency",
  },
  {
    key: "activeCustomers",
    title: "Active Customers",
    description: "Customers with pending orders",
    color: "success",
    icon: <UserCheck className="h-5 w-5" strokeWidth={1.75} />,
  },
  {
    key: "totalCustomers",
    title: "Total Customers",
    description: "Unique customers with orders",
    color: "neutral",
    icon: <Users className="h-5 w-5" strokeWidth={1.75} />,
  },
] as const;

/**
 * CEO-facing KPI strip — live aggregates from GET /api/admin/dashboard.
 */
function CeoKpiSectionComponent() {
  const { data, error, isLoading, isError, animateCount, refetch } =
    useDashboardSummary();

  const cards = useMemo(() => {
    return KPI_DEFINITIONS.map((def, index) => ({
      ...def,
      value: data ? data[def.key] : 0,
      animationDelayMs: index * 35,
    }));
  }, [data]);

  const showCards = isLoading || (!isError && data !== null);

  return (
    <AdminSectionErrorBoundary
      title="Unable to display KPIs"
      description="Business metrics could not be displayed. You can retry without leaving the page."
    >
      <PageSection
        id="ceo-kpis"
        title="Business snapshot"
        description="Immediate operational and revenue insight."
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
              Unable to load KPIs
            </p>
            <p className="mt-1.5 max-w-lg font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)]">
              {error ??
                "Something went wrong while loading business metrics. Please try again."}
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
          <DashboardGrid cols={4} gap="md">
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
                valueFormat={card.valueFormat ?? "count"}
              />
            ))}
          </DashboardGrid>
        ) : null}
      </PageSection>
    </AdminSectionErrorBoundary>
  );
}

const CeoKpiSection = memo(CeoKpiSectionComponent);
CeoKpiSection.displayName = "CeoKpiSection";

export default CeoKpiSection;
