"use client";

import Link from "next/link";

type ProductCTAsProps = {
  productBreadcrumb: string;
  productPrice: string;
  quantity: number;
  whatsappMessage: string;
};

export function ProductCTAs({
  productBreadcrumb,
  productPrice,
  quantity,
  whatsappMessage,
}: ProductCTAsProps) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2">
      <Link
        href={`/shop?order=${productBreadcrumb}`}
        className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 font-outfit text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-zinc-800"
      >
        Order Now —{" "}
        {quantity > 1 ? `${productPrice} × ${quantity}` : productPrice}
      </Link>
      <a
        href={`https://wa.me/923001234567?text=${whatsappMessage}`}
        className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-transparent px-5 py-3 font-outfit text-sm font-semibold uppercase tracking-wide text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
      >
        Order on WhatsApp →
      </a>
    </div>
  );
}
