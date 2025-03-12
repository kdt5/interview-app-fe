import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/MainPage";
import AnswerPage from "../pages/AnswerPage";
import LoginPage from "../pages/LoginPage";
import JoinPage from "../pages/JoinPage";
import QuestionList from "../pages/QuestionList";
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
    path: "/question-list/frontend",
    element: (
      <Layout>
        <QuestionList />
      </Layout>
    ),
  },
  {
    path: "/question-list/backend",
    element: (
      <Layout>
        <QuestionList />
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
