import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export function ReviewList({ reviews, emptyMessage }) {
    if (reviews.length === 0) {
        return (_jsx("div", { className: "rounded-2xl border border-dashed border-slate-700 p-6 text-sm text-slate-400", children: emptyMessage }));
    }
    return (_jsx("div", { className: "space-y-4", children: reviews.map((review) => (_jsxs("article", { className: "rounded-2xl border border-slate-800 bg-slate-900 p-5", children: [_jsxs("div", { className: "flex items-center justify-between gap-4", children: [_jsxs("div", { children: [_jsx("p", { className: "font-semibold text-slate-100", children: review.user?.name ?? review.item?.title ?? "Review" }), _jsx("p", { className: "text-sm text-slate-400", children: new Date(review.createdAt).toLocaleDateString() })] }), _jsxs("span", { className: "rounded-full bg-cyan-500/15 px-3 py-1 text-sm font-medium text-cyan-300", children: [review.rating, "/5"] })] }), _jsx("p", { className: "mt-4 text-sm leading-6 text-slate-300", children: review.comment })] }, review.id))) }));
}
