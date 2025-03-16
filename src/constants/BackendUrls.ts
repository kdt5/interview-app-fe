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
