export const revalidate = 0;

export default function ShopPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-4">Shop</h1>
      <p className="text-zinc-600 mb-6">Browse our seasonal boxes and gift edits.</p>

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        <div className="card p-4">Product card placeholder</div>
        <div className="card p-4">Product card placeholder</div>
        <div className="card p-4">Product card placeholder</div>
      </div>
    </div>
  );
}
