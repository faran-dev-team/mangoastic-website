import Link from "next/link";

import FadeIn from "@/components/motion/FadeIn";
import { WHATSAPP_HREF } from "@/data/contact";

export default function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12),transparent_70%)]"
        aria-hidden
      />

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.08),transparent_55%)]" />

      <FadeIn
        y={45}
        amount={0.35}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.4rem] border border-white/10 bg-zinc-950/90 px-6 py-14 text-center shadow-[0_30px_120px_-40px_rgba(0,0,0,0.9)] sm:px-10 sm:py-16"
      >
        <div
          className="pointer-events-none absolute -left-16 top-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(251,191,36,0.12),transparent_70%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute -right-10 bottom-0 h-36 w-36 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12),transparent_70%)]"
          aria-hidden
        />

        <FadeIn delay={0.1}>
          <p className="relative font-outfit text-xs font-semibold uppercase tracking-[0.24em] text-amber-400">
            This Season
          </p>
        </FadeIn>

        <FadeIn delay={0.18} y={28}>
          <h2 className="relative mt-5 font-display text-3xl font-light leading-tight text-white sm:text-4xl lg:text-5xl">
            Now you know.
            <br className="hidden sm:block" />
            Now order one.
          </h2>
        </FadeIn>

        <FadeIn delay={0.26}>
          <p className="relative mx-auto mt-6 max-w-2xl font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base">
            If you want mangoes that taste of an orchard — not a warehouse — try a
            box this season.
          </p>
        </FadeIn>

        <FadeIn
          delay={0.34}
          className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/shop"
            className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-amber-400 px-7 py-3.5 font-outfit text-sm font-semibold uppercase tracking-[0.12em] text-black shadow-[0_20px_60px_-18px_rgba(251,191,36,0.65)] transition duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
          >
            Shop the Season
          </Link>

          <a
            href={WHATSAPP_HREF}
            className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 font-outfit text-sm font-semibold uppercase tracking-[0.12em] text-zinc-100 transition duration-300 hover:-translate-y-0.5 hover:border-amber-400/50 hover:bg-white/[0.05] hover:scale-[1.02] motion-reduce:transition-none motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100"
          >
            WhatsApp Us
          </a>
        </FadeIn>

        <div className="mx-auto mt-12 h-px w-32 bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
      </FadeIn>
    </section>
  );
}
