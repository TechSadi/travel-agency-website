import type { Theme } from "./types";

// Titles, lines and images follow the "Travel the way you like" section of design-reference/home.html.
export const themes: Theme[] = [
  {
    title: "Honeymoon",
    description: "Private transfers, candlelit dinners, rooms with a view.",
    type: "honeymoon",
    image: "/images/honeymoon-boat.jpg",
  },
  {
    title: "Family holidays",
    description: "Kid-friendly hotels and a pace that suits grandparents too.",
    type: "family",
    image: "/images/family.jpg",
  },
  {
    title: "Group tours",
    description: "Fixed departures with a tour manager from day one.",
    type: "group",
    image: "/images/group.jpg",
  },
  {
    title: "Wildlife and adventure",
    description: "Safaris, Himalayan treks and island hopping.",
    type: "adventure",
    image: "/images/kenya.jpg",
  },
];
