import SeasonPassHero from "@/components/SeasonPassHero";
import SeasonPassHowItWorks from "@/components/SeasonPassHowItWorks";
import SeasonPassFaqMini from "@/components/SeasonPassFaqMini";
import SeasonPassWhyBestDeal from "@/components/SeasonPassWhyBestDeal";
import type { Metadata } from "next";
import FooterCta from "@/components/FooterCta";

export const metadata: Metadata = {
  title: "Season Pass — Mangoastic",
  description:
    "12 weekly mango boxes, one price. Delivered every Friday. Save 16% vs single orders. PKR 34,500 with free delivery — pause anytime.",
};

export default function SeasonPassPage() {
  return (
    <div className="flex flex-1 flex-col bg-black">
      <SeasonPassHero />
      <SeasonPassHowItWorks />
      <SeasonPassWhyBestDeal />
      <SeasonPassFaqMini />
      <FooterCta />

    </div>
  );
}
