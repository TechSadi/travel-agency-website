import { getTripsByDestination } from "./trips";
import type { Destination, DestinationSummary, Region } from "./types";

/** Region filter order on the Destinations page. */
export const regions: Region[] = ["India", "Asia", "Middle East", "Europe", "Africa", "Islands"];

// Names, countries, images and package counts follow design-reference/destinations.html.
export const destinations: Destination[] = [
  { slug: "kashmir", name: "Kashmir", country: "India", region: "India", image: "/images/kashmir.jpg", packageCount: 14 },
  { slug: "nepal", name: "Himalayas and Nepal", country: "Nepal", region: "Asia", image: "/images/hero.jpg", packageCount: 6 },
  { slug: "maldives", name: "Maldives", country: "Indian Ocean", region: "Islands", image: "/images/maldives-couple.jpg", packageCount: 9 },
  { slug: "bali", name: "Bali", country: "Indonesia", region: "Asia", image: "/images/bali.jpg", packageCount: 8 },
  { slug: "dubai", name: "Dubai", country: "United Arab Emirates", region: "Middle East", image: "/images/dubai.jpg", packageCount: 11 },
  { slug: "palawan", name: "Palawan", country: "Philippines", region: "Islands", image: "/images/palawan.jpg", packageCount: 4 },
  { slug: "santorini", name: "Santorini", country: "Greece", region: "Europe", image: "/images/santorini.jpg", packageCount: 5 },
  { slug: "italy", name: "Amalfi and Calabria", country: "Italy", region: "Europe", image: "/images/italy.jpg", packageCount: 4 },
  { slug: "kenya", name: "Masai Mara", country: "Kenya", region: "Africa", image: "/images/kenya.jpg", packageCount: 3 },
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
      tripCount: destination.packageCount ?? prices.length,
      priceFrom: prices.length > 0 ? Math.min(...prices) : null,
    };
  });
}
