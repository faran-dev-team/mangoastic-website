import ProductPageClient, {
  ProductPageContent,
} from "@/components/ProductPageClient";

type Props = {
  params: Promise<{ slug: string }>;
};

const products: Record<string, ProductPageContent> = {
  "mangoastic-classic-7kg": {
    breadcrumb: "Classic 7kg",
    name: "Mangoastic Classic",
    weight: "7kg of single-orchard Chaunsa.",
    price: "PKR 3,400",
    description:
      "Hand-picked at dawn. Graded twice. Packed in a kraft-paper box with a ripeness card you'll actually use. Delivered tomorrow if you order before 5 PM.",
    highlight:
      "This box is what our family eats. It's our hero, and it's our most-ordered box of the season.",
    heroNote:
      "Single-source Chaunsa from our orchard near Multan. Quiet, familiar, and the box we would send to our own home.",
    image: "/images/box-classic.jpg",
    gallery: [
      {
        kind: "image",
        src: "/images/box-classic.jpg",
        alt: "Closed Classic 7kg mango box",
        label: "Closed box",
        hint: "Cream box, kraft tissue, first impression.",
      },
      {
        kind: "image",
        src: "/images/mango1.jpg",
        alt: "Open Classic box with mangoes",
        label: "Open box",
        hint: "What the orchard looks like when the lid lifts.",
      },
      {
        kind: "image",
        src: "/images/mango2.jpg",
        alt: "Single mango held in hand",
        label: "Held in hand",
        hint: "The size, colour, and skin we look for.",
      },
      {
        kind: "image",
        src: "/images/mango3.jpg",
        alt: "Cut mango on plate",
        label: "Cut fruit",
        hint: "Golden flesh. Slow lunch. Dadi-approved.",
      },
      {
        kind: "image",
        src: "/images/mango4.jpg",
        alt: "Packaging detail of the Classic box",
        label: "Packaging detail",
        hint: "Tissue, foam nets, and the ripeness card.",
      },
      {
        kind: "video",
        src: "/images/box-classic.jpg",
        poster: "/images/box-classic.jpg",
        label: "15s unboxing",
        hint: "A short moving preview of the box in hand.",
      },
    ],
    tabs: [
      {
        title: "What's in the Box",
        content:
          "Approx. 14-18 Chaunsa mangoes, depending on size. Average mango weight: 400-500g. Box weight: 7kg net, 7.8kg with packaging. Individually wrapped in food-grade foam nets. Kraft-paper tissue lining. Ripeness card included.",
      },
      {
        title: "Why This Mango",
        content:
          "Chaunsa is Pakistan's most internationally recognised mango variety, prized for its honey-like sweetness, low fibre, and golden flesh. Ours come from a single stretch of orchard near Multan that has been in the family for three generations. The Honey Chaunsa we ship between mid-June and August is, for our family, the actual taste of summer.",
      },
      {
        title: "How to Eat & Store",
        content:
          "If your card says 'ready in 2-3 days,' leave the mangoes out at room temperature. When the skin gives slightly under pressure and the smell deepens, they're ready. Refrigerate only after they ripen, and only for the day. Cut from the cheek, scoop with a spoon, or slice and dip in a little salt. We're not going to tell you how to eat your mangoes. You know.",
      },
      {
        title: "Delivery",
        content:
          "Islamabad / Rawalpindi: same-day if you order before 3 PM, otherwise next-day. Lahore: next-day. Karachi: 1-2 days. All boxes ship with a tracking link and a call from our team when the rider is 30 minutes away. Cash on delivery available. 30% advance unlocks a guaranteed delivery slot.",
      },
    ],
    reviews: [
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
        text: "We sent one to my parents and they kept saying it tasted like the angan in summer. That was exactly the point.",
      },
      {
        name: "Hassan R.",
        location: "Karachi",
        rating: 5,
        text: "Delivery timing was handled well and the box arrived in good shape. Fresh, clean, and worth it.",
      },
    ],
    related: [
      {
        name: "Mango Honey 250g",
        href: "/shop",
        price: "Add-on · +PKR 850",
        image: "/images/mango5.jpg",
      },
      {
        name: "Aamras Pouch 500g",
        href: "/shop",
        price: "Add-on · +PKR 650",
        image: "/images/mango4.jpg",
      },
      {
        name: "Gift Note",
        href: "/shop",
        price: "Free with order",
        image: "/images/box-gift.jpg",
      },
    ],
  },
  "mangoastic-family-10kg": {
    breadcrumb: "Family 10kg",
    name: "Mangoastic Family",
    weight: "10kg of Chaunsa, for a household.",
    price: "PKR 4,500",
    description:
      "A larger box for families and shared tables, packed for week-long mango runs. More fruit, same orchard, same handling.",
    highlight: "This box feeds a household for a week.",
    heroNote:
      "Built for the kitchen table. A little more volume, the same single-orchard handling.",
    image: "/images/box-family.jpg",
    gallery: [
      {
        kind: "image",
        src: "/images/box-family.jpg",
        alt: "Closed Family 10kg mango box",
        label: "Closed box",
        hint: "Built for the family table.",
      },
      {
        kind: "image",
        src: "/images/mango2.jpg",
        alt: "Open family box with mangoes",
        label: "Open box",
        hint: "Enough fruit for mornings and evenings.",
      },
      {
        kind: "image",
        src: "/images/mango3.jpg",
        alt: "Single mango held in hand",
        label: "Held in hand",
        hint: "For checking ripeness and colour.",
      },
      {
        kind: "image",
        src: "/images/mango1.jpg",
        alt: "Cut mango on plate",
        label: "Cut fruit",
        hint: "The family plate, the shared bowl.",
      },
      {
        kind: "image",
        src: "/images/mango4.jpg",
        alt: "Packaging detail of the family box",
        label: "Packaging detail",
        hint: "Giftable, but practical too.",
      },
      {
        kind: "video",
        src: "/images/box-family.jpg",
        poster: "/images/box-family.jpg",
        label: "15s unboxing",
        hint: "A short moving preview of the larger box.",
      },
    ],
    tabs: [
      {
        title: "What's in the Box",
        content:
          "Approx. 20-26 Chaunsa mangoes, depending on size. A larger family box sized for a household week. Same foam nets, tissue lining, and ripeness card.",
      },
      {
        title: "Why This Mango",
        content:
          "This is the household version of our orchard story. More fruit, same single-source handling, same focus on sweetness and low fibre. Built for breakfast, after-school plates, and the late-night one that disappears before anyone admits it.",
      },
      {
        title: "How to Eat & Store",
        content:
          "Leave ripe fruit at room temperature for the day you want to eat it. Refrigerate only after it ripens. For a household box, rotate fruit from top to bottom so the whole box ripens evenly. Slice, scoop, or blend for aamras.",
      },
      {
        title: "Delivery",
        content:
          "Islamabad / Rawalpindi: same-day if you order before 3 PM. Lahore: next-day. Karachi: 1-2 days. Family boxes are handled like fragile cargo and every one gets a tracking update.",
      },
    ],
    reviews: [
      {
        name: "Farah N.",
        location: "Lahore",
        rating: 5,
        text: "This box lasted the week and nobody felt shortchanged. The fruit came in proper condition and ripened evenly.",
      },
      {
        name: "Omar T.",
        location: "Islamabad",
        rating: 5,
        text: "The quantity worked for our whole family. It solved breakfast, dessert, and the usual argument about who gets the last piece.",
      },
      {
        name: "Mina P.",
        location: "Karachi",
        rating: 5,
        text: "Good packing and the box held up well in delivery. It felt handled with care.",
      },
      {
        name: "Yasir A.",
        location: "Rawalpindi",
        rating: 5,
        text: "A proper family-size box. Clean, simple, and much better than random mandi fruit.",
      },
    ],
    related: [
      {
        name: "Mango Honey 250g",
        href: "/shop",
        price: "Add-on · +PKR 850",
        image: "/images/mango5.jpg",
      },
      {
        name: "Aamras Pouch 500g",
        href: "/shop",
        price: "Add-on · +PKR 650",
        image: "/images/mango4.jpg",
      },
      {
        name: "Gift Note",
        href: "/shop",
        price: "Free with order",
        image: "/images/box-gift.jpg",
      },
    ],
  },
  "mixed-premium-discovery-7kg": {
    breadcrumb: "Mixed Premium Discovery",
    name: "Mixed Premium Discovery",
    weight: "7kg, three varieties.",
    price: "PKR 3,900",
    description:
      "A seasonal mix of Chaunsa, Anwar Ratol, and Sindhri for people who want to taste the range.",
    highlight: "Taste the season across three distinct varieties.",
    heroNote:
      "For the person who wants the full summer table in one box. Chaunsa, Anwar Ratol, Sindhri.",
    image: "/images/box-mixed.jpg",
    gallery: [
      {
        kind: "image",
        src: "/images/box-mixed.jpg",
        alt: "Closed Mixed Premium Discovery box",
        label: "Closed box",
        hint: "Three varieties, one box.",
      },
      {
        kind: "image",
        src: "/images/mango1.jpg",
        alt: "Open mixed box with mangoes",
        label: "Open box",
        hint: "A seasonal assortment from the orchard.",
      },
      {
        kind: "image",
        src: "/images/mango2.jpg",
        alt: "Single mango held in hand",
        label: "Held in hand",
        hint: "A closer look at colour and shape.",
      },
      {
        kind: "image",
        src: "/images/mango3.jpg",
        alt: "Cut mango on plate",
        label: "Cut fruit",
        hint: "Taste the differences side by side.",
      },
      {
        kind: "image",
        src: "/images/mango4.jpg",
        alt: "Packaging detail of the discovery box",
        label: "Packaging detail",
        hint: "Reserved like a tasting menu.",
      },
      {
        kind: "video",
        src: "/images/box-mixed.jpg",
        poster: "/images/box-mixed.jpg",
        label: "15s unboxing",
        hint: "A short moving preview of the mixed box.",
      },
    ],
    tabs: [
      {
        title: "About Our Varieties",
        content:
          "Chaunsa gives honey-like sweetness and soft flesh. Anwar Ratol brings fragrance and a more connoisseur feel. Sindhri gives a brighter, more classic summer profile. This box is for tasting the season, not choosing just one lane.",
      },
      {
        title: "What's in the Box",
        content:
          "A seasonal blend of Chaunsa, Anwar Ratol, and Sindhri. Quantities vary by variety and harvest. Every box is balanced for taste and ripeness across the week.",
      },
      {
        title: "How to Eat & Store",
        content:
          "Rotate the fruit as it ripens. Eat the softer, sweeter ones first. Keep the firmer fruit out at room temperature and refrigerate only after they ripen. This box is designed to last across the week without feeling repetitive.",
      },
      {
        title: "Delivery",
        content:
          "Orders leave from the orchard based on transit timing so the mixed box arrives with the varieties in good order. Islamabad / Rawalpindi same-day if ordered early. Lahore next-day. Karachi 1-2 days.",
      },
    ],
    reviews: [
      {
        name: "Nadia H.",
        location: "Islamabad",
        rating: 5,
        text: "The mixed box was the most interesting one we ordered. Each variety had its own character and the tasting felt deliberate.",
      },
      {
        name: "Ali J.",
        location: "Lahore",
        rating: 5,
        text: "This was the right call for someone who wants to compare varieties instead of buying the same thing again.",
      },
      {
        name: "Hira Z.",
        location: "Karachi",
        rating: 5,
        text: "Different mango moods in one box. Clean packing and the fruit was in good condition.",
      },
      {
        name: "Saad R.",
        location: "Rawalpindi",
        rating: 5,
        text: "It felt like a mini tasting session at home. Good way to bring the family into the season.",
      },
    ],
    related: [
      {
        name: "Mango Honey 250g",
        href: "/shop",
        price: "Add-on · +PKR 850",
        image: "/images/mango5.jpg",
      },
      {
        name: "Aamras Pouch 500g",
        href: "/shop",
        price: "Add-on · +PKR 650",
        image: "/images/mango4.jpg",
      },
      {
        name: "Gift Note",
        href: "/shop",
        price: "Free with order",
        image: "/images/box-gift.jpg",
      },
    ],
  },
  "gift-edit-5kg": {
    breadcrumb: "The Gift Edit",
    name: "The Gift Edit",
    weight: "5kg in a signed box.",
    price: "PKR 5,500",
    description:
      "A polished gift box for birthdays, thank-yous, and the moments that need more than a card. Signature packaging, gift-note friendly, ready for a recipient.",
    highlight: "For when a card isn't enough.",
    heroNote:
      "Made to be handed over. The most present-like box in the range, from lid to note.",
    image: "/images/box-gift.jpg",
    gallery: [
      {
        kind: "image",
        src: "/images/box-gift.jpg",
        alt: "Closed Gift Edit box",
        label: "Closed box",
        hint: "Gift-ready from the start.",
      },
      {
        kind: "image",
        src: "/images/mango4.jpg",
        alt: "Open gift box with mangoes",
        label: "Open box",
        hint: "Ribbon, note, and careful packing.",
      },
      {
        kind: "image",
        src: "/images/mango3.jpg",
        alt: "Single mango held in hand",
        label: "Held in hand",
        hint: "A small, elegant gesture.",
      },
      {
        kind: "image",
        src: "/images/mango1.jpg",
        alt: "Cut mango on plate",
        label: "Cut fruit",
        hint: "A gift that gets opened immediately.",
      },
      {
        kind: "image",
        src: "/images/mango2.jpg",
        alt: "Packaging detail of the gift box",
        label: "Packaging detail",
        hint: "Signed box, note slot, gift presentation.",
      },
      {
        kind: "video",
        src: "/images/box-gift.jpg",
        poster: "/images/box-gift.jpg",
        label: "15s unboxing",
        hint: "A short moving preview of the gift presentation.",
      },
    ],
    tabs: [
      {
        title: "What's in the Box",
        content:
          "About 10-14 mangoes depending on size, arranged in a signed gift box with tissue lining and a handwritten note option. Built for gifting moments and recipient delivery.",
      },
      {
        title: "Why This Mango",
        content:
          "The Gift Edit is about presentation and emotion as much as fruit. It is the box you send when the card is not enough and you want the orchard to do the talking for you.",
      },
      {
        title: "How to Eat & Store",
        content:
          "Let the recipient choose the timing, but keep the ripeness card in the box. If the fruit arrives ready, refrigerate only after it ripens. If it is still a day away, leave it out and let the season do its thing.",
      },
      {
        title: "Delivery",
        content:
          "Recipient delivery options are available. Islamabad / Rawalpindi same-day if ordered early. Lahore next-day. Karachi 1-2 days. Include the gift note and we will keep the presentation intact on arrival.",
      },
    ],
    reviews: [
      {
        name: "Mariam F.",
        location: "Lahore",
        rating: 5,
        text: "I sent this for a birthday and it looked thoughtful without being overdone. The recipient loved the note.",
      },
      {
        name: "Usman A.",
        location: "Islamabad",
        rating: 5,
        text: "The box presentation was strong. It felt like a proper gift, not just a delivery.",
      },
      {
        name: "Areeba Q.",
        location: "Karachi",
        rating: 5,
        text: "We used it for a thank-you and it landed perfectly. The packaging and the fruit both felt deliberate.",
      },
      {
        name: "Kamran S.",
        location: "Rawalpindi",
        rating: 5,
        text: "The recipient delivery made it easy. The whole thing came across as polished and calm.",
      },
    ],
    related: [
      {
        name: "Mango Honey 250g",
        href: "/shop",
        price: "Add-on · +PKR 850",
        image: "/images/mango5.jpg",
      },
      {
        name: "Aamras Pouch 500g",
        href: "/shop",
        price: "Add-on · +PKR 650",
        image: "/images/mango4.jpg",
      },
      {
        name: "Gift Note",
        href: "/shop",
        price: "Free with order",
        image: "/images/box-gift.jpg",
      },
    ],
  },
};

