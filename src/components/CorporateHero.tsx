"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import { motion, Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { corporateWhatsappLink } from "@/data/contact";

const CORPORATE_WHATSAPP_HREF = corporateWhatsappLink(
  "Hi Mangoastic — I'd like a quote for corporate gifting (boxes, logo, delivery).",
);

/** Add your PDF to `public/documents/mangoastic-corporate-catalogue.pdf` */
const CORPORATE_CATALOGUE_PDF = "/documents/mangoastic-corporate-catalogue.pdf";

const container: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.18 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: "easeOut" },
  },
};

export default function CorporateHero() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(imageRef.current, {
        scale: 1.08,
        duration: 12,
        ease: "power2.out",
      });

      const hero = heroRef.current;
      if (!hero) return;

      const isTouch =
        typeof window !== "undefined" &&
        ("ontouchstart" in window || navigator.maxTouchPoints > 0);
      if (isTouch) return;

      let rafId: number | null = null;
      const pos = { x: 0, y: 0 };

      const handlePointerMove = (e: PointerEvent) => {
        pos.x = (e.clientX / window.innerWidth - 0.5) * 16;
        pos.y = (e.clientY / window.innerHeight - 0.5) * 16;

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

  return (
    <section
      ref={heroRef}
      className="relative min-h-[72vh] overflow-hidden bg-black sm:min-h-[78vh] lg:min-h-[82vh]"
    >
      <motion.div
        ref={imageRef}
        className="absolute inset-0 scale-100 will-change-transform"
      >
        <Image
          src="/images/box-gift.jpg"
          alt="Mangoastic corporate gift boxes with custom branding"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/55"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      <motion.div
        className="absolute left-[-8%] top-[12%] h-[280px] w-[280px] rounded-full bg-mango/15 blur-3xl"
        animate={{ y: [0, -18, 0], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative mx-auto flex min-h-[72vh] max-w-6xl items-center px-4 py-20 sm:min-h-[78vh] sm:px-6 sm:py-24 lg:min-h-[82vh] lg:px-8">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-outfit text-[11px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs"
          >
            Corporate gifting
          </motion.p>

          <motion.h1
            variants={fadeUp}
            className="mt-4 font-sirelia text-[1.75rem] font-normal leading-[1.12] tracking-tight text-white sm:mt-5 sm:text-4xl md:text-[2.75rem] md:leading-[1.08] lg:text-6xl"
          >
            Mangoes that make HR look like a{" "}
            <span className="text-mango">hero</span>.
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-xl font-outfit text-[0.9375rem] leading-relaxed text-white sm:mt-6 sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed"
          >
            Premium boxes with your company&apos;s logo, hand-delivered to your
            team, clients, and partners across Pakistan. One contact. One
            invoice. One thing off your plate.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <a
              href={CORPORATE_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-full bg-mango px-8 py-4 font-outfit text-sm font-semibold text-black shadow-[0_0_40px_-10px_rgba(255,163,10,0.55)] transition-all duration-500 hover:scale-[1.03] hover:shadow-[0_0_60px_-8px_rgba(255,163,10,0.8)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango"
            >
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full " />
              <span className="relative z-10 flex items-center gap-2.5">
                Get a Quote on WhatsApp
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  strokeWidth={2.5}
                />
              </span>
            </a>

            <motion.div whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={CORPORATE_CATALOGUE_PDF}
                target="_blank"
                rel="noopener noreferrer"
                download
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 font-outfit text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/10 hover:shadow-[0_0_35px_-12px_rgba(255,163,10,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
              >
                <Download
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:scale-110"
                  strokeWidth={2.25}
                />
                Download Corporate Catalogue (PDF)
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 1 }}
        className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black to-transparent sm:h-40"
      />
    </section>
  );
}
