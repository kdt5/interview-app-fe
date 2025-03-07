import { createBrowserRouter, RouteObject } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/MainPage";

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
