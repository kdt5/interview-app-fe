import { BACKEND_URLS } from "../constants/Urls";
import { Question } from "../models/Question.model";
import { replaceUrlParams } from "../utils/Url";
import { backendHttpClient } from "./BackendHttpClient.api";

export async function fetchBasicAnsweredQuestions() {
  const response = await backendHttpClient
    .get<Question[]>(BACKEND_URLS.ANSWERS.MINE)
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchWeeklyAnsweredQuestions() {
  const response = await backendHttpClient
    .get<Question[]>(BACKEND_URLS.ANSWERS.WEEKLY)
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
