import type { GalleryTile } from "@/components/pdp/ProductGallery";
import type { Tab } from "@/components/pdp/ProductTabsSection";
import type { Review } from "@/components/pdp/ProductReviews";
import type { RelatedItem } from "@/components/pdp/ProductRelated";
import { formatPKR } from "@/lib/format/money";

export type BoxWeight = "5kg" | "8kg";

export type ProductPricing = Record<BoxWeight, number>;

export type MangoProduct = {
  slug: string;
  breadcrumb: string;
  name: string;
  tagline: string;
  description: string;
  highlight: string;
  heroNote: string;
  image: string;
  gallery: GalleryTile[];
  pricing: ProductPricing;
  tabs: Tab[];
  reviews: Review[];
};

export { formatPKR } from "@/lib/format/money";

export function getProductPrice(
  product: MangoProduct,
  weight: BoxWeight,
): string {
  return formatPKR(product.pricing[weight]);
}

function imageGallery(
  variety: string,
  images: string[],
  hints: string[],
): GalleryTile[] {
  return images.map((src, index) => ({
    kind: "image" as const,
    src,
    alt: `${variety} mango — photo ${index + 1}`,
    label: hints[index]?.split(" — ")[0] ?? `Photo ${index + 1}`,
    hint: hints[index] ?? `${variety} from our orchard.`,
  }));
}

const sharedDeliveryTab: Tab = {
  title: "Delivery",
  content:
    "Islamabad / Rawalpindi: same-day if you order before 3 PM, otherwise next-day. Lahore: next-day. Karachi: 1-2 days. All boxes ship with a tracking link and a call from our team when the rider is 30 minutes away. Cash on delivery available. 30% advance unlocks a guaranteed delivery slot.",
};

const sharedReviews: Review[] = [
  {
    name: "Aisha M.",
    location: "Islamabad",
    rating: 5,
    text: "The ripeness card was exact. We opened the box the next morning and the mangoes were perfect with chai.",
  },
  {
    name: "Bilal S.",
    location: "Lahore",
    rating: 5,
    text: "It felt like a gift, but better. The packing, the smell, the taste. Properly handled from start to finish.",
  },
  {
    name: "Sara K.",
    location: "Rawalpindi",
    rating: 5,
    text: "We kept saying it tasted like the angan in summer. That was exactly the point.",
  },
  {
    name: "Hassan R.",
    location: "Karachi",
    rating: 5,
    text: "Delivery timing was handled well and the box arrived in good shape. Fresh, clean, and worth it.",
  },
];

