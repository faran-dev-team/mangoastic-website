"use client";

import { memo, type ReactNode } from "react";
import { PackageOpen } from "lucide-react";
import { cn } from "@/lib/cn";

type EmptyTableProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  className?: string;
};

/**
 * Professional empty state for data tables.
 * Shown instead of an empty table shell.
 */
function EmptyTableComponent({
  title = "No customer orders yet.",
  description = "When customers place mango orders, they will appear here instantly.",
  action,
  className,
}: EmptyTableProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[var(--admin-radius-lg)] border border-dashed border-[var(--admin-border)] bg-[var(--admin-surface)] px-6 py-14 text-center admin-card-enter",
        className,
      )}
      role="status"
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--admin-radius-md)] bg-[var(--admin-accent-soft)] text-[var(--admin-accent)]"
        aria-hidden="true"
      >
        <PackageOpen className="h-6 w-6" strokeWidth={1.75} />
      </div>
      <p className="font-outfit text-sm font-semibold text-[var(--admin-text)]">
        {title}
      </p>
      <p className="mt-1.5 max-w-sm font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)]">
        {description}
      </p>
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}

const EmptyTable = memo(EmptyTableComponent);
EmptyTable.displayName = "EmptyTable";

export default EmptyTable;
export type { EmptyTableProps };
