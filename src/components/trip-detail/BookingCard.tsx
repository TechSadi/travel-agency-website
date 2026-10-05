"use client";

import clsx from "clsx";
import { Minus, Plus } from "lucide-react";
import { useId, useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { whatsappLink } from "@/data/site";
import { childPriceOf } from "@/data/pricing";
import type { Departure, Trip } from "@/data/types";
import { formatDepartureDate, formatDuration, formatRupees } from "@/lib/format";

type BookingCardProps = {
  trip: Pick<Trip, "slug" | "title" | "nights" | "days" | "priceFrom" | "priceWas" | "departures" | "adultsOnly">;
  className?: string;
};

const ANY_DATE = "any";
const MAX_ADULTS = 20;
const MAX_CHILDREN = 10;

/** Fewest seats before the count turns brand red, as on the home DepartureRow. */
const LOW_SEATS = 4;

function seatsLabel(departure: Departure) {
  if (departure.seatsLeft === null) return "Waitlist open";
  return `${departure.seatsLeft} ${departure.seatsLeft === 1 ? "seat" : "seats"}`;
}

function plural(count: number, one: string, many: string) {
  return `${count} ${count === 1 ? one : many}`;
}

/**
 * Booking card: departure choice, traveller steppers and a live estimate, then
 * "Send enquiry" (contact form, prefilled) and "Ask on WhatsApp" (prefilled message).
 * Children pay 60% of the adult price of the chosen departure.
 */
export function BookingCard({ trip, className }: BookingCardProps) {
  const id = useId();
  const firstOpen = trip.departures.find((departure) => departure.seatsLeft !== null) ?? trip.departures[0];
  const [date, setDate] = useState(firstOpen?.date ?? ANY_DATE);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(trip.adultsOnly ? 0 : 1);

  const departure = trip.departures.find((item) => item.date === date);
  const adultPrice = departure?.price ?? trip.priceFrom;
  const childPrice = childPriceOf(adultPrice);
  const total = adults * adultPrice + children * childPrice;

  const travellers = [plural(adults, "adult", "adults"), children > 0 && plural(children, "child", "children")]
    .filter(Boolean)
    .join(" and ");
  const when = departure
    ? `departing ${formatDepartureDate(departure.date).full} from ${departure.fromCity}`
    : "on dates of our choice, as a private trip";

  const enquiryHref = `/contact?${new URLSearchParams({
    trip: trip.slug,
    date: departure ? departure.date : ANY_DATE,
    adults: String(adults),
    children: String(children),
  })}`;
  const whatsappHref = whatsappLink(
    `Hello Suman Holidays, I would like to ask about ${trip.title} (${formatDuration(trip.nights, trip.days)}), ${when}, for ${travellers}. Estimated total ${formatRupees(total)}.`,
  );

  return (
    <div
      id="booking"
      className={clsx(
        "flex scroll-mt-6 flex-col gap-[18px] rounded-panel border border-line bg-white p-[22px] shadow-panel sm:p-[26px]",
        className,
      )}
    >
      <div className="flex items-baseline justify-between gap-2.5">
        <p className="flex flex-col leading-[1.2]">
          <span className="text-[0.9rem] text-muted">Starting from</span>
          <span className="text-price-lg font-semibold">{formatRupees(trip.priceFrom)}</span>
          <span className="text-[0.88rem] text-muted">per person, twin sharing</span>
        </p>
        {trip.priceWas && trip.priceWas > trip.priceFrom && (
          <Badge variant="brand">Save {formatRupees(trip.priceWas - trip.priceFrom)}</Badge>
        )}
      </div>

      <fieldset className="flex flex-col gap-2.5">
        <legend className="mb-2.5 font-semibold">Choose a departure</legend>
        {trip.departures.map((item) => {
          const { day, month } = formatDepartureDate(item.date);
          const low = item.seatsLeft !== null && item.seatsLeft <= LOW_SEATS;
          return (
            <DepartureOption
              key={item.date}
              name={`${id}-departure`}
              value={item.date}
              checked={date === item.date}
              onChange={setDate}
              label={`${day} ${month}`}
              detail={
                <>
                  {item.fromCity},{" "}
                  <span className={clsx(low && "font-medium text-brand-dark")}>{seatsLabel(item)}</span>
                </>
              }
            />
          );
        })}
        <DepartureOption
          name={`${id}-departure`}
          value={ANY_DATE}
          checked={date === ANY_DATE}
          onChange={setDate}
          label="Any date"
          detail="Private trip"
        />
      </fieldset>

      <div className="flex flex-col gap-3 border-t border-line pt-4">
        <Stepper
          label="Adults"
          value={adults}
          min={1}
          max={MAX_ADULTS}
          onChange={setAdults}
          noun={["adult", "adults"]}
        />
        {!trip.adultsOnly && (
          <Stepper
            label="Children"
            hint={`Under 12, ${formatRupees(childPrice)} each`}
            value={children}
            min={0}
            max={MAX_CHILDREN}
            onChange={setChildren}
            noun={["child", "children"]}
          />
        )}
      </div>

      <p className="flex justify-between gap-4 border-t border-line pt-4 font-semibold">
        <span>Estimated total</span>
        <output aria-live="polite">{formatRupees(total)}</output>
      </p>

      <div className="flex flex-col gap-3">
        <Button href={enquiryHref} size="lg">
          Send enquiry
        </Button>
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[54px] items-center justify-center gap-2.5 rounded-control border border-ink px-7 font-medium text-ink no-underline transition-colors hover:bg-ink hover:text-white"
        >
          <WhatsAppIcon size={18} />
          Ask on WhatsApp
        </a>
      </div>
      <p className="text-center text-[0.9rem] text-muted">No payment needed to enquire. We reply within 2 hours.</p>
    </div>
  );
}

type DepartureOptionProps = {
  name: string;
  value: string;
  checked: boolean;
  onChange: (value: string) => void;
  label: string;
  detail: ReactNode;
};

function DepartureOption({ name, value, checked, onChange, label, detail }: DepartureOptionProps) {
  return (
    <label
      className={clsx(
        "flex cursor-pointer items-center justify-between gap-2.5 rounded-control border px-3.5 py-3 transition-colors",
        "has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-3 has-[:focus-visible]:outline-brand",
        checked ? "border-brand bg-brand-tint" : "border-line bg-white hover:border-muted",
      )}
    >
      <span className="inline-flex items-center gap-2.5">
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onChange={() => onChange(value)}
          className="size-[18px] accent-brand focus-visible:outline-none"
        />
        <span className="font-medium">{label}</span>
      </span>
      <span className="text-right text-[0.9rem] text-muted">{detail}</span>
    </label>
  );
}

type StepperProps = {
  label: string;
  hint?: string;
  value: number;
  min: number;
  max: number;
  onChange: (value: number) => void;
  noun: [string, string];
};

const stepButton =
  "inline-flex size-11 items-center justify-center rounded-pill border border-line bg-white text-ink transition-colors hover:border-ink disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-line";

function Stepper({ label, hint, value, min, max, onChange, noun }: StepperProps) {
  const labelId = useId();
  return (
    <div role="group" aria-labelledby={labelId} className="flex items-center justify-between gap-4">
      <span id={labelId} className="flex flex-col leading-[1.3]">
        {label}
        {hint && <span className="text-[0.85rem] text-muted">{hint}</span>}
      </span>
      <span className="inline-flex items-center gap-2.5">
        <button
          type="button"
          aria-label={`Fewer ${noun[1]}`}
          disabled={value <= min}
          onClick={() => onChange(value - 1)}
          className={stepButton}
        >
          <Minus size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
        <output aria-live="polite" aria-label={plural(value, noun[0], noun[1])} className="min-w-[2ch] text-center font-semibold">
          {value}
        </output>
        <button
          type="button"
          aria-label={`More ${noun[1]}`}
          disabled={value >= max}
          onClick={() => onChange(value + 1)}
          className={stepButton}
        >
          <Plus size={16} strokeWidth={1.8} aria-hidden="true" />
        </button>
      </span>
    </div>
  );
}
