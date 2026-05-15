import Image from "next/image";
import Link from "next/link";
import { Download, MessageCircle } from "lucide-react";

const CORPORATE_WHATSAPP_HREF =
  "https://wa.me/923214567890?text=" +
  encodeURIComponent(
    "Hi Mangoastic — I'd like a quote for corporate gifting (boxes, logo, delivery).",
  );

/** Add your PDF to `public/documents/mangoastic-corporate-catalogue.pdf` */
const CORPORATE_CATALOGUE_PDF = "/documents/mangoastic-corporate-catalogue.pdf";

export default function CorporateHero() {
  return (
    <section className="relative min-h-[72vh] overflow-hidden bg-black sm:min-h-[78vh] lg:min-h-[82vh]">
      <Image
        src="/images/box-gift.jpg"
        alt="Mangoastic corporate gift boxes with custom branding"
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/75 to-black/55" />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20" />

      <div className="relative mx-auto flex min-h-[72vh] max-w-6xl items-center px-4 py-20 sm:min-h-[78vh] sm:px-6 sm:py-24 lg:min-h-[82vh] lg:px-8">
        <div className="max-w-2xl">
          <p className="font-outfit text-[11px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
            Corporate gifting
          </p>

          <h1 className="mt-4 font-sirelia text-[1.75rem] font-normal leading-[1.12] tracking-tight text-white sm:mt-5 sm:text-4xl md:text-[2.75rem] md:leading-[1.08] lg:text-6xl">
            Mangoes that make HR look like a <span className="text-mango">hero</span>.
          </h1>

          <p className="mt-5 max-w-xl font-outfit text-[0.9375rem] leading-relaxed text-white sm:mt-6 sm:text-base sm:leading-relaxed md:text-lg md:leading-relaxed">
            Premium boxes with your company&apos;s logo, hand-delivered to your
            team, clients, and partners across Pakistan. One contact. One invoice.
            One thing off your plate.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={CORPORATE_WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-mango px-7 py-3.5 font-outfit text-xs font-bold uppercase tracking-[0.1em] text-black shadow-[0_0_28px_-4px_rgba(255,163,10,0.45)] transition hover:bg-mango/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango sm:text-sm"
            >
              <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              Get a Quote on WhatsApp
            </a>

            <Link
              href={CORPORATE_CATALOGUE_PDF}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 font-outfit text-sm font-semibold text-white backdrop-blur-sm transition hover:border-white/60 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50"
            >
              <Download className="h-4 w-4 shrink-0" strokeWidth={2.25} />
              Download Corporate Catalogue (PDF)
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
