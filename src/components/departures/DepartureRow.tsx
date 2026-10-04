import clsx from "clsx";
import { Clock, Plane } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { tripHref } from "@/components/trips/TripCard";
import type { UpcomingDeparture } from "@/data/trips";
import { formatDepartureDate, formatDuration, formatRupees } from "@/lib/format";

/** Seat counts at or below this turn the status brand red and the button primary. */
const LOW_SEATS = 4;

function seatStatus(seatsLeft: number | null) {
  if (seatsLeft === null || seatsLeft <= 0) return { label: "Waitlist open", low: false };
  return { label: `${seatsLeft} ${seatsLeft === 1 ? "seat" : "seats"} left`, low: seatsLeft <= LOW_SEATS };
}

type DepartureRowProps = {
  departure: UpcomingDeparture;
};

/**
 * One group departure (DESIGN.md section 4). From 768px it is a five-column row
 * inside DepartureList's bordered table; below that it is the stacked row from
 * design-reference/mobile-home.html, where the trip name links to the trip.
 */
export function DepartureRow({ departure }: DepartureRowProps) {
  const { trip } = departure;
  const date = formatDepartureDate(departure.date);
  const seats = seatStatus(departure.seatsLeft);
  const href = tripHref(trip);
  const duration = formatDuration(trip.nights, trip.days);
  const price = formatRupees(departure.price);
  const seatColour = seats.low ? "text-brand" : "text-muted";

  return (
    <li className="border-t border-line md:bg-white md:first:border-t-0">
      {/* Mobile: stacked */}
      <div className="relative flex gap-3.5 py-4 md:hidden">
        <div className="flex h-16 w-[60px] shrink-0 flex-col items-center justify-center rounded-control bg-paper leading-none">
          <span className="font-serif text-[1.6rem]">{date.day}</span>
          <span className="mt-1 text-[0.8rem] text-muted">{date.month}</span>
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <Link
            href={href}
            className="font-serif text-[1.15rem] leading-[1.2] text-ink no-underline after:absolute after:inset-0 after:content-['']"
          >
            {trip.title}
            <span className="sr-only">, departs {date.full}</span>
          </Link>
          <span className="text-[0.85rem] text-muted">
            {duration}, from {departure.fromCity}
          </span>
          <span className="mt-1 flex justify-between gap-3">
            <strong className="font-semibold">{price}</strong>
            <span className={clsx("text-[0.85rem] font-medium", seatColour)}>{seats.label}</span>
          </span>
        </div>
      </div>

      {/* Tablet and desktop: one row */}
      <div className="hidden grid-cols-[96px_minmax(0,2.2fr)_minmax(0,1.2fr)_minmax(0,1fr)_auto] items-center gap-5 px-6 py-5 md:grid">
        <div className="flex size-[72px] flex-col items-center justify-center rounded-xl bg-paper leading-none">
          <span className="font-serif text-[1.9rem] font-medium">{date.day}</span>
          <span className="mt-1 text-[0.85rem] text-muted">
            {date.month}, {date.weekday}
          </span>
        </div>

        <div className="flex min-w-0 flex-col gap-1">
          <span className="font-serif text-[1.35rem] leading-[1.2] font-medium">{trip.title}</span>
          <span className="inline-flex flex-wrap gap-4 text-[0.92rem] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <Clock size={15} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
              {duration}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Plane size={15} strokeWidth={1.8} aria-hidden="true" className="shrink-0" />
              From {departure.fromCity}
            </span>
          </span>
        </div>

        <div className="flex flex-col leading-[1.25]">
          <span className="text-[1.2rem] font-semibold">{price}</span>
          <span className="text-[0.85rem] text-muted">per person, twin sharing</span>
        </div>

        <span className={clsx("inline-flex items-center gap-2 text-[0.95rem] font-medium", seatColour)}>
          <span aria-hidden="true" className="size-2 shrink-0 rounded-pill bg-current" />
          {seats.label}
        </span>

        <Button href={href} variant={seats.low ? "primary" : "outline"} size="sm">
          Reserve a seat
          <span className="sr-only">
            : {trip.title}, {date.full}
          </span>
        </Button>
      </div>
    </li>
  );
}
