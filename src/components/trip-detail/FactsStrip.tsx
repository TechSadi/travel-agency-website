import clsx from "clsx";
import { Calendar, Clock, MapPin, Plane, Users, type LucideIcon } from "lucide-react";
import type { Trip } from "@/data/types";
import { formatDuration } from "@/lib/format";

type Fact = { label: string; value: string; icon: LucideIcon };

function factsOf(trip: Trip): Fact[] {
  return [
    { label: "Duration", value: formatDuration(trip.nights, trip.days), icon: Clock },
    { label: "Starts and ends", value: trip.facts.startsAndEnds, icon: MapPin },
    { label: "Group size", value: trip.facts.groupSize, icon: Users },
    { label: "Best time", value: trip.facts.bestTime, icon: Calendar },
    { label: "Flights", value: trip.facts.flights, icon: Plane },
  ];
}

/**
 * Key trip facts. Desktop: one bordered card of icon tiles (trip-kashmir.html).
 * Phones: two columns of paper tiles without icons (mobile-trip.html); the fifth spans both.
 */
export function FactsStrip({ trip }: { trip: Trip }) {
  return (
    <dl
      className={clsx(
        "grid grid-cols-2 gap-3",
        "md:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] md:gap-5 md:rounded-card md:border md:border-line md:p-6",
      )}
    >
      {factsOf(trip).map(({ label, value, icon: Icon }) => (
        // A <dl> group may only hold <dt> and <dd>, so the icon sits inside the <dt>, absolutely placed in the left padding.
        <div
          key={label}
          className="relative flex flex-col rounded-control bg-paper p-3 leading-[1.3] last:odd:col-span-2 md:min-h-11 md:bg-transparent md:p-0 md:pl-14 md:last:odd:col-span-1"
        >
          <dt className="text-[0.85rem] text-muted md:text-[0.88rem]">
            <span
              aria-hidden="true"
              className="absolute top-0 left-0 hidden size-11 items-center justify-center rounded-control bg-brand-tint text-brand md:inline-flex"
            >
              <Icon size={20} strokeWidth={1.8} />
            </span>
            {label}
          </dt>
          <dd className="text-[0.95rem] font-medium md:text-copy">{value}</dd>
        </div>
      ))}
    </dl>
  );
}
