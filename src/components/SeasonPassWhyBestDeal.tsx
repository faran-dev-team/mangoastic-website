import {
  BadgePercent,
  Gift,
  Layers,
  Sparkles,
  Zap,
  type LucideIcon,
} from "lucide-react";

const BENEFITS: { text: string; icon: LucideIcon; highlight?: string }[] = [
  {
    text: "16% cheaper than buying each box individually.",
    icon: BadgePercent,
    highlight: "16%",
  },
  {
    text: "You'll taste varieties most people miss because they only order Chaunsa.",
    icon: Layers,
  },
  {
    text: "Priority dispatch — Season Pass holders pack first.",
    icon: Zap,
  },
  {
    text: "End-of-season thank-you gift (we don't say what. It's a surprise).",
    icon: Gift,
  },
  {
    text: "First access to next year's season.",
    icon: Sparkles,
  },
];

function BenefitText({
  text,
  highlight,
}: {
  text: string;
  highlight?: string;
}) {
  if (!highlight || !text.includes(highlight)) {
    return <>{text}</>;
  }
  const [before, after] = text.split(highlight);
  return (
    <>
      {before}
      <span className="font-semibold text-mango">{highlight}</span>
      {after}
    </>
  );
}

export default function SeasonPassWhyBestDeal() {
  return (
    <section
      className="border-t border-zinc-800/80 bg-zinc-950/40 px-4 py-16 sm:px-6 sm:py-20 md:px-8 md:py-24"
      aria-labelledby="season-pass-why-heading"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto max-w-2xl text-center sm:max-w-3xl">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
            Season pass value
          </p>
          <h2
            id="season-pass-why-heading"
            className="mt-4 font-sirelia text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-[2.5rem]"
          >
            Why it&apos;s the{" "}
            <span className="text-mango italic">best deal</span>
          </h2>
        </div>

        <ul className="mx-auto mt-12 max-w-3xl space-y-4 sm:mt-14 sm:space-y-5">
          {BENEFITS.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.text}
                className="group flex gap-4 rounded-2xl border border-zinc-800/80 bg-black/40 px-5 py-5 transition duration-300 hover:border-white/30 hover:bg-zinc-900/50 hover:shadow-[0_12px_40px_-16px_rgba(0,0,0,0.8)] sm:gap-5 sm:px-6 sm:py-6"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/90 transition duration-300 group-hover:border-mango/40 group-hover:bg-mango/10"
                  aria-hidden
                >
                  <Icon
                    className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-mango"
                    strokeWidth={1.75}
                  />
                </span>
                <p className="pt-2 font-outfit text-[0.9375rem] leading-[1.65] text-zinc-300 sm:text-base sm:leading-relaxed">
                  <BenefitText text={item.text} highlight={item.highlight} />
                </p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
