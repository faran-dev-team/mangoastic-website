import WhyHero from "@/components/WhyHero";
import SixReasons from "@/components/SixReasons";
import ComparisonTable from "@/components/ComparisonTable";
import ClosingCta from "@/components/ClosingCta";

export const revalidate = 0;

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
