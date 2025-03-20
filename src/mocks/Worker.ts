import { setupWorker } from "msw/browser";
import { questions, question } from "./Questions";
import { categories, categoryImage } from "./Categories";
import { RequestHandler, WebSocketHandler } from "msw";
import { myUserInfo } from "./User";
import { weeklyQuestion } from "./Weekly";
import {
  answer,
  basicAnsweredQuestions,
  weeklyAnsweredQuestions,
} from "./Answers";

const handlers: Array<RequestHandler | WebSocketHandler> = [
  categories,
  categoryImage,
  questions,
  question,
  basicAnsweredQuestions,
  weeklyAnsweredQuestions,
  myUserInfo,
  answer,
  weeklyQuestion,
];

export const worker = setupWorker(...handlers);
