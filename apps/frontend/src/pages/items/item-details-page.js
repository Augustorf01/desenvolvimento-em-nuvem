import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../app/providers/auth-provider";
import { ItemForm } from "../../components/items/item-form";
import { ReviewForm } from "../../components/reviews/review-form";
import { ReviewList } from "../../components/reviews/review-list";
import { deleteItem, getItemById, updateItem } from "../../services/api/items";
import { createReview, listReviewsByItem } from "../../services/api/reviews";
export function ItemDetailsPage() {
    const { itemId } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, token } = useAuth();
    const [item, setItem] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
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
        }
        catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Could not load this item.");
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        void loadPage();
    }, [itemId]);
    const handleReviewSubmit = async (rating, comment) => {
        if (!token || !itemId) {
            throw new Error("You need to be authenticated.");
        }
        await createReview({
            itemId,
            rating,
            comment,
        }, token);
        await loadPage();
    };
    const handleUpdateItem = async (payload) => {
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
        return _jsx("p", { className: "text-sm text-slate-400", children: "Loading item details..." });
    }
    if (error || !item) {
        return (_jsxs("div", { className: "space-y-4", children: [_jsx("p", { className: "text-sm text-rose-400", children: error ?? "Item not found." }), _jsx(Link, { to: "/", className: "text-sm text-cyan-300 hover:text-cyan-200", children: "Back to catalog" })] }));
    }
    return (_jsxs("section", { className: "space-y-8", children: [_jsxs("div", { className: "rounded-3xl border border-slate-800 bg-slate-900 p-8", children: [_jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsx("span", { className: "rounded-full bg-cyan-500/15 px-3 py-1 text-xs uppercase tracking-wide text-cyan-300", children: item.type }), _jsx("span", { className: "text-sm text-slate-400", children: item.releaseYear }), _jsx("span", { className: "text-sm text-slate-500", children: item.genre ?? "No genre" })] }), _jsx("h1", { className: "mt-4 text-4xl font-semibold text-slate-50", children: item.title }), _jsx("p", { className: "mt-3 text-lg text-slate-300", children: item.authorOrDirector }), _jsx("p", { className: "mt-6 max-w-3xl text-sm leading-7 text-slate-300", children: item.description })] }), _jsxs("div", { className: "grid gap-8 lg:grid-cols-[1.2fr,0.8fr]", children: [_jsxs("div", { className: "space-y-4", children: [isAuthenticated ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold text-slate-100", children: "Manage item" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Edit or remove this item from the collaborative catalog." })] }), _jsx(ItemForm, { initialValue: item, submitLabel: "Update item", onSubmit: handleUpdateItem }), _jsx("button", { type: "button", onClick: () => void handleDeleteItem(), className: "rounded-xl border border-rose-500/40 px-5 py-3 text-sm font-semibold text-rose-300 hover:border-rose-400 hover:text-rose-200", children: "Delete item" })] })) : null, _jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold text-slate-100", children: "Reviews" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Read what other users thought about this item." })] }), _jsx(ReviewList, { reviews: reviews, emptyMessage: "No reviews yet for this item." })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold text-slate-100", children: "Your review" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: isAuthenticated
                                            ? "Share your opinion about this item."
                                            : "Login to publish a review." })] }), isAuthenticated ? (_jsx(ReviewForm, { onSubmit: handleReviewSubmit })) : (_jsx("div", { className: "rounded-2xl border border-dashed border-slate-700 p-6 text-sm text-slate-400", children: "You must authenticate before posting a review." }))] })] })] }));
}
