import TrustMicrocopy from "@/components/conversion/TrustMicrocopy";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Order confirmed — Mangoastic",
  description: "Your Mangoastic order is confirmed.",
};

const UPSELL = {
  name: "Mango Honey 250g",
  priceWas: 850,
  priceToday: 595,
};

export default function OrderConfirmationPage() {
  return (
    <div className="bg-black text-white">
      <section className="px-4 py-14 sm:px-6 sm:py-16 md:px-8 md:py-20">
        <div className="mx-auto max-w-2xl">
          <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
            Order confirmed
          </p>
          <h1 className="mt-4 font-sirelia text-3xl leading-tight text-white sm:text-4xl">
            You&apos;re in.{" "}
            <span className="text-mango italic">Order #M-1043</span> confirmed.
          </h1>
          <p className="mt-6 font-outfit text-sm leading-relaxed text-zinc-400 sm:text-base sm:leading-relaxed">
            Your box is being hand-packed at the orchard. You&apos;ll get a
            WhatsApp from our team within the hour confirming your delivery
            window. The next message you get from us will be our rider,{" "}
            <span className="text-white">30 minutes</span> before they arrive at
            your door.
          </p>

          <div className="mt-10 rounded-2xl border border-zinc-800/90 bg-zinc-950/40 p-5 sm:p-6">
            <p className="font-outfit text-xs font-semibold uppercase tracking-[0.16em] text-zinc-500">
              Until then, here&apos;s something you might like
            </p>
            <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-outfit text-base font-semibold text-white">
                  {UPSELL.name}
                </p>
                <p className="mt-1 font-outfit text-sm text-zinc-400">
                  <span className="line-through">PKR {UPSELL.priceWas}</span>
                  <span className="ml-2 font-semibold text-mango">
                    PKR {UPSELL.priceToday}
                  </span>
                  <span className="ml-1 text-zinc-500">(today only)</span>
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-full border border-mango/50 bg-mango/10 px-6 py-2.5 font-outfit text-sm font-semibold text-mango transition hover:bg-mango/20"
              >
                Add to Order
              </button>
            </div>
          </div>

          <TrustMicrocopy className="mt-8 text-center" />

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/shop"
              className="inline-flex rounded-full bg-mango px-6 py-3 font-outfit text-sm font-semibold text-black transition hover:bg-mango/90"
            >
              Continue shopping
            </Link>
            <Link
              href="/track"
              className="inline-flex rounded-full border border-white/30 px-6 py-3 font-outfit text-sm font-semibold text-white transition hover:border-mango/50 hover:text-mango"
            >
              Track order
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
