"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ShoppingCart } from "lucide-react";
import { WHATSAPP_HREF } from "@/data/contact";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";

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
            className="group hidden items-center gap-2 rounded border border-white px-4 py-2 font-outfit text-xs font-semibold text-white transition-all hover:bg-white hover:text-black lg:inline-flex"
          >
            <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
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
              <WhatsAppIcon className="h-4 w-4 shrink-0 text-[#25D366]" />
              ORDER ON WHATSAPP
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
