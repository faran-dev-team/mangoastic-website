"use client";

import {
  BadgePercent,
  Gift,
  Layers,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { motion, Variants } from "framer-motion";

const BENEFITS: { text: string; icon: LucideIcon; highlight?: string }[] = [
  {
    text: "16% cheaper than buying each box individually.",
    icon: BadgePercent,
    highlight: "16%",
  },
  {
    text: "You'll taste varieties most people miss because they only order Chaunsa.",
    icon: Layers,
  },
  {
    text: "Priority dispatch — Season Pass holders pack first.",
    icon: Zap,
  },
  {
    text: "End-of-season thank-you gift (we don't say what. It's a surprise).",
    icon: Gift,
  },
  {
    text: "First access to next year's season.",
    icon: Sparkles,
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

function BenefitText({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  if (!highlight || !text.includes(highlight)) {
    return <>{text}</>;
  }
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span className="font-semibold text-mango">{highlight}</span>
      {after}
    </>
  );
}

export default function SeasonPassWhyBestDeal() {
  return (
    <section
      className="relative overflow-hidden border-t border-zinc-800/80 bg-zinc-950/40 px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24"
      aria-labelledby="season-pass-why-heading"
    >
      <div className="absolute right-[-6%] top-[10%] h-[240px] w-[240px] rounded-full bg-mango/8 blur-3xl" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 mx-auto max-w-6xl"
      >
        <div className="mx-auto max-w-2xl text-center sm:max-w-3xl">
          <motion.p
            variants={fadeUp}
            className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs"
          >
            Season pass value
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="season-pass-why-heading"
            className="mt-4 font-sirelia text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-[2.5rem]"
          >
            Why it&apos;s the{" "}
            <span className="text-mango italic">best deal</span>
          </motion.h2>
        </div>

        <motion.ul
          variants={containerVariants}
          className="mx-auto mt-12 max-w-3xl list-none space-y-4 sm:mt-14 sm:space-y-5"
        >
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <motion.li
                key={item.text}
                variants={itemVariants}
                className="group relative flex cursor-default gap-4 overflow-hidden rounded-2xl border border-zinc-800/80 bg-black/40 px-5 py-5 sm:gap-5 sm:px-6 sm:py-6"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute -left-[120%] top-0 h-full w-[80%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[140%]" />
                </div>

                <span
                  className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/90 transition-colors duration-300 group-hover:border-mango/40 group-hover:bg-mango/10"
                  aria-hidden
                >
                  <Icon
                    className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-mango"
                    strokeWidth={1.75}
                  />
                </span>
                <p className="relative z-10 pt-2 font-outfit text-[0.9375rem] leading-[1.65] text-zinc-300 sm:text-base sm:leading-relaxed">
                  <BenefitText text={item.text} highlight={item.highlight} />
                </p>
              </motion.li>
            );
          })}
        </motion.ul>
      </motion.div>
    </section>
  );
}
