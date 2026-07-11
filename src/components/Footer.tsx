"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { motion, Variants } from "framer-motion";

const shopLinks = [
  { label: "Saroli", href: "/products/saroli" },
  { label: "Desheri", href: "/products/desheri" },
  { label: "White Chaunsa", href: "/products/white-chausa", highlight: true },
  { label: "Black Chaunsa", href: "/products/black-chausa" },
  { label: "Anwar Ratol", href: "/products/anwar-ratol" },
  { label: "Sindhri", href: "/products/sindhri" },
  { label: "Langra", href: "/products/langra" },
  { label: "Season Pass", href: "/season-pass" },
] as const;

const discoverLinks = [
  { label: "The Orchard", href: "/orchard" },
  { label: "Why Mangoastic", href: "/why" },
  { label: "Season Pass", href: "/season-pass" },
] as const;

const helpLinks = [
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Corporate", href: "/corporate" },
] as const;

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.11,
      delayChildren: 0.05,
    },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export default function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  function onNotify(e: FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSent(true);
  }

  return (
    <motion.footer
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
      className="w-full min-w-0 bg-black text-zinc-400"
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 sm:py-20 lg:px-12 lg:py-24 xl:px-16">
        <div className="grid w-full grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-10 lg:grid-cols-12 lg:gap-x-14 lg:gap-y-10">
          {/* Brand + Newsletter */}
          <motion.div variants={item} className="lg:col-span-5 lg:pr-6">
            <p className="font-sirelia text-3xl font-normal text-white sm:text-4xl">
              Mangoastic
            </p>

            <p className="mt-4 max-w-md font-outfit text-sm leading-relaxed text-zinc-400 sm:text-[0.9375rem]">
              Pakistan's single-orchard premium mango brand. From our family
              farm near Multan. Delivered same-day across Islamabad, Rawalpindi,
              Lahore, and Karachi.
            </p>

            <p className="mt-10 font-outfit text-[10px] font-semibold uppercase leading-snug tracking-[0.18em] text-amber-500/85 sm:text-[11px]">
              Get one message before each variety drops
            </p>

            <form
              onSubmit={onNotify}
              className="mt-4 flex max-w-md flex-col gap-3 sm:flex-row sm:items-stretch"
            >
              <label htmlFor="footer-newsletter-email" className="sr-only">
                Email for variety alerts
              </label>
              <motion.input
                whileFocus={{ scale: 1.01 }}
                id="footer-newsletter-email"
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="min-h-[48px] flex-1 rounded-full border border-zinc-600 bg-zinc-900/90 px-5 font-outfit text-sm text-white placeholder:text-zinc-500 outline-none transition focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/30"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="min-h-[48px] shrink-0 rounded-full bg-[#FDB022] px-6 font-outfit text-xs font-bold uppercase tracking-[0.12em] text-black shadow-[0_0_24px_-4px_rgba(253,176,34,0.45)] transition hover:bg-[#ffc53d] sm:px-8"
              >
                {sent ? "You're on the list" : "Notify me"}
              </motion.button>
            </form>
          </motion.div>

          {/* Shop */}
          <motion.div variants={item} className="sm:col-span-1 lg:col-span-2">
            <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500/85">
              Shop
            </p>
            <ul className="mt-5 space-y-3 font-outfit text-sm">
              {shopLinks.map((link) => (
                <li key={link.href}>
                  <motion.div whileHover={{ x: 4 }} className="w-fit">
                    <Link
                      href={link.href}
                      className={
                        "highlight" in link && link.highlight
                          ? "text-amber-400/95 transition hover:text-amber-300"
                          : "text-zinc-400 transition hover:text-white"
                      }
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Discover */}
          <motion.div variants={item} className="sm:col-span-1 lg:col-span-2">
            <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500/85">
              Discover
            </p>
            <ul className="mt-5 space-y-3 font-outfit text-sm">
              {discoverLinks.map((link) => (
                <li key={link.label}>
                  <motion.div whileHover={{ x: 4 }} className="w-fit">
                    <Link
                      href={link.href}
                      className="text-zinc-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Help */}
          <motion.div variants={item} className="sm:col-span-1 lg:col-span-2">
            <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500/85">
              Help
            </p>
            <ul className="mt-5 space-y-3 font-outfit text-sm">
              {helpLinks.map((link) => (
                <li key={link.label}>
                  <motion.div whileHover={{ x: 4 }} className="w-fit">
                    <Link
                      href={link.href}
                      className="text-zinc-400 transition hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  );
}
