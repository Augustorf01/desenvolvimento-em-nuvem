import { apiRequest } from "./client";
const buildQueryString = (params) => {
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
export function listItems(params = {}) {
    return apiRequest(`/items${buildQueryString(params)}`);
}
export function getItemById(id) {
    return apiRequest(`/items/${id}`);
}
export function createItem(payload, token) {
    return apiRequest("/items", {
        method: "POST",
        body: JSON.stringify(payload),
        token,
    });
}
export function updateItem(id, payload, token) {
    return apiRequest(`/items/${id}`, {
        method: "PATCH",
        body: JSON.stringify(payload),
        token,
    });
}
export function deleteItem(id, token) {
    return apiRequest(`/items/${id}`, {
        method: "DELETE",
        token,
    });
}
