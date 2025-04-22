export const FRONTEND_URLS = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  SETTINGS: {
    PROFILE: "settings/profile",
  },
  QUESTION_LIST: "/question-list/:position",
  MY_PAGE: {
    HOME: "/my-page",
    ANSWERS: "/my-page/answers",
    FAVORITES: {
      QUESTIONS: "/my-page/favorite-questions",
    },
  },
  ANSWER: "/questions/:questionId/answer",
  ANSWER_EDIT: "/questions/:questionId/answer/:answerId/edit",
  RANKINGS: {
    MAIN: "/rankings",
    MORE: "/rankings/more",
  },
};

export const BACKEND_URLS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    REFRESH: "/api/auth/refresh",
    LOGOUT: "/api/auth/logout",
    SIGNUP: "/api/auth/signup",
    CHECK_EMAIL: "/api/auth/check-email",
    CHECK_NICKNAME: "/api/auth/check-nickname",
    RECOVER_PASSWORD: "/api/auth/recover-password",
    RESET_PASSWORD: "/api/auth/reset-password",
  },
  USERS: {
    ME: "/api/users/me",
    STATS: "/api/users/stats",
    USER: "/api/users/:userId",
    CHANGE_PASSWORD: "/api/users/change-password",
    CHANGE_NICKNAME: "/api/users/change-nickname",
  },
  QUESTIONS: {
    ALL: "/api/questions",
    QUESTION: "/api/questions/:questionId",
    WEEKLY_TODAY: "/api/questions/weekly/today",
    WEEKLY: "/api/questions/weekly",
  },
  CATEGORIES: {
    ALL: "/api/categories",
  },
  ANSWERS: {
    MINE: {
      BASIC: "/api/answers/mine/basic",
      WEEKLY: "/api/answers/mine/weekly",
    },
    ANSWER_RECORD: "/api/answers/:questionId",
    ANSWER_EDIT: "/api/answers/:answerId",
  },
  FAVORITES: {
    MINE: "/api/favorites/mine",
    FAVORITE: "/api/favorites/:questionId",
  },
  RANKINGS: {
    ALL: "/api/rankings",
    ANSWERS: "/api/rankings/answers",
    LIKES: "/api/rankings/likes",
    ME: "/api/rankings/me",
  },
};
