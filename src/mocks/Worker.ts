import { setupWorker } from "msw/browser";
import { questions, question } from "./Questions";
import { categories, categoryImage } from "./Categories";
import { RequestHandler, WebSocketHandler } from "msw";

const handlers: Array<RequestHandler | WebSocketHandler> = [
  categories,
  categoryImage,
  questions,
  question,
];

export const worker = setupWorker(...handlers);
