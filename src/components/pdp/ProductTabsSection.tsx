"use client";

import { ChevronDown } from "lucide-react";
import { motion, Variants, useReducedMotion } from "framer-motion";

export type Tab = {
  title: string;
  content: string;
};

type ProductTabsSectionProps = {
  tabs: Tab[];
  activeTabIndex: number;
  onActiveTabChange: (index: number) => void;
  mobileOpenTabIndex: number | null;
  onMobileOpenTabChange: (index: number | null) => void;
};

export function ProductTabsSection({
  tabs,
  activeTabIndex,
  onActiveTabChange,
  mobileOpenTabIndex,
  onMobileOpenTabChange,
}: ProductTabsSectionProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <div className="mt-8 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(47,39,24,0.08)] sm:p-8">
      {/* Desktop Tabs */}
      <div className="hidden md:block">
        <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
          {tabs.map((tab, index) => (
            <motion.button
              key={tab.title}
              type="button"
              onClick={() => onActiveTabChange(index)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTabIndex === index
                  ? "bg-amber-50 text-zinc-950"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950"
              }`}
              whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
              whileHover={shouldReduceMotion ? undefined : { scale: 1.01 }}
              transition={{ duration: 0.12, ease: "easeOut" }}
            >
              {tab.title}
            </motion.button>
          ))}
        </div>
        <motion.div
          className="pt-6"
          key={activeTabIndex}
          variants={fadeUp}
          initial={shouldReduceMotion ? undefined : "hidden"}
          animate={shouldReduceMotion ? undefined : "show"}
        >
          <h3 className="font-sirelia text-2xl text-zinc-950">
            {tabs[activeTabIndex].title}
          </h3>
          <p className="mt-3 max-w-4xl font-outfit text-base leading-relaxed text-zinc-700">
            {tabs[activeTabIndex].content}
          </p>
        </motion.div>
      </div>

      {/* Mobile Accordion */}
      <div className="space-y-3 md:hidden">
        {tabs.map((tab, index) => {
          const isOpen = mobileOpenTabIndex === index;
          return (
            <div
              key={tab.title}
              className="overflow-hidden rounded-2xl border border-zinc-200"
            >
              <motion.button
                type="button"
                onClick={() => onMobileOpenTabChange(isOpen ? null : index)}
                className="flex w-full items-center justify-between px-4 py-4 text-left"
                whileTap={
                  shouldReduceMotion
                    ? undefined
                    : { backgroundColor: "rgb(250, 250, 250)" }
                }
                transition={{ duration: 0.12, ease: "easeOut" }}
              >
                <span className="font-semibold text-zinc-950">{tab.title}</span>
                <motion.div
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                >
                  <ChevronDown className="h-4 w-4 text-zinc-500" />
                </motion.div>
              </motion.button>
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={
                  isOpen
                    ? {
                        height: "auto",
                        opacity: 1,
                        transition: { duration: 0.25, ease: "easeOut" },
                      }
                    : {
                        height: 0,
                        opacity: 0,
                        transition: { duration: 0.25, ease: "easeOut" },
                      }
                }
                className="px-4 pb-4"
              >
                <p className="font-outfit text-sm leading-relaxed text-zinc-700">
                  {tab.content}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
