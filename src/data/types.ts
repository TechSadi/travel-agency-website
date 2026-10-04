// Demo data model, following DESIGN.md section 6. Fields marked "extension" are
// not in the spec but are needed by the trip detail page (facts strip, booking card).

export type TripType = "honeymoon" | "family" | "group" | "adventure" | "beach";

export type TripBadge = "Bestseller" | "Honeymoon" | "Group departure" | "New";

/** Short inclusion labels shown on a TripCard. Each one maps to a lucide icon in the UI. */
export type Inclusion =
  | "Flights"
  | "Hotels"
  | "Resort"
  | "Lodges"
  | "Meals"
  | "All meals"
  | "Breakfast"
  | "Transfers"
  | "Sightseeing"
  | "Visa"
  | "Boat tours"
  | "Ferries"
  | "Rail passes"
  | "Game drives"
  | "Guide";

export type ItineraryDay = {
  day: number;
  title: string;
  description: string;
  tags?: string[];
};

export type TripHotel = {
  city: string;
  name: string;
  category: string;
  nights: number;
};

export type TripFaq = { q: string; a: string };

export type Departure = {
  /** ISO date, YYYY-MM-DD. */
  date: string;
  fromCity: "Vadodara" | "Ahmedabad" | "Mumbai";
  /** Seats still available. `null` means the departure is full and the waitlist is open. */
  seatsLeft: number | null;
  /** Per person, twin sharing, in whole rupees. */
  price: number;
};

export type GalleryImage = { src: string; alt: string };

export type Trip = {
  slug: string;
  title: string;
  destinationSlug: string;
  /** Location line on cards, e.g. "Kashmir, India". */
  place: string;
  nights: number;
  days: number;
  /** Rupees, integer, per person on twin sharing. */
  priceFrom: number;
  rating: number;
  reviewCount: number;
  badge?: TripBadge;
  types: TripType[];
  inclusions: Inclusion[];
  heroImage: string;
  gallery: GalleryImage[];
  overview: string;
  highlights: string[];
  itinerary: ItineraryDay[];
  included: string[];
  excluded: string[];
  hotels: TripHotel[];
  faqs: TripFaq[];
  departures: Departure[];

  /** Extension: places shown in the detail page meta row. */
  stops: string[];
  /** Extension: values for the detail page facts strip. */
  facts: {
    startsAndEnds: string;
    groupSize: string;
    bestTime: string;
    flights: string;
  };
  /** Extension: previous price, for the "Save ₹X" pill. */
  priceWas?: number;
  /** Extension: per child price for the booking estimate. Omitted when children cannot join. */
  childPrice?: number;
};

export type Region = "India" | "Asia" | "Middle East" | "Europe" | "Africa" | "Islands";

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: Region;
  image: string;
};

export type DestinationSummary = Destination & {
  tripCount: number;
  /** Lowest `priceFrom` among the destination's trips, or `null` when it has none. */
  priceFrom: number | null;
};

export type Review = {
  name: string;
  city: string;
  tripSlug: string;
  rating: number;
  quote: string;
  /** Extension: overrides the trip title in the caption, e.g. "Kashmir group tour". */
  tripLabel?: string;
};

export type TeamMember = { name: string; role: string; initials: string };

export type Stat = { value: string; label: string };
