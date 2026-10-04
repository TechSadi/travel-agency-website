import type { Metadata } from "next";
import { connection } from "next/server";
import { Suspense } from "react";
import { TripsExplorer } from "@/components/trips/TripsExplorer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { destinations } from "@/data/destinations";
import { buildFilterOptions, toTripListItem } from "@/data/tripList";
import { trips } from "@/data/trips";

const description =
  "Holiday packages from Vadodara: honeymoons, family holidays and group tours in Kashmir, the Maldives, Dubai, Bali, Europe and Africa. Filter by destination, budget, duration and departure month.";

export const metadata: Metadata = {
  title: "Holiday packages",
  description,
  openGraph: {
    title: "Holiday packages | Suman Holidays",
    description,
    images: [{ url: "/images/kashmir.jpg", alt: "Turquoise mountain lake ringed by pine forest in Kashmir" }],
  },
};

export default async function TripsPage() {
  // Render per request, so a shared or reloaded URL (?dest=kashmir&type=honeymoon)
  // arrives already filtered and departure months start from the current month.
  await connection();

  const currentMonth = new Date().toISOString().slice(0, 7);
  const items = trips.map((trip) => toTripListItem(trip, currentMonth));
  const options = buildFilterOptions(items, destinations);

  return (
    <main>
      <section className="bg-paper">
        <Container className="pt-8 pb-8 md:pt-12 md:pb-11">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Trips" }]} />
          <h1 className="mt-3.5 mb-2.5 text-page">Holiday packages</h1>
          <p className="max-w-[40rem] text-[1.1rem] text-muted">
            {trips.length} packages across India and abroad. Every trip can be changed for your dates, hotels and group size.
          </p>
        </Container>
      </section>

      <Container className="pt-8 pb-[clamp(72px,9vw,120px)] md:pt-10">
        <Suspense>
          <TripsExplorer trips={items} options={options} />
        </Suspense>
      </Container>
    </main>
  );
}
