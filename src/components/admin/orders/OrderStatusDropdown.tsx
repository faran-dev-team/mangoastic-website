"use client";

import {
  memo,
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type SyntheticEvent,
} from "react";
import { ChevronDown } from "lucide-react";
import ConfirmStatusDialog from "@/components/admin/orders/ConfirmStatusDialog";
import StatusBadge from "@/components/admin/orders/StatusBadge";
import {
  getAllowedNextOrderStatuses,
  isTerminalOrderStatus,
  ORDER_STATUS_LABELS,
} from "@/lib/admin/orderStatus";
import { cn } from "@/lib/cn";
import type { AdminOrderStatus } from "@/lib/admin/types";

type OrderStatusDropdownProps = {
  orderId: string;
  status: AdminOrderStatus;
  disabled?: boolean;
  updating?: boolean;
  /** Compact for table cells; comfortable for drawer. */
  size?: "sm" | "md";
  className?: string;
  onRequestChange: (
    orderId: string,
    fromStatus: AdminOrderStatus,
    toStatus: AdminOrderStatus,
  ) => Promise<boolean>;
};

/**
 * Reusable status control for table rows and the details drawer.
 * Shows only allowed next statuses; confirms before applying.
 */
function OrderStatusDropdownComponent({
  orderId,
  status,
  disabled = false,
  updating = false,
  size = "sm",
  className,
  onRequestChange,
}: OrderStatusDropdownProps) {
  const listboxId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [pendingTo, setPendingTo] = useState<AdminOrderStatus | null>(null);
  const [confirming, setConfirming] = useState(false);

  const nextStatuses = useMemo(
    () => getAllowedNextOrderStatuses(status),
    [status],
  );
  const isTerminal = isTerminalOrderStatus(status);
  const canChange =
    !disabled && !updating && !isTerminal && nextStatuses.length > 0;

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointer = (event: globalThis.MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handlePointer);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handlePointer);
      document.removeEventListener("keydown", handleKey);
    };
  }, [open]);

  const stopRowActivation = useCallback((event: SyntheticEvent) => {
    event.stopPropagation();
  }, []);

  const handleToggle = useCallback(
    (event: ReactMouseEvent | ReactKeyboardEvent) => {
      event.stopPropagation();
      if (!canChange) {
        return;
      }
      setOpen((prev) => !prev);
    },
    [canChange],
  );

  const handleSelect = useCallback(
    (next: AdminOrderStatus) => {
      setOpen(false);
      setPendingTo(next);
    },
    [],
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

  return (
    <div
      ref={rootRef}
      className={cn("relative inline-flex", className)}
      onClick={stopRowActivation}
      onKeyDown={stopRowActivation}
    >
      <button
        ref={triggerRef}
        type="button"
        disabled={!canChange}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listboxId : undefined}
        aria-label={`Change status for order ${orderId}. Current status: ${ORDER_STATUS_LABELS[status]}`}
        onClick={handleToggle}
        className={cn(
          "admin-btn-press group inline-flex items-center gap-1 rounded-md transition-[transform,opacity] duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]",
          canChange
            ? "cursor-pointer hover:opacity-95"
            : "cursor-default opacity-100",
          updating && "opacity-70",
        )}
      >
        <StatusBadge
          status={status}
          animate
          className={cn(size === "md" && "px-2.5 py-1 text-xs")}
        />
        {canChange ? (
          <ChevronDown
            className={cn(
              "h-3.5 w-3.5 text-[var(--admin-text-subtle)] transition-transform duration-200",
              open && "rotate-180",
            )}
            aria-hidden
          />
        ) : null}
      </button>

      {open && canChange ? (
        <ul
          id={listboxId}
          role="listbox"
          aria-label="Next order status"
          className={cn(
            "absolute left-0 top-full z-30 mt-1.5 min-w-[10.5rem] overflow-hidden rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] py-1 shadow-lg shadow-black/25",
            "admin-order-detail-content",
          )}
        >
          {nextStatuses.map((next) => (
            <li key={next} role="option" aria-selected={false}>
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleSelect(next);
                }}
                className="flex w-full items-center px-2.5 py-2 text-left transition-colors duration-150 hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:bg-[var(--admin-surface-hover)]"
              >
                <StatusBadge status={next} />
              </button>
            </li>
          ))}
        </ul>
      ) : null}

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

const OrderStatusDropdown = memo(OrderStatusDropdownComponent);
OrderStatusDropdown.displayName = "OrderStatusDropdown";

export default OrderStatusDropdown;
export type { OrderStatusDropdownProps };
