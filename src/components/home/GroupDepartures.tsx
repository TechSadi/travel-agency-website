import Link from "next/link";
import { DepartureRow } from "@/components/departures/DepartureRow";
import { buttonClasses } from "@/components/ui/Button";
import { getUpcomingDepartures } from "@/data/trips";
import { formatRupees } from "@/lib/format";
import { mobileTitle } from "./HomeSection";
import { DepartureMonthFilter, type DepartureFilterRow } from "./DepartureMonthFilter";

const ROWS = 5;
const MONTH_PILLS = 3;

const monthName = new Intl.DateTimeFormat("en-US", { month: "long", timeZone: "UTC" });

/** "Group departures from Gujarat" on paper: month pills and departure rows (DESIGN.md section 5). */
export function GroupDepartures() {
  const departures = getUpcomingDepartures();
  const monthKeys = [...new Set(departures.map((departure) => departure.date.slice(0, 7)))].slice(0, MONTH_PILLS);
  const months = monthKeys.map((value) => ({ value, label: monthName.format(new Date(`${value}-01T00:00:00Z`)) }));

  // Only the rows any view can show: the next few overall plus the next few in each month.
  const perMonth = new Map<string, number>();
  const rows: DepartureFilterRow[] = departures.flatMap((departure, index) => {
    const month = departure.date.slice(0, 7);
    const monthIndex = perMonth.get(month) ?? 0;
    perMonth.set(month, monthIndex + 1);
    const upcoming = index < ROWS;
    const inMonth = monthKeys.includes(month) && monthIndex < ROWS;
    if (!upcoming && !inMonth) return [];
    const key = `${departure.trip.slug}-${departure.date}`;
    return [{ key, month, upcoming, row: <DepartureRow departure={departure} /> }];
  });

  return (
    <section aria-labelledby="home-departures" className="bg-paper">
      <div className="container-page py-8 md:py-[clamp(72px,9vw,120px)]">
        <DepartureMonthFilter
          months={months}
          rows={rows}
          limit={ROWS}
          heading={
            <div data-reveal>
              <h2 id="home-departures" className={`m-0 max-w-[22ch] text-section ${mobileTitle}`}>
                Group departures from Gujarat
              </h2>
              <p className="mt-1.5 max-w-[34rem] text-[0.95rem] text-muted md:mt-3.5 md:text-[1.1rem] md:leading-[1.6]">
                <span className="md:hidden">Fixed dates with a tour manager.</span>
                <span className="max-md:hidden">
                  Fixed-date tours with a Suman Holidays tour manager travelling with you. Flights from Vadodara,
                  Ahmedabad or Mumbai.
                </span>
              </p>
            </div>
          }
        />

        <p className="mt-[18px] text-[0.95rem] text-muted max-md:hidden">
          Seats are held for 48 hours with a {formatRupees(5000)} token amount.{" "}
          <Link href="/trips?type=group" className="font-medium text-ink underline underline-offset-2">
            See all departures
          </Link>
        </p>
        <Link href="/trips?type=group" className={buttonClasses("outline", "md", "mt-3 w-full md:hidden")}>
          See all departures
        </Link>
      </div>
    </section>
  );
}
