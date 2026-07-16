"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Vertical offset in pixels before reveal. */
  y?: number;
  /** IntersectionObserver threshold (0–1). */
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Lightweight viewport fade/slide reveal for marketing sections.
 * Uses framer-motion (already in the app) — not used by the admin shell.
 */
export default function FadeIn({
  children,
  className,
  delay = 0,
  y = 24,
  amount = 0.25,
  ...rest
}: FadeInProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.55, ease: "easeOut", delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
