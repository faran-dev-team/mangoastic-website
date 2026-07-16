import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type DashboardGridProps = {
  children: ReactNode;
  className?: string;
  /**
   * Column presets for common dashboard layouts.
   * - 1: stacked
   * - 2: two columns from md
   * - 3: three columns from lg
   * - 4: four columns from xl
   * - 5: five columns from xl (statistics row)
   */
  cols?: 1 | 2 | 3 | 4 | 5;
  gap?: "sm" | "md" | "lg";
};

const COLS_CLASS: Record<NonNullable<DashboardGridProps["cols"]>, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 md:grid-cols-2",
  3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4",
  5: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5",
};

const GAP_CLASS: Record<NonNullable<DashboardGridProps["gap"]>, string> = {
  sm: "gap-3",
  md: "gap-4 sm:gap-5",
  lg: "gap-5 sm:gap-6",
};

/**
 * Responsive grid helper for dashboard content.
 * Prefer this over ad-hoc grid classes so spacing stays consistent.
 */
export default function DashboardGrid({
  children,
  className,
  cols = 3,
  gap = "md",
}: DashboardGridProps) {
  return (
    <div
      className={cn("grid", COLS_CLASS[cols], GAP_CLASS[gap], className)}
    >
      {children}
    </div>
  );
}
