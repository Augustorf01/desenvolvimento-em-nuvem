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
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <ItemsPage />,
      },
      {
        path: "items/:itemId",
        element: <ItemDetailsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: "reviews/me",
            element: <ReviewHistoryPage />,
          },
        ],
      },
    ],
  },
]);
