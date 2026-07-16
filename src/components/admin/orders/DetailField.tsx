"use client";

import { memo, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type DetailFieldProps = {
  label: string;
  value: ReactNode;
  className?: string;
  /** Stretch across the full grid width (e.g. address, notes). */
  fullWidth?: boolean;
};

/**
 * Label + value pair for order inspection sections.
 */
function DetailFieldComponent({
  label,
  value,
  className,
  fullWidth = false,
}: DetailFieldProps) {
  return (
    <div className={cn(fullWidth && "sm:col-span-2", className)}>
      <dt className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
        {label}
      </dt>
      <dd className="mt-1 font-outfit text-sm leading-relaxed text-[var(--admin-text)] break-words">
        {value}
      </dd>
    </div>
  );
}

const DetailField = memo(DetailFieldComponent);
DetailField.displayName = "DetailField";

export default DetailField;
export type { DetailFieldProps };
