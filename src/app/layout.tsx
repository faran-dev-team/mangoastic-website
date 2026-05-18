import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

/** PDF brand combo: Outfit (simple UI / body), “Sirelia” = Playfair Display (titles / display). */
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const sirelia = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-sirelia",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mangoastic — Premium Mangoes Delivered",
  description:
    "Single-orchard mangoes hand-picked and delivered across Pakistan.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${sirelia.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col font-outfit"
        suppressHydrationWarning
      >
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
