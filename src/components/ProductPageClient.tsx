"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Check, ChevronDown, ChevronUp, Play } from "lucide-react";

type Tab = {
  title: string;
  content: string;
};

type Review = {
  name: string;
  location: string;
  rating: number;
  text: string;
};

type RelatedItem = {
  name: string;
  href: string;
  price: string;
  image: string;
};

type GalleryTile =
  | {
      kind: "image";
      src: string;
      alt: string;
      label: string;
      hint: string;
    }
  | {
      kind: "video";
      src: string;
      poster: string;
      label: string;
      hint: string;
    };

export type ProductPageContent = {
  breadcrumb: string;
  name: string;
  weight: string;
  price: string;
  description: string;
  highlight: string;
  heroNote: string;
  image: string;
  gallery: GalleryTile[];
  tabs: Tab[];
  reviews: Review[];
  related: RelatedItem[];
};

type Props = {
  product: ProductPageContent;
};

const ripenessOptions = [
  "Ready to eat in 1-2 days",
  "Ready in 3-4 days",
  "Mixed (for sharing across the week)",
] as const;

const addonOptions = [
  { id: "mango-honey", label: "Add mango honey 250g (+850 PKR)" },
  { id: "aamras", label: "Add aamras pouch 500g (+650 PKR)" },
  { id: "gift-note", label: "Add a handwritten gift note (free)" },
] as const;

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1 text-amber-400"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${index < rating ? "fill-current" : "fill-none stroke-current text-zinc-600"}`}
          aria-hidden
        >
          <path d="M10 1.5l2.54 5.14 5.68.83-4.11 4 0.97 5.66L10 14.51 4.92 17.13l0.97-5.66-4.11-4 5.68-.83L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductPageClient({ product }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileOpenTab, setMobileOpenTab] = useState<number | null>(0);
  const [ripeness, setRipeness] = useState<(typeof ripenessOptions)[number]>(
    ripenessOptions[2],
  );
  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState<Record<string, boolean>>({
    "mango-honey": false,
    aamras: false,
    "gift-note": true,
  });

  const totalPrice = useMemo(() => {
    const base = Number(product.price.replace(/[^0-9]/g, ""));
    const addonTotal =
      (addons["mango-honey"] ? 850 : 0) +
      (addons.aamras ? 650 : 0) +
      (addons["gift-note"] ? 0 : 0);

    return (base + addonTotal) * quantity;
  }, [addons, quantity, product.price]);

  const whatsappMessage = encodeURIComponent(
    `Hi Mangoastic, I'd like to order ${quantity} x ${product.name} (${product.weight}). Ripeness: ${ripeness}. Add-ons: ${
      Object.entries(addons)
        .filter(([, checked]) => checked)
        .map(([key]) => key)
        .join(", ") || "none"
    }.`,
  );

  return (
    <div className="bg-[#f6f1e8] px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-7xl">
        <nav className="text-sm text-zinc-500">
          <Link href="/shop" className="transition hover:text-zinc-900">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span>Boxes</span>
          <span className="mx-2">/</span>
          <span className="text-zinc-900">{product.breadcrumb}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          {/* Gallery */}
          <div className="space-y-5">
            <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_18px_60px_rgba(47,39,24,0.08)]">
              <div className="relative aspect-[4/5] w-full bg-zinc-100 sm:aspect-[16/13]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {product.gallery.map((tile, index) => (
                <div
                  key={`${tile.label}-${index}`}
                  className="group relative overflow-hidden rounded-[22px] border border-zinc-200 bg-white shadow-[0_16px_40px_rgba(47,39,24,0.06)]"
                >
                  {tile.kind === "image" ? (
                    <div className="relative aspect-[4/5]">
                      <Image
                        src={tile.src}
                        alt={tile.alt}
                        fill
                        className="object-cover transition duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 640px) 50vw, 18vw"
                      />
                    </div>
                  ) : (
                    <div className="relative aspect-[4/5] bg-zinc-950">
                      <Image
                        src={tile.poster}
                        alt={tile.label}
                        fill
                        className="object-cover opacity-90 transition duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
                        sizes="(max-width: 640px) 50vw, 18vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-black/15" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-xl">
                          <Play
                            className="ml-1 h-7 w-7 fill-current"
                            strokeWidth={0}
                          />
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="p-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-amber-700">
                      {tile.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                      {tile.hint}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div className="rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(47,39,24,0.08)] sm:p-8 lg:sticky lg:top-6">
            <p className="font-outfit text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              Product Details
            </p>
            <h1 className="mt-3 font-sirelia text-4xl leading-tight text-zinc-950 sm:text-5xl">
              {product.name}
            </h1>
            <p className="mt-3 font-outfit text-base text-zinc-600">
              {product.weight} · Free delivery.
            </p>
            <p className="mt-5 max-w-2xl font-outfit text-lg leading-relaxed text-zinc-700">
              {product.description}
            </p>
            <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 font-outfit text-sm text-amber-900">
              {product.highlight}
            </p>
            <p className="mt-4 font-outfit text-sm leading-relaxed text-zinc-500">
              {product.heroNote}
            </p>

            <div className="mt-6 flex items-end gap-3">
              <p className="font-outfit text-3xl font-semibold text-zinc-950">
                {product.price}
              </p>
              <span className="pb-1 font-outfit text-sm text-zinc-500">
                / box
              </span>
            </div>

            <div className="mt-7 space-y-5 border-t border-zinc-200 pt-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  Ripeness preference
                </p>
                <div className="mt-3 grid gap-3">
                  {ripenessOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setRipeness(option)}
                      className={`rounded-2xl border px-4 py-3 text-left font-outfit text-sm transition ${
                        ripeness === option
                          ? "border-amber-500 bg-amber-50 text-zinc-950"
                          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_140px]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Add-ons
                  </p>
                  <div className="mt-3 space-y-3">
                    {addonOptions.map((addon) => (
                      <label
                        key={addon.id}
                        className="flex cursor-pointer items-start gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 font-outfit text-sm text-zinc-700 transition hover:border-zinc-300 hover:bg-zinc-50"
                      >
                        <input
                          type="checkbox"
                          checked={addons[addon.id]}
                          onChange={(e) =>
                            setAddons((current) => ({
                              ...current,
                              [addon.id]: e.target.checked,
                            }))
                          }
                          className="mt-1 h-4 w-4 rounded border-zinc-300 text-amber-500 focus:ring-amber-500"
                        />
                        <span>{addon.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                    Quantity
                  </p>
                  <div className="mt-3 flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white p-2">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((value) => Math.max(1, value - 1))
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-lg text-zinc-700 transition hover:bg-zinc-200"
                    >
                      −
                    </button>
                    <div className="flex-1 text-center font-outfit text-lg font-semibold text-zinc-950">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((value) => Math.min(5, value + 1))
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-100 text-lg text-zinc-700 transition hover:bg-zinc-200"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <Link
                href={`/shop?order=${product.breadcrumb}`}
                className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 font-outfit text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-zinc-800"
              >
                Order Now —{" "}
                {quantity > 1
                  ? `${product.price} × ${quantity}`
                  : product.price}
              </Link>
              <a
                href={`https://wa.me/923001234567?text=${whatsappMessage}`}
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-transparent px-5 py-3 font-outfit text-sm font-semibold uppercase tracking-wide text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                Order on WhatsApp →
              </a>
            </div>

            <p className="mt-4 text-sm text-zinc-500">
              Same-day dispatch · Replacement if anything&apos;s wrong · Cash on
              delivery available.
            </p>
            <p className="mt-3 flex items-center gap-2 rounded-2xl bg-amber-50 px-4 py-3 font-outfit text-sm text-amber-900">
              <Check className="h-4 w-4" />
              Total for this selection: PKR {totalPrice.toLocaleString("en-PK")}
            </p>
          </div>
        </div>

        {/* Tabs / Accordion */}
        <div className="mt-8 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(47,39,24,0.08)] sm:p-8">
          <div className="hidden md:block">
            <div className="flex flex-wrap gap-2 border-b border-zinc-200 pb-4">
              {product.tabs.map((tab, index) => (
                <button
                  key={tab.title}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                    activeTab === index
                      ? "bg-amber-50 text-zinc-950"
                      : "text-zinc-500 hover:bg-zinc-50 hover:text-zinc-950"
                  }`}
                >
                  {tab.title}
                </button>
              ))}
            </div>
            <div className="pt-6">
              <h3 className="font-sirelia text-2xl text-zinc-950">
                {product.tabs[activeTab].title}
              </h3>
              <p className="mt-3 max-w-4xl font-outfit text-base leading-relaxed text-zinc-700">
                {product.tabs[activeTab].content}
              </p>
            </div>
          </div>

          <div className="space-y-3 md:hidden">
            {product.tabs.map((tab, index) => {
              const isOpen = mobileOpenTab === index;
              return (
                <div
                  key={tab.title}
                  className="overflow-hidden rounded-2xl border border-zinc-200"
                >
                  <button
                    type="button"
                    onClick={() => setMobileOpenTab(isOpen ? null : index)}
                    className="flex w-full items-center justify-between px-4 py-4 text-left"
                  >
                    <span className="font-semibold text-zinc-950">
                      {tab.title}
                    </span>
                    {isOpen ? (
                      <ChevronUp className="h-4 w-4 text-zinc-500" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-zinc-500" />
                    )}
                  </button>
                  {isOpen ? (
                    <div className="px-4 pb-4">
                      <p className="font-outfit text-sm leading-relaxed text-zinc-700">
                        {tab.content}
                      </p>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        {/* Reviews */}
        <div className="mt-8 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(47,39,24,0.08)] sm:p-8">
          <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Customer Reviews
              </p>
              <h3 className="mt-2 font-sirelia text-2xl text-zinc-950">
                Loved by the people who open the box first
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-3xl font-semibold text-zinc-950">4.9</div>
              <StarRating rating={5} />
              <div className="text-sm text-zinc-500">148 reviews</div>
            </div>
          </div>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {product.reviews.map((review) => (
              <article
                key={review.name}
                className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-zinc-950">{review.name}</p>
                    <p className="text-xs text-zinc-500">{review.location}</p>
                  </div>
                  <StarRating rating={review.rating} />
                </div>
                <p className="mt-4 text-sm leading-relaxed text-zinc-700">
                  {review.text}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-5 text-sm text-zinc-500">
            See all reviews once Judge.me is connected.
          </div>
        </div>

        {/* Frequently Bought With */}
        <div className="mt-8 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(47,39,24,0.08)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Frequently Bought With
          </p>
          <h3 className="mt-2 font-sirelia text-2xl text-zinc-950">
            Build the full mango ritual
          </h3>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {product.related.map((item) => (
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

        {/* PDP Footer */}
        <div className="mt-8 rounded-[28px] border border-zinc-200 bg-[#12100d] p-6 text-center shadow-[0_18px_60px_rgba(47,39,24,0.08)] sm:p-8">
          <h3 className="font-sirelia text-2xl text-white sm:text-3xl">
            Not sure which box is for you?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl font-outfit text-sm leading-relaxed text-zinc-300">
            Send us a WhatsApp. We&apos;ll help you pick in two minutes.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={`https://wa.me/923001234567?text=${whatsappMessage}`}
              className="inline-flex items-center justify-center rounded-full bg-amber-400 px-6 py-3 font-outfit text-sm font-semibold text-black transition hover:bg-amber-300"
            >
              WhatsApp Us
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 font-outfit text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/5"
            >
              Back to Shop
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
