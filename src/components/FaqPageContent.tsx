"use client";

import { FAQ_CATEGORIES, type FaqCategory } from "@/data/faq";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { ChevronRight, Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

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

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

function normalizeForSearch(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u2018\u2019]/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function filterCategories(
  query: string,
  categoryId: string | null,
): FaqCategory[] {
  const terms = normalizeForSearch(query).split(" ").filter(Boolean);

  const base = categoryId
    ? FAQ_CATEGORIES.filter((c) => c.id === categoryId)
    : FAQ_CATEGORIES;

  if (terms.length === 0) {
    return base.map((category) => ({ ...category, items: [...category.items] }));
  }

  return base
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => {
        const haystack = normalizeForSearch(
          `${item.question} ${item.answer} ${category.title}`,
        );
        return terms.every((term) => haystack.includes(term));
      }),
    }))
    .filter((category) => category.items.length > 0);
}

function countQuestions(categories: FaqCategory[]) {
  return categories.reduce((sum, c) => sum + c.items.length, 0);
}

type FaqAccordionItemProps = {
  itemKey: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

function FaqAccordionItem({
  itemKey,
  question,
  answer,
  isOpen,
  onToggle,
}: FaqAccordionItemProps) {
  const panelId = `faq-panel-${itemKey}`;
  const buttonId = `faq-button-${itemKey}`;

  return (
    <motion.li variants={itemVariants} className="border-b border-zinc-800/90 last:border-b-0">
      <button
        type="button"
        id={buttonId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="group relative flex w-full items-start gap-3 overflow-hidden px-4 py-5 text-left transition sm:gap-4 sm:px-5 sm:py-6"
      >
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <div className="absolute -left-[120%] top-0 h-full w-[80%] rotate-12 bg-gradient-to-r from-transparent via-white/8 to-transparent transition-all duration-1000 group-hover:left-[140%]" />
        </div>
        <span
          className="relative z-10 mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-mango shadow-[0_0_8px_rgba(255,163,10,0.45)]"
          aria-hidden
        />
        <span className="relative z-10 min-w-0 flex-1 font-outfit text-sm font-semibold leading-snug text-white transition group-hover:text-mango sm:text-base">
          {question}
        </span>
        <ChevronRight
          className={`relative z-10 mt-0.5 h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 ${
            isOpen ? "rotate-90 text-mango" : "group-hover:text-mango/80"
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
            <p className="border-l-2 border-mango/35 px-4 pb-5 pl-9 font-outfit text-sm leading-relaxed text-zinc-400 sm:px-5 sm:pb-6 sm:pl-11 sm:text-[0.9375rem]">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.li>
  );
}

export default function FaqPageContent() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const filtered = useMemo(
    () => filterCategories(search, activeCategory),
    [search, activeCategory],
  );

  const listKey = `${activeCategory ?? "all"}::${normalizeForSearch(search)}`;

  const totalMatches = countQuestions(filtered);
  const hasFilters = search.trim().length > 0 || activeCategory !== null;

  function clearFilters() {
    setSearch("");
    setActiveCategory(null);
    setOpenKey(null);
  }

  return (
    <div className="bg-black text-white">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[min(100%,520px)] -translate-x-1/2 rounded-full bg-mango/6 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs"
          >
            Help centre
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-sirelia text-3xl font-normal leading-tight tracking-tight sm:text-4xl md:text-5xl"
          >
            <span className="text-white">Frequently asked questions</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base"
          >
            Search or browse by topic below.
          </motion.p>

          <motion.div variants={fadeUp} className="relative mt-10 sm:mt-12">
            <label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </label>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
              aria-hidden
            />
            <input
              id="faq-search"
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenKey(null);
              }}
              placeholder="Search questions…"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 py-3.5 pl-12 pr-12 font-outfit text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-mango/50 focus:ring-1 focus:ring-mango/30 sm:text-base"
            />
            <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
              <AnimatePresence>
                {search.length > 0 && (
                  <motion.button
                    type="button"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.85 }}
                    transition={{ duration: 0.2 }}
                    onClick={() => {
                      setSearch("");
                      setOpenKey(null);
                    }}
                    className="pointer-events-auto flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4 shrink-0" strokeWidth={2} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-5 flex flex-wrap justify-center gap-2"
          >
            <motion.button
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => {
                setActiveCategory(null);
                setOpenKey(null);
              }}
              className={`rounded-full border px-3.5 py-1.5 font-outfit text-[11px] font-semibold uppercase tracking-[0.14em] transition sm:text-xs ${
                activeCategory === null
                  ? "border-mango/60 bg-mango/15 text-mango"
                  : "border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-white"
              }`}
            >
              All
            </motion.button>
            {FAQ_CATEGORIES.map((category) => (
              <motion.button
                key={category.id}
                type="button"
                whileTap={{ scale: 0.97 }}
                onClick={() => {
                  setActiveCategory(
                    activeCategory === category.id ? null : category.id,
                  );
                  setOpenKey(null);
                }}
                className={`rounded-full border px-3.5 py-1.5 font-outfit text-[11px] font-semibold uppercase tracking-[0.14em] transition sm:text-xs ${
                  activeCategory === category.id
                    ? "border-mango/60 bg-mango/15 text-mango"
                    : "border-zinc-700 text-zinc-500 hover:border-zinc-500 hover:text-white"
                }`}
              >
                {category.title}
              </motion.button>
            ))}
          </motion.div>

          <AnimatePresence>
            {hasFilters && filtered.length > 0 && (
              <motion.p
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.35 }}
                className="mt-4 font-outfit text-xs text-zinc-500 sm:text-sm"
              >
                {totalMatches} match{totalMatches === 1 ? "" : "es"}
                {search.trim() ? ` for “${search.trim()}”` : ""}
                {" · "}
                <button
                  type="button"
                  onClick={clearFilters}
                  className="font-semibold text-mango hover:underline"
                >
                  Clear
                </button>
              </motion.p>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      <section className="relative px-4 pb-20 sm:px-6 sm:pb-24 md:px-8">
        <motion.div
          key={listKey}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="mx-auto max-w-3xl"
        >
          {filtered.length === 0 ? (
            <motion.p
              variants={fadeUp}
              className="py-12 text-center font-outfit text-sm text-zinc-500 sm:text-base"
            >
              No matches. Try another keyword or{" "}
              <a
                href="https://wa.me/923214567890"
                className="font-semibold text-mango hover:underline"
              >
                WhatsApp us
              </a>
              .
              {hasFilters && (
                <>
                  {" "}
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="font-semibold text-mango hover:underline"
                  >
                    Show all
                  </button>
                </>
              )}
            </motion.p>
          ) : (
            <motion.div variants={containerVariants} className="space-y-12 sm:space-y-14">
              {filtered.map((category) => (
                <motion.div key={category.id} variants={fadeUp}>
                  <h2 className="font-outfit text-xs font-semibold uppercase tracking-[0.2em] text-mango sm:text-sm">
                    {category.title}
                  </h2>

                  <motion.ul
                    variants={containerVariants}
                    className="mt-4 list-none overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/30"
                  >
                    {category.items.map((item) => {
                      const key = `${category.id}::${item.question}`;
                      const isOpen = openKey === key;

                      return (
                        <FaqAccordionItem
                          key={key}
                          itemKey={key}
                          question={item.question}
                          answer={item.answer}
                          isOpen={isOpen}
                          onToggle={() => setOpenKey(isOpen ? null : key)}
                        />
                      );
                    })}
                  </motion.ul>
                </motion.div>
              ))}
            </motion.div>
          )}

          <motion.p
            variants={fadeUp}
            className="mt-14 text-center font-outfit text-sm text-zinc-500 sm:mt-16"
          >
            Still stuck?{" "}
            <Link
              href="/contact"
              className="font-semibold text-mango underline-offset-2 hover:underline"
            >
              Contact us
            </Link>
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
