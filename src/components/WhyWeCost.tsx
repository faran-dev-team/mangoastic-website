import Image from "next/image";
import Link from "next/link";

import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

export default function WhyWeCost() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-14 sm:px-6 sm:py-16 md:px-8 lg:py-24">
      <div
        className="pointer-events-none absolute left-[-10%] top-[10%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,163,10,0.12),transparent_70%)]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.12),transparent_70%)]"
        aria-hidden
      />

      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16">
        <FadeIn amount={0.2}>
          <div className="group relative aspect-[3/2] overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900 transition duration-500 hover:scale-[1.015] motion-reduce:transition-none motion-reduce:hover:scale-100 md:aspect-[12/10]">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

            <div className="h-full w-full transition duration-700 group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100">
              <Image
                src="/images/hero.jpg"
                alt="Mangoastic orchard — placeholder until orchard photography is added"
                fill
                className="object-cover"
                sizes="(max-width: 767px) 100vw, 50vw"
              />
            </div>

            <div className="absolute inset-0 rounded-[28px] border border-transparent transition-all duration-700 group-hover:border-mango/20" />

            <div className="absolute inset-0 opacity-[0.05] mix-blend-soft-light">
              <div
                className="h-full w-full bg-repeat"
                style={{
                  backgroundImage:
                    "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
                }}
              />
            </div>
          </div>
        </FadeIn>

        <Stagger
          className="flex min-w-0 flex-col"
          stagger={0.12}
          amount={0.2}
        >
          <StaggerItem>
            <div className="mb-5 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5">
              <span className="font-outfit text-[11px] uppercase tracking-[0.22em] text-zinc-300">
                Our Philosophy
              </span>
            </div>
          </StaggerItem>

          <StaggerItem>
            <h2 className="font-sirelia text-3xl font-normal leading-[1.05] tracking-tight text-mango sm:text-4xl md:text-5xl">
              Why We Cost
              <br />
              What We Cost
            </h2>
          </StaggerItem>

          <StaggerItem>
            <div className="mt-6 max-w-prose space-y-5 font-outfit text-[0.97rem] leading-[1.8] text-zinc-300 sm:max-w-none sm:text-base">
              <p>
                Most mango sellers buy at the mandi at 4 AM. The fruit has already
                changed hands three times. It&apos;s been sorted by speed, not
                taste. By the time it reaches a box, half of it shouldn&apos;t
                have been picked at all.
              </p>

              <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] px-5 py-4">
                <div className="absolute inset-y-0 left-0 w-[3px] bg-mango" />

                <p className="font-outfit text-lg font-medium leading-relaxed text-white sm:text-xl">
                  We grow our mangoes.
                </p>
              </div>

              <p>
                Every Chaunsa, every Anwar Ratol, every Sindhri in a Mangoastic
                box came off our trees, on the morning of dispatch, and was
                rejected by us — twice — before it ever met your name.
              </p>

              <p className="text-zinc-100">
                That&apos;s why our boxes cost what they cost. And that&apos;s why
                they taste like they do.
              </p>
            </div>
          </StaggerItem>

          <StaggerItem>
            <Link
              href="/orchard"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-transparent px-1 py-2 font-outfit text-sm font-semibold text-mango transition-all duration-300 hover:border-mango/20 hover:px-4 hover:bg-mango/5 sm:text-base"
            >
              <span>Visit the orchard</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </StaggerItem>
        </Stagger>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
