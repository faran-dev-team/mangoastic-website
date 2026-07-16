"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";
import { useInViewport } from "@/hooks/useInViewport";

const MIN_TRUST_LOGOS = 3;

const TRUST_LOGOS: { alt: string; src: string }[] = [
  { alt: "Client logo — replace with brand asset", src: "/images/box-family.jpg" },
  { alt: "Client logo — replace with brand asset", src: "/images/box-gift.jpg" },
  { alt: "Client logo — replace with brand asset", src: "/images/mango2.jpg" },
  { alt: "Client logo — replace with brand asset", src: "/images/seasonpass.jpg" },
  { alt: "Client logo — replace with brand asset", src: "/images/box-family.jpg" },
  { alt: "Client logo — replace with brand asset", src: "/images/box-gift.jpg" },
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

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const stepVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

function TrustStrip() {
  const { ref: marqueeRef, inView } = useInViewport<HTMLDivElement>();

  if (TRUST_LOGOS.length < MIN_TRUST_LOGOS) return null;

  const track = [...TRUST_LOGOS, ...TRUST_LOGOS];

  return (
    <motion.div
      variants={fadeUp}
      className="border-b border-zinc-800/80 pb-12 sm:pb-14"
      aria-label="Companies we've gifted"
    >
      <div className="text-center">
        <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500 sm:text-xs">
          Trusted by teams across Pakistan
        </p>
        <h3 className="mt-3 font-sirelia text-2xl font-normal tracking-tight text-white sm:text-3xl">
          Companies we&apos;ve gifted
        </h3>
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          className="mx-auto mt-5 h-px w-20 origin-center bg-gradient-to-r from-transparent via-amber-500 to-transparent"
        />
      </div>

      <div
        ref={marqueeRef}
        className="relative mt-8 overflow-hidden py-6 sm:py-8 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        <div className="pointer-events-none absolute inset-y-0 left-[-30%] z-20 w-[20%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl corp-trust-shine" />

        <div
          className={`corp-trust-track flex w-max animate-press-marquee items-center hover:[animation-play-state:paused] ${
            !inView ? "[animation-play-state:paused]" : ""
          }`}
        >
          {track.map((logo, index) => (
            <motion.div
              key={`${logo.src}-${index}`}
              whileHover={{ y: -5, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 220, damping: 18 }}
              className="mx-6 flex h-12 w-28 shrink-0 items-center justify-center sm:mx-10 sm:h-14 sm:w-36 md:mx-14"
            >
              <div className="group relative h-full w-full opacity-70 transition duration-500 hover:opacity-100">
                <div className="absolute inset-0 rounded-xl bg-amber-500/0 transition duration-500 group-hover:bg-amber-500/10" />
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain object-center grayscale transition duration-500 group-hover:scale-[1.04] group-hover:grayscale-0"
                  sizes="(max-width: 768px) 112px, 144px"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function CorporateTrustAndSteps() {
  const showTrust = TRUST_LOGOS.length >= MIN_TRUST_LOGOS;

  return (
    <section className="relative overflow-hidden border-t border-zinc-800/80 bg-black px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
      <div className="pointer-events-none absolute left-[-10%] top-[8%] h-[260px] w-[260px] rounded-full bg-[radial-gradient(circle,rgba(255,163,10,0.12),transparent_70%)]" aria-hidden />
      <div className="pointer-events-none absolute bottom-[-15%] right-[-8%] h-[300px] w-[300px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.12),transparent_70%)]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        className="relative z-10 mx-auto max-w-6xl"
      >
        <TrustStrip />

        <motion.div
          className={showTrust ? "pt-14 sm:pt-16" : undefined}
          aria-labelledby="corporate-how-it-works-heading"
        >
          <motion.h2
            variants={fadeUp}
            id="corporate-how-it-works-heading"
            className="font-sirelia text-2xl font-normal tracking-tight text-white sm:text-3xl"
          >
            How it <span className="text-mango">works</span>
          </motion.h2>

          <motion.ol
            variants={containerVariants}
            className="mt-10 grid gap-8 sm:mt-12 sm:grid-cols-3 sm:gap-6 lg:gap-10"
          >
            {STEPS.map((item) => (
              <motion.li
                key={item.step}
                variants={stepVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 220, damping: 18 }}
                className="group relative list-none cursor-default overflow-hidden border-t border-zinc-800 pt-6 sm:border-t-0 sm:border-l sm:border-zinc-800 sm:pl-6 sm:pt-0 first:sm:border-l-0 first:sm:pl-0"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute -left-[120%] top-0 h-full w-[80%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[140%]" />
                </div>

                <p
                  className="relative z-10 font-outfit text-3xl font-semibold tabular-nums text-mango sm:text-4xl"
                  aria-hidden
                >
                  {item.step}
                </p>
                <p className="relative z-10 mt-3 font-outfit text-sm leading-relaxed text-white sm:text-[0.9375rem] sm:leading-relaxed">
                  {item.text}
                </p>
              </motion.li>
            ))}
          </motion.ol>
        </motion.div>
      </motion.div>
    </section>
  );
}
