"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function ClosingCta() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
      {/* Ambient Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.08),transparent_55%)]" />

      <motion.div
        initial={{ opacity: 0, y: 45 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{
          duration: 0.9,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.03] px-6 py-14 text-center shadow-[0_30px_120px_-40px_rgba(0,0,0,0.9)] backdrop-blur-xl sm:px-10 sm:py-16"
      >
        {/* Floating Accent Blur */}
        <div className="absolute -left-16 top-0 h-40 w-40 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="absolute -right-10 bottom-0 h-36 w-36 rounded-full bg-amber-500/10 blur-3xl" />

        {/* Small Label */}
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.15,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative font-outfit text-xs font-semibold uppercase tracking-[0.24em] text-amber-400"
        >
          This Season
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.25,
            duration: 0.85,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-5 font-display text-3xl font-light leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          Now you know.
          <br className="hidden sm:block" />
          Now order one.
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.4,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mx-auto mt-6 max-w-2xl font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base"
        >
          If you want mangoes that taste of an orchard — not a warehouse — try a
          box this season.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.55,
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <motion.div
            whileHover={{
              y: -3,
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.25,
            }}
          >
            <Link
              href="/shop"
              className="inline-flex min-w-[220px] items-center justify-center rounded-full bg-amber-400 px-7 py-3.5 font-outfit text-sm font-semibold uppercase tracking-[0.12em] text-black shadow-[0_20px_60px_-18px_rgba(251,191,36,0.65)] transition hover:bg-amber-300"
            >
              Shop the Season
            </Link>
          </motion.div>

          <motion.div
            whileHover={{
              y: -3,
              scale: 1.02,
            }}
            whileTap={{ scale: 0.98 }}
            transition={{
              duration: 0.25,
            }}
          >
            <a
              href="https://wa.me/923000000000"
              className="inline-flex min-w-[220px] items-center justify-center rounded-full border border-white/10 bg-white/[0.03] px-7 py-3.5 font-outfit text-sm font-semibold uppercase tracking-[0.12em] text-zinc-100 transition hover:border-amber-400/50 hover:bg-white/[0.05]"
            >
              WhatsApp Us
            </a>
          </motion.div>
        </motion.div>

        {/* Bottom Accent Line */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            delay: 0.7,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-12 h-px w-32 origin-center bg-gradient-to-r from-transparent via-amber-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
