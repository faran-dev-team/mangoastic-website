import dynamic from "next/dynamic";
import ShopHero from "@/components/ShopHero";

export const revalidate = 0;

const SeasonBoxes = dynamic(() => import("@/components/SeasonBoxes"));
const CorporateGiftingStrip = dynamic(
  () => import("@/components/CorporateGiftingStrip"),
);

export default function ShopPage() {
  return (
    <div className="flex flex-col flex-1 bg-black">
      <ShopHero />
      <SeasonBoxes />
      <CorporateGiftingStrip />
    </div>
  );
}
