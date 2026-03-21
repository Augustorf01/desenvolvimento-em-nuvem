import { apiRequest } from "./client";
export function listReviewsByItem(itemId) {
    return apiRequest(`/reviews/item/${itemId}`);
}
export function listMyReviews(token) {
    return apiRequest("/reviews/me", {
        token,
    });
}
export function createReview(payload, token) {
    return apiRequest("/reviews", {
        method: "POST",
        body: JSON.stringify(payload),
        token,
    });
}
