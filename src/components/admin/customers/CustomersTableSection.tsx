"use client";

import { memo, useCallback, useMemo, useState, type KeyboardEvent } from "react";
import { AdminSectionErrorBoundary } from "@/components/admin/AdminSectionErrorBoundary";
import CustomerDetailsDrawer from "@/components/admin/customers/CustomerDetailsDrawer";
import StatusBadge from "@/components/admin/orders/StatusBadge";
import PageSection from "@/components/admin/dashboard/PageSection";
import { useAdminCustomers } from "@/hooks/useAdminCustomers";
import { formatAdminDateTime } from "@/lib/format/datetime";
import { formatPKR } from "@/lib/format/money";
import { cn } from "@/lib/cn";
import type { AdminCustomerListItem } from "@/lib/admin/types";

/**
 * Customer directory — derived from orders, no separate Customer table.
 */
function CustomersTableSectionComponent() {
  const { data, error, isLoading, isRefreshing, isError, refetch } =
    useAdminCustomers();
  const [selectedPhone, setSelectedPhone] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!q) {
      return data;
    }
    return data.filter((customer) => {
      return (
        customer.name.toLowerCase().includes(q) ||
        customer.phoneNumber.toLowerCase().includes(q) ||
        customer.city.toLowerCase().includes(q)
      );
    });
  }, [data, search]);

  const handleSelect = useCallback((phone: string) => {
    setSelectedPhone(phone);
  }, []);

  const handleClose = useCallback(() => {
    setSelectedPhone(null);
  }, []);

  return (
    <AdminSectionErrorBoundary
      title="Unable to display customers"
      description="The customer directory could not be displayed. You can retry without leaving the page."
    >
      <PageSection
        id="customers-table"
        title="Customer directory"
        description="Aggregated from orders by phone — spend, activity, and active pipeline at a glance."
        actions={
          isError && !isLoading ? (
            <button
              type="button"
              onClick={refetch}
              className="admin-btn-press inline-flex items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-3.5 py-2 font-outfit text-xs font-medium text-[var(--admin-text)] transition-[transform,border-color,background-color] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
            >
              Retry
            </button>
          ) : null
        }
      >
        <div className="space-y-4">
          <div className="sticky top-[calc(var(--admin-topnav-height)+0.5rem)] z-20 rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)]/95 p-4 backdrop-blur-sm sm:p-5">
            <label className="block">
              <span className="sr-only">Search customers</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search by name, phone, or city…"
                className="admin-search-input h-[42px] w-full rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-3.5 font-outfit text-sm text-[var(--admin-text)] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-[var(--admin-text-subtle)] focus:border-[var(--admin-border-strong)] focus:ring-2 focus:ring-[var(--admin-focus-ring)]"
              />
            </label>
          </div>

          {isLoading ? (
            <div className="space-y-2 rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={`cust-skel-${index}`}
                  className="admin-shimmer h-12 rounded-md"
                />
              ))}
            </div>
          ) : null}

          {!isLoading && isError ? (
            <div
              role="alert"
              className="rounded-[var(--admin-radius-lg)] border border-[rgba(239,68,68,0.35)] bg-[rgba(239,68,68,0.08)] px-5 py-6"
            >
              <p className="font-outfit text-sm font-medium text-[var(--admin-text)]">
                Unable to load customers
              </p>
              <p className="mt-1.5 font-outfit text-sm text-[var(--admin-text-muted)]">
                {error}
              </p>
              <button
                type="button"
                onClick={refetch}
                className="admin-btn-press mt-4 inline-flex items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-4 py-2 font-outfit text-xs font-medium text-[var(--admin-text)]"
              >
                Try again
              </button>
            </div>
          ) : null}

          {!isLoading && !isError && filtered.length === 0 ? (
            <div className="rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)] px-5 py-10 text-center">
              <p className="font-outfit text-sm font-medium text-[var(--admin-text)]">
                {search.trim() ? "No customers match your search" : "No customers yet"}
              </p>
              <p className="mt-1.5 font-outfit text-sm text-[var(--admin-text-muted)]">
                {search.trim()
                  ? "Try a different name, phone, or city."
                  : "Customers appear here automatically when orders are placed."}
              </p>
            </div>
          ) : null}

          {!isLoading && !isError && filtered.length > 0 ? (
            <div
              className={cn(
                "overflow-hidden rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)] transition-opacity duration-200",
                isRefreshing && "opacity-70",
              )}
              aria-busy={isRefreshing || undefined}
            >
              <div className="hidden max-h-[min(70vh,40rem)] overflow-auto md:block">
                <table className="w-full border-collapse text-left">
                  <caption className="sr-only">
                    Customers derived from orders. Select a row for full profile.
                  </caption>
                  <thead className="sticky top-0 z-10 border-b border-[var(--admin-border)] bg-[var(--admin-surface-elevated)]">
                    <tr>
                      {[
                        "Name",
                        "Phone",
                        "City",
                        "Orders",
                        "Lifetime Spend",
                        "Last Order",
                        "Active Order",
                      ].map((label) => (
                        <th
                          key={label}
                          scope="col"
                          className="px-4 py-3 font-outfit text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]"
                        >
                          {label}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((customer, index) => (
                      <CustomerRow
                        key={customer.phoneNumber}
                        customer={customer}
                        index={index}
                        selected={selectedPhone === customer.phoneNumber}
                        onSelect={handleSelect}
                      />
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="md:hidden" role="list" aria-label="Customers">
                {filtered.map((customer, index) => (
                  <CustomerMobileCard
                    key={`m-${customer.phoneNumber}`}
                    customer={customer}
                    index={index}
                    selected={selectedPhone === customer.phoneNumber}
                    onSelect={handleSelect}
                  />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </PageSection>

      <CustomerDetailsDrawer
        phoneNumber={selectedPhone}
        open={selectedPhone != null}
        onClose={handleClose}
      />
    </AdminSectionErrorBoundary>
  );
}

type CustomerRowProps = {
  customer: AdminCustomerListItem;
  index: number;
  selected: boolean;
  onSelect: (phone: string) => void;
};

const CustomerRow = memo(function CustomerRow({
  customer,
  index,
  selected,
  onSelect,
}: CustomerRowProps) {
  const handleActivate = useCallback(() => {
    onSelect(customer.phoneNumber);
  }, [onSelect, customer.phoneNumber]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTableRowElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleActivate();
      }
    },
    [handleActivate],
  );

  return (
    <tr
      className={cn(
        "admin-table-row cursor-pointer border-b border-[var(--admin-border)] last:border-b-0",
        "transition-[background-color] duration-[180ms] ease-out",
        "hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--admin-focus-ring)]",
        selected && "bg-[var(--admin-surface-hover)]",
      )}
      style={{ animationDelay: `${Math.min(index * 30, 180)}ms` }}
      onClick={handleActivate}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      aria-label={`View customer ${customer.name}`}
      aria-selected={selected}
    >
      <td className="max-w-[10rem] truncate px-4 py-3.5 font-outfit text-sm text-[var(--admin-text)]">
        {customer.name}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 font-outfit text-sm tabular-nums text-[var(--admin-text-muted)]">
        {customer.phoneNumber}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 font-outfit text-sm text-[var(--admin-text-muted)]">
        {customer.city}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 font-outfit text-sm tabular-nums text-[var(--admin-text)]">
        {customer.totalOrders}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 font-outfit text-sm font-medium tabular-nums text-[var(--admin-text)]">
        {formatPKR(customer.lifetimeSpend)}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 font-outfit text-sm text-[var(--admin-text-muted)]">
        <time dateTime={customer.lastOrderAt || undefined}>
          {formatAdminDateTime(customer.lastOrderAt)}
        </time>
      </td>
      <td className="whitespace-nowrap px-4 py-3.5">
        {customer.activeOrderStatus ? (
          <div className="flex flex-col gap-1">
            <StatusBadge status={customer.activeOrderStatus} />
            <span className="font-outfit text-[10px] tabular-nums text-[var(--admin-text-subtle)]">
              {customer.activeOrderId}
            </span>
          </div>
        ) : (
          <span className="font-outfit text-xs text-[var(--admin-text-subtle)]">
            —
          </span>
        )}
      </td>
    </tr>
  );
});

type CustomerMobileCardProps = {
  customer: AdminCustomerListItem;
  index: number;
  selected: boolean;
  onSelect: (phone: string) => void;
};

const CustomerMobileCard = memo(function CustomerMobileCard({
  customer,
  index,
  selected,
  onSelect,
}: CustomerMobileCardProps) {
  const handleActivate = useCallback(() => {
    onSelect(customer.phoneNumber);
  }, [onSelect, customer.phoneNumber]);

  return (
    <article
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={`View customer ${customer.name}`}
      onClick={handleActivate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleActivate();
        }
      }}
      className={cn(
        "admin-table-row cursor-pointer border-b border-[var(--admin-border)] px-4 py-4 last:border-b-0",
        "transition-[background-color] duration-[180ms] ease-out hover:bg-[var(--admin-surface-hover)]",
        selected && "bg-[var(--admin-surface-hover)]",
      )}
      style={{ animationDelay: `${Math.min(index * 30, 180)}ms` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-outfit text-sm font-semibold text-[var(--admin-text)]">
            {customer.name}
          </p>
          <p className="mt-0.5 font-outfit text-sm tabular-nums text-[var(--admin-text-muted)]">
            {customer.phoneNumber}
          </p>
          <p className="mt-0.5 font-outfit text-xs text-[var(--admin-text-subtle)]">
            {customer.city}
          </p>
        </div>
        {customer.activeOrderStatus ? (
          <StatusBadge status={customer.activeOrderStatus} />
        ) : null}
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-2">
        <div>
          <dt className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            Orders
          </dt>
          <dd className="mt-0.5 font-outfit text-sm tabular-nums text-[var(--admin-text)]">
            {customer.totalOrders}
          </dd>
        </div>
        <div>
          <dt className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            Spend
          </dt>
          <dd className="mt-0.5 font-outfit text-sm font-medium tabular-nums text-[var(--admin-text)]">
            {formatPKR(customer.lifetimeSpend)}
          </dd>
        </div>
      </dl>
    </article>
  );
});

const CustomersTableSection = memo(CustomersTableSectionComponent);
CustomersTableSection.displayName = "CustomersTableSection";

export default CustomersTableSection;
