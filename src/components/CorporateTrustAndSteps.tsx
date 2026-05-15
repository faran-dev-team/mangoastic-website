import Image from "next/image";

/** Trust strip hidden until at least this many client logos exist (no placeholders). */
const MIN_TRUST_LOGOS = 6;

/**
 * Companies we've gifted — replace dev placeholders with real logos under `public/images/corporate/`.
 * Section 2 hidden until `length >= MIN_TRUST_LOGOS`.
 */
const TRUST_LOGOS: { alt: string; src: string }[] = [
  { alt: "Client logo placeholder", src: "/images/hero.png" },
  { alt: "Client logo placeholder", src: "/images/hero.png" },
  { alt: "Client logo placeholder", src: "/images/hero.png" },
  { alt: "Client logo placeholder", src: "/images/hero.png" },
  { alt: "Client logo placeholder", src: "/images/hero.png" },
  { alt: "Client logo placeholder", src: "/images/hero.png" },
];

const STEPS = [
  {
    step: "01",
    text: "Tell us how many boxes, which cities, when you need them delivered.",
  },
  {
    step: "02",
    text: "We confirm pricing, custom packaging, branding, and the delivery window. Within 4 hours.",
  },
  {
    step: "03",
    text: "We deliver. To one office or 40. With confirmation calls to every recipient.",
  },
] as const;

function TrustStrip() {
  if (TRUST_LOGOS.length < MIN_TRUST_LOGOS) {
    return null;
  }

  const logos = TRUST_LOGOS.slice(0, 12);
  const track = [...logos, ...logos];

  return (
    <div
      className="border-b border-zinc-800/80 pb-14 sm:pb-16"
      aria-label="Companies we've gifted"
    >
      <p className="text-center font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-white sm:text-xs">
        Companies we&apos;ve gifted
      </p>

      <div className="relative mt-8 overflow-hidden py-2 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex w-max animate-press-marquee items-center hover:[animation-play-state:paused]">
          {track.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="mx-5 shrink-0 sm:mx-8 md:mx-10"
            >
              <div className="relative h-12 w-32 overflow-hidden rounded-lg border border-zinc-800/90 bg-zinc-900/80 shadow-sm sm:h-14 sm:w-36">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-cover object-center opacity-90 grayscale"
                  sizes="(max-width: 768px) 128px, 144px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CorporateTrustAndSteps() {
  const showTrust = TRUST_LOGOS.length >= MIN_TRUST_LOGOS;

  return (
    <section className="border-t border-zinc-800/80 bg-black px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <div className="mx-auto max-w-6xl">
        <TrustStrip />

        <div
          className={showTrust ? "pt-14 sm:pt-16" : undefined}
          aria-labelledby="corporate-how-it-works-heading"
        >
          <h2
            id="corporate-how-it-works-heading"
            className="font-sirelia text-2xl font-normal tracking-tight text-white sm:text-3xl"
          >
            How it <span className="text-mango">works</span> 
          </h2>

          <ol className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-6 lg:gap-10">
            {STEPS.map((item) => (
              <li
                key={item.step}
                className="border-t border-zinc-800 pt-6 sm:border-t-0 sm:border-l sm:border-zinc-800 sm:pl-6 sm:pt-0 first:sm:border-l-0 first:sm:pl-0"
              >
                <p
                  className="font-outfit text-3xl font-semibold tabular-nums text-mango sm:text-4xl"
                  aria-hidden
                >
                  {item.step}
                </p>
                <p className="mt-3 font-outfit text-sm leading-relaxed text-white sm:text-[0.9375rem] sm:leading-relaxed">
                  {item.text}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
