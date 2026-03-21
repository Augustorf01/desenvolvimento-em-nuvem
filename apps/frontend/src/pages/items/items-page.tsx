import { ChangeEvent, useEffect, useState } from "react";

import { useAuth } from "../../app/providers/auth-provider";
import { ItemForm } from "../../components/items/item-form";
import { ItemCard } from "../../components/items/item-card";
import { createItem, listItems } from "../../services/api/items";
import { Item, ItemType } from "../../types/api";

export function ItemsPage() {
  const { isAuthenticated, token } = useAuth();
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState("");
  const [type, setType] = useState<ItemType | "">("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadItems = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await listItems({
        search: search || undefined,
        type: type || undefined,
      });

      setItems(data);
    } catch (requestError) {
      setError(
        requestError instanceof Error ? requestError.message : "Could not load the catalog.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void loadItems();
  }, [search, type]);

  const handleCreateItem = async (payload: {
    type: ItemType;
    title: string;
    description: string;
    authorOrDirector: string;
    releaseYear: number;
    genre?: string;
    coverUrl?: string;
  }) => {
    if (!token) {
      throw new Error("Authentication required.");
    }

    await createItem(payload, token);
    await loadItems();
  };

  return (
    <section className="space-y-8">
      <div className="space-y-3">
        <h1 className="text-4xl font-semibold text-slate-50">Catalog</h1>
        <p className="max-w-2xl text-sm leading-6 text-slate-400">
          Explore books and movies, filter by type, and open each detail page to read or
          publish reviews.
        </p>
      </div>

      {isAuthenticated ? (
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-slate-100">Add item</h2>
            <p className="mt-2 text-sm text-slate-400">
              Authenticated users can collaboratively curate the catalog.
            </p>
          </div>
          <ItemForm submitLabel="Create item" onSubmit={handleCreateItem} />
        </div>
      ) : null}

      <div className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900 p-5 md:grid-cols-[2fr,1fr]">
        <input
          type="search"
          value={search}
          onChange={(event: ChangeEvent<HTMLInputElement>) => setSearch(event.target.value)}
          placeholder="Search by title"
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
        />

        <select
          value={type}
          onChange={(event: ChangeEvent<HTMLSelectElement>) =>
            setType(event.target.value as ItemType | "")
          }
          className="rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
        >
          <option value="">All types</option>
          <option value="book">Books</option>
          <option value="movie">Movies</option>
        </select>
      </div>

      {isLoading ? <p className="text-sm text-slate-400">Loading catalog...</p> : null}
      {error ? <p className="text-sm text-rose-400">{error}</p> : null}

      {!isLoading && !error && items.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-slate-700 p-8 text-sm text-slate-400">
          No items matched the current filters.
        </div>
      ) : null}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}
