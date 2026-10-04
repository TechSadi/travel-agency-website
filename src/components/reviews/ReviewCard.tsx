import clsx from "clsx";
import { StarRating } from "@/components/ui/StarRating";
import { getTripBySlug } from "@/data/trips";
import type { Review } from "@/data/types";

const SKIPPED_WORDS = new Set(["and", "dr", "mr", "mrs", "ms"]);

/** "Priya and Karan Desai" → "PD", "Dr. Bhavna Thakkar" → "BT". */
export function initialsOf(name: string) {
  const words = name.split(/\s+/).filter((word) => !SKIPPED_WORDS.has(word.replace(/\.$/, "").toLowerCase()));
  const first = words[0]?.[0] ?? "";
  const last = words.length > 1 ? words[words.length - 1][0] : "";
  return (first + last).toUpperCase();
}

type ReviewCardProps = {
  review: Review;
  className?: string;
};

/** Traveller quote with stars and an initials avatar: DESIGN.md section 4. */
export function ReviewCard({ review, className }: ReviewCardProps) {
  const tripName = review.tripLabel ?? getTripBySlug(review.tripSlug)?.title;

  return (
    <figure className={clsx("flex flex-col gap-[18px] rounded-card border border-line bg-white p-[30px]", className)}>
      <StarRating rating={review.rating} stars={5} size={15} showValue={false} />
      <blockquote className="font-serif text-quote text-ink">“{review.quote}”</blockquote>
      <figcaption className="mt-auto flex items-center gap-3.5">
        <span
          aria-hidden="true"
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-pill bg-brand-tint font-semibold text-brand-dark"
        >
          {initialsOf(review.name)}
        </span>
        <span className="flex flex-col leading-[1.3]">
          <strong className="font-semibold">{review.name}</strong>
          <span className="text-[0.92rem] text-muted">
            {review.city}
            {tripName && `, ${tripName}`}
          </span>
        </span>
      </figcaption>
    </figure>
  );
}
