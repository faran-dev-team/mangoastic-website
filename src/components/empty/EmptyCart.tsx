import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="rounded-2xl border border-zinc-800/90 bg-zinc-950/40 px-6 py-14 text-center sm:py-16">
      <p className="font-sirelia text-2xl text-white sm:text-3xl">
        No mangoes yet.
      </p>
      <p className="mt-2 font-outfit text-sm text-zinc-400">
        Let&apos;s fix that.
      </p>
      <Link
        href="/shop"
        className="mt-8 inline-flex items-center justify-center rounded-full bg-mango px-8 py-3.5 font-outfit text-sm font-semibold text-black transition hover:bg-mango/90"
      >
        Browse Boxes
      </Link>
    </div>
  );
}
