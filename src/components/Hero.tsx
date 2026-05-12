'use client';

import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';

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
          <h1 className="font-sirelia text-4xl font-normal leading-tight text-white sm:text-5xl md:text-6xl">
            The mango.
            <br />
            Untouched.
          </h1>

          {/* Description */}
          <p className="mt-6 font-outfit text-sm leading-relaxed text-gray-200 sm:text-base">
            Pakistan's most loved fruit, delivered from our orchard to your door. No mandi.
            <br />
            No middleman. No compromise.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            {/* Order Box Button */}
            <Link
              href="/shop"
              className="inline-flex items-center justify-center gap-2 rounded bg-amber-500 px-6 py-3 font-outfit text-sm font-semibold text-black transition-all hover:bg-amber-400 sm:px-8"
            >
              ORDER THIS SEASON&apos;S BOX
              <span>→</span>
            </Link>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/923214567890"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded border border-white px-6 py-3 font-outfit text-sm font-semibold text-white transition-all hover:bg-white hover:text-black sm:px-8"
            >
              <MessageCircle size={16} />
              OR ORDER ON WHATSAPP
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
