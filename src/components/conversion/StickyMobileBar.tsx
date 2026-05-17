"use client";

import { WHATSAPP_ORDER_URL } from "@/data/microcopy";
import { MessageCircle } from "lucide-react";
import Link from "next/link";

export default function StickyMobileBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 border-t border-zinc-800/90 bg-black/95 px-3 py-3 backdrop-blur-md md:hidden"
      style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
      role="region"
      aria-label="Quick order actions"
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <a
          href={WHATSAPP_ORDER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-white/30 bg-white/5 py-3 font-outfit text-xs font-semibold text-white transition hover:border-mango/50 hover:text-mango"
        >
          <MessageCircle className="h-4 w-4 shrink-0" strokeWidth={2} aria-hidden />
          Order on WhatsApp
        </a>
        <Link
          href="/shop"
          className="inline-flex flex-1 items-center justify-center rounded-full bg-mango py-3 font-outfit text-xs font-semibold text-black transition hover:bg-mango/90"
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}
