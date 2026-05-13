import Image from "next/image";

export default function ShopHero() {
  return (
    <section className="relative min-h-[56vh] overflow-hidden bg-black sm:min-h-[60vh] lg:min-h-[64vh]">
      <Image
        src="/images/hero-shop.jpg"
        alt="Mango boxes in orchard"
        fill
        priority
        className="object-cover"
      />

      <div className="absolute inset-0 bg-black/65" />

      <div className="relative mx-auto flex min-h-[56vh] max-w-6xl items-center px-6 py-16 sm:min-h-[60vh] lg:min-h-[64vh]">
        <div className="max-w-3xl">
          <p className="font-outfit text-sm font-semibold uppercase tracking-[0.16em] text-amber-300">
            Shop
          </p>
          <h1 className="mt-3 font-sirelia text-4xl leading-tight text-white sm:text-5xl lg:text-6xl">
            This season&apos;s boxes.
          </h1>
          <p className="mt-6 max-w-2xl font-outfit text-base leading-relaxed text-zinc-200 sm:text-lg">
            Picked yesterday in our orchard near Multan. Graded twice. Packed by
            hand. At your door tomorrow.
          </p>
        </div>
      </div>
    </section>
  );
}
