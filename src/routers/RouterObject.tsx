import { RouteObject } from "react-router-dom";
import Layout from "../components/layout/Layout";
import MainPage from "../pages/MainPage";
import RecordAnswerPage from "../pages/RecordAnswerPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import QuestionListPage from "../pages/QuestionListPage";
import AnswerHistoryPage from "../pages/AnswerHistoryPage";
import RankingMainPage from "../pages/RankingMainPage";
import { FRONTEND_URLS } from "../constants/Urls";
import MyPage from "../pages/MyPage";
import FavoriteQuestionListPage from "../pages/FavoriteQuestionListPage";
import EditAnswerPage from "../pages/EditAnswerPage";
import Community from "../pages/Community";
import CommunityQuestionDetail from "../pages/Community/CommunityQuestionDetail";
import CommunityAnswerDetail from "../pages/Community/CommunityAnswerDetail";
import CommunityReply from "../pages/Community/CommunityReply";
import PostDetail from "../pages/CommunityPost/PostDetail";
import PostWrite from "../pages/CommunityPost/PostWrite";
import MoreRankingPage from "../pages/MoreRankingPage";
import CommunityWeeklyAnswer from "../pages/Community/CommunityWeeklyAnswer";
import SettingProfile from "../pages/Mypage/SettingsProfile";
import AnswerDetail from "../pages/Community/AnswerDetail";

const requiredUrls = [
  FRONTEND_URLS.HOME,
  FRONTEND_URLS.LOGIN,
  FRONTEND_URLS.SIGNUP,
  FRONTEND_URLS.MY_PAGE.HOME,
  FRONTEND_URLS.MY_PAGE.ANSWERS,
  FRONTEND_URLS.MY_PAGE.FAVORITES.QUESTIONS,
  FRONTEND_URLS.ANSWER,
  FRONTEND_URLS.ANSWER_EDIT,
  FRONTEND_URLS.RANKINGS.MAIN,
  FRONTEND_URLS.RANKINGS.MORE,
  FRONTEND_URLS.COMMUNITY.MAIN,
  FRONTEND_URLS.COMMUNITY.POST_DETAIL,
  FRONTEND_URLS.COMMUNITY.POST_NEW,
  FRONTEND_URLS.COMMUNITY.POST_EDIT,
];

export const routerObjects: RouteObject[] = [
  {
    path: "/questiondetail",
    element: <CommunityQuestionDetail />,
  },

  {
    path: FRONTEND_URLS.ANSWER,
    element: <CommunityAnswerDetail />,
  },
  {
    path: FRONTEND_URLS.ANSWER_DETAIL,
    element: <AnswerDetail />,
  },
  {
    path: `${FRONTEND_URLS.COMMUNITY.POST_DETAIL}${FRONTEND_URLS.COMMUNITY.REPLIES}`,
    element: <CommunityReply />,
  },

  {
    path: FRONTEND_URLS.COMMUNITY.POST_DETAIL,
    element: <PostDetail />,
  },

  {
    path: FRONTEND_URLS.COMMUNITY.POST_NEW,
    element: <PostWrite mode="create" />,
  },

  {
    path: FRONTEND_URLS.COMMUNITY.POST_EDIT,
    element: <PostWrite mode="edit" />
  },

  {
    path: FRONTEND_URLS.COMMUNITY.WEEKLY,
    element: <CommunityWeeklyAnswer />,
  },

  {
    path: FRONTEND_URLS.HOME,
    element: <MainPage />,
  },
  {
    path: FRONTEND_URLS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: FRONTEND_URLS.SIGNUP,
    element: <SignUpPage />,
  },
  {
    path: FRONTEND_URLS.QUESTION_LIST,
    element: <QuestionListPage />,
  },
  {
    path: FRONTEND_URLS.COMMUNITY.MAIN,
    element: <Community />,
  },
  {
    path: FRONTEND_URLS.MY_PAGE.HOME,
    element: <MyPage />,
  },
  {
    path: FRONTEND_URLS.MY_PAGE.ANSWERS,
    element: <AnswerHistoryPage />,
  },
  {
    path: FRONTEND_URLS.MY_PAGE.FAVORITES.QUESTIONS,
    element: <FavoriteQuestionListPage />,
  },
  {
    path: FRONTEND_URLS.MY_PAGE.EDIT.PROFILE,
    element: <SettingProfile />,
  },
  {
    path: FRONTEND_URLS.ANSWER,
    element: <RecordAnswerPage />,
  },
  {
    path: FRONTEND_URLS.ANSWER_EDIT,
    element: <EditAnswerPage />,
  },
  {
    path: FRONTEND_URLS.RANKINGS.MAIN,
    element: <RankingMainPage />,
  },
  {
    path: FRONTEND_URLS.RANKINGS.MORE,
    element: <MoreRankingPage />,
  },
].map((routerObject) => {
  return {
    ...routerObject,
    element: <Layout>{routerObject.element}</Layout>,
  };
});

const routerPaths = routerObjects.map((route) => route.path);
const missingUrls = requiredUrls.filter((url) => !routerPaths.includes(url));

if (0 < missingUrls.length) {
  throw new Error(`Missing routes for URLs: ${missingUrls.join(", ")}`);
}
