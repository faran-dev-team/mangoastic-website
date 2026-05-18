"use client";

import {
  Award,
  Gift,
  Handshake,
  Heart,
  TrendingUp,
  UserPlus,
  type LucideIcon,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const USE_CASES: { label: string; icon: LucideIcon }[] = [
  { label: "Eid gifting for teams and clients", icon: Gift },
  { label: "Mid-year recognition", icon: Award },
  { label: "Wedding-season corporate gifting", icon: Heart },
  { label: "Client appreciation", icon: Handshake },
  { label: "New-hire welcome gifts", icon: UserPlus },
  { label: "Investor relations gifts", icon: TrendingUp },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

export default function CorporateUseCases() {
  return (
    <section
      className="relative overflow-hidden border-t border-zinc-800/80 bg-black px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20"
      aria-labelledby="corporate-use-cases-heading"
    >
      <div className="absolute right-[-6%] top-[15%] h-[260px] w-[260px] rounded-full bg-mango/10 blur-3xl" />
      <motion.div
        className="absolute bottom-[-10%] left-[-8%] h-[300px] w-[300px] rounded-full bg-orange-500/8 blur-3xl"
        animate={{ y: [0, -18, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="absolute inset-x-0 top-0 h-px origin-left bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 mx-auto max-w-6xl"
      >
        <motion.p
          variants={fadeUp}
          className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs"
        >
          Use cases
        </motion.p>
        <motion.h2
          variants={fadeUp}
          id="corporate-use-cases-heading"
          className="mt-3 font-sirelia text-2xl font-normal tracking-tight text-white sm:text-3xl"
        >
          Built for every occasion
        </motion.h2>

        <motion.ul
          variants={containerVariants}
          className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:gap-5"
        >
          {USE_CASES.map(({ label, icon: Icon }) => (
            <motion.li
              key={label}
              variants={cardVariants}
              className="group relative flex cursor-default items-center gap-4 overflow-hidden rounded-xl border border-zinc-800/90 bg-zinc-950/50 px-5 py-4 sm:px-6 sm:py-5"
            >
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute -left-[120%] top-0 h-full w-[80%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[140%]" />
              </div>

              <span
                className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-700/90 bg-zinc-900/90 transition-colors duration-300 group-hover:border-mango/35 group-hover:bg-mango/10"
                aria-hidden
              >
                <Icon
                  className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-mango"
                  strokeWidth={1.75}
                />
              </span>
              <span className="relative z-10 font-outfit text-sm leading-snug text-white sm:text-[0.9375rem]">
                {label}
              </span>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          variants={fadeUp}
          className="mt-10 max-w-2xl font-sirelia text-xl font-normal leading-snug text-white sm:mt-12 sm:text-2xl lg:text-[1.65rem] lg:leading-snug"
        >
          Whatever the occasion, mangoes do what{" "}
          <motion.span
            className="inline-block text-mango italic"
            whileInView={{ scale: [1, 1.04, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            flowers don&apos;t
          </motion.span>
          .
        </motion.p>
      </motion.div>
    </section>
  );
}
