import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

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

      <h2 className="text-lg font-semibold text-slate-100 sm:text-xl">{item.title}</h2>
      <p className="mt-2 text-sm text-slate-400">{item.authorOrDirector}</p>
      <div className="mt-4 flex min-h-0 flex-1 flex-col">
        <p
          className="line-clamp-4 text-sm leading-6 text-slate-300"
          title={item.description}
        >
          {item.description}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-slate-500">{item.genre ?? "No genre"}</span>
        <Link
          to={`/items/${item.id}`}
          className="flex items-center gap-1.5 rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          View details
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
