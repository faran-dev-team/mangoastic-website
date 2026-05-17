import ContactPageContent from "@/components/ContactPageContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Mangoastic",
  description:
    "WhatsApp, email, and office details for Mangoastic orders, corporate gifting, and press.",
};

export default function ContactPage() {
  return <ContactPageContent />;
}
