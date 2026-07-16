"use client";

import {
  memo,
  useCallback,
  useEffect,
  useState,
} from "react";
import CityFilter from "@/components/admin/orders/CityFilter";
import FilterChip from "@/components/admin/orders/FilterChip";
import SearchBar from "@/components/admin/orders/SearchBar";
import SortDropdown from "@/components/admin/orders/SortDropdown";
import StatusFilter from "@/components/admin/orders/StatusFilter";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { ADMIN_ORDER_SORTS } from "@/lib/admin/orderQuery";
import type {
  AdminOrderListQuery,
  AdminOrderSort,
  AdminOrderStatus,
} from "@/lib/admin/types";
import { cn } from "@/lib/cn";

type FilterPanelProps = {
  query: AdminOrderListQuery;
  cities: string[];
  citiesLoading?: boolean;
  searching?: boolean;
  hasActiveFilters: boolean;
  onSearchChange: (search: string) => void;
  onStatusChange: (status: AdminOrderStatus | null) => void;
  onCityChange: (city: string | null) => void;
  onSortChange: (sort: AdminOrderSort) => void;
  onClearFilters: () => void;
  className?: string;
};

const STATUS_CHIP_LABELS: Record<AdminOrderStatus, string> = {
  NEW: "New",
  CONFIRMED: "Confirmed",
  PACKED: "Packed",
  DELIVERED: "Delivered",
  CANCELLED: "Cancelled",
};

/**
 * Order discovery toolbar — search, status, city, sort, and clear.
 */
function FilterPanelComponent({
  query,
  cities,
  citiesLoading = false,
  searching = false,
  hasActiveFilters,
  onSearchChange,
  onStatusChange,
  onCityChange,
  onSortChange,
  onClearFilters,
  className,
}: FilterPanelProps) {
  const [searchInput, setSearchInput] = useState(query.search);
  const debouncedSearch = useDebouncedValue(searchInput, 300);

  // Keep local input aligned with URL (back/forward / clear / shared links).
  useEffect(() => {
    setSearchInput(query.search);
  }, [query.search]);

  // Push debounced search into URL/API — skips identical values.
  useEffect(() => {
    if (debouncedSearch.trim() === query.search.trim()) {
      return;
    }
    onSearchChange(debouncedSearch);
  }, [debouncedSearch, onSearchChange, query.search]);

  const handleSearchInput = useCallback((value: string) => {
    setSearchInput(value);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchInput("");
    onSearchChange("");
  }, [onSearchChange]);

  const clearStatus = useCallback(() => {
    onStatusChange(null);
  }, [onStatusChange]);

  const clearCity = useCallback(() => {
    onCityChange(null);
  }, [onCityChange]);

  const resetSort = useCallback(() => {
    onSortChange("newest");
  }, [onSortChange]);

  const sortLabel =
    ADMIN_ORDER_SORTS.find((option) => option.value === query.sort)?.label ??
    "Newest first";

  return (
    <div
      className={cn(
        "admin-filter-panel sticky top-[calc(var(--admin-topnav-height)+0.5rem)] z-20 space-y-4 rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)]/95 p-4 shadow-sm shadow-black/10 backdrop-blur-sm sm:p-5",
        className,
      )}
    >
      <SearchBar
        value={searchInput}
        onChange={handleSearchInput}
        onClear={handleClearSearch}
        loading={searching}
      />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatusFilter value={query.status} onChange={onStatusChange} />
        <CityFilter
          value={query.city}
          cities={cities}
          onChange={onCityChange}
          loading={citiesLoading}
        />
        <SortDropdown value={query.sort} onChange={onSortChange} />
        <div className="flex items-end">
          <button
            type="button"
            onClick={onClearFilters}
            disabled={!hasActiveFilters}
            className="admin-btn-press inline-flex h-[42px] w-full items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-3.5 font-outfit text-xs font-medium text-[var(--admin-text)] transition-[transform,border-color,background-color,opacity] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {hasActiveFilters ? (
        <div
          className="flex flex-wrap items-center gap-2 border-t border-[var(--admin-border)] pt-3"
          role="group"
          aria-label="Active filters"
        >
          {query.search.trim() ? (
            <FilterChip
              label={`Search: ${query.search.trim()}`}
              onRemove={handleClearSearch}
            >
              Search: <span className="font-medium">{query.search.trim()}</span>
            </FilterChip>
          ) : null}
          {query.status ? (
            <FilterChip
              label={`Status: ${STATUS_CHIP_LABELS[query.status]}`}
              onRemove={clearStatus}
            >
              Status:{" "}
              <span className="font-medium">
                {STATUS_CHIP_LABELS[query.status]}
              </span>
            </FilterChip>
          ) : null}
          {query.city ? (
            <FilterChip
              label={`City: ${query.city}`}
              onRemove={clearCity}
            >
              City: <span className="font-medium">{query.city}</span>
            </FilterChip>
          ) : null}
          {query.sort !== "newest" ? (
            <FilterChip
              label={`Sort: ${sortLabel}`}
              onRemove={resetSort}
            >
              Sort: <span className="font-medium">{sortLabel}</span>
            </FilterChip>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

const FilterPanel = memo(FilterPanelComponent);
FilterPanel.displayName = "FilterPanel";

export default FilterPanel;
export type { FilterPanelProps };
