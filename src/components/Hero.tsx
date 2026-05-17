'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MessageCircle } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Image */}
      <Image
        src="/images/hero.png"
        alt="Mango Orchard"
        fill
        className="object-cover"
        priority
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex items-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg">
          {/* Heading */}
          <h1 className="whitespace-pre-line font-sirelia text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl">
            {`The mango.
Untouched.`}
          </h1>

          {/* Description */}
          <p className="mt-6 font-outfit text-sm leading-relaxed text-zinc-200 sm:text-base">
            Pakistan's most loved fruit, delivered from our orchard to your door.
            No mandi.
            <br />
            <span className="text-mango">No middleman. No compromise.</span>
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              href="/shop"
              className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-mango px-7 py-3.5 font-outfit text-sm font-semibold text-black shadow-[0_0_28px_-6px_rgba(255,163,10,0.5)] transition hover:bg-mango/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mango sm:px-8"
            >
              Order This Season's Box
              <ArrowRight
                className="h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-hover:translate-x-1.5"
                strokeWidth={2.25}
                aria-hidden
              />
            </Link>

            <a
              href="https://wa.me/923214567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/40 bg-white/5 px-7 py-3.5 font-outfit text-sm font-semibold text-white backdrop-blur-sm transition hover:border-mango/50 hover:bg-white/10 hover:text-mango focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 sm:px-8"
            >
              <MessageCircle
                className="h-4 w-4 shrink-0"
                strokeWidth={2}
                aria-hidden
              />
              Or order on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
