"use client";

import SeasonPassHero from "@/components/SeasonPassHero";
import SeasonPassHowItWorks from "@/components/SeasonPassHowItWorks";
import SeasonPassFaqMini from "@/components/SeasonPassFaqMini";
import SeasonPassWhyBestDeal from "@/components/SeasonPassWhyBestDeal";
import FooterCta from "@/components/FooterCta";
import { ComingSoonToast } from "@/components/ComingSoonToast";
import { useComingSoonToast } from "@/hooks/useComingSoonToast";

export default function SeasonPassPageContent() {
  const { open, trigger: showComingSoon, dismiss } = useComingSoonToast();

  return (
    <div className="flex flex-1 flex-col bg-black">
      <ComingSoonToast
        open={open}
        onClose={dismiss}
        description="Season Pass reservations aren't live yet."
      />
      <SeasonPassHero onReservePass={showComingSoon} />
      <SeasonPassHowItWorks />
      <SeasonPassWhyBestDeal />
      <SeasonPassFaqMini />
      <FooterCta onReservePass={showComingSoon} reservePassComingSoon />
    </div>
  );
}
