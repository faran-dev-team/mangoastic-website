"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const FAQS = [
  {
    question: "Can I gift my pass to someone?",
    answer: "Yes. Tell us the recipient details at checkout.",
  },
  {
    question: "What if I'm travelling?",
    answer: "Pause any week. No questions.",
  },
  {
    question:
      "Can I share boxes with a different recipient each week?",
    answer:
      "Yes. Multi-address delivery available, just message us before each Wednesday.",
  },
  {
    question: "Refunds?",
    answer:
      "Within 14 days of purchase, before your first delivery, full refund. After delivery starts, pro-rata refund on remaining boxes.",
  },
] as const;

export default function SeasonPassFaqMini() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="border-t border-zinc-800/80 bg-black px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24"
      aria-labelledby="season-pass-faq-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
            FAQ
          </p>
          <h2
            id="season-pass-faq-heading"
            className="mt-4 font-sirelia text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl"
          >
            Quick answers
          </h2>
        </div>

        <div className="mx-auto mt-10 max-w-3xl sm:mt-12">
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `season-pass-faq-panel-${index}`;
            const buttonId = `season-pass-faq-button-${index}`;

            return (
              <div
                key={item.question}
                className="border-b border-zinc-800/90 last:border-b-0"
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() =>
                    setOpenIndex(isOpen ? null : index)
                  }
                  className="flex w-full items-start justify-between gap-4 py-5 text-left transition hover:text-mango sm:py-6"
                >
                  <span className="font-outfit text-sm font-semibold leading-snug text-white sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`mt-0.5 h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-mango" : ""
                    }`}
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={isOpen ? "block pb-5 sm:pb-6" : "hidden"}
                >
                  <p className="max-w-2xl font-outfit text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem] sm:leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/faq"
            className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/5 px-7 py-3.5 font-outfit text-sm font-semibold text-white backdrop-blur-sm transition hover:border-mango/50 hover:text-mango focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango"
          >
            View all FAQs
          </Link>
        </div>
      </div>
    </section>
  );
}
