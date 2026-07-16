import type { Metadata } from "next";
import PageContainer from "@/components/admin/dashboard/PageContainer";
import PageSection from "@/components/admin/dashboard/PageSection";
import CustomersTableSection from "@/components/admin/customers/CustomersTableSection";

export const metadata: Metadata = {
  title: "Customers — Mangoastic Admin",
};

/**
 * Customer directory — derived from existing orders (no Customer table).
 */
export default function AdminCustomersPage() {
  return (
    <PageContainer>
      <PageSection>
        <p className="font-outfit text-[10px] font-semibold uppercase tracking-[0.22em] text-[var(--admin-accent)] sm:text-xs">
          Directory
        </p>
        <h2 className="mt-2 font-sirelia text-3xl text-[var(--admin-text)] sm:text-4xl">
          Customers
        </h2>
        <p className="mt-3 max-w-xl font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)] sm:text-base">
          Every buyer who has placed an order — spend, frequency, and active
          deliveries in one place.
        </p>
      </PageSection>

      <div className="mt-8">
        <CustomersTableSection />
      </div>
    </PageContainer>
  );
}