export const MANGO_PRODUCTS: MangoProduct[] = [
  {
    slug: "saroli",
    breadcrumb: "Saroli",
    name: "Saroli",
    tagline: "Early-season sweetness",
    description:
      "One of the first mangoes of the season. Saroli arrives with a gentle sweetness and a fragrance that signals summer is here.",
    highlight:
      "An early-season favourite — soft, aromatic, and perfect for families who want the first taste of mango season.",
    heroNote:
      "Hand-picked from our orchard near Multan. Packed in kraft tissue with a ripeness card.",
    image: "/images/new/sindri4.jpg",
    gallery: imageGallery(
      "Saroli",
      ["/images/new/sindri4.jpg"],
      ["Early pick — the first mangoes of the season"],
    ),
    pricing: { "5kg": 1950, "8kg": 3120 },
    tabs: [
      {
        title: "What's in the Box",
        content:
          "Approx. 10-14 mangoes in the 5kg box, 16-22 in the 8kg box, depending on size. Individually wrapped in food-grade foam nets. Kraft-paper tissue lining. Ripeness card included.",
      },
      {
        title: "Why This Mango",
        content:
          "Saroli is prized for arriving early in the season with a delicate sweetness and floral aroma. Ours come from a single stretch of orchard near Multan — picked at dawn, graded twice, and packed under our own name.",
      },
      {
        title: "How to Eat & Store",
        content:
          "Leave at room temperature until the skin gives slightly under pressure. Refrigerate only after ripening, and only for the day. Slice from the cheek or scoop with a spoon.",
      },
      sharedDeliveryTab,
    ],
    reviews: sharedReviews,
  },
  {
    slug: "desheri",
    breadcrumb: "Desheri",
    name: "Desheri",
    tagline: "Classic North Indian sweetness",
    description:
      "A beloved variety with a familiar, rounded sweetness. Desheri is the mango many Pakistani households grew up eating at the breakfast table.",
    highlight:
      "Comforting, reliable sweetness — the variety that feels like home.",
    heroNote:
      "Single-source fruit from our orchard. No mandi mixing, no anonymous trucks.",
    image: "/images/new/dusehri1.jpg",
    gallery: imageGallery(
      "Desheri",
      [
        "/images/new/dusehri1.jpg",
        "/images/new/dusehri2.jpg",
        "/images/new/dusehri3.jpg",
        "/images/new/dusehri4.jpg",
        "/images/new/dusehri5.jpg",
      ],
      [
        "Fresh pick — golden skin, orchard-ready",
        "Held in hand — size and colour we look for",
        "Close-up — the flesh we grade for",
        "Packed and ready — tissue-lined box",
        "Table-ready — sliced and served",
      ],
    ),
    pricing: { "5kg": 1575, "8kg": 2520 },
    tabs: [
      {
        title: "What's in the Box",
        content:
          "Approx. 10-14 mangoes in the 5kg box, 16-22 in the 8kg box. Each mango individually netted. Kraft tissue lining and ripeness card included.",
      },
      {
        title: "Why This Mango",
        content:
          "Desheri (Dussehri) is known for its approachable sweetness and soft, juicy flesh. It is one of the most widely loved varieties in the subcontinent — and ours skip the mandi entirely.",
      },
      {
        title: "How to Eat & Store",
        content:
          "Best eaten at room temperature once ripe. Refrigerate only after full ripeness. Excellent for breakfast plates, aamras, and late-night snacking.",
      },
      sharedDeliveryTab,
    ],
    reviews: sharedReviews,
  },
  {
    slug: "white-chausa",
    breadcrumb: "White Chaunsa",
    name: "White Chaunsa",
    tagline: "Our hero variety",
    description:
      "Honey-like sweetness, low fibre, golden flesh. White Chaunsa is Pakistan's most internationally recognised mango — and the variety our family has grown for three generations.",
    highlight:
      "This is the mango our family eats. It is our hero, and our most-ordered variety of the season.",
    heroNote:
      "Single-source Chaunsa from our orchard near Multan. The taste of summer, handled with care.",
    image: "/images/new/chausa1.jpg",
    gallery: imageGallery(
      "White Chaunsa",
      [
        "/images/new/chausa1.jpg",
        "/images/new/chausa2.jpg",
        "/images/new/chausa3.jpg",
        "/images/new/chausa4.jpg",
      ],
      [
        "Hero pick — the Chaunsa we build around",
        "Golden flesh — honey sweetness, low fibre",
        "Held in hand — graded at the tree",
        "Box-ready — tissue, nets, ripeness card",
      ],
    ),
    pricing: { "5kg": 2250, "8kg": 3600 },
    tabs: [
      {
        title: "What's in the Box",
        content:
          "Approx. 10-14 Chaunsa mangoes in the 5kg box, 16-22 in the 8kg box. Average mango weight: 400-500g. Individually wrapped in food-grade foam nets. Kraft-paper tissue lining. Ripeness card included.",
      },
      {
        title: "Why This Mango",
        content:
          "Chaunsa is Pakistan's most internationally recognised mango variety, prized for its honey-like sweetness, low fibre, and golden flesh. Ours come from a single stretch of orchard near Multan that has been in the family for three generations.",
      },
      {
        title: "How to Eat & Store",
        content:
          "If your card says 'ready in 2-3 days,' leave the mangoes out at room temperature. When the skin gives slightly and the smell deepens, they are ready. Refrigerate only after ripening.",
      },
      sharedDeliveryTab,
    ],
    reviews: sharedReviews,
  },
  {
    slug: "black-chausa",
    breadcrumb: "Black Chaunsa",
    name: "Black Chaunsa",
    tagline: "Deeper flavour profile",
    description:
      "A richer, more intense Chaunsa sub-variety with deeper colour and a fuller flavour. For connoisseurs who want Chaunsa with more character.",
    highlight:
      "The connoisseur's Chaunsa — deeper colour, fuller flavour, same orchard handling.",
    heroNote:
      "Picked and packed with the same dawn-to-door process as our White Chaunsa.",
    image: "/images/new/black-chausa1.jpg",
    gallery: imageGallery(
      "Black Chaunsa",
      [
        "/images/new/black-chausa1.jpg",
        "/images/new/black-chausa2.jpg",
        "/images/new/black-chausa3.jpg",
        "/images/new/black-chausa4.jpg",
      ],
      [
        "Deep colour — the Black Chaunsa profile",
        "Close-up — richer skin tone",
        "Graded fruit — orchard standard",
        "Packed fresh — ready for delivery",
      ],
    ),
    pricing: { "5kg": 2200, "8kg": 3520 },
    tabs: [
      {
        title: "What's in the Box",
        content:
          "Approx. 10-14 mangoes in the 5kg box, 16-22 in the 8kg box. Foam nets, tissue lining, and ripeness card included.",
      },
      {
        title: "Why This Mango",
        content:
          "Black Chaunsa is a sub-variety prized for its deeper colour and more intense flavour compared to White Chaunsa. Same orchard, same handling — a different lane for those who want more depth.",
      },
      {
        title: "How to Eat & Store",
        content:
          "Ripen at room temperature. Black Chaunsa often carries a stronger aroma — use the ripeness card as your guide. Eat within a day of full ripeness.",
      },
      sharedDeliveryTab,
    ],
    reviews: sharedReviews,
  },
  {
    slug: "anwar-ratol",
    breadcrumb: "Anwar Ratol",
    name: "Anwar Ratol",
    tagline: "Fragrant and connoisseur-grade",
    description:
      "Small, fragrant, and intensely flavoured. Anwar Ratol is the variety serious mango people wait for — and it sells out fast every season.",
    highlight:
      "The connoisseur's choice. Small fruit, big fragrance, limited season.",
    heroNote:
      "Reserved handling for a variety that demands it. Packed like a tasting menu.",
    image: "/images/new/anwar-ratol1.jpg",
    gallery: imageGallery(
      "Anwar Ratol",
      [
        "/images/new/anwar-ratol1.jpg",
        "/images/new/anwar-ratol2.jpg",
        "/images/new/anwar-ratol3.jpg",
        "/images/new/anwar-ratol4.jpg",
      ],
      [
        "Signature size — small fruit, big flavour",
        "Fragrance check — the Ratol profile",
        "Hand-graded — only the best make the box",
        "Gift-worthy — elegant and aromatic",
      ],
    ),
    pricing: { "5kg": 2250, "8kg": 3600 },
    tabs: [
      {
        title: "What's in the Box",
        content:
          "Approx. 12-18 smaller mangoes in the 5kg box, 20-28 in the 8kg box. Anwar Ratol runs smaller than Chaunsa but packs more fragrance per fruit.",
      },
      {
        title: "Why This Mango",
        content:
          "Anwar Ratol brings fragrance and a more connoisseur feel. It is one of the most sought-after varieties in Pakistan, with a short window from July to early August.",
      },
      {
        title: "How to Eat & Store",
        content:
          "Eat these sooner rather than later once ripe — the fragrance is the signal. Best enjoyed fresh, at room temperature, within a day of ripeness.",
      },
      sharedDeliveryTab,
    ],
    reviews: sharedReviews,
  },
  {
    slug: "sindhri",
    breadcrumb: "Sindhri",
    name: "Sindhri",
    tagline: "The classic summer mango",
    description:
      "Large, golden, and unmistakably summery. Sindhri opens the season with a bright, classic mango profile that families across Pakistan recognise instantly.",
    highlight:
      "The mango that announces summer — large, golden, and unmistakable.",
    heroNote: "Late May through June. Single orchard. Hand-picked at dawn.",
    image: "/images/new/sindri1.jpg",
    gallery: imageGallery(
      "Sindhri",
      [
        "/images/new/sindri1.jpg",
        "/images/new/sindri2.jpg",
        "/images/new/sindri3.jpg",
        "/images/new/sindri4.jpg",
      ],
      [
        "Golden Sindhri — the classic summer profile",
        "Size check — large, generous fruit",
        "Orchard pick — graded at the tree",
        "Box-ready — packed for transit",
      ],
    ),
    pricing: { "5kg": 2250, "8kg": 3600 },
    tabs: [
      {
        title: "What's in the Box",
        content:
          "Approx. 8-12 larger mangoes in the 5kg box, 14-18 in the 8kg box. Sindhri runs bigger than most varieties. Foam nets and ripeness card included.",
      },
      {
        title: "Why This Mango",
        content:
          "Sindhri gives a brighter, more classic summer profile. It is often the first premium mango of the season and remains a household favourite across Pakistan.",
      },
      {
        title: "How to Eat & Store",
        content:
          "Sindhri ripens evenly and holds well for a few days at room temperature. Slice for sharing or blend for aamras.",
      },
      sharedDeliveryTab,
    ],
    reviews: sharedReviews,
  },
  {
    slug: "langra",
    breadcrumb: "Langra",
    name: "Langra",
    tagline: "Tangy-sweet balance",
    description:
      "A green-skinned favourite with a distinctive tangy-sweet balance. Langra is for people who like their mango with a little more personality.",
    highlight: "Green skin, golden flesh, and a tangy edge that sets it apart.",
    heroNote:
      "Do not judge by the green skin — Langra ripens from the inside out.",
    image: "/images/new/langra1.jpg",
    gallery: imageGallery(
      "Langra",
      [
        "/images/new/langra1.jpg",
        "/images/new/langra2.jpg",
        "/images/new/langra3.jpg",
        "/images/new/langra4.jpg",
      ],
      [
        "Green skin — Langra's signature look",
        "Inside-out ripening — trust the card",
        "Graded and netted — orchard standard",
        "Table-ready — tangy-sweet balance",
      ],
    ),
    pricing: { "5kg": 1575, "8kg": 2520 },
    tabs: [
      {
        title: "What's in the Box",
        content:
          "Approx. 10-14 mangoes in the 5kg box, 16-22 in the 8kg box. Foam nets, tissue lining, and ripeness card included.",
      },
      {
        title: "Why This Mango",
        content:
          "Langra is prized for its tangy-sweet flavour and green-skinned appearance. It ripens from the inside out, so the ripeness card is especially important for this variety.",
      },
      {
        title: "How to Eat & Store",
        content:
          "Do not rely on skin colour alone. Follow the ripeness card. Once ready, eat within 1-2 days for the best balance of tang and sweetness.",
      },
      sharedDeliveryTab,
    ],
    reviews: sharedReviews,
  },
];

export function getAllProducts(): MangoProduct[] {
  return MANGO_PRODUCTS;
}

export function getProductBySlug(slug: string): MangoProduct | undefined {
  return MANGO_PRODUCTS.find((p) => p.slug === slug);
}

export function getRelatedProducts(
  currentSlug: string,
  limit = 3,
): RelatedItem[] {
  return MANGO_PRODUCTS.filter((p) => p.slug !== currentSlug)
    .slice(0, limit)
    .map((p) => ({
      name: p.name,
      href: `/products/${p.slug}`,
      price: `From ${formatPKR(p.pricing["5kg"])}`,
      image: p.image,
    }));
}

/** Card summary used on homepage and shop grids */
export type VarietyCard = {
  slug: string;
  name: string;
  tagline: string;
  image: string;
  pricing: ProductPricing;
};

export function getVarietyCards(): VarietyCard[] {
  return MANGO_PRODUCTS.map(({ slug, name, tagline, image, pricing }) => ({
    slug,
    name,
    tagline,
    image,
    pricing,
  }));
}
