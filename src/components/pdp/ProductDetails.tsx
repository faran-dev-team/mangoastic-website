"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";

type ProductDetailsProps = {
  name: string;
  weight: string;
  price: string;
  description: string;
  highlight: string;
  heroNote: string;
};

export function ProductDetails({
  name,
  weight,
  price,
  description,
  highlight,
  heroNote,
}: ProductDetailsProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(47,39,24,0.08)] sm:p-8 lg:sticky lg:top-6"
      variants={fadeUp}
      initial={shouldReduceMotion ? undefined : "hidden"}
      whileInView={shouldReduceMotion ? undefined : "show"}
      viewport={{ once: true, amount: 0.3 }}
    >
      <p className="font-outfit text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
        Product Details
      </p>
      <h1 className="mt-3 font-sirelia text-4xl leading-tight text-zinc-950 sm:text-5xl">
        {name}
      </h1>
      <p className="mt-3 font-outfit text-base text-zinc-600">
        {weight} · Free delivery.
      </p>
      <p className="mt-5 max-w-2xl font-outfit text-lg leading-relaxed text-zinc-700">
        {description}
      </p>
      <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 font-outfit text-sm text-amber-900">
        {highlight}
      </p>
      <p className="mt-4 font-outfit text-sm leading-relaxed text-zinc-500">
        {heroNote}
      </p>

      <div className="mt-6 flex items-end gap-3">
        <p className="font-outfit text-3xl font-semibold text-zinc-950">
          {price}
        </p>
        <span className="pb-1 font-outfit text-sm text-zinc-500">/ box</span>
      </div>
    </motion.div>
  );
}
