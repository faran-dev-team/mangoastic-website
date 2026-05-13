import Image from "next/image";
import Link from "next/link";

export default function OrchardStoryMini() {
  return (
    <section className="relative w-full overflow-hidden bg-black">
      <div className="relative min-h-[400px] w-full sm:min-h-[450px] md:min-h-[500px]">
        <Image
          src="/images/ochard.jpg"
          alt="Mangoastic orchard at golden hour — replace with orchard photography when ready"
          fill
          className="object-cover object-center"
          sizes="100vw"
        />

        {/* Golden-hour band: warm lift + readable base */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-amber-950/15" />
        {/* <div className="absolute inset-0 bg-black/25" /> */}

        <div className="absolute inset-0 flex min-h-[350px] flex-col items-center justify-center px-4 py-10 sm:min-h-[380px] sm:px-6 md:min-h-[400px] md:px-10 lg:px-12">
          <div className="flex w-full max-w-2xl flex-col items-center text-center">
            <h2 className="font-sirelia text-2xl font-normal leading-tight tracking-tight text-white drop-shadow-md sm:text-3xl md:text-4xl">
              The Orchard Story
            </h2>

            <div
              className="mt-4 h-px w-14 shrink-0 rounded-full bg-gradient-to-r from-transparent via-amber-500 to-transparent sm:mt-5"
              aria-hidden
            />

            <p className="mx-auto mt-5 max-w-xl text-pretty font-outfit text-[0.9375rem] leading-relaxed text-white/95 sm:mt-6 sm:text-base sm:leading-relaxed md:text-lg">
              Three generations. One stretch of land near Multan. A few
              thousand trees that take 18 weeks to do what they do...
            </p>

            <div className="mt-8 flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mt-10 sm:max-w-lg sm:flex-row sm:items-center sm:justify-center sm:gap-4">
              <Link
                href="/orchard"
                className="inline-flex items-center justify-center rounded-md bg-amber-500 px-6 py-3 font-outfit text-sm font-semibold text-black shadow-md transition-colors hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300 sm:min-w-[200px] sm:px-8 sm:text-base"
              >
                Visit The Orchard
              </Link>
              <Link
                href="/orchard"
                className="group inline-flex items-center justify-center gap-1.5 rounded-md border border-white/25 bg-black/30 px-5 py-3 font-outfit text-sm font-semibold text-white transition-colors hover:border-amber-400/50 hover:bg-black/45 hover:text-amber-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 sm:min-w-[200px] sm:px-6 sm:text-base"
              >
                <span>The story</span>
                <span
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
