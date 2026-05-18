"use client";

import Image from "next/image";
import Link from "next/link";

import { motion, Variants } from "framer-motion";
import { useEffect, useRef } from "react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const boxes = [
  {
    slug: "mangoastic-classic-7kg",
    name: "Mangoastic Classic",
    weight: "7kg of pure Chaunsa",
    price: "PKR 3,400",
    description: "Our hero. The box we'd send our mother.",
    image: "/images/mango1.jpg",
  },
  {
    slug: "mangoastic-family-10kg",
    name: "Mangoastic Family",
    weight: "10kg of Chaunsa, for a household",
    price: "PKR 4,500",
    description: "Five evenings of dessert solved.",
    image: "/images/mango2.jpg",
  },
  {
    slug: "mixed-premium-discovery-7kg",
    name: "Mixed Premium Discovery",
    weight: "7kg, three varieties",
    price: "PKR 3,900",
    description: "Chaunsa, Anwar Ratol, Sindhri. Taste the season.",
    image: "/images/mango3.jpg",
  },
  {
    slug: "gift-edit-5kg",
    name: "The Gift Edit",
    weight: "5kg in a signed box",
    price: "PKR 5,500",
    description: "For when a card isn't enough.",
    image: "/images/mango4.jpg",
  },
] as const;

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const cardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
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

      gsap.to(".floating-glow", {
        y: -30,
        duration: 6,
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
      className="relative overflow-hidden bg-black px-4 pt-16 pb-4 sm:px-6 sm:pt-20 md:px-8 md:pt-24 lg:pt-28"
    >
      {/* Ambient Background */}
      <div className="floating-glow absolute left-[-10%] top-[10%] h-[320px] w-[320px] rounded-full bg-mango/10 blur-3xl" />

      <div className="absolute bottom-[-20%] right-[-10%] h-[360px] w-[360px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mx-auto mb-5 flex w-fit items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-xl"
        >
          <span className="font-outfit text-[11px] uppercase tracking-[0.22em] text-zinc-300">
            Curated Seasonal Selection
          </span>
        </motion.div>

        {/* Heading */}
        <h2 className="season-heading text-center font-sirelia text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
          This Season&apos;s Boxes
        </h2>

        {/* Product Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-7 lg:mt-14 lg:grid-cols-4 lg:gap-6"
        >
          {boxes.map((box, index) => (
            <motion.article
              key={box.slug}
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
              className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-white/5 bg-zinc-950/50 backdrop-blur-xl"
            >
              {/* Premium Glow */}
              <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <div className="absolute inset-0 bg-gradient-to-br from-mango/10 via-transparent to-orange-500/5" />
              </div>

              {/* Product Image */}
              <Link
                href={`/products/${box.slug}`}
                className="relative block aspect-[16/10] overflow-hidden bg-zinc-900 sm:aspect-[3/4] lg:aspect-[5/5]"
              >
                {/* Cinematic Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

                <motion.div
                  whileHover={{
                    scale: 1.08,
                  }}
                  transition={{
                    duration: 1.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-full w-full"
                >
                  <Image
                    src={box.image}
                    alt={`${box.name} — ${box.weight}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </motion.div>

                {/* Shine Sweep */}
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                  <div className="absolute -left-[120%] top-0 h-full w-[80%] rotate-12 bg-gradient-to-r from-transparent via-white/20 to-transparent transition-all duration-1000 group-hover:left-[140%]" />
                </div>
              </Link>

              {/* Content */}
              <div className="relative z-10 flex flex-1 flex-col px-4 pt-4 pb-4">
                <div className="flex flex-1 flex-col">
                  {/* Product Name */}
                  <h3 className="font-outfit text-xs font-semibold uppercase tracking-[0.14em] text-white sm:text-sm">
                    {box.name}
                  </h3>

                  {/* Weight */}
                  <p className="mt-2 font-outfit text-[11px] leading-relaxed text-zinc-400 sm:text-xs">
                    {box.weight}
                  </p>

                  {/* Price */}
                  <p className="mt-3 font-outfit text-lg font-semibold tracking-tight text-mango">
                    {box.price}
                  </p>

                  {/* Description */}
                  <p className="mt-2 line-clamp-2 font-outfit text-[11px] leading-relaxed text-zinc-300 sm:text-xs">
                    {box.description}
                  </p>
                </div>

                {/* CTA */}
                <Link
                  href={`/products/${box.slug}`}
                  className="group/button relative mt-auto inline-flex items-center justify-center overflow-hidden rounded-full border border-white/10 bg-white/[0.03] px-4 py-3 font-outfit text-[11px] font-semibold uppercase tracking-[0.12em] text-white transition-all duration-500 hover:border-mango/30 hover:bg-mango/5 hover:text-mango"
                >
                  {/* Button Shine */}
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover/button:translate-x-full" />

                  <span className="relative z-10 flex items-center gap-2">
                    View Box
                    <span className="transition-transform duration-300 group-hover/button:translate-x-1">
                      →
                    </span>
                  </span>
                </Link>
              </div>

              {/* Border Glow */}
              <div className="absolute inset-0 rounded-[28px] border border-transparent transition-all duration-700 group-hover:border-mango/20" />
            </motion.article>
          ))}
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}
