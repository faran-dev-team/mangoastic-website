"use client";

/**
 * Root error boundary for unexpected client/server rendering failures.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      <h1 className="font-sirelia text-3xl text-zinc-900">Something went wrong</h1>
      <p className="mt-3 font-outfit text-sm leading-relaxed text-zinc-600">
        Please try again. If the problem continues, refresh the page.
      </p>
      {process.env.NODE_ENV !== "production" && error.message ? (
        <p className="mt-4 max-w-full truncate font-mono text-xs text-zinc-400">
          {error.message}
        </p>
      ) : null}
      <button
        type="button"
        onClick={reset}
        className="mt-8 rounded-full bg-zinc-900 px-5 py-2.5 font-outfit text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        Try again
      </button>
    </div>
  );
}
