"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, type Variants } from "framer-motion";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(10px)",
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      delay,
      ease: smoothEase,
    },
  }),
};

export default function WhyHero() {
  return (
    <section className="relative min-h-[58vh] overflow-hidden bg-black sm:min-h-[62vh] lg:min-h-[68vh]">
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 2.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="absolute inset-0"
      >
        <Image
          src="/images/why-hero.avif"
          alt="Fresh mangoes in orchard light"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </motion.div>

      {/* Overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.4,
          ease: "easeOut",
        }}
        className="absolute inset-0 bg-[linear-gradient(120deg,rgba(0,0,0,0.78)_10%,rgba(0,0,0,0.58)_45%,rgba(0,0,0,0.35)_100%)]"
      />

      {/* Ambient Glow */}
      <motion.div
        animate={{
          y: [0, -12, 0],
          opacity: [0.4, 0.55, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-24 top-10 h-[26rem] w-[26rem] rounded-full bg-amber-500/10 blur-3xl"
      />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[58vh] max-w-6xl items-center px-6 py-16 sm:min-h-[62vh] lg:min-h-[68vh]">
        <motion.div initial="hidden" animate="visible" className="max-w-3xl">
          {/* Eyebrow */}
          <motion.p
            custom={0}
            variants={fadeUp}
            className="font-outfit text-sm font-semibold uppercase tracking-[0.16em] text-amber-300"
          >
            Why Mangoastic
          </motion.p>

          {/* Heading */}
          <div className="overflow-hidden">
            <motion.h1
              custom={0.15}
              variants={fadeUp}
              className="mt-3 font-sirelia text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
            >
              Six things that make a Mangoastic box different.
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            custom={0.3}
            variants={fadeUp}
            className="mt-6 max-w-2xl font-outfit text-base leading-relaxed text-zinc-200 sm:text-lg"
          >
            Some of these are about the fruit. Some are about everything around
            it.
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={0.45}
            variants={fadeUp}
            className="mt-8 flex flex-wrap gap-3"
          >
            <motion.div
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3 font-outfit text-sm font-semibold uppercase tracking-[0.1em] text-black shadow-[0_18px_60px_-18px_rgba(251,191,36,0.7)] transition-colors duration-300 hover:bg-amber-400"
              >
                Shop the season
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
