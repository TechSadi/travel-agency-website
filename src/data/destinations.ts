import { getTripsByDestination } from "./trips";
import type { Destination, DestinationSummary } from "./types";

// Names, countries and images follow design-reference/destinations.html.
export const destinations: Destination[] = [
  { slug: "kashmir", name: "Kashmir", country: "India", region: "India", image: "/images/kashmir.jpg" },
  { slug: "nepal", name: "Himalayas and Nepal", country: "Nepal", region: "Asia", image: "/images/hero.jpg" },
  { slug: "maldives", name: "Maldives", country: "Indian Ocean", region: "Islands", image: "/images/maldives-couple.jpg" },
  { slug: "bali", name: "Bali", country: "Indonesia", region: "Asia", image: "/images/bali.jpg" },
  { slug: "dubai", name: "Dubai", country: "United Arab Emirates", region: "Middle East", image: "/images/dubai.jpg" },
  { slug: "palawan", name: "Palawan", country: "Philippines", region: "Islands", image: "/images/palawan.jpg" },
  { slug: "santorini", name: "Santorini", country: "Greece", region: "Europe", image: "/images/santorini.jpg" },
  { slug: "italy", name: "Amalfi and Calabria", country: "Italy", region: "Europe", image: "/images/italy.jpg" },
  { slug: "kenya", name: "Masai Mara", country: "Kenya", region: "Africa", image: "/images/kenya.jpg" },
];

export function getDestinationBySlug(slug: string): Destination | undefined {
  return destinations.find((destination) => destination.slug === slug);
}

/** Destinations with their trip count and lowest starting price, derived from the trips data. */
export function getDestinationSummaries(): DestinationSummary[] {
  return destinations.map((destination) => {
    const prices = getTripsByDestination(destination.slug).map((trip) => trip.priceFrom);
    return {
      ...destination,
      tripCount: prices.length,
      priceFrom: prices.length > 0 ? Math.min(...prices) : null,
    };
  });
}
