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
import StatusBadge from "@/components/admin/orders/StatusBadge";
import { getConfirmDialogCopy } from "@/lib/admin/orderActions";
import { ORDER_STATUS_LABELS } from "@/lib/admin/orderStatus";
import { cn } from "@/lib/cn";
import type { AdminOrderStatus } from "@/lib/admin/types";

type ConfirmStatusDialogProps = {
  open: boolean;
  orderId: string;
  fromStatus: AdminOrderStatus;
  toStatus: AdminOrderStatus;
  confirming?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

/**
 * Confirmation dialog before applying a status transition.
 */
function ConfirmStatusDialogComponent({
  open,
  orderId,
  fromStatus,
  toStatus,
  confirming = false,
  onConfirm,
  onCancel,
}: ConfirmStatusDialogProps) {
  const titleId = useId();
  const descId = useId();
  const confirmRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const previouslyFocused = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  const copy = getConfirmDialogCopy(toStatus);
  const isCancel = toStatus === "CANCELLED";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) {
      setEntered(false);
      return;
    }
    const frame = window.requestAnimationFrame(() => setEntered(true));
    return () => window.cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    previouslyFocused.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => {
      confirmRef.current?.focus();
    }, 30);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      previouslyFocused.current?.focus?.();
    };
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !confirming) {
        event.preventDefault();
        event.stopPropagation();
        onCancel();
      }
    };

    document.addEventListener("keydown", handleKeyDown, true);
    return () => document.removeEventListener("keydown", handleKeyDown, true);
  }, [open, confirming, onCancel]);

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

      const focusable = panel.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
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
  }, [open]);

  const handleBackdropClick = useCallback(() => {
    if (!confirming) {
      onCancel();
    }
  }, [confirming, onCancel]);

  if (!mounted || !open) {
    return null;
  }

  const fromLabel = ORDER_STATUS_LABELS[fromStatus];
  const toLabel = ORDER_STATUS_LABELS[toStatus];

  return createPortal(
    <div className="fixed inset-0 z-[70]" role="presentation">
      <div
        className={cn(
          "absolute inset-0 bg-black/60 transition-opacity duration-200 ease-out",
          entered ? "opacity-100" : "opacity-0",
        )}
        onClick={handleBackdropClick}
        aria-hidden
      />

      <div className="absolute inset-0 flex items-end justify-center p-4 sm:items-center">
        <div
          ref={panelRef}
          role="alertdialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descId}
          className={cn(
            "w-full max-w-md rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 shadow-xl shadow-black/30 sm:p-6",
            "transition-[opacity,transform] duration-200 ease-out will-change-transform",
            entered
              ? "translate-y-0 scale-100 opacity-100"
              : "translate-y-3 scale-[0.98] opacity-0",
          )}
        >
          <h2
            id={titleId}
            className="font-outfit text-base font-semibold text-[var(--admin-text)]"
          >
            {copy.title}
          </h2>
          <p
            id={descId}
            className="mt-2 font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)]"
          >
            Order{" "}
            <span className="font-medium tabular-nums text-[var(--admin-text)]">
              {orderId}
            </span>{" "}
            will move from {fromLabel} to {toLabel}.
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">
            <StatusBadge status={fromStatus} />
            <span
              className="font-outfit text-xs text-[var(--admin-text-subtle)]"
              aria-hidden
            >
              →
            </span>
            <StatusBadge status={toStatus} animate />
          </div>

          <div className="mt-6 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              disabled={confirming}
              className="admin-btn-press inline-flex items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-4 py-2.5 font-outfit text-sm font-medium text-[var(--admin-text)] transition-[transform,border-color,background-color,opacity] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              Go back
            </button>
            <button
              ref={confirmRef}
              type="button"
              onClick={onConfirm}
              disabled={confirming}
              className={cn(
                "admin-btn-press inline-flex items-center justify-center rounded-[var(--admin-radius-md)] px-4 py-2.5 font-outfit text-sm font-semibold transition-[transform,opacity] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)] disabled:cursor-not-allowed disabled:opacity-70",
                isCancel
                  ? "border border-[rgba(239,68,68,0.45)] bg-[rgba(239,68,68,0.9)] text-white hover:brightness-105"
                  : "border border-[rgba(255,163,10,0.45)] bg-[var(--admin-accent)] text-zinc-950 hover:brightness-105",
              )}
            >
              {confirming ? "Updating…" : copy.confirmLabel}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
}

const ConfirmStatusDialog = memo(ConfirmStatusDialogComponent);
ConfirmStatusDialog.displayName = "ConfirmStatusDialog";

export default ConfirmStatusDialog;
export type { ConfirmStatusDialogProps };
