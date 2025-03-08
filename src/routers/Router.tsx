import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/MainPage";
import React from "react";

const routers: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
];

export const router = createBrowserRouter(
  routers.map((route) => {
    return {
      ...route,
      element: route.element,
      errorElement: <div>Not Found</div>,
    };
  })
);
