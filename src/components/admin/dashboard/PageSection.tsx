import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

type PageSectionProps = {
  children: ReactNode;
  className?: string;
  title?: string;
  description?: string;
  /** Optional trailing actions (buttons, filters — later phases). */
  actions?: ReactNode;
  id?: string;
};

/**
 * Semantic section within a dashboard page.
 * One purpose per section: title, optional description, optional actions, content.
 */
export default function PageSection({
  children,
  className,
  title,
  description,
  actions,
  id,
}: PageSectionProps) {
  const headingId = id ? `${id}-heading` : undefined;

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn("admin-section-enter space-y-4", className)}
    >
      {(title || description || actions) && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="min-w-0 space-y-1">
            {title ? (
              <h2
                id={headingId}
                className="font-outfit text-base font-semibold tracking-tight text-[var(--admin-text)]"
              >
                {title}
              </h2>
            ) : null}
            {description ? (
              <p className="max-w-2xl font-outfit text-sm leading-relaxed text-[var(--admin-text-muted)]">
                {description}
              </p>
            ) : null}
          </div>
          {actions ? (
            <div className="flex shrink-0 flex-wrap items-center gap-2">
              {actions}
            </div>
          ) : null}
        </div>
      )}
      {children}
    </section>
  );
}
