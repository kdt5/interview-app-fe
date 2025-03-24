import { BACKEND_URLS } from "../constants/Urls";
import { Category, Question } from "../models/Question.model";
import { backendHttpClient } from "./BackendHttpClient.api";
import { replaceUrlParams } from "../utils/Url";

export type Position = "frontend" | "backend";

interface WeeklyQuestionResponse {
  questionDetail: Question;
}

export async function fetchCategories(position?: Position) {
  const response = await backendHttpClient
    .get<Category[]>(BACKEND_URLS.CATEGORIES.ALL, {
      params: {
        position,
      },
    })
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });

  return response;
}

export async function fetchQuestions(position: Position, categoryId?: number) {
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

export async function fetchQuestion(questionId: number) {
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

export async function fetchWeeklyQuestion() {
  const response = await backendHttpClient
    .get<WeeklyQuestionResponse>(BACKEND_URLS.QUESTIONS.WEEKLY)
    .then((response) => response.data.questionDetail)
    .catch((error) => {
      throw error;
    });

  return response;
}
