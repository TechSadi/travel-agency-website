// Real business details from DESIGN.md section 2. Do not change without the client.

// Searching the business name finds the Google Maps listing pin; the building name alone lands a little off.
const mapsQuery = "Suman Holidays, Fatehgunj, Vadodara";

const address = {
  line1: "GF 03, Blue Diamond Complex",
  locality: "Fatehgunj",
  city: "Vadodara",
  postalCode: "390002",
  state: "Gujarat",
};

export const site = {
  name: "Suman Holidays",
  tagline: "Tours and travels, Vadodara",
  description:
    "Family holidays, honeymoons and group tours, planned from our office in Fatehgunj since 2009.",
  address: {
    ...address,
    full: `${address.line1}, ${address.locality}, ${address.city} ${address.postalCode}`,
    short: `${address.line1}, ${address.locality}, ${address.city}`,
  },
  phone: {
    display: "+91 99988 88819",
    href: "tel:+919998888819",
  },
  whatsapp: {
    display: "+91 99988 88819",
    href: "https://wa.me/919998888819",
  },
  email: {
    display: "Sumantoursandtravels@gmail.com",
    href: "mailto:Sumantoursandtravels@gmail.com",
  },
  hours: {
    full: "Monday to Saturday, 10 am to 7 pm. Sunday closed.",
    short: "Mon to Sat, 10 am to 7 pm",
    table: [
      { days: "Monday to Saturday", time: "10 am to 7 pm" },
      { days: "Sunday", time: "Closed" },
    ],
  },
  mapsUrl: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`,
  mapsEmbedUrl: `https://www.google.com/maps?q=${encodeURIComponent(mapsQuery)}&output=embed`,
  /** Google Maps listing, where all Google reviews of the agency can be read. */
  googleReviewsUrl:
    "https://www.google.com/maps/place/Suman+Holidays/@22.3240044,73.1887347,17z/data=!3m1!4b1!4m6!3m5!1s0x395fcf366d9885d3:0x1a6c89d859374ed9!8m2!3d22.3240044!4d73.1887347!16s%2Fg%2F11bbygmnlt?entry=ttu&g_ep=EgoyMDI2MDkzMC4wIKXMDSoASAFQAw%3D%3D",
  social: [
    { label: "Facebook", href: "https://www.facebook.com/sumangoholidays/" },
    { label: "Instagram", href: "https://www.instagram.com/sumanholidays/" },
  ],
} as const;

/** WhatsApp chat link with a prefilled message. */
export function whatsappLink(message?: string): string {
  return message ? `${site.whatsapp.href}?text=${encodeURIComponent(message)}` : site.whatsapp.href;
}
