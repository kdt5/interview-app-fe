import { HttpStatusCode } from "axios";
import { BACKEND_URLS } from "../constants/Urls";
import { Answer, AnsweredQuestion } from "../models/Answer.model";
import { replaceUrlParams } from "../utils/Url";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchBasicAnsweredQuestions(): Promise<
  AnsweredQuestion[]
> {
  const response = await backendHttpClient
    .get<AnsweredQuestion[]>(BACKEND_URLS.ANSWERS.MINE)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchWeeklyAnsweredQuestions(): Promise<
  AnsweredQuestion[]
> {
  const response = await backendHttpClient
    .get<AnsweredQuestion[]>(BACKEND_URLS.ANSWERS.WEEKLY)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function recordAnswer(
  answer: string,
  questionId: number
): Promise<boolean> {
  const response = await backendHttpClient
    .post(
      replaceUrlParams(BACKEND_URLS.ANSWERS.ANSWER_RECORD, {
        questionId: questionId.toString(),
      }),
      {
        id: questionId,
        content: answer,
      }
    )
    .then((response) => response.status === HttpStatusCode.Created)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function editAnswer(
  answerId: number,
  newAnswer: string
): Promise<boolean> {
  const response = await backendHttpClient
    .patch(
      replaceUrlParams(BACKEND_URLS.ANSWERS.ANSWER_EDIT, {
        answerId: answerId.toString(),
      }),
      {
        newAnswer: newAnswer,
      }
    )
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function deleteAnswer(answerId: number): Promise<boolean> {
  const response = await backendHttpClient
    .delete(
      replaceUrlParams(BACKEND_URLS.ANSWERS.ANSWER_EDIT, {
        answerId: answerId.toString(),
      })
    )
    .then((response) => response.status === HttpStatusCode.Ok)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchAnswer(answerId: number): Promise<Answer> {
  const response = await backendHttpClient
    .get<Answer>(
      replaceUrlParams(BACKEND_URLS.ANSWERS.ANSWER_EDIT, {
        answerId: answerId.toString(),
      })
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}
