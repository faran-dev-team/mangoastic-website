import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import "./globals.css";
import ConversionShell from "@/components/conversion/ConversionShell";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

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
        <main className="flex-1 pb-[calc(4.25rem+env(safe-area-inset-bottom))] md:pb-0">
          {children}
        </main>
        <Footer />
        <ConversionShell />
      </body>
    </html>
  );
}
