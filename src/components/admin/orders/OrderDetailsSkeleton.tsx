"use client";

import { memo } from "react";
import { cn } from "@/lib/cn";

type OrderDetailsSkeletonProps = {
  className?: string;
};

function SkeletonBlock({ className }: { className?: string }) {
  return (
    <div
      className={cn("admin-shimmer rounded-[var(--admin-radius-md)]", className)}
      aria-hidden
    />
  );
}

/**
 * Fixed-layout skeleton for the order details drawer.
 * Matches final content geometry to avoid layout shift.
 */
function OrderDetailsSkeletonComponent({ className }: OrderDetailsSkeletonProps) {
  return (
    <div
      className={cn("space-y-4", className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Loading order details"
    >
      <span className="sr-only">Loading order details…</span>

      {/* Header strip */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1 space-y-2">
          <SkeletonBlock className="h-5 w-36" />
          <SkeletonBlock className="h-3.5 w-24" />
        </div>
        <SkeletonBlock className="h-6 w-20 shrink-0 rounded-md" />
      </div>

      {/* Sections */}
      {[0, 1, 2, 3].map((section) => (
        <div
          key={section}
          className="rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] p-4 sm:p-5"
        >
          <SkeletonBlock className="h-3 w-20" />
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <SkeletonBlock className="h-2.5 w-14" />
              <SkeletonBlock className="h-4 w-full max-w-[10rem]" />
            </div>
            <div className="space-y-2">
              <SkeletonBlock className="h-2.5 w-16" />
              <SkeletonBlock className="h-4 w-full max-w-[9rem]" />
            </div>
            {section === 1 ? (
              <>
                <div className="space-y-2 sm:col-span-2">
                  <SkeletonBlock className="h-2.5 w-14" />
                  <SkeletonBlock className="h-4 w-full" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <SkeletonBlock className="h-2.5 w-12" />
                  <SkeletonBlock className="h-10 w-full" />
                </div>
              </>
            ) : null}
          </div>
        </div>
      ))}

      {/* Timeline skeleton */}
      <div className="rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] p-4 sm:p-5">
        <SkeletonBlock className="h-3 w-16" />
        <div className="mt-4 space-y-5">
          {[0, 1].map((row) => (
            <div key={row} className="flex gap-3.5">
              <SkeletonBlock className="mt-1 h-3.5 w-3.5 shrink-0 rounded-full" />
              <div className="flex-1 space-y-2">
                <SkeletonBlock className="h-4 w-32" />
                <SkeletonBlock className="h-3 w-40" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const OrderDetailsSkeleton = memo(OrderDetailsSkeletonComponent);
OrderDetailsSkeleton.displayName = "OrderDetailsSkeleton";

export default OrderDetailsSkeleton;
export type { OrderDetailsSkeletonProps };
