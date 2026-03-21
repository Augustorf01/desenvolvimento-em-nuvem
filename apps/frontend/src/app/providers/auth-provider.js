import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useEffect, useMemo, useState, } from "react";
import { login, register } from "../../services/api/auth";
const STORAGE_KEY = "library-cloud-auth";
const AuthContext = createContext(undefined);
const readStorage = () => {
    const rawValue = localStorage.getItem(STORAGE_KEY);
    if (!rawValue) {
        return {
            token: null,
            user: null,
        };
    }
    try {
        return JSON.parse(rawValue);
    }
    catch {
        localStorage.removeItem(STORAGE_KEY);
        return {
            token: null,
            user: null,
        };
    }
};
const persistStorage = (payload) => {
    if (!payload) {
        localStorage.removeItem(STORAGE_KEY);
        return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
        token: payload.accessToken,
        user: payload.user,
    }));
};
export function AuthProvider({ children }) {
    const [state, setState] = useState({
        token: null,
        user: null,
    });
    useEffect(() => {
        setState(readStorage());
    }, []);
    const value = useMemo(() => ({
        ...state,
        isAuthenticated: Boolean(state.token && state.user),
        async loginAction(email, password) {
            const payload = await login({ email, password });
            persistStorage(payload);
            setState({
                token: payload.accessToken,
                user: payload.user,
            });
        },
        async registerAction(name, email, password) {
            await register({ name, email, password });
        },
        logoutAction() {
            persistStorage(null);
            setState({
                token: null,
                user: null,
            });
        },
    }), [state]);
    return _jsx(AuthContext.Provider, { value: value, children: children });
}
export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider.");
    }
    return context;
}
