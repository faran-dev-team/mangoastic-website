"use client";

import { Loader2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

type ProductCTAsProps = {
  productPrice: string;
  quantity: number;
  totalPriceLabel: string;
  isSubmitting: boolean;
  isSuccess: boolean;
  errorMessage: string | null;
  onPlaceOrder: () => void;
};

export function ProductCTAs({
  productPrice,
  quantity,
  totalPriceLabel,
  isSubmitting,
  isSuccess,
  errorMessage,
  onPlaceOrder,
}: ProductCTAsProps) {
  const shouldReduceMotion = useReducedMotion();
  const priceLabel =
    quantity > 1 ? `${productPrice} × ${quantity}` : productPrice;

  const label = isSubmitting
    ? "Placing your order…"
    : isSuccess
      ? "Opening WhatsApp…"
      : "Place Order & Continue to WhatsApp";

  return (
    <div className="mt-8">
      <motion.button
        type="button"
        onClick={onPlaceOrder}
        disabled={isSubmitting || isSuccess}
        aria-busy={isSubmitting || isSuccess}
        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 py-3.5 font-outfit text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:bg-zinc-700"
        whileTap={
          shouldReduceMotion || isSubmitting || isSuccess
            ? undefined
            : { scale: 0.98 }
        }
        whileHover={
          shouldReduceMotion || isSubmitting || isSuccess
            ? undefined
            : { scale: 1.02 }
        }
        transition={{ duration: 0.12, ease: "easeOut" }}
      >
        {(isSubmitting || isSuccess) && (
          <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
        )}
        <span>{label}</span>
      </motion.button>

      <p className="mt-3 text-center font-outfit text-xs text-zinc-500">
        Selection total {totalPriceLabel}
        {quantity > 1 ? ` · unit ${priceLabel}` : null}
      </p>

      {isSuccess ? (
        <p
          role="status"
          className="mt-3 rounded-2xl bg-emerald-50 px-4 py-3 text-center font-outfit text-sm text-emerald-800"
        >
          Order saved. Redirecting you to WhatsApp…
        </p>
      ) : null}

      {errorMessage ? (
        <p
          role="alert"
          className="mt-3 rounded-2xl bg-red-50 px-4 py-3 text-center font-outfit text-sm text-red-700"
        >
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
