import ProductPageClient from "@/components/ProductPageClient";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/data/products";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return { title: "Product — Mangoastic" };
  }

  return {
    title: `${product.name} — Mangoastic`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const related = getRelatedProducts(slug);

  return <ProductPageClient product={product} related={related} />;
}
