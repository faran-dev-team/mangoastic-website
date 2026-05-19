"use client";

import { ChevronDown, ChevronUp } from "lucide-react";

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
  return (
    <div className="mt-8 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(47,39,24,0.08)] sm:p-8">
      {/* Desktop Tabs */}
      <div className="hidden md:block">
        <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
          {tabs.map((tab, index) => (
            <button
              key={tab.title}
              type="button"
              onClick={() => onActiveTabChange(index)}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                activeTabIndex === index
                  ? "bg-amber-50 text-zinc-950"
                  : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950"
              }`}
            >
              {tab.title}
            </button>
          ))}
        </div>
        <div className="pt-6">
          <h3 className="font-sirelia text-2xl text-zinc-950">
            {tabs[activeTabIndex].title}
          </h3>
          <p className="mt-3 max-w-4xl font-outfit text-base leading-relaxed text-zinc-700">
            {tabs[activeTabIndex].content}
          </p>
        </div>
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
              <button
                type="button"
                onClick={() => onMobileOpenTabChange(isOpen ? null : index)}
                className="flex w-full items-center justify-between px-4 py-4 text-left"
              >
                <span className="font-semibold text-zinc-950">{tab.title}</span>
                {isOpen ? (
                  <ChevronUp className="h-4 w-4 text-zinc-500" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-zinc-500" />
                )}
              </button>
              {isOpen ? (
                <div className="px-4 pb-4">
                  <p className="font-outfit text-sm leading-relaxed text-zinc-700">
                    {tab.content}
                  </p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}
