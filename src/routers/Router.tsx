import { createBrowserRouter } from "react-router-dom";
import { routerObjects } from "./RouterObject";

export const router = createBrowserRouter(
  routerObjects.map((route) => {
    return {
      ...route,
      element: route.element,
      errorElement: <div>Not Found</div>,
    };
  })
);
