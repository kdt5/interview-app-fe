import { setupWorker } from "msw/browser";
import { questions } from "./Questions";
import { categories, categoryImage } from "./Categories";
import { RequestHandler, WebSocketHandler } from "msw";

const handlers: Array<RequestHandler | WebSocketHandler> = [
  categories,
  categoryImage,
  questions,
];

export const worker = setupWorker(...handlers);
