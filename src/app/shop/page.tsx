import ShopHero from "@/components/ShopHero";
import SeasonBoxes from "@/components/SeasonBoxes";
import CorporateGiftingStrip from "@/components/CorporateGiftingStrip";

export const revalidate = 0;

export default function ShopPage() {
  return (
    <>
      <ShopHero />
      <SeasonBoxes />
    </>
  );
}
