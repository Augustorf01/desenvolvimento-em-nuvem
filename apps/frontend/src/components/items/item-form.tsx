import { FormEvent, useState } from "react";
import { Loader2, Save } from "lucide-react";

import { Item, ItemType } from "../../types/api";

type ItemFormPayload = {
  type: ItemType;
  title: string;
  description: string;
  authorOrDirector: string;
  releaseYear: number;
  genre?: string;
  coverUrl?: string;
};

type ItemFormProps = {
  initialValue?: Item;
  submitLabel: string;
  onSubmit: (payload: ItemFormPayload) => Promise<void>;
};

export function ItemForm({ initialValue, submitLabel, onSubmit }: ItemFormProps) {
  const [type, setType] = useState<ItemType>(initialValue?.type ?? "book");
  const [title, setTitle] = useState(initialValue?.title ?? "");
  const [description, setDescription] = useState(initialValue?.description ?? "");
  const [authorOrDirector, setAuthorOrDirector] = useState(
    initialValue?.authorOrDirector ?? "",
  );
  const [releaseYear, setReleaseYear] = useState(initialValue?.releaseYear ?? 2024);
  const [genre, setGenre] = useState(initialValue?.genre ?? "");
  const [coverUrl, setCoverUrl] = useState(initialValue?.coverUrl ?? "");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
    } catch (submissionError) {
      const message =
        submissionError instanceof Error ? submissionError.message : "Could not save item.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300" htmlFor="type">
            Type
          </label>
          <select
            id="type"
            value={type}
            onChange={(event) => setType(event.target.value as ItemType)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
          >
            <option value="book">Book</option>
            <option value="movie">Movie</option>
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300" htmlFor="releaseYear">
            Release year
          </label>
          <input
            id="releaseYear"
            type="number"
            value={releaseYear}
            onChange={(event) => setReleaseYear(Number(event.target.value))}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
            min={1800}
            max={2100}
            required
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300" htmlFor="authorOrDirector">
          Author or director
        </label>
        <input
          id="authorOrDirector"
          value={authorOrDirector}
          onChange={(event) => setAuthorOrDirector(event.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
          required
        />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          className="min-h-28 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
          required
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm text-slate-300" htmlFor="genre">
            Genre
          </label>
          <input
            id="genre"
            value={genre}
            maxLength={100}
            onChange={(event) => setGenre(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm text-slate-300" htmlFor="coverUrl">
            Cover URL
          </label>
          <input
            id="coverUrl"
            type="url"
            value={coverUrl}
            onChange={(event) => setCoverUrl(event.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100"
          />
        </div>
      </div>

      {error ? <p className="text-sm text-rose-400">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-60 sm:text-base"
      >
        {isSubmitting ? (
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden="true" />
        ) : (
          <Save className="h-5 w-5" aria-hidden="true" />
        )}
        {isSubmitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
