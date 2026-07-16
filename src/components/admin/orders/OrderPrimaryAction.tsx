"use client";

import {
  memo,
  useCallback,
  useState,
  type SyntheticEvent,
} from "react";
import { Check, Package, Truck } from "lucide-react";
import ConfirmStatusDialog from "@/components/admin/orders/ConfirmStatusDialog";
import StatusBadge from "@/components/admin/orders/StatusBadge";
import {
  getPrimaryOrderAction,
  type OrderPrimaryAction,
} from "@/lib/admin/orderActions";
import { cn } from "@/lib/cn";
import type { AdminOrderStatus } from "@/lib/admin/types";

type OrderPrimaryActionProps = {
  orderId: string;
  status: AdminOrderStatus;
  disabled?: boolean;
  updating?: boolean;
  /** Compact for table; comfortable for drawer. */
  size?: "sm" | "md";
  className?: string;
  onRequestChange: (
    orderId: string,
    fromStatus: AdminOrderStatus,
    toStatus: AdminOrderStatus,
  ) => Promise<boolean>;
};

function ActionIcon({
  icon,
  className,
}: {
  icon: OrderPrimaryAction["icon"];
  className?: string;
}) {
  if (icon === "confirm") {
    return <Check className={className} strokeWidth={2.25} aria-hidden />;
  }
  if (icon === "pack") {
    return <Package className={className} strokeWidth={2} aria-hidden />;
  }
  return <Truck className={className} strokeWidth={2} aria-hidden />;
}

/**
 * Action-based primary CTA for the order lifecycle.
 * Replaces the generic status dropdown — always suggests the next step.
 */
function OrderPrimaryActionComponent({
  orderId,
  status,
  disabled = false,
  updating = false,
  size = "sm",
  className,
  onRequestChange,
}: OrderPrimaryActionProps) {
  const [pendingTo, setPendingTo] = useState<AdminOrderStatus | null>(null);
  const [confirming, setConfirming] = useState(false);

  const action = getPrimaryOrderAction(status);
  const canAct = Boolean(action) && !disabled && !updating;

  const stopRowActivation = useCallback((event: SyntheticEvent) => {
    event.stopPropagation();
  }, []);

  const handleClick = useCallback(
    (event: SyntheticEvent) => {
      event.stopPropagation();
      if (!action || !canAct) {
        return;
      }
      setPendingTo(action.nextStatus);
    },
    [action, canAct],
  );

  const handleCancelConfirm = useCallback(() => {
    if (confirming) {
      return;
    }
    setPendingTo(null);
  }, [confirming]);

  const handleConfirm = useCallback(async () => {
    if (!pendingTo || confirming) {
      return;
    }

    setConfirming(true);
    try {
      const ok = await onRequestChange(orderId, status, pendingTo);
      if (ok) {
        setPendingTo(null);
      }
    } finally {
      setConfirming(false);
    }
  }, [pendingTo, confirming, onRequestChange, orderId, status]);

  // Terminal / no primary action — read-only status.
  if (!action) {
    return (
      <div
        className={cn("inline-flex items-center gap-2", className)}
        onClick={stopRowActivation}
        onKeyDown={stopRowActivation}
      >
        <StatusBadge status={status} animate />
        {status === "DELIVERED" ? (
          <span className="font-outfit text-xs font-medium text-[#86efac]">
            Delivered
          </span>
        ) : status === "CANCELLED" ? (
          <span className="font-outfit text-xs font-medium text-[var(--admin-text-subtle)]">
            Cancelled
          </span>
        ) : null}
      </div>
    );
  }

  return (
    <div
      className={cn("inline-flex flex-col items-start gap-1.5", className)}
      onClick={stopRowActivation}
      onKeyDown={stopRowActivation}
    >
      <StatusBadge
        status={status}
        animate
        className={cn(size === "md" && "px-2.5 py-1 text-xs")}
      />
      <button
        type="button"
        disabled={!canAct}
        aria-label={`${action.label} for order ${orderId}`}
        onClick={handleClick}
        className={cn(
          "admin-btn-press inline-flex items-center gap-1.5 rounded-[var(--admin-radius-md)] font-outfit font-semibold",
          "border border-[rgba(255,163,10,0.4)] bg-[var(--admin-accent)] text-zinc-950",
          "transition-[transform,opacity,filter] duration-150 ease-out",
          "hover:brightness-105 active:scale-[0.97]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]",
          "disabled:cursor-not-allowed disabled:opacity-60",
          size === "sm"
            ? "px-2.5 py-1.5 text-[11px]"
            : "px-3.5 py-2 text-sm",
          updating && "opacity-70",
        )}
      >
        <ActionIcon
          icon={action.icon}
          className={size === "sm" ? "h-3.5 w-3.5" : "h-4 w-4"}
        />
        <span className="hidden sm:inline">{action.label}</span>
        <span className="sm:hidden">{action.shortLabel}</span>
      </button>

      {pendingTo ? (
        <ConfirmStatusDialog
          open
          orderId={orderId}
          fromStatus={status}
          toStatus={pendingTo}
          confirming={confirming}
          onConfirm={() => {
            void handleConfirm();
          }}
          onCancel={handleCancelConfirm}
        />
      ) : null}
    </div>
  );
}

const OrderPrimaryActionControl = memo(OrderPrimaryActionComponent);
OrderPrimaryActionControl.displayName = "OrderPrimaryAction";

export default OrderPrimaryActionControl;
export type { OrderPrimaryActionProps };
