import clsx from "clsx";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import type { Metadata } from "next";
import { ContactCard } from "@/components/contact/ContactCard";
import { ContactForm } from "@/components/contact/ContactForm";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { WhatsAppIcon } from "@/components/ui/WhatsAppIcon";
import { officeDirections } from "@/data/about";
import { destinations, getDestinationBySlug } from "@/data/destinations";
import { site, whatsappLink } from "@/data/site";
import { formatMonth } from "@/data/tripList";
import { getTripBySlug } from "@/data/trips";
import { emptyEnquiry, FLEXIBLE, NOT_SURE, travellerOptions, travellersLabel, type EnquiryValues } from "@/lib/enquiry";
import { formatDepartureDate, formatDuration } from "@/lib/format";

const description =
  "Call, WhatsApp or visit Suman Holidays at Blue Diamond Complex, Fatehgunj, Vadodara. Tell us where you want to go and a travel consultant will call you back today.";

export const metadata: Metadata = {
  title: "Contact us",
  description,
  openGraph: {
    title: "Contact us | Suman Holidays",
    description,
    images: [{ url: "/images/office-desk.jpg", alt: "Inside the Suman Holidays office in Fatehgunj, Vadodara" }],
  },
};

/** This month and the next 11, as "December 2026". */
function upcomingMonths(count = 12): string[] {
  const now = new Date();
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + index, 1));
    return formatMonth(date.toISOString().slice(0, 7));
  });
}

function single(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function count(value: string | undefined, fallback: number, max: number): number {
  const parsed = Number.parseInt(value ?? "", 10);
  return Number.isFinite(parsed) ? Math.min(Math.max(parsed, 0), max) : fallback;
}

/** Prefills the form from a trip enquiry link: /contact?trip=<slug>&date=<YYYY-MM-DD|any>&adults=2&children=1. */
function enquiryFromParams(params: Record<string, string | string[] | undefined>): EnquiryValues {
  const trip = getTripBySlug(single(params.trip) ?? "");
  if (!trip) return emptyEnquiry;

  const date = single(params.date);
  const isoDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date) ? date : undefined;
  const adults = Math.max(1, count(single(params.adults), 2, 20));
  const children = count(single(params.children), 0, 20);

  const when = isoDate ? `departing ${formatDepartureDate(isoDate).full}` : "on dates that suit us";
  return {
    ...emptyEnquiry,
    destination: getDestinationBySlug(trip.destinationSlug)?.name ?? NOT_SURE,
    month: isoDate ? formatMonth(isoDate.slice(0, 7)) : FLEXIBLE,
    travellers: travellersLabel(adults, children),
    message: `I'm interested in ${trip.title} (${formatDuration(trip.nights, trip.days)}), ${when}.`,
  };
}

/** Options plus the prefilled value, so a prefill never points at a missing option. */
function withValue(options: string[], value: string): string[] {
  return options.includes(value) ? options : [...options, value];
}

export default async function ContactPage({ searchParams }: PageProps<"/contact">) {
  const initialValues = enquiryFromParams(await searchParams);
  const destinationOptions = [...destinations.map((destination) => destination.name), NOT_SURE];
  const monthOptions = [FLEXIBLE, ...upcomingMonths()];

  return (
    <main>
      <section className="bg-paper">
        <Container className="pt-8 pb-12 md:pt-12 md:pb-14">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
          <h1 className="mt-4 mb-3 text-page">
            Let’s plan your next holiday
          </h1>
          <p className="mb-9 max-w-[36rem] text-[1.15rem] text-body">
            Call, message or walk in. You’ll talk to the same consultant from first idea to the day you fly home.
          </p>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
            <ContactCard
              icon={<Phone size={24} strokeWidth={1.8} aria-hidden="true" />}
              tone="brand"
              title="Call us"
              value={site.phone.display}
              note={site.hours.short}
              link={{ href: site.phone.href, label: "Call now" }}
            />
            <ContactCard
              icon={<WhatsAppIcon size={24} />}
              tone="whatsapp"
              title="WhatsApp"
              value={site.whatsapp.display}
              note="Usually replies within an hour"
              link={{ href: whatsappLink(), label: "Start a chat", external: true }}
            />
            <ContactCard
              icon={<Mail size={24} strokeWidth={1.8} aria-hidden="true" />}
              tone="brand"
              title="Email"
              value={site.email.display}
              note="We reply within one working day"
              link={{ href: site.email.href, label: "Send an email" }}
            />
          </div>
        </Container>
      </section>

      <Container className="flex flex-wrap items-start gap-10 pt-[clamp(48px,7vw,96px)] pb-[clamp(72px,9vw,120px)]">
        <ContactForm
          initialValues={initialValues}
          destinationOptions={withValue(destinationOptions, initialValues.destination)}
          monthOptions={withValue(monthOptions, initialValues.month)}
          travellerOptions={withValue(travellerOptions, initialValues.travellers)}
        />

        <aside aria-label="Our office" className="flex min-w-0 flex-[1_1_340px] flex-col gap-5">
          <div className="relative h-[280px] overflow-hidden rounded-panel bg-paper">
            <iframe
              src={site.mapsEmbedUrl}
              title="Map of Suman Holidays at Blue Diamond Complex, Fatehgunj, Vadodara"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0 size-full border-0"
            />
            <a
              href={site.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-8 left-4 inline-flex min-h-10 items-center gap-2 rounded-control bg-white px-3.5 text-[0.95rem] font-medium text-ink no-underline shadow-float"
            >
              <MapPin size={16} strokeWidth={1.8} aria-hidden="true" className="text-brand" />
              Open in Google Maps
            </a>
          </div>

          <div className="flex flex-col gap-4 rounded-panel bg-paper p-[26px]">
            <h2 className="text-[1.45rem]">Our office</h2>
            <address className="flex gap-3 not-italic">
              <MapPin size={20} strokeWidth={1.8} aria-hidden="true" className="mt-1 shrink-0 text-brand" />
              <span>
                {site.address.line1},
                <br />
                {site.address.locality}, {site.address.city} {site.address.postalCode}
              </span>
            </address>
            <div className="flex gap-3">
              <Clock size={20} strokeWidth={1.8} aria-hidden="true" className="mt-1 shrink-0 text-brand" />
              <dl className="flex flex-1 flex-col gap-1.5 text-[0.95rem]">
                {site.hours.table.map((row) => (
                  <div key={row.days} className="flex justify-between gap-3">
                    <dt>{row.days}</dt>
                    <dd className={clsx("whitespace-nowrap", row.time === "Closed" ? "text-muted" : "text-ink")}>{row.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <p className="text-[0.95rem] text-muted">{officeDirections}</p>
          </div>
        </aside>
      </Container>
    </main>
  );
}
