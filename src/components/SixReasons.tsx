"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const reasons = [
  {
    number: "01",
    title: "We grow them.",
    description:
      "Every Chaunsa, Anwar Ratol, and Sindhri in our boxes came from our own orchard near Multan. There is no middleman. No mandi auction. No wholesale broker. This single fact is the reason our mangoes taste like they do.",
  },
  {
    number: "02",
    title: "We pick the morning before.",
    description:
      "The mango in your box was on the tree yesterday. Not last week. Not 'when the truck arrived.' Yesterday. This is what fresh actually means.",
  },
  {
    number: "03",
    title: "We reject 40 percent.",
    description:
      "Most mango sellers grade for size. We grade for taste. Anything that isn't right — bruised, undersized, oddly-shaped, not yet sweet enough — goes back. We'd rather ship fewer boxes than ship the wrong ones.",
  },
  {
    number: "04",
    title: "We pack like it's a gift.",
    description:
      "Kraft-paper tissue. Individual foam nets. Hand-stamped ripeness card. Handwritten note on first orders. Because this is going to a home. Not a warehouse.",
  },
  {
    number: "05",
    title: "We control delivery.",
    description:
      "We dispatch boxes to match transit time. Karachi orders ship slightly less ripe so they arrive perfect. Islamabad orders go out the morning they're packed. You don't get a mango that 'spent a few days in a cargo van.'",
  },
  {
    number: "06",
    title: "We answer when you call.",
    description:
      "WhatsApp under 8 minutes. Phone, picked up. Problem with a box? Replaced, no questions. We are a small team and we are easy to find.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: smoothEase,
    },
  },
};

export default function SixReasons() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
      {/* Ambient Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            y: [0, -30, 0],
            opacity: [0.25, 0.4, 0.25],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute left-[-10rem] top-20 h-[28rem] w-[28rem] rounded-full bg-amber-500/10 blur-3xl"
        />

        <motion.div
          animate={{
            y: [0, 25, 0],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-0 right-[-12rem] h-[26rem] w-[26rem] rounded-full bg-orange-400/10 blur-3xl"
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={containerVariants}
          className="mb-16 text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-outfit text-sm font-normal uppercase tracking-widest text-amber-400 sm:text-base"
          >
            The Difference
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-3xl font-light text-white sm:text-4xl md:text-5xl"
          >
            Six things that make a Mangoastic box different.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl font-outfit text-base leading-relaxed text-zinc-400 sm:text-lg"
          >
            Some of these are about the fruit. Some are about everything around
            it.
          </motion.p>
        </motion.div>

        {/* Reasons Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={containerVariants}
          className="grid gap-8 md:grid-cols-2 lg:gap-12"
        >
          {reasons.map((reason) => (
            <motion.div
              key={reason.number}
              variants={fadeUp}
              whileHover={{
                y: -10,
                borderColor: "rgba(251,191,36,0.4)",
              }}
              transition={{
                duration: 0.35,
                ease: "easeOut",
              }}
              className="group relative overflow-hidden border border-zinc-800 bg-zinc-950/50 p-8 backdrop-blur-sm sm:p-10"
            >
              {/* Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Number + Title */}
              <div className="relative mb-6">
                <div className="flex items-baseline gap-4">
                  <motion.span
                    whileHover={{
                      scale: 1.08,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="font-display text-4xl font-light text-amber-400 sm:text-5xl"
                  >
                    {reason.number}
                  </motion.span>

                  <h3 className="font-display text-lg font-light text-white sm:text-xl md:text-2xl">
                    {reason.title}
                  </h3>
                </div>
              </div>

              {/* Description */}
              <p className="relative font-outfit text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-relaxed">
                {reason.description}
              </p>

              {/* Accent Line */}
              <motion.div
                initial={{
                  width: 0,
                  opacity: 0,
                }}
                whileHover={{
                  width: 80,
                  opacity: 1,
                }}
                transition={{
                  duration: 0.4,
                  ease: "easeOut",
                }}
                className="mt-6 h-[2px] bg-gradient-to-r from-amber-400 to-transparent"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
