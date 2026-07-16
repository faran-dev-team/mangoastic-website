"use client";

import { memo, useMemo } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import DashboardCard from "@/components/admin/dashboard/DashboardCard";
import DashboardGrid from "@/components/admin/dashboard/DashboardGrid";
import PageSection from "@/components/admin/dashboard/PageSection";
import { AdminSectionErrorBoundary } from "@/components/admin/AdminSectionErrorBoundary";
import { useDashboardCharts } from "@/hooks/useDashboardCharts";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { ORDER_STATUS_LABELS } from "@/lib/admin/orderStatus";
import type { AdminOrderStatus } from "@/lib/admin/types";
import { formatPKR } from "@/lib/format/money";

const CHART_ANIMATION_MS = 180;

const STATUS_COLORS: Record<string, string> = {
  NEW: "#60a5fa",
  CONFIRMED: "#fbbf24",
  PACKED: "#a78bfa",
  DELIVERED: "#4ade80",
  CANCELLED: "#f87171",
};

const TOOLTIP_STYLE = {
  backgroundColor: "var(--admin-surface-elevated)",
  border: "1px solid var(--admin-border)",
  borderRadius: "8px",
  fontFamily: "var(--font-outfit), Outfit, sans-serif",
  fontSize: "12px",
  color: "var(--admin-text)",
};

type StatusTooltipEntry = {
  name?: string;
  value?: number;
  payload?: { status?: string };
};

/** High-contrast tooltip for the status donut — default Recharts text is too dim. */
function StatusDonutTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: StatusTooltipEntry[];
}) {
  if (!active || !payload?.length) {
    return null;
  }

  const entry = payload[0];
  const statusKey = entry.payload?.status ?? "";
  const segmentColor = STATUS_COLORS[statusKey] ?? "#f4f4f5";

  return (
    <div
      className="rounded-lg border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-3 py-2 shadow-lg shadow-black/30"
      style={{ fontFamily: "var(--font-outfit), Outfit, sans-serif" }}
    >
      <p className="font-outfit text-sm leading-none">
        <span
          className="font-semibold"
          style={{ color: segmentColor }}
        >
          {entry.name}
        </span>
        <span className="mx-1.5 text-[var(--admin-text-muted)]">:</span>
        <span className="font-bold tabular-nums text-[var(--admin-accent)]">
          {entry.value}
        </span>
      </p>
    </div>
  );
}

function formatShortDay(isoDate: string): string {
  const parts = isoDate.split("-");
  if (parts.length !== 3) {
    return isoDate;
  }
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  if (!Number.isFinite(month) || !Number.isFinite(day)) {
    return isoDate;
  }
  return `${month}/${day}`;
}

function ChartSkeleton() {
  return (
    <div
      className="flex h-[220px] items-end gap-2 px-2 pb-2"
      aria-busy="true"
      aria-label="Loading chart"
    >
      {Array.from({ length: 7 }).map((_, index) => (
        <div
          key={`chart-skel-${index}`}
          className="admin-shimmer flex-1 rounded-t-md"
          style={{ height: `${40 + ((index * 17) % 50)}%` }}
        />
      ))}
    </div>
  );
}

function EmptyChartNote({ message }: { message: string }) {
  return (
    <div className="flex h-[220px] items-center justify-center px-4">
      <p className="font-outfit text-sm text-[var(--admin-text-muted)]">
        {message}
      </p>
    </div>
  );
}

/**
 * Lightweight CEO charts — live aggregates, short CSS-friendly animations.
 */
