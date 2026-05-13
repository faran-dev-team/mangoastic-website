import Link from "next/link";
import { MessageCircle } from "lucide-react";

const CORPORATE_WHATSAPP_HREF =
  "https://wa.me/923214567890?text=" +
  encodeURIComponent(
    "Hi Mangoastic — I'd like a quote for corporate gifting."
  );

export default function CorporateGiftingStrip() {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-12 md:py-14">
      <div className="mx-auto max-w-6xl rounded-3xl border border-zinc-800/70 bg-[#141414] p-8 shadow-[0_24px_80px_-24px_rgba(0,0,0,0.75)] sm:p-10 lg:grid lg:grid-cols-2 lg:items-start lg:gap-x-14 lg:gap-y-8 lg:p-12">
        <div className="lg:pr-4">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-500/90 sm:text-xs">
            Corporate gifting
          </p>
          <h2 className="mt-3 font-sirelia text-[1.65rem] font-normal leading-[1.15] tracking-tight text-white sm:mt-4 sm:text-3xl md:text-[2rem] lg:text-[2.15rem] lg:leading-tight">
            Sending mangoes to{" "}
            <span className="text-amber-500 italic">40</span>{" "}
            <span className="text-amber-500 italic">people?</span> 400?
          </h2>
        </div>

        <div className="mt-8 lg:mt-0">
          <p className="max-w-xl font-outfit text-sm leading-relaxed text-white/95 sm:text-base sm:leading-relaxed">
            We do corporate gifting with custom packaging, your logo, and one
            point of contact who actually answers their phone.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={CORPORATE_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-500 px-6 py-3.5 font-outfit text-xs font-semibold uppercase tracking-[0.12em] text-black shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 hover:shadow-amber-500/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-400 sm:text-sm"
            >
              <MessageCircle className="h-4 w-4 shrink-0 sm:h-[1.125rem] sm:w-[1.125rem]" strokeWidth={2} />
              Get a quote on WhatsApp
            </a>
            {/* <Link
              href="/corporate"
              className="inline-flex items-center justify-center rounded-full border border-white/70 bg-transparent px-6 py-3.5 font-outfit text-sm font-semibold text-white transition hover:border-white hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/60"
            >
              Learn more
            </Link> */}
          </div>
        </div>
      </div>
    </section>
  );
}
