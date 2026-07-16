"use client";

import { memo, useId, type ChangeEvent } from "react";
import { ADMIN_ORDER_STATUSES } from "@/lib/admin/orderQuery";
import type { AdminOrderStatus } from "@/lib/admin/types";
import { cn } from "@/lib/cn";

type StatusFilterProps = {
  value: AdminOrderStatus | null;
  onChange: (status: AdminOrderStatus | null) => void;
  className?: string;
  id?: string;
};

const STATUS_LABELS: Record<AdminOrderStatus, string> = {
  NEW: "New",
  CONFIRMED: "Confirmed",
  PACKED: "Packed",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

/**
 * Status filter select — All + every OrderStatus value.
 */
function StatusFilterComponent({
  value,
  onChange,
  className,
  id,
}: StatusFilterProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value;
    onChange(next === "ALL" ? null : (next as AdminOrderStatus));
  };

  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={selectId}
        className="mb-1.5 block font-outfit text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-muted)]"
      >
        Status
      </label>
      <select
        id={selectId}
        value={value ?? "ALL"}
        onChange={handleChange}
        className="admin-filter-select w-full appearance-none rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2.5 font-outfit text-sm text-[var(--admin-text)] transition-[border-color,transform] duration-200 hover:border-[var(--admin-border-strong)] focus:border-[var(--admin-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-focus-ring)]"
      >
        <option value="ALL">All statuses</option>
        {ADMIN_ORDER_STATUSES.map((status) => (
          <option key={status} value={status}>
            {STATUS_LABELS[status]}
          </option>
        ))}
      </select>
    </div>
  );
}

const StatusFilter = memo(StatusFilterComponent);
StatusFilter.displayName = "StatusFilter";

export default StatusFilter;
export type { StatusFilterProps };
