import { Check } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { mobileSnapItem, mobileSnapRow, mobileTitle } from "@/components/home/HomeSection";
import { PageMain } from "@/components/layout/PageMain";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { BookingCard } from "@/components/trip-detail/BookingCard";
import { DetailSection } from "@/components/trip-detail/DetailSection";
import { ExpertCard } from "@/components/trip-detail/ExpertCard";
import { FactsStrip } from "@/components/trip-detail/FactsStrip";
import { FaqList } from "@/components/trip-detail/FaqList";
import { HotelsTable } from "@/components/trip-detail/HotelsTable";
import { Inclusions } from "@/components/trip-detail/Inclusions";
import { Itinerary } from "@/components/trip-detail/Itinerary";
import { SectionTabs, type SectionTab } from "@/components/trip-detail/SectionTabs";
import { StickySidebar } from "@/components/trip-detail/StickySidebar";
import { TripActionBar } from "@/components/trip-detail/TripActionBar";
import { TripGallery } from "@/components/trip-detail/TripGallery";
import { TripHeader } from "@/components/trip-detail/TripHeader";
import { TripCard } from "@/components/trips/TripCard";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { toTripCardData } from "@/data/tripList";
import { getRelatedTrips, getTripReviews, metaDescription, shortPlaceOf } from "@/data/tripDetail";
import { getTripBySlug, trips } from "@/data/trips";
import { pageMetadata } from "@/lib/seo";

// Every trip is generated at build time; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return trips.map((trip) => ({ slug: trip.slug }));
}

export async function generateMetadata({ params }: PageProps<"/trips/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) return {};

  return pageMetadata({ title: trip.title, description: metaDescription(trip.overview), path: `/trips/${trip.slug}` });
}

export default async function TripPage({ params }: PageProps<"/trips/[slug]">) {
  const { slug } = await params;
  const trip = getTripBySlug(slug);
  if (!trip) notFound();

  const place = shortPlaceOf(trip);
  const tripReviews = getTripReviews(trip);
  const related = getRelatedTrips(trip);

  const tabs: SectionTab[] = [
    { id: "overview", label: "Overview" },
    { id: "itinerary", label: "Itinerary" },
    { id: "inclusions", label: "Inclusions" },
    { id: "hotels", label: "Hotels" },
    { id: "faqs", label: "FAQs" },
    ...(tripReviews.length > 0 ? [{ id: "reviews", label: "Reviews" }] : []),
  ];

  return (
    <PageMain>
      <div className="md:hidden">
        <TripGallery slug={trip.slug} images={trip.gallery} title={trip.title} layout="carousel" />
      </div>

      <Container className="pt-5 md:pt-8">
        <TripHeader trip={trip} crumb={place} hasReviews={tripReviews.length > 0} />
        <div className="mt-[26px] hidden md:block">
          <TripGallery slug={trip.slug} images={trip.gallery} title={trip.title} layout="grid" />
        </div>
      </Container>

      <Container className="grid items-start gap-x-10 gap-y-12 pt-[18px] pb-14 md:pt-10 md:pb-[clamp(72px,9vw,120px)] lg:grid-cols-[minmax(0,1fr)_340px] xl:grid-cols-[minmax(0,1fr)_360px] xl:gap-x-14">
        <div className="min-w-0">
          <FactsStrip trip={trip} />
          <SectionTabs tabs={tabs} className="mt-6 md:mt-9" />

          <DetailSection id="overview" title="Overview">
            <p className="mb-5 max-w-[44rem] text-[1.08rem] leading-[1.65] text-body md:text-[1.15rem]">{trip.overview}</p>
            <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-x-6 gap-y-3">
              {trip.highlights.map((highlight) => (
                <li key={highlight} className="flex items-start gap-3">
                  <Check size={20} strokeWidth={2.2} aria-hidden="true" className="mt-[0.15em] shrink-0 text-whatsapp" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </DetailSection>

          <Itinerary id="itinerary" days={trip.itinerary} />

          <DetailSection id="inclusions" title="What’s included">
            <Inclusions included={trip.included} excluded={trip.excluded} />
          </DetailSection>

          <DetailSection id="hotels" title="Where you’ll stay">
            <HotelsTable hotels={trip.hotels} caption={`Hotels on ${trip.title}`} />
          </DetailSection>

          <DetailSection id="faqs" title="Questions travellers ask">
            <FaqList id="faqs" faqs={trip.faqs} />
          </DetailSection>

          {tripReviews.length > 0 && (
            <DetailSection id="reviews" title="Reviews">
              <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,280px),1fr))] gap-5">
                {tripReviews.map((review) => (
                  <ReviewCard key={review.name} review={review} className="max-md:p-6" />
                ))}
              </div>
            </DetailSection>
          )}
        </div>

        <StickySidebar label="Book this trip" className="flex min-w-0 flex-col gap-5 max-lg:max-w-[560px]">
          <BookingCard trip={trip} />
          <ExpertCard place={place} />
        </StickySidebar>
      </Container>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="bg-paper">
          <Container className="py-11 md:py-[clamp(72px,9vw,120px)]">
            <SectionHeading id="related-title" title="You might also like" titleClassName={mobileTitle} className="mb-6 md:mb-8" />
            <div data-reveal="group" className={`${mobileSnapRow} md:grid md:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-7 md:max-lg:[&>*:nth-child(3)]:hidden`}>
              {related.map((other) => (
                <TripCard key={other.slug} trip={toTripCardData(other)} className={mobileSnapItem} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <TripActionBar title={trip.title} priceFrom={trip.priceFrom} />
    </PageMain>
  );
}
