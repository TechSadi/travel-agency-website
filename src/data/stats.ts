import type { Stat } from "./types";

/** About page stats. */
export const stats: Stat[] = [
  { value: "2009", label: "the year we opened in Fatehgunj", countUp: false },
  { value: "18,000+", label: "travellers sent on holiday" },
  { value: "40+", label: "destinations in India and abroad" },
  { value: "4.8", label: "average rating on Google" },
];

/** Google Business rating, used in the Home hero pill and the reviews summary. */
export const googleRating = {
  rating: 4.8,
  reviewCount: 67,
};
