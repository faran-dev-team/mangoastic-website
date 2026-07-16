"use client";

import { memo } from "react";
import StatusBadge from "@/components/admin/orders/StatusBadge";
import { formatAdminDateTime } from "@/lib/format/datetime";
import { formatPKR } from "@/lib/format/money";
import { cn } from "@/lib/cn";
import type { AdminCustomerDetail } from "@/lib/admin/types";

type CustomerDetailsContentProps = {
  customer: AdminCustomerDetail;
  className?: string;
};

/**
 * Customer profile + complete order history for the drawer.
 */
function CustomerDetailsContentComponent({
  customer,
  className,
}: CustomerDetailsContentProps) {
  const spendLabel = formatPKR(customer.lifetimeSpend);
  const lastOrderLabel = formatAdminDateTime(customer.lastOrderAt);

  return (
    <div className={cn("admin-order-detail-content space-y-4", className)}>
      <header
        className="admin-order-section rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] p-4 sm:p-5"
        style={{ animationDelay: "0ms" }}
      >
        <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
          Customer
        </p>
        <h2
          id="customer-details-title"
          className="mt-1 font-outfit text-lg font-semibold text-[var(--admin-text)]"
        >
          {customer.name || "—"}
        </h2>
        <p className="mt-1 font-outfit text-sm tabular-nums text-[var(--admin-text-muted)]">
          {customer.phoneNumber ? (
            <a
              href={`tel:${customer.phoneNumber}`}
              className="rounded-sm transition-colors duration-150 hover:text-[var(--admin-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
            >
              {customer.phoneNumber}
            </a>
          ) : (
            "—"
          )}
        </p>
        <p className="mt-0.5 font-outfit text-sm text-[var(--admin-text-muted)]">
          {customer.city || "—"}
        </p>
      </header>

      <section
        className="admin-order-section grid grid-cols-2 gap-3"
        style={{ animationDelay: "40ms" }}
        aria-label="Customer statistics"
      >
        <div className="rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] p-3.5">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            Total Orders
          </p>
          <p className="mt-1.5 font-outfit text-xl font-semibold tabular-nums text-[var(--admin-text)]">
            {customer.totalOrders}
          </p>
        </div>
        <div className="rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] p-3.5">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            Lifetime Spend
          </p>
          <p className="mt-1.5 font-outfit text-xl font-semibold tabular-nums text-[var(--admin-text)]">
            {spendLabel}
          </p>
        </div>
        <div className="rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] p-3.5">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            Last Order
          </p>
          <p className="mt-1.5 font-outfit text-sm text-[var(--admin-text)]">
            <time dateTime={customer.lastOrderAt || undefined}>
              {lastOrderLabel}
            </time>
          </p>
        </div>
        <div className="rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] p-3.5">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            Current Status
          </p>
          <div className="mt-1.5">
            {customer.activeOrderStatus ? (
              <StatusBadge status={customer.activeOrderStatus} animate />
            ) : (
              <span className="font-outfit text-sm text-[var(--admin-text-muted)]">
                No active order
              </span>
            )}
          </div>
          {customer.activeOrderId ? (
            <p className="mt-1 font-outfit text-xs tabular-nums text-[var(--admin-text-subtle)]">
              {customer.activeOrderId}
            </p>
          ) : null}
        </div>
      </section>

      <section
        className="admin-order-section rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] p-4 sm:p-5"
        style={{ animationDelay: "70ms" }}
        aria-labelledby="customer-orders-heading"
      >
        <h3
          id="customer-orders-heading"
          className="font-outfit text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]"
        >
          Order History
        </h3>
        <ul className="mt-3 divide-y divide-[var(--admin-border)]">
          {customer.orders.map((order) => (
            <li
              key={order.orderId}
              className="flex items-start justify-between gap-3 py-3 first:pt-0 last:pb-0"
            >
              <div className="min-w-0">
                <p className="font-outfit text-sm font-medium tabular-nums text-[var(--admin-text)]">
                  {order.orderId}
                </p>
                <p className="mt-0.5 truncate font-outfit text-xs text-[var(--admin-text-muted)]">
                  {order.mangoName} · Qty {order.quantity} · {order.city}
                </p>
                <p className="mt-0.5 font-outfit text-xs text-[var(--admin-text-subtle)]">
                  <time dateTime={order.createdAt || undefined}>
                    {formatAdminDateTime(order.createdAt)}
                  </time>
                </p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1.5">
                <StatusBadge status={order.status} />
                <span className="font-outfit text-xs font-medium tabular-nums text-[var(--admin-text)]">
                  {formatPKR(order.total)}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

const CustomerDetailsContent = memo(CustomerDetailsContentComponent);
CustomerDetailsContent.displayName = "CustomerDetailsContent";

export default CustomerDetailsContent;
export type { CustomerDetailsContentProps };