const fallbackProduct: ProductPageContent = {
  breadcrumb: "Unknown Box",
  name: "Product Details",
  weight: "Product page placeholder",
  price: "PKR 3,400",
  description: "Product page placeholder for this box.",
  highlight: "Detail page coming together.",
  heroNote: "",
  image: "/images/box-classic.jpg",
  gallery: [
    {
      kind: "image",
      src: "/images/box-classic.jpg",
      alt: "Placeholder product image",
      label: "Closed box",
      hint: "Placeholder image until a matching product is defined.",
    },
    {
      kind: "image",
      src: "/images/mango1.jpg",
      alt: "Placeholder mango image",
      label: "Open box",
      hint: "Placeholder image.",
    },
    {
      kind: "image",
      src: "/images/mango2.jpg",
      alt: "Placeholder mango image",
      label: "Held in hand",
      hint: "Placeholder image.",
    },
    {
      kind: "image",
      src: "/images/mango3.jpg",
      alt: "Placeholder mango image",
      label: "Cut fruit",
      hint: "Placeholder image.",
    },
    {
      kind: "image",
      src: "/images/mango4.jpg",
      alt: "Placeholder packaging image",
      label: "Packaging detail",
      hint: "Placeholder image.",
    },
    {
      kind: "video",
      src: "/images/box-classic.jpg",
      poster: "/images/box-classic.jpg",
      label: "15s unboxing",
      hint: "Placeholder video tile.",
    },
  ],
  tabs: [
    {
      title: "What's in the Box",
      content: "Product details are being prepared for this box.",
    },
    {
      title: "Why This Mango",
      content: "Product details are being prepared for this box.",
    },
    {
      title: "How to Eat & Store",
      content: "Product details are being prepared for this box.",
    },
    {
      title: "Delivery",
      content: "Product details are being prepared for this box.",
    },
  ],
  reviews: [
    {
      name: "Mangoastic Customer",
      location: "Pakistan",
      rating: 5,
      text: "Reviews will appear here once this box is fully live.",
    },
    {
      name: "Mangoastic Customer",
      location: "Pakistan",
      rating: 5,
      text: "Reviews will appear here once this box is fully live.",
    },
    {
      name: "Mangoastic Customer",
      location: "Pakistan",
      rating: 5,
      text: "Reviews will appear here once this box is fully live.",
    },
    {
      name: "Mangoastic Customer",
      location: "Pakistan",
      rating: 5,
      text: "Reviews will appear here once this box is fully live.",
    },
  ],
  related: [
    {
      name: "Mango Honey 250g",
      href: "/shop",
      price: "Add-on · +PKR 850",
      image: "/images/mango5.jpg",
    },
    {
      name: "Aamras Pouch 500g",
      href: "/shop",
      price: "Add-on · +PKR 650",
      image: "/images/mango4.jpg",
    },
    {
      name: "Gift Note",
      href: "/shop",
      price: "Free with order",
      image: "/images/box-gift.jpg",
    },
  ],
};

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products[slug] ?? fallbackProduct;

  return <ProductPageClient product={product} />;
}
