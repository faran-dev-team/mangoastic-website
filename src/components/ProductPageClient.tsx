"use client";

import Link from "next/link";
import { useState, useCallback, useMemo } from "react";
import { ProductGallery, type GalleryTile } from "./pdp/ProductGallery";
import { ProductDetails } from "./pdp/ProductDetails";
import { ProductSelectors } from "./pdp/ProductSelectors";
import { ProductCTAs } from "./pdp/ProductCTAs";
import { ProductTabsSection, type Tab } from "./pdp/ProductTabsSection";
import { ProductReviews, type Review } from "./pdp/ProductReviews";
import { ProductRelated, type RelatedItem } from "./pdp/ProductRelated";
import { ProductFooterCTA } from "./pdp/ProductFooterCTA";

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

export default function ProductPageClient({ product }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileOpenTab, setMobileOpenTab] = useState<number | null>(0);
  const [ripeness, setRipeness] = useState<
    | "Ready to eat in 1-2 days"
    | "Ready in 3-4 days"
    | "Mixed (for sharing across the week)"
  >("Mixed (for sharing across the week)");
  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState<Record<string, boolean>>({
    "mango-honey": false,
    aamras: false,
    "gift-note": true,
  });

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

        {/* Hero Section: Gallery + Details */}
        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <ProductGallery
            mainImage={product.image}
            productName={product.name}
            gallery={product.gallery}
          />

          {/* Product Details + Selectors in sticky sidebar */}
          <div>
            <ProductDetails
              name={product.name}
              weight={product.weight}
              price={product.price}
              description={product.description}
              highlight={product.highlight}
              heroNote={product.heroNote}
            />

            <ProductSelectors
              ripeness={ripeness}
              onRipenessChange={setRipeness}
              quantity={quantity}
              onQuantityChange={setQuantity}
              addons={addons}
              onAddonsChange={setAddons}
              productPrice={product.price}
            />

            <ProductCTAs
              productBreadcrumb={product.breadcrumb}
              productPrice={product.price}
              quantity={quantity}
              whatsappMessage={whatsappMessage}
            />
          </div>
        </div>

        {/* Sections Below */}
        <ProductTabsSection
          tabs={product.tabs}
          activeTabIndex={activeTab}
          onActiveTabChange={setActiveTab}
          mobileOpenTabIndex={mobileOpenTab}
          onMobileOpenTabChange={setMobileOpenTab}
        />

        <ProductReviews reviews={product.reviews} />

        <ProductRelated related={product.related} />

        <ProductFooterCTA whatsappMessage={whatsappMessage} />
      </div>
    </div>
  );
}
