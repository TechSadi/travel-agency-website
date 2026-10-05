import type { Metadata } from "next";
import { connection } from "next/server";
import { PageMain } from "@/components/layout/PageMain";
import { TripsExplorer } from "@/components/trips/TripsExplorer";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { destinations } from "@/data/destinations";
import { buildFilterOptions, toTripListItem } from "@/data/tripList";
import { trips } from "@/data/trips";
import { pageMetadata } from "@/lib/seo";

const description =
  "Holiday packages from Vadodara: honeymoons, family holidays and group tours in Kashmir, the Maldives, Dubai, Bali, Europe and Africa. Filter by destination, budget, duration and departure month.";

export const metadata: Metadata = pageMetadata({ title: "Holiday packages", description, path: "/trips" });

export default async function TripsPage() {
  // Render per request, so a shared or reloaded URL (?dest=kashmir&type=honeymoon)
  // arrives already filtered and departure months start from the current month.
  await connection();

  const currentMonth = new Date().toISOString().slice(0, 7);
  const items = trips.map((trip) => toTripListItem(trip, currentMonth));
  const options = buildFilterOptions(items, destinations);

  return (
    <PageMain>
      <section className="bg-paper">
        <Container className="pt-8 pb-8 md:pt-12 md:pb-11">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Trips" }]} />
          <h1 className="intro mt-3.5 mb-2.5 text-page">Holiday packages</h1>
          <p className="intro intro-2 max-w-[40rem] text-[1.1rem] text-muted">
            {trips.length} packages across India and abroad. Every trip can be changed for your dates, hotels and group size.
          </p>
        </Container>
      </section>

      <Container className="pt-8 pb-[clamp(72px,9vw,120px)] md:pt-10">
        {/*
          No Suspense boundary: the page is dynamic, so useSearchParams resolves during the server render.
          A boundary would stream the results after the footer, and the footer would jump on slow networks.
        */}
        <TripsExplorer trips={items} options={options} />
      </Container>
    </PageMain>
  );
}
