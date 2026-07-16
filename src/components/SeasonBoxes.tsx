"use client";

import Image from "next/image";
import Link from "next/link";

import { motion, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

import { ensureGsapScrollTrigger, gsap } from "@/lib/gsap";

import { formatPKR, getVarietyCards } from "@/data/products";

ensureGsapScrollTrigger();

const varieties = getVarietyCards();

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: "easeOut",
    },
  },
};

export default function SeasonBoxes() {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".season-heading",
        {
          opacity: 0,
          y: 50,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
          },
        },
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-4 pt-16 pb-4 sm:px-6 sm:pt-20 md:px-8 md:pt-24 lg:pt-28"
    >
      <div className="floating-glow pointer-events-none absolute left-[-10%] top-[10%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(255,163,10,0.12),transparent_70%)]" aria-hidden />
      <div className="pointer-events-none absolute bottom-[-20%] right-[-10%] h-[360px] w-[360px] rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.12),transparent_70%)]" aria-hidden />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto mb-5 flex w-fit items-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5"
        >
          <span className="font-outfit text-[11px] uppercase tracking-[0.22em] text-zinc-300">
            Shop by Variety
          </span>
        </motion.div>

        <h2 className="season-heading text-center font-sirelia text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          This Season&apos;s Mangoes
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-center font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base">
          Seven varieties from our single orchard near Multan. Choose your
          favourite — available in 5&nbsp;kg and 8&nbsp;kg boxes.
        </p>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:grid-cols-3 xl:grid-cols-4"
        >
          {varieties.map((variety) => (
            <motion.article
              key={variety.slug}
              variants={cardVariants}
              whileHover={{
                y: -10,
                scale: 1.02,
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 18,
              }}
              className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/5 bg-zinc-950/90"
            >
              <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-mango/10 via-transparent to-orange-500/5" />
              </div>

              <Link
                href={`/products/${variety.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-zinc-900 sm:aspect-[4/3]"
              >
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                <motion.div
                  whileHover={{ scale: 1.08 }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full w-full"
                >
                  <Image
                    src={variety.image}
                    alt={`${variety.name} mangoes`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </motion.div>

                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute -left-[120%] top-0 h-full w-[80%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-[140%]" />
                </div>
              </Link>

              <div className="relative z-10 flex flex-1 flex-col px-4 pt-4 pb-4">
                <div className="flex flex-1 flex-col">
                  <h3 className="font-outfit text-xs font-semibold uppercase tracking-[0.14em] text-white sm:text-sm">
                    {variety.name}
                  </h3>

                  <p className="mt-2 font-outfit text-[11px] leading-relaxed text-zinc-400 sm:text-xs">
                    {variety.tagline}
                  </p>

                  <div className="mt-4 space-y-1.5 rounded-2xl border border-white/5 bg-white/[0.03] px-3 py-2.5">
                    <div className="flex items-center justify-between font-outfit text-xs">
                      <span className="font-medium uppercase tracking-wider text-zinc-500">
                        5 KG
                      </span>
                      <span className="font-semibold text-mango">
                        {formatPKR(variety.pricing["5kg"])}
                      </span>
                    </div>
                    <div className="flex items-center justify-between font-outfit text-xs">
                      <span className="font-medium uppercase tracking-wider text-zinc-500">
                        8 KG
                      </span>
                      <span className="font-semibold text-mango">
                        {formatPKR(variety.pricing["8kg"])}
                      </span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/products/${variety.slug}`}
                  className="group/button relative mt-4 inline-flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 font-outfit text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-500 hover:border-mango/30 hover:bg-mango/5 hover:text-mango"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover/button:translate-x-full" />
                  <span className="relative z-10 flex items-center gap-2">
                    View Variety
                    <span className="transition-transform duration-300 group-hover/button:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </div>

              <div className="absolute inset-0 rounded-[28px] border border-transparent transition-all duration-700 group-hover:border-mango/20" />
            </motion.article>
          ))}
        </motion.div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
