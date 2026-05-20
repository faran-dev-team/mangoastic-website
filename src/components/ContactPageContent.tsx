"use client";

import {
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

/** Swap display numbers before launch; wa.me links use current routing. */
const WHATSAPP_D2C_DISPLAY = "+92 XXX XXXXXXX";
const WHATSAPP_D2C_HREF = "https://wa.me/923214567890";

const WHATSAPP_CORPORATE_DISPLAY = "+92 XXX XXXXXXX";
const WHATSAPP_CORPORATE_HREF =
  "https://wa.me/923214567890?text=" +
  encodeURIComponent("Hi Mangoastic — I'd like to get in touch.");

const EMAIL_HELLO = "hello@mangoistic.com";
const EMAIL_PRESS = "press@mangoistic.com";

const OFFICE_ADDRESS_PLACEHOLDER =
  "Islamabad office address — confirmed by Operations Lead before launch";

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: "easeOut" },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: "easeOut" },
  },
};

type ContactCardProps = {
  icon: LucideIcon;
  title: string;
  children: React.ReactNode;
  note?: string;
  href?: string;
  external?: boolean;
  highlight?: boolean;
  className?: string;
};

function CardShine() {
  return (
    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
      <div className="absolute -left-[120%] top-0 h-full w-[80%] rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[140%]" />
    </div>
  );
}

