import { jsx as _jsx } from "react/jsx-runtime";
import { createBrowserRouter } from "react-router-dom";
import { RootLayout } from "./layouts/root-layout";
import { ProtectedRoute } from "../components/auth/protected-route";
import { ItemDetailsPage } from "../pages/items/item-details-page";
import { ItemsPage } from "../pages/items/items-page";
import { LoginPage } from "../pages/auth/login-page";
import { RegisterPage } from "../pages/auth/register-page";
import { ReviewHistoryPage } from "../pages/reviews/history-page";
export const router = createBrowserRouter([
    {
        path: "/",
        element: _jsx(RootLayout, {}),
        children: [
            {
                index: true,
                element: _jsx(ItemsPage, {}),
            },
            {
                path: "items/:itemId",
                element: _jsx(ItemDetailsPage, {}),
            },
            {
                path: "login",
                element: _jsx(LoginPage, {}),
            },
            {
                path: "register",
                element: _jsx(RegisterPage, {}),
            },
            {
                element: _jsx(ProtectedRoute, {}),
                children: [
                    {
                        path: "reviews/me",
                        element: _jsx(ReviewHistoryPage, {}),
                    },
                ],
            },
        ],
    },
]);
