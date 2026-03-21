const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3001";
export class ApiError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
export async function apiRequest(path, options = {}) {
    const headers = new Headers(options.headers);
    headers.set("Content-Type", "application/json");
    if (options.token) {
        headers.set("Authorization", `Bearer ${options.token}`);
    }
    const response = await fetch(`${API_URL}${path}`, {
        ...options,
        headers,
    });
    if (!response.ok) {
        let message = "Unexpected error.";
        try {
            const payload = (await response.json());
            message = Array.isArray(payload.message)
                ? payload.message.join(", ")
                : payload.message ?? message;
        }
        catch {
            message = response.statusText || message;
        }
        throw new ApiError(message, response.status);
    }
    if (response.status === 204) {
        return undefined;
    }
    return (await response.json());
}
