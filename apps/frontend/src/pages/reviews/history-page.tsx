import { useEffect, useState } from "react";

import { useAuth } from "../../app/providers/auth-provider";
import { ReviewList } from "../../components/reviews/review-list";
import { listMyReviews } from "../../services/api/reviews";
import { Review } from "../../types/api";

export function ReviewHistoryPage() {
  const { token } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadReviews = async () => {
      if (!token) {
        setError("Authentication required.");
        setIsLoading(false);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const data = await listMyReviews(token);
        setReviews(data);
      } catch (requestError) {
        setError(
          requestError instanceof Error
            ? requestError.message
            : "Could not load your review history.",
        );
      } finally {
        setIsLoading(false);
      }
    };

    void loadReviews();
  }, [token]);

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-50">My reviews</h1>
        <p className="mt-2 text-sm text-slate-400">
          Review history associated with your authenticated account.
        </p>
      </div>

      {isLoading ? <p className="text-sm text-slate-400">Loading history...</p> : null}
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}

      {!isLoading && !error ? (
        <ReviewList reviews={reviews} emptyMessage="You have not reviewed any item yet." />
      ) : null}
    </section>
  );
}
