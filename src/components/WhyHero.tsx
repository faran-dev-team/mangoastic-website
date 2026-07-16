import Image from "next/image";
import Link from "next/link";

import FadeIn from "@/components/motion/FadeIn";

export default function WhyHero() {
  return (
    <section className="relative min-h-[58vh] overflow-hidden bg-black sm:min-h-[62vh] lg:min-h-[68vh]">
      <div className="absolute inset-0">
        <Image
          src="/images/why-hero.avif"
          alt="Fresh mangoes in orchard light"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.78)_10%,rgba(0,0,0,0.58)_45%,rgba(0,0,0,0.35)_100%)]" />

      <div
        className="pointer-events-none absolute -left-24 top-10 h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12),transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto flex min-h-[58vh] max-w-6xl items-center px-6 py-16 sm:min-h-[62vh] lg:min-h-[68vh]">
        <div className="max-w-3xl">
          <FadeIn>
            <p className="font-outfit text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
              Why Mangoastic
            </p>
          </FadeIn>

          <FadeIn delay={0.1} y={40}>
            <h1 className="mt-3 font-sirelia text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
              Six things that make a Mangoastic box different.
            </h1>
          </FadeIn>

          <FadeIn delay={0.18}>
            <p className="mt-6 max-w-2xl font-outfit text-base leading-relaxed text-zinc-200 sm:text-lg">
              Some of these are about the fruit. Some are about everything around
              it.
            </p>
          </FadeIn>

          <FadeIn delay={0.26} className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 font-outfit text-sm font-semibold uppercase tracking-[0.1em] text-black shadow-[0_18px_60px_-18px_rgba(251,191,36,0.7)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-amber-400 motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
            >
              Shop the season
            </Link>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
