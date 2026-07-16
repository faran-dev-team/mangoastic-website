"use client";

import { memo, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type OrderInfoSectionProps = {
  title: string;
  children: ReactNode;
  className?: string;
  /** Stagger delay for section reveal (ms). */
  delayMs?: number;
};

/**
 * Grouped information card for order detail sections.
 */
function OrderInfoSectionComponent({
  title,
  children,
  className,
  delayMs = 0,
}: OrderInfoSectionProps) {
  return (
    <section
      className={cn(
        "admin-order-section rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] p-4 sm:p-5",
        className,
      )}
      style={delayMs > 0 ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      <h3 className="font-outfit text-xs font-semibold uppercase tracking-[0.14em] text-[var(--admin-text-subtle)]">
        {title}
      </h3>
      <dl className="mt-3.5 grid grid-cols-1 gap-x-6 gap-y-3.5 sm:grid-cols-2">
        {children}
      </dl>
    </section>
  );
}

const OrderInfoSection = memo(OrderInfoSectionComponent);
OrderInfoSection.displayName = "OrderInfoSection";

export default OrderInfoSection;
export type { OrderInfoSectionProps };
