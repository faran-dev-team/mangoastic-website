"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import { useEffect, useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function OrchardStoryMini() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageWrapperRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic image zoom-out + parallax
      gsap.fromTo(
        imageWrapperRef.current,
        {
          scale: 1.12,
          y: 40,
        },
        {
          scale: 1,
          y: -20,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // Cinematic overlay breathing
      gsap.to(".orchard-overlay-glow", {
        opacity: 0.6,
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Floating ambient glow
      gsap.to(".orchard-ambient-glow", {
        y: -30,
        x: 10,
        duration: 8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
    >
      <div className="relative min-h-[420px] w-full sm:min-h-[500px] md:min-h-[580px]">
        {/* Cinematic Background Image */}
        <div
          ref={imageWrapperRef}
          className="absolute inset-0 will-change-transform"
        >
          <Image
            src="/images/ochard.jpg"
            alt="Mangoastic orchard at golden hour"
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>

        {/* Ambient Golden Glow */}
        <div className="orchard-ambient-glow absolute left-[10%] top-[18%] h-[280px] w-[280px] rounded-full bg-amber-500/10 blur-3xl" />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/10" />

        <div className="orchard-overlay-glow absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(251,191,36,0.16),transparent_45%)] opacity-40" />

        {/* Cinematic Grain */}
        <div className="absolute inset-0 opacity-[0.08] mix-blend-soft-light">
          <div
            className="h-full w-full bg-repeat"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
            }}
          />
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex min-h-[420px] flex-col items-center justify-center px-4 py-10 sm:min-h-[500px] sm:px-6 md:min-h-[580px] md:px-10 lg:px-12">
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 1,
              ease: "easeOut",
            }}
            viewport={{ once: true, amount: 0.4 }}
            className="flex w-full max-w-2xl flex-col items-center text-center"
          >
            {/* Eyebrow */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.1,
                duration: 0.8,
              }}
              viewport={{ once: true }}
              className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 backdrop-blur-xl"
            >
              <span className="font-outfit text-[11px] uppercase tracking-[0.24em] text-white/70">
                Three Generations
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{
                opacity: 0,
                y: 40,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.2,
                duration: 1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              className="font-sirelia text-3xl font-normal leading-tight tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.4)] sm:text-4xl md:text-5xl"
            >
              The Orchard Story
            </motion.h2>

            {/* Animated Divider */}
            <motion.div
              initial={{
                width: 0,
                opacity: 0,
              }}
              whileInView={{
                width: 80,
                opacity: 1,
              }}
              transition={{
                delay: 0.45,
                duration: 1,
              }}
              viewport={{ once: true }}
              className="mt-5 h-px rounded-full bg-gradient-to-r from-transparent via-amber-400 to-transparent"
              aria-hidden
            />

            {/* Description */}
            <motion.p
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.55,
                duration: 1,
              }}
              viewport={{ once: true }}
              className="mx-auto mt-6 max-w-2xl text-pretty font-outfit text-[0.96rem] leading-relaxed text-white/90 sm:text-base md:text-lg md:leading-relaxed"
            >
              Three generations. One stretch of land near Multan. A few thousand
              trees that take 18 weeks to do what they do...
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                delay: 0.75,
                duration: 1,
              }}
              viewport={{ once: true }}
              className="mt-10 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:max-w-lg sm:flex-row sm:items-center sm:gap-4"
            >
              {/* Primary CTA */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 16,
                }}
                className="w-full"
              >
                <Link
                  href="/orchard"
                  className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-full bg-amber-500 px-7 py-3.5 font-outfit text-sm font-semibold text-black shadow-[0_10px_40px_-10px_rgba(251,191,36,0.45)] transition-all duration-500 hover:bg-amber-400 sm:min-w-[220px] sm:text-base"
                >
                  {/* Shine */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

                  <span className="relative z-10">Visit The Orchard</span>
                </Link>
              </motion.div>

              {/* Secondary CTA */}
              <motion.div
                whileHover={{
                  scale: 1.03,
                  y: -2,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                transition={{
                  type: "spring",
                  stiffness: 240,
                  damping: 16,
                }}
                className="w-full"
              >
                <Link
                  href="/orchard"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-6 py-3.5 font-outfit text-sm font-semibold text-white backdrop-blur-xl transition-all duration-500 hover:border-amber-400/50 hover:bg-white/[0.09] hover:text-amber-200 sm:min-w-[220px] sm:text-base"
                >
                  <span>The story</span>

                  <span
                    className="transition-transform duration-300 group-hover:translate-x-1"
                    aria-hidden
                  >
                    →
                  </span>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Cinematic Bottom Fade */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black to-transparent" />
      </div>
    </section>
  );
}
