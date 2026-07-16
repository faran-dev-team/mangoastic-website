import FadeIn from "@/components/motion/FadeIn";
import { Stagger, StaggerItem } from "@/components/motion/Stagger";

const reasons = [
  {
    number: "01",
    title: "We grow them.",
    description:
      "Every Chaunsa, Anwar Ratol, and Sindhri in our boxes came from our own orchard near Multan. There is no middleman. No mandi auction. No wholesale broker. This single fact is the reason our mangoes taste like they do.",
  },
  {
    number: "02",
    title: "We pick the morning before.",
    description:
      "The mango in your box was on the tree yesterday. Not last week. Not 'when the truck arrived.' Yesterday. This is what fresh actually means.",
  },
  {
    number: "03",
    title: "We reject 40 percent.",
    description:
      "Most mango sellers grade for size. We grade for taste. Anything that isn't right — bruised, undersized, oddly-shaped, not yet sweet enough — goes back. We'd rather ship fewer boxes than ship the wrong ones.",
  },
  {
    number: "04",
    title: "We pack like it's a gift.",
    description:
      "Kraft-paper tissue. Individual foam nets. Hand-stamped ripeness card. Handwritten note on first orders. Because this is going to a home. Not a warehouse.",
  },
  {
    number: "05",
    title: "We control delivery.",
    description:
      "We dispatch boxes to match transit time. Karachi orders ship slightly less ripe so they arrive perfect. Islamabad orders go out the morning they're packed. You don't get a mango that 'spent a few days in a cargo van.'",
  },
  {
    number: "06",
    title: "We answer when you call.",
    description:
      "WhatsApp under 8 minutes. Phone, picked up. Problem with a box? Replaced, no questions. We are a small team and we are easy to find.",
  },
];

export default function SixReasons() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 overflow-hidden" aria-hidden>
        <div className="pointer-events-none absolute left-[-10rem] top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12),transparent_70%)]" />
        <div className="pointer-events-none absolute bottom-0 right-[-12rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(251,146,60,0.12),transparent_70%)]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <FadeIn amount={0.3} className="mb-16 text-center">
          <p className="font-outfit text-sm font-normal uppercase tracking-widest text-amber-400 sm:text-base">
            The Difference
          </p>

          <h2 className="mt-4 font-display text-3xl font-light text-white sm:text-4xl md:text-5xl">
            Six things that make a Mangoastic box different.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-outfit text-base leading-relaxed text-zinc-400 sm:text-lg">
            Some of these are about the fruit. Some are about everything around
            it.
          </p>
        </FadeIn>

        <Stagger
          className="grid gap-8 md:grid-cols-2 lg:gap-12"
          stagger={0.12}
          amount={0.1}
        >
          {reasons.map((reason) => (
            <StaggerItem key={reason.number} y={40}>
              <article className="group relative overflow-hidden border border-zinc-800 bg-zinc-950/90 p-8 transition duration-300 hover:-translate-y-2 hover:border-amber-400/40 motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-10">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative mb-6">
                  <div className="flex items-baseline gap-4">
                    <span className="font-display text-4xl font-light text-amber-400 transition-transform duration-300 group-hover:scale-105 motion-reduce:transition-none sm:text-5xl">
                      {reason.number}
                    </span>

                    <h3 className="font-display text-lg font-light text-white sm:text-xl md:text-2xl">
                      {reason.title}
                    </h3>
                  </div>
                </div>

                <p className="relative font-outfit text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-relaxed">
                  {reason.description}
                </p>

                <div className="mt-6 h-[2px] w-0 bg-gradient-to-r from-amber-400 to-transparent opacity-0 transition-all duration-400 ease-out group-hover:w-20 group-hover:opacity-100 motion-reduce:transition-none" />
              </article>
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
