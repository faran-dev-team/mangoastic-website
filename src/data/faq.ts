export type FaqItem = {
  question: string;
  answer: string;
};

export type FaqCategory = {
  id: string;
  title: string;
  items: FaqItem[];
};

export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    id: "ordering",
    title: "Ordering",
    items: [
      {
        question: "How do I order?",
        answer:
          "Either through the website (add to cart, checkout, pay) or on WhatsApp. Many of our customers prefer WhatsApp because it's faster and more personal. Either works.",
      },
      {
        question: "Can I pay cash on delivery?",
        answer:
          "Yes. For first-time customers, we ask for a 30% advance via Easypaisa or JazzCash to confirm your delivery slot. The remaining 70% you pay to the rider in cash. Repeat customers can choose full COD or prepaid.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "Cards (Visa, Mastercard), Easypaisa, JazzCash, bank transfer, and cash on delivery. Diaspora customers ordering from abroad can pay via Stripe or Wise.",
      },
      {
        question: "Do I need an account?",
        answer:
          "No. Guest checkout works fine. Creating an account gets you faster reorders, order history, and access to the Season Pass.",
      },
    ],
  },
  {
    id: "delivery",
    title: "Delivery",
    items: [
      {
        question: "Where do you deliver?",
        answer:
          "Islamabad, Rawalpindi, Lahore, and Karachi. We're adding more cities through the season — check the delivery page for the latest list.",
      },
      {
        question: "How fast is delivery?",
        answer:
          "Islamabad and Pindi: same-day if you order before 3 PM, otherwise next-day. Lahore: next-day. Karachi: 1-2 days. We dispatch six days a week (closed Sunday for packing-line reset).",
      },
      {
        question: "Is delivery free?",
        answer:
          "Free above PKR 3,500. Below that, PKR 250-350 depending on city.",
      },
      {
        question: "Can I schedule a specific delivery date?",
        answer:
          "Yes. Pick your date at checkout. Especially useful for gifting and Eid orders.",
      },
      {
        question: "Will I know when my box is arriving?",
        answer:
          "Yes. You get a WhatsApp confirmation when the box ships, a tracking link, and a call from our team or the rider 30 minutes before delivery.",
      },
    ],
  },
  {
    id: "the-mangoes",
    title: "The Mangoes",
    items: [
      {
        question: "Where do your mangoes come from?",
        answer:
          "Our own orchard near Multan. Single source. Three generations of family ownership. Read the full story on the Orchard page.",
      },
      {
        question: "What varieties do you sell?",
        answer:
          "Sindhri (late May to June), Chaunsa — our hero, in three sub-varieties (Honey, White, Black) from late June through September, Anwar Ratol (July to early August), Langra and Dussehri (July-August). Read more on each PDP.",
      },
      {
        question: "How ripe will my mangoes be when they arrive?",
        answer:
          "Each box ships with a ripeness card telling you exactly: 'ready now,' 'ready in 2-3 days,' or 'ready in 4-5 days.' You can pick a ripeness preference at checkout. If we get it wrong, we replace the box.",
      },
      {
        question: "How long do mangoes last after delivery?",
        answer:
          "At room temperature, 4-7 days depending on the ripeness lot. Once a mango fully ripens, refrigerate it and eat within a day.",
      },
      {
        question: "Are your mangoes organic?",
        answer:
          "Our orchard uses minimal-spray practices and traditional pest management. We are not officially certified organic — that's an expensive certification process we'll pursue in Year 2. We're transparent: ask us anything about how the fruit is grown.",
      },
    ],
  },
  {
    id: "problems-returns",
    title: "Problems & Returns",
    items: [
      {
        question: "What if a mango is damaged or spoiled?",
        answer:
          "Send us a photo on WhatsApp within 24 hours of delivery. We replace the box, no questions, no arguments. We'd rather lose the cost of a box than lose a customer over one bad fruit.",
      },
      {
        question: "What if I refuse the COD delivery?",
        answer:
          "You can. But since you've already paid the 30% advance, that portion is non-refundable for COD refusals — it covers the cost of the box, packing, and dispatch. Quality issues are a separate matter and are always made right.",
      },
      {
        question: "Can I cancel an order?",
        answer:
          "Before dispatch, yes — full refund. After dispatch, the box is already on the way. If there's a real issue, message us and we'll work it out.",
      },
      {
        question: "Can I get a refund vs store credit?",
        answer:
          "Default is store credit (more flexible for you, faster for us). If you want a cash refund, just say so.",
      },
    ],
  },
  {
    id: "corporate-gifting",
    title: "Corporate & Gifting",
    items: [
      {
        question: "Can I send a box to someone else?",
        answer:
          "Yes. Enter their address at checkout and add a personal note. We'll deliver it and confirm with you when it arrives.",
      },
      {
        question: "Do you do corporate gifting?",
        answer:
          "Yes. See our Corporate page for pricing, custom branding, and bulk delivery details.",
      },
      {
        question: "Can I customise the box?",
        answer:
          "Standard packaging is fixed. For corporate orders (25+ boxes), we offer custom-printed sleeves and full custom packaging. Message our B2B line.",
      },
      {
        question: "What about international gifting?",
        answer:
          "We deliver within Pakistan, but if you're abroad and want to send mangoes to family in Pakistan, that's our most-loved gift order. Pay in USD via Stripe, recipient gets the call when it arrives, we send you a photo.",
      },
    ],
  },
];
