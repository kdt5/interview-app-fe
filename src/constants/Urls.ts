export const FRONTEND_URLS = {
  HOME: "/",
  LOGIN: "/login",
  SIGNUP: "/signup",
  ONBOARDING: "/onboarding",
  FORGOT_PASSWORD: "/forgot-password",
  RESET_PASSWORD: "/reset-password",
  SETTINGS: {
    PROFILE: "/settings/profile",
  },
  QUESTION_LIST: "/question-list/:position",
  MY_PAGE: {
    HOME: "/my-page",
    ANSWERS: "/my-page/answers",
    POSTS: "/my-page/posts",
    FAVORITES: {
      QUESTIONS: "/my-page/favorite-questions",
      POSTS: "/my-page/favorite-posts",
    },
    EDIT: {
      PROFILE: "/my-page/edit-my-profile",
    },
  },
  ANSWER: "/questions/:questionId/answer",
  ANSWER_DETAIL: "/questions/:questionId/answer/:answerId",
  ANSWER_EDIT: "/questions/:questionId/answer/:answerId/edit",
  RANKINGS: {
    MAIN: "/rankings",
    MORE: "/rankings/more",
  },
  COMMUNITY: {
    MAIN: "/community",
    POST: "/community/posts",
    POST_DETAIL: "/community/posts/:postId",
    REPLIES: "/replies/:commentId",
    POST_NEW: "/community/posts/new",
    POST_EDIT: "/community/posts/:postId/edit",
    WEEKLY: "/community/weekly",
    ANSWERS: "community/questions/:questionId/answers",
    ANSWER_DETAIL: "/community/questions/:questionId/answers/:answerId",
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
    RESET_PASSWORD: "/api/auth/reset-password",
  },
  USERS: {
    ME: "/api/users/me",
    STATS: "/api/users/stats",
    USER: "/api/users/:userId",
    CHANGE_PASSWORD: "/api/users/change-password",
    CHANGE_NICKNAME: "/api/users/change-nickname",
    RECOVER_PASSWORD: "/api/users/recover-password",
    UPLOAD_PROFILE: "/api/uploads/profile",
  },
  QUESTIONS: {
    BASIC: "/api/questions",
    QUESTION: "/api/questions/:questionId",
    WEEKLY_CURRENT: "/api/questions/weekly/current",
    WEEKLY: "/api/questions/weekly",
  },
  CATEGORIES: {
    ALL: "/api/categories",
  },
  ANSWERS: {
    MINE: "/api/answers/mine",
    ANSWER_LIST: "/api/questions/:questionId/answers",
    ANSWER_RECORD: "/api/answers/:questionId",
    ANSWER_EDIT: "/api/answers/:answerId",
    OWNERSHIP: "/api/answers/:answerId/ownership",
  },
  FAVORITES: {
    MINE: "/api/favorites/mine",
    FAVORITE: "/api/favorites/:targetType/:targetId",
  },
  POSTS: {
    MINE: "/api/posts/mine",
    ALL: "/api/posts",
    POST: "/api/posts/:postId",
    CATEGORIES: "/api/posts/categories",
    OWNERSHIP: "/api/posts/:postId/ownership",
  },
  COMMENTS: "/api/comments",
  COMMENT_OWNERSHIP: "/api/comments/:commentId/ownership",
  COMMENTS_DETAIL: "/api/comments/:commentId",
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
  TRENDING: {
    POSTS: "/api/trending/posts",
  }
};
