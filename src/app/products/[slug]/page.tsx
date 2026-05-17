import { whatsappOrderUrl } from "@/data/whatsapp";
import Image from "next/image";
import Link from "next/link";

type Props = {
  params: Promise<{ slug: string }>;
};

const products = {
  "mangoastic-classic-7kg": {
    name: "Mangoastic Classic",
    weight: "7kg of single-orchard Chaunsa",
    price: "PKR 3,400",
    image: "/images/box-classic.jpg",
    description:
      "Hand-picked at dawn. Graded twice. Packed in a kraft-paper box with a ripeness card you'll actually use.",
    highlight:
      "This box is what our family eats. It's our hero, and our most-ordered box of the season.",
  },
  "mangoastic-family-10kg": {
    name: "Mangoastic Family",
    weight: "10kg of Chaunsa for a household",
    price: "PKR 4,500",
    image: "/images/box-family.jpg",
    description:
      "A larger box for families and shared tables, packed for week-long mango runs.",
    highlight: "This box feeds a household for a week.",
  },
  "mixed-premium-discovery-7kg": {
    name: "Mixed Premium Discovery",
    weight: "7kg, three varieties",
    price: "PKR 3,900",
    image: "/images/box-mixed.jpg",
    description:
      "A seasonal mix of Chaunsa, Anwar Ratol, and Sindhri for people who want to taste the range.",
    highlight: "Taste the season across three distinct varieties.",
  },
  "gift-edit-5kg": {
    name: "The Gift Edit",
    weight: "5kg in a signed box",
    price: "PKR 5,500",
    image: "/images/box-gift.jpg",
    description:
      "A polished gift box for birthdays, thank-yous, and the moments that need more than a card.",
    highlight: "For when a card isn't enough.",
  },
} as const;

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products[slug as keyof typeof products];
  const fallbackProduct = {
    name: "Product Details",
    weight: slug,
    price: "PKR 3,400",
    image: "/images/box-classic.jpg",
    description: "Product page placeholder for this box.",
    highlight: "Detail page coming together.",
  };
  const content = product ?? fallbackProduct;

  return (
    <div className="bg-[#f6f1e8] px-6 py-12 sm:px-8 lg:px-10">
      <div className="mx-auto max-w-6xl">
        <nav className="text-sm text-zinc-500">
          <Link href="/shop" className="hover:text-zinc-900">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <span>Boxes</span>
          <span className="mx-2">/</span>
          <span className="text-zinc-900">{content.name}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-[0_18px_60px_rgba(47,39,24,0.08)]">
            <div className="relative aspect-[4/5] w-full bg-zinc-100">
              <Image
                src={content.image}
                alt={content.name}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 55vw"
              />
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(47,39,24,0.08)] sm:p-8">
            <p className="font-outfit text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
              Product Details
            </p>
            <h1 className="mt-3 font-sirelia text-4xl leading-tight text-zinc-950 sm:text-5xl">
              {content.name}
            </h1>
            <p className="mt-3 font-outfit text-base text-zinc-600">
              {content.weight} · Free delivery.
            </p>
            <p className="mt-5 max-w-2xl font-outfit text-lg leading-relaxed text-zinc-700">
              {content.description}
            </p>
            <p className="mt-4 rounded-2xl bg-amber-50 px-4 py-3 font-outfit text-sm text-amber-900">
              {content.highlight}
            </p>

            <div className="mt-6 flex items-end gap-3">
              <p className="font-outfit text-3xl font-semibold text-zinc-950">
                {content.price}
              </p>
              <span className="pb-1 font-outfit text-sm text-zinc-500">
                / box
              </span>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <Link
                href="/shop"
                className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-3 font-outfit text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-zinc-800"
              >
                Back to Shop
              </Link>
              <a
                href={whatsappOrderUrl(
                  `Hi Mangoastic — I'd like to order ${content.name}.`,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-zinc-300 bg-transparent px-5 py-3 font-outfit text-sm font-semibold uppercase tracking-wide text-zinc-900 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                Order on WhatsApp
              </a>
            </div>

            <p className="mt-4 text-sm text-zinc-500">
              Same-day dispatch · Replacement if anything&apos;s wrong · Cash on
              delivery available.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
