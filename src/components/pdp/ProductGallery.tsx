"use client";

import Image from "next/image";
import { Play } from "lucide-react";
import { motion, Variants, useReducedMotion } from "framer-motion";

export type GalleryTile =
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

type ProductGalleryProps = {
  mainImage: string;
  productName: string;
  gallery: GalleryTile[];
};

export function ProductGallery({
  mainImage,
  productName,
  gallery,
}: ProductGalleryProps) {
  const shouldReduceMotion = useReducedMotion();

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 8 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
  };

  return (
    <div className="space-y-5">
      <div className="overflow-hidden rounded-[28px] border border-zinc-200 bg-white shadow-[0_18px_60px_rgba(47,39,24,0.08)]">
        <div className="relative aspect-[4/5] w-full bg-zinc-100 sm:aspect-[16/13]">
          <Image
            src={mainImage}
            alt={productName}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {gallery.map((tile, index) => (
          <motion.div
            key={`${tile.label}-${index}`}
            className="group relative overflow-hidden rounded-[22px] border border-zinc-200 bg-white shadow-[0_16px_40px_rgba(47,39,24,0.06)]"
            variants={fadeUp}
            initial={shouldReduceMotion ? undefined : "hidden"}
            whileInView={shouldReduceMotion ? undefined : "show"}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={shouldReduceMotion ? undefined : { scale: 1.02 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
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
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-zinc-950/90 text-white">
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
          </motion.div>
        ))}
      </div>
    </div>
  );
}
