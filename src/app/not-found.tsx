import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center bg-black px-4 py-20 text-center text-white">
      <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
        404
      </p>
      <h1 className="mt-4 max-w-md font-sirelia text-3xl leading-tight sm:text-4xl">
        This page is out of season.
      </h1>
      <p className="mt-3 font-outfit text-sm text-zinc-400 sm:text-base">
        Try one of these instead:
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/shop"
          className="inline-flex rounded-full bg-mango px-7 py-3 font-outfit text-sm font-semibold text-black transition hover:bg-mango/90"
        >
          Shop
        </Link>
        <Link
          href="/orchard"
          className="inline-flex rounded-full border border-white/35 px-7 py-3 font-outfit text-sm font-semibold text-white transition hover:border-mango/50 hover:text-mango"
        >
          Orchard
        </Link>
        <Link
          href="/faq"
          className="inline-flex rounded-full border border-white/35 px-7 py-3 font-outfit text-sm font-semibold text-white transition hover:border-mango/50 hover:text-mango"
        >
          FAQ
        </Link>
      </div>
    </div>
  );
}
