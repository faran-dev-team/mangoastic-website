"use client";

import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { corporateWhatsappLink } from "@/data/contact";

const CORPORATE_WHATSAPP_HREF = corporateWhatsappLink(
  "Hi Mangoastic — I'd like a quote for 201+ corporate gift boxes.",
);

const TIERS = [
  {
    quantity: "25–50 boxes",
    price: "PKR 4,800 per box",
    detail: "Standard custom-sleeve branding.",
    highlight: false,
    contact: false,
  },
  {
    quantity: "51–200 boxes",
    price: "PKR 4,400 per box",
    detail: "Full custom-printed box with your logo.",
    highlight: true,
    contact: false,
  },
  {
    quantity: "201+ boxes",
    price: "Contact us",
    detail:
      "Fully bespoke boxes, dedicated account manager, white-glove delivery.",
    highlight: false,
    contact: true,
  },
] as const;

const INCLUDED_NOTE =
  "All boxes include handwritten note (your text), recipient confirmation, and replacement guarantee.";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14 },
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
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

export default function CorporatePricingTiers() {
  return (
    <section
      className="relative overflow-hidden border-t border-zinc-800/80 bg-black px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20"
      aria-labelledby="corporate-pricing-heading"
    >
      <div className="absolute left-[-8%] top-[20%] h-[280px] w-[280px] rounded-full bg-mango/10 blur-3xl" />
      <motion.div
        className="absolute bottom-[-12%] right-[-6%] h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-3xl"
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

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
          Pricing
        </motion.p>
        <motion.h2
          variants={fadeUp}
          id="corporate-pricing-heading"
          className="mt-3 font-sirelia text-2xl font-normal tracking-tight text-white sm:text-3xl"
        >
          Pricing tiers
        </motion.h2>

        <motion.ul
          variants={containerVariants}
          className="mt-10 grid gap-5 sm:mt-12 lg:grid-cols-3 lg:gap-6"
        >
          {TIERS.map((tier) => (
            <motion.li
              key={tier.quantity}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="group relative flex cursor-default list-none flex-col overflow-hidden rounded-3xl border border-white/5 bg-white/[0.03] p-6 backdrop-blur-xl sm:p-7"
            >
              {tier.highlight && (
                <span className="absolute top-2 right-0 z-[99] inline-flex items-center rounded-full border border-mango/60 bg-mango px-3 py-1 font-outfit text-[10px] font-bold uppercase tracking-[0.14em] text-black shadow-md shadow-mango/25 sm:right-7">
                  Most popular
                </span>
              )}

              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-mango/10 via-transparent to-orange-500/5" />
              </div>

              <div className="absolute inset-0 rounded-3xl border border-transparent transition-all duration-500 group-hover:border-mango/20" />

              <p className="relative z-10 font-outfit text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                {tier.quantity}
              </p>

              {tier.contact ? (
                <Link
                  href={CORPORATE_WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative z-10 mt-3 cursor-pointer font-outfit text-xl font-semibold text-mango transition group-hover:text-mango/90 sm:text-2xl"
                >
                  {tier.price}
                </Link>
              ) : (
                <p className="relative z-10 mt-3 font-outfit text-xl font-semibold text-white sm:text-2xl">
                  {tier.price}
                </p>
              )}

              <p className="relative z-10 mt-4 flex-1 font-outfit text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem]">
                {tier.detail}
              </p>

              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute -left-[120%] top-0 h-full w-[80%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[140%]" />
              </div>
            </motion.li>
          ))}
        </motion.ul>

        <motion.p
          variants={fadeUp}
          className="mt-10 max-w-3xl font-outfit text-sm leading-relaxed text-zinc-400 sm:mt-12 sm:text-center sm:text-base sm:leading-relaxed lg:mx-auto"
        >
          {INCLUDED_NOTE}
        </motion.p>
      </motion.div>
    </section>
  );
}
