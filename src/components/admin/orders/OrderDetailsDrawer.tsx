"use client";

import {
  memo,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import OrderDetailsContent from "@/components/admin/orders/OrderDetailsContent";
import OrderDetailsSkeleton from "@/components/admin/orders/OrderDetailsSkeleton";
import { useAdminOrderDetail } from "@/hooks/useAdminOrderDetail";
import { cn } from "@/lib/cn";
import type { AdminOrderStatus } from "@/lib/admin/types";

type OrderDetailsDrawerProps = {
  orderId: string | null;
  open: boolean;
  onClose: () => void;
  onRequestStatusChange?: (
    orderId: string,
    fromStatus: AdminOrderStatus,
    toStatus: AdminOrderStatus,
  ) => Promise<boolean>;
  updatingOrderId?: string | null;
  onDeleteOrder?: (orderId: string) => Promise<boolean>;
  /** Registers the detail status patcher with the parent for optimistic sync. */
  onProvideStatusPatch?: (
    patch: ((status: AdminOrderStatus) => void) | null,
  ) => void;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/**
 * Right-side order inspection drawer (full-screen on mobile).
 * Supports status updates while preserving dashboard context.
 */
function OrderDetailsDrawerComponent({
  orderId,
  open,
  onClose,
  onRequestStatusChange,
  updatingOrderId = null,
  onDeleteOrder,
  onProvideStatusPatch,
}: OrderDetailsDrawerProps) {
  const titleId = useId();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  const {
    data,
    error,
    isLoading,
    isError,
    isNotFound,
    refetch,
    patchOrderStatus,
  } = useAdminOrderDetail(open ? orderId : null);

  useEffect(() => {
    if (!open) {
      onProvideStatusPatch?.(null);
      return;
    }
    onProvideStatusPatch?.(patchOrderStatus);
    return () => {
      onProvideStatusPatch?.(null);
    };
  }, [open, patchOrderStatus, onProvideStatusPatch]);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Enter animation after paint so transform transitions apply.
  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      setEntered(true);
    });

    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  // Focus management + body scroll lock.
  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const focusTimer = window.setTimeout(() => {
      closeButtonRef.current?.focus();
    }, 30);

    return () => {
      window.clearTimeout(focusTimer);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  // Escape closes.
  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  // Focus trap inside panel.
  useEffect(() => {
    if (!open) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      const focusable = panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) {
        return;
      }

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    panel.addEventListener("keydown", handleKeyDown);
    return () => panel.removeEventListener("keydown", handleKeyDown);
  }, [open, isLoading, isError, data]);

  const handleBackdropClick = useCallback(() => {
    onClose();
  }, [onClose]);

  if (!mounted || !open) {
    return null;
  }

  const drawer = (
    <div className="fixed inset-0 z-[60]" role="presentation">
      {/* Backdrop */}
      <div
        className={cn(
          "absolute inset-0 bg-black/55 transition-opacity duration-200 ease-out",
          entered ? "opacity-100" : "opacity-0",
        )}
        onClick={handleBackdropClick}
        aria-hidden
      />

      {/* Panel — full screen on mobile, right drawer on md+ */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className={cn(
          "absolute inset-y-0 right-0 flex w-full max-w-none flex-col",
          "bg-[var(--admin-surface)] shadow-xl shadow-black/30",
          "sm:max-w-[28rem] md:max-w-[32rem]",
          "transition-transform duration-200 ease-out will-change-transform",
          entered ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header bar */}
        <div className="flex h-14 shrink-0 items-center justify-between gap-3 border-b border-[var(--admin-border)] px-4 sm:px-5">
          <p
            id={titleId}
            className="font-outfit text-sm font-semibold text-[var(--admin-text)]"
          >
            Order details
          </p>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="admin-btn-press inline-flex h-9 w-9 items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] text-[var(--admin-text-muted)] transition-[transform,border-color,background-color,color] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] hover:text-[var(--admin-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
            aria-label="Close order details"
          >
            <X className="h-4 w-4" aria-hidden />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-5 sm:px-5">
          {isLoading ? <OrderDetailsSkeleton /> : null}

          {!isLoading && isNotFound ? (
            <div
              role="status"
              className="admin-order-detail-content flex flex-col items-start"
            >
              <p className="font-outfit text-base font-semibold text-[var(--admin-text)]">
                Order not found.
              </p>
              <p className="mt-2 max-w-sm font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)]">
                This order may have been removed or the link is no longer valid.
              </p>
              <button
                type="button"
                onClick={onClose}
                className="admin-btn-press mt-5 inline-flex items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-4 py-2.5 font-outfit text-sm font-medium text-[var(--admin-text)] transition-[transform,border-color,background-color] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
              >
                Return to Orders
              </button>
            </div>
          ) : null}

          {!isLoading && isError && !isNotFound ? (
            <div
              role="alert"
              className="admin-order-detail-content rounded-[var(--admin-radius-md)] border border-[rgba(239,68,68,0.35)] bg-[rgba(239,68,68,0.08)] px-4 py-5"
            >
              <p className="font-outfit text-sm font-medium text-[var(--admin-text)]">
                Unable to load order
              </p>
              <p className="mt-1.5 font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)]">
                {error || "Something went wrong. Please try again."}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={refetch}
                  className="admin-btn-press inline-flex items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-4 py-2 font-outfit text-xs font-medium text-[var(--admin-text)] transition-[transform,border-color,background-color] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
                >
                  Try again
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="admin-btn-press inline-flex items-center justify-center rounded-[var(--admin-radius-md)] px-4 py-2 font-outfit text-xs font-medium text-[var(--admin-text-muted)] transition-[transform,color] duration-200 hover:text-[var(--admin-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
                >
                  Return to Orders
                </button>
              </div>
            </div>
          ) : null}

          {!isLoading && !isError && data ? (
            <OrderDetailsContent
              order={data}
              updating={updatingOrderId === data.orderId}
              onRequestStatusChange={onRequestStatusChange}
              onDeleteOrder={onDeleteOrder}
            />
          ) : null}
        </div>
      </div>
    </div>
  );

  return createPortal(drawer, document.body);
}

const OrderDetailsDrawer = memo(OrderDetailsDrawerComponent);
OrderDetailsDrawer.displayName = "OrderDetailsDrawer";

export default OrderDetailsDrawer;
export type { OrderDetailsDrawerProps };
