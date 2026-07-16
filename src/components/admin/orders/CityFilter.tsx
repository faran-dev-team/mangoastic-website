"use client";

import { memo, useId, type ChangeEvent } from "react";
import { cn } from "@/lib/cn";

type CityFilterProps = {
  value: string | null;
  cities: string[];
  onChange: (city: string | null) => void;
  loading?: boolean;
  className?: string;
  id?: string;
};

/**
 * City filter populated dynamically from available orders.
 */
function CityFilterComponent({
  value,
  cities,
  onChange,
  loading = false,
  className,
  id,
}: CityFilterProps) {
  const generatedId = useId();
  const selectId = id ?? generatedId;

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const next = event.target.value;
    onChange(next === "ALL" ? null : next);
  };

  return (
    <div className={cn("min-w-0", className)}>
      <label
        htmlFor={selectId}
        className="mb-1.5 block font-outfit text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-muted)]"
      >
        City
      </label>
      <select
        id={selectId}
        value={value ?? "ALL"}
        onChange={handleChange}
        disabled={loading}
        className="admin-filter-select w-full appearance-none rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-3 py-2.5 font-outfit text-sm text-[var(--admin-text)] transition-[border-color,transform,opacity] duration-200 hover:border-[var(--admin-border-strong)] focus:border-[var(--admin-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-focus-ring)] disabled:cursor-wait disabled:opacity-60"
      >
        <option value="ALL">All cities</option>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
    </div>
  );
}

const CityFilter = memo(CityFilterComponent);
CityFilter.displayName = "CityFilter";

export default CityFilter;
export type { CityFilterProps };
