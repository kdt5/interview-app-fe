import { setupWorker } from "msw/browser";
import { categories, questions } from "./Questions";

export const handlers = [categories, questions];

export const worker = setupWorker(...handlers);
