import type { Departure, Inclusion, Trip, TripBadge, TripType } from "./types";

// Extra demo packages so the trips list has realistic counts and pagination.
// Each one is a variant of a fully written trip in the same destination: it has its
// own card fields, overview, highlights and departures, and borrows the day-by-day
// plan, hotels, FAQs and inclusions from its base trip.

export type TripVariant = {
  /** Slug of the fully written trip this one borrows detail content from. */
  base: string;
  slug: string;
  title: string;
  place: string;
  nights: number;
  days: number;
  priceFrom: number;
  rating: number;
  reviewCount: number;
  badge?: TripBadge;
  types: TripType[];
  inclusions: Inclusion[];
  heroImage: string;
  imageAlt: string;
  overview: string;
  highlights: string[];
  departures: Departure[];
};

export const tripVariants: TripVariant[] = [
  {
    base: "kashmir-paradise-on-earth",
    slug: "kashmir-family-week",
    title: "Kashmir Family Week",
    place: "Kashmir, India",
    nights: 7,
    days: 8,
    priceFrom: 38999,
    rating: 4.7,
    reviewCount: 92,
    types: ["family", "group"],
    inclusions: ["Flights", "Hotels", "Meals", "Sightseeing"],
    heroImage: "/images/family.jpg",
    imageAlt: "Family watching the sunset together",
    overview:
      "An unhurried week in the valley for families with children and grandparents: two nights on a Dal Lake houseboat, pony rides in Pahalgam and a full day in the Gulmarg meadows, with flights from Ahmedabad included.",
    highlights: ["Return flights from Ahmedabad", "Two nights on a Dal Lake houseboat", "Pony ride to Baisaran meadow", "Vegetarian meals throughout"],
    departures: [
      { date: "2026-12-12", fromCity: "Ahmedabad", seatsLeft: 10, price: 38999 },
      { date: "2027-01-02", fromCity: "Ahmedabad", seatsLeft: 6, price: 41999 },
    ],
  },
  {
    base: "kashmir-paradise-on-earth",
    slug: "kashmir-honeymoon-houseboats",
    title: "Kashmir Honeymoon Houseboats",
    place: "Srinagar, India",
    nights: 5,
    days: 6,
    priceFrom: 41999,
    rating: 4.9,
    reviewCount: 74,
    badge: "Honeymoon",
    types: ["honeymoon"],
    inclusions: ["Hotels", "Meals", "Transfers", "Sightseeing"],
    heroImage: "/images/honeymoon-boat.jpg",
    imageAlt: "Couple sitting together on a decorated boat",
    overview:
      "Six days for couples, with three nights on a premium Dal Lake houseboat, a private shikara at sunset, a candlelit dinner in Gulmarg and a free afternoon in the Mughal gardens.",
    highlights: ["Premium houseboat with lake-facing room", "Private sunset shikara ride", "Candlelit dinner in Gulmarg", "Flower bed and cake on arrival"],
    departures: [
      { date: "2026-11-28", fromCity: "Vadodara", seatsLeft: 4, price: 41999 },
      { date: "2027-01-16", fromCity: "Vadodara", seatsLeft: 8, price: 41999 },
    ],
  },
  {
    base: "kashmir-paradise-on-earth",
    slug: "srinagar-and-gulmarg-break",
    title: "Srinagar and Gulmarg Break",
    place: "Kashmir, India",
    nights: 3,
    days: 4,
    priceFrom: 24999,
    rating: 4.6,
    reviewCount: 58,
    badge: "New",
    types: ["family", "honeymoon"],
    inclusions: ["Hotels", "Breakfast", "Transfers", "Sightseeing"],
    heroImage: "/images/hero.jpg",
    imageAlt: "Snow-covered Himalayan peaks under a clear sky",
    overview:
      "A short Kashmir trip for a long weekend: one night on a houseboat, a day trip to Gulmarg with the gondola, and the Mughal gardens of Srinagar before you fly home.",
    highlights: ["Gulmarg gondola, phase 1", "Night on a Dal Lake houseboat", "Nishat and Shalimar gardens"],
    departures: [{ date: "2026-12-24", fromCity: "Ahmedabad", seatsLeft: 12, price: 24999 }],
  },
  {
    base: "maldives-overwater-escape",
    slug: "maldives-family-island-resort",
    title: "Maldives Family Island Resort",
    place: "Maldives",
    nights: 4,
    days: 5,
    priceFrom: 94999,
    rating: 4.8,
    reviewCount: 46,
    types: ["family", "beach"],
    inclusions: ["Flights", "Resort", "All meals", "Transfers"],
    heroImage: "/images/maldives-couple.jpg",
    imageAlt: "Overwater villas above a turquoise lagoon",
    overview:
      "Four nights at a family resort with a kids' club, shallow lagoon and snorkelling reef. Speedboat transfers and all meals are included, so there is nothing to book once you land in Malé.",
    highlights: ["Kids' club and family pool", "Guided snorkelling on the house reef", "All meals with Indian vegetarian options"],
    departures: [{ date: "2026-12-26", fromCity: "Mumbai", seatsLeft: 6, price: 99999 }],
  },
  {
    base: "maldives-overwater-escape",
    slug: "maldives-honeymoon-water-villa",
    title: "Maldives Honeymoon Water Villa",
    place: "Maldives",
    nights: 5,
    days: 6,
    priceFrom: 119999,
    rating: 4.9,
    reviewCount: 67,
    badge: "Honeymoon",
    types: ["honeymoon", "beach"],
    inclusions: ["Flights", "Resort", "All meals", "Transfers"],
    heroImage: "/images/couple-beach.jpg",
    imageAlt: "Couple walking along a quiet beach at sunset",
    overview:
      "Five nights in an overwater villa with steps down into the lagoon, a sandbank picnic, a sunset cruise and a couples' spa session. Seaplane transfers are included.",
    highlights: ["All five nights in a water villa", "Private sandbank picnic", "Sunset dolphin cruise", "60-minute couples' spa"],
    departures: [
      { date: "2026-11-30", fromCity: "Mumbai", seatsLeft: 3, price: 119999 },
      { date: "2027-01-27", fromCity: "Mumbai", seatsLeft: 6, price: 119999 },
    ],
  },
  {
    base: "dubai-city-lights",
    slug: "dubai-shopping-festival",
    title: "Dubai Shopping Festival",
    place: "Dubai, UAE",
    nights: 4,
    days: 5,
    priceFrom: 49999,
    rating: 4.7,
    reviewCount: 81,
    badge: "Group departure",
    types: ["family", "group"],
    inclusions: ["Flights", "Hotels", "Visa", "Sightseeing"],
    heroImage: "/images/group.jpg",
    imageAlt: "Group of friends on holiday",
    overview:
      "Our group departure timed for the Dubai Shopping Festival, with Global Village, the Gold Souk, a desert safari and plenty of free time for the malls. A Suman Holidays tour manager travels with the group from Vadodara.",
    highlights: ["Tour manager from Vadodara", "Global Village evening", "Desert safari with barbecue dinner", "Dhow cruise at Dubai Marina"],
    departures: [
      { date: "2026-12-29", fromCity: "Vadodara", seatsLeft: 9, price: 52999 },
      { date: "2027-01-08", fromCity: "Vadodara", seatsLeft: 15, price: 49999 },
    ],
  },
  {
    base: "dubai-city-lights",
    slug: "dubai-and-abu-dhabi",
    title: "Dubai and Abu Dhabi",
    place: "Dubai, UAE",
    nights: 5,
    days: 6,
    priceFrom: 56999,
    rating: 4.8,
    reviewCount: 63,
    types: ["family"],
    inclusions: ["Flights", "Hotels", "Visa", "Transfers"],
    heroImage: "/images/dubai.jpg",
    imageAlt: "Dubai skyline with the Burj Khalifa",
    overview:
      "Four nights in Dubai and one in Abu Dhabi, with the Sheikh Zayed Grand Mosque, Ferrari World and the Louvre Abu Dhabi added to the usual Dubai highlights.",
    highlights: ["Sheikh Zayed Grand Mosque", "A day at Ferrari World or Yas Waterworld", "Burj Khalifa, level 124"],
    departures: [{ date: "2027-01-22", fromCity: "Ahmedabad", seatsLeft: 11, price: 56999 }],
  },
  {
    base: "bali-temples-and-beaches",
    slug: "bali-honeymoon-villas",
    title: "Bali Honeymoon Villas",
    place: "Bali, Indonesia",
    nights: 5,
    days: 6,
    priceFrom: 62999,
    rating: 4.8,
    reviewCount: 77,
    badge: "Honeymoon",
    types: ["honeymoon", "beach"],
    inclusions: ["Flights", "Resort", "Breakfast", "Transfers"],
    heroImage: "/images/bali.jpg",
    imageAlt: "Temple on the water in Bali at dawn",
    overview:
      "Private pool villas in Ubud and Seminyak, a floating breakfast, a Balinese couples' massage and a sunset dinner on Jimbaran beach.",
    highlights: ["Private pool villa in Ubud", "Floating breakfast", "Sunset seafood dinner at Jimbaran"],
    departures: [{ date: "2026-12-14", fromCity: "Mumbai", seatsLeft: 7, price: 62999 }],
  },
  {
    base: "bali-temples-and-beaches",
    slug: "bali-family-adventure",
    title: "Bali Family Adventure",
    place: "Bali, Indonesia",
    nights: 7,
    days: 8,
    priceFrom: 64999,
    rating: 4.6,
    reviewCount: 39,
    types: ["family", "adventure"],
    inclusions: ["Flights", "Hotels", "Breakfast", "Sightseeing"],
    heroImage: "/images/group.jpg",
    imageAlt: "Group of friends on a trek",
    overview:
      "Eight days of easy adventure for families with older children: river rafting on the Ayung, a sunrise walk on Mount Batur, a waterpark day and an afternoon learning to surf in Kuta.",
    highlights: ["Ayung river rafting", "Mount Batur sunrise walk", "Beginner surf lesson in Kuta"],
    departures: [{ date: "2027-01-23", fromCity: "Mumbai", seatsLeft: 10, price: 64999 }],
  },
  {
    base: "santorini-and-athens",
    slug: "santorini-honeymoon",
    title: "Santorini Honeymoon",
    place: "Greece",
    nights: 5,
    days: 6,
    priceFrom: 129999,
    rating: 4.9,
    reviewCount: 33,
    badge: "Honeymoon",
    types: ["honeymoon", "beach"],
    inclusions: ["Flights", "Hotels", "Visa", "Ferries"],
    heroImage: "/images/santorini.jpg",
    imageAlt: "White houses and blue domes above the Aegean Sea",
    overview:
      "Five nights in a cave suite in Imerovigli with a caldera view, a catamaran cruise to the hot springs and dinner in Oia at sunset. Schengen visa paperwork is handled by our office.",
    highlights: ["Caldera-view cave suite", "Catamaran cruise with dinner", "Sunset in Oia"],
    departures: [{ date: "2027-01-10", fromCity: "Mumbai", seatsLeft: 4, price: 129999 }],
  },
  {
    base: "santorini-and-athens",
    slug: "athens-and-mykonos",
    title: "Athens and Mykonos",
    place: "Greece",
    nights: 6,
    days: 7,
    priceFrom: 139999,
    rating: 4.7,
    reviewCount: 21,
    badge: "Group departure",
    types: ["group", "beach"],
    inclusions: ["Flights", "Hotels", "Visa", "Ferries"],
    heroImage: "/images/santorini.jpg",
    imageAlt: "White houses and blue domes above the Aegean Sea",
    overview:
      "A small-group trip with three nights in Athens for the Acropolis and Plaka, then the ferry to Mykonos for windmills, Little Venice and the beaches.",
    highlights: ["Guided Acropolis visit", "Ferry to Mykonos", "Little Venice at sunset"],
    departures: [{ date: "2026-12-05", fromCity: "Mumbai", seatsLeft: 2, price: 139999 }],
  },
  {
    base: "kenya-wildlife-safari",
    slug: "kenya-family-safari",
    title: "Kenya Family Safari",
    place: "Masai Mara, Kenya",
    nights: 5,
    days: 6,
    priceFrom: 174999,
    rating: 4.8,
    reviewCount: 29,
    types: ["family", "adventure"],
    inclusions: ["Flights", "Lodges", "All meals", "Game drives"],
    heroImage: "/images/kenya.jpg",
    imageAlt: "Two elephants grazing on the savannah",
    overview:
      "A shorter safari for families: three nights in the Masai Mara with twice-daily game drives, a visit to a Maasai village and a lodge with a pool for the afternoons.",
    highlights: ["Twice-daily game drives", "Maasai village visit", "Family rooms at a lodge with a pool"],
    departures: [{ date: "2026-12-27", fromCity: "Mumbai", seatsLeft: 5, price: 179999 }],
  },
  {
    base: "italian-coast-and-rome",
    slug: "rome-florence-and-venice",
    title: "Rome, Florence and Venice",
    place: "Italy",
    nights: 7,
    days: 8,
    priceFrom: 159999,
    rating: 4.7,
    reviewCount: 44,
    badge: "Group departure",
    types: ["family", "group"],
    inclusions: ["Flights", "Hotels", "Visa", "Rail passes"],
    heroImage: "/images/italy.jpg",
    imageAlt: "Cliffside town above a sandy Italian beach",
    overview:
      "Italy's three classic cities by fast train: the Colosseum and Vatican in Rome, the Uffizi and Duomo in Florence, and a gondola ride in Venice, with an Indian dinner arranged in each city.",
    highlights: ["Skip-the-line Vatican Museums", "High-speed trains between cities", "Gondola ride in Venice"],
    departures: [
      { date: "2026-12-18", fromCity: "Mumbai", seatsLeft: 8, price: 164999 },
      { date: "2027-01-29", fromCity: "Ahmedabad", seatsLeft: 12, price: 159999 },
    ],
  },
  {
    base: "everest-base-camp-trek",
    slug: "annapurna-base-camp-trek",
    title: "Annapurna Base Camp Trek",
    place: "Annapurna, Nepal",
    nights: 10,
    days: 11,
    priceFrom: 69999,
    rating: 4.8,
    reviewCount: 35,
    badge: "Group departure",
    types: ["adventure", "group"],
    inclusions: ["Flights", "Lodges", "Meals", "Guide"],
    heroImage: "/images/hero.jpg",
    imageAlt: "Snow-covered Himalayan peaks under a clear sky",
    overview:
      "A guided trek through rhododendron forest and Gurung villages to the Annapurna sanctuary at 4,130 metres. It is easier on the altitude than Everest, so it suits first-time trekkers with good fitness.",
    highlights: ["Sunrise from Poon Hill", "Annapurna sanctuary at 4,130 m", "Hot springs at Jhinu Danda"],
    departures: [
      { date: "2026-11-26", fromCity: "Vadodara", seatsLeft: 6, price: 69999 },
      { date: "2027-01-14", fromCity: "Vadodara", seatsLeft: null, price: 69999 },
    ],
  },
  {
    base: "everest-base-camp-trek",
    slug: "kathmandu-and-pokhara",
    title: "Kathmandu and Pokhara",
    place: "Kathmandu, Nepal",
    nights: 4,
    days: 5,
    priceFrom: 39999,
    rating: 4.6,
    reviewCount: 48,
    badge: "New",
    types: ["family", "honeymoon"],
    inclusions: ["Hotels", "Breakfast", "Transfers", "Sightseeing"],
    heroImage: "/images/hero.jpg",
    imageAlt: "Snow-covered Himalayan peaks under a clear sky",
    overview:
      "Pashupatinath and the old squares of Kathmandu, then the lakeside at Pokhara with a boat on Phewa Lake and sunrise over the Annapurnas from Sarangkot. No trekking involved.",
    highlights: ["Pashupatinath evening aarti", "Boat ride on Phewa Lake", "Sunrise from Sarangkot"],
    departures: [{ date: "2026-12-20", fromCity: "Ahmedabad", seatsLeft: 9, price: 39999 }],
  },
  {
    base: "palawan-island-hopping",
    slug: "palawan-and-boracay",
    title: "Palawan and Boracay",
    place: "Palawan, Philippines",
    nights: 8,
    days: 9,
    priceFrom: 84999,
    rating: 4.7,
    reviewCount: 27,
    types: ["beach", "honeymoon"],
    inclusions: ["Flights", "Hotels", "Boat tours", "Transfers"],
    heroImage: "/images/palawan.jpg",
    imageAlt: "Limestone cliffs above a hidden lagoon",
    overview:
      "Two of the Philippines' best beach islands in one trip: lagoon hopping in El Nido, then White Beach in Boracay for sailing and sunsets.",
    highlights: ["El Nido lagoon tours A and C", "Paraw sailing in Boracay", "Sunset on White Beach"],
    departures: [{ date: "2027-01-06", fromCity: "Mumbai", seatsLeft: 8, price: 84999 }],
  },
];

/** A full Trip from a variant: its own card and overview fields, the base trip's detail content. */
export function variantOf(base: Trip, variant: TripVariant): Trip {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { base: _base, imageAlt, ...own } = variant;
  return {
    ...base,
    ...own,
    // Set explicitly so a variant without a badge does not inherit the base trip's.
    badge: variant.badge,
    gallery: [{ src: variant.heroImage, alt: imageAlt }, ...base.gallery.filter((image) => image.src !== variant.heroImage)],
    itinerary: base.itinerary.slice(0, variant.days),
    priceWas: undefined,
    childPrice: base.childPrice === undefined ? undefined : Math.round((base.childPrice / base.priceFrom) * variant.priceFrom),
  };
}
