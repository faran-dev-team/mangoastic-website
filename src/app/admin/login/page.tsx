import type { Metadata } from "next";
import AdminLoginForm from "@/components/admin/AdminLoginForm";

export const metadata: Metadata = {
  title: "Admin Sign In — Mangoastic",
};

export default function AdminLoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,163,10,0.12),_transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 flex flex-col items-center text-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/logo-mangoastic.svg"
            alt="Mangoastic"
            className="h-auto w-44 object-contain sm:w-52"
          />
          <p className="mt-5 font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-mango sm:text-xs">
            Administrator Access
          </p>
          <h1 className="mt-2 font-sirelia text-3xl text-zinc-50 sm:text-4xl">
            Sign in
          </h1>
          <p className="mt-2 max-w-sm font-outfit text-sm text-zinc-400">
            Enter your credentials to access the Mangoastic admin console.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-800/80 bg-black/50 p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] backdrop-blur-sm sm:p-8">
          <AdminLoginForm />
        </div>
      </div>
    </div>
  );
}
