import dynamic from "next/dynamic";
import type { Metadata } from "next";
import CorporateHero from "@/components/CorporateHero";

export const metadata: Metadata = {
  title: "Corporate Gifting — Mangoastic",
  description:
    "Premium mango gift boxes with your logo, hand-delivered across Pakistan. One contact, one invoice — built for HR and B2B teams.",
};

const CorporateTrustAndSteps = dynamic(
  () => import("@/components/CorporateTrustAndSteps"),
);
const CorporatePricingTiers = dynamic(
  () => import("@/components/CorporatePricingTiers"),
);
const CorporateUseCases = dynamic(
  () => import("@/components/CorporateUseCases"),
);
const CorporateLeadAndClosing = dynamic(
  () => import("@/components/CorporateLeadAndClosing"),
);

export default function CorporatePage() {
  return (
    <div className="flex flex-1 flex-col bg-black">
      <CorporateHero />
      <CorporateTrustAndSteps />
      <CorporatePricingTiers />
      <CorporateUseCases />
      <CorporateLeadAndClosing />
    </div>
  );
}
