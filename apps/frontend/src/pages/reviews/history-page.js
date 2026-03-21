import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAuth } from "../../app/providers/auth-provider";
import { ReviewList } from "../../components/reviews/review-list";
import { listMyReviews } from "../../services/api/reviews";
export function ReviewHistoryPage() {
    const { token } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
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
            }
            catch (requestError) {
                setError(requestError instanceof Error
                    ? requestError.message
                    : "Could not load your review history.");
            }
            finally {
                setIsLoading(false);
            }
        };
        void loadReviews();
    }, [token]);
    return (_jsxs("section", { className: "space-y-6", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-3xl font-semibold text-slate-50", children: "My reviews" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Review history associated with your authenticated account." })] }), isLoading ? _jsx("p", { className: "text-sm text-slate-400", children: "Loading history..." }) : null, error ? _jsx("p", { className: "text-sm text-rose-400", children: error }) : null, !isLoading && !error ? (_jsx(ReviewList, { reviews: reviews, emptyMessage: "You have not reviewed any item yet." })) : null] }));
}
