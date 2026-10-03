const rupeeFormatter = new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 });

/** Formats a whole-rupee amount with Indian digit grouping: 149999 → "₹1,49,999". */
export function formatRupees(amount: number): string {
  return `₹${rupeeFormatter.format(amount)}`;
}
