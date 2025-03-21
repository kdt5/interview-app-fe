import { BACKEND_URLS } from "../constants/Urls";
import { Answer } from "../models/Answer.model";
import { replaceUrlParams } from "../utils/Url";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchBasicAnsweredQuestions() {
  const response = await backendHttpClient
    .get<Answer[]>(BACKEND_URLS.ANSWERS.MINE)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchWeeklyAnsweredQuestions() {
  const response = await backendHttpClient
    .get<Answer[]>(BACKEND_URLS.ANSWERS.WEEKLY)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function recordAnswer(answer: string, questionId: number) {
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
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function editAnswer(answerId: number, newAnswer: string) {
  const response = await backendHttpClient
    .patch(
      replaceUrlParams(BACKEND_URLS.ANSWERS.ANSWER_EDIT, {
        answerId: answerId.toString(),
      }),
      {
        newAnswer: newAnswer,
      }
    )
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function deleteAnswer(answerId: number) {
  const response = await backendHttpClient
    .delete(
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

export async function fetchAnswer(answerId: number) {
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
