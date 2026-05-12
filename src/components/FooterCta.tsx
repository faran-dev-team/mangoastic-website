import Link from "next/link";

export default function FooterCta() {
  return (
    <section className="bg-[#0f0e0c] px-4 py-16 sm:px-6 sm:py-20 md:py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-outfit text-[11px] font-semibold uppercase tracking-[0.28em] text-[#FDB022] sm:text-xs">
          100 days only
        </p>

        <h2 className="mt-5 font-sirelia text-3xl font-normal leading-tight tracking-tight text-white sm:mt-6 sm:text-4xl md:text-5xl md:leading-[1.1]">
          This season is 100 days.
        </h2>
        <p className="mt-2 font-sirelia text-3xl italic leading-tight text-[#FDB022] sm:text-4xl md:text-5xl md:leading-[1.1]">
          Don&apos;t miss it.
        </p>

        <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row sm:gap-5">
          <Link
            href="/shop"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full bg-[#FDB022] px-8 py-3.5 font-outfit text-xs font-bold uppercase tracking-[0.15em] text-black shadow-[0_0_28px_-4px_rgba(253,176,34,0.55)] transition hover:bg-[#ffc53d] hover:shadow-[0_0_36px_-2px_rgba(253,176,34,0.65)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FDB022] sm:text-sm"
          >
            Order now
          </Link>
          <Link
            href="/season-pass"
            className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/35 bg-transparent px-8 py-3.5 font-outfit text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/40 sm:text-base"
          >
            Reserve Your Season Pass
          </Link>
        </div>
      </div>
    </section>
  );
}
