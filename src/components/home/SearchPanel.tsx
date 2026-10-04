"use client";

import clsx from "clsx";
import { Calendar, Heart, MapPin, Search, Users, type LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useId, useMemo, useState, type ComponentProps, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import { buttonClasses } from "@/components/ui/Button";
import type { TripType } from "@/data/types";

export type SearchDestination = { slug: string; name: string; country: string };
export type SearchMonth = { value: string; label: string };

type SearchPanelProps = {
  destinations: SearchDestination[];
  /** Months with departures, as YYYY-MM values. */
  months: SearchMonth[];
  className?: string;
};

const tripTypes: { value: TripType; label: string }[] = [
  { value: "honeymoon", label: "Honeymoon" },
  { value: "family", label: "Family" },
  { value: "group", label: "Group tour" },
  { value: "adventure", label: "Adventure" },
  { value: "beach", label: "Beach" },
];

const travellerOptions = [1, 2, 3, 4, 5, 6];

const fieldClasses =
  "min-h-11 w-full min-w-0 rounded-control border border-line bg-paper px-3 text-[1rem] text-ink placeholder:text-muted focus-visible:border-ink";

function FieldLabel({ icon: Icon, htmlFor, children }: { icon: LucideIcon; htmlFor: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="inline-flex items-center gap-2 text-[0.88rem] font-medium text-muted">
      <Icon size={16} strokeWidth={1.8} aria-hidden="true" className="shrink-0 text-brand" />
      {children}
    </label>
  );
}

/** Custom chevron for the native selects, so they match the text input. */
function SelectField({ id, children, ...rest }: ComponentProps<"select"> & { id: string }) {
  return (
    <div className="relative">
      <select id={id} {...rest} className={clsx(fieldClasses, "appearance-none pr-9")}>
        {children}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        width="16"
        height="16"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-muted"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

function matches(destination: SearchDestination, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return [destination.name, destination.country].some((text) =>
    text.toLowerCase().split(/[\s,]+/).some((word) => word.startsWith(q)) || text.toLowerCase().startsWith(q),
  );
}

/**
 * Home search bar (DESIGN.md section 4). "Where to" suggests destinations as you type
 * (ARIA combobox); "Search trips" opens /trips with the chosen filters in the URL.
 */
export function SearchPanel({ destinations, months, className }: SearchPanelProps) {
  const router = useRouter();
  const id = useId();
  const ids = { where: `${id}-where`, list: `${id}-list`, type: `${id}-type`, when: `${id}-when`, adults: `${id}-adults` };

  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<SearchDestination | null>(null);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const [type, setType] = useState("");
  const [month, setMonth] = useState("");
  const [adults, setAdults] = useState("2");

  const suggestions = useMemo(() => destinations.filter((d) => matches(d, query)), [destinations, query]);
  const expanded = open && suggestions.length > 0;

  function choose(destination: SearchDestination) {
    setSelected(destination);
    setQuery(destination.name);
    setOpen(false);
    setActive(-1);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (!open) setOpen(true);
      const step = event.key === "ArrowDown" ? 1 : -1;
      setActive((current) => (current + step + suggestions.length) % Math.max(suggestions.length, 1));
    } else if (event.key === "Enter" && expanded && active >= 0) {
      event.preventDefault();
      choose(suggestions[active]);
    } else if (event.key === "Escape" && open) {
      event.preventDefault();
      setOpen(false);
      setActive(-1);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    const params = new URLSearchParams();
    const text = query.trim();
    // A typed name that matches a destination exactly counts as choosing it.
    const destination =
      selected?.name === text
        ? selected
        : destinations.find((d) => d.name.toLowerCase() === text.toLowerCase() || d.slug === text.toLowerCase());
    if (destination) params.set("dest", destination.slug);
    else if (text) params.set("q", text);
    if (type) params.set("type", type);
    if (month) params.set("month", month);
    if (adults) params.set("adults", adults);
    const search = params.toString();
    router.push(search ? `/trips?${search}` : "/trips");
  }

  return (
    <form
      role="search"
      aria-label="Search trips"
      onSubmit={onSubmit}
      className={clsx(
        "grid grid-cols-2 items-end gap-3.5 rounded-panel border border-line bg-white p-[18px] shadow-float",
        "md:grid-cols-[repeat(5,minmax(0,1fr))] md:gap-[18px] md:p-6 md:shadow-panel",
        className,
      )}
    >
      <div className="relative col-span-2 flex flex-col gap-1.5 md:col-span-1">
        <FieldLabel icon={MapPin} htmlFor={ids.where}>
          Where to
        </FieldLabel>
        <input
          id={ids.where}
          type="text"
          role="combobox"
          autoComplete="off"
          aria-autocomplete="list"
          aria-expanded={expanded}
          aria-controls={ids.list}
          aria-activedescendant={expanded && active >= 0 ? `${ids.list}-${active}` : undefined}
          placeholder="Kashmir, Dubai, Bali…"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
            setSelected(null);
            setOpen(true);
            setActive(-1);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKeyDown}
          className={fieldClasses}
        />
        <ul
          id={ids.list}
          role="listbox"
          aria-label="Destinations"
          hidden={!expanded}
          className="absolute inset-x-0 top-full z-20 mt-1.5 max-h-72 overflow-y-auto rounded-control border border-line bg-white py-1.5 shadow-float"
        >
          {suggestions.map((destination, index) => (
            <li
              key={destination.slug}
              id={`${ids.list}-${index}`}
              role="option"
              aria-selected={index === active}
              // Keep focus in the input so blur does not close the list before the click lands.
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => choose(destination)}
              onMouseMove={() => setActive(index)}
              className={clsx(
                "flex cursor-pointer items-baseline justify-between gap-3 px-3 py-2",
                index === active && "bg-paper",
              )}
            >
              <span className="text-ink">{destination.name}</span>
              <span className="text-[0.85rem] text-muted">{destination.country}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="hidden flex-col gap-1.5 md:flex">
        <FieldLabel icon={Heart} htmlFor={ids.type}>
          Kind of trip
        </FieldLabel>
        <SelectField id={ids.type} value={type} onChange={(event) => setType(event.target.value)}>
          <option value="">Any kind</option>
          {tripTypes.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="flex min-w-0 flex-col gap-1.5">
        <FieldLabel icon={Calendar} htmlFor={ids.when}>
          When
        </FieldLabel>
        <SelectField id={ids.when} value={month} onChange={(event) => setMonth(event.target.value)}>
          <option value="">Any month</option>
          {months.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectField>
      </div>

      <div className="flex min-w-0 flex-col gap-1.5">
        <FieldLabel icon={Users} htmlFor={ids.adults}>
          Travellers
        </FieldLabel>
        <SelectField id={ids.adults} value={adults} onChange={(event) => setAdults(event.target.value)}>
          {travellerOptions.map((count) => (
            <option key={count} value={count}>
              {count === 6 ? "6+ adults" : `${count} ${count === 1 ? "adult" : "adults"}`}
            </option>
          ))}
        </SelectField>
      </div>

      <button type="submit" className={buttonClasses("primary", "md", "col-span-2 min-h-12 md:col-span-1 md:min-h-[46px]")}>
        <Search size={18} strokeWidth={1.8} aria-hidden="true" />
        Search trips
      </button>
    </form>
  );
}
