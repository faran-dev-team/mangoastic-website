"use client";

import Link from "next/link";
import { motion, Variants, useReducedMotion } from "framer-motion";

type ProductFooterCTAProps = {
  whatsappMessage: string;
};

export function ProductFooterCTA({ whatsappMessage }: ProductFooterCTAProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="mt-8 rounded-[28px] border border-zinc-200 bg-[#12100d] p-6 text-center shadow-[0_18px_60px_rgba(47,39,24,0.08)] sm:p-8"
      variants={fadeUp}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.3 }}
    >
      <h3 className="font-sirelia text-2xl text-white sm:text-3xl">
        Not sure which box is for you?
      </h3>
      <p className="mx-auto mt-3 max-w-2xl font-outfit text-sm leading-relaxed text-zinc-300">
        Send us a WhatsApp. We&apos;ll help you pick in two minutes.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <motion.a
          href={`https://wa.me/923001234567?text=${whatsappMessage}`}
          className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 font-outfit text-sm font-semibold text-black transition hover:bg-amber-300"
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        >
          WhatsApp Us
        </motion.a>
        <motion.div
          whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
          whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
          transition={{ duration: 0.12, ease: "easeOut" }}
        >
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-outfit text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
          >
            Back to Shop
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
}
