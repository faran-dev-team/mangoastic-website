import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const rows = [
  ["Single orchard", "Yes", "No", "No"],
  ["Picked within 24h", "Yes", "Sometimes", "Rarely"],
  ["Rejection rate at source", "~40%", "~5%", "~10%"],
  ["Branded gift packaging", "Yes", "No", "Basic"],
  ["Ripeness card per box", "Yes", "No", "No"],
  ["Replacement guarantee", "Yes", "No", "Limited"],
  ["Customer support response", "Under 8 min", "—", "Hours–days"],
];

function CellIcon({ value }: { value: string }) {
  if (value === "Yes" || value.startsWith("~") || value.includes("Under")) {
    return (
      <span className="inline-flex items-center gap-2 text-amber-400">
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden
          className="shrink-0"
        >
          <path
            d="M20 6L9 17l-5-5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        <span className="text-sm text-zinc-200">{value}</span>
      </span>
    );
  }

  if (value === "No") {
    return <span className="text-sm text-zinc-500">{value}</span>;
  }

  return <span className="text-sm text-zinc-400">{value}</span>;
}

export default function ComparisonTable() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12),transparent_70%)]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl">
        <FadeIn amount={0.35} className="mb-10 text-center">
          <p className="font-outfit text-sm font-semibold uppercase tracking-[0.24em] text-amber-400">
            Why it matters
          </p>

          <h3 className="mt-4 font-display text-3xl font-light leading-tight text-white sm:text-4xl lg:text-5xl">
            How Mangoastic compares.
          </h3>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 sm:text-base">
            A side-by-side comparison between Mangoastic, traditional mandi
            boxes, and generic online sellers.
          </p>
        </FadeIn>

        <FadeIn
          y={45}
          amount={0.15}
          className="hidden overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950/90 shadow-[0_30px_120px_-40px_rgba(0,0,0,0.85)] md:block"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/[0.04]">
                <th className="w-[34%] px-8 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Comparison
                </th>

                <th className="w-[22%] px-8 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-amber-400">
                  Mangoastic
                </th>

                <th className="w-[22%] px-8 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Mandi Box
                </th>

                <th className="w-[22%] px-8 py-5 text-left text-[11px] font-semibold uppercase tracking-[0.22em] text-zinc-500">
                  Online Seller
                </th>
              </tr>
            </thead>

            <tbody>
              {rows.map((r, index) => (
                <tr
                  key={r[0]}
                  className="group border-b border-white/5 transition-colors duration-500 hover:bg-white/[0.025]"
                >
                  <td className="px-8 py-6 align-top">
                    <div className="flex items-start gap-4">
                      <span className="mt-0.5 text-xs font-semibold tracking-[0.18em] text-amber-400/70">
                        0{index + 1}
                      </span>

                      <span className="text-sm leading-relaxed text-zinc-200 lg:text-[15px]">
                        {r[0]}
                      </span>
                    </div>
                  </td>

                  <td className="px-8 py-6 align-top">
                    <CellIcon value={r[1]} />
                  </td>

                  <td className="px-8 py-6 align-top">
                    <CellIcon value={r[2]} />
                  </td>

                  <td className="px-8 py-6 align-top">
                    <CellIcon value={r[3]} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </FadeIn>

        <Stagger
          className="space-y-4 md:hidden"
          stagger={0.08}
          amount={0.12}
        >
          {rows.map((row, index) => (
            <StaggerItem key={row[0]} y={24}>
              <article className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-zinc-950/90 p-5 shadow-[0_20px_80px_-40px_rgba(0,0,0,0.9)] transition duration-300 hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold tracking-[0.18em] text-amber-400/80">
                    0{index + 1}
                  </span>

                  <h4 className="text-base font-medium text-white">{row[0]}</h4>
                </div>

                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/40 px-4 py-3">
                    <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Mangoastic
                    </span>

                    <CellIcon value={row[1]} />
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/40 px-4 py-3">
                    <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Mandi Box
                    </span>

                    <CellIcon value={row[2]} />
                  </div>

                  <div className="flex items-center justify-between gap-4 rounded-2xl border border-white/5 bg-black/40 px-4 py-3">
                    <span className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                      Online Seller
                    </span>

                    <CellIcon value={row[3]} />
                  </div>
                </div>
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
