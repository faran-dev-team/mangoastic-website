"use client";

import { memo } from "react";
import DetailField from "@/components/admin/orders/DetailField";
import OrderInfoSection from "@/components/admin/orders/OrderInfoSection";
import OrderOverflowMenu from "@/components/admin/orders/OrderOverflowMenu";
import OrderPrimaryAction from "@/components/admin/orders/OrderPrimaryAction";
import OrderTimeline from "@/components/admin/orders/OrderTimeline";
import StatusBadge from "@/components/admin/orders/StatusBadge";
import { formatAdminDateTime } from "@/lib/format/datetime";
import { formatPKR } from "@/lib/format/money";
import { cn } from "@/lib/cn";
import type { AdminOrderDetail, AdminOrderStatus } from "@/lib/admin/types";

type OrderDetailsContentProps = {
  order: AdminOrderDetail;
  className?: string;
  updating?: boolean;
  onRequestStatusChange?: (
    orderId: string,
    fromStatus: AdminOrderStatus,
    toStatus: AdminOrderStatus,
  ) => Promise<boolean>;
  onDeleteOrder?: (orderId: string) => Promise<boolean>;
};

function displayValue(value: string | null | undefined): string {
  if (value == null || value.trim().length === 0) {
    return "—";
  }
  return value;
}

/**
 * Order inspection body — grouped sections, timeline, and action controls.
 */
function OrderDetailsContentComponent({
  order,
  className,
  updating = false,
  onRequestStatusChange,
  onDeleteOrder,
}: OrderDetailsContentProps) {
  const createdLabel = formatAdminDateTime(order.createdAt);
  const updatedLabel = formatAdminDateTime(order.updatedAt);
  const totalLabel = formatPKR(order.pricing.total);
  const addonsLabel =
    order.product.addons.length > 0
      ? order.product.addons.join(", ")
      : "None";
  const canUpdateStatus = typeof onRequestStatusChange === "function";

  return (
    <div className={cn("admin-order-detail-content space-y-4", className)}>
      <header
        className="admin-order-section flex items-start justify-between gap-3"
        style={{ animationDelay: "0ms" }}
      >
        <div className="min-w-0">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
            Order ID
          </p>
          <h2
            id="order-details-title"
            className="mt-1 font-outfit text-lg font-semibold tabular-nums tracking-tight text-[var(--admin-text)]"
          >
            {order.orderId || "—"}
          </h2>
        </div>
        <div className="flex shrink-0 items-start gap-1">
          {canUpdateStatus && onRequestStatusChange ? (
            <OrderPrimaryAction
              orderId={order.orderId}
              status={order.status}
              size="md"
              updating={updating}
              onRequestChange={onRequestStatusChange}
            />
          ) : (
            <StatusBadge
              status={order.status}
              animate
              className="mt-1 shrink-0"
            />
          )}
          <OrderOverflowMenu
            orderId={order.orderId}
            customerName={order.customer.name}
            phoneNumber={order.customer.phone}
            status={order.status}
            updating={updating}
            onRequestChange={onRequestStatusChange}
            onDeleteOrder={onDeleteOrder}
            className="mt-1"
          />
        </div>
      </header>

      <OrderInfoSection title="Customer" delayMs={40}>
        <DetailField label="Name" value={displayValue(order.customer.name)} />
        <DetailField
          label="Phone Number"
          value={
            order.customer.phone ? (
              <a
                href={`tel:${order.customer.phone}`}
                className="rounded-sm tabular-nums text-[var(--admin-text)] transition-colors duration-200 hover:text-[var(--admin-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
              >
                {order.customer.phone}
              </a>
            ) : (
              "—"
            )
          }
        />
      </OrderInfoSection>

      <OrderInfoSection title="Delivery" delayMs={70}>
        <DetailField label="City" value={displayValue(order.delivery.city)} />
        <DetailField
          label="Landmark"
          value={displayValue(order.delivery.landmark)}
        />
        <DetailField
          label="Address"
          value={displayValue(order.delivery.address)}
          fullWidth
        />
        <DetailField
          label="Notes"
          value={displayValue(order.delivery.notes)}
          fullWidth
        />
      </OrderInfoSection>

      <OrderInfoSection title="Product" delayMs={100}>
        <DetailField label="Mango" value={displayValue(order.product.mango)} />
        <DetailField label="Box Size" value={displayValue(order.product.box)} />
        <DetailField
          label="Quantity"
          value={
            <span className="tabular-nums">{order.product.quantity}</span>
          }
        />
        <DetailField
          label="Ripeness"
          value={displayValue(order.product.ripeness)}
        />
        <DetailField label="Add-ons" value={addonsLabel} fullWidth />
      </OrderInfoSection>

      <OrderInfoSection title="Pricing & Dates" delayMs={130}>
        <DetailField
          label="Total"
          value={
            <span className="font-medium tabular-nums">{totalLabel}</span>
          }
        />
        <DetailField
          label="Status"
          value={<StatusBadge status={order.status} />}
        />
        <DetailField
          label="Created"
          value={
            <time dateTime={order.createdAt || undefined}>{createdLabel}</time>
          }
        />
        <DetailField
          label="Updated"
          value={
            <time dateTime={order.updatedAt || undefined}>{updatedLabel}</time>
          }
        />
      </OrderInfoSection>

      <OrderTimeline
        createdAt={order.createdAt}
        status={order.status}
        updatedAt={order.updatedAt}
      />
    </div>
  );
}

const OrderDetailsContent = memo(OrderDetailsContentComponent);
OrderDetailsContent.displayName = "OrderDetailsContent";

export default OrderDetailsContent;
export type { OrderDetailsContentProps };
