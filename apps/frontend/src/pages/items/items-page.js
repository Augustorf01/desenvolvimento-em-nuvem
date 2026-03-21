import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import { useAuth } from "../../app/providers/auth-provider";
import { ItemForm } from "../../components/items/item-form";
import { ItemCard } from "../../components/items/item-card";
import { createItem, listItems } from "../../services/api/items";
export function ItemsPage() {
    const { isAuthenticated, token } = useAuth();
    const [items, setItems] = useState([]);
    const [search, setSearch] = useState("");
    const [type, setType] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const loadItems = async () => {
        setIsLoading(true);
        setError(null);
        try {
            const data = await listItems({
                search: search || undefined,
                type: type || undefined,
            });
            setItems(data);
        }
        catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Could not load the catalog.");
        }
        finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        void loadItems();
    }, [search, type]);
    const handleCreateItem = async (payload) => {
        if (!token) {
            throw new Error("Authentication required.");
        }
        await createItem(payload, token);
        await loadItems();
    };
    return (_jsxs("section", { className: "space-y-8", children: [_jsxs("div", { className: "space-y-3", children: [_jsx("h1", { className: "text-4xl font-semibold text-slate-50", children: "Catalog" }), _jsx("p", { className: "max-w-2xl text-sm leading-6 text-slate-400", children: "Explore books and movies, filter by type, and open each detail page to read or publish reviews." })] }), isAuthenticated ? (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-semibold text-slate-100", children: "Add item" }), _jsx("p", { className: "mt-2 text-sm text-slate-400", children: "Authenticated users can collaboratively curate the catalog." })] }), _jsx(ItemForm, { submitLabel: "Create item", onSubmit: handleCreateItem })] })) : null, _jsxs("div", { className: "grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 md:grid-cols-[2fr,1fr]", children: [_jsx("input", { type: "search", value: search, onChange: (event) => setSearch(event.target.value), placeholder: "Search by title", className: "rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100" }), _jsxs("select", { value: type, onChange: (event) => setType(event.target.value), className: "rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100", children: [_jsx("option", { value: "", children: "All types" }), _jsx("option", { value: "book", children: "Books" }), _jsx("option", { value: "movie", children: "Movies" })] })] }), isLoading ? _jsx("p", { className: "text-sm text-slate-400", children: "Loading catalog..." }) : null, error ? _jsx("p", { className: "text-sm text-rose-400", children: error }) : null, !isLoading && !error && items.length === 0 ? (_jsx("div", { className: "rounded-2xl border border-dashed border-slate-700 p-8 text-sm text-slate-400", children: "No items matched the current filters." })) : null, _jsx("div", { className: "grid gap-6 md:grid-cols-2 xl:grid-cols-3", children: items.map((item) => (_jsx(ItemCard, { item: item }, item.id))) })] }));
}
