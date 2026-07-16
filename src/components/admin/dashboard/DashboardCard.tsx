import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type DashboardCardProps = {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  /** Soft entrance animation (opacity + translate). Off by default for dense lists. */
  animate?: boolean;
  as?: "div" | "article" | "section";
};

const PADDING_CLASS: Record<NonNullable<DashboardCardProps["padding"]>, string> =
  {
    none: "p-0",
    sm: "p-4",
    md: "p-5 sm:p-6",
    lg: "p-6 sm:p-8",
  };

/**
 * Reusable surface for dashboard content blocks.
 * Uses CSS variables so a future theme layer can restyle without refactors.
 */
export default function DashboardCard({
  children,
  className,
  padding = "md",
  animate = false,
  as: Tag = "div",
}: DashboardCardProps) {
  return (
    <Tag
      className={cn(
        "rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)]",
        "transition-[border-color,transform,opacity] duration-200 ease-out",
        "hover:border-[var(--admin-border-strong)]",
        PADDING_CLASS[padding],
        animate && "admin-card-enter",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
