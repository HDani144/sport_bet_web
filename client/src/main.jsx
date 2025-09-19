import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./main.css";

import Layout from "./Pages/Layout";
import MainPage from "./Pages/MainPage";
import ErrorPage from "./Pages/ErrorPage";
import UserRegister from "./Pages/UserRegister";
import Subscription from "./Pages/Subscription";
import UserLogin from "./Pages/UserLogin";
import Dashboard from "./Pages/Dashboard";
import Tip from "./Pages/Tip";
import SuccessPage from "./Pages/SuccessPage";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <MainPage />,
      },
      {
        path: "/registration",
        element: <UserRegister></UserRegister>,
      },
      {
        path: "/login",
        element: <UserLogin></UserLogin>,
      },
      {
        path: "/subscription",
        element: <Subscription />,
      },
      {
        path: "/dashboard",
        element: <Dashboard></Dashboard>,
      },
      {
        path: "/tips",
        element: <Tip></Tip>,
      },
      {
        path: "/success",
        element: <SuccessPage></SuccessPage>,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
