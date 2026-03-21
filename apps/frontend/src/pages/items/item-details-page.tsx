import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../../app/providers/auth-provider";
import { ItemForm } from "../../components/items/item-form";
import { ReviewForm } from "../../components/reviews/review-form";
import { ReviewList } from "../../components/reviews/review-list";
import { deleteItem, getItemById, updateItem } from "../../services/api/items";
import { createReview, listReviewsByItem } from "../../services/api/reviews";
import { Item, Review } from "../../types/api";

export function ItemDetailsPage() {
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, token } = useAuth();
  const [item, setItem] = useState<Item | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPage = async () => {
    if (!itemId) {
      setError("Item not found.");
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const [itemData, reviewsData] = await Promise.all([
        getItemById(itemId),
        listReviewsByItem(itemId),
      ]);

      setItem(itemData);
      setReviews(reviewsData);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Could not load this item.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadPage();
  }, [itemId]);

  const handleReviewSubmit = async (rating: number, comment: string) => {
    if (!token || !itemId) {
      throw new Error("You need to be authenticated.");
    }

    await createReview(
      {
        itemId,
        rating,
        comment,
      },
      token,
    );

    await loadPage();
  };

  const handleUpdateItem = async (payload: {
    type: "book" | "movie";
    title: string;
    description: string;
    authorOrDirector: string;
    releaseYear: number;
    genre?: string;
    coverUrl?: string;
  }) => {
    if (!token || !itemId) {
      throw new Error("You need to be authenticated.");
    }

    await updateItem(itemId, payload, token);
    await loadPage();
  };

  const handleDeleteItem = async () => {
    if (!token || !itemId) {
      return;
    }

    await deleteItem(itemId, token);
    navigate("/");
  };

  if (isLoading) {
    return <p className="text-sm text-slate-400">Loading item details...</p>;
  }

  if (error || !item) {
    return (
      <div className="space-y-4">
        <p className="text-sm text-rose-400">{error ?? "Item not found."}</p>
        <Link to="/" className="text-sm text-cyan-300 hover:text-cyan-200">
          Back to catalog
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
        <div className="flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-xs uppercase tracking-wide text-cyan-300">
            {item.type}
          </span>
          <span className="text-sm text-slate-400">{item.releaseYear}</span>
          <span className="text-sm text-slate-500">{item.genre ?? "No genre"}</span>
        </div>

        <h1 className="mt-4 text-4xl font-semibold text-slate-50">{item.title}</h1>
        <p className="mt-3 text-lg text-slate-300">{item.authorOrDirector}</p>
        <p className="mt-6 max-w-3xl text-sm leading-7 text-slate-300">{item.description}</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-4">
          {isAuthenticated ? (
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl font-semibold text-slate-100">Manage item</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Edit or remove this item from the collaborative catalog.
                </p>
              </div>
              <ItemForm initialValue={item} submitLabel="Update item" onSubmit={handleUpdateItem} />
              <button
                type="button"
                onClick={() => void handleDeleteItem()}
                className="rounded-xl border border-rose-500/40 px-5 py-3 text-sm font-semibold text-rose-300 hover:border-rose-400 hover:text-rose-200"
              >
                Delete item
              </button>
            </div>
          ) : null}

          <div>
            <h2 className="text-2xl font-semibold text-slate-100">Reviews</h2>
            <p className="mt-2 text-sm text-slate-400">
              Read what other users thought about this item.
            </p>
          </div>
          <ReviewList reviews={reviews} emptyMessage="No reviews yet for this item." />
        </div>

        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-100">Your review</h2>
            <p className="mt-2 text-sm text-slate-400">
              {isAuthenticated
                ? "Share your opinion about this item."
                : "Login to publish a review."}
            </p>
          </div>

          {isAuthenticated ? (
            <ReviewForm onSubmit={handleReviewSubmit} />
          ) : (
            <div className="rounded-2xl border border-dashed border-slate-700 p-6 text-sm text-slate-400">
              You must authenticate before posting a review.
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
