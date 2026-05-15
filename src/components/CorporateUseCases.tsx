import {
  Award,
  Gift,
  Handshake,
  Heart,
  TrendingUp,
  UserPlus,
  type LucideIcon,
} from "lucide-react";

const USE_CASES: { label: string; icon: LucideIcon }[] = [
  { label: "Eid gifting for teams and clients", icon: Gift },
  { label: "Mid-year recognition", icon: Award },
  { label: "Wedding-season corporate gifting", icon: Heart },
  { label: "Client appreciation", icon: Handshake },
  { label: "New-hire welcome gifts", icon: UserPlus },
  { label: "Investor relations gifts", icon: TrendingUp },
];

export default function CorporateUseCases() {
  return (
    <section
      className="border-t border-zinc-800/80 bg-black px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20"
      aria-labelledby="corporate-use-cases-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
          Use cases
        </p>
        <h2
          id="corporate-use-cases-heading"
          className="mt-3 font-sirelia text-2xl font-normal tracking-tight text-white sm:text-3xl"
        >
          Built for every occasion
        </h2>

        <ul className="mt-10 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:gap-5">
          {USE_CASES.map(({ label, icon: Icon }) => (
            <li
              key={label}
              className="group flex items-center gap-4 rounded-xl border border-zinc-800/90 bg-zinc-950/50 px-5 py-4 transition duration-300 hover:border-white/40 hover:shadow-[0_12px_32px_-16px_rgba(0,0,0,0.75)] sm:px-6 sm:py-5"
            >
              <span
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-zinc-700/90 bg-zinc-900/90 transition duration-300 group-hover:border-mango/35 group-hover:bg-mango/10"
                aria-hidden
              >
                <Icon
                  className="h-5 w-5 text-white transition-colors duration-300 group-hover:text-mango"
                  strokeWidth={1.75}
                />
              </span>
              <span className="font-outfit text-sm leading-snug text-white sm:text-[0.9375rem]">
                {label}
              </span>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-2xl font-sirelia text-xl font-normal leading-snug text-white sm:mt-12 sm:text-2xl lg:text-[1.65rem] lg:leading-snug">
          Whatever the occasion, mangoes do what{" "}
          <span className="text-mango italic">flowers don&apos;t</span>.
        </p>
      </div>
    </section>
  );
}
