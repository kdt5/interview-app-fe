import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/MainPage";
import AnswerPage from "../pages/AnswerPage";
import QuestionList from "../pages/QuestionList";

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
  {
    path: "/question-list/frontend/:questionId",
    element: (
      <Layout>
        <AnswerPage />
      </Layout>
    ),
  },
  {
    path: "/question-list/frontend/:questionId",
    element: (
      <Layout>
        <AnswerPage />
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
