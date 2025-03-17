import { setupWorker } from "msw/browser";
import { questions } from "./Questions";
import { categories, categoryImage } from "./Categories";
import { RequestHandler, WebSocketHandler } from "msw";
import { myUserInfo } from "./User";

const handlers: Array<RequestHandler | WebSocketHandler> = [
  categories,
  categoryImage,
  questions,
  myUserInfo,
];

export const worker = setupWorker(...handlers);
