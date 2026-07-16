"use client";

import { memo } from "react";
import { SearchX } from "lucide-react";
import { cn } from "@/lib/cn";

type EmptySearchStateProps = {
  onClearFilters: () => void;
  className?: string;
  title?: string;
  description?: string;
};

/**
 * Shown when filters/search yield zero matches — never an empty table shell.
 */
function EmptySearchStateComponent({
  onClearFilters,
  className,
  title = "No matching orders found.",
  description = "Try a different search term or clear filters to see all orders again.",
}: EmptySearchStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center rounded-[var(--admin-radius-lg)] border border-dashed border-[var(--admin-border)] bg-[var(--admin-surface)] px-6 py-14 text-center admin-card-enter",
        className,
      )}
      role="status"
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-[var(--admin-radius-md)] bg-[var(--admin-surface-hover)] text-[var(--admin-text-muted)]"
        aria-hidden="true"
      >
        <SearchX className="h-6 w-6" strokeWidth={1.75} />
      </div>
      <p className="font-outfit text-sm font-semibold text-[var(--admin-text)]">
        {title}
      </p>
      <p className="mt-1.5 max-w-sm font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)]">
        {description}
      </p>
      <button
        type="button"
        onClick={onClearFilters}
        className="admin-btn-press mt-5 inline-flex items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-4 py-2 font-outfit text-xs font-medium text-[var(--admin-text)] transition-[transform,border-color,background-color] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
      >
        Clear Filters
      </button>
    </div>
  );
}

const EmptySearchState = memo(EmptySearchStateComponent);
EmptySearchState.displayName = "EmptySearchState";

export default EmptySearchState;
export type { EmptySearchStateProps };
