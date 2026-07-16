"use client";

import { Component, type ErrorInfo, type ReactNode } from "react";
import { logger } from "@/lib/admin/logger";

type AdminSectionErrorBoundaryProps = {
  children: ReactNode;
  title?: string;
  description?: string;
};

type AdminSectionErrorBoundaryState = {
  hasError: boolean;
};

/**
 * Isolates data-island failures so the admin shell stays usable.
 * Surfaces a calm recovery UI — never technical stack traces.
 */
export class AdminSectionErrorBoundary extends Component<
  AdminSectionErrorBoundaryProps,
  AdminSectionErrorBoundaryState
> {
  state: AdminSectionErrorBoundaryState = { hasError: false };

  static getDerivedStateFromError(): AdminSectionErrorBoundaryState {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo): void {
    logger.error("Admin section crashed", {
      message: error.message,
      componentStack: info.componentStack ?? undefined,
    });
  }

  private handleRetry = (): void => {
    this.setState({ hasError: false });
  };

  render(): ReactNode {
    if (!this.state.hasError) {
      return this.props.children;
    }

    const title = this.props.title ?? "Something went wrong";
    const description =
      this.props.description ??
      "This section could not be displayed. You can retry without leaving the page.";

    return (
      <div
        role="alert"
        className="rounded-[var(--admin-radius-lg)] border border-[rgba(239,68,68,0.35)] bg-[rgba(239,68,68,0.08)] px-5 py-6 sm:px-6"
      >
        <p className="font-outfit text-sm font-medium text-[var(--admin-text)]">
          {title}
        </p>
        <p className="mt-1.5 max-w-lg font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)]">
          {description}
        </p>
        <button
          type="button"
          onClick={this.handleRetry}
          className="admin-btn-press mt-4 inline-flex items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-4 py-2 font-outfit text-xs font-medium text-[var(--admin-text)] transition-[transform,border-color,background-color] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
        >
          Try again
        </button>
      </div>
    );
  }
}
