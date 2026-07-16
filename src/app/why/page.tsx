import dynamic from "next/dynamic";
import WhyHero from "@/components/WhyHero";

export const revalidate = 0;

const SixReasons = dynamic(() => import("@/components/SixReasons"));
const ComparisonTable = dynamic(() => import("@/components/ComparisonTable"));
const ClosingCta = dynamic(() => import("@/components/ClosingCta"));

export default function WhyPage() {
  return (
    <div className="flex flex-col flex-1 bg-black">
      <WhyHero />
      <SixReasons />
      <ComparisonTable />
      <ClosingCta />
    </div>
  );
}
