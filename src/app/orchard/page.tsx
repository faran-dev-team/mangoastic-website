"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import { ORCHARD_GALLERY_IMAGES } from "@/data/orchard-gallery";

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.9,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
} as unknown as Variants;

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export default function OrchardPage() {
  return (
    <div className="bg-black text-white">
      {/* HERO */}
      <section className="relative isolate overflow-hidden">
        <motion.div
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          <Image
            src="/images/ochard.jpg"
            alt="Mangoastic orchard at sunrise"
            fill
            priority
            loading="eager"
            className="object-cover object-[center_68%] sm:object-[center_62%] lg:object-[center_58%]"
            sizes="100vw"
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.42)_44%,rgba(0,0,0,0.86)_100%)]"
          />
        </motion.div>

        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-end px-6 pb-10 pt-24 sm:px-8 sm:pb-14 lg:px-10 lg:pb-16">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-3xl"
          >
            <motion.p
              custom={0}
              variants={fadeUp}
              className="font-outfit text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-400 sm:text-xs"
            >
              The Orchard
            </motion.p>

            <motion.h1
              custom={0.15}
              variants={fadeUp}
              className="mt-4 max-w-2xl font-sirelia text-4xl leading-[1.02] tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-[4.75rem] lg:leading-[0.95]"
            >
              Before this was a brand, it was a piece of land.
            </motion.h1>

            <motion.p
              custom={0.3}
              variants={fadeUp}
              className="mt-5 max-w-2xl font-outfit text-base leading-relaxed text-white/86 sm:text-lg lg:max-w-xl"
            >
              Sunrise over the trees. Mist on the leaves. Nothing else on the
              page needs to compete with it.
            </motion.p>

            <motion.div custom={0.45} variants={fadeUp} className="mt-8">
              <Link
                href="#orchard-story"
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3.5 font-outfit text-sm font-semibold uppercase tracking-[0.12em] text-black shadow-[0_18px_60px_-18px_rgba(251,191,36,0.7)] transition-all duration-500 hover:scale-[1.03] hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              >
                Read the story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* STORY */}
      <section
        id="orchard-story"
        className="border-t border-white/10 bg-black px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="mx-auto max-w-6xl"
        >
          <motion.p
            variants={fadeUp}
            className="font-outfit text-xs font-semibold uppercase tracking-[0.24em] text-amber-400/90"
          >
            The story
          </motion.p>

          <motion.h2
            variants={fadeUp}
            className="mt-3 max-w-3xl font-sirelia text-3xl leading-tight text-white sm:text-4xl"
          >
            My grandfather planted the first Chaunsa trees on this orchard in
            1968.
          </motion.h2>

          <div className="mt-8 max-w-4xl space-y-8 font-outfit text-lg leading-[1.85] text-white/82 sm:text-[1.15rem]">
            {[
              "He didn't know they'd outlive him. He didn't know we'd still be here. He didn't know that some of the trees he put in the ground that year would still be giving us their best fruit in their 58th season.",
              "For most of those years, our family did what every Pakistani orchard family does: we sold the harvest at the mandi, took whatever the wholesalers paid, and watched our mangoes leave anonymously, packed into someone else's truck, sold under someone else's name, eaten by someone who'd never know where they came from.",
              "Mangoastic exists because we got tired of that. Tired of the mandi. Tired of the middleman. Tired of the slow erasure of a thing we'd grown for three generations into a commodity called 'fruit, premium grade A.'",
              "So in 2026, we cut out the chain. We hand-pick at dawn. We grade twice - once at the tree, once on the line. We reject about 40 percent of every day's pick. We pack our mangoes ourselves, in boxes we designed, with cards we wrote, and we ship them to your door under our own name.",
              "This is a slow business. There are no shortcuts. The trees don't care about our growth rate. They give us 18 weeks a year, and what we do with those 18 weeks is the whole story.",
              "Welcome to the orchard.",
            ].map((paragraph, index) => (
              <motion.p
                key={index}
                variants={fadeUp}
                className="will-change-transform"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>
      </section>

      {/* GALLERY */}
      <section
        id="orchard-gallery"
        className="border-t border-white/10 bg-black px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="max-w-2xl"
          >
            <p className="font-outfit text-xs font-semibold uppercase tracking-[0.24em] text-amber-400/90">
              Photo gallery
            </p>

            <h2 className="mt-3 font-sirelia text-3xl leading-tight text-white sm:text-4xl">
              The orchard, in frames.
            </h2>

            <p className="mt-4 font-outfit text-base leading-relaxed text-white/72 sm:text-lg">
              Every variety from our orchard this season — Chaunsa, Sindhri,
              Anwar Ratol, Desheri, Langra, and more.
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
            variants={staggerContainer}
            className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"
          >
            {ORCHARD_GALLERY_IMAGES.map((image) => (
              <motion.figure
                key={image.src}
                variants={fadeUp}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.45 }}
                className="group overflow-hidden rounded-[1.25rem] border border-white/10 bg-white/[0.03] sm:rounded-[1.6rem]"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.08]"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />

                  <div className="absolute inset-x-0 bottom-0 px-3 py-3 sm:px-4 sm:py-4">
                    <figcaption className="translate-y-3 font-outfit text-[10px] italic text-white/82 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 sm:text-xs">
                      {image.caption}
                    </figcaption>
                  </div>
                </div>
              </motion.figure>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="border-t border-white/10 bg-black px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="mx-auto max-w-7xl"
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              [
                "ONE ORCHARD.",
                "Every mango in every Mangoastic box came from our trees. Not a partner orchard. Not 'sourced from the region.' Ours.",
              ],
              [
                "REJECTED TWICE.",
                "Once at the tree, once on the line. 40% of every day's pick never reaches you. That's the cost of getting it right.",
              ],
              [
                "DELIVERED FAST.",
                "Picked yesterday. At your door tomorrow. No fruit warehouse in between.",
              ],
            ].map(([title, copy]) => (
              <motion.div
                key={title}
                variants={fadeUp}
                whileHover={{
                  y: -10,
                  borderColor: "rgba(251,191,36,0.25)",
                }}
                transition={{ duration: 0.35 }}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)] backdrop-blur-sm"
              >
                <p className="font-outfit text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-400">
                  {title}
                </p>

                <p className="mt-4 font-outfit text-base leading-relaxed text-white/78">
                  {copy}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="border-t border-white/10 bg-black px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto flex max-w-5xl flex-col items-stretch justify-between gap-8 rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:gap-10 lg:px-10"
        >
          <div className="max-w-2xl">
            <p className="font-outfit text-xs font-semibold uppercase tracking-[0.24em] text-amber-400/90">
              CTA out
            </p>

            <h2 className="mt-3 font-sirelia text-3xl leading-tight text-white sm:text-4xl">
              Now that you know where the boxes come from.
            </h2>

            <p className="mt-4 font-outfit text-base leading-relaxed text-white/76 sm:text-lg">
              Pick the box that fits your week, then head to shop.
            </p>
          </div>

          <motion.div
            className="w-full shrink-0 lg:w-auto"
            whileHover={{
              scale: 1.03,
            }}
            whileTap={{
              scale: 0.98,
            }}
          >
            <Link
              href="/shop"
              className="group inline-flex w-full items-center justify-center whitespace-nowrap rounded-full bg-amber-500 px-8 py-4 font-outfit text-sm font-semibold uppercase tracking-[0.1em] text-black shadow-[0_18px_60px_-18px_rgba(251,191,36,0.7)] transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 lg:w-auto"
            >
              Shop this season
              <span className="ml-2 transition-transform duration-300 group-hover:translate-x-0.5">
                →
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
