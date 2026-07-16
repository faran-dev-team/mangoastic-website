"use client";

import {
  memo,
  useCallback,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
  type MouseEvent as ReactMouseEvent,
  type SyntheticEvent,
} from "react";
import { createPortal } from "react-dom";
import { Copy, Eye, MoreVertical, Trash2, XCircle } from "lucide-react";
import ConfirmDeleteOrderDialog from "@/components/admin/orders/ConfirmDeleteOrderDialog";
import ConfirmStatusDialog from "@/components/admin/orders/ConfirmStatusDialog";
import { canCancelOrder } from "@/lib/admin/orderActions";
import { showAdminToast } from "@/lib/admin/toast";
import { cn } from "@/lib/cn";
import type { AdminOrderStatus } from "@/lib/admin/types";

type OrderOverflowMenuProps = {
  orderId: string;
  customerName: string;
  phoneNumber: string;
  status: AdminOrderStatus;
  disabled?: boolean;
  updating?: boolean;
  className?: string;
  onViewDetails?: (orderId: string) => void;
  onRequestChange?: (
    orderId: string,
    fromStatus: AdminOrderStatus,
    toStatus: AdminOrderStatus,
  ) => Promise<boolean>;
  onDeleteOrder?: (orderId: string) => Promise<boolean>;
};

type MenuPosition = {
  top?: number;
  bottom?: number;
  left: number;
};

const MENU_MIN_WIDTH_PX = 192;
const MENU_GAP_PX = 6;
const VIEWPORT_PADDING_PX = 8;

async function copyText(value: string): Promise<boolean> {
  const trimmed = value.trim();
  if (!trimmed) {
    return false;
  }
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(trimmed);
      return true;
    }
  } catch {
    // Fall through to legacy path.
  }

  try {
    const textarea = document.createElement("textarea");
    textarea.value = trimmed;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    document.body.removeChild(textarea);
    return ok;
  } catch {
    return false;
  }
}

function computeMenuPosition(
  triggerRect: DOMRect,
  menuHeight: number,
): MenuPosition {
  const spaceBelow = window.innerHeight - triggerRect.bottom - MENU_GAP_PX;
  const spaceAbove = triggerRect.top - MENU_GAP_PX;
  const openUp = spaceBelow < menuHeight && spaceAbove > spaceBelow;

  const left = Math.max(
    VIEWPORT_PADDING_PX,
    Math.min(
      triggerRect.right - MENU_MIN_WIDTH_PX,
      window.innerWidth - VIEWPORT_PADDING_PX - MENU_MIN_WIDTH_PX,
    ),
  );

  if (openUp) {
    return {
      bottom: window.innerHeight - triggerRect.top + MENU_GAP_PX,
      left,
    };
  }

  return {
    top: triggerRect.bottom + MENU_GAP_PX,
    left,
  };
}

/**
 * Secondary actions for uncommon operations — keeps the primary CTA clean.
 * Menu renders in a portal so it is not clipped by the orders table scroll area.
 */
