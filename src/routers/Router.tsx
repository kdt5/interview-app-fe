import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/MainPage";
import React from "react";
import AnswerPage from "../pages/AnswerPage";
import LoginPage from "../pages/LoginPage";
import JoinPage from "../pages/JoinPage";

const routers: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout>
        <Home />
      </Layout>
    ),
  },
  {
    path: "/answer",
    element: (
      <Layout>
        <AnswerPage />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/join",
    element: <JoinPage />,
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
