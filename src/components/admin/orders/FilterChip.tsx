"use client";

import { memo, type ReactNode } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/cn";

type FilterChipProps = {
  label: string;
  onRemove?: () => void;
  children?: ReactNode;
  className?: string;
};

/**
 * Removable active-filter chip for the discovery toolbar.
 */
function FilterChipComponent({
  label,
  onRemove,
  children,
  className,
}: FilterChipProps) {
  return (
    <span
      className={cn(
        "admin-filter-chip inline-flex max-w-full items-center gap-1.5 rounded-md border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-2.5 py-1 font-outfit text-xs text-[var(--admin-text)]",
        className,
      )}
    >
      <span className="truncate">{children ?? label}</span>
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="admin-btn-press relative inline-flex h-4 w-4 shrink-0 items-center justify-center rounded text-[var(--admin-text-muted)] transition-[color,transform] duration-150 hover:text-[var(--admin-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] before:absolute before:-inset-3 before:content-['']"
          aria-label={`Remove filter ${label}`}
        >
          <X className="h-3 w-3" strokeWidth={2} />
        </button>
      ) : null}
    </span>
  );
}

const FilterChip = memo(FilterChipComponent);
FilterChip.displayName = "FilterChip";

export default FilterChip;
export type { FilterChipProps };
