import { setupWorker } from "msw/browser";
import { RequestHandler, WebSocketHandler } from "msw";

const handlers: Array<RequestHandler | WebSocketHandler> = [];

export const worker = setupWorker(...handlers);
