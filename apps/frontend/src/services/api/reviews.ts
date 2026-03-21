import { Review } from "../../types/api";
import { apiRequest } from "./client";

type CreateReviewPayload = {
  itemId: string;
  rating: number;
  comment: string;
};

export function listReviewsByItem(itemId: string): Promise<Review[]> {
  return apiRequest<Review[]>(`/reviews/item/${itemId}`);
}

export function listMyReviews(token: string): Promise<Review[]> {
  return apiRequest<Review[]>("/reviews/me", {
    token,
  });
}

export function createReview(
  payload: CreateReviewPayload,
  token: string,
): Promise<Review> {
  return apiRequest<Review>("/reviews", {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}
