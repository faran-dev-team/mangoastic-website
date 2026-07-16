import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AuthProvider } from "@/lib/auth/AuthProvider";

export const metadata: Metadata = {
  title: "Admin — Mangoastic",
  description: "Mangoastic administrator console",
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <AuthProvider>
      <div className="min-h-dvh bg-[var(--admin-bg)] text-[var(--admin-text)]">
        {children}
      </div>
    </AuthProvider>
  );
}
