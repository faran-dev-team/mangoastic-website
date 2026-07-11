"use client";

import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function SeasonPassHero({
  onReservePass,
}: {
  onReservePass?: () => void;
}) {
  const heroRef = useRef<HTMLElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scale: 1.08,
        duration: 12,
        ease: "power2.out",
      });

      const hero = heroRef.current;
      if (!hero) return;

      const isTouch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);
      if (isTouch) return;

      let rafId: number | null = null;
      const pos = { x: 0, y: 0 };

      const handlePointerMove = (e: PointerEvent) => {
        pos.x = (e.clientX / window.innerWidth - 0.5) * 16;
        pos.y = (e.clientY / window.innerHeight - 0.5) * 16;
        if (rafId !== null) return;
        rafId = requestAnimationFrame(() => {
          gsap.to(imageRef.current, {
            x: pos.x,
            y: pos.y,
            duration: 1.2,
            ease: "power3.out",
          });
          rafId = null;
        });
      };

      hero.addEventListener("pointermove", handlePointerMove);
      return () => {
        hero.removeEventListener("pointermove", handlePointerMove);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[72vh] overflow-hidden bg-black sm:min-h-[78vh] lg:min-h-[82vh]"
    >
      <motion.div
        ref={imageRef}
        className="pointer-events-none absolute inset-0 scale-100 will-change-transform"
      >
        <Image
          src="/images/seasonpass.jpg"
          alt="Fresh mangoes sliced on a bamboo mat — Mangoastic season pass"
          fill
          priority
          className="object-cover object-center brightness-[0.62] saturate-[0.92]"
          sizes="100vw"
        />
      </motion.div>

      <div className="pointer-events-none absolute inset-0 bg-black/40" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-black/92 via-black/78 to-black/45" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/30" />

      <motion.div
        className="pointer-events-none absolute left-[-8%] top-[12%] h-[280px] w-[280px] rounded-full bg-mango/15 blur-3xl"
        animate={{ y: [0, -18, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto flex min-h-[72vh] max-w-6xl items-center px-4 py-20 sm:min-h-[78vh] sm:px-6 sm:py-24 lg:min-h-[82vh] lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-outfit text-[11px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs"
          >
            Season pass
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-sirelia text-[1.75rem] font-normal leading-[1.12] tracking-tight text-white sm:mt-5 sm:text-4xl md:text-[2.75rem] md:leading-[1.08] lg:text-5xl"
          >
            One box a week. The whole season.{" "}
            <span className="text-mango italic">Locked in.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl font-outfit text-[0.9375rem] leading-relaxed text-white sm:mt-6 sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed"
          >
            12 boxes. 12 weeks. One price. Delivered every Friday from your start
            date. Save 16% vs ordering one at a time. Never run out of Chaunsa.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-6 sm:mt-8">
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
          </motion.div>

          <motion.div variants={fadeUp} className="mt-8 sm:mt-10">
            <button
              type="button"
              onClick={() => onReservePass?.()}
              className="group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-mango px-8 py-4 font-outfit text-sm font-semibold text-black shadow-[0_0_40px_-10px_rgba(255,163,10,0.55)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_-8px_rgba(255,163,10,0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango"
            >
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <span className="relative z-10 flex items-center gap-2.5">
                Reserve My Pass
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  strokeWidth={2.5}
                />
              </span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent sm:h-40"
      />
    </section>
  );
}
