import clsx from "clsx";
import type { UpcomingDeparture } from "@/data/trips";
import { DepartureRow } from "./DepartureRow";

type DepartureListProps = {
  departures: UpcomingDeparture[];
  /** Accessible name for the list, e.g. "Upcoming group departures". */
  label?: string;
  className?: string;
};

/**
 * Group departures table. From 768px the rows sit in one bordered, rounded box that
 * scrolls sideways on its own below 860px; on mobile the rows stack with top rules.
 */
export function DepartureList({ departures, label = "Group departures", className }: DepartureListProps) {
  return (
    <div className={clsx("relative md:overflow-x-auto md:rounded-card md:border md:border-line", className)}>
      <ul aria-label={label} className="md:min-w-[860px]">
        {departures.map((departure) => (
          <DepartureRow key={`${departure.trip.slug}-${departure.date}`} departure={departure} />
        ))}
      </ul>
    </div>
  );
}
