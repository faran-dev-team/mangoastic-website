import {
  Building2,
  Mail,
  MapPin,
  MessageCircle,
  Sparkles,
} from "lucide-react";
import { whatsappCorporateUrl } from "@/data/whatsapp";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";

/** Swap display numbers before launch; wa.me links use current routing. */
const WHATSAPP_D2C_DISPLAY = "+92 XXX XXXXXXX";
/** Contact card — same customer line; not used on “Order on WhatsApp” CTAs. */
const WHATSAPP_D2C_HREF = "https://wa.me/923214567890";

const WHATSAPP_CORPORATE_DISPLAY = "+92 XXX XXXXXXX";
const WHATSAPP_CORPORATE_HREF = whatsappCorporateUrl(
  "Hi Mangoastic — I'd like to get in touch.",
);

const EMAIL_HELLO = "hello@mangoistic.com";
const EMAIL_PRESS = "press@mangoistic.com";

const OFFICE_ADDRESS_PLACEHOLDER =
  "Islamabad office address — confirmed by Operations Lead before launch";

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
  const inner = (
    <>
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border ${
          highlight
            ? "border-mango/40 bg-mango/15 text-mango"
            : "border-zinc-700/80 bg-zinc-900/80 text-zinc-300"
        }`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-outfit text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
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

  const cardClass = `group flex gap-4 rounded-2xl border bg-zinc-950/40 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] transition sm:p-6 ${className} ${
    highlight
      ? "border-mango/25 hover:border-mango/45 hover:shadow-[0_0_0_1px_rgba(255,163,10,0.15),0_16px_48px_rgba(0,0,0,0.4)]"
      : "border-zinc-800/90 hover:border-zinc-600/80"
  } ${href ? "hover:bg-zinc-950/70" : ""}`;

  if (href) {
    const linkProps = external
      ? { target: "_blank" as const, rel: "noopener noreferrer" as const }
      : {};
    return (
      <a href={href} className={cardClass} {...linkProps}>
        {inner}
      </a>
    );
  }

  return <article className={cardClass}>{inner}</article>;
}

export default function ContactPageContent() {
  return (
    <div className="bg-black text-white">
      <section className="px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
            Contact
          </p>
          <h1 className="mt-4 font-sirelia text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            We're easy to{" "}
            <span className="text-mango italic">find.</span>
          </h1>
          <p className="mt-4 font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base">
            WhatsApp is fastest for orders. Email for everything else. We reply
            during the hours listed below.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 md:px-8 md:pb-28">
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
            <ContactCard
              icon={MessageCircle}
              title="WhatsApp (D2C)"
              href={WHATSAPP_D2C_HREF}
              external
              highlight
              note="Replies within 8 minutes, 9 AM–11 PM"
            >
              <span className="transition group-hover:text-mango">
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
              <span className="transition group-hover:text-mango">
                {WHATSAPP_CORPORATE_DISPLAY}
              </span>
            </ContactCard>

            <ContactCard
              icon={Mail}
              title="Email"
              href={`mailto:${EMAIL_HELLO}`}
              note="Orders, delivery, and general questions"
            >
              <span className="break-all transition group-hover:text-mango">
                {EMAIL_HELLO}
              </span>
            </ContactCard>

            <ContactCard
              icon={Mail}
              title="Press / collaborations"
              href={`mailto:${EMAIL_PRESS}`}
              note="Media, partnerships, and brand enquiries"
            >
              <span className="break-all transition group-hover:text-mango">
                {EMAIL_PRESS}
              </span>
            </ContactCard>

            <ContactCard
              icon={Building2}
              title="Office address"
              className="md:col-span-2"
            >
              <span className="font-normal text-zinc-300 sm:text-base">
                {OFFICE_ADDRESS_PLACEHOLDER}
              </span>
            </ContactCard>
          </div>

          <article className="mt-4 flex gap-4 rounded-2xl border border-zinc-800/90 bg-zinc-950/40 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:mt-5 sm:p-6">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/80 text-zinc-300">
              <MapPin className="h-5 w-5" strokeWidth={2} aria-hidden />
            </div>
            <div>
              <p className="font-outfit text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 sm:text-xs">
                Orchard
              </p>
              <p className="mt-2 font-outfit text-base leading-relaxed text-zinc-300 sm:text-[1.0625rem]">
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
          </article>

          <p className="mt-12 text-center font-outfit text-sm text-zinc-500 sm:mt-14">
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
          </p>
        </div>
      </section>
    </div>
  );
}
