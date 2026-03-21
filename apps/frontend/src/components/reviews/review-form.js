import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export function ReviewForm({ onSubmit }) {
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState("");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await onSubmit(rating, comment);
            setComment("");
            setRating(5);
        }
        catch (submissionError) {
            const message = submissionError instanceof Error ? submissionError.message : "Review failed.";
            setError(message);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-slate-300", htmlFor: "rating", children: "Rating" }), _jsx("select", { id: "rating", value: rating, onChange: (event) => setRating(Number(event.target.value)), className: "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100", children: [5, 4, 3, 2, 1].map((value) => (_jsxs("option", { value: value, children: [value, "/5"] }, value))) })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-slate-300", htmlFor: "comment", children: "Comment" }), _jsx("textarea", { id: "comment", value: comment, onChange: (event) => setComment(event.target.value), className: "min-h-32 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100", required: true })] }), error ? _jsx("p", { className: "text-sm text-rose-400", children: error }) : null, _jsx("button", { type: "submit", disabled: isSubmitting, className: "rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60", children: isSubmitting ? "Sending..." : "Publish review" })] }));
}
