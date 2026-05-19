"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

const smoothEase: [number, number, number, number] = [0.22, 1, 0.36, 1];

const rows = [
  ["Single orchard", "Yes", "No", "No"],
  ["Picked within 24h", "Yes", "Sometimes", "Rarely"],
  ["Rejection rate at source", "~40%", "~5%", "~10%"],
  ["Branded gift packaging", "Yes", "No", "Basic"],
  ["Ripeness card per box", "Yes", "No", "No"],
  ["Replacement guarantee", "Yes", "No", "Limited"],
  ["Customer support response", "Under 8 min", "—", "Hours–days"],
];

function CellIcon({ value }: { value: string }) {
  if (value === "Yes" || value.startsWith("~") || value.includes("Under")) {
    return (
      <span className="inline-flex items-center gap-2 text-amber-400">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="shrink-0"
        >
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="text-sm text-zinc-200">{value}</span>
      </span>
    );
  }

  if (value === "No") {
    return <span className="text-sm text-zinc-500">{value}</span>;
  }

  return <span className="text-sm text-zinc-400">{value}</span>;
}

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const rowVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: smoothEase,
    },
  },
};

export default function ComparisonTable() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
      {/* Ambient Glow */}
      <div className="absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{
            duration: 0.8,
            ease: smoothEase,
          }}
          className="mb-10 text-center"
        >
          <p className="font-outfit text-sm font-semibold uppercase tracking-[0.24em] text-amber-400">
            Why it matters
          </p>

          <h3 className="mt-4 font-display text-3xl font-light leading-tight text-white sm:text-4xl lg:text-5xl">
            How Mangoastic compares.
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            A side-by-side comparison between Mangoastic, traditional mandi
            boxes, and generic online sellers.
          </p>
        </motion.div>

        {/* Desktop Table */}
        <motion.div
          initial={{ opacity: 0, y: 45 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{
            duration: 0.9,
            ease: smoothEase,
          }}
          className="hidden overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_120px_-40px_rgba(0,0,0,0.85)] md:block"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.03] backdrop-blur-xl">
                <th className="w-[34%] px-8 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Comparison
                </th>

                <th className="w-[22%] px-8 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400">
                  Mangoastic
                </th>

                <th className="w-[22%] px-8 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Mandi Box
                </th>

                <th className="w-[22%] px-8 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Online Seller
                </th>
              </tr>
            </thead>

            <motion.tbody
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.15 }}
            >
              {rows.map((r, index) => (
                <motion.tr
                  key={r[0]}
                  variants={rowVariants}
                  className="group border-b border-white/5 transition-colors duration-500 hover:bg-white/[0.025]"
                >
                  <td className="px-8 py-6 align-top">
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 text-xs font-semibold tracking-[0.18em] text-amber-400/70">
                        0{index + 1}
                      </span>

                      <span className="text-sm leading-relaxed text-zinc-200 lg:text-[15px]">
                        {r[0]}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-6 align-top">
                    <CellIcon value={r[1]} />
                  </td>

                  <td className="px-8 py-6 align-top">
                    <CellIcon value={r[2]} />
                  </td>

                  <td className="px-8 py-6 align-top">
                    <CellIcon value={r[3]} />
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </motion.div>

        {/* Mobile Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          className="space-y-4 md:hidden"
        >
          {rows.map((row, index) => (
            <motion.div
              key={row[0]}
              variants={rowVariants}
              whileHover={{ y: -4 }}
              transition={{
                duration: 0.35,
                ease: smoothEase,
              }}
              className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)]"
            >
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold tracking-[0.18em] text-amber-400/80">
                  0{index + 1}
                </span>

                <h4 className="text-base font-medium text-white">{row[0]}</h4>
              </div>

              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Mangoastic
                  </span>

                  <CellIcon value={row[1]} />
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Mandi Box
                  </span>

                  <CellIcon value={row[2]} />
                </div>

                <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/20 px-4 py-3">
                  <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    Online Seller
                  </span>

                  <CellIcon value={row[3]} />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
