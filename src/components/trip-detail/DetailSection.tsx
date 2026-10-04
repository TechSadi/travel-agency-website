import clsx from "clsx";
import type { ReactNode } from "react";

type DetailSectionProps = {
  id: string;
  title: ReactNode;
  /** Shown at the right of the heading row, e.g. the itinerary's "Expand all". */
  action?: ReactNode;
  className?: string;
  children: ReactNode;
};

/** A section of the trip detail main column: anchor target for SectionTabs plus a sub-section h2. */
export function DetailSection({ id, title, action, className, children }: DetailSectionProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={clsx("scroll-mt-[calc(var(--tabs-h)-12px)] pt-9 md:pt-12", className)}
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 md:mb-[22px]">
        <h2 id={`${id}-title`} className="text-[1.65rem] leading-[1.15] tracking-[-0.01em] md:text-subsection">
          {title}
        </h2>
        {action}
      </div>
      {children}
    </section>
  );
}
