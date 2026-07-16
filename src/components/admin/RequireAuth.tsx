"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

type RequireAuthProps = {
  children: ReactNode;
};

/**
 * Client gate for protected admin pages.
 * Shows a calm loading state while session restores, then redirects
 * unauthenticated users to /admin/login without flickering content.
 */
export default function RequireAuth({ children }: RequireAuthProps) {
  const router = useRouter();
  const { status, isAuthenticated } = useAuth();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/admin/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div
          className="flex flex-col items-center gap-3"
          role="status"
          aria-live="polite"
        >
          <span
            className="h-8 w-8 animate-spin rounded-full border-2 border-mango/30 border-t-mango"
            aria-hidden
          />
          <p className="font-outfit text-sm text-zinc-400">
            Checking your session…
          </p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <div
          className="flex flex-col items-center gap-3"
          role="status"
          aria-live="polite"
        >
          <span
            className="h-8 w-8 animate-spin rounded-full border-2 border-mango/30 border-t-mango"
            aria-hidden
          />
          <p className="font-outfit text-sm text-zinc-400">
            Redirecting to sign in…
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
