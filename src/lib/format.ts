const rupeeFormatter = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** Formats a whole-rupee amount with Indian digit grouping: 149999 → "₹1,49,999". */
export function formatRupees(amount: number): string {
  return `₹${rupeeFormatter.format(amount)}`;
}

/** Trip length as shown on cards: "6 nights, 7 days". */
export function formatDuration(nights: number, days: number): string {
  return `${nights} ${nights === 1 ? "night" : "nights"}, ${days} ${days === 1 ? "day" : "days"}`;
}

// en-US for the parts because en-GB and en-IN shorten September to "Sept".
const dateParts = new Intl.DateTimeFormat("en-US", {
  day: "2-digit",
  month: "short",
  weekday: "short",
  timeZone: "UTC",
});

const fullDate = new Intl.DateTimeFormat("en-GB", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" });

/**
 * Splits an ISO date (YYYY-MM-DD) into the pieces of a departure date block:
 * "2026-11-14" → { day: "14", month: "Nov", weekday: "Sat", full: "14 November 2026" }.
 * Read as UTC so the day never shifts with the visitor's time zone.
 */
export function formatDepartureDate(isoDate: string) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  const parts = Object.fromEntries(dateParts.formatToParts(date).map((part) => [part.type, part.value]));
  return { day: parts.day, month: parts.month, weekday: parts.weekday, full: fullDate.format(date) };
}