function DashboardChartsSectionComponent() {
  const { data, error, isLoading, isError, refetch } = useDashboardCharts();
  const prefersReducedMotion = usePrefersReducedMotion();
  const animate = !prefersReducedMotion;

  const statusData = useMemo(() => {
    if (!data?.ordersByStatus.length) {
      return [];
    }
    return data.ordersByStatus.map((slice) => ({
      name:
        ORDER_STATUS_LABELS[slice.status as AdminOrderStatus] ?? slice.status,
      value: slice.count,
      status: slice.status,
    }));
  }, [data]);

  const ordersTrend = useMemo(() => {
    if (!data?.ordersLast7Days.length) {
      return [];
    }
    return data.ordersLast7Days.map((point) => ({
      label: formatShortDay(point.date),
      value: point.value,
    }));
  }, [data]);

  const revenueTrend = useMemo(() => {
    if (!data?.revenueLast7Days.length) {
      return [];
    }
    return data.revenueLast7Days.map((point) => ({
      label: formatShortDay(point.date),
      value: point.value,
    }));
  }, [data]);

  const cityData = useMemo(() => {
    if (!data?.topCities.length) {
      return [];
    }
    return data.topCities.map((slice) => ({
      city: slice.city,
      count: slice.count,
    }));
  }, [data]);

  const statusTotal = useMemo(
    () => statusData.reduce((sum, row) => sum + row.value, 0),
    [statusData],
  );

  return (
    <AdminSectionErrorBoundary
      title="Unable to display charts"
      description="Chart widgets could not be displayed. You can retry without leaving the page."
    >
      <PageSection
        id="dashboard-charts"
        title="Trends & distribution"
        description="Live pipeline charts — optimized for low-end devices with light animations."
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
              Unable to load charts
            </p>
            <p className="mt-1.5 max-w-lg font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)]">
              {error ??
                "Something went wrong while loading chart data. Please try again."}
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

        {!isError || isLoading ? (
          <DashboardGrid cols={2} gap="md">
            <DashboardCard animate>
              <h3 className="font-outfit text-sm font-semibold text-[var(--admin-text)]">
                Orders by Status
              </h3>
              <p className="mt-1 font-outfit text-xs text-[var(--admin-text-subtle)]">
                Active pipeline distribution
              </p>
              <div className="mt-4">
                {isLoading ? (
                  <ChartSkeleton />
                ) : statusTotal === 0 ? (
                  <EmptyChartNote message="No active orders to chart yet." />
                ) : (
                  <div className="h-[220px] w-full" role="img" aria-label="Orders by status donut chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={statusData}
                          dataKey="value"
                          nameKey="name"
                          innerRadius="58%"
                          outerRadius="78%"
                          paddingAngle={2}
                          stroke="none"
                          isAnimationActive={animate}
                          animationDuration={CHART_ANIMATION_MS}
                        >
                          {statusData.map((entry) => (
                            <Cell
                              key={entry.status}
                              fill={STATUS_COLORS[entry.status] ?? "#a1a1aa"}
                            />
                          ))}
                        </Pie>
                        <Tooltip content={<StatusDonutTooltip />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </DashboardCard>

            <DashboardCard animate>
              <h3 className="font-outfit text-sm font-semibold text-[var(--admin-text)]">
                Last 7 Days Orders
              </h3>
              <p className="mt-1 font-outfit text-xs text-[var(--admin-text-subtle)]">
                Orders created per day
              </p>
              <div className="mt-4">
                {isLoading ? (
                  <ChartSkeleton />
                ) : ordersTrend.length === 0 ? (
                  <EmptyChartNote message="No orders in the last 7 days." />
                ) : (
                  <div className="h-[220px] w-full" role="img" aria-label="Last 7 days orders line chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ordersTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid
                          stroke="var(--admin-border)"
                          strokeDasharray="3 3"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="label"
                          tick={{ fill: "var(--admin-text-subtle)", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          allowDecimals={false}
                          width={28}
                          tick={{ fill: "var(--admin-text-subtle)", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Line
                          type="monotone"
                          dataKey="value"
                          name="Orders"
                          stroke="var(--admin-accent)"
                          strokeWidth={2}
                          dot={false}
                          isAnimationActive={animate}
                          animationDuration={CHART_ANIMATION_MS}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </DashboardCard>

            <DashboardCard animate>
              <h3 className="font-outfit text-sm font-semibold text-[var(--admin-text)]">
                Revenue Last 7 Days
              </h3>
              <p className="mt-1 font-outfit text-xs text-[var(--admin-text-subtle)]">
                Non-cancelled order value
              </p>
              <div className="mt-4">
                {isLoading ? (
                  <ChartSkeleton />
                ) : revenueTrend.length === 0 ? (
                  <EmptyChartNote message="No revenue in the last 7 days." />
                ) : (
                  <div className="h-[220px] w-full" role="img" aria-label="Revenue last 7 days area chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueTrend} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                        <CartesianGrid
                          stroke="var(--admin-border)"
                          strokeDasharray="3 3"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="label"
                          tick={{ fill: "var(--admin-text-subtle)", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          width={40}
                          tick={{ fill: "var(--admin-text-subtle)", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                          tickFormatter={(value: number) =>
                            value >= 1000
                              ? `${Math.round(value / 1000)}k`
                              : String(value)
                          }
                        />
                        <Tooltip
                          contentStyle={TOOLTIP_STYLE}
                          formatter={(value: number) => [
                            formatPKR(value),
                            "Revenue",
                          ]}
                        />
                        <Area
                          type="monotone"
                          dataKey="value"
                          name="Revenue"
                          stroke="var(--admin-accent)"
                          fill="rgba(255,163,10,0.18)"
                          strokeWidth={2}
                          isAnimationActive={animate}
                          animationDuration={CHART_ANIMATION_MS}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </DashboardCard>

            <DashboardCard animate>
              <h3 className="font-outfit text-sm font-semibold text-[var(--admin-text)]">
                Top Cities
              </h3>
              <p className="mt-1 font-outfit text-xs text-[var(--admin-text-subtle)]">
                Highest order volume
              </p>
              <div className="mt-4">
                {isLoading ? (
                  <ChartSkeleton />
                ) : cityData.length === 0 ? (
                  <EmptyChartNote message="No city data yet." />
                ) : (
                  <div className="h-[220px] w-full" role="img" aria-label="Top cities horizontal bar chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={cityData}
                        layout="vertical"
                        margin={{ top: 4, right: 12, left: 4, bottom: 4 }}
                      >
                        <CartesianGrid
                          stroke="var(--admin-border)"
                          strokeDasharray="3 3"
                          horizontal={false}
                        />
                        <XAxis
                          type="number"
                          allowDecimals={false}
                          tick={{ fill: "var(--admin-text-subtle)", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis
                          type="category"
                          dataKey="city"
                          width={72}
                          tick={{ fill: "var(--admin-text-muted)", fontSize: 11 }}
                          axisLine={false}
                          tickLine={false}
                        />
                        <Tooltip contentStyle={TOOLTIP_STYLE} />
                        <Bar
                          dataKey="count"
                          name="Orders"
                          fill="#60a5fa"
                          radius={[0, 4, 4, 0]}
                          isAnimationActive={animate}
                          animationDuration={CHART_ANIMATION_MS}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}
              </div>
            </DashboardCard>
          </DashboardGrid>
        ) : null}
      </PageSection>
    </AdminSectionErrorBoundary>
  );
}

const DashboardChartsSection = memo(DashboardChartsSectionComponent);
DashboardChartsSection.displayName = "DashboardChartsSection";

export default DashboardChartsSection;
