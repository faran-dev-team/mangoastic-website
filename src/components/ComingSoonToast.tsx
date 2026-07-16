"use client";

import { useEffect } from "react";
import { Sparkles } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

type ComingSoonToastProps = {
  open: boolean;
  onClose: () => void;
  message?: string;
  description?: string;
  durationMs?: number;
};

export function ComingSoonToast({
  open,
  onClose,
  message = "Coming soon!",
  description = "Variety alerts aren't live yet.",
  durationMs = 3500,
}: ComingSoonToastProps) {
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(onClose, durationMs);
    return () => window.clearTimeout(timer);
  }, [open, onClose, durationMs]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="status"
          aria-live="polite"
          initial={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 24, scale: 0.96 }
          }
          animate={
            shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
          }
          exit={
            shouldReduceMotion
              ? { opacity: 0 }
              : { opacity: 0, y: 16, scale: 0.96 }
          }
          transition={{ duration: 0.28, ease: "easeOut" }}
          className="pointer-events-none fixed bottom-24 left-4 right-4 z-[60] mx-auto flex max-w-sm items-center gap-3 rounded-2xl border border-amber-500/35 bg-zinc-950/95 px-4 py-3.5 shadow-[0_20px_60px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,163,10,0.08)] sm:bottom-8 sm:left-auto sm:right-24 sm:px-5 sm:py-4"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-500/15 text-amber-400">
            <Sparkles className="h-4 w-4" strokeWidth={2.25} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="font-outfit text-sm font-semibold text-white sm:text-base">
              {message}
            </p>
            <p className="mt-0.5 font-outfit text-xs text-zinc-400 sm:text-sm">
              {description}
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
