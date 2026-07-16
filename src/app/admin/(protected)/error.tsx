"use client";

/**
 * Protected-route error boundary (App Router).
 * Calm recovery UI — never exposes stack traces or internal details.
 */
export default function AdminProtectedError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] items-center justify-center px-4">
      <div
        role="alert"
        className="w-full max-w-md rounded-[var(--admin-radius-lg)] border border-[rgba(239,68,68,0.35)] bg-[rgba(239,68,68,0.08)] px-5 py-6 sm:px-6"
      >
        <p className="font-outfit text-sm font-medium text-[var(--admin-text)]">
          Something went wrong
        </p>
        <p className="mt-1.5 font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)]">
          This page could not be loaded. Please try again. If the problem
          continues, sign out and sign back in.
        </p>
        <button
          type="button"
          onClick={reset}
          className="admin-btn-press mt-4 inline-flex items-center justify-center rounded-[var(--admin-radius-md)] border border-[var(--admin-border)] bg-[var(--admin-surface-elevated)] px-4 py-2 font-outfit text-xs font-medium text-[var(--admin-text)] transition-[transform,border-color,background-color] duration-200 hover:border-[var(--admin-border-strong)] hover:bg-[var(--admin-surface-hover)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--admin-focus-ring)]"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
