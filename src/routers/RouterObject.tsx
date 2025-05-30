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
import CommunityAnswerDetail from "../pages/Community/CommunityAnswerDetail";
import CommunityReply from "../pages/Community/CommunityReply";
import PostDetail from "../pages/CommunityPost/PostDetail";
import PostWrite from "../pages/CommunityPost/PostWrite";
import MoreRankingPage from "../pages/MoreRankingPage";
import SettingProfile from "../pages/Mypage/SettingsProfile";
import AnswerDetail from "../pages/Community/AnswerDetail";
import OnBoardingPage from "../pages/OnBoardingPage";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import ResetPasswordPage from "../pages/ResetPasswordPage";
import AnswerDetailPage from "../pages/AnswerDetailPage";
import PostHistoryPage from "../pages/Mypage/PostHistoryPage";
import FavoritePostsPage from "../pages/Mypage/FavoritePostsPage";
import NotReadyYetPage from "../pages/NotReadyYetPage";

const requiredUrls = [
  FRONTEND_URLS.HOME,
  FRONTEND_URLS.ONBOARDING,
  FRONTEND_URLS.LOGIN,
  FRONTEND_URLS.SIGNUP,
  FRONTEND_URLS.FORGOT_PASSWORD,
  FRONTEND_URLS.MY_PAGE.HOME,
  FRONTEND_URLS.MY_PAGE.ANSWERS,
  FRONTEND_URLS.MY_PAGE.POSTS,
  FRONTEND_URLS.MY_PAGE.FAVORITES.POSTS,
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
    path: FRONTEND_URLS.COMMUNITY.ANSWER_DETAIL,
    element: <AnswerDetail />,
  },
  {
    path: FRONTEND_URLS.COMMUNITY.ANSWERS,
    element: <CommunityAnswerDetail />,
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
    element: <PostWrite mode="edit" />,
  },

  {
    path: FRONTEND_URLS.HOME,
    element: <MainPage />,
  },
  {
    path: FRONTEND_URLS.ONBOARDING,
    element: <OnBoardingPage />,
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
    path: FRONTEND_URLS.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: FRONTEND_URLS.RESET_PASSWORD,
    element: <ResetPasswordPage />,
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
    path: FRONTEND_URLS.MY_PAGE.POSTS,
    element: <PostHistoryPage />,
  },
  {
    path: FRONTEND_URLS.MY_PAGE.ANSWERS,
    element: <AnswerHistoryPage />,
  },
  {
    path: FRONTEND_URLS.MY_PAGE.FAVORITES.POSTS,
    element: <FavoritePostsPage />,
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
    path: FRONTEND_URLS.ANSWER_DETAIL,
    element: <AnswerDetailPage />,
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
  {
    path: FRONTEND_URLS.NOT_READY,
    element: <NotReadyYetPage />,
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
