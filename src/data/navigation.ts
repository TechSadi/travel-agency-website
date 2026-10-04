export type NavLink = { label: string; href: string };

/** Main header nav (DESIGN.md section 4, Header). */
export const mainNav: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Destinations", href: "/destinations" },
  { label: "Trips", href: "/trips" },
  { label: "Group tours", href: "/trips?type=group" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** The route the "Plan my trip" buttons go to. */
export const planTripHref = "/contact";

export const footerNav: { title: string; links: NavLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "Destinations", href: "/destinations" },
      { label: "All trips", href: "/trips" },
      { label: "Group departures", href: "/trips?type=group" },
      { label: "Honeymoon packages", href: "/trips?type=honeymoon" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Visa assistance", href: "/contact" },
      { label: "Travel insurance", href: "/contact" },
    ],
  },
];

export const legalLinks: NavLink[] = [
  { label: "Privacy policy", href: "#" },
  { label: "Terms and conditions", href: "#" },
  { label: "Cancellation policy", href: "#" },
];
