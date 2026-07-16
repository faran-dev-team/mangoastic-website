"use client";

import { memo, useCallback, type KeyboardEvent } from "react";
import OrderOverflowMenu from "@/components/admin/orders/OrderOverflowMenu";
import OrderPrimaryAction from "@/components/admin/orders/OrderPrimaryAction";
import StatusBadge from "@/components/admin/orders/StatusBadge";
import { formatAdminDateTime } from "@/lib/format/datetime";
import { formatPKR } from "@/lib/format/money";
import { cn } from "@/lib/cn";
import type { AdminOrderListItem, AdminOrderStatus } from "@/lib/admin/types";

type OrderRowProps = {
  order: AdminOrderListItem;
  index?: number;
  className?: string;
  onSelect?: (orderId: string) => void;
  selected?: boolean;
  onRequestStatusChange?: (
    orderId: string,
    fromStatus: AdminOrderStatus,
    toStatus: AdminOrderStatus,
  ) => Promise<boolean>;
  updating?: boolean;
  onDeleteOrder?: (orderId: string) => Promise<boolean>;
};

/**
 * Single order row for the desktop / tablet semantic table.
 * Entire row opens details; action buttons stop propagation.
 */
function OrderRowComponent({
  order,
  index = 0,
  className,
  onSelect,
  selected = false,
  onRequestStatusChange,
  updating = false,
  onDeleteOrder,
}: OrderRowProps) {
  const delayMs = Math.min(index * 30, 180);
  const dateLabel = formatAdminDateTime(order.createdAt);
  const totalLabel = formatPKR(order.total);
  const interactive = typeof onSelect === "function";
  const canUpdateStatus = typeof onRequestStatusChange === "function";

  const handleActivate = useCallback(() => {
    if (!interactive || !order.orderId) {
      return;
    }
    onSelect?.(order.orderId);
  }, [interactive, onSelect, order.orderId]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTableRowElement>) => {
      if (!interactive) {
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleActivate();
      }
    },
    [interactive, handleActivate],
  );

  return (
    <tr
      className={cn(
        "admin-table-row group border-b border-[var(--admin-border)] last:border-b-0",
        "transition-[background-color,transform,opacity] duration-[180ms] ease-out",
        interactive &&
          "cursor-pointer hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:bg-[var(--admin-surface-hover)] focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--admin-focus-ring)]",
        selected && "bg-[var(--admin-surface-hover)]",
        className,
      )}
      style={{ animationDelay: `${delayMs}ms` }}
      onClick={interactive ? handleActivate : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={
        interactive ? `View details for order ${order.orderId}` : undefined
      }
      aria-selected={interactive ? selected : undefined}
    >
      <td className="whitespace-nowrap px-4 py-3.5 font-outfit text-sm font-medium tabular-nums text-[var(--admin-text)]">
        {order.orderId || "—"}
      </td>
      <td className="max-w-[10rem] truncate px-4 py-3.5 font-outfit text-sm text-[var(--admin-text)]">
        {order.customerName || "—"}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 font-outfit text-sm tabular-nums text-[var(--admin-text-muted)]">
        {order.phoneNumber || "—"}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 font-outfit text-sm text-[var(--admin-text-muted)]">
        {order.city || "—"}
      </td>
      <td className="max-w-[9rem] truncate px-4 py-3.5 font-outfit text-sm text-[var(--admin-text)]">
        {order.mangoName || "—"}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-right font-outfit text-sm tabular-nums text-[var(--admin-text)]">
        {order.quantity}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 text-right font-outfit text-sm font-medium tabular-nums text-[var(--admin-text)]">
        {totalLabel}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5">
        {canUpdateStatus && onRequestStatusChange ? (
          <OrderPrimaryAction
            orderId={order.orderId}
            status={order.status}
            updating={updating}
            onRequestChange={onRequestStatusChange}
          />
        ) : (
          <StatusBadge status={order.status} animate />
        )}
      </td>
      <td className="whitespace-nowrap px-4 py-3.5 font-outfit text-sm text-[var(--admin-text-muted)]">
        <time dateTime={order.createdAt || undefined}>{dateLabel}</time>
      </td>
      <td className="whitespace-nowrap px-2 py-3.5 text-right">
        <OrderOverflowMenu
          orderId={order.orderId}
          customerName={order.customerName}
          phoneNumber={order.phoneNumber}
          status={order.status}
          updating={updating}
          onViewDetails={onSelect}
          onRequestChange={onRequestStatusChange}
          onDeleteOrder={onDeleteOrder}
        />
      </td>
    </tr>
  );
}

