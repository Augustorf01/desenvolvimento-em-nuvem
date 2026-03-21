import { Item, ItemType } from "../../types/api";
import { apiRequest } from "./client";

type ListItemsParams = {
  type?: ItemType;
  search?: string;
};

type CreateOrUpdateItemPayload = {
  type: ItemType;
  title: string;
  description: string;
  authorOrDirector: string;
  releaseYear: number;
  genre?: string;
  coverUrl?: string;
};

const buildQueryString = (params: ListItemsParams) => {
  const searchParams = new URLSearchParams();

  if (params.type) {
    searchParams.set("type", params.type);
  }

  if (params.search) {
    searchParams.set("search", params.search);
  }

  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

export function listItems(params: ListItemsParams = {}): Promise<Item[]> {
  return apiRequest<Item[]>(`/items${buildQueryString(params)}`);
}

export function getItemById(id: string): Promise<Item> {
  return apiRequest<Item>(`/items/${id}`);
}

export function createItem(
  payload: CreateOrUpdateItemPayload,
  token: string,
): Promise<Item> {
  return apiRequest<Item>("/items", {
    method: "POST",
    body: JSON.stringify(payload),
    token,
  });
}

export function updateItem(
  id: string,
  payload: Partial<CreateOrUpdateItemPayload>,
  token: string,
): Promise<Item> {
  return apiRequest<Item>(`/items/${id}`, {
    method: "PATCH",
    body: JSON.stringify(payload),
    token,
  });
}

export function deleteItem(id: string, token: string): Promise<{ success: boolean }> {
  return apiRequest<{ success: boolean }>(`/items/${id}`, {
    method: "DELETE",
    token,
  });
}
