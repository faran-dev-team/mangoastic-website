/**
 * Shared currency formatting for storefront + admin.
 * Kept separate from product catalog data to avoid pulling catalog into admin bundles.
 */
export function formatPKR(amount: number): string {
  return `PKR ${amount.toLocaleString("en-PK")}`;
}
