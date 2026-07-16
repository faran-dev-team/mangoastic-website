"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type StaggerProps = {
  children: ReactNode;
  className?: string;
  /** Stagger delay between children (seconds). */
  stagger?: number;
  /** IntersectionObserver threshold (0–1). */
  amount?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
} & Omit<HTMLMotionProps<"div">, "children">;

/**
 * Parent container that staggers child `StaggerItem` reveals on scroll.
 */
export function Stagger({
  children,
  className,
  stagger = 0.1,
  amount = 0.2,
  ...rest
}: StaggerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: stagger,
          },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * Child item for `Stagger` — fades up when the parent enters view.
 */
export function StaggerItem({
  children,
  className,
  y = 24,
  ...rest
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.55, ease: "easeOut" },
        },
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
