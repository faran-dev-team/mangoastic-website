"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function FooterCta() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion) return;

      // Main reveal sequence
      gsap.fromTo(
        ".footer-reveal",
        {
          opacity: 0,
          y: 60,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power3.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );

      // Ambient glow drift
      gsap.to(".footer-glow", {
        y: -22,
        x: 16,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Soft urgency pulse
      gsap.to(".footer-urgent", {
        opacity: 0.8,
        scale: 1.015,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0f0e0c] px-4 py-16 sm:px-6 sm:py-20 md:py-24"
    >
      {/* Ambient Glow */}
      <div className="footer-glow absolute left-1/2 top-1/3 h-[340px] w-[340px] -translate-x-1/2 rounded-full bg-amber-500/10 blur-3xl" />

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,black_90%)]" />

      <div className="relative z-10 mx-auto max-w-3xl text-center">
        {/* Eyebrow */}
        <p className="footer-reveal font-outfit text-[11px] font-semibold uppercase tracking-[0.3em] text-[#FDB022] sm:text-xs">
          100 days only
        </p>

        {/* Heading */}
        <h2 className="footer-reveal mt-5 font-sirelia text-3xl font-normal leading-tight tracking-tight text-white sm:mt-6 sm:text-4xl md:text-5xl">
          This season is 100 days.
        </h2>

        {/* Urgent line */}
        <p className="footer-urgent footer-reveal mt-2 font-sirelia text-3xl italic leading-tight text-[#FDB022] sm:text-4xl md:text-5xl">
          Don&apos;t miss it.
        </p>

        {/* CTA Buttons */}
        <div className="footer-reveal mt-12 flex flex-col items-center justify-center gap-4 sm:mt-14 sm:flex-row sm:gap-5">
          {/* Primary */}
          <motion.div
            whileHover={
              prefersReducedMotion ? undefined : { y: -3, scale: 1.03 }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          >
            <Link
              href="/shop"
              className="group relative inline-flex min-w-[200px] items-center justify-center overflow-hidden rounded-full bg-[#FDB022] px-8 py-3.5 font-outfit text-xs font-bold uppercase tracking-[0.15em] text-black shadow-[0_0_28px_-4px_rgba(253,176,34,0.55)] transition sm:text-sm"
            >
              {/* Shine */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
              <span className="relative z-10">Order now</span>
            </Link>
          </motion.div>

          {/* Secondary */}
          <motion.div
            whileHover={
              prefersReducedMotion ? undefined : { y: -3, scale: 1.02 }
            }
            whileTap={prefersReducedMotion ? undefined : { scale: 0.98 }}
          >
            <Link
              href="/season-pass"
              className="inline-flex min-w-[200px] items-center justify-center rounded-full border border-white/35 bg-transparent px-8 py-3.5 font-outfit text-sm font-semibold text-white transition hover:border-white/60 hover:bg-white/5"
            >
              Reserve Your Season Pass
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
