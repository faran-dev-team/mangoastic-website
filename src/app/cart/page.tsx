import CartPageContent from "@/components/CartPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cart — Mangoastic",
  description: "Review your mango box order before checkout.",
};

export default function CartPage() {
  return <CartPageContent />;
}
