import { RouteObject } from "react-router-dom";
import Layout from "../components/layout/Layout";
import Home from "../pages/MainPage";
import AnswerPage from "../pages/AnswerPage";
import LoginPage from "../pages/LoginPage";
import JoinPage from "../pages/JoinPage";
import QuestionList from "../pages/QuestionList";
import AnswersHistory from "../pages/AnswersHistory";

export const routerObjects: RouteObject[] = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/answer",
    element: <AnswerPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/join",
    element: <JoinPage />,
  },
  {
    path: "/question-list/frontend",
    element: <QuestionList />,
  },
  {
    path: "/question-list/backend",
    element: <QuestionList />,
  },
  {
    path: "/mypage/answers",
    element: <AnswersHistory />,
  },
].map((routerObject) => {
  return {
    ...routerObject,
    element: <Layout>{routerObject.element}</Layout>,
  };
});
