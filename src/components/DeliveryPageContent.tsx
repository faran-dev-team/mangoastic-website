import {
  Banknote,
  CreditCard,
  Globe,
  MessageCircle,
  ShieldCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";
import { whatsappLink } from "@/data/contact";

const WHATSAPP_SUPPORT_HREF = whatsappLink(
  "Hi Mangoastic — I need help with delivery or returns.",
);

const DELIVERY_ROWS = [
  {
    city: "Islamabad",
    orderBy: "3 PM",
    delivery: "Same day",
    fee: "PKR 250",
  },
  {
    city: "Rawalpindi",
    orderBy: "3 PM",
    delivery: "Same day",
    fee: "PKR 250",
  },
  {
    city: "Lahore",
    orderBy: "5 PM",
    delivery: "Next day",
    fee: "PKR 300",
  },
  {
    city: "Karachi",
    orderBy: "5 PM (Mon–Thu)",
    delivery: "1–2 days",
    fee: "PKR 350",
  },
] as const;

const PAYMENT_OPTIONS = [
  {
    icon: CreditCard,
    label: "Cards",
    detail: "Visa, Mastercard (via Stripe / local processor).",
  },
  {
    icon: Banknote,
    label: "Mobile wallet",
    detail: "Easypaisa, JazzCash.",
  },
  {
    icon: Banknote,
    label: "Bank transfer",
    detail: "Details on checkout.",
  },
  {
    icon: Truck,
    label: "Cash on Delivery (COD)",
    detail:
      "Yes, with 30% prepaid advance for first orders. Repeat customers can do full COD.",
  },
  {
    icon: Globe,
    label: "International",
    detail: "For gifting into Pakistan: Stripe, Wise.",
  },
] as const;

function SectionBlock({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="scroll-mt-24  pt-12 first:border-t-0 first:pt-0 sm:pt-14"
      aria-labelledby={`${id}-heading`}
    >
      <h2
        id={`${id}-heading`}
        className="font-sirelia text-2xl font-normal tracking-tight text-white sm:text-3xl"
      >
        {title}
      </h2>
      <div className="mt-5 sm:mt-6">{children}</div>
    </section>
  );
}

export default function DeliveryPageContent() {
  return (
    <div className="bg-black text-white">
      <section className="px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
            Delivery & returns
          </p>
          <h1 className="mt-4 font-sirelia text-3xl font-normal leading-tight tracking-tight text-white sm:text-4xl md:text-5xl">
            Delivered fast.{" "}
            <span className="text-mango italic">Backed fully.</span>
          </h1>
          <p className="mt-4 font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base">
            Cities, cut-off times, fees, payment, and our quality promise — so
            you know exactly what to expect before you order.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6 sm:pb-24 md:px-8 md:pb-28">
        <div className="mx-auto max-w-4xl space-y-0">
          <SectionBlock id="delivery-areas" title="Delivery areas & times">
            <div className="overflow-x-auto rounded-2xl border border-zinc-800/90 bg-zinc-950/40 shadow-[0_12px_40px_rgba(0,0,0,0.35)]">
              <table className="w-full min-w-[32rem] border-collapse text-left font-outfit text-sm">
                <thead>
                  <tr className="border-b border-zinc-800/90 bg-zinc-900/60">
                    <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:px-5">
                      City
                    </th>
                    <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:px-5">
                      Order by
                    </th>
                    <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:px-5">
                      Delivery
                    </th>
                    <th className="px-4 py-3.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-zinc-500 sm:px-5">
                      Fee (under PKR 3,500)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DELIVERY_ROWS.map((row, index) => (
                    <tr
                      key={row.city}
                      className={
                        index < DELIVERY_ROWS.length - 1
                          ? "border-b border-zinc-800/80"
                          : ""
                      }
                    >
                      <td className="px-4 py-4 font-semibold text-white sm:px-5">
                        {row.city}
                      </td>
                      <td className="px-4 py-4 text-zinc-300 sm:px-5">
                        {row.orderBy}
                      </td>
                      <td className="px-4 py-4 text-zinc-300 sm:px-5">
                        {row.delivery}
                      </td>
                      <td className="px-4 py-4 font-medium text-mango sm:px-5">
                        {row.fee}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 font-outfit text-sm font-semibold text-mango sm:text-base">
              Free delivery on every order over PKR 3,500.
            </p>
          </SectionBlock>

          <SectionBlock id="payment" title="Payment options">
            <ul className="space-y-3">
              {PAYMENT_OPTIONS.map((item) => {
                const Icon = item.icon;
                return (
                  <li
                    key={item.label}
                    className="flex gap-4 rounded-2xl border border-zinc-800/90 bg-zinc-950/40 px-5 py-4 sm:px-6 sm:py-5"
                  >
                    <span className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-700/80 bg-zinc-900/80 text-mango">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <div>
                      <p className="font-outfit text-sm font-semibold text-white sm:text-base">
                        {item.label}
                      </p>
                      <p className="mt-1 font-outfit text-sm leading-relaxed text-zinc-400">
                        {item.detail}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </SectionBlock>

          <SectionBlock id="quality" title="Quality guarantee">
            <div className="flex gap-4 rounded-2xl border border-mango/25 bg-gradient-to-br from-mango/10 via-zinc-950/50 to-black p-5 sm:p-6">
              <ShieldCheck
                className="mt-0.5 h-8 w-8 shrink-0 text-mango"
                strokeWidth={1.75}
                aria-hidden
              />
              <p className="font-outfit text-sm leading-relaxed text-zinc-300 sm:text-base sm:leading-relaxed">
                If your box has spoiled, damaged, or substandard fruit, send us
                a photo within{" "}
                <span className="font-semibold text-white">24 hours</span> of
                delivery and we&apos;ll replace the box — no arguments, no forms.
                Our brand is built on this promise.
              </p>
            </div>
          </SectionBlock>

          <SectionBlock id="refunds" title="Refunds">
            <ul className="space-y-3 font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base sm:leading-relaxed">
              <li className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mango"
                  aria-hidden
                />
                <span>
                  <span className="font-semibold text-white">
                    Quality issues:
                  </span>{" "}
                  100% replacement or store credit, your choice.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mango"
                  aria-hidden
                />
                <span>
                  <span className="font-semibold text-white">
                    Order cancellation before dispatch:
                  </span>{" "}
                  full refund within 3 business days.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mango"
                  aria-hidden
                />
                <span>
                  <span className="font-semibold text-white">
                    After dispatch but before delivery:
                  </span>{" "}
                  case-by-case.
                </span>
              </li>
              <li className="flex gap-3">
                <span
                  className="mt-2 h-2 w-2 shrink-0 rounded-full bg-mango"
                  aria-hidden
                />
                <span>
                  <span className="font-semibold text-white">
                    Refused COD deliveries
                  </span>{" "}
                  with no quality reason: the 30% advance is non-refundable as
                  it covers cost of goods.
                </span>
              </li>
            </ul>
          </SectionBlock>

          <SectionBlock
            id="subscription"
            title="Subscription pauses & cancellations"
          >
            <p className="font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base sm:leading-relaxed">
              Pause any week of your Season Pass by messaging us before{" "}
              <span className="font-semibold text-white">Wednesday</span> of that
              week. Full refund within{" "}
              <span className="font-semibold text-white">14 days</span> of
              purchase if you haven&apos;t taken delivery yet. Pro-rata refund
              after delivery has started.
            </p>
            <p className="mt-4">
              <Link
                href="/season-pass"
                className="font-outfit text-sm font-semibold text-mango underline-offset-2 hover:underline"
              >
                View Season Pass →
              </Link>
            </p>
          </SectionBlock>

          <SectionBlock id="support" title="Get in touch">
            <p className="font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base">
              Anything not answered here, message our team. We typically reply
              within{" "}
              <span className="font-semibold text-mango">8 minutes</span> during
              business hours.
            </p>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <a
                href={WHATSAPP_SUPPORT_HREF}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-mango px-8 py-3.5 font-outfit text-sm font-semibold text-black shadow-[0_0_28px_-6px_rgba(255,163,10,0.5)] transition hover:bg-mango/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango"
              >
                <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} />
                WhatsApp Support
              </a>
              <Link
                href="/faq"
                className="font-outfit text-sm font-medium text-zinc-400 underline-offset-4 transition hover:text-mango hover:underline"
              >
                Read the FAQ
              </Link>
            </div>
          </SectionBlock>
        </div>
      </section>
    </div>
  );
}
