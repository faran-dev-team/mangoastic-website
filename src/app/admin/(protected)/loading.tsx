/**
 * Instant route-transition placeholder for protected admin pages.
 * Matches existing session-check visual language — no layout shift.
 */
export default function AdminProtectedLoading() {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-3">
        <span
          className="h-8 w-8 animate-spin rounded-full border-2 border-[var(--admin-accent)]/30 border-t-[var(--admin-accent)]"
          aria-hidden
        />
        <p className="font-outfit text-sm text-[var(--admin-text-muted)]">
          Loading…
        </p>
      </div>
    </div>
  );
}
