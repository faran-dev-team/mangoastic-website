import Image from "next/image";

/** Minimum logos before the strip renders. */
const MIN_PRESS_LOGOS = 3;

/**
 * Press logos (3–6). Shown in grayscale; swap for real SVG/PNG under /public when PR is live.
 * Temporary: all use hero.png so the marquee is visible in dev — replace each `src` + `alt`.
 */
const PRESS_LOGOS: { alt: string; src: string }[] = [
  { alt: "Press placement — replace with logo", src: "/images/hero.png" },
  { alt: "Press placement — replace with logo", src: "/images/hero.png" },
  { alt: "Press placement — replace with logo", src: "/images/hero.png" },
  { alt: "Press placement — replace with logo", src: "/images/hero.png" },
];

export default function PressStrip() {
  if (PRESS_LOGOS.length < MIN_PRESS_LOGOS) {
    return null;
  }

  const track = [...PRESS_LOGOS, ...PRESS_LOGOS];

  return (
    <section
      className="border-t border-zinc-800/80 bg-zinc-950/80"
      aria-label="Press and media coverage"
    >
      <div className="mx-auto max-w-6xl px-4 pb-3 pt-10 text-center sm:px-6 sm:pt-12 md:px-8">
        <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500 sm:text-xs">
          As seen in
        </p>
        <h2 className="mt-2 font-sirelia text-xl font-normal text-white sm:text-2xl">
          Press
        </h2>
      </div>

      <div
        className="relative overflow-hidden py-6 sm:py-8 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <div className="flex w-max animate-press-marquee items-center hover:[animation-play-state:paused]">
          {track.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              className="mx-6 flex h-11 w-28 shrink-0 items-center justify-center sm:mx-10 sm:h-12 sm:w-36 md:mx-12"
            >
              <div className="group relative h-full w-full opacity-80 transition duration-300 hover:opacity-100">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain object-center grayscale transition duration-300 group-hover:grayscale-0"
                  sizes="(max-width: 768px) 112px, 144px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
