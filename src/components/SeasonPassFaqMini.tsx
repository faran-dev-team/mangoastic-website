"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion, type Variants } from "framer-motion";

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

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const faqItemVariants: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

export default function SeasonPassFaqMini() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="relative overflow-hidden border-t border-zinc-800/80 bg-black px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24"
      aria-labelledby="season-pass-faq-heading"
    >
      <div className="absolute left-[-8%] bottom-[15%] h-[220px] w-[220px] rounded-full bg-orange-500/8 blur-3xl" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.12 }}
        className="relative z-10 mx-auto max-w-6xl"
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.p
            variants={fadeUp}
            className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs"
          >
            FAQ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            id="season-pass-faq-heading"
            className="mt-4 font-sirelia text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl"
          >
            Quick answers
          </motion.h2>
        </div>

        <motion.div
          variants={containerVariants}
          className="mx-auto mt-10 max-w-3xl sm:mt-12"
        >
          {FAQS.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `season-pass-faq-panel-${index}`;
            const buttonId = `season-pass-faq-button-${index}`;

            return (
              <motion.div
                key={item.question}
                variants={faqItemVariants}
                className="border-b border-zinc-800/90 last:border-b-0"
              >
                <button
                  type="button"
                  id={buttonId}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="group flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left transition hover:text-mango sm:py-6"
                >
                  <span className="font-outfit text-sm font-semibold leading-snug text-white transition group-hover:text-mango sm:text-base">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`mt-0.5 h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 ${
                      isOpen ? "rotate-180 text-mango" : "group-hover:text-mango/80"
                    }`}
                    strokeWidth={2}
                    aria-hidden
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl border-l-2 border-mango/35 pb-5 pl-5 font-outfit text-sm leading-relaxed text-zinc-400 sm:pb-6 sm:pl-6 sm:text-[0.9375rem] sm:leading-relaxed">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div variants={fadeUp} className="mt-10 flex justify-center sm:mt-12">
          <Link
            href="/faq"
            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/35 bg-white/5 px-7 py-3.5 font-outfit text-sm font-semibold text-white backdrop-blur-sm transition hover:border-mango/50 hover:text-mango focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango"
          >
            View all FAQs
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
