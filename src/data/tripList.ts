import type { Destination, Trip, TripType } from "./types";

// Filtering, sorting and URL state for the trips list (DESIGN.md section 5, Trips).
// Pure functions with no data imports, so the client component can use them directly.

/** The fields a TripCard needs. Keeps itineraries and FAQs out of client bundles. */
export type TripCardData = Pick<
  Trip,
  "slug" | "title" | "place" | "nights" | "days" | "priceFrom" | "rating" | "reviewCount" | "badge" | "inclusions" | "heroImage"
> & { imageAlt: string };

/** A trip as the list page sees it: card fields plus what the filters match on. */
export type TripListItem = TripCardData & {
  destinationSlug: string;
  types: TripType[];
  /** Departure months as YYYY-MM. */
  months: string[];
};

export function toTripCardData(trip: Trip): TripCardData {
  return {
    slug: trip.slug,
    title: trip.title,
    place: trip.place,
    nights: trip.nights,
    days: trip.days,
    priceFrom: trip.priceFrom,
    rating: trip.rating,
    reviewCount: trip.reviewCount,
    badge: trip.badge,
    inclusions: trip.inclusions,
    heroImage: trip.heroImage,
    imageAlt: trip.gallery.find((image) => image.src === trip.heroImage)?.alt ?? trip.title,
  };
}

/** `fromMonth` (YYYY-MM) drops departures in earlier months. */
export function toTripListItem(trip: Trip, fromMonth = ""): TripListItem {
  const months = [...new Set(trip.departures.map((departure) => departure.date.slice(0, 7)))]
    .filter((month) => month >= fromMonth)
    .sort();
  return { ...toTripCardData(trip), destinationSlug: trip.destinationSlug, types: trip.types, months };
}

export type DurationKey = "short" | "mid" | "long";
export type SortKey = "popular" | "price-asc" | "price-desc" | "duration";
export type ViewMode = "grid" | "list";

export type FilterGroup = "dest" | "type" | "dur" | "month";

export type TripListState = {
  dest: string[];
  type: TripType[];
  dur: DurationKey[];
  month: string[];
  /** Budget bounds in rupees; `null` means the end of the slider. */
  min: number | null;
  max: number | null;
  /** Free text from the Home search panel. */
  q: string;
  sort: SortKey;
  view: ViewMode;
  page: number;
};

export type FilterOption<V extends string = string> = { value: V; label: string };

export type FilterOptions = {
  dest: FilterOption[];
  type: FilterOption<TripType>[];
  dur: FilterOption<DurationKey>[];
  month: FilterOption[];
  budget: { min: number; max: number; step: number };
};

export const PAGE_SIZE = 9;

export const sortOptions: FilterOption<SortKey>[] = [
  { value: "popular", label: "Most popular" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "duration", label: "Duration" },
];

const typeOptions: FilterOption<TripType>[] = [
  { value: "honeymoon", label: "Honeymoon" },
  { value: "family", label: "Family" },
  { value: "group", label: "Group tours" },
  { value: "adventure", label: "Adventure" },
  { value: "beach", label: "Beach" },
];

const durationOptions: FilterOption<DurationKey>[] = [
  { value: "short", label: "Up to 5 days" },
  { value: "mid", label: "6 to 8 days" },
  { value: "long", label: "9 days or more" },
];

// Shorter labels where the destination name is a region (as in design-reference/trips.html).
const destinationLabels: Record<string, string> = {
  nepal: "Nepal",
  santorini: "Greece",
  palawan: "Philippines",
  italy: "Italy",
  kenya: "Kenya",
};

