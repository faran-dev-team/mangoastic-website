import CorporateHero from "@/components/CorporateHero";
import CorporatePricingTiers from "@/components/CorporatePricingTiers";
import CorporateLeadAndClosing from "@/components/CorporateLeadAndClosing";
import CorporateUseCases from "@/components/CorporateUseCases";
import CorporateTrustAndSteps from "@/components/CorporateTrustAndSteps";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Corporate Gifting — Mangoastic",
  description:
    "Premium mango gift boxes with your logo, hand-delivered across Pakistan. One contact, one invoice — built for HR and B2B teams.",
};

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
