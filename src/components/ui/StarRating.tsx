import clsx from "clsx";

const STAR_PATH = "M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2l-5.7 3.1 1.2-6.4-4.7-4.4 6.4-.8z";

type StarRatingProps = {
  rating: number;
  /** Number of gold stars to draw: 1 for compact card meta, 5 for reviews. */
  stars?: 1 | 5;
  /** Star size in px. */
  size?: number;
  /** Show the rating number after the stars. */
  showValue?: boolean;
  /** Optional review count, shown muted in brackets. */
  reviewCount?: number;
  className?: string;
};

/** Gold stars plus the rating number, e.g. ★ 4.8 (126). */
export function StarRating({
  rating,
  stars = 5,
  size = 14,
  showValue = true,
  reviewCount,
  className,
}: StarRatingProps) {
  const label =
    reviewCount === undefined
      ? `Rated ${rating} out of 5`
      : `Rated ${rating} out of 5 from ${reviewCount} reviews`;

  return (
    <span className={clsx("inline-flex items-center gap-1.5 text-ink", className)}>
      <span role="img" aria-label={label} className="inline-flex gap-0.5">
        {Array.from({ length: stars }, (_, i) => (
          <svg
            key={i}
            width={size}
            height={size}
            viewBox="0 0 24 24"
            // A single star is a symbol; in a row of five, stars past the rating are unfilled.
            className={stars === 1 || i < Math.round(rating) ? "fill-gold" : "fill-line"}
            aria-hidden="true"
          >
            <path d={STAR_PATH} />
          </svg>
        ))}
      </span>
      {showValue && (
        <strong className="font-semibold" aria-hidden="true">
          {rating.toFixed(1)}
        </strong>
      )}
      {reviewCount !== undefined && (
        <span className="text-muted" aria-hidden="true">
          ({reviewCount})
        </span>
      )}
    </span>
  );
}
