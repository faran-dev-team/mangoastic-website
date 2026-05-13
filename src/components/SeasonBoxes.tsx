import Image from "next/image";
import Link from "next/link";

const boxes = [
  {
    slug: "mangoastic-classic-7kg",
    name: "Mangoastic Classic",
    weight: "7kg of pure Chaunsa",
    price: "PKR 3,400",
    description: "Our hero. The box we'd send our mother.",
    image: "/images/mango1.jpg",
  },
  {
    slug: "mangoastic-family-10kg",
    name: "Mangoastic Family",
    weight: "10kg of Chaunsa, for a household",
    price: "PKR 4,500",
    description: "Five evenings of dessert solved.",
    image: "/images/mango2.jpg",
  },
  {
    slug: "mixed-premium-discovery-7kg",
    name: "Mixed Premium Discovery",
    weight: "7kg, three varieties",
    price: "PKR 3,900",
    description: "Chaunsa, Anwar Ratol, Sindhri. Taste the season.",
    image: "/images/mango3.jpg",
  },
  {
    slug: "gift-edit-5kg",
    name: "The Gift Edit",
    weight: "5kg in a signed box",
    price: "PKR 5,500",
    description: "For when a card isn't enough.",
    image: "/images/mango4.jpg",
  },
] as const;

export default function SeasonBoxes() {
  return (
    <section className="bg-black px-4 pt-12 pb-0 sm:px-6 sm:pt-16 md:px-8 md:pt-20 lg:pt-24">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-center font-sirelia text-2xl font-normal tracking-tight text-white sm:text-3xl lg:text-4xl">
          This Season&apos;s Boxes
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:mt-10 sm:grid-cols-2 sm:gap-7 lg:mt-12 lg:grid-cols-4 lg:gap-6">
          {boxes.map((box) => (
            <article
              key={box.slug}
              className="flex flex-col overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/40 transition-colors duration-300 hover:border-zinc-600"
            >
              <Link
                href={`/products/${box.slug}`}
                className="group relative block aspect-[16/10] w-full overflow-hidden bg-zinc-900 sm:aspect-[3/4] lg:aspect-[5/5]"
              >
                <Image
                  src={box.image}
                  alt={`${box.name} — ${box.weight}`}
                  fill
                  className="object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.08]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </Link>

              <div className="flex flex-col px-3 pt-2.5 pb-0 sm:px-3.5 sm:pt-3">
                <h3 className="font-outfit text-[11px] font-semibold uppercase leading-tight tracking-[0.12em] text-white sm:text-xs">
                  {box.name}
                </h3>
                <p className="mt-1 font-outfit text-[10px] leading-snug text-gray-400 sm:text-[11px]">
                  {box.weight}
                </p>
                <p className="mt-1 font-outfit text-sm font-semibold leading-none text-amber-500 sm:text-base">
                  {box.price}
                </p>
                <p className="mt-1 line-clamp-1 font-outfit text-[10px] leading-tight text-gray-300 sm:text-xs">
                  {box.description}
                </p>

                <Link
                  href={`/products/${box.slug}`}
                  className="mt-2.5 inline-flex w-full items-center justify-center gap-1.5 rounded-md border border-zinc-700 bg-transparent py-2 font-outfit text-[11px] font-semibold uppercase tracking-wide text-white transition-colors hover:border-amber-500/60 hover:bg-zinc-900 hover:text-amber-400 sm:text-xs mb-2.5"
                >
                  View
                  <span aria-hidden>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
