"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

type ProductCTAsProps = {
  productBreadcrumb: string;
  productPrice: string;
  quantity: number;
  whatsappMessage: string;
};

export function ProductCTAs({
  productBreadcrumb,
  productPrice,
  quantity,
  whatsappMessage,
}: ProductCTAsProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      <motion.div
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      >
        <Link
          href={`/shop?order=${productBreadcrumb}`}
          className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 font-outfit text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-zinc-800"
        >
          Order Now —{" "}
          {quantity > 1 ? `${productPrice} × ${quantity}` : productPrice}
        </Link>
      </motion.div>
      <motion.a
        href={`https://wa.me/923001234567?text=${whatsappMessage}`}
        className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-transparent px-5 py-3 font-outfit text-sm font-semibold uppercase tracking-wide text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      >
        Order on WhatsApp →
      </motion.a>
    </div>
  );
}
