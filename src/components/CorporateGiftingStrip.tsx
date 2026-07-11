"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { motion } from "framer-motion";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import { corporateWhatsappLink } from "@/data/contact";

gsap.registerPlugin(ScrollTrigger);

const CORPORATE_WHATSAPP_HREF = corporateWhatsappLink(
  "Hi Mangoastic — I'd like a quote for corporate gifting.",
);

export default function CorporateGiftingStrip() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main card cinematic reveal
      gsap.fromTo(
        ".corporate-card",
        {
          opacity: 0,
          y: 80,
          scale: 0.96,
          filter: "blur(10px)",
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 78%",
          },
        },
      );

      // Ambient glow floating
      gsap.to(".corporate-glow", {
        y: -30,
        x: 12,
        duration: 7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      // Number pulse
      gsap.to(".corporate-number", {
        opacity: 0.75,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
        stagger: 0.15,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-black px-4 py-14 sm:px-6 sm:py-16 md:py-20"
    >
      {/* Ambient Background Glow */}
      <div className="corporate-glow absolute left-[8%] top-[15%] h-[260px] w-[260px] rounded-full bg-amber-500/10 blur-3xl" />

      <div className="absolute bottom-[-10%] right-[5%] h-[320px] w-[320px] rounded-full bg-orange-500/10 blur-3xl" />

      {/* Section Divider */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <motion.div
        whileHover={{
          y: -6,
        }}
        transition={{
          duration: 0.5,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="corporate-card relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#121212]/90 p-8 shadow-[0_35px_120px_-28px_rgba(0,0,0,0.82)] backdrop-blur-2xl sm:p-10 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-16 lg:gap-y-8 lg:p-14"
      >
        {/* Glass Glow Layer */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(251,191,36,0.08),transparent_35%)]" />

        <div className="absolute inset-0 opacity-[0.03]">
          <div
            className="h-full w-full bg-repeat"
            style={{
              backgroundImage:
                "url('https://www.transparenttextures.com/patterns/asfalt-light.png')",
            }}
          />
        </div>

        {/* LEFT */}
        <div className="relative z-10 lg:pr-4">
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
              duration: 0.7,
            }}
            viewport={{ once: true }}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 backdrop-blur-xl"
          >
            <span className="font-outfit text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-400/90 sm:text-xs">
              Corporate gifting
            </span>
          </motion.div>

          {/* Heading */}
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
            className="mt-5 font-sirelia text-[2rem] font-normal leading-[1.1] tracking-tight text-white sm:text-[2.4rem] md:text-[2.7rem] lg:text-[3rem]"
          >
            Sending mangoes to{" "}
            <span className="corporate-number text-amber-400 italic">40</span>{" "}
            <span className="corporate-number text-amber-400 italic">
              people?
            </span>{" "}
            400?
          </motion.h2>
        </div>

        {/* RIGHT */}
        <div className="relative z-10 mt-10 lg:mt-0">
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
              delay: 0.3,
              duration: 1,
            }}
            viewport={{ once: true }}
            className="max-w-xl font-outfit text-sm leading-relaxed text-white/90 sm:text-base sm:leading-relaxed md:text-[1.05rem]"
          >
            We do corporate gifting with custom packaging, your logo, and one
            point of contact who actually answers their phone.
          </motion.p>

          {/* CTA */}
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
              delay: 0.45,
              duration: 1,
            }}
            viewport={{ once: true }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
          >
            <motion.a
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
              href={CORPORATE_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full bg-amber-500 px-7 py-4 font-outfit text-xs font-semibold uppercase tracking-[0.14em] text-black shadow-[0_10px_40px_-10px_rgba(251,191,36,0.45)] transition-all duration-500 hover:bg-amber-400 hover:shadow-[0_14px_50px_-10px_rgba(251,191,36,0.55)] sm:text-sm"
            >
              {/* Shine Sweep */}
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />

              <MessageCircle
                className="relative z-10 h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]"
                strokeWidth={2}
              />

              <span className="relative z-10">Get a quote on WhatsApp</span>
            </motion.a>

            {/* Secondary CTA (Optional Later)
            <Link
              href="/corporate"
              className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 font-outfit text-sm font-semibold text-white backdrop-blur-xl transition-all duration-500 hover:border-amber-400/40 hover:bg-white/[0.06] hover:text-amber-200"
            >
              Learn more
            </Link>
            */}
          </motion.div>
        </div>

        {/* Bottom Glow */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-amber-500/[0.04] to-transparent" />
      </motion.div>
    </section>
  );
}
