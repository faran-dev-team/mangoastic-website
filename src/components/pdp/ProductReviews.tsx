"use client";

export type Review = {
  name: string;
  location: string;
  rating: number;
  text: string;
};

type ProductReviewsProps = {
  reviews: Review[];
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex items-center gap-1 text-amber-400"
      aria-label={`${rating} out of 5 stars`}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <svg
          key={index}
          viewBox="0 0 20 20"
          className={`h-4 w-4 ${index < rating ? "fill-current" : "fill-none stroke-current text-zinc-600"}`}
          aria-hidden
        >
          <path d="M10 1.5l2.54 5.14 5.68.83-4.11 4 0.97 5.66L10 14.51 4.92 17.13l0.97-5.66-4.11-4 5.68-.83L10 1.5z" />
        </svg>
      ))}
    </div>
  );
}

export function ProductReviews({ reviews }: ProductReviewsProps) {
  return (
    <div className="mt-8 rounded-[28px] border border-zinc-200 bg-white p-6 shadow-[0_18px_60px_rgba(47,39,24,0.08)] sm:p-8">
      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-zinc-500">
            Customer Reviews
          </p>
          <h3 className="mt-2 font-sirelia text-2xl text-zinc-950">
            Loved by the people who open the box first
          </h3>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-3xl font-semibold text-zinc-950">4.9</div>
          <StarRating rating={5} />
          <div className="text-sm text-zinc-500">148 reviews</div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        {reviews.map((review) => (
          <article
            key={review.name}
            className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-semibold text-zinc-950">{review.name}</p>
                <p className="text-xs text-zinc-500">{review.location}</p>
              </div>
              <StarRating rating={review.rating} />
            </div>
            <p className="mt-4 text-sm leading-relaxed text-zinc-700">
              {review.text}
            </p>
          </article>
        ))}
      </div>

      <div className="mt-5 text-sm text-zinc-500">
        See all reviews once Judge.me is connected.
      </div>
    </div>
  );
}
