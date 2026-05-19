"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function ShopHero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageWrapRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Cinematic intro zoom
      gsap.fromTo(
        imageWrapRef.current,
        {
          scale: 1.12,
        },
        {
          scale: 1,
          duration: 2,
          ease: "power3.out",
        },
      );

      // Overlay fade
      gsap.fromTo(
        overlayRef.current,
        {
          opacity: 0,
        },
        {
          opacity: 1,
          duration: 1.4,
          ease: "power2.out",
        },
      );

      // Subtle parallax on scroll
      gsap.to(imageWrapRef.current, {
        yPercent: 10,
        scale: 1.08,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      // Overlay darkens slightly while scrolling
      gsap.to(overlayRef.current, {
        backgroundColor: "rgba(0,0,0,0.78)",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[56vh] overflow-hidden bg-black sm:min-h-[60vh] lg:min-h-[64vh]"
    >
      {/* Background image */}
      <div
        ref={imageWrapRef}
        className="absolute inset-0 will-change-transform"
      >
        <Image
          src="/images/hero-shop.jpg"
          alt="Mango boxes in orchard"
          fill
          priority
          className="object-cover"
        />
      </div>

      {/* Overlay */}
      <div ref={overlayRef} className="absolute inset-0 bg-black/65" />

      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-500/10 blur-3xl" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex min-h-[56vh] max-w-6xl items-center px-6 py-16 sm:min-h-[60vh] lg:min-h-[64vh]">
        <div className="max-w-3xl">
          {/* Label */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="font-outfit text-sm font-semibold uppercase tracking-[0.16em] text-amber-300"
          >
            Shop
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{
              duration: 1.2,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-3 font-sirelia text-4xl leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            <span className="block">This season&apos;s</span>
            <span className="block text-amber-300">boxes.</span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 1,
              delay: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-6 max-w-2xl font-outfit text-base leading-relaxed text-zinc-200 sm:text-lg"
          >
            Picked yesterday in our orchard near Multan. Graded twice. Packed by
            hand. At your door tomorrow.
          </motion.p>

          {/* Decorative line */}
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "120px", opacity: 1 }}
            transition={{
              duration: 1,
              delay: 0.7,
              ease: "easeOut",
            }}
            className="mt-8 h-px bg-gradient-to-r from-amber-400 via-amber-300 to-transparent"
          />
        </div>
      </div>
    </section>
  );
}
