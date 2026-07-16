import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageContainerProps = {
  children: ReactNode;
  className?: string;
  /** Max content width. Default balances readability and dashboard density. */
  size?: "md" | "lg" | "xl" | "full";
};

const SIZE_CLASS: Record<NonNullable<PageContainerProps["size"]>, string> = {
  md: "max-w-3xl",
  lg: "max-w-5xl",
  xl: "max-w-7xl",
  full: "max-w-none",
};

/**
 * Standard page wrapper for admin content areas.
 * Provides consistent horizontal rhythm and optional max-width.
 */
export default function PageContainer({
  children,
  className,
  size = "xl",
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "admin-page-enter mx-auto w-full",
        SIZE_CLASS[size],
        className,
      )}
    >
      {children}
    </div>
  );
}
