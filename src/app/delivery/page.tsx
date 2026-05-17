import DeliveryPageContent from "@/components/DeliveryPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Delivery & Returns — Mangoastic",
  description:
    "Delivery areas, times, fees, payment options, quality guarantee, refunds, and Season Pass policies.",
};

export default function DeliveryPage() {
  return <DeliveryPageContent />;
}
