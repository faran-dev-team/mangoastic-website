import Hero from "@/components/Hero";
import Features from "@/components/Features";
import WhyWeCost from "@/components/WhyWeCost";
import SeasonBoxes from "@/components/SeasonBoxes";
import ReelsWall from "@/components/ReelsWall";
import OrchardStoryMini from "@/components/OrchardStoryMini";
import CorporateGiftingStrip from "@/components/CorporateGiftingStrip";
import PressStrip from "@/components/PressStrip";
import FooterCta from "@/components/FooterCta";

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
