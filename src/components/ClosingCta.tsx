import React from "react";
import Link from "next/link";

export default function ClosingCta() {
  return (
    <section className="bg-black px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-light text-white sm:text-4xl">
          Now you know. Now order one.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-zinc-400">
          If you want mangoes that taste of an orchard — not a warehouse — try a
          box this season.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/shop"
            className="inline-flex items-center justify-center rounded-md bg-amber-400 px-5 py-3 text-sm font-medium text-black shadow-sm hover:brightness-95"
          >
            Shop the Season
          </Link>

          <a
            href="https://wa.me/923000000000"
            className="inline-flex items-center justify-center rounded-md border border-zinc-800 px-5 py-3 text-sm font-medium text-zinc-200 hover:border-amber-400"
          >
            WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
