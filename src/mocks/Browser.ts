import { setupWorker } from "msw/browser";
import { questions } from "./Questions";
import { categories, categoryImage } from "./Categories";

export const handlers = [categories, categoryImage, questions];

export const worker = setupWorker(...handlers);
