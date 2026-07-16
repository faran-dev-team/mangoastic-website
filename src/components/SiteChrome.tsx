"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import { memo, type ReactNode } from "react";

const Header = dynamic(() => import("@/components/Header"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });
const ScrollToTop = dynamic(() => import("@/components/ScrollToTop"), {
  ssr: false,
});

type SiteChromeProps = {
  children: ReactNode;
};

/**
 * Renders marketing Header/Footer for public pages.
 * Admin routes get a bare shell so they own their own chrome.
 * Marketing chrome is code-split so admin routes never pull Header/Footer JS.
 */
function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin") ?? false;

  if (isAdminRoute) {
    return <div className="flex min-h-full flex-1 flex-col">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ScrollToTop />
    </>
  );
}

export default memo(SiteChrome);
