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
  /** Extension: children cannot join (e.g. a trek with a minimum age), so the booking card hides the Children stepper. */
  adultsOnly?: boolean;
};

export type Region = "India" | "Asia" | "Middle East" | "Europe" | "Africa" | "Islands";

export type Destination = {
  slug: string;
  name: string;
  country: string;
  region: Region;
  image: string;
  /** Extension: demo number of packages shown on tiles. Falls back to the count of trips in the data. */
  packageCount?: number;
};

export type DestinationSummary = Destination & {
  tripCount: number;
  /** Lowest `priceFrom` among the destination's trips, or `null` when it has none. */
  priceFrom: number | null;
};

/** A Google review of the agency. */
export type Review = {
  name: string;
  rating: number;
  quote: string;
  /** What the review was about, shown in the caption, e.g. "Thailand group tour". */
  topic?: string;
  /** Trip the review belongs to, if any; shown on that trip's detail page. */
  tripSlug?: string;
};

/** A "Travel the way you like" tile on Home. Links to the trips list filtered by `type`. */
export type Theme = {
  title: string;
  description: string;
  type: TripType;
  image: string;
};

export type TeamMember = { name: string; role: string; initials: string };

export type Stat = {
  value: string;
  label: string;
  /** Counts up on the About page when scrolled to (default true). A year should not. */
  countUp?: boolean;
};
