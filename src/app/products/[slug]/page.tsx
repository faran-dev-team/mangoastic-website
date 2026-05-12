import { notFound } from "next/navigation";

type Props = {
  params: { slug: string };
};

export default function ProductPage({ params }: Props) {
  const { slug } = params;
  if (!slug) return notFound();

  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-4">Product: {slug}</h1>
      <p className="text-zinc-600">Product page stub — replace with PDP layout.</p>
    </div>
  );
}
