import SeasonPassPageContent from "@/components/SeasonPassPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Season Pass — Mangoastic",
  description:
    "12 weekly mango boxes, one price. Delivered every Friday. Save 16% vs single orders. PKR 34,500 with free delivery — pause anytime.",
};

export default function SeasonPassPage() {
  return <SeasonPassPageContent />;
}
