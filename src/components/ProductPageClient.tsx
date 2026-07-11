"use client";

import Link from "next/link";
import { useState } from "react";
import { ProductGallery } from "./pdp/ProductGallery";
import { ProductDetails } from "./pdp/ProductDetails";
import { ProductSelectors } from "./pdp/ProductSelectors";
import { ProductCTAs } from "./pdp/ProductCTAs";
import { ProductTabsSection } from "./pdp/ProductTabsSection";
import { ProductReviews } from "./pdp/ProductReviews";
import { ProductRelated, type RelatedItem } from "./pdp/ProductRelated";
import { ProductFooterCTA } from "./pdp/ProductFooterCTA";
import {
  type BoxWeight,
  type MangoProduct,
  getProductPrice,
} from "@/data/products";

type Props = {
  product: MangoProduct;
  related: RelatedItem[];
};

export default function ProductPageClient({ product, related }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const [mobileOpenTab, setMobileOpenTab] = useState<number | null>(0);
  const [boxWeight, setBoxWeight] = useState<BoxWeight>("5kg");
  const [ripeness, setRipeness] = useState<
    | "Ready to eat in 1-2 days"
    | "Ready in 3-4 days"
    | "Mixed (for sharing across the week)"
  >("Mixed (for sharing across the week)");
  const [quantity, setQuantity] = useState(1);
  const [addons, setAddons] = useState<Record<string, boolean>>({
    "mango-honey": false,
  });

  const selectedPrice = getProductPrice(product, boxWeight);
  const weightLabel = boxWeight === "5kg" ? "5 kg" : "8 kg";

  const whatsappMessage = encodeURIComponent(
    `Hi Mangoastic, I'd like to order ${quantity} x ${product.name} (${weightLabel} box). Price: ${selectedPrice}. Ripeness: ${ripeness}. Add-ons: ${
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
          <span>Varieties</span>
          <span className="mx-2">/</span>
          <span className="text-zinc-900">{product.breadcrumb}</span>
        </nav>

        <div className="mt-6 grid gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <ProductGallery
            mainImage={product.image}
            productName={product.name}
            gallery={product.gallery}
          />

          <div>
            <ProductDetails
              name={product.name}
              weight={`${weightLabel} box`}
              price={selectedPrice}
              description={product.description}
              highlight={product.highlight}
              heroNote={product.heroNote}
            />

            <ProductSelectors
              boxWeight={boxWeight}
              onBoxWeightChange={setBoxWeight}
              pricing={product.pricing}
              ripeness={ripeness}
              onRipenessChange={setRipeness}
              quantity={quantity}
              onQuantityChange={setQuantity}
              addons={addons}
              onAddonsChange={setAddons}
              productPrice={selectedPrice}
            />

            <ProductCTAs
              productPrice={selectedPrice}
              quantity={quantity}
              whatsappMessage={whatsappMessage}
            />
          </div>
        </div>

        <ProductTabsSection
          tabs={product.tabs}
          activeTabIndex={activeTab}
          onActiveTabChange={setActiveTab}
          mobileOpenTabIndex={mobileOpenTab}
          onMobileOpenTabChange={setMobileOpenTab}
        />

        <ProductReviews reviews={product.reviews} />

        <ProductRelated related={related} />

        <ProductFooterCTA whatsappMessage={whatsappMessage} />
      </div>
    </div>
  );
}