function ContactCard({
  icon: Icon,
  title,
  children,
  note,
  href,
  external,
  highlight,
  className = "",
}: ContactCardProps) {
  const cardClass = `group relative flex gap-4 overflow-hidden rounded-2xl border bg-zinc-950/40 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-colors duration-300 sm:p-6 ${className} ${highlight
    ? "border-mango/25 hover:border-mango/45 hover:bg-mango/[0.06] hover:shadow-[0_0_0_1px_rgba(255,163,10,0.15),0_16px_48px_rgba(0,0,0,0.4)]"
    : "border-zinc-800/90 hover:border-zinc-600/80 hover:bg-zinc-900/55"
    }`;

  const inner = (
    <>
      <div
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 ${highlight
          ? "bg-gradient-to-br from-mango/10 via-transparent to-orange-500/5"
          : "bg-gradient-to-br from-white/[0.04] via-transparent to-transparent"
          }`}
      />
      <CardShine />
      <div
        className={`relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${highlight
          ? "border-mango/40 bg-mango/15 text-mango group-hover:border-mango/60 group-hover:bg-mango/20"
          : "border-zinc-700/80 bg-zinc-900/80 text-zinc-300 group-hover:border-zinc-500 group-hover:bg-zinc-800/90"
          }`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
      </div>
      <div className="relative z-10 min-w-0 flex-1">
        <p className="font-outfit text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 transition-colors duration-300 group-hover:text-zinc-400 sm:text-xs">
          {title}
        </p>
        <div className="mt-2 font-outfit text-base font-semibold leading-snug text-white sm:text-lg">
          {children}
        </div>
        {note ? (
          <p className="mt-2 font-outfit text-sm leading-relaxed text-zinc-500">
            {note}
          </p>
        ) : null}
      </div>
    </>
  );

  if (href) {
    const linkProps = external
      ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
      : {};
    return (
      <motion.a
        href={href}
        variants={cardVariants}
        whileHover={{ y: -4 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className={cardClass}
        {...linkProps}
      >
        {inner}
      </motion.a>
    );
  }

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cardClass}
    >
      {inner}
    </motion.article>
  );
}

export default function ContactPageContent() {
  return (
    <div className="overflow-x-hidden bg-black text-white">
      <section className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[280px] w-[min(100%,520px)] -translate-x-1/2 rounded-full bg-mango/6 blur-3xl" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs"
          >
            Contact
          </motion.p>
          <motion.h1
            variants={fadeUp}
            className="mt-4 font-sirelia text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl"
          >
            We&apos;re easy to{" "}
            <span className="text-mango italic">find.</span>
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mt-4 font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base"
          >
            WhatsApp is fastest for orders. Email for everything else. We reply
            during the hours listed below.
          </motion.p>
        </motion.div>
      </section>

      <section className="relative overflow-hidden px-4 pb-20 sm:px-6 sm:pb-24 md:px-8 md:pb-28">
        <div className="pointer-events-none absolute right-0 top-[8%] h-[240px] w-[240px] translate-x-1/3 rounded-full bg-orange-500/8 blur-3xl" />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative z-10 mx-auto max-w-4xl"
        >
          <motion.div
            variants={containerVariants}
            className="grid min-w-0 grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 [&>*]:min-w-0"
          >
            <ContactCard
              icon={MessageCircle}
              title="WhatsApp (D2C)"
              href={WHATSAPP_D2C_HREF}
              external
              highlight
              note="Replies within 8 minutes, 9 AM–11 PM"
            >
              <span className="transition-colors duration-300 group-hover:text-mango">
                {WHATSAPP_D2C_DISPLAY}
              </span>
            </ContactCard>

            <ContactCard
              icon={MessageCircle}
              title="WhatsApp (Corporate)"
              href={WHATSAPP_CORPORATE_HREF}
              external
              highlight
              note="Replies within 4 hours, business hours"
            >
              <span className="transition-colors duration-300 group-hover:text-mango">
                {WHATSAPP_CORPORATE_DISPLAY}
              </span>
            </ContactCard>

            <ContactCard
              icon={Mail}
              title="Email"
              href={`mailto:${EMAIL_HELLO}`}
              note="Orders, delivery, and general questions"
            >
              <span className="break-all transition-colors duration-300 group-hover:text-mango">
                {EMAIL_HELLO}
              </span>
            </ContactCard>

            <ContactCard
              icon={Mail}
              title="Press / collaborations"
              href={`mailto:${EMAIL_PRESS}`}
              note="Media, partnerships, and brand enquiries"
            >
              <span className="break-all transition-colors duration-300 group-hover:text-mango">
                {EMAIL_PRESS}
              </span>
            </ContactCard>

            <ContactCard
              icon={Building2}
              title="Office address"
              className="md:col-span-2"
            >
              <span className="break-words font-normal text-zinc-300 sm:text-base">
                {OFFICE_ADDRESS_PLACEHOLDER}
              </span>
            </ContactCard>
          </motion.div>

          <motion.article
            variants={cardVariants}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 260, damping: 22 }}
            className="group relative mt-4 flex gap-4 overflow-hidden rounded-2xl border border-zinc-800/90 bg-zinc-950/40 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition-colors duration-300 hover:border-zinc-600/80 hover:bg-zinc-900/55 sm:mt-5 sm:p-6"
          >
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent" />
            <CardShine />
            <div className="relative z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/80 text-zinc-300 transition-colors duration-300 group-hover:border-zinc-500 group-hover:bg-zinc-800/90">
              <MapPin className="h-5 w-5" strokeWidth={2} aria-hidden />
            </div>
            <div className="relative z-10 min-w-0 flex-1">
              <p className="font-outfit text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
                Orchard
              </p>
              <p className="mt-2 break-words font-outfit text-base leading-relaxed text-zinc-300 sm:text-[1.0625rem]">
                Visits by invitation only, for{" "}
                <span className="font-semibold text-white">
                  Mangoistic Platinum
                </span>{" "}
                loyalty members.
              </p>
              <p className="mt-3 flex items-start gap-2 font-outfit text-sm text-zinc-500">
                <Sparkles
                  className="mt-0.5 h-4 w-4 shrink-0 text-mango"
                  strokeWidth={2}
                  aria-hidden
                />
                Near Multan — our single orchard, not open to the public.
              </p>
            </div>
          </motion.article>

          <motion.p
            variants={fadeUp}
            className="mt-12 text-center font-outfit text-sm text-zinc-500 sm:mt-14"
          >
            Common questions?{" "}
            <Link
              href="/faq"
              className="font-semibold text-mango underline-offset-2 hover:underline"
            >
              Read the FAQ
            </Link>{" "}
            or{" "}
            <Link
              href="/corporate"
              className="font-semibold text-mango underline-offset-2 hover:underline"
            >
              corporate gifting
            </Link>
            .
          </motion.p>
        </motion.div>
      </section>
    </div>
  );
}
