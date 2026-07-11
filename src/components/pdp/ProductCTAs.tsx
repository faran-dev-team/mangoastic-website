"use client";

import { motion, useReducedMotion } from "framer-motion";
import { WHATSAPP_HREF } from "@/data/contact";

type ProductCTAsProps = {
  productPrice: string;
  quantity: number;
  whatsappMessage: string;
};

export function ProductCTAs({
  productPrice,
  quantity,
  whatsappMessage,
}: ProductCTAsProps) {
  const shouldReduceMotion = useReducedMotion();
  const priceLabel =
    quantity > 1 ? `${productPrice} × ${quantity}` : productPrice;

  return (
    <div className="mt-8">
      <motion.a
        href={`${WHATSAPP_HREF}?text=${whatsappMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-zinc-950 px-5 py-3.5 font-outfit text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-zinc-800"
        whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
        whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
        transition={{ duration: 0.12, ease: "easeOut" }}
      >
        Order on WhatsApp — {priceLabel} →
      </motion.a>
    </div>
  );
}
