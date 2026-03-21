import { jsx as _jsx } from "react/jsx-runtime";
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import { AuthProvider } from "./providers/auth-provider";
export function App() {
    return (_jsx(AuthProvider, { children: _jsx(RouterProvider, { router: router }) }));
}
