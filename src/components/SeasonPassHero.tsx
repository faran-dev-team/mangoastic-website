import Image from "next/image";
import Link from "next/link";

export default function SeasonPassHero() {
  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-black sm:min-h-[78vh] lg:min-h-[82vh]">
      <Image
        src="/images/hero.png"
        alt="Ripe Chaunsa mango — Mangoastic season pass"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/92 via-black/78 to-black/50" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

      <div className="relative mx-auto flex min-h-[72vh] max-w-6xl items-center px-4 py-20 sm:min-h-[78vh] sm:px-6 sm:py-24 lg:min-h-[82vh] lg:px-8">
        <div className="max-w-2xl">
          <p className="font-outfit text-[11px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
            Season pass
          </p>

          <h1 className="mt-4 font-sirelia text-[1.75rem] font-normal leading-[1.12] tracking-tight text-white sm:mt-5 sm:text-4xl md:text-[2.75rem] md:leading-[1.08] lg:text-5xl">
            One box a week. The whole season.{" "}
            <span className="text-mango italic">Locked in.</span>
          </h1>

          <p className="mt-5 max-w-xl font-outfit text-[0.9375rem] leading-relaxed text-white sm:mt-6 sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed">
            12 boxes. 12 weeks. One price. Delivered every Friday from your start
            date. Save 16% vs ordering one at a time. Never run out of Chaunsa.
          </p>

          <div className="mt-6 sm:mt-8">
            <p className="font-sirelia text-4xl font-normal tracking-tight text-mango sm:text-5xl md:text-6xl lg:text-[3.5rem] lg:leading-none">
              PKR 34,500
            </p>
            <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-outfit text-sm text-zinc-300 sm:text-base">
              <span>Free delivery</span>
              <span className="text-zinc-600" aria-hidden>
                •
              </span>
              <span>Pause anytime</span>
            </p>
          </div>

          <div className="mt-8 sm:mt-10">
            <Link
              href="#reserve"
              className="inline-flex items-center justify-center rounded-full bg-mango px-8 py-3.5 font-outfit text-xs font-bold uppercase tracking-[0.12em] text-black shadow-[0_0_28px_-4px_rgba(255,163,10,0.45)] transition hover:bg-mango/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango sm:text-sm"
            >
              Reserve My Pass
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
