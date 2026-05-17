import Image from "next/image";
import Link from "next/link";

export default function WhyWeCost() {
  return (
    <section className="bg-black px-4 py-10 sm:px-6 sm:py-12 md:px-8 md:py-14 lg:py-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-6 sm:gap-8 md:grid-cols-2 md:gap-8 lg:gap-10">
        <div className="relative aspect-[3/2] w-full overflow-hidden rounded-lg md:aspect-[12/9]">
          <Image
            src="/images/hero.png"
            alt="Mangoastic orchard — placeholder until orchard photography is added"
            fill
            className="object-cover"
            sizes="(max-width: 767px) 100vw, 50vw"
          />
        </div>

        <div className="flex min-w-0 flex-col">
          <h2 className="font-sirelia text-2xl font-normal leading-[1.15] tracking-tight text-mango sm:text-3xl sm:leading-tight md:leading-snug lg:text-4xl">
            Why We Cost What We Cost
          </h2>

          <div className="mt-4 max-w-prose space-y-4 font-outfit text-[0.9375rem] leading-[1.6] text-gray-300 sm:mt-5 sm:max-w-none sm:space-y-4 sm:text-base sm:leading-relaxed md:mt-5">
            <p>
              Most mango sellers buy at the mandi at 4 AM. The fruit has already
              changed hands three times. It&apos;s been sorted by speed, not
              taste. By the time it reaches a box, half of it shouldn&apos;t
              have been picked at all.
            </p>

            <p className="text-base font-medium text-white sm:text-lg">
              We grow our mangoes.
            </p>

            <p>
              Every Chaunsa, every Anwar Ratol, every Sindhri in a Mangoastic
              box came off our trees, on the morning of dispatch, and was
              rejected by us — twice — before it ever met your name.
            </p>

            <p className="text-gray-200">
              That&apos;s why our boxes cost what they cost. And that&apos;s
              why they taste like they do.
            </p>
          </div>

          <Link
            href="/orchard"
            className="mt-6 inline-flex min-h-[44px] w-fit items-center gap-1 py-2 font-outfit text-sm font-semibold text-amber-500 transition-colors hover:text-amber-400 sm:mt-7 sm:text-base"
          >
            Visit the orchard
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
