"use client";

import { memo, useId, type ChangeEvent, type KeyboardEvent } from "react";
import { Loader2, Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  loading?: boolean;
  className?: string;
  id?: string;
};

/**
 * Debounce-ready search input with clear affordance and loading cue.
 * Parent owns debounce timing so URL/API stay in sync intentionally.
 */
function SearchBarComponent({
  value,
  onChange,
  onClear,
  placeholder = "Search by order ID, customer, or phone…",
  loading = false,
  className,
  id,
}: SearchBarProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const handleClear = () => {
    onChange("");
    onClear?.();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape" && value) {
      event.preventDefault();
      handleClear();
    }
  };

  return (
    <div className={cn("relative w-full", className)}>
      <label htmlFor={inputId} className="sr-only">
        Search orders
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[var(--admin-text-subtle)]"
        strokeWidth={1.75}
        aria-hidden="true"
      />
      <input
        id={inputId}
        type="search"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        className={cn(
          "admin-search-input w-full rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface)]",
          "py-2.5 pr-20 pl-10 font-outfit text-sm text-[var(--admin-text)] placeholder:text-[var(--admin-text-subtle)]",
          "transition-[border-color,box-shadow,transform] duration-200 ease-out",
          "hover:border-[var(--admin-border-strong)]",
          "focus:border-[var(--admin-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--admin-focus-ring)]",
        )}
      />
      <div className="absolute top-1/2 right-2.5 flex -translate-y-1/2 items-center gap-1">
        {loading ? (
          <Loader2
            className="h-4 w-4 animate-spin text-[var(--admin-text-subtle)]"
            strokeWidth={1.75}
            aria-label="Searching"
          />
        ) : null}
        {value ? (
          <button
            type="button"
            onClick={handleClear}
            className="admin-btn-press relative inline-flex h-7 w-7 items-center justify-center rounded-md text-[var(--admin-text-muted)] transition-[color,transform,background-color] duration-150 hover:bg-[var(--admin-surface-hover)] hover:text-[var(--admin-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] before:absolute before:-inset-2 before:content-['']"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" strokeWidth={2} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

const SearchBar = memo(SearchBarComponent);
SearchBar.displayName = "SearchBar";

export default SearchBar;
export type { SearchBarProps };
