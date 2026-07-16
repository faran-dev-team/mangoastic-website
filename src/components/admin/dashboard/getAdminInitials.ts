/**
 * Derive 1–2 letter avatar initials from an admin display name.
 */
export function getAdminInitials(name: string | undefined | null): string {
  if (!name?.trim()) {
    return "A";
  }
  const parts = name.trim().split(/\s+/).slice(0, 2);
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("") || "A";
}
