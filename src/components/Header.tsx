"use client";

import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="w-full border-b bg-white/50 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" className="text-xl font-semibold">
          Mangoastic
        </Link>

        <nav className="flex items-center gap-4 text-sm">
          <Link href="/shop" className="hover:underline">
            Shop
          </Link>
          <Link href="/orchard" className="hover:underline">
            The Orchard
          </Link>
          <Link href="/season-pass" className="hover:underline">
            Season Pass
          </Link>
          <Link href="/journal" className="hover:underline">
            Journal
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
