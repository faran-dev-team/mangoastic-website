import { redirect } from "next/navigation";

/** /admin → /admin/dashboard (server redirect — no client hydration). */
export default function AdminIndexPage() {
  redirect("/admin/dashboard");
}
