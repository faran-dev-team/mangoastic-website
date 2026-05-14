import Image from "next/image";
import Link from "next/link";

export default function WhyHero() {
  return (
    <section className="relative min-h-[58vh] overflow-hidden bg-black sm:min-h-[62vh] lg:min-h-[68vh]">
      <Image
        src="/images/why-hero.avif"
        alt="Fresh mangoes in orchard light"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.78)_10%,rgba(0,0,0,0.58)_45%,rgba(0,0,0,0.35)_100%)]" />

      <div className="relative mx-auto flex min-h-[58vh] max-w-6xl items-center px-6 py-16 sm:min-h-[62vh] lg:min-h-[68vh]">
        <div className="max-w-3xl">
          <p className="font-outfit text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
            Why Mangoastic
          </p>
          <h1 className="mt-3 font-sirelia text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            Six things that make a Mangoastic box different.
          </h1>
          <p className="mt-6 max-w-2xl font-outfit text-base leading-relaxed text-zinc-200 sm:text-lg">
            Some of these are about the fruit. Some are about everything around
            it.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 font-outfit text-sm font-semibold uppercase tracking-[0.1em] text-black transition hover:bg-amber-400"
            >
              Shop the season
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
