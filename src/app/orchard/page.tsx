import Image from "next/image";
import Link from "next/link";

export default function OrchardPage() {
  return (
    <div className="bg-black text-white">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/ochard.jpg"
            alt="Mangoastic orchard at sunrise"
            fill
            priority
            loading="eager"
            className="object-cover object-[center_68%] sm:object-[center_62%] lg:object-[center_58%]"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.12),transparent_36%),linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.42)_44%,rgba(0,0,0,0.86)_100%)]" />
        </div>

        <div className="relative mx-auto flex min-h-[calc(100svh-5rem)] max-w-7xl items-end px-6 pb-10 pt-24 sm:px-8 sm:pb-14 lg:px-10 lg:pb-16">
          <div className="max-w-3xl">
            <p className="font-outfit text-[11px] font-semibold uppercase tracking-[0.28em] text-amber-400 sm:text-xs">
              The Orchard
            </p>
            <h1 className="mt-4 max-w-2xl font-sirelia text-4xl leading-[1.02] tracking-tight text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)] sm:text-5xl lg:text-[4.75rem] lg:leading-[0.95]">
              Before this was a brand, it was a piece of land.
            </h1>
            <p className="mt-5 max-w-2xl font-outfit text-base leading-relaxed text-white/86 sm:text-lg lg:max-w-xl">
              Sunrise over the trees. Mist on the leaves. Nothing else on the
              page needs to compete with it.
            </p>

            <div className="mt-8">
              <Link
                href="#orchard-story"
                className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3.5 font-outfit text-sm font-semibold uppercase tracking-[0.12em] text-black shadow-[0_18px_60px_-18px_rgba(251,191,36,0.7)] transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
              >
                Read the story
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div
        id="orchard-story"
        className="border-t border-white/10 bg-black px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-outfit text-xs font-semibold uppercase tracking-[0.24em] text-amber-400/90">
            The story
          </p>
          <h2 className="mt-3 max-w-3xl font-sirelia text-3xl leading-tight text-white sm:text-4xl">
            My grandfather planted the first Chaunsa trees on this orchard in
            1968.
          </h2>
          <div className="mt-8 max-w-4xl space-y-8 font-outfit text-lg leading-[1.85] text-white/82 sm:text-[1.15rem]">
            <p>
              He didn't know they'd outlive him. He didn't know we'd still be
              here. He didn't know that some of the trees he put in the ground
              that year would still be giving us their best fruit in their 58th
              season.
            </p>
            <p>
              For most of those years, our family did what every Pakistani
              orchard family does: we sold the harvest at the mandi, took
              whatever the wholesalers paid, and watched our mangoes leave
              anonymously, packed into someone else's truck, sold under someone
              else's name, eaten by someone who'd never know where they came
              from.
            </p>
            <p>
              Mangoastic exists because we got tired of that. Tired of the
              mandi. Tired of the middleman. Tired of the slow erasure of a
              thing we'd grown for three generations into a commodity called
              'fruit, premium grade A.'
            </p>
            <p>
              So in 2026, we cut out the chain. We hand-pick at dawn. We grade
              twice - once at the tree, once on the line. We reject about 40
              percent of every day's pick. We pack our mangoes ourselves,
              in boxes we designed, with cards we wrote, and we ship them to
              your door under our own name.
            </p>
            <p>
              This is a slow business. There are no shortcuts. The trees
              don't care about our growth rate. They give us 18 weeks a
              year, and what we do with those 18 weeks is the whole story.
            </p>
            <p>Welcome to the orchard.</p>
          </div>
        </div>
      </div>

      <div
        id="orchard-gallery"
        className="border-t border-white/10 bg-black px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-outfit text-xs font-semibold uppercase tracking-[0.24em] text-amber-400/90">
              Photo gallery
            </p>
            <h2 className="mt-3 font-sirelia text-3xl leading-tight text-white sm:text-4xl">
              The orchard, in frames.
            </h2>
            <p className="mt-4 font-outfit text-base leading-relaxed text-white/72 sm:text-lg">
              Editorial shots from the orchard, packing line, and finished
              boxes.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-12 md:auto-rows-[11rem] lg:auto-rows-[13rem]">
            {[
              {
                src: "/images/ochard.jpg",
                alt: "Mangoastic orchard at sunrise",
                caption: "Sunrise over the trees",
                className: "md:col-span-8 md:row-span-2",
              },
              {
                src: "/images/hero-shop.jpg",
                alt: "Shop hero orchard scene",
                caption: "Rows that turn into boxes",
                className: "md:col-span-4 md:row-span-2",
              },
              {
                src: "/images/hero.png",
                alt: "Hero mango portrait",
                caption: "The fruit we build around",
                className: "md:col-span-4",
              },
              {
                src: "/images/mango1.jpg",
                alt: "Single mango product shot",
                caption: "Held like it matters",
                className: "md:col-span-4",
              },
              {
                src: "/images/mango2.jpg",
                alt: "Second mango product shot",
                caption: "Picked, graded, packed",
                className: "md:col-span-4",
              },
              {
                src: "/images/mango3.jpg",
                alt: "Third mango product shot",
                caption: "The season in one frame",
                className: "md:col-span-4",
              },
              {
                src: "/images/mango4.jpg",
                alt: "Fourth mango product shot",
                caption: "Gift-ready by default",
                className: "md:col-span-4",
              },
              {
                src: "/images/mango5.jpg",
                alt: "Fifth mango product shot",
                caption: "The last check before dispatch",
                className: "md:col-span-4",
              },
            ].map((image, index) => (
              <figure
                key={image.src}
                className={`group overflow-hidden rounded-[1.6rem] border border-white/10 bg-white/[0.03] ${image.className}`}
              >
                <div
                  className={`relative w-full overflow-hidden bg-zinc-900 ${
                    index < 2
                      ? "h-full min-h-[16rem]"
                      : "aspect-[4/3] md:aspect-auto md:h-full"
                  }`}
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent px-4 py-4">
                    <figcaption className="font-outfit text-xs italic text-white/82 sm:text-sm">
                      {image.caption}
                    </figcaption>
                  </div>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto max-w-7xl">
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
              <div
                key={title}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.8)]"
              >
                <p className="font-outfit text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-400">
                  {title}
                </p>
                <p className="mt-4 font-outfit text-base leading-relaxed text-white/78">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 bg-black px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-8 sm:px-8 sm:py-10 lg:flex-row lg:items-center lg:px-10">
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

          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-full bg-amber-500 px-6 py-3.5 font-outfit text-sm font-semibold uppercase tracking-[0.12em] text-black transition hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          >
            Order This Season's Box
          </Link>
        </div>
      </div>
    </div>
  );
}
