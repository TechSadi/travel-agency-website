import { getDestinationBySlug } from "./destinations";
import { reviews } from "./reviews";
import { trips } from "./trips";
import type { Review, Trip } from "./types";

// Helpers for the trip detail page (DESIGN.md section 5, Trip detail).

/**
 * Reviews of this trip. A trip without its own reviews (most variants) borrows the
 * reviews of other trips to the same destination; each card names its trip, so that stays honest.
 */
export function getTripReviews(trip: Trip, limit = 2): Review[] {
  const own = reviews.filter((review) => review.tripSlug === trip.slug);
  if (own.length > 0) return own.slice(0, limit);

  const sameDestination = new Set(
    trips.filter((other) => other.destinationSlug === trip.destinationSlug).map((other) => other.slug),
  );
  return reviews.filter((review) => review.tripSlug && sameDestination.has(review.tripSlug)).slice(0, limit);
}

/**
 * "You might also like": trips that share a type with this one, ranked by how many types
 * they share, then rating. One trip per destination, and none from this trip's own
 * destination, so a Kashmir page suggests other places (as in trip-kashmir.html) rather
 * than three Kashmir variants. Falls back to same-destination trips if that leaves too few.
 */
export function getRelatedTrips(trip: Trip, limit = 3): Trip[] {
  const sharedTypes = (other: Trip) => other.types.filter((type) => trip.types.includes(type)).length;
  const ranked = trips
    .filter((other) => other.slug !== trip.slug)
    .sort((a, b) => sharedTypes(b) - sharedTypes(a) || b.rating - a.rating || b.reviewCount - a.reviewCount);

  const seen = new Set<string>([trip.destinationSlug]);
  const picked: Trip[] = [];
  for (const other of ranked) {
    if (picked.length === limit) break;
    if (sharedTypes(other) === 0 || seen.has(other.destinationSlug)) continue;
    seen.add(other.destinationSlug);
    picked.push(other);
  }
  for (const other of ranked) {
    if (picked.length === limit) break;
    if (other.destinationSlug === trip.destinationSlug && !picked.includes(other)) picked.push(other);
  }
  return picked;
}

/** Short place name for the breadcrumb and "Talk to our Kashmir expert": the destination, or its country when the name is a pair of places. */
export function shortPlaceOf(trip: Trip): string {
  const destination = getDestinationBySlug(trip.destinationSlug);
  if (!destination) return trip.place;
  return destination.name.includes(" and ") ? destination.country : destination.name;
}

/** Cuts text to about `max` characters at a word boundary, for meta descriptions. */
export function metaDescription(text: string, max = 155): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[,;:.]$/, "")}…`;
}
