"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

import { motion, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";
import { WHATSAPP_HREF } from "@/data/contact";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic background slow zoom
      gsap.to(imageRef.current, {
        scale: 1.08,
        duration: 12,
        ease: "power2.out",
      });

      // Pointer Parallax Effect (throttled via requestAnimationFrame)
      const hero = heroRef.current;

      if (!hero) return;

      // Disable parallax on touch devices
      const isTouch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);
      if (isTouch) return;

      let rafId: number | null = null;
      const pos = { x: 0, y: 0 };

      const handlePointerMove = (e: PointerEvent) => {
        pos.x = (e.clientX / window.innerWidth - 0.5) * 20;
        pos.y = (e.clientY / window.innerHeight - 0.5) * 20;

        if (rafId !== null) return;

        rafId = requestAnimationFrame(() => {
          gsap.to(imageRef.current, {
            x: pos.x,
            y: pos.y,
            duration: 1.2,
            ease: "power3.out",
          });
          rafId = null;
        });
      };

      hero.addEventListener("pointermove", handlePointerMove);

      return () => {
        hero.removeEventListener("pointermove", handlePointerMove);
        if (rafId) cancelAnimationFrame(rafId);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const container: Variants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.18,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        // use a named easing to satisfy framer-motion types cleanly
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      ref={heroRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* Background Image */}
      <div
        ref={imageRef}
        className="absolute inset-0 scale-100 will-change-transform"
      >
        <Image
          src="/images/hero.jpg"
          alt="Mango Orchard"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </div>

      {/* Premium Gradient Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Ambient Glow */}
      <div className="absolute left-[-10%] top-[10%] h-[400px] w-[400px] rounded-full bg-mango/20 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[-10%] h-[300px] w-[300px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Noise Texture */}
      <div className="absolute inset-0 opacity-[0.06] mix-blend-soft-light">
        <div
          className="h-full w-full bg-repeat"
          style={{
            backgroundImage:
              "url('https://www.transparenttextures.com/patterns/asfalt-dark.png')",
          }}
        />
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-10">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="relative z-10 max-w-xl"
        >
          {/* Eyebrow */}
          <motion.div
            variants={fadeUp}
            className="mb-5 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            <span className="font-outfit text-xs uppercase tracking-[0.22em] text-zinc-300">
              Farm Fresh • Export Quality
            </span>
          </motion.div>

          {/* Heading */}
          <div className="overflow-hidden">
            <motion.h1
              variants={fadeUp}
              className="whitespace-pre-line font-sirelia text-5xl font-normal leading-[0.95] tracking-[-0.03em] text-white sm:text-6xl md:text-7xl"
            >
              {`The mango.
Untouched.`}
            </motion.h1>
          </div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            className="mt-7 max-w-md font-outfit text-sm leading-relaxed text-zinc-200 sm:text-base"
          >
            Pakistan&apos;s most loved fruit, delivered directly from our
            orchard to your doorstep.
            <br />
            <span className="mt-2 inline-block text-mango">
              No mandi. No middleman. No compromise.
            </span>
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center"
          >
            {/* Primary CTA */}
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-mango px-8 py-4 font-outfit text-sm font-semibold text-black shadow-[0_0_40px_-10px_rgba(255,163,10,0.55)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_-8px_rgba(255,163,10,0.8)]"
            >
              {/* Shine Effect */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              <span className="relative z-10 flex items-center gap-2.5">
                Order This Season&apos;s Box
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  strokeWidth={2.5}
                />
              </span>
            </Link>

            {/* Secondary CTA */}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/5 px-8 py-4 font-outfit text-sm font-semibold text-white backdrop-blur-xl transition-all duration-500 hover:border-mango/40 hover:bg-white/10 hover:text-mango hover:shadow-[0_0_35px_-12px_rgba(255,163,10,0.45)]"
            >
              <MessageCircle
                className="h-4 w-4 transition-transform duration-300 group-hover:scale-110"
                strokeWidth={2}
              />

              <span>Or order on WhatsApp</span>
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
