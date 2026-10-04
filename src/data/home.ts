// Home page copy that is not derived from trips, destinations or reviews.
// Text follows design-reference/home.html and design-reference/mobile-home.html.

export const heroContent = {
  title: "Holidays planned in Vadodara, remembered everywhere",
  lead: "Family holidays, honeymoons and group tours across India and abroad. Flights, visas, hotels and sightseeing, arranged by one team in Fatehgunj.",
  /** Shorter lead for phones, from mobile-home.html. */
  leadShort: "Family holidays, honeymoons and group tours, arranged by one team.",
};

/** Mosaic order on Home: the first tile is the tall one. Phones add Palawan to the end of the scroll row. */
export const homeMosaic = ["kashmir", "maldives", "dubai", "bali", "santorini"];
export const homeMosaicMobileExtra = ["palawan"];

/** Tile names on Home that differ from the destination name, as in the mockups. */
export const homeMosaicLabels: Record<string, string> = { santorini: "Greece", palawan: "Philippines" };

export type HomeIconKey = "users" | "visa" | "price" | "support" | "safety";

export const trustPoints: { icon: HomeIconKey; label: string }[] = [
  { icon: "users", label: "18,000+ travellers since 2009" },
  { icon: "visa", label: "Visa assistance included" },
  { icon: "price", label: "Prices with no hidden extras" },
  { icon: "support", label: "WhatsApp support on every trip" },
];

export const serviceFeatures: { icon: HomeIconKey; title: string; text: string }[] = [
  { icon: "visa", title: "Visa and paperwork", text: "We prepare and file visas for Dubai, Bali, Europe and more." },
  {
    icon: "price",
    title: "One clear price",
    text: "Flights, hotels, transfers and taxes in a single quote. No surprises.",
  },
  { icon: "support", title: "On-trip support", text: "A WhatsApp line answered by our team while you travel." },
  { icon: "safety", title: "Safe, vetted partners", text: "Hotels and local guides we have used for years." },
];
