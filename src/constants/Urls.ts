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
  COMMUNITY: {
    POST: "/community",
    ANSWER: "/community/answers",
  }
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
    WEEKLY: "/api/answers/mine/weekly",
    ANSWER_RECORD: "/api/answers/:questionId",
    ANSWER_EDIT: "/api/answers/:answerId",
  },
  FAVORITES: {
    MINE: "/api/favorites/mine",
    FAVORITE: "/api/favorites/:questionId",
  },
  POSTS: {
    ALL: "/api/posts",
    POST: "/api/posts/:postId",
  },
  REPORTS: {
    ALL: "/api/reports",
    REPORT: "/api/reports/:reportId",
  },
  RANKINGS: {
    ALL: "/api/rankings",
    ANSWERS: "/api/rankings/answers",
    LIKES: "/api/rankings/likes",
    ME: "/api/rankings/me",
  },
};
