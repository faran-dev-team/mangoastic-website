import { cn } from "@/lib/cn";

type TableSkeletonProps = {
  rows?: number;
  className?: string;
};

const SKELETON_COLUMNS = [
  "w-24",
  "w-28",
  "w-32",
  "w-20",
  "w-24",
  "w-12",
  "w-20",
  "w-16",
  "w-24",
] as const;

/**
 * Skeleton placeholder matching OrderTable row dimensions.
 * Server-compatible — no client JS required for the Suspense fallback.
 */
export default function TableSkeleton({
  rows = 6,
  className,
}: TableSkeletonProps) {
  const rowKeys = Array.from({ length: rows }, (_, index) => `sk-${index}`);

  return (
    <div
      className={cn(
        "overflow-hidden rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)]",
        className,
      )}
      role="status"
      aria-live="polite"
      aria-label="Loading orders"
    >
      {/* Desktop / tablet skeleton table */}
      <div className="hidden md:block">
        <div className="border-b border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-4 py-3">
          <div className="grid grid-cols-9 gap-3">
            {SKELETON_COLUMNS.map((width, index) => (
              <div
                key={`head-${index}`}
                className={cn("admin-shimmer h-3 rounded", width)}
              />
            ))}
          </div>
        </div>
        <ul className="divide-y divide-[var(--admin-border)]">
          {rowKeys.map((key) => (
            <li key={key} className="admin-table-row-skeleton px-4 py-3.5">
              <div className="grid grid-cols-9 items-center gap-3">
                {SKELETON_COLUMNS.map((width, index) => (
                  <div
                    key={`${key}-${index}`}
                    className={cn("admin-shimmer h-3.5 rounded", width)}
                  />
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile card skeletons */}
      <ul className="divide-y divide-[var(--admin-border)] md:hidden">
        {rowKeys.map((key) => (
          <li key={key} className="space-y-3 px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="admin-shimmer h-3.5 w-28 rounded" />
              <div className="admin-shimmer h-5 w-16 rounded-md" />
            </div>
            <div className="admin-shimmer h-3 w-36 rounded" />
            <div className="admin-shimmer h-3 w-24 rounded" />
            <div className="flex justify-between gap-3 pt-1">
              <div className="admin-shimmer h-3 w-20 rounded" />
              <div className="admin-shimmer h-3 w-24 rounded" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export type { TableSkeletonProps };
