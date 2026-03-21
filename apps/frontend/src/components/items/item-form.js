import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
export function ItemForm({ initialValue, submitLabel, onSubmit }) {
    const [type, setType] = useState(initialValue?.type ?? "book");
    const [title, setTitle] = useState(initialValue?.title ?? "");
    const [description, setDescription] = useState(initialValue?.description ?? "");
    const [authorOrDirector, setAuthorOrDirector] = useState(initialValue?.authorOrDirector ?? "");
    const [releaseYear, setReleaseYear] = useState(initialValue?.releaseYear ?? 2024);
    const [genre, setGenre] = useState(initialValue?.genre ?? "");
    const [coverUrl, setCoverUrl] = useState(initialValue?.coverUrl ?? "");
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setIsSubmitting(true);
        try {
            await onSubmit({
                type,
                title,
                description,
                authorOrDirector,
                releaseYear,
                genre: genre || undefined,
                coverUrl: coverUrl || undefined,
            });
        }
        catch (submissionError) {
            const message = submissionError instanceof Error ? submissionError.message : "Could not save item.";
            setError(message);
        }
        finally {
            setIsSubmitting(false);
        }
    };
    return (_jsxs("form", { onSubmit: handleSubmit, className: "space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6", children: [_jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-slate-300", htmlFor: "type", children: "Type" }), _jsxs("select", { id: "type", value: type, onChange: (event) => setType(event.target.value), className: "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100", children: [_jsx("option", { value: "book", children: "Book" }), _jsx("option", { value: "movie", children: "Movie" })] })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-slate-300", htmlFor: "releaseYear", children: "Release year" }), _jsx("input", { id: "releaseYear", type: "number", value: releaseYear, onChange: (event) => setReleaseYear(Number(event.target.value)), className: "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100", min: 1800, max: 2100, required: true })] })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-slate-300", htmlFor: "title", children: "Title" }), _jsx("input", { id: "title", value: title, onChange: (event) => setTitle(event.target.value), className: "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-slate-300", htmlFor: "authorOrDirector", children: "Author or director" }), _jsx("input", { id: "authorOrDirector", value: authorOrDirector, onChange: (event) => setAuthorOrDirector(event.target.value), className: "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100", required: true })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-slate-300", htmlFor: "description", children: "Description" }), _jsx("textarea", { id: "description", value: description, onChange: (event) => setDescription(event.target.value), className: "min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100", required: true })] }), _jsxs("div", { className: "grid gap-4 md:grid-cols-2", children: [_jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-slate-300", htmlFor: "genre", children: "Genre" }), _jsx("input", { id: "genre", value: genre, onChange: (event) => setGenre(event.target.value), className: "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" })] }), _jsxs("div", { children: [_jsx("label", { className: "mb-2 block text-sm text-slate-300", htmlFor: "coverUrl", children: "Cover URL" }), _jsx("input", { id: "coverUrl", type: "url", value: coverUrl, onChange: (event) => setCoverUrl(event.target.value), className: "w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" })] })] }), error ? _jsx("p", { className: "text-sm text-rose-400", children: error }) : null, _jsx("button", { type: "submit", disabled: isSubmitting, className: "rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60", children: isSubmitting ? "Saving..." : submitLabel })] }));
}
