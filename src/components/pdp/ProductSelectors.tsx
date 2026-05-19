"use client";

import { useMemo } from "react";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const ripenessOptions = [
  "Ready to eat in 1-2 days",
  "Ready in 3-4 days",
  "Mixed (for sharing across the week)",
] as const;

const addonOptions = [
  { id: "mango-honey", label: "Add mango honey 250g (+850 PKR)" },
  { id: "aamras", label: "Add aamras pouch 500g (+650 PKR)" },
  { id: "gift-note", label: "Add a handwritten gift note (free)" },
] as const;

type ProductSelectorsProps = {
  ripeness: (typeof ripenessOptions)[number];
  onRipenessChange: (ripeness: (typeof ripenessOptions)[number]) => void;
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  addons: Record<string, boolean>;
  onAddonsChange: (addons: Record<string, boolean>) => void;
  productPrice: string;
};

export function ProductSelectors({
  ripeness,
  onRipenessChange,
  quantity,
  onQuantityChange,
  addons,
  onAddonsChange,
  productPrice,
}: ProductSelectorsProps) {
  const shouldReduceMotion = useReducedMotion();

  const totalPrice = useMemo(() => {
    const base = Number(productPrice.replace(/[^0-9]/g, ""));
    const addonTotal =
      (addons["mango-honey"] ? 850 : 0) +
      (addons.aamras ? 650 : 0) +
      (addons["gift-note"] ? 0 : 0);

    return (base + addonTotal) * quantity;
  }, [addons, quantity, productPrice]);

  return (
    <>
      <div className="mt-7 space-y-5 border-t border-zinc-200 pt-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Ripeness preference
          </p>
          <div className="mt-3 grid gap-3">
            {ripenessOptions.map((option) => (
              <motion.button
                key={option}
                type="button"
                onClick={() => onRipenessChange(option)}
                className={`rounded-2xl border px-4 py-3 text-left font-outfit text-sm transition ${
                  ripeness === option
                    ? "border-amber-500 bg-amber-50 text-zinc-950"
                    : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                }`}
                whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
                whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
                transition={{ duration: 0.12, ease: "easeOut" }}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Add-ons
            </p>
            <div className="mt-3 space-y-3">
              {addonOptions.map((addon) => (
                <label
                  key={addon.id}
                  className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 font-outfit text-sm text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                >
                  <input
                    type="checkbox"
                    checked={addons[addon.id]}
                    onChange={(e) =>
                      onAddonsChange({
                        ...addons,
                        [addon.id]: e.target.checked,
                      })
                    }
                    className="mt-1 h-4 w-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-500"
                  />
                  <span>{addon.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
              Quantity
            </p>
            <div className="mt-3 flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-2">
              <motion.button
                type="button"
                onClick={() => onQuantityChange(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-lg text-zinc-700 transition hover:bg-zinc-200"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              >
                −
              </motion.button>
              <div className="flex-1 text-center font-outfit text-lg font-semibold text-zinc-950">
                {quantity}
              </div>
              <motion.button
                type="button"
                onClick={() => onQuantityChange(Math.min(5, quantity + 1))}
                className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-lg text-zinc-700 transition hover:bg-zinc-200"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.96 }}
              >
                +
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <p className="mt-4 text-sm text-zinc-500">
        Same-day dispatch · Replacement if anything&apos;s wrong · Cash on
        delivery available.
      </p>
      <p className="mt-3 flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 font-outfit text-sm text-amber-900">
        <Check className="h-4 w-4" />
        Total for this selection: PKR {totalPrice.toLocaleString("en-PK")}
      </p>
    </>
  );
}
