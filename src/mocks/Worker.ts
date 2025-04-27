import { setupWorker } from "msw/browser";
import { questions, question, weeklyQuestion } from "./Questions";
import { categories, categoryImage } from "./Categories";
import { RequestHandler, WebSocketHandler } from "msw";
import { myUserInfo } from "./User";
import {
  answer,
  basicAnsweredQuestions,
  weeklyAnsweredQuestions,
} from "./Answers";
import {
  getAnswerRanking,
  getFavoriteRanking,
  getIntegrationRanking,
} from "./Ranking";

const handlers: Array<RequestHandler | WebSocketHandler> = [
  categories,
  categoryImage,
  weeklyQuestion,
  questions,
  question,
  basicAnsweredQuestions,
  weeklyAnsweredQuestions,
  myUserInfo,
  answer,
  getIntegrationRanking,
  getAnswerRanking,
  getFavoriteRanking,
];

export const worker = setupWorker(...handlers);
