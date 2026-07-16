"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductGallery } from "./pdp/ProductGallery";
import { ProductDetails } from "./pdp/ProductDetails";
import { ProductSelectors } from "./pdp/ProductSelectors";
import { DeliveryDetails, type DeliveryDetailsValue } from "./pdp/DeliveryDetails";
import { ProductCTAs } from "./pdp/ProductCTAs";
import { ProductTabsSection } from "./pdp/ProductTabsSection";
import { ProductReviews } from "./pdp/ProductReviews";
import { ProductRelated, type RelatedItem } from "./pdp/ProductRelated";
import { ProductFooterCTA } from "./pdp/ProductFooterCTA";
import {
  type BoxWeight,
  type MangoProduct,
  formatPKR,
  getProductPrice,
} from "@/data/products";
import { usePlaceOrder } from "@/hooks/usePlaceOrder";

type Props = {
  product: MangoProduct;
  related: RelatedItem[];
};

const EMPTY_DELIVERY: DeliveryDetailsValue = {
  customerName: "",
  phoneNumber: "",
  city: "",
  address: "",
  landmark: "",
  notes: "",
};

const ADDON_LABELS: Record<string, string> = {
  "mango-honey": "Mango Honey 250g",
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
  const [delivery, setDelivery] = useState<DeliveryDetailsValue>(EMPTY_DELIVERY);
  const [clientError, setClientError] = useState<string | null>(null);

  const {
    isSubmitting,
    isSuccess,
    errorMessage,
    fieldErrors,
    placeOrder,
    resetError,
  } = usePlaceOrder();

  const selectedPrice = getProductPrice(product, boxWeight);
  const weightLabel = boxWeight === "5kg" ? "5 kg" : "8 kg";

  const selectedAddonLabels = useMemo(
    () =>
      Object.entries(addons)
        .filter(([, checked]) => checked)
        .map(([key]) => ADDON_LABELS[key] ?? key),
    [addons],
  );

  const totalPrice = useMemo(() => {
    const base = Number(selectedPrice.replace(/[^0-9]/g, ""));
    const addonTotal = addons["mango-honey"] ? 850 : 0;
    return (base + addonTotal) * quantity;
  }, [addons, quantity, selectedPrice]);

  const totalPriceLabel = formatPKR(totalPrice);

  const validateClient = (): string | null => {
    if (!delivery.customerName.trim()) return "Please enter your full name.";
    if (!delivery.phoneNumber.trim()) return "Please enter your phone number.";
    if (!delivery.city.trim()) return "Please enter your city.";
    if (!delivery.address.trim() || delivery.address.trim().length < 5) {
      return "Please enter a complete delivery address.";
    }
    return null;
  };

  const handlePlaceOrder = async () => {
    resetError();
    setClientError(null);

    const validationMessage = validateClient();
    if (validationMessage) {
      setClientError(validationMessage);
      return;
    }

    await placeOrder(
      {
        customerName: delivery.customerName.trim(),
        phoneNumber: delivery.phoneNumber.trim(),
        city: delivery.city.trim(),
        address: delivery.address.trim(),
        landmark: delivery.landmark.trim() || undefined,
        notes: delivery.notes.trim() || undefined,
        mangoName: product.name,
        boxSize: boxWeight,
        quantity,
        ripeness,
        addons: selectedAddonLabels,
      },
      {
        customerName: delivery.customerName.trim(),
        phoneNumber: delivery.phoneNumber.trim(),
        city: delivery.city.trim(),
        address: delivery.address.trim(),
        landmark: delivery.landmark.trim() || undefined,
        notes: delivery.notes.trim() || undefined,
        mangoName: product.name,
        boxSize: weightLabel,
        quantity,
        ripeness,
        addons: selectedAddonLabels,
        totalPrice,
      },
    );
  };

  // Footer WhatsApp keeps a helpful prefilled message (no order ID until placed).
  const supportWhatsAppMessage = encodeURIComponent(
    `Hi Mangoastic, I have a question about ${product.name} (${weightLabel} box).`,
  );

  const combinedError = clientError || errorMessage;

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

            <DeliveryDetails
              value={delivery}
              onChange={(next) => {
                setDelivery(next);
                setClientError(null);
                resetError();
              }}
              fieldErrors={fieldErrors}
              disabled={isSubmitting || isSuccess}
            />

            <ProductCTAs
              productPrice={selectedPrice}
              quantity={quantity}
              totalPriceLabel={totalPriceLabel}
              isSubmitting={isSubmitting}
              isSuccess={isSuccess}
              errorMessage={combinedError}
              onPlaceOrder={() => {
                void handlePlaceOrder();
              }}
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

        <ProductFooterCTA whatsappMessage={supportWhatsAppMessage} />
      </div>
    </div>
  );
}
