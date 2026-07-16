"use client";

import {
  memo,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { cn } from "@/lib/cn";
import { formatPKR } from "@/lib/format/money";

export type CardStatColor =
  | "neutral"
  | "accent"
  | "info"
  | "success"
  | "warning"
  | "danger";

export type CardStatTrend = {
  direction: "up" | "down" | "flat";
  /** Human-readable delta, e.g. "+12%" — reserved for future phases. */
  label?: string;
};

export type CardStatProps = {
  title: string;
  value: number;
  icon: ReactNode;
  color?: CardStatColor;
  loading?: boolean;
  description?: string;
  /** Future-ready trend affordance — not rendered until a label is provided. */
  trend?: CardStatTrend;
  children?: ReactNode;
  className?: string;
  /** Stagger delay for entrance animation (ms). */
  animationDelayMs?: number;
  /** Animate from 0 → value once when true (first successful load). */
  animateCount?: boolean;
  /** Display format — currency uses PKR formatting. */
  valueFormat?: "count" | "currency";
};

const COLOR_STYLES: Record<
  CardStatColor,
  { iconWrap: string; value: string }
> = {
  neutral: {
    iconWrap:
      "bg-[var(--admin-surface-hover)] text-[var(--admin-text-muted)]",
    value: "text-[var(--admin-text)]",
  },
  accent: {
    iconWrap: "bg-[var(--admin-accent-soft)] text-[var(--admin-accent)]",
    value: "text-[var(--admin-text)]",
  },
  info: {
    iconWrap: "bg-[rgba(59,130,246,0.12)] text-[#60a5fa]",
    value: "text-[var(--admin-text)]",
  },
  success: {
    iconWrap: "bg-[rgba(34,197,94,0.12)] text-[#4ade80]",
    value: "text-[var(--admin-text)]",
  },
  warning: {
    iconWrap: "bg-[rgba(245,158,11,0.12)] text-[#fbbf24]",
    value: "text-[var(--admin-text)]",
  },
  danger: {
    iconWrap: "bg-[rgba(239,68,68,0.12)] text-[#f87171]",
    value: "text-[var(--admin-text)]",
  },
};

const COUNT_UP_DURATION_MS = 320;

function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

function formatCount(value: number): string {
  if (!Number.isFinite(value) || value < 0) {
    return "0";
  }
  return Math.floor(value).toLocaleString("en-US");
}

function formatDisplayValue(
  value: number,
  valueFormat: "count" | "currency",
): string {
  if (valueFormat === "currency") {
    const safe = Number.isFinite(value) && value >= 0 ? value : 0;
    return formatPKR(Math.round(safe));
  }
  return formatCount(value);
}

/**
 * Reusable dashboard statistic card.
 * Stable dimensions in loading / loaded states to prevent layout shift.
 */
function CardStatComponent({
  title,
  value,
  icon,
  color = "neutral",
  loading = false,
  description,
  trend,
  children,
  className,
  animationDelayMs = 0,
  animateCount = false,
  valueFormat = "count",
}: CardStatProps) {
  const safeValue =
    valueFormat === "currency"
      ? Number.isFinite(value) && value >= 0
        ? value
        : 0
      : Number.isFinite(value) && value >= 0
        ? Math.floor(value)
        : 0;
  const [displayValue, setDisplayValue] = useState(
    animateCount && !loading ? 0 : safeValue,
  );
  const hasCountedRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const palette = COLOR_STYLES[color];

  useEffect(() => {
    if (loading) {
      return;
    }

    if (
      !animateCount ||
      hasCountedRef.current ||
      prefersReducedMotion ||
      safeValue === 0
    ) {
      hasCountedRef.current = true;
      setDisplayValue(safeValue);
      return;
    }

    hasCountedRef.current = true;
    let frameId = 0;
    const start = performance.now();
    const target = safeValue;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / COUNT_UP_DURATION_MS);
      const next =
        valueFormat === "currency"
          ? easeOutCubic(progress) * target
          : Math.round(easeOutCubic(progress) * target);
      setDisplayValue(next);

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [animateCount, loading, prefersReducedMotion, safeValue, valueFormat]);

  // Keep display in sync after the one-shot count-up (e.g. future refetch).
  useEffect(() => {
    if (loading || animateCount) {
      return;
    }
    setDisplayValue(safeValue);
  }, [animateCount, loading, safeValue]);

  if (loading) {
    return (
      <article
        aria-busy="true"
        aria-label={`${title} loading`}
        className={cn(
          "admin-stat-card rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 sm:p-6",
          className,
        )}
        style={
          animationDelayMs
            ? { animationDelay: `${animationDelayMs}ms` }
            : undefined
        }
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1 space-y-3">
            <div className="admin-shimmer h-3 w-24 rounded-md" />
            <div className="admin-shimmer h-8 w-16 rounded-md" />
            <div className="admin-shimmer h-3 w-32 rounded-md" />
          </div>
          <div className="admin-shimmer h-10 w-10 shrink-0 rounded-[var(--admin-radius-md)]" />
        </div>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "admin-stat-card group rounded-[var(--admin-radius-lg)] border border-[var(--admin-border)] bg-[var(--admin-surface)] p-5 sm:p-6",
        "transition-[transform,border-color,opacity] duration-200 ease-out",
        "hover:-translate-y-0.5 hover:border-[var(--admin-border-strong)]",
        "focus-within:border-[var(--admin-border-strong)] focus-within:outline-none focus-within:ring-2 focus-within:ring-[var(--admin-focus-ring)]",
        "admin-card-enter",
        className,
      )}
      style={
        animationDelayMs
          ? { animationDelay: `${animationDelayMs}ms` }
          : undefined
      }
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="font-outfit text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--admin-text-muted)]">
            {title}
          </h3>
          <p
            className={cn(
              "mt-2 font-outfit font-semibold tracking-tight tabular-nums",
              valueFormat === "currency"
                ? "text-xl sm:text-2xl"
                : "text-3xl sm:text-[2rem]",
              palette.value,
            )}
            aria-live="polite"
          >
            {formatDisplayValue(displayValue, valueFormat)}
          </p>
          {description ? (
            <p className="mt-1.5 font-outfit text-xs leading-relaxed text-[var(--admin-text-subtle)]">
              {description}
            </p>
          ) : null}
          {trend?.label ? (
            <p
              className="mt-2 font-outfit text-xs text-[var(--admin-text-muted)]"
              data-trend={trend.direction}
            >
              {trend.label}
            </p>
          ) : null}
          {children}
        </div>
        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--admin-radius-md)]",
            "transition-transform duration-200 ease-out group-hover:scale-105",
            palette.iconWrap,
          )}
          aria-hidden="true"
        >
          {icon}
        </div>
      </div>
    </article>
  );
}

const CardStat = memo(CardStatComponent);
CardStat.displayName = "CardStat";

export default CardStat;
