import type { Destination } from "@/data/types";

/** Destinations open the trips list filtered to that destination (DESIGN.md section 5, Trips). */
export function destinationHref(destination: Pick<Destination, "slug">) {
  return `/trips?dest=${destination.slug}`;
}

/** "1 trip", "14 trips". */
export function tripCountLabel(count: number) {
  return `${count} ${count === 1 ? "trip" : "trips"}`;
}
