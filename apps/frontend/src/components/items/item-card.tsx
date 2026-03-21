import { Link } from "react-router-dom";

import { Item } from "../../types/api";

type ItemCardProps = {
  item: Item;
};

export function ItemCard({ item }: ItemCardProps) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-slate-800 bg-slate-900 p-5">
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="rounded-full bg-slate-800 px-3 py-1 text-xs uppercase tracking-wide text-cyan-300">
          {item.type}
        </span>
        <span className="text-sm text-slate-400">{item.releaseYear}</span>
      </div>

      <h2 className="text-xl font-semibold text-slate-100">{item.title}</h2>
      <p className="mt-2 text-sm text-slate-400">{item.authorOrDirector}</p>
      <p className="mt-4 flex-1 text-sm leading-6 text-slate-300">{item.description}</p>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-slate-500">{item.genre ?? "No genre"}</span>
        <Link
          to={`/items/${item.id}`}
          className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          View details
        </Link>
      </div>
    </article>
  );
}
