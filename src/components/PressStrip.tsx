"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

import { motion } from "framer-motion";

import { ensureGsapScrollTrigger, gsap } from "@/lib/gsap";

import { useInViewport } from "@/hooks/useInViewport";

ensureGsapScrollTrigger();

/** Minimum logos before the strip renders. */
const MIN_PRESS_LOGOS = 3;

/**
 * Replace with actual press logos later.
 */
const PRESS_LOGOS: { alt: string; src: string }[] = [
  { alt: "Press placement — replace with logo", src: "/images/box-family.jpg" },
  { alt: "Press placement — replace with logo", src: "/images/box-gift.jpg" },
  { alt: "Press placement — replace with logo", src: "/images/mango2.jpg" },
  { alt: "Press placement — replace with logo", src: "/images/seasonpass.jpg" },
];

export default function PressStrip() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { ref: marqueeRef, inView } = useInViewport<HTMLDivElement>();

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section cinematic reveal
      gsap.fromTo(
        ".press-reveal",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.3,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  if (PRESS_LOGOS.length < MIN_PRESS_LOGOS) {
    return null;
  }

  const track = [...PRESS_LOGOS, ...PRESS_LOGOS];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-t border-zinc-800/80 bg-zinc-950"
      aria-label="Press and media coverage"
    >
      {/* Ambient Glow */}
      <div className="press-glow pointer-events-none absolute left-[10%] top-1/2 h-[220px] w-[220px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(245,158,11,0.12),transparent_70%)]" aria-hidden />

      {/* Top Divider Glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-4 pt-12 text-center sm:px-6 sm:pt-14 md:px-8">
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          viewport={{ once: true }}
          className="press-reveal font-outfit text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500 sm:text-xs"
        >
          As seen in
        </motion.p>

        <motion.h2
          initial={{
            opacity: 0,
            y: 35,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.15,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          viewport={{ once: true }}
          className="press-reveal mt-3 font-sirelia text-2xl font-normal tracking-tight text-white sm:text-3xl"
        >
          Press
        </motion.h2>

        {/* Elegant Divider */}
        <motion.div
          initial={{
            opacity: 0,
            scaleX: 0,
          }}
          whileInView={{
            opacity: 1,
            scaleX: 1,
          }}
          transition={{
            delay: 0.35,
            duration: 1,
            ease: "easeOut",
          }}
          viewport={{ once: true }}
          className="press-reveal mx-auto mt-5 h-px w-20 origin-center bg-gradient-to-r from-transparent via-amber-500 to-transparent"
        />
      </div>

      {/* Marquee */}
      <div
        ref={marqueeRef}
        className="relative overflow-hidden py-8 sm:py-10 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      >
        {/* Shine Sweep */}
        <div className="pointer-events-none absolute inset-y-0 left-[-30%] z-20 w-[20%] skew-x-[-25deg] bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl press-shine" />

        <div
          className={`press-track flex w-max animate-press-marquee items-center hover:[animation-play-state:paused] ${
            !inView ? "[animation-play-state:paused]" : ""
          }`}
        >
          {track.map((logo, index) => (
            <motion.div
              key={`${logo.src}-${index}`}
              whileHover={{
                y: -5,
                scale: 1.05,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
              className="mx-6 flex h-12 w-28 shrink-0 items-center justify-center sm:mx-10 sm:h-14 sm:w-36 md:mx-14"
            >
              <div className="group relative h-full w-full opacity-70 transition duration-500 hover:opacity-100">
                {/* Glow Behind Logo */}
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

      {/* Bottom Ambient Fade */}
      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
