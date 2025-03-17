export const FRONTEND_URLS = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SETTINGS: {
    PROFILE: "settings/profile",
  },
  QUESTION_LIST: {
    FRONTEND: "/question-list/frontend",
    BACKEND: "/question-list/backend",
  },
  MY_PAGE: {
    HOME: "/my-page",
    ANSWERS: "/my-page/answers",
    FAVORITES: {
      QUESTIONS: "/my-page/favorite-questions",
    },
  },
  ANSWER: "/questions/:questionId/answer",
};

export const BACKEND_URLS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    SIGNUP: "/api/auth/signup",
    CHECK_EMAIL: "/api/auth/check-email",
    CHECK_NICKNAME: "/api/auth/check-nickname",
  },
  USERS: {
    ME: "/api/users/me",
    USER: "/api/users/:userId",
  },
  QUESTIONS: {
    ALL: "/api/questions",
    QUESTION: "/api/questions/:questionId",
    WEEKLY: "/api/questions/weekly",
  },
  CATEGORIES: {
    ALL: "/api/categories",
  },
  ANSWERS: {
    MINE: "/api/answers/mine",
    ANSWER: "/api/answers/:answerId",
  },
  FAVORITES: {
    MINE: "/api/favorites/mine",
    FAVORITE: "/api/favorites/:questionId",
  },
};
