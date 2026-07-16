import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Track Your Box — Mangoastic",
  robots: { index: false, follow: false },
};

export default function TrackPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <h1 className="text-3xl font-semibold mb-4">Track Your Box</h1>
      <p className="text-zinc-600">Post-purchase tracking and order status (stub).</p>
    </div>
  );
}
