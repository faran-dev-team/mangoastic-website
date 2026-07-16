"use client";

import { memo, useEffect, useState } from "react";
import { CheckCircle2, X, XCircle } from "lucide-react";
import {
  subscribeAdminToast,
  type AdminToastPayload,
} from "@/lib/admin/toast";
import { cn } from "@/lib/cn";

/**
 * Fixed toast host for admin success / error feedback.
 * Mount once in the protected admin shell.
 */
function AdminToastHostComponent() {
  const [toast, setToast] = useState<AdminToastPayload | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    return subscribeAdminToast((payload) => {
      setToast(payload);
      setVisible(true);
    });
  }, []);

  useEffect(() => {
    if (!toast || !visible) {
      return;
    }

    const hideTimer = window.setTimeout(() => {
      setVisible(false);
    }, toast.durationMs);

    const clearTimer = window.setTimeout(() => {
      setToast(null);
    }, toast.durationMs + 220);

    return () => {
      window.clearTimeout(hideTimer);
      window.clearTimeout(clearTimer);
    };
  }, [toast, visible]);

  if (!toast) {
    return null;
  }

  const isSuccess = toast.tone === "success";

  const dismiss = () => {
    setVisible(false);
    window.setTimeout(() => setToast(null), 200);
  };

  return (
    <div
      role={isSuccess ? "status" : "alert"}
      aria-live={isSuccess ? "polite" : "assertive"}
      className={cn(
        "pointer-events-auto fixed bottom-6 left-4 right-4 z-[80] mx-auto flex max-w-sm items-start gap-3 rounded-[var(--admin-radius-lg)] border px-4 py-3.5 sm:left-auto sm:right-6",
        "transition-[opacity,transform] duration-[180ms] ease-out will-change-transform",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-2 scale-[0.98] opacity-0",
        isSuccess
          ? "border-[rgba(34,197,94,0.35)] bg-[rgba(20,28,24,0.96)]"
          : "border-[rgba(239,68,68,0.35)] bg-[rgba(28,18,18,0.96)]",
      )}
    >
      <span
        className={cn(
          "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
          isSuccess
            ? "bg-[rgba(34,197,94,0.14)] text-[#86efac]"
            : "bg-[rgba(239,68,68,0.14)] text-[#fca5a5]",
        )}
        aria-hidden
      >
        {isSuccess ? (
          <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
        ) : (
          <XCircle className="h-4 w-4" strokeWidth={2} />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="font-outfit text-sm font-semibold text-[var(--admin-text)]">
          {toast.title}
        </p>
        {toast.description ? (
          <p className="mt-0.5 font-outfit text-xs leading-relaxed text-[var(--admin-text-muted)]">
            {toast.description}
          </p>
        ) : null}
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss notification"
        className="admin-btn-press mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-[var(--admin-text-subtle)] transition-[transform,color,background-color] duration-150 hover:bg-[var(--admin-surface-hover)] hover:text-[var(--admin-text)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
      >
        <X className="h-3.5 w-3.5" aria-hidden />
      </button>
    </div>
  );
}

const AdminToastHost = memo(AdminToastHostComponent);
AdminToastHost.displayName = "AdminToastHost";

export default AdminToastHost;
