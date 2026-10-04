import clsx from "clsx";
import type { ReactNode } from "react";
import type { UpcomingDeparture } from "@/data/trips";
import { DepartureRow } from "./DepartureRow";

type DepartureListProps = {
  /** Rows to render. Alternatively pass already rendered `<DepartureRow>`s as children. */
  departures?: UpcomingDeparture[];
  children?: ReactNode;
  /** Accessible name for the list, e.g. "Upcoming group departures". */
  label?: string;
  /** Show only the first 3 rows on phones, as design-reference/mobile-home.html does. */
  mobilePreview?: boolean;
  className?: string;
};

/**
 * Group departures table. From 768px the rows sit in one bordered, rounded box that
 * scrolls sideways on its own below 860px; on mobile the rows stack with top rules.
 */
export function DepartureList({
  departures,
  children,
  label = "Group departures",
  mobilePreview = false,
  className,
}: DepartureListProps) {
  return (
    <div className={clsx("relative md:overflow-x-auto md:rounded-card md:border md:border-line", className)}>
      <ul aria-label={label} className={clsx("md:min-w-[860px]", mobilePreview && "max-md:[&>li:nth-child(n+4)]:hidden")}>
        {departures?.map((departure) => (
          <DepartureRow key={`${departure.trip.slug}-${departure.date}`} departure={departure} />
        ))}
        {children}
      </ul>
    </div>
  );
}
