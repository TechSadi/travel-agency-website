import { ExternalLink } from "lucide-react";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { reviews } from "@/data/reviews";
import { site } from "@/data/site";
import { googleRating } from "@/data/stats";
import { HomeSection, mobileSnapItem, mobileSnapRow, mobileTitle } from "./HomeSection";

/** "What our travellers say": the Google rating summary, three ReviewCards and a link to all reviews on Google. */
export function ReviewsSection() {
  return (
    <HomeSection labelledBy="home-reviews">
      <div data-reveal className="mb-[18px] flex flex-wrap items-end justify-between gap-5 md:mb-9">
        <h2 id="home-reviews" className={`m-0 max-w-[22ch] text-section ${mobileTitle}`}>
          <span className="md:hidden">What travellers say</span>
          <span className="max-md:hidden">What our travellers say</span>
        </h2>
        <p className="inline-flex items-center gap-3 max-md:hidden">
          <span className="font-serif text-[2.4rem] leading-none font-medium">{googleRating.rating}</span>
          <span className="flex flex-col leading-[1.3]">
            <StarRating rating={googleRating.rating} stars={5} size={16} showValue={false} />
            <span className="text-[0.92rem] text-muted">from {googleRating.reviewCount} Google reviews</span>
          </span>
        </p>
      </div>
      {/* Scrolls sideways on phones, so it takes focus for keyboard scrolling. */}
      <div
        role="region"
        aria-label="Traveller reviews"
        tabIndex={0}
        data-reveal="group"
        className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${mobileSnapRow}`}
      >
        {reviews.slice(0, 3).map((review) => (
          <ReviewCard key={review.name} review={review} className={mobileSnapItem} />
        ))}
      </div>
      <Button
        href={site.googleReviewsUrl}
        target="_blank"
        rel="noopener noreferrer"
        variant="outline"
        icon={<ExternalLink size={18} strokeWidth={1.8} aria-hidden="true" />}
        className="mt-8 md:mt-10"
      >
        See all reviews on Google
        <span className="sr-only"> (opens in a new tab)</span>
      </Button>
    </HomeSection>
  );
}
