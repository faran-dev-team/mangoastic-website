"use client";

import { FAQ_CATEGORIES, type FaqCategory } from "@/data/faq";
import { ChevronRight, Search, X } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

function filterCategories(query: string): FaqCategory[] {
  const q = query.trim().toLowerCase();
  if (!q) return FAQ_CATEGORIES;

  return FAQ_CATEGORIES.map((category) => ({
    ...category,
    items: category.items.filter(
      (item) =>
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        category.title.toLowerCase().includes(q),
    ),
  })).filter((category) => category.items.length > 0);
}

function countQuestions(categories: FaqCategory[]) {
  return categories.reduce((sum, c) => sum + c.items.length, 0);
}

export default function FaqPageContent() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [openKey, setOpenKey] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let categories = filterCategories(search);
    if (activeCategory) {
      categories = categories.filter((c) => c.id === activeCategory);
    }
    return categories;
  }, [search, activeCategory]);

  const totalMatches = countQuestions(filtered);
  const hasFilters = search.trim().length > 0 || activeCategory !== null;

  function clearFilters() {
    setSearch("");
    setActiveCategory(null);
    setOpenKey(null);
  }

  return (
    <div className="bg-black text-white">
      <section className="border-b border-zinc-800/80 px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
            Help centre
          </p>
          <h1 className="mt-4 font-sirelia text-3xl font-normal leading-tight tracking-tight sm:text-4xl md:text-5xl">
            <span className="text-white">Frequently asked questions</span>
          </h1>
          <p className="mt-4 font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base">
            Search or browse by topic below.
          </p>

          <div className="relative mt-10 sm:mt-12">
            <label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </label>
            <Search
              className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500"
              aria-hidden
            />
            <input
              id="faq-search"
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setOpenKey(null);
              }}
              placeholder="Search questions…"
              className="w-full rounded-xl border border-zinc-700 bg-zinc-900/80 py-3.5 pl-12 pr-12 font-outfit text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-mango/50 focus:ring-1 focus:ring-mango/30 sm:text-base"
            />
            {search.length > 0 && (
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setOpenKey(null);
                }}
                className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-800 hover:text-white"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" strokeWidth={2} />
              </button>
            )}
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button
              type="button"
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
            </button>
            {FAQ_CATEGORIES.map((category) => (
              <button
                key={category.id}
                type="button"
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
              </button>
            ))}
          </div>

          {hasFilters && filtered.length > 0 && (
            <p className="mt-4 font-outfit text-xs text-zinc-500 sm:text-sm">
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
            </p>
          )}
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 md:px-8">
        <div className="mx-auto max-w-3xl">
          {filtered.length === 0 ? (
            <p className="py-12 text-center font-outfit text-sm text-zinc-500 sm:text-base">
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
            </p>
          ) : (
            <div className="space-y-12 sm:space-y-14">
              {filtered.map((category) => (
                <div key={category.id}>
                  <h2 className="font-outfit text-xs font-semibold uppercase tracking-[0.2em] text-mango sm:text-sm">
                    {category.title}
                  </h2>

                  <ul className="mt-4 list-none rounded-2xl border border-zinc-800/90 bg-zinc-950/30">
                    {category.items.map((item, index) => {
                      const key = `${category.id}-${index}`;
                      const isOpen = openKey === key;
                      const panelId = `faq-panel-${key}`;
                      const buttonId = `faq-button-${key}`;

                      return (
                        <li
                          key={key}
                          className="border-b border-zinc-800/90 last:border-b-0"
                        >
                          <button
                            type="button"
                            id={buttonId}
                            aria-expanded={isOpen}
                            aria-controls={panelId}
                            onClick={() =>
                              setOpenKey(isOpen ? null : key)
                            }
                            className="group flex w-full items-start gap-3 px-4 py-5 text-left transition sm:gap-4 sm:px-5 sm:py-6"
                          >
                            <span
                              className="mt-[0.55rem] h-2 w-2 shrink-0 rounded-full bg-mango shadow-[0_0_8px_rgba(255,163,10,0.45)]"
                              aria-hidden
                            />
                            <span className="min-w-0 flex-1 font-outfit text-sm font-semibold leading-snug text-white transition group-hover:text-mango sm:text-base">
                              {item.question}
                            </span>
                            <ChevronRight
                              className={`mt-0.5 h-5 w-5 shrink-0 text-zinc-500 transition-transform duration-300 ${
                                isOpen
                                  ? "rotate-90 text-mango"
                                  : "group-hover:text-mango/80"
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
                            className={
                              isOpen ? "block px-4 pb-5 sm:px-5 sm:pb-6" : "hidden"
                            }
                          >
                            <p className="border-l-2 border-mango/35 pl-5 font-outfit text-sm leading-relaxed text-zinc-400 sm:pl-6 sm:text-[0.9375rem]">
                              {item.answer}
                            </p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          )}

          <p className="mt-14 text-center font-outfit text-sm text-zinc-500 sm:mt-16">
            Still stuck?{" "}
            <Link
              href="/contact"
              className="font-semibold text-mango underline-offset-2 hover:underline"
            >
              Contact us
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
