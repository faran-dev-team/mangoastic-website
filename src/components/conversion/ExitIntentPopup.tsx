"use client";

import { EXIT_INTENT_DISCOUNT_PKR } from "@/data/microcopy";
import { X } from "lucide-react";
import { FormEvent, useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "mangoastic_exit_intent_dismissed";

export default function ExitIntentPopup() {
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const dismiss = useCallback(() => {
    setOpen(false);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(STORAGE_KEY)) return;
    } catch {
      return;
    }

    const onLeave = (e: MouseEvent) => {
      if (window.innerWidth < 768) return;
      if (e.clientY <= 0) setOpen(true);
    };

    document.documentElement.addEventListener("mouseleave", onLeave);
    return () =>
      document.documentElement.removeEventListener("mouseleave", onLeave);
  }, []);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!phone.trim()) return;
    setSubmitted(true);
    try {
      sessionStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
  }

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] hidden items-center justify-center bg-black/70 p-4 backdrop-blur-sm md:flex"
      role="dialog"
      aria-modal="true"
      aria-labelledby="exit-intent-title"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-zinc-800/90 bg-zinc-950 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.65)] sm:p-8">
        <button
          type="button"
          onClick={dismiss}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
          aria-label="Close"
        >
          <X className="h-5 w-5" strokeWidth={2} />
        </button>

        {submitted ? (
          <div className="pr-8">
            <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.2em] text-mango">
              You&apos;re in
            </p>
            <h2
              id="exit-intent-title"
              className="mt-3 font-sirelia text-2xl text-white"
            >
              Code on its way
            </h2>
            <p className="mt-3 font-outfit text-sm leading-relaxed text-zinc-400">
              We&apos;ll WhatsApp you ORCHARD300 and a reminder when the next
              harvest is in.
            </p>
            <button
              type="button"
              onClick={dismiss}
              className="mt-6 rounded-full bg-mango px-6 py-2.5 font-outfit text-sm font-semibold text-black transition hover:bg-mango/90"
            >
              Continue browsing
            </button>
          </div>
        ) : (
          <>
            <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.2em] text-mango">
              Before you go
            </p>
            <h2
              id="exit-intent-title"
              className="mt-3 pr-8 font-sirelia text-2xl leading-snug text-white sm:text-3xl"
            >
              Your first order,{" "}
              <span className="text-mango italic">
                {EXIT_INTENT_DISCOUNT_PKR} off.
              </span>
            </h2>
            <p className="mt-3 font-outfit text-sm leading-relaxed text-zinc-400">
              Drop your WhatsApp number — we&apos;ll send you the code and a
              reminder when the next harvest is in.
            </p>

            <form onSubmit={onSubmit} className="mt-6 space-y-3">
              <label htmlFor="exit-intent-phone" className="sr-only">
                WhatsApp number
              </label>
              <input
                id="exit-intent-phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="WhatsApp number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 px-4 py-3 font-outfit text-sm text-white placeholder:text-zinc-500 outline-none focus:border-mango/50 focus:ring-1 focus:ring-mango/30"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-mango py-3 font-outfit text-sm font-semibold text-black transition hover:bg-mango/90"
              >
                Send me the code
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
