"use client";

import { memo, useId, type ChangeEvent } from "react";
import { ADMIN_ORDER_SORTS } from "@/lib/admin/orderQuery";
import type { AdminOrderSort } from "@/lib/admin/types";
import { cn } from "@/lib/cn";

type SortDropdownProps = {
  value: AdminOrderSort;
  onChange: (sort: AdminOrderSort) => void;
  className?: string;
  id?: string;
};

/**
 * Sort control for order discovery (date + total).
 */
function SortDropdownComponent({
  value,
  onChange,
  className,
  id,
}: SortDropdownProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as AdminOrderSort);
  };

  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={selectId}
        className="mb-1.5 block font-outfit text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-muted)]"
      >
        Sort
      </label>
      <select
        id={selectId}
        value={value}
        onChange={handleChange}
        className="admin-filter-select w-full appearance-none rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2.5 font-outfit text-sm text-[var(--admin-text)] transition-[border-color,transform] duration-200 hover:border-[var(--admin-border-strong)] focus:border-[var(--admin-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-focus-ring)]"
      >
        {ADMIN_ORDER_SORTS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

const SortDropdown = memo(SortDropdownComponent);
SortDropdown.displayName = "SortDropdown";

export default SortDropdown;
export type { SortDropdownProps };
