import ShopHero from "@/components/ShopHero";

export const revalidate = 0;

export default function ShopPage() {
  return (
    <>
      <ShopHero />

      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="card p-4">Product card placeholder</div>
          <div className="card p-4">Product card placeholder</div>
          <div className="card p-4">Product card placeholder</div>
        </div>
      </div>
    </>
  );
}
