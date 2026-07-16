"use client";

import { memo, useId } from "react";
import EmptySearchState from "@/components/admin/orders/EmptySearchState";
import EmptyTable from "@/components/admin/orders/EmptyTable";
import OrderRow, { OrderMobileCard } from "@/components/admin/orders/OrderRow";
import TableSkeleton from "@/components/admin/orders/TableSkeleton";
import { cn } from "@/lib/cn";
import type { AdminOrderListItem, AdminOrderStatus } from "@/lib/admin/types";

type OrderTableProps = {
  orders: AdminOrderListItem[];
  loading?: boolean;
  refreshing?: boolean;
  error?: string | null;
  onRetry?: () => void;
  hasActiveFilters?: boolean;
  onClearFilters?: () => void;
  className?: string;
  skeletonRows?: number;
  /** Opens order details drawer when a row is activated. */
  onOrderSelect?: (orderId: string) => void;
  /** Currently inspected order — highlights the matching row. */
  selectedOrderId?: string | null;
  onRequestStatusChange?: (
    orderId: string,
    fromStatus: AdminOrderStatus,
    toStatus: AdminOrderStatus,
  ) => Promise<boolean>;
  updatingOrderId?: string | null;
  onDeleteOrder?: (orderId: string) => Promise<boolean>;
};

const COLUMNS = [
  { key: "orderId", label: "Order ID", align: "left" as const },
  { key: "customer", label: "Customer", align: "left" as const },
  { key: "phone", label: "Phone Number", align: "left" as const },
  { key: "city", label: "City", align: "left" as const },
  { key: "product", label: "Product", align: "left" as const },
  { key: "qty", label: "Qty", align: "right" as const },
  { key: "total", label: "Total", align: "right" as const },
  { key: "action", label: "Next action", align: "left" as const },
  { key: "date", label: "Order Date", align: "left" as const },
  { key: "more", label: "", align: "right" as const, srOnly: "More actions" },
] as const;

/**
 * Reusable admin orders table.
 * Desktop: sticky-header semantic table. Mobile: card list with the same fields.
 */
function OrderTableComponent({
  orders,
  loading = false,
  refreshing = false,
  error = null,
  onRetry,
  hasActiveFilters = false,
  onClearFilters,
  className,
  skeletonRows = 6,
  onOrderSelect,
  selectedOrderId = null,
  onRequestStatusChange,
  updatingOrderId = null,
  onDeleteOrder,
}: OrderTableProps) {
  const captionId = useId();

  if (loading) {
    return <TableSkeleton rows={skeletonRows} className={className} />;
  }

  if (error) {
    return (
      <div
        role="alert"
        className={cn(
          "rounded-[var(--admin-radius-lg)] border border-[rgba(239,68,68,0.35)] bg-[rgba(239,68,68,0.08)] px-5 py-6 sm:px-6",
          className,
        )}
      >
        <p className="font-outfit text-sm font-medium text-[var(--admin-text)]">
          Unable to load orders
        </p>
        <p className="mt-1.5 max-w-lg font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)]">
          {error}
        </p>
        {onRetry ? (
          <button
            type="button"
            onClick={onRetry}
            className="admin-btn-press mt-4 inline-flex items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-4 py-2 font-outfit text-xs font-medium text-[var(--admin-text)] transition-[transform,border-color,background-color] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
          >
            Try again
          </button>
        ) : null}
      </div>
    );
  }

  if (orders.length === 0) {
    if (hasActiveFilters && onClearFilters) {
      return (
        <EmptySearchState
          onClearFilters={onClearFilters}
          className={className}
        />
      );
    }
    return (
      <EmptyTable
        className={className}
      />
    );
  }

  return (
    <div
      className={cn(
        "relative rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)] transition-opacity duration-200",
        refreshing && "opacity-70",
        className,
      )}
      aria-busy={refreshing || undefined}
    >
      {/* Desktop / tablet table */}
      <div className="hidden max-h-[min(70vh,40rem)] overflow-auto md:block">
        <table
          className="w-full min-w-0 border-collapse text-left"
          aria-labelledby={captionId}
        >
          <caption id={captionId} className="sr-only">
            Customer orders. Select a row to inspect order details.
          </caption>
          <thead className="sticky top-0 z-10 border-b border-[var(--admin-border)] bg-[var(--admin-surface-elevated)]">
            <tr>
              {COLUMNS.map((column) => (
                <th
                  key={column.key}
                  scope="col"
                  className={cn(
                    "px-4 py-3 font-outfit text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]",
                    column.key === "more" && "px-2",
                    column.align === "right" && "text-right",
                  )}
                >
                  {"srOnly" in column && column.srOnly ? (
                    <span className="sr-only">{column.srOnly}</span>
                  ) : (
                    column.label
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <OrderRow
                key={order.orderId || `order-${index}`}
                order={order}
                index={index}
                onSelect={onOrderSelect}
                selected={
                  selectedOrderId != null &&
                  selectedOrderId === order.orderId
                }
                onRequestStatusChange={onRequestStatusChange}
                updating={updatingOrderId === order.orderId}
                onDeleteOrder={onDeleteOrder}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile cards — no horizontal scroll */}
      <div className="md:hidden" role="list" aria-label="Customer orders">
        {orders.map((order, index) => (
          <div key={order.orderId || `order-m-${index}`} role="listitem">
            <OrderMobileCard
              order={order}
              index={index}
              onSelect={onOrderSelect}
              selected={
                selectedOrderId != null && selectedOrderId === order.orderId
              }
              onRequestStatusChange={onRequestStatusChange}
              updating={updatingOrderId === order.orderId}
              onDeleteOrder={onDeleteOrder}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

const OrderTable = memo(OrderTableComponent);
OrderTable.displayName = "OrderTable";

export default OrderTable;
export type { OrderTableProps };
