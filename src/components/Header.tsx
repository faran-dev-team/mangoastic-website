"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { WHATSAPP_HREF } from "@/data/contact";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { label: "SHOP", href: "/shop" },
    { label: "ORCHARD", href: "/orchard" },
    { label: "WHY US", href: "/why" },
    { label: "CORPORATE", href: "/corporate" },
    { label: "SEASON PASS", href: "/season-pass" },
    { label: "FAQ", href: "/faq" },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-gradient-to-b from-black/80 to-black/40 backdrop-blur-md">
      <nav className="mx-auto flex items-center justify-between px-4 py-2 sm:px-6 sm:py-3 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="mr-6 flex h-9 flex-shrink-0 items-center overflow-hidden sm:h-10 lg:h-12"
        >
          <img
            src="/images/logo-mangoastic.svg"
            alt="Mangoastic"
            className="block h-auto w-28 object-contain sm:w-36 md:w-48 lg:w-56 xl:w-64"
          />
        </Link>

        {/* Desktop Navigation (lg+ only; tablet uses toggle menu) */}
        <div className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="font-outfit text-sm font-medium text-white transition-colors hover:text-amber-400"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Right side: Cart, WhatsApp, Mobile Menu Button */}
        <div className="flex items-center gap-4">
          {/* Shopping Cart */}
          <Link
            href="/shop"
            className="relative inline-flex items-center text-white transition-colors hover:text-amber-400"
          >
            <ShoppingCart size={20} />
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-xs font-bold text-black">
              0
            </span>
          </Link>

          {/* WhatsApp Button (desktop header only) */}
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded border border-white px-4 py-2 font-outfit text-xs font-semibold text-white transition-all hover:bg-white hover:text-black lg:inline-flex"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.559.897-2.546 2.165-2.546 3.74 0 1.14.37 2.209 1.077 3.116a6.827 6.827 0 001.946 2.384l.341.265c1.46.878 3.477 1.33 5.228 1.348h.003c5.395 0 9.791-4.396 9.791-9.799 0-1.311-.244-2.558-.682-3.72A9.936 9.936 0 0012.04 2.5.502.502 0 0012 2.5c-5.23 0-9.441 4.211-9.441 9.441 0 1.735.305 3.41.893 5.031L2.34 20.808a.502.502 0 00.63.63l3.993-1.335c1.622.588 3.297.893 5.031.893h.003c5.23 0 9.441-4.211 9.441-9.441 0-5.23-4.211-9.441-9.441-9.441" />
            </svg>
            WHATSAPP TO ORDER
          </a>

          {/* Mobile + tablet menu toggle */}
          <button
            onClick={toggleMenu}
            className="inline-flex lg:hidden"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={24} className="text-white" />
            ) : (
              <Menu size={24} className="text-white" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile + tablet navigation menu */}
      {isMenuOpen && (
        <div className="border-t border-white/10 bg-black/95 px-4 py-4 lg:hidden">
          <div className="space-y-3">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block font-outfit text-sm font-medium text-white transition-colors hover:text-amber-400"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            {/* WhatsApp (mobile + tablet menu) */}
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 flex items-center gap-2 rounded border border-white px-4 py-2 font-outfit text-xs font-semibold text-white transition-all hover:bg-white hover:text-black"
            >
              <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-1.559.897-2.546 2.165-2.546 3.74 0 1.14.37 2.209 1.077 3.116a6.827 6.827 0 001.946 2.384l.341.265c1.46.878 3.477 1.33 5.228 1.348h.003c5.395 0 9.791-4.396 9.791-9.799 0-1.311-.244-2.558-.682-3.72A9.936 9.936 0 0012.04 2.5.502.502 0 0012 2.5c-5.23 0-9.441 4.211-9.441 9.441 0 1.735.305 3.41.893 5.031L2.34 20.808a.502.502 0 00.63.63l3.993-1.335c1.622.588 3.297.893 5.031.893h.003c5.23 0 9.441-4.211 9.441-9.441 0-5.23-4.211-9.441-9.441-9.441" />
              </svg>
              ORDER ON WHATSAPP
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
