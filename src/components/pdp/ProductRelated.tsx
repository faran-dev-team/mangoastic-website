"use client";

import Image from "next/image";
import Link from "next/link";

export type RelatedItem = {
  name: string;
  href: string;
  price: string;
  image: string;
};

type ProductRelatedProps = {
  related: RelatedItem[];
};

export function ProductRelated({ related }: ProductRelatedProps) {
  return (
    <div className="mt-8 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(47,39,24,0.08)] sm:p-8">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
        Frequently Bought With
      </p>
      <h3 className="mt-2 font-sirelia text-2xl text-zinc-950">
        Build the full mango ritual
      </h3>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {related.map((item) => (
          <Link
            key={`${item.name}-${item.href}`}
            href={item.href}
            className="group overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 transition hover:-translate-y-1 hover:border-zinc-300 hover:bg-white"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover transition duration-500 group-hover:scale-[1.04]"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
            <div className="p-4">
              <p className="font-semibold text-zinc-950">{item.name}</p>
              <p className="mt-1 text-sm text-zinc-500">{item.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
