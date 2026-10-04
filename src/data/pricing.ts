// Pricing rules shared by server and client code. No data imports, so client bundles stay small.

/** Children pay 60% of the adult price of the chosen departure. */
export const CHILD_PRICE_SHARE = 0.6;

export function childPriceOf(adultPrice: number): number {
  return Math.round(adultPrice * CHILD_PRICE_SHARE);
}