const BUDGET_STEP = 5000;
const monthLabel = new Intl.DateTimeFormat("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

export function formatMonth(value: string): string {
  return monthLabel.format(new Date(`${value}-01T00:00:00Z`));
}

/** Filter options for the sidebar, built from the trips on the server. */
export function buildFilterOptions(items: TripListItem[], destinations: Destination[]): FilterOptions {
  const destinationOrder = new Map(destinations.map((destination, index) => [destination.slug, index]));
  const usedDestinations = new Set(items.map((item) => item.destinationSlug));
  const prices = items.map((item) => item.priceFrom);

  return {
    dest: destinations
      .filter((destination) => usedDestinations.has(destination.slug))
      .sort((a, b) => destinationOrder.get(a.slug)! - destinationOrder.get(b.slug)!)
      .map((destination) => ({ value: destination.slug, label: destinationLabels[destination.slug] ?? destination.name })),
    type: typeOptions.filter((option) => items.some((item) => item.types.includes(option.value))),
    dur: durationOptions,
    month: [...new Set(items.flatMap((item) => item.months))].sort().map((value) => ({ value, label: formatMonth(value) })),
    budget: {
      min: Math.floor(Math.min(...prices) / BUDGET_STEP) * BUDGET_STEP,
      max: Math.ceil(Math.max(...prices) / BUDGET_STEP) * BUDGET_STEP,
      step: BUDGET_STEP,
    },
  };
}

export function durationKey(days: number): DurationKey {
  if (days <= 5) return "short";
  if (days <= 8) return "mid";
  return "long";
}

// ---------------------------------------------------------------------------
// URL state

const STATE_KEYS = ["dest", "type", "dur", "month", "min", "max", "q", "sort", "view", "page"] as const;

function listParam<V extends string>(params: URLSearchParams, key: string, allowed: FilterOption<V>[]): V[] {
  const values = params.getAll(key).flatMap((value) => value.split(","));
  return allowed.map((option) => option.value).filter((value) => values.includes(value));
}

function numberParam(params: URLSearchParams, key: string): number | null {
  const value = Number(params.get(key));
  return params.has(key) && Number.isFinite(value) ? Math.round(value) : null;
}

/** Reads the list state from the URL. Unknown or invalid values are ignored. */
export function parseListState(params: URLSearchParams, options: FilterOptions): TripListState {
  const { budget } = options;
  let min = numberParam(params, "min");
  let max = numberParam(params, "max");
  if (min !== null) min = min <= budget.min || min >= budget.max ? null : min;
  if (max !== null) max = max >= budget.max || max <= budget.min ? null : max;
  if (min !== null && max !== null && min > max) [min, max] = [max, min];

  const sort = sortOptions.find((option) => option.value === params.get("sort"))?.value ?? "popular";
  const page = Math.max(1, Math.floor(Number(params.get("page")) || 1));

  return {
    dest: listParam(params, "dest", options.dest),
    type: listParam(params, "type", options.type),
    dur: listParam(params, "dur", options.dur),
    month: listParam(params, "month", options.month),
    min,
    max,
    q: (params.get("q") ?? "").trim().slice(0, 80),
    sort,
    view: params.get("view") === "list" ? "list" : "grid",
    page,
  };
}

/**
 * The query string for a state, keeping params the page does not own (such as
 * `adults` from the Home search). Lists are comma-joined: ?dest=kashmir,maldives.
 */
export function serializeListState(state: TripListState, current: URLSearchParams): string {
  const parts: string[] = [];
  const add = (key: string, value: string) => parts.push(`${key}=${value}`);
  const list = (key: string, values: string[]) => {
    if (values.length > 0) add(key, values.map(encodeURIComponent).join(","));
  };

  list("dest", state.dest);
  list("type", state.type);
  list("dur", state.dur);
  list("month", state.month);
  if (state.min !== null) add("min", String(state.min));
  if (state.max !== null) add("max", String(state.max));
  if (state.q) add("q", encodeURIComponent(state.q));
  if (state.sort !== "popular") add("sort", state.sort);
  if (state.view === "list") add("view", "list");
  if (state.page > 1) add("page", String(state.page));

  current.forEach((value, key) => {
    if (!(STATE_KEYS as readonly string[]).includes(key)) add(encodeURIComponent(key), encodeURIComponent(value));
  });
  return parts.length > 0 ? `?${parts.join("&")}` : "";
}

export function clearedFilters(state: TripListState): TripListState {
  return { ...state, dest: [], type: [], dur: [], month: [], min: null, max: null, q: "", page: 1 };
}

// ---------------------------------------------------------------------------
// Filtering and sorting

function matches(item: TripListItem, state: TripListState, skip?: FilterGroup): boolean {
  if (skip !== "dest" && state.dest.length > 0 && !state.dest.includes(item.destinationSlug)) return false;
  if (skip !== "type" && state.type.length > 0 && !item.types.some((type) => state.type.includes(type))) return false;
  if (skip !== "dur" && state.dur.length > 0 && !state.dur.includes(durationKey(item.days))) return false;
  if (skip !== "month" && state.month.length > 0 && !item.months.some((month) => state.month.includes(month))) return false;
  if (state.min !== null && item.priceFrom < state.min) return false;
  if (state.max !== null && item.priceFrom > state.max) return false;
  if (state.q) {
    const q = state.q.toLowerCase();
    if (!`${item.title} ${item.place}`.toLowerCase().includes(q)) return false;
  }
  return true;
}

const comparators: Record<SortKey, (a: TripListItem, b: TripListItem) => number> = {
  popular: (a, b) => b.reviewCount - a.reviewCount || b.rating - a.rating,
  "price-asc": (a, b) => a.priceFrom - b.priceFrom,
  "price-desc": (a, b) => b.priceFrom - a.priceFrom,
  duration: (a, b) => a.days - b.days || a.priceFrom - b.priceFrom,
};

/** Trips matching every filter, in the chosen order. */
export function filterTrips(items: TripListItem[], state: TripListState): TripListItem[] {
  return items.filter((item) => matches(item, state)).sort(comparators[state.sort]);
}

/**
 * How many trips each option would show, with every other filter applied.
 * Options in the same group combine with OR, so a group's own selection is ignored.
 */
export function facetCounts(
  items: TripListItem[],
  state: TripListState,
  options: FilterOptions,
): Record<FilterGroup, Record<string, number>> {
  const counts = { dest: {}, type: {}, dur: {}, month: {} } as Record<FilterGroup, Record<string, number>>;
  const groups: FilterGroup[] = ["dest", "type", "dur", "month"];

  for (const group of groups) {
    const pool = items.filter((item) => matches(item, state, group));
    for (const option of options[group]) {
      counts[group][option.value] = pool.filter((item) => {
        if (group === "dest") return item.destinationSlug === option.value;
        if (group === "type") return item.types.includes(option.value as TripType);
        if (group === "dur") return durationKey(item.days) === option.value;
        return item.months.includes(option.value);
      }).length;
    }
  }
  return counts;
}

export type ActiveFilter = { key: string; label: string; remove: (state: TripListState) => TripListState };

/** One chip per active filter, each able to remove itself. */
export function activeFilters(state: TripListState, options: FilterOptions, formatPrice: (n: number) => string): ActiveFilter[] {
  const chips: ActiveFilter[] = [];
  const groups: FilterGroup[] = ["dest", "type", "dur", "month"];

  for (const group of groups) {
    for (const value of state[group] as string[]) {
      const label = options[group].find((option) => option.value === value)?.label ?? value;
      chips.push({
        key: `${group}:${value}`,
        label,
        remove: (s) => ({ ...s, [group]: (s[group] as string[]).filter((v) => v !== value), page: 1 }),
      });
    }
  }
  if (state.min !== null || state.max !== null) {
    const { budget } = options;
    chips.push({
      key: "budget",
      label: `${formatPrice(state.min ?? budget.min)} to ${formatPrice(state.max ?? budget.max)}`,
      remove: (s) => ({ ...s, min: null, max: null, page: 1 }),
    });
  }
  if (state.q) {
    chips.push({ key: "q", label: `“${state.q}”`, remove: (s) => ({ ...s, q: "", page: 1 }) });
  }
  return chips;
}
