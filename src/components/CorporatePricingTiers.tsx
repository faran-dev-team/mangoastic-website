import Link from "next/link";

const CORPORATE_WHATSAPP_HREF =
  "https://wa.me/923214567890?text=" +
  encodeURIComponent(
    "Hi Mangoastic — I'd like a quote for 201+ corporate gift boxes.",
  );

const TIERS = [
  {
    quantity: "25–50 boxes",
    price: "PKR 4,800 per box",
    detail: "Standard custom-sleeve branding.",
    highlight: false,
    contact: false,
  },
  {
    quantity: "51–200 boxes",
    price: "PKR 4,400 per box",
    detail: "Full custom-printed box with your logo.",
    highlight: true,
    contact: false,
  },
  {
    quantity: "201+ boxes",
    price: "Contact us",
    detail:
      "Fully bespoke boxes, dedicated account manager, white-glove delivery.",
    highlight: false,
    contact: true,
  },
] as const;

const INCLUDED_NOTE =
  "All boxes include handwritten note (your text), recipient confirmation, and replacement guarantee.";

export default function CorporatePricingTiers() {
  return (
    <section
      className="border-t border-zinc-800/80 bg-black px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20"
      aria-labelledby="corporate-pricing-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
          Pricing
        </p>
        <h2
          id="corporate-pricing-heading"
          className="mt-3 font-sirelia text-2xl font-normal tracking-tight text-white sm:text-3xl"
        >
          Pricing tiers
        </h2>

        <ul className="mt-10 grid gap-6 sm:mt-12 lg:grid-cols-3 lg:gap-8">
          {TIERS.map((tier) => (
            <li
              key={tier.quantity}
              className={`group relative flex flex-col rounded-2xl border bg-zinc-950/60 p-6 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-white/55 hover:bg-zinc-950 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.85),0_0_0_1px_rgba(255,255,255,0.12)] sm:p-7 ${
                tier.highlight
                  ? "border-mango/45 pt-8 ring-1 ring-mango/15 sm:pt-9"
                  : "border-zinc-800/90"
              }`}
            >
              {tier.highlight && (
                <span className="absolute -top-3 right-6 inline-flex items-center rounded-full border border-mango/60 bg-mango px-3 py-1 font-outfit text-[10px] font-bold uppercase tracking-[0.14em] text-black shadow-md shadow-mango/25 sm:right-7">
                  Most popular
                </span>
              )}

              <p className="font-outfit text-xs font-semibold uppercase tracking-[0.14em] text-zinc-400">
                {tier.quantity}
              </p>

              {tier.contact ? (
                <Link
                  href={CORPORATE_WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 font-outfit text-xl font-semibold text-mango transition group-hover:text-mango/90 sm:text-2xl"
                >
                  {tier.price}
                </Link>
              ) : (
                <p className="mt-3 font-outfit text-xl font-semibold text-white sm:text-2xl">
                  {tier.price}
                </p>
              )}

              <p className="mt-4 flex-1 font-outfit text-sm leading-relaxed text-zinc-300 sm:text-[0.9375rem]">
                {tier.detail}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-10 max-w-3xl font-outfit text-sm leading-relaxed text-zinc-400 sm:mt-12 sm:text-center sm:text-base sm:leading-relaxed lg:mx-auto">
          {INCLUDED_NOTE}
        </p>
      </div>
    </section>
  );
}