function OrderOverflowMenuComponent({
  orderId,
  customerName,
  phoneNumber,
  status,
  disabled = false,
  updating = false,
  className,
  onViewDetails,
  onRequestChange,
  onDeleteOrder,
}: OrderOverflowMenuProps) {
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition | null>(null);
  const [cancelPending, setCancelPending] = useState(false);
  const [deletePending, setDeletePending] = useState(false);
  const [confirming, setConfirming] = useState(false);

  const allowCancel =
    typeof onRequestChange === "function" && canCancelOrder(status);
  const allowDelete = typeof onDeleteOrder === "function";
  const canOpen = !disabled && !updating;

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateMenuPosition = useCallback(() => {
    const trigger = triggerRef.current;
    const menu = menuRef.current;
    if (!trigger) {
      return;
    }

    const triggerRect = trigger.getBoundingClientRect();
    const menuHeight = menu?.offsetHeight ?? 240;
    setMenuPosition(computeMenuPosition(triggerRect, menuHeight));
  }, []);

  useLayoutEffect(() => {
    if (!open) {
      setMenuPosition(null);
      return;
    }

    updateMenuPosition();
    const frame = window.requestAnimationFrame(() => {
      updateMenuPosition();
    });

    const handleReposition = () => {
      updateMenuPosition();
    };

    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [open, allowCancel, allowDelete, onViewDetails, updateMenuPosition]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handlePointer = (event: globalThis.MouseEvent) => {
      const target = event.target as Node;
      if (
        rootRef.current?.contains(target) ||
        menuRef.current?.contains(target)
      ) {
        return;
      }
      setOpen(false);
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
      if (!canOpen) {
        return;
      }
      setOpen((prev) => !prev);
    },
    [canOpen],
  );

  const handleView = useCallback(
    (event: SyntheticEvent) => {
      event.stopPropagation();
      setOpen(false);
      onViewDetails?.(orderId);
    },
    [onViewDetails, orderId],
  );

  const handleCopyId = useCallback(
    async (event: SyntheticEvent) => {
      event.stopPropagation();
      setOpen(false);
      const ok = await copyText(orderId);
      showAdminToast({
        tone: ok ? "success" : "error",
        title: ok ? "Order ID copied" : "Copy failed",
        description: ok ? orderId : "Unable to copy to clipboard.",
        durationMs: 2200,
      });
    },
    [orderId],
  );

  const handleCopyPhone = useCallback(
    async (event: SyntheticEvent) => {
      event.stopPropagation();
      setOpen(false);
      const ok = await copyText(phoneNumber);
      showAdminToast({
        tone: ok ? "success" : "error",
        title: ok ? "Phone copied" : "Copy failed",
        description: ok
          ? phoneNumber
          : "Unable to copy phone number.",
        durationMs: 2200,
      });
    },
    [phoneNumber],
  );

  const handleCancelClick = useCallback(
    (event: SyntheticEvent) => {
      event.stopPropagation();
      setOpen(false);
      if (!allowCancel) {
        return;
      }
      setCancelPending(true);
    },
    [allowCancel],
  );

  const handleDeleteClick = useCallback(
    (event: SyntheticEvent) => {
      event.stopPropagation();
      setOpen(false);
      if (!allowDelete) {
        return;
      }
      setDeletePending(true);
    },
    [allowDelete],
  );

  const handleCancelConfirm = useCallback(async () => {
    if (!onRequestChange || confirming) {
      return;
    }
    setConfirming(true);
    try {
      const ok = await onRequestChange(orderId, status, "CANCELLED");
      if (ok) {
        setCancelPending(false);
      }
    } finally {
      setConfirming(false);
    }
  }, [onRequestChange, confirming, orderId, status]);

  const handleDeleteConfirm = useCallback(async () => {
    if (!onDeleteOrder || confirming) {
      return;
    }
    setConfirming(true);
    try {
      const ok = await onDeleteOrder(orderId);
      if (ok) {
        setDeletePending(false);
      }
    } finally {
      setConfirming(false);
    }
  }, [onDeleteOrder, confirming, orderId]);

  const handleDismissCancel = useCallback(() => {
    if (confirming) {
      return;
    }
    setCancelPending(false);
  }, [confirming]);

  const handleDismissDelete = useCallback(() => {
    if (confirming) {
      return;
    }
    setDeletePending(false);
  }, [confirming]);

  const menuPanel = open ? (
    <ul
      ref={menuRef}
      id={menuId}
      role="menu"
      aria-label={`Actions for order ${orderId}`}
      style={{
        position: "fixed",
        top: menuPosition?.top,
        bottom: menuPosition?.bottom,
        left: menuPosition?.left ?? -9999,
        minWidth: MENU_MIN_WIDTH_PX,
        zIndex: 80,
        visibility: menuPosition ? "visible" : "hidden",
      }}
        className={cn(
          "overflow-hidden rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] py-1 shadow-lg shadow-black/25",
          "admin-order-detail-content",
        )}
      >
        {onViewDetails ? (
          <li role="none">
            <button
              type="button"
              role="menuitem"
              onClick={handleView}
              className="flex w-full items-center gap-2 px-3 py-2 text-left font-outfit text-sm text-[var(--admin-text)] transition-colors duration-150 hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:bg-[var(--admin-surface-hover)]"
            >
              <Eye className="h-3.5 w-3.5 text-[var(--admin-text-subtle)]" aria-hidden />
              View Details
            </button>
          </li>
        ) : null}
        <li role="none">
          <button
            type="button"
            role="menuitem"
            onClick={(event) => {
              void handleCopyId(event);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left font-outfit text-sm text-[var(--admin-text)] transition-colors duration-150 hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:bg-[var(--admin-surface-hover)]"
          >
            <Copy className="h-3.5 w-3.5 text-[var(--admin-text-subtle)]" aria-hidden />
            Copy Order ID
          </button>
        </li>
        <li role="none">
          <button
            type="button"
            role="menuitem"
            onClick={(event) => {
              void handleCopyPhone(event);
            }}
            className="flex w-full items-center gap-2 px-3 py-2 text-left font-outfit text-sm text-[var(--admin-text)] transition-colors duration-150 hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:bg-[var(--admin-surface-hover)]"
          >
            <Copy className="h-3.5 w-3.5 text-[var(--admin-text-subtle)]" aria-hidden />
            Copy Phone Number
          </button>
        </li>
        {allowCancel ? (
          <li role="none">
            <button
              type="button"
              role="menuitem"
              onClick={handleCancelClick}
              className="flex w-full items-center gap-2 px-3 py-2 text-left font-outfit text-sm text-[#fca5a5] transition-colors duration-150 hover:bg-[rgba(239,68,68,0.1)] focus-visible:outline-none focus-visible:bg-[rgba(239,68,68,0.1)]"
            >
              <XCircle className="h-3.5 w-3.5" aria-hidden />
              Cancel Order
            </button>
          </li>
        ) : null}
        {allowDelete ? (
          <>
            <li role="separator" className="my-1 border-t border-[var(--admin-border)]" />
            <li role="none">
              <button
                type="button"
                role="menuitem"
                onClick={handleDeleteClick}
                className="flex w-full items-center gap-2 px-3 py-2 text-left font-outfit text-sm text-[#fca5a5] transition-colors duration-150 hover:bg-[rgba(239,68,68,0.1)] focus-visible:outline-none focus-visible:bg-[rgba(239,68,68,0.1)]"
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden />
                Delete Order
              </button>
            </li>
          </>
        ) : null}
      </ul>
    ) : null;

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
        disabled={!canOpen}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        aria-label={`More actions for order ${orderId}`}
        onClick={handleToggle}
        className={cn(
          "admin-btn-press inline-flex h-8 w-8 items-center justify-center rounded-[var(--admin-radius-md)]",
          "text-[var(--admin-text-subtle)] transition-[transform,color,background-color,opacity] duration-150",
          "hover:bg-[var(--admin-surface-hover)] hover:text-[var(--admin-text)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
        )}
      >
        <MoreVertical className="h-4 w-4" aria-hidden />
      </button>

      {mounted && menuPanel ? createPortal(menuPanel, document.body) : null}

      {cancelPending ? (
        <ConfirmStatusDialog
          open
          orderId={orderId}
          fromStatus={status}
          toStatus="CANCELLED"
          confirming={confirming}
          onConfirm={() => {
            void handleCancelConfirm();
          }}
          onCancel={handleDismissCancel}
        />
      ) : null}

      {deletePending ? (
        <ConfirmDeleteOrderDialog
          open
          orderId={orderId}
          customerName={customerName}
          status={status}
          confirming={confirming}
          onConfirm={() => {
            void handleDeleteConfirm();
          }}
          onCancel={handleDismissDelete}
        />
      ) : null}
    </div>
  );
}

const OrderOverflowMenu = memo(OrderOverflowMenuComponent);
OrderOverflowMenu.displayName = "OrderOverflowMenu";

export default OrderOverflowMenu;
export type { OrderOverflowMenuProps };
