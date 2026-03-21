import { Review } from "../../types/api";

type ReviewListProps = {
  reviews: Review[];
  emptyMessage: string;
};

export function ReviewList({ reviews, emptyMessage }: ReviewListProps) {
  if (reviews.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-sm text-slate-400">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <article key={review.id} className="rounded-2xl border border-slate-800 bg-slate-900 p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-100">
                {review.user?.name ?? review.item?.title ?? "Review"}
              </p>
              <p className="text-sm text-slate-400">
                {new Date(review.createdAt).toLocaleDateString()}
              </p>
            </div>
            <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-sm font-medium text-cyan-300">
              {review.rating}/5
            </span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-300">{review.comment}</p>
        </article>
      ))}
    </div>
  );
}