type OrderMobileCardProps = {
  order: AdminOrderListItem;
  index?: number;
  className?: string;
  onSelect?: (orderId: string) => void;
  selected?: boolean;
  onRequestStatusChange?: (
    orderId: string,
    fromStatus: AdminOrderStatus,
    toStatus: AdminOrderStatus,
  ) => Promise<boolean>;
  updating?: boolean;
  onDeleteOrder?: (orderId: string) => Promise<boolean>;
};

function OrderMobileCardComponent({
  order,
  index = 0,
  className,
  onSelect,
  selected = false,
  onRequestStatusChange,
  updating = false,
  onDeleteOrder,
}: OrderMobileCardProps) {
  const delayMs = Math.min(index * 30, 180);
  const dateLabel = formatAdminDateTime(order.createdAt);
  const totalLabel = formatPKR(order.total);
  const interactive = typeof onSelect === "function";
  const canUpdateStatus = typeof onRequestStatusChange === "function";

  const handleActivate = useCallback(() => {
    if (!interactive || !order.orderId) {
      return;
    }
    onSelect?.(order.orderId);
  }, [interactive, onSelect, order.orderId]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (!interactive) {
        return;
      }
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleActivate();
      }
    },
    [interactive, handleActivate],
  );

  return (
    <article
      className={cn(
        "admin-table-row border-b border-[var(--admin-border)] px-4 py-4 last:border-b-0",
        "transition-[background-color,transform,opacity] duration-[180ms] ease-out",
        interactive &&
          "cursor-pointer hover:bg-[var(--admin-surface-hover)] active:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[var(--admin-focus-ring)]",
        selected && "bg-[var(--admin-surface-hover)]",
        className,
      )}
      style={{ animationDelay: `${delayMs}ms` }}
      aria-label={
        interactive
          ? `View details for order ${order.orderId}`
          : `Order ${order.orderId}`
      }
      onClick={interactive ? handleActivate : undefined}
      onKeyDown={interactive ? handleKeyDown : undefined}
      tabIndex={interactive ? 0 : undefined}
      role={interactive ? "button" : undefined}
      aria-pressed={interactive ? selected : undefined}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-outfit text-sm font-semibold tabular-nums text-[var(--admin-text)]">
            {order.orderId || "—"}
          </p>
          <p className="mt-1 truncate font-outfit text-sm text-[var(--admin-text)]">
            {order.customerName || "—"}
          </p>
        </div>
        <div className="flex shrink-0 items-start gap-1">
          {canUpdateStatus && onRequestStatusChange ? (
            <OrderPrimaryAction
              orderId={order.orderId}
              status={order.status}
              updating={updating}
              onRequestChange={onRequestStatusChange}
            />
          ) : (
            <StatusBadge status={order.status} animate />
          )}
          <OrderOverflowMenu
            orderId={order.orderId}
            customerName={order.customerName}
            phoneNumber={order.phoneNumber}
            status={order.status}
            updating={updating}
            onViewDetails={onSelect}
            onRequestChange={onRequestStatusChange}
            onDeleteOrder={onDeleteOrder}
          />
        </div>
      </div>

      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
        <div>
          <dt className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            Phone
          </dt>
          <dd className="mt-0.5 font-outfit text-sm tabular-nums text-[var(--admin-text-muted)]">
            {order.phoneNumber || "—"}
          </dd>
        </div>
        <div>
          <dt className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            City
          </dt>
          <dd className="mt-0.5 font-outfit text-sm text-[var(--admin-text-muted)]">
            {order.city || "—"}
          </dd>
        </div>
        <div>
          <dt className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            Product
          </dt>
          <dd className="mt-0.5 truncate font-outfit text-sm text-[var(--admin-text)]">
            {order.mangoName || "—"}
          </dd>
        </div>
        <div>
          <dt className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            Qty
          </dt>
          <dd className="mt-0.5 font-outfit text-sm tabular-nums text-[var(--admin-text)]">
            {order.quantity}
          </dd>
        </div>
        <div>
          <dt className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            Total
          </dt>
          <dd className="mt-0.5 font-outfit text-sm font-medium tabular-nums text-[var(--admin-text)]">
            {totalLabel}
          </dd>
        </div>
        <div>
          <dt className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            Ordered
          </dt>
          <dd className="mt-0.5 font-outfit text-sm text-[var(--admin-text-muted)]">
            <time dateTime={order.createdAt || undefined}>{dateLabel}</time>
          </dd>
        </div>
      </dl>
    </article>
  );
}

const OrderRow = memo(OrderRowComponent);
OrderRow.displayName = "OrderRow";

const OrderMobileCard = memo(OrderMobileCardComponent);
OrderMobileCard.displayName = "OrderMobileCard";

export default OrderRow;
export { OrderMobileCard };
export type { OrderRowProps, OrderMobileCardProps };
