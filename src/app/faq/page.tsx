import FaqPageContent from "@/components/FaqPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Mangoastic",
  description:
    "Answers about ordering, delivery, mango varieties, returns, corporate gifting, and more.",
};

export default function FAQPage() {
  return <FaqPageContent />;
}
