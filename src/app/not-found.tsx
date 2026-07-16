import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found — Mangoastic",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-6 py-16 text-center">
      <p className="font-outfit text-xs font-semibold uppercase tracking-[0.2em] text-zinc-400">
        404
      </p>
      <h1 className="mt-3 font-sirelia text-3xl text-zinc-900">Page not found</h1>
      <p className="mt-3 font-outfit text-sm leading-relaxed text-zinc-600">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-zinc-900 px-5 py-2.5 font-outfit text-sm font-medium text-white transition hover:bg-zinc-800"
      >
        Back to home
      </Link>
    </div>
  );
}
