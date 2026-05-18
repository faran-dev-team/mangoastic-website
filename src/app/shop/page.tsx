import ShopHero from "@/components/ShopHero";
import SeasonBoxes from "@/components/SeasonBoxes";
import CorporateGiftingStrip from "@/components/CorporateGiftingStrip";

export const revalidate = 0;

export default function ShopPage() {
  return (
    <div className="flex flex-col flex-1 bg-black">
      <ShopHero />
      <SeasonBoxes />
      <CorporateGiftingStrip />
    </div>
  );
}
