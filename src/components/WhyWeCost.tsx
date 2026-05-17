"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.16,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: "easeOut",
    },
  },
};

export default function WhyWeCost() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-14 sm:px-6 sm:py-16 md:px-8 lg:py-24">
      {/* Ambient Glow */}
      <div className="absolute left-[-10%] top-[10%] h-[320px] w-[320px] rounded-full bg-mango/10 blur-3xl" />

      <div className="absolute bottom-[-20%] right-[-10%] h-[360px] w-[360px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Top Divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 md:grid-cols-2 lg:gap-16"
      >
        {/* Image Section */}
        <motion.div
          variants={fadeUp}
          whileHover={{
            scale: 1.015,
          }}
          transition={{
            duration: 0.6,
            ease: "easeOut",
          }}
          className="group relative aspect-[3/2] overflow-hidden rounded-[28px] border border-white/10 bg-zinc-900 md:aspect-[12/10]"
        >
          {/* Cinematic Overlay */}
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

          {/* Image */}
          <motion.div
            whileHover={{
              scale: 1.06,
            }}
            transition={{
              duration: 1.2,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="h-full w-full"
          >
            <Image
              src="/images/hero.png"
              alt="Mangoastic orchard — placeholder until orchard photography is added"
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 50vw"
            />
          </motion.div>

          {/* Glow Border */}
          <div className="absolute inset-0 rounded-[28px] border border-transparent transition-all duration-700 group-hover:border-mango/20" />

          {/* Grain Texture */}
          <div className="absolute inset-0 opacity-[0.05] mix-blend-soft-light">
            <div
              className="h-full w-full bg-repeat"
              style={{
                backgroundImage:
                  "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
              }}
            />
          </div>
        </motion.div>

        {/* Content Section */}
        <motion.div
          variants={containerVariants}
          className="flex min-w-0 flex-col"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex w-fit items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-xl"
          >
            <span className="font-outfit text-[11px] uppercase tracking-[0.22em] text-zinc-300">
              Our Philosophy
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h2
            variants={fadeUp}
            className="font-sirelia text-3xl font-normal leading-[1.05] tracking-tight text-mango sm:text-4xl md:text-5xl"
          >
            Why We Cost
            <br />
            What We Cost
          </motion.h2>

          {/* Content */}
          <div className="mt-6 max-w-prose space-y-5 font-outfit text-[0.97rem] leading-[1.8] text-zinc-300 sm:max-w-none sm:text-base">
            <motion.p variants={fadeUp}>
              Most mango sellers buy at the mandi at 4 AM. The fruit has already
              changed hands three times. It&apos;s been sorted by speed, not
              taste. By the time it reaches a box, half of it shouldn&apos;t
              have been picked at all.
            </motion.p>

            {/* Highlight Statement */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 backdrop-blur-xl"
            >
              <div className="absolute inset-y-0 left-0 w-[3px] bg-mango" />

              <p className="font-outfit text-lg font-medium leading-relaxed text-white sm:text-xl">
                We grow our mangoes.
              </p>
            </motion.div>

            <motion.p variants={fadeUp}>
              Every Chaunsa, every Anwar Ratol, every Sindhri in a Mangoastic
              box came off our trees, on the morning of dispatch, and was
              rejected by us — twice — before it ever met your name.
            </motion.p>

            <motion.p variants={fadeUp} className="text-zinc-100">
              That&apos;s why our boxes cost what they cost. And that&apos;s why
              they taste like they do.
            </motion.p>
          </div>

          {/* CTA */}
          <motion.div variants={fadeUp}>
            <Link
              href="/orchard"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-transparent px-1 py-2 font-outfit text-sm font-semibold text-mango transition-all duration-300 hover:border-mango/20 hover:px-4 hover:bg-mango/5 sm:text-base"
            >
              <span>Visit the orchard</span>

              <span className="transition-transform duration-300 group-hover:translate-x-1.5">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
