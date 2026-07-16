import {
  CalendarDays,
  CreditCard,
  Package,
  PauseCircle,
  type LucideIcon,
} from "lucide-react";

import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const STEPS: {
  step: string;
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    step: "01",
    title: "Pick your delivery day",
    text: "Choose your delivery day (Wednesday, Friday, or Sunday).",
    icon: CalendarDays,
  },
  {
    step: "02",
    title: "Pay once for the season",
    text: "Pay PKR 34,500 once. That's it for the whole season.",
    icon: CreditCard,
  },
  {
    step: "03",
    title: "Peak fruit, every week",
    text: "A 7kg box of whatever's in peak that week — Sindhri, Chaunsa, Anwar Ratol, Black Chaunsa — arrives every week, for 12 weeks.",
    icon: Package,
  },
  {
    step: "04",
    title: "Pause anytime",
    text: "Pause for a week if you're travelling. Skip is free. Just message us by Wednesday.",
    icon: PauseCircle,
  },
];

function StepBody({ item }: { item: (typeof STEPS)[number] }) {
  return (
    <p className="mt-3 font-outfit text-[0.9375rem] leading-[1.65] text-zinc-400 sm:text-base sm:leading-relaxed">
      {item.step === "02" ? (
        <>
          Pay <span className="font-semibold text-mango">PKR 34,500</span> once.
          That&apos;s it for the whole season.
        </>
      ) : item.step === "03" ? (
        <>
          A 7kg box of whatever&apos;s in peak that week —{" "}
          <span className="text-zinc-300">
            Sindhri, Chaunsa, Anwar Ratol, Black Chaunsa
          </span>{" "}
          — arrives every week, for 12 weeks.
        </>
      ) : (
        item.text
      )}
    </p>
  );
}

export default function SeasonPassHowItWorks() {
  return (
    <section
      className="relative overflow-hidden border-t border-zinc-800/80 bg-black px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24"
      aria-labelledby="season-pass-how-heading"
    >
      <div
        className="pointer-events-none absolute left-[-8%] top-[12%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(255,163,10,0.12),transparent_70%)]"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <FadeIn className="mx-auto max-w-2xl text-center sm:max-w-3xl">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
            How it works
          </p>
          <h2
            id="season-pass-how-heading"
            className="mt-4 font-sirelia text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-[2.5rem]"
          >
            Four steps to a{" "}
            <span className="text-mango italic">full season</span>
          </h2>
          <p className="mt-4 font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base sm:leading-relaxed">
            One pass. Twelve deliveries. No reordering every week — just mangoes
            when they&apos;re at their best.
          </p>
        </FadeIn>

        <Stagger
          className="mt-12 grid gap-5 sm:mt-14 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:gap-7"
          stagger={0.14}
          amount={0.15}
        >
          {STEPS.map((item) => {
            const Icon = item.icon;
            return (
              <StaggerItem key={item.step} y={36}>
                <article className="group relative cursor-default overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/90 p-6 transition duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-7 lg:p-8">
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                    <div className="absolute -left-[120%] top-0 h-full w-[80%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[140%]" />
                  </div>

                  <div className="relative z-10 flex flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span className="font-outfit text-[11px] font-bold uppercase tracking-[0.16em] text-mango">
                        Step {item.step}
                      </span>
                      <span
                        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/90 transition-colors duration-300 group-hover:border-mango/40 group-hover:bg-mango/10"
                        aria-hidden
                      >
                        <Icon
                          className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-mango"
                          strokeWidth={1.75}
                        />
                      </span>
                    </div>

                    <h3 className="mt-5 font-sirelia text-xl font-normal leading-snug text-white sm:text-[1.35rem]">
                      {item.title}
                    </h3>

                    <StepBody item={item} />
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
