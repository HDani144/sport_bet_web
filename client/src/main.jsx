import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";

// Oldalak
import Layout from "./Pages/Layout";
import MainPage from "./Pages/MainPage";
import ErrorPage from "./Pages/ErrorPage";
import UserRegister from "./Pages/UserRegister";
import Subscription from "./Pages/Subscription";
import UserLogin from "./Pages/UserLogin";
import Dashboard from "./Pages/Dashboard";
import Tip from "./Pages/Tip";
import SuccessPage from "./Pages/SuccessPage";

// Loading Context és Wrapper
import { LoadingProvider } from "./context/LoadingContext";
import LoadingWrapper from "./Pages/LoadingWrapper";

// Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <MainPage /> },
      { path: "/registration", element: <UserRegister /> },
      { path: "/login", element: <UserLogin /> },
      { path: "/subscription", element: <Subscription /> },
      { path: "/dashboard", element: <Dashboard /> },
      { path: "/tips", element: <Tip /> },
      { path: "/success", element: <SuccessPage /> },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <LoadingProvider>
      <LoadingWrapper /> {/* Globális loading */}
      <RouterProvider router={router} />
    </LoadingProvider>
  </React.StrictMode>
);
