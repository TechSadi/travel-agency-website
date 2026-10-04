import type { Review } from "./types";

export const reviews: Review[] = [
  {
    name: "Priya and Karan Desai",
    city: "Vadodara",
    tripSlug: "maldives-overwater-escape",
    rating: 5,
    quote:
      "Visas, flights, the seaplane to the resort, even the cake on our anniversary night. We didn’t have to think about anything except enjoying the trip.",
  },
  {
    name: "Nirav Patel",
    city: "Anand",
    tripSlug: "dubai-city-lights",
    rating: 5,
    quote:
      "I travelled with my parents and two kids. The itinerary had rest built in, the hotel was walking distance from the metro, and the desert safari was the highlight for everyone.",
  },
  {
    name: "Meera Joshi",
    city: "Vadodara",
    tripSlug: "kashmir-paradise-on-earth",
    tripLabel: "Kashmir group tour",
    rating: 5,
    quote:
      "Fourteen of us from the office went to Kashmir. One WhatsApp group, one tour manager, and not a single mix-up in seven days.",
  },
  {
    name: "Rakesh and Sonal Shah",
    city: "Surat",
    tripSlug: "kashmir-paradise-on-earth",
    rating: 5,
    quote:
      "Our driver Bashir bhai became part of the family by day three. The houseboat night was magical, and the kids still talk about the snow in Gulmarg.",
  },
  {
    name: "Hetal and Chirag Parikh",
    city: "Ahmedabad",
    tripSlug: "bali-temples-and-beaches",
    rating: 5,
    quote:
      "Kavya told us to save Nusa Penida for a clear day, and she was right. Every hotel had Jain breakfast ready without us asking twice.",
  },
  {
    name: "Jignesh Bhatt",
    city: "Rajkot",
    tripSlug: "everest-base-camp-trek",
    tripLabel: "Everest Base Camp group trek",
    rating: 5,
    quote:
      "Our guide Pasang walked at the pace of the slowest person and checked our oxygen every evening. All eleven of us reached base camp.",
  },
  {
    name: "Dr. Bhavna Thakkar",
    city: "Bhavnagar",
    tripSlug: "kenya-wildlife-safari",
    rating: 5,
    quote:
      "They reminded us about the yellow fever certificate a month before we flew. In the Mara we saw a cheetah with three cubs on the second morning.",
  },
  {
    name: "Ankit and Riddhi Vyas",
    city: "Gandhinagar",
    tripSlug: "santorini-and-athens",
    rating: 4,
    quote:
      "The Schengen file was ready in one visit to the office. Santorini in December was quiet and the sunsets were all ours, though a few cafés in Oia were shut.",
  },
];

export function getReviewsByTrip(tripSlug: string): Review[] {
  return reviews.filter((review) => review.tripSlug === tripSlug);
}
