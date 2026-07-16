import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

/**
 * Above-the-fold stays eager for LCP.
 * Below-the-fold sections are code-split so the browser does not parse / hydrate
 * GSAP + Framer + slick for the entire page on first paint.
 * SSR remains enabled — HTML/appearance stay identical.
 */
const Features = dynamic(() => import("@/components/Features"));
const WhyWeCost = dynamic(() => import("@/components/WhyWeCost"));
const SeasonBoxes = dynamic(() => import("@/components/SeasonBoxes"));
const ReelsWall = dynamic(() => import("@/components/ReelsWall"));
const OrchardStoryMini = dynamic(() => import("@/components/OrchardStoryMini"));
const CorporateGiftingStrip = dynamic(
  () => import("@/components/CorporateGiftingStrip"),
);
const PressStrip = dynamic(() => import("@/components/PressStrip"));
const FooterCta = dynamic(() => import("@/components/FooterCta"));

export default function Home() {
  return (
    <div className="flex flex-col flex-1 bg-black">
      <main className="flex flex-1 flex-col">
        <Hero />
        <Features />
        <WhyWeCost />
        <SeasonBoxes />
        <ReelsWall />
        <OrchardStoryMini />
        <CorporateGiftingStrip />
        <PressStrip />
        <FooterCta />
      </main>
    </div>
  );
}
