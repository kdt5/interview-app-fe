import { BACKEND_URLS } from "../constants/Urls";
import { Question } from "../models/Question.model";
import { backendHttpClient } from "./BackendHttpClient.api";
import { replaceUrlParams } from "../utils/Url";

export type Position = "frontend" | "backend";

export async function fetchQuestions(
  position: Position,
  categoryId?: number
): Promise<Question[]> {
  const response = await backendHttpClient
    .get<Question[]>(BACKEND_URLS.QUESTIONS.ALL, {
      params: {
        position,
        categoryId,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

interface FetchQuestionResponse {
  questionDetail: Question;
}

export async function fetchQuestion(questionId: number): Promise<Question> {
  const response = await backendHttpClient
    .get<FetchQuestionResponse>(
      replaceUrlParams(BACKEND_URLS.QUESTIONS.QUESTION, {
        questionId: questionId.toString(),
      })
    )
    .then((response) => response.data.questionDetail)
    .catch((error) => {
      throw error;
    });

  return response;
}

interface WeeklyQuestionResponse {
  questionDetail: Question;
}

export async function fetchWeeklyQuestion(): Promise<Question> {
  const response = await backendHttpClient
    .get<WeeklyQuestionResponse>(BACKEND_URLS.QUESTIONS.WEEKLY)
    .then((response) => response.data.questionDetail)
    .catch((error) => {
      throw error;
    });

  return response;
}
